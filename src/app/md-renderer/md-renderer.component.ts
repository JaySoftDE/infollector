import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import MarkdownFilesJson from '../../assets/markdowns/_content.json';

interface MarkDownFile {
  displayname: string;
  filename: string;
}

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent {

  public markDownFiles: MarkDownFile[];

  public pathToMarkdown: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver
    ) {
      this.markDownFiles = MarkdownFilesJson.sort((a, b) => {
        return this.compare(a.displayname, b.displayname, true)
      });
      this.pathToMarkdown = '';
    }

    ngOnInit(): void {
      this.setMarkDownFileName("_default");
    }
  
    setMarkDownFileName(filename: string): void {
      this.pathToMarkdown = `./assets/markdowns/${filename}.md`;
    }
  
    private compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
