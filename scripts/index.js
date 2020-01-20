'use strict';

const algolia = require('algoliasearch');
const _values = require('lodash.values');

const appId = process.argv.slice(2)[0];
const token = process.argv.slice(2)[1];
const file = process.argv.slice(2)[2];
const index_name = process.argv.slice(2)[3];

if (!token) {
  throw new Error('Please enter algolia api token as parameter');
}
if (!appId) {
  throw new Error('Please enter algolia appId as parameter');
}
if (!file) {
  throw new Error('Please enter file as parameter');
}
if (!index_name) {
  throw new Error('Please enter algolia index_name as parameter');
}

const client = algolia(appId, token);

client.deleteIndex(index_name, (err, res) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('old index deleted...');

    const index = client.initIndex(index_name);
    const posts = require(file);

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
