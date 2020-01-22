import { Injectable } from '@angular/core';
import * as algoliaSearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {
  client = algoliaSearch(environment.algolia.appId, environment.algolia.searchApiKey);
  index: algoliaSearch.Index;

  constructor() {
    this.index = this.client.initIndex('conferences');
  }

  getConferences(search: string = '', limit?: number) {
    const params: { [key: string]: any } = { query: search };

    if (typeof limit !== 'undefined' && limit > 0) {
      params.hitsPerPage = limit;
    }

    return this.index.search(params).then(results => results.hits);
  }

  getAllConferences(limit?: number) {
    return from(this.getConferences('', limit));
  }
}
