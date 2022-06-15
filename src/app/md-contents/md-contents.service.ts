import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MarkDownFile } from './md-contents';


@Injectable({
  providedIn: 'root'
})
export class MdContentsService {

  constructor(
    private http: HttpClient,
  ) { }

  getContents(): Observable<MarkDownFile[]> {
    return this.http.get<MarkDownFile[]>('./assets/markdowns/_content.json');
  }
}
