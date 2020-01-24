import { Injectable } from '@angular/core';
import * as algoliaSearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  client = algoliaSearch(environment.algolia.appId, environment.algolia.searchApiKey);
  index: algoliaSearch.Index;

  constructor() {
    this.index = this.client.initIndex('posts');
  }

  getPosts(search: string = '', limit?: number) {
    const params: { [key: string]: any } = { query: search };

    if (typeof limit !== 'undefined' && limit > 0) {
      params.hitsPerPage = limit;
    }
    return this.index.search(params).then((results: { [key: string]: any }) => results.hits);
  }

  getAllPosts(limit?: number) {
    return from(this.getPosts('', limit));
  }

  getPostsByTag(tag: string) {
    return this.index.search({ query: tag, restrictSearchableAttributes: ['tags'] }).then(results => results.hits);
  }
}
