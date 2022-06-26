import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

import { 
  MARKDOWNS_ROOT_DEMO,
  MARKDOWNS_ROOT_DEV,
  MARKDOWNS_ROOT_PROD,
} from '../app.const';

const LS_KEY_MARKDOWN_ROOT = 'infollector.markdown.root';

@Injectable({
  providedIn: 'root'
})
export class MdSettingsService {

  private isProd = environment.production;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  getMarkdownsRoot(): string {
    let root: string;
    root = this.localStorageService.getItem(LS_KEY_MARKDOWN_ROOT);
    if (root == null || root == '') {
      if (this.isProd) {
        root = MARKDOWNS_ROOT_PROD;
      } else {
        root = MARKDOWNS_ROOT_DEV;
      }
      this.localStorageService.setItem(LS_KEY_MARKDOWN_ROOT, root);
    }
    console.log(`Markdowns Root: ${root}`);
    return root;
  }

  setMarkdownsRoot(root: string): void {
    this.localStorageService.setItem(LS_KEY_MARKDOWN_ROOT, root);
  }

  removeMarkdownsRoot(): void {
    this.localStorageService.removeItem(LS_KEY_MARKDOWN_ROOT);
  }
}
