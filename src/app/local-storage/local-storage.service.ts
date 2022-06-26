import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

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

}
