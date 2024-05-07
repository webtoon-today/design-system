'use strict';

const fs = require('fs');
const child_process = require('child_process');

// if ./.github directory, return 0
if (fs.existsSync('./.github')) {
    console.log("skip postinstall script");
    process.exit(0);
}

// if ./dist exist directory, copy -r dist/* to ./ 
// finally rm -rf dist
try {
    if (fs.existsSync('./dist')) {
        child_process.execSync('cp -r dist/* ./', {stdio: 'inherit'});
        child_process.execSync('rm -rf dist', {stdio: 'inherit'});
        console.log("postinstall script executed successfully");
    }
} catch (error) {
    console.error("postinstall script failed");
    process.exit(1);
}