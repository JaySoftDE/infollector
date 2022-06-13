import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import MardownFilesJson from '../../assets/markdowns/index.json';

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
      this.markDownFiles = MardownFilesJson.sort((a, b) => {
        return this.compare(a.displayname, b.displayname, true)
      });
      this.pathToMarkdown = './assets/markdowns/default.md'
    }

    ngOnInit(): void {
      this.setMarkDownFileName("default");
    }
  
    setMarkDownFileName(filename: string): void {
      this.pathToMarkdown = `./assets/markdowns/${filename}.md`;
    }
  
    private compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
