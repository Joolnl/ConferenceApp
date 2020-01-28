const fs = require('fs');
const files = [fs.readFileSync('./scripts/posts.json'), fs.readFileSync('./scripts/conferences.json')];

const tags = [];
const uniqueTags = [];

files.forEach(file => {
  const obj = JSON.parse(file.toString());

  Object.values(obj).forEach(item => {
    if (typeof item.tags !== 'undefined') {
      item.tags.split(',').map(tag => {
        const trimmedTag = tag.trim().toLowerCase();
        tags.push(trimmedTag);

        if (!uniqueTags.find(uniqueTag => uniqueTag === trimmedTag)) {
          uniqueTags.push(trimmedTag);
        }
      });
    }
  });
});

const map = uniqueTags.map(uniqueTag => {
  return { name: uniqueTag, count: tags.filter(tag => tag === uniqueTag).length };
});

function sortTagsByCount(a, b) {
  if (a.count < b.count) {
    return 1;
  } else {
    return -1;
  }
}

fs.writeFile('./src/assets/tags.json', JSON.stringify(map.sort(sortTagsByCount)), () => {});
