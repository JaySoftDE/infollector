import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MarkDownFile, defaultFile } from '../md-contents/md-contents';
import { MdContentsService } from '../md-contents/md-contents.service';

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent {

  public markDownFiles: MarkDownFile[] = [];
  public selectedMarkDownFile: MarkDownFile = defaultFile;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mdContentsService: MdContentsService,
  ) {}

  // #region LIFECYCLE
  // --------------------------------------------------------------------------
  ngOnInit(): void {
    this.loadContents();
  }
  // #endregion

  // #region COMPONENT
  // --------------------------------------------------------------------------
  setMarkDownFile(mdFile: MarkDownFile): void {
    this.selectedMarkDownFile = mdFile;
  }

  hasSubitems(): boolean {
    return (this.selectedMarkDownFile.subitems?.length > 0)
  }

  getSelectedMarkDownFile(): MarkDownFile {
    return this.selectedMarkDownFile;
  }

  getFilePath(filename: string): string {
    return `./assets/markdowns/${filename}.md`;
  }
  // #endregion

  // #region STORAGE
  // --------------------------------------------------------------------------
  private loadContents(): void {
    this.mdContentsService.getContents()
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
