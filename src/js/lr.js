const readline = require('readline');
const fs = require('fs');

module.exports = (fileName) => {
    return new Promise((resolve, reject) => {
        const lines = [];
        const lineReader = readline.createInterface({
            input: fs.createReadStream(fileName)
        });

        lineReader.on('line', function (line) {
            if (line) {
                lines.push(line);
            }
        });

        lineReader.on('close', function (line) {
            resolve(lines);
        });
    });
}