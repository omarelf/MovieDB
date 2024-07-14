import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  load(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  save(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
