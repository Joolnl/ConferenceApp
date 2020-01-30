const DATE_REGEX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm;

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

let errors = 0;
console.log('\n BEGIN TEST \n')

files.forEach(file => {
    const obj = JSON.parse(file.toString());

    const values = Object.values(obj);
    values.forEach(item => {
        const keys = Object.keys(item);
        requiredKeys.forEach(key => {
            if(!keys.includes(key)) {
                errors++;
                console.error(`- Key "${key}" missing in ${item.basename}`)
            } else if(key === 'date' && !item.date.match(DATE_REGEX)) {
                errors++;
                console.error(`- Invalid date format in ${item.basename}`);
            }
        });
    })
});

if(errors > 0) {
    console.log('\n');

    if(errors === 1) {
        console.error('\x1b[31m', `${errors} error detected\n`);
    } else {
        console.error('\x1b[31m', `${errors} errors detected\n`);
    }

    console.log('\x1b[0m'); //RESET COLOR
    throw new Error(`TEST FAILED!`);

} else {
    console.log('\x1b[32m', 'TEST PASSED!\n');
}