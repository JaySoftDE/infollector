import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MdContentsService } from '../md-contents/md-contents.service';

import { Topic, Title, Page, DisplayType } from '../md-contents/md-contents';
import { HintType } from '../md-default/md-default';
import { InfollectorError, ErrorType, ErrorSubtype } from '../md-error/md-error';

import { 
  MARKDOWNS_PATH_DEFAULT,
  ERROR_PREFIX,
  ERROR_SUFFIX_FILE
 } from '../app.const';

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent {

  private markdownsPath: string = MARKDOWNS_PATH_DEFAULT;

  public topics: Topic[] = [];
  public titles: Title[] = [];
  public pages: Page[] = [];

  public selectedTopic = new Topic;
  public selectedTitle = new Title;
  public selectedPage = new Page;
  public selectedTab: number = 0;

  public DisplayTypeEnum = DisplayType;
  public displayType: DisplayType = DisplayType.default;

  public HintTypeEnum = HintType;
  public hintType: HintType = HintType.noHint;

  public infollectorError = new InfollectorError;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mdContentsService: MdContentsService,
  ) { }

  // #region LIFECYCLE
  // --------------------------------------------------------------------------
  ngOnInit(): void {
    this.markdownsPath = this.mdContentsService.getMarkdownsPath();
    this.loadTopics();
  }
  // #endregion

  // #region COMPONENT
  // --------------------------------------------------------------------------
  setTopic(): void {
    // Reset Error
    this.resetError();
    // Reset selected Title
    this.selectedTitle = new Title;
    if (this.topics[0].topic.startsWith(ERROR_PREFIX)) {
      // Topics Error Handling
      this.setError(ErrorType.topic, this.topics[0].topic, this.topics[0].path);
      this.topics = [];
      this.setDisplayType();
    } else if (this.selectedTopic.path.length) {
      // Topic has been selected
      this.loadTitles(this.selectedTopic);
    } else {
      // No Topic has been selected, yet
      this.setDisplayType();
    }
  }

  setTitle(title: Title): void {
    // Reset Error
    this.resetError();
    // Reset selected Page
    this.selectedPage = new Page;
    if (this.titles[0].title.startsWith(ERROR_PREFIX)) {
      // Titles Error Handling
      this.setError(ErrorType.title, this.titles[0].title, this.titles[0].path);
      this.titles = [];
      this.setDisplayType();
    } else if (title.path.length) {
      // Title has been selected
      this.selectedTitle = title;
      this.loadPages(this.selectedTopic, this.selectedTitle);
    } else {
      // No Title has been selected, yet
      this.setDisplayType();
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

  getMarkDownPath(pagePath: string): string {
    return `${this.markdownsPath}/${this.selectedTopic.path}/${this.selectedTitle.path}/${pagePath}.md`;
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
      if (this.selectedTopic.topic.length) {
        this.hintType = HintType.titleHint;
      } else {
        this.hintType = HintType.topicHint;
      }
    }
  }

  private hasMultiPages(): boolean {
    return (this.pages.length > 1)
  }
  // #endregion

  // #region STORAGE
  // --------------------------------------------------------------------------
  private loadTopics(): void {
    this.mdContentsService.getTopics()
      .subscribe({
        next: (topics => {
          this.topics = topics.sort((a, b) => {
            return this.compare(a.topic, b.topic, true)
          })
        }),
        complete: () => this.setTopic()
      })
  }

  private loadTitles(topic: Topic): void {
    this.mdContentsService.getTitles(topic.path)
      .subscribe({
        next: (contents => {
          this.titles = contents.sort((a, b) => {
            return this.compare(a.title, b.title, true)
          })
        }),
        complete: () => this.setTitle(this.selectedTitle)
      })
  }

  private loadPages(topic: Topic, title: Title): void {
    this.mdContentsService.getPages(topic.path, title.path)
      .subscribe({
        next: (contents => {
          // no sorting here - custom order from JSON wanted
          this.pages = contents;
        }),
        complete: () => this.setInitialPage()
      })
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

  // #region SUPPORT
  // --------------------------------------------------------------------------
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  // #endregion
}
