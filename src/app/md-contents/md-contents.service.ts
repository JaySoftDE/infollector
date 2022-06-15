import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Topic, MarkDownFile } from './md-contents';


@Injectable({
  providedIn: 'root'
})
export class MdContentsService {

  constructor(
    private http: HttpClient,
  ) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('./assets/markdowns/_topics.json');
  }
  
  getTopicContents(topicFolder: string): Observable<MarkDownFile[]> {
    return this.http.get<MarkDownFile[]>(`./assets/markdowns/${topicFolder}/_content.json`);
  }
}
