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

  getPosts(search: string = '') {
    return this.index.search({ query: search }).then(results => results.hits);
  }

  getAllPosts() {
    return from(this.getPosts());
  }
}
