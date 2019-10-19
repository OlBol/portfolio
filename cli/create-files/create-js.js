const fs = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname, '../../src/scripts');

function template (name) {
    let className = '';
    let nameElements = name.split('-');

    nameElements.forEach(item => {
        className += item.charAt(0).toUpperCase() + item.substr(1);
    });

    return `export default class {
    constructor() {
        
    }

    init(options) {
        
    }
}`;
}

module.exports = function(name) {
    const file = `${dirPath}/${name}.js`;

    fs.writeFile(file, template(name), err => {
        if (err) throw err;
        console.info('\x1b[36m%s\x1b[0m', 'Create JS. Done!');
    });
};
