import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MdContentsService } from '../md-contents/md-contents.service';

import { Topic, MarkDownFile, emptyTopic, emptyFile } from '../md-contents/md-contents';
import { DefaultMode } from '../md-default/md-default';

enum DisplayType {
  default,
  noSubitems,
  subitems,
}

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent {

  public topics: Topic[] = [];
  public markDownFiles: MarkDownFile[] = [];

  public selectedTopic: Topic = emptyTopic;
  public selectedMarkDownFile: MarkDownFile = emptyFile;

  public DisplayTypeEnum = DisplayType;
  public displayType: DisplayType = DisplayType.default;

  public DefaultModeEnum = DefaultMode;
  public defaultMode: DefaultMode = DefaultMode.noHint;

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
    this.loadTopics();
  }
  // #endregion

  // #region COMPONENT
  // --------------------------------------------------------------------------
  setTopic(): void {
    this.selectedMarkDownFile = emptyFile;
    if (this.selectedTopic.foldername.length) {
      this.loadContents(this.selectedTopic);
    } else {
      this.setMarkDownFile(this.selectedMarkDownFile);
    }
  }

  setMarkDownFile(mdFile: MarkDownFile): void {
    this.selectedMarkDownFile = mdFile;
    this.setDisplayType();
  }

  getSelectedMarkDownFile(): MarkDownFile {
    return this.selectedMarkDownFile;
  }

  getFilePath(filename: string): string {
    return `./assets/markdowns/${this.selectedTopic.foldername}/${filename}.md`;
  }
  // #endregion

  // #region DISPLAY
  // --------------------------------------------------------------------------
  private setDisplayType(): void {
    if (this.hasSubitems()) {
      this.displayType = DisplayType.subitems;
    } else if (this.selectedMarkDownFile.filename.length) {
      this.displayType = DisplayType.noSubitems;
    } else {
      this.displayType = DisplayType.default;
      if (this.selectedTopic.topic.length) {
        this.defaultMode = this.DefaultModeEnum.titleHint;
      } else {
        this.defaultMode = this.DefaultModeEnum.themeHint;
      }
    }
  }

  private hasSubitems(): boolean {
    return (this.selectedMarkDownFile.subitems.length > 0)
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

  private loadContents(topic: Topic): void {
    this.mdContentsService.getTopicContents(topic.foldername)
      .subscribe({
        next: (contents => {
          this.markDownFiles = contents.sort((a, b) => {
            return this.compare(a.displayname, b.displayname, true)
          })
        }),
        complete: () => this.setMarkDownFile(this.selectedMarkDownFile)
      })
  }
  // #endregion

  // #region SUPPORT
  // --------------------------------------------------------------------------
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  // #endregion
}
