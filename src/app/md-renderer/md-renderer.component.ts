import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import MarkdownFilesJson from '../../assets/markdowns/_content.json';

interface MDFSubItem {
  itemname: string;
  filename: string;
}

interface MarkDownFile {
  displayname: string;
  filename: string;
  subitems: MDFSubItem[];
}

const defaultFile = {
  "displayname": "",
  "filename": "_default",
  "subitems": []
}

@Component({
  selector: 'ifx-md-renderer',
  templateUrl: './md-renderer.component.html',
  styleUrls: ['./md-renderer.component.scss']
})
export class MdRendererComponent {

  public markDownFiles: MarkDownFile[];
  public selectedMarkDownFile: MarkDownFile;

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
      this.selectedMarkDownFile = defaultFile;
    }

    ngOnInit(): void {
      this.setMarkDownFile(this.selectedMarkDownFile);
    }
  
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
  
    private compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
