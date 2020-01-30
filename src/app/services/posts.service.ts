import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import * as algoliaSearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { sortByDate } from './../helpers/sort';
import { Posts } from '../contracts/markdown';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  client = algoliaSearch(environment.algolia.appId, environment.algolia.searchApiKey);
  index: algoliaSearch.Index;

  constructor() {
    this.index = this.client.initIndex('posts');
  }

  getPosts(search: string = '', limit?: number): Promise<Posts[]> {
    const params: Params = { query: search };

    if (typeof limit !== 'undefined' && limit > 0) {
      params.hitsPerPage = limit;
    }
    return this.index.search(params).then(results => results.hits.sort(sortByDate));
  }

  getAllPosts(limit?: number): Observable<Posts[]> {
    return from(this.getPosts('', limit));
  }

  getPostsByTag(tag: string): Promise<Posts[]> {
    return this.index.search({ query: tag, restrictSearchableAttributes: ['tags'] }).then(results => results.hits);
  }
}
