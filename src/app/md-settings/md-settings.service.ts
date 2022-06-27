import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ItemType } from '../md-contents/md-contents';

import {
  MARKDOWNS_ROOT_DEMO,
  LS_KEY_MARKDOWN_ROOT,
  LS_KEY_ITEM_PATH,
  } from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class MdSettingsService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  getMarkdownsRoot(): string {
    let root: string;
    root = this.localStorageService.getItem(LS_KEY_MARKDOWN_ROOT);
    if (root == null || root == '') {
      root = MARKDOWNS_ROOT_DEMO;
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

  getRecentItemPath(item: ItemType): string {
    let path: string;
    path = this.localStorageService.getItem(`${LS_KEY_ITEM_PATH}.${item}`);
    return path;
  }

  setRecentItemPath(item: ItemType, path: string): void {
    this.localStorageService.setItem(`${LS_KEY_ITEM_PATH}.${item}`, path);
  }

  removeRecentItemPath(item: ItemType): void {
    this.localStorageService.removeItem(`${LS_KEY_ITEM_PATH}.${item}`);
  }
  
  removeAllSettings(): void {
    this.localStorageService.clear();
  }
}
