'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process')

const packageDirectories = fs.readdirSync(path.resolve(__dirname, '../packages'));
const componentDirectories = packageDirectories
    .map((directory) => fs.readdirSync(path.resolve(__dirname, `../packages/${directory}`)))
    .flat();

componentDirectories.forEach((packageName) => {
    const buildCommand = `npm run build -w ${packageName}`;
    console.log(buildCommand);
    child_process.execSync(buildCommand, {stdio: 'inherit'});
})