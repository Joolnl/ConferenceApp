'use strict';

const algolia = require('algoliasearch');
const _values = require('lodash.values');

const appId = process.argv.slice(2)[0];
const token = process.argv.slice(2)[1];
const file = process.argv.slice(2)[2];
const index_name = process.argv.slice(2)[3];

const searchableAttributes = [
  'title',
  'description',
  'content',
  'author',
  'tags'
];

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

client.deleteIndex(`${index_name}_tmp`, (err, res) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('removed old tmp index...');

    const index = client.initIndex(index_name);
    const tmpIndex = client.initIndex(`${index_name}_tmp`);

    const items = require(file);

    if (items) {
      tmpIndex
        .addObjects(_values(items))
        .then(() => {
          console.log('new index added...');
          client.moveIndex(tmpIndex.indexName, index.indexName).then(() => console.log('old index replaced...')).then(() => {
            /* Moving index content also overwrites the searchable attributes, so lets set these again */
            index.setSettings({ searchableAttributes });
          });
        })
        .catch(err => {
          throw new Error(err);
        });
    } else {
      throw new Error(`${file} not found or empty`);
    }
  }
});
