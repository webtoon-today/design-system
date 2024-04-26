'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process')
 
const ignorePackages = [''];
const packages = fs.readdirSync(path.resolve(__dirname, '../packages'));

const packageNames = packages.filter(name => !ignorePackages.includes(name));

packageNames.forEach((packageName) => {
    const buildCommand = `npm run build -w ${packageName}`;
    console.log(buildCommand);
    child_process.execSync(buildCommand, {stdio: 'inherit'});
})