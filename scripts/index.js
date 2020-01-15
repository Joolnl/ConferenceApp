'use strict';

const algolia = require('algoliasearch');
const _values = require('lodash.values');

const appId = process.argv.slice(2)[0];
const token = process.argv.slice(2)[1];

if (!token) {
  throw new Error('Please enter algolia api token as parameter');
}

const client = algolia(appId, token);

client.deleteIndex('posts', (err, ress) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('old index deleted...');

    const index = client.initIndex('posts');
    const posts = require('./posts.json');

    if (posts) {
      index
        .addObjects(_values(posts))
        .then(() => console.log('new index added...'))
        .catch(err => {
          throw new Error(err);
        });
    } else {
      throw new Error('posts.json not found or empty');
    }
  }
});
