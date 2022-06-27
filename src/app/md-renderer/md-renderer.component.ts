import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MdSettingsComponent } from '../md-settings/md-settings.component';
import { MdDialogComponent } from '../md-dialog/md-dialog.component';

import { MdContentsService } from '../md-contents/md-contents.service';
import { MdSettingsService } from '../md-settings/md-settings.service';

import { Collection, Topic, Title, Page, DisplayType, StructureLevel, ItemType } from '../md-contents/md-contents';
import { HintType } from '../md-default/md-default';
import { InfollectorError, ErrorType, ErrorSubtype } from '../md-error/md-error';

import {
  LBL_SUCCESS_NEW_ROOT,
  ERROR_PREFIX,
  ERROR_SUFFIX_FILE
} from '../app.const';

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent implements OnInit {

  private markdownsRoot: string = '';
  private recentCollectionPath: string = '';
  private recentTopicPath: string = '';
  private recentTitlePath: string = '';
  private recentPagePath: string = '';

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
    this.recentCollectionPath = this.mdSettingsService.getRecentItemPath(ItemType.collection);
    this.recentTopicPath = this.mdSettingsService.getRecentItemPath(ItemType.topic);
    this.recentTitlePath = this.mdSettingsService.getRecentItemPath(ItemType.title);
    this.recentPagePath = this.mdSettingsService.getRecentItemPath(ItemType.page);
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
        // There is a selected collection
        if (this.selectedCollection.path != this.recentCollectionPath) {
          // Selected collection differs from recent collection
          // => Reset subsequent recent items paths
          this.resetSubsequentRecentItemsPaths(StructureLevel.collection);
        }
      } else {
        // Check if there is a recent collection
        const collectionIdx = this.collections.findIndex((collection) => collection.path == this.recentCollectionPath);
        if (collectionIdx != -1) {
          this.selectedCollection = this.collections[collectionIdx];
        }
      }
      if (this.selectedCollection.path.length) {
        // Collection has been finally selected
        this.loadTopics(this.selectedCollection);
        this.recentCollectionPath = this.selectedCollection.path;
        this.mdSettingsService.setRecentItemPath(ItemType.collection, this.recentCollectionPath);
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
        // There is a selected topic
        if (this.selectedTopic.path != this.recentTopicPath) {
          // Selected topic differs from recent topic
          // => Reset subsequent recent items paths
          this.resetSubsequentRecentItemsPaths(StructureLevel.topic);
        }
      } else {
        // Check if there is a recent topic
        const topicIdx = this.topics.findIndex((topic) => topic.path == this.recentTopicPath);
        if (topicIdx != -1) {
          this.selectedTopic = this.topics[topicIdx];
        }
      }
      if (this.selectedTopic.path.length) {
        // Topic has been finally selected
        this.loadTitles(this.selectedCollection, this.selectedTopic);
        this.recentTopicPath = this.selectedTopic.path;
        this.mdSettingsService.setRecentItemPath(ItemType.topic, this.recentTopicPath);
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
        // There is only one title - auto-select it
        title = this.titles[0];
      }
      if (title.path.length) {
        // There is a selected title
        if (title.path != this.recentTopicPath) {
          // Selected title differs from recent title
          // => Reset subsequent recent items paths
          this.resetSubsequentRecentItemsPaths(StructureLevel.title);
        }
      } else {
        // Check if there is a recent title
        const titleIdx = this.titles.findIndex((title) => title.path == this.recentTitlePath);
        if (titleIdx != -1) {
          title = this.titles[titleIdx];
        }
      }
      if (title.path.length) {
        // Title has been finally selected
        this.selectedTitle = title;
        this.loadPages(this.selectedCollection, this.selectedTopic, this.selectedTitle);
        this.recentTitlePath = this.selectedTitle.path;
        this.mdSettingsService.setRecentItemPath(ItemType.title, this.recentTitlePath);
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
      // Check if there is a recent page
      const pageIdx = this.pages.findIndex((page) => page.path == this.recentPagePath);
      if (pageIdx != -1) {
        this.selectedPage = this.pages[pageIdx];
        this.selectedTab = pageIdx;
      } else {
        // Select first Page
        this.selectedPage = this.pages[0];
        this.selectedTab = 0;
        this.recentPagePath = this.selectedPage.path;
        this.mdSettingsService.setRecentItemPath(ItemType.page, this.recentPagePath);
      }
    }
    this.setDisplayType();
  }

  pageHasChanged(): void {
    this.mdSettingsService.setRecentItemPath(ItemType.page, this.pages[this.selectedTab]?.path);
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
    this.dialog.open(MdDialogComponent, { data: './assets/markdowns/infollector-info/info/info/info.md' });
  }

  openHelp(): void {
    this.dialog.open(MdDialogComponent, { data: './assets/markdowns/infollector-help/help/help/help.md' });
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

  resetSubsequentRecentItemsPaths(level: StructureLevel): void {
    if (level >= StructureLevel.root) {
      this.recentCollectionPath = '';
      this.mdSettingsService.removeRecentItemPath(ItemType.collection);
    }
    if (level >= StructureLevel.collection) {
      this.recentTopicPath = '';
      this.mdSettingsService.removeRecentItemPath(ItemType.topic);
    }
    if (level >= StructureLevel.topic) {
      this.recentTitlePath = '';
      this.mdSettingsService.removeRecentItemPath(ItemType.title);
    }
    if (level >= StructureLevel.title) {
      this.recentPagePath = '';
      this.mdSettingsService.removeRecentItemPath(ItemType.page);
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
