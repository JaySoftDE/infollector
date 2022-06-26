import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MdContentsService } from '../md-contents/md-contents.service';
import { MdSettingsComponent } from '../md-settings/md-settings.component';
import { MdSettingsService } from '../md-settings/md-settings.service';

import { Collection, Topic, Title, Page, DisplayType } from '../md-contents/md-contents';
import { HintType } from '../md-default/md-default';
import { InfollectorError, ErrorType, ErrorSubtype } from '../md-error/md-error';

import {
  LBL_SUCCESS_NEW_ROOT,
  ERROR_PREFIX,
  ERROR_SUFFIX_FILE
} from '../app.const';

enum StructureLevel {
  page,
  title,
  topic,
  collection,
  root,
}

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent implements OnInit {

  private markdownsRoot: string = '';

  public collections: Collection[] = [];
  public topics: Topic[] = [];
  public titles: Title[] = [];
  public pages: Page[] = [];

  public selectedCollection = new Collection;
  public selectedTopic = new Topic;
  public selectedTitle = new Title;
  public selectedPage = new Page;
  public selectedTab: number = 0;

  public DisplayTypeEnum = DisplayType;
  public displayType: DisplayType = DisplayType.default;

  public HintTypeEnum = HintType;
  public hintType: HintType = HintType.noHint;

  public infollectorError = new InfollectorError;

  private rootHasChanged = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private mdContentsService: MdContentsService,
    private mdSettingsService: MdSettingsService,
    private messageBar: MatSnackBar,
  ) { }

  // #region LIFECYCLE
  // --------------------------------------------------------------------------
  ngOnInit(): void {
    this.markdownsRoot = this.mdSettingsService.getMarkdownsRoot();
    this.loadCollections();
  }
  // #endregion

  // #region COMPONENT
  // --------------------------------------------------------------------------
  setCollection(): void {
    // Reset Error
    this.resetError();
    // Reset subsequent lists & selections
    this.resetSubsequentItems(StructureLevel.collection);
    if (this.collections[0].collection.startsWith(ERROR_PREFIX)) {
      // Collections Error Handling
      this.setError(ErrorType.collection, this.collections[0].collection, this.collections[0].path);
      this.collections = [];
      this.setDisplayType();
    } else {
      if (this.collections.length == 1) {
        // There is only one collection - auto-select it
        this.selectedCollection = this.collections[0];
      }
      if (this.selectedCollection.path.length) {
        // Collection has been selected
        this.loadTopics(this.selectedCollection);
      } else {
        // No Collection has been selected, yet
        this.setDisplayType();
      }
    }
  }

  setTopic(): void {
    // Reset Error
    this.resetError();
    // Reset subsequent lists & selections
    this.resetSubsequentItems(StructureLevel.topic);
    if (this.topics[0].topic.startsWith(ERROR_PREFIX)) {
      // Topics Error Handling
      this.setError(ErrorType.topic, this.topics[0].topic, this.topics[0].path);
      this.topics = [];
      this.setDisplayType();
    } else {
      if (this.topics.length == 1) {
        // There is only one topic - auto-select it
        this.selectedTopic = this.topics[0];
      }
      if (this.selectedTopic.path.length) {
        // Topic has been selected
        this.loadTitles(this.selectedCollection, this.selectedTopic);
      } else {
        // No Topic has been selected, yet
        this.setDisplayType();
      }
    }
  }

  setTitle(title: Title): void {
    // Reset Error
    this.resetError();
    // Reset subsequent lists & selections
    this.resetSubsequentItems(StructureLevel.title);
    if (this.titles[0].title.startsWith(ERROR_PREFIX)) {
      // Titles Error Handling
      this.setError(ErrorType.title, this.titles[0].title, this.titles[0].path);
      this.titles = [];
      this.setDisplayType();
    } else {
      if (this.titles.length == 1) {
        // There is only one topic - auto-select it
        title = this.titles[0];
      }
      if (title.path.length) {
        // Title has been selected
        this.selectedTitle = title;
        this.loadPages(this.selectedCollection, this.selectedTopic, this.selectedTitle);
      } else {
        // No Title has been selected, yet
        this.setDisplayType();
      }
    }
  }

  setInitialPage(): void {
    // Reset Error
    this.resetError();
    if (this.pages[0].page.startsWith(ERROR_PREFIX)) {
      // Pages Error Handling
      this.setError(ErrorType.page, this.pages[0].page, this.pages[0].path);
      this.pages = [];
    } else {
      // Select first Page
      this.selectedPage = this.pages[0];
      this.selectedTab = 0;
    }
    this.setDisplayType();
  }

  getMarkdownPath(pagePath: string): string {
    return `${this.markdownsRoot}/${this.selectedCollection.path}/${this.selectedTopic.path}/${this.selectedTitle.path}/${pagePath}.md`;
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(MdSettingsComponent);
    dialogRef.afterClosed()
      .subscribe({
        next: (result => {
          this.rootHasChanged = result;
        }),
        complete: () => {
          if (this.rootHasChanged) {
            // Do a full reload!
            this.resetSubsequentItems(StructureLevel.root);
            this.mdContentsService.reInit();
            this.ngOnInit();
          }
        }
      });
  }

  openInfo(): void {

  }

  openHelp(): void {

  }
  // #endregion

  // #region DISPLAY
  // --------------------------------------------------------------------------
  private setDisplayType(): void {
    if (this.hasError()) {
      this.displayType = DisplayType.error;
    } else if (this.hasMultiPages()) {
      this.displayType = DisplayType.multiPages;
    } else if (this.selectedPage.path.length) {
      this.displayType = DisplayType.onePage;
    } else {
      this.displayType = DisplayType.default;

      if (this.selectedCollection.collection.length) {
        if (this.selectedTopic.topic.length) {
          this.hintType = HintType.titleHint;
        } else {
          this.hintType = HintType.topicHint;
        }
      } else {
        this.hintType = HintType.collectionHint;
        if (this.rootHasChanged) {
          this.rootHasChanged = false;
          this.messageBar.open(LBL_SUCCESS_NEW_ROOT);
        }

      }
    }
  }

  private hasMultiPages(): boolean {
    return (this.pages.length > 1)
  }
  // #endregion

  // #region STORAGE
  // --------------------------------------------------------------------------
  private loadCollections(): void {
    this.mdContentsService.getCollections()
      .subscribe({
        next: (contents => {
          this.collections = contents;
        }),
        complete: () => this.setCollection()
      })
  }

  private loadTopics(collection: Collection): void {
    this.mdContentsService.getTopics(collection.path)
      .subscribe({
        next: (contents => {
          this.topics = contents;
        }),
        complete: () => this.setTopic()
      })
  }

  private loadTitles(collection: Collection, topic: Topic): void {
    this.mdContentsService.getTitles(collection.path, topic.path)
      .subscribe({
        next: (contents => {
          this.titles = contents;
        }),
        complete: () => this.setTitle(this.selectedTitle)
      })
  }

  private loadPages(collection: Collection, topic: Topic, title: Title): void {
    this.mdContentsService.getPages(collection.path, topic.path, title.path)
      .subscribe({
        next: (contents => {
          this.pages = contents;
        }),
        complete: () => this.setInitialPage()
      })
  }
  // #endregion

  // #region RECENT MARKDOWN
  // --------------------------------------------------------------------------
  resetSubsequentItems(level: StructureLevel): void {
    if (level >= StructureLevel.root) {
      this.collections = [];
      this.selectedCollection = new Collection;
    }
    if (level >= StructureLevel.collection) {
      this.topics = [];
      this.selectedTopic = new Topic;
    }
    if (level >= StructureLevel.topic) {
      this.titles = [];
      this.selectedTitle = new Title;
    }
    if (level >= StructureLevel.title) {
      this.pages = [];
      this.selectedPage = new Page;
      this.selectedTab = 0;
    }
  }

  // #endregion

  // #region ERROR HANDLING
  // --------------------------------------------------------------------------
  private resetError(): void {
    this.infollectorError = new InfollectorError;
  }

  private setError(type: ErrorType, err: string, msg: string): void {
    this.infollectorError.type = type;
    if (err.endsWith(ERROR_SUFFIX_FILE)) {
      this.infollectorError.subtype = ErrorSubtype.file;
    } else {  // must end with ERROR_SUFFIX_STRUCTURE then
      this.infollectorError.subtype = ErrorSubtype.structure;
    }
    this.infollectorError.message = msg;
  }

  private hasError(): boolean {
    return (this.infollectorError.type != ErrorType.none)
  }
  // #endregion
}
