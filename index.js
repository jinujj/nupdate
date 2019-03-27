#! /usr/bin/env node

const command = require('caporal');
const updateModule = require('./src/js/updateModule');

command
    .version('1.0.0')
    .help('nupdate')
    .action(updateModule);

    command.parse(process.argv);