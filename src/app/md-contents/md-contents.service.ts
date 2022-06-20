import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { Collection, Topic, Title, Page } from './md-contents';

import { environment } from 'src/environments/environment';

import {
  MARKDOWNS_PATH_DEFAULT,
  MARKDOWNS_PATH_DEV,
  MARKDOWNS_PATH_PROD,
  COLLECTIONS_FILENAME,
  TOPICS_FILENAME,
  TITLES_FILENAME,
  PAGES_FILENAME,
  ERROR_PREFIX,
  ERROR_SUFFIX_FILE,
  ERROR_SUFFIX_STRUCTURE,
} from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class MdContentsService {

  private isProd = environment.production;
  
  private collectionPath: string = '';
  private markDownsPath: string = MARKDOWNS_PATH_DEFAULT;

  constructor(
    private http: HttpClient,
  ) { 
    
    // Local Storage Tests
    this.setItem('infollector.collection.name', 'Web Applications Development');
    this.setItem('infollector.collection.path', 'web-applications');

    this.collectionPath = this.getItem('infollector.collection.path');


    this.setMarkdownsPath();
  }

  public setItem(key: string, data: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string): string {
    return JSON.parse(String(localStorage.getItem(key)));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

  // #region GET MARKDOWNS ROOT
  // --------------------------------------------------------------------------
  getMarkdownsPath(): string {
    return this.markDownsPath;
  }

  private setMarkdownsPath(): void {
    if (this.isProd) {
      this.markDownsPath = MARKDOWNS_PATH_PROD;
    } else {
      this.markDownsPath = MARKDOWNS_PATH_DEV;
    }
    this.markDownsPath += `/${this.collectionPath}`;

    console.log('Current Markdowns Root:', this.markDownsPath);
  }
  // #endregion
  
  // #region GET MARKDOWNS CONTENTS
  // --------------------------------------------------------------------------
  getCollections(): Observable<Collection[]> {
    var errResult = new Collection;
    var topicError: Collection[] = [];
    const url = `${this.markDownsPath}/${COLLECTIONS_FILENAME}`;
    return this.http.get<Collection[]>(url)
      .pipe(
        map(result => {
          if (this.isCollectionsJson(result)) {
            return result;
          } else {
            errResult.collection = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = url;
            topicError.push(errResult);
            return topicError;
          }
        }),
        catchError(err => {
          errResult.collection = `${ERROR_PREFIX}.${ERROR_SUFFIX_FILE}`;
          errResult.path = err.url;
          topicError.push(errResult);
          return of(topicError);
        })
      );
  }

  getTopics(): Observable<Topic[]> {
    var errResult = new Topic;
    var topicError: Topic[] = [];
    const url = `${this.markDownsPath}/${TOPICS_FILENAME}`;
    return this.http.get<Topic[]>(url)
      .pipe(
        map(result => {
          if (this.isTopicsJson(result)) {
            return result;
          } else {
            errResult.topic = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = url;
            topicError.push(errResult);
            return topicError;
          }
        }),
        catchError(err => {
          errResult.topic = `${ERROR_PREFIX}.${ERROR_SUFFIX_FILE}`;
          errResult.path = err.url;
          topicError.push(errResult);
          return of(topicError);
        })
      );
  }

  getTitles(topicPath: string): Observable<Title[]> {
    var errResult = new Title;
    var titleError: Title[] = [];
    const url = `${this.markDownsPath}/${topicPath}/${TITLES_FILENAME}`;
    return this.http.get<Title[]>(url)
      .pipe(
        map(result => {
          if (this.isTitlesJson(result)) {
            return result;
          } else {
            errResult.title = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = url;
            titleError.push(errResult);
            return titleError;
          }
        }),
        catchError(err => {
          errResult.title = `${ERROR_PREFIX}.${ERROR_SUFFIX_FILE}`;
          errResult.path = err.url;
          titleError.push(errResult);
          return of(titleError);
        })
      );
  }

  getPages(topicPath: string, titlePath: string): Observable<Page[]> {
    var errResult = new Page;
    var pageError: Page[] = [];
    const url = `${this.markDownsPath}/${topicPath}/${titlePath}/${PAGES_FILENAME}`;
    return this.http.get<Page[]>(url)
      .pipe(
        map(result => {
          if (this.isPagesJson(result)) {
            return result;
          } else {
            errResult.page = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = url;
            pageError.push(errResult);
            return pageError;
          }
        }),
        catchError(err => {
          errResult.page = `${ERROR_PREFIX}.${ERROR_SUFFIX_FILE}`;
          errResult.path = err.url;
          pageError.push(errResult);
          return of(pageError);
        })
      );
  }
  // #endregion

  // #region JSON STRUCTURE CHECKS
  // --------------------------------------------------------------------------
  private isCollectionsJson(chkObjs: Collection[] | any): chkObjs is Collection[] {
    let ok = true;
    for (let obj of chkObjs) {
      ok = ok && (obj.collection !== undefined);
      ok = ok && (obj.path !== undefined);
      if (!ok) break;
    }
    return ok;
  }

  private isTopicsJson(chkObjs: Topic[] | any): chkObjs is Topic[] {
    let ok = true;
    for (let obj of chkObjs) {
      ok = ok && (obj.topic !== undefined);
      ok = ok && (obj.path !== undefined);
      if (!ok) break;
    }
    return ok;
  }

  private isTitlesJson(chkObjs: Title[] | any): chkObjs is Title[] {
    let ok = true;
    for (let obj of chkObjs) {
      ok = ok && (obj.title !== undefined);
      ok = ok && (obj.path !== undefined);
      if (!ok) break;
    }
    return ok;
  }

  private isPagesJson(chkObjs: Page[] | any): chkObjs is Page[] {
    let ok = true;
    for (let obj of chkObjs) {
      ok = ok && (obj.page !== undefined);
      ok = ok && (obj.path !== undefined);
      if (!ok) break;
    }
    return ok;
  }
  // #endregion
}
