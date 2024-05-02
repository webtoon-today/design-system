'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process')

const packageDirectories = fs.readdirSync(path.resolve(__dirname, '../packages'));
const packageNames = packageDirectories
    .map((directory) => {
        const componentDirectories = fs.readdirSync(path.resolve(__dirname, `../packages/${directory}`));

        return componentDirectories.map((component) => {
            const packageJsonPath = path.resolve(__dirname, `../packages/${directory}/${component}/package.json`);
            const packageName = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).name;
            return packageName;
        });
    })
    .flat();

console.log(packageNames)

packageNames.forEach((packageName) => {
    const buildCommand = `npm run build -w ${packageName}`;
    console.log(buildCommand);
    child_process.execSync(buildCommand, {stdio: 'inherit'});
})