const filename = process.argv.slice(2)[0];

const fs = require("fs");
const showdown = require('showdown')
const converter = new showdown.Converter();

console.log('\n * START * \n');

const content = fs.readFileSync(filename);
const obj = JSON.parse(content.toString());

console.log('\n * Optimize JSON * \n')
Object.values(obj).forEach(item => {
    //When tag is defined, split into array, lowercase and trim
    if (typeof item.tags !== 'undefined') {
        item.tags = item.tags.split(',').map((item) => {
            return item.trim().toLowerCase();
        });
    }

    if (typeof item.content !== 'undefined') {
        item.content = converter.makeHtml(item.content);
    }

    if (typeof item.preview !== 'undefined') {
        item.preview = converter.makeHtml(item.preview);
    }
});

console.log('\n * Update file * \n');

fs.writeFile(filename, JSON.stringify(obj), _ => { });

console.log('\n * EXIT * \n');
