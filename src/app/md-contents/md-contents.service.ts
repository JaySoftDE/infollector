import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { Topic, Title, Page } from './md-contents';

import {
  MARKDOWNS_PATH,
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

  constructor(
    private http: HttpClient,
  ) { }

  getTopics(): Observable<Topic[]> {
    var errResult = new Topic;
    var topicError: Topic[] = [];
    return this.http.get<Topic[]>(`${MARKDOWNS_PATH}/${TOPICS_FILENAME}`)
      .pipe(
        map(result => {
          if (this.isTopicsJson(result)) {
            return result;
          } else {
            errResult.topic = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = `${MARKDOWNS_PATH}/${TOPICS_FILENAME}`;
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
    return this.http.get<Title[]>(`${MARKDOWNS_PATH}/${topicPath}/${TITLES_FILENAME}`)
      .pipe(
        map(result => {
          if (this.isTitlesJson(result)) {
            return result;
          } else {
            errResult.title = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = `${MARKDOWNS_PATH}/${topicPath}/${TITLES_FILENAME}`;
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
    return this.http.get<Page[]>(`${MARKDOWNS_PATH}/${topicPath}/${titlePath}/${PAGES_FILENAME}`)
      .pipe(
        map(result => {
          if (this.isPagesJson(result)) {
            return result;
          } else {
            errResult.page = `${ERROR_PREFIX}.${ERROR_SUFFIX_STRUCTURE}`;
            errResult.path = `${MARKDOWNS_PATH}/${topicPath}/${titlePath}/${PAGES_FILENAME}`;
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
}
