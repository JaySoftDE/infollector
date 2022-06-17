import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, from, of } from 'rxjs';

import { Topic, Title, Page } from './md-contents';

const markdownsPath = './assets/markdowns';

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
    return this.http.get<Topic[]>(`${markdownsPath}/_topics.json`)
    .pipe(
      catchError(err => {
        console.log(err);
        errResult.topic = 'error';
        errResult.path = err.url;
        topicError.push(errResult);
        return of(topicError);
      })
    );
  }
  
  getTitles(topicPath: string): Observable<Title[]> {
    var errResult = new Title;
    var titleError: Title[] = [];
    return this.http.get<Title[]>(`${markdownsPath}/${topicPath}/_titles.json`)
    .pipe(
      catchError(err => {
        console.log(err);
        errResult.title = 'error';
        errResult.path = err.url;
        titleError.push(errResult);
        return of(titleError);
      })
    );
  }
  
  getPages(topicPath: string, titlePath: string): Observable<Page[]> {
    var errResult = new Page;
    var pageError: Page[] = [];
    return this.http.get<Page[]>(`${markdownsPath}/${topicPath}/${titlePath}/_pages.json`)
    .pipe(
      catchError(err => {
        console.log(err);
        errResult.page = 'error';
        errResult.path = err.url;
        pageError.push(errResult);
        return of(pageError);
      })
    );
  }
}
