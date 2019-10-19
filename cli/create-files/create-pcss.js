const fs = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname, '../../src/styles/components');

function template (name) {
    return `.${name} {
\t
}
`;
}

module.exports = function(name) {
    const file = `${dirPath}/${name}.pcss`;

    fs.writeFile(file, template(name), err => {
        if (err) throw err;
        console.info('\x1b[36m%s\x1b[0m', 'Create pcss. Done!');
    });
};
