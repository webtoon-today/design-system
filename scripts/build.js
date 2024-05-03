'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process')

const packageDirectories = fs.readdirSync(path.resolve(__dirname, '../packages'), {withFileTypes: true})
    .filter((file) => file.isDirectory())
    .map((directory) => directory.name);

const packageNames = packageDirectories.map((directory) => 
    fs.readdirSync(path.resolve(__dirname, `../packages/${directory}`), {withFileTypes: true})
        .filter((file) => file.isDirectory())
        .map((component) => {
            const componentName = component.name;
            const packageJsonPath = path.resolve(__dirname, `../packages/${directory}/${componentName}/package.json`);
            const packageName = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).name;
            return packageName;
        }
    ))
    .flat();

console.log(packageNames);

packageNames.forEach((packageName) => {
    const buildCommand = `npm run build -w ${packageName}`;
    console.log(buildCommand);
    child_process.execSync(buildCommand, {stdio: 'inherit'});
})