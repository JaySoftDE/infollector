import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { Collection, Topic, Title, Page } from './md-contents';

import { MdSettingsService } from '../md-settings/md-settings.service';

import {
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

  private markdownsRoot: string = '';

  constructor(
    private http: HttpClient,
    private mdSettingsService: MdSettingsService,
  ) {
    this.markdownsRoot = this.mdSettingsService.getMarkdownsRoot();
  }

  reInit(): void {
    this.markdownsRoot = this.mdSettingsService.getMarkdownsRoot();
  }

  // #region MARKDOWNS CONTENTS
  // --------------------------------------------------------------------------
  getCollections(): Observable<Collection[]> {
    var errResult = new Collection;
    var collectionError: Collection[] = [];
    const url = `${this.markdownsRoot}/${COLLECTIONS_FILENAME}`;
    return this.http.get<Collection[]>(url)
      .pipe(
        map(result => {
          if (this.isCollectionsJson(result)) {
            return result.sort((a, b) => {
              return this.compare(a.collection, b.collection, true)
            });
          } else {
            errResult.collection = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = url;
            collectionError.push(errResult);
            return collectionError;
          }
        }),
        catchError(err => {
          errResult.collection = `${ERROR_PREFIX}.${ERROR_SUFFIX_FILE}`;
          errResult.path = err.url;
          collectionError.push(errResult);
          return of(collectionError);
        })
      );
  }

  getTopics(collectionPath: string): Observable<Topic[]> {
    var errResult = new Topic;
    var topicError: Topic[] = [];
    const url = `${this.markdownsRoot}/${collectionPath}/${TOPICS_FILENAME}`;
    return this.http.get<Topic[]>(url)
      .pipe(
        map(result => {
          if (this.isTopicsJson(result)) {
            return result.sort((a, b) => {
              return this.compare(a.topic, b.topic, true)
            });
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

  getTitles(collectionPath: string, topicPath: string): Observable<Title[]> {
    var errResult = new Title;
    var titleError: Title[] = [];
    const url = `${this.markdownsRoot}/${collectionPath}/${topicPath}/${TITLES_FILENAME}`;
    return this.http.get<Title[]>(url)
      .pipe(
        map(result => {
          if (this.isTitlesJson(result)) {
            return result.sort((a, b) => {
              return this.compare(a.title, b.title, true)
            });
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

  getPages(collectionPath: string, topicPath: string, titlePath: string): Observable<Page[]> {
    var errResult = new Page;
    var pageError: Page[] = [];
    const url = `${this.markdownsRoot}/${collectionPath}/${topicPath}/${titlePath}/${PAGES_FILENAME}`;
    return this.http.get<Page[]>(url)
      .pipe(
        map(result => {
          if (this.isPagesJson(result)) {
            // no sorting here - custom order from JSON wanted
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

  // #region SUPPORT
  // --------------------------------------------------------------------------
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  // #endregion
}
