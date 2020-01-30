const fs = require('fs');
const files = [fs.readFileSync('./scripts/posts.json'), fs.readFileSync('./scripts/conferences.json')];

const requiredKeys = [
    'title',
    'description',
    'author',
    'tags',
    'image',
    'date'
];

files.forEach(file => {
    const obj = JSON.parse(file.toString());

    const values = Object.values(obj);
    values.forEach(item => {
        const keys = Object.keys(item);
        requiredKeys.forEach(key => {
            if(!keys.includes(key)) {
                throw new Error(`TEST FAILED! | Key "${key}" missing in ${item.basename}`);
            }
        });
    })
});

console.log('\x1b[32m', 'TEST PASSED!');