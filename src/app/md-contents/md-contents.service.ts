import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, from, of } from 'rxjs';

import { Topic, Title, Page } from './md-contents';

import { 
  MARKDOWNS_PATH,
  TOPICS_FILENAME,
  TITLES_FILENAME,
  PAGES_FILENAME, 
  ERROR_INDICATOR 
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
      catchError(err => {
        console.log(err);
        errResult.topic = ERROR_INDICATOR;
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
      catchError(err => {
        console.log(err);
        errResult.title = ERROR_INDICATOR;
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
      catchError(err => {
        console.log(err);
        errResult.page = ERROR_INDICATOR;
        errResult.path = err.url;
        pageError.push(errResult);
        return of(pageError);
      })
    );
  }
}
