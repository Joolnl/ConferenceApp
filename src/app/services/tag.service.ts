import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagItems } from '../contracts/tags';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getPopularTags(limit?: number): Observable<TagItems> {
    return this.http.get<TagItems>(`/assets/tags.json`).pipe(
      map(tags => limit ? tags.slice(0, limit) : tags)
    );
  }

}
