const ncu = require('npm-check-updates');
const shell = require('shelljs');
const prompt = require('prompt');
const colors = require("colors/safe");

prompt.message = colors.green("Do you want to  update? (y/n)");

module.exports = (args, options, logger) => {

    shell.exec(`ncu --packageFile ./package.json  | awk 'FNR > 2 { print prev } { prev = $0 }' | awk 'NF > 0' >&1 | tee outprocessed.txt`);
    shell.exec(`cat outprocessed.txt | awk '{printf ("%s\\x40%s\\n", $1,$4 )}' > out.txt`);

    require('./lr')('out.txt')
        .then((outdatedModules) => promptUpdate(outdatedModules))
        .then((updateModules) => update(updateModules,logger))
        .then(() => logger.info(colors.green(" Successfully updated ")))
        .catch((msg) => logger.info(colors.magenta(msg)));
    shell.rm('-f', `out*.txt`);

};

promptUpdate = (updatedPackages) => {
    return new Promise((resolve, reject) => {
        if(updatedPackages.length) {
            prompt.start().get(updatedPackages, (error, result) => {

                const modules = Object.getOwnPropertyNames(result);
                const updatePackages = [];
                for (module of modules) {
                    if ('y' === result[module].toLowerCase()) {
                        updatePackages.push(module);
                    }
                }
                resolve(updatePackages);
            });
        } else {
            reject("All files are updated");
        }
    });
}

update = (updateModules, logger) => {
    return new Promise((resolve, reject) => {
        if(updateModules.length) {
            logger.info(colors.magenta (" Updating ... "));
            const updates = updateModules.reduce((accumulator, value) => {
                return accumulator + ' ' + value;
            }, ' ')
            shell.exec(`npm install --save --save-exact ${updates}`);
            resolve();
        } else {
            resolve();
        }
    });
}