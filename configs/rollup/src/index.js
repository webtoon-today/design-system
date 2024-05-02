'use strict';

var typescript = require('@rollup/plugin-typescript');
var rollupPluginDts = require('rollup-plugin-dts');
var postcss = require('rollup-plugin-postcss');

const generateRollupConfig = (relativePackagePath) => {
    return [{
            input: 'src/main.ts',
            output: {
                file: `${relativePackagePath}/index.js`,
                format: 'cjs'
            },
            plugins: [
                typescript({ tsconfig: './tsconfig.json' }),
                postcss({
                    inject: true,
                    extensions: ['.css', '.scss'],
                })
            ]
        },
        {
            input: 'src/main.ts',
            output: {
                file: `${relativePackagePath}/index.d.ts`,
                format: 'es'
            },
            plugins: [
                rollupPluginDts.dts(),
                postcss({
                    inject: false
                })
            ]
        }];
};

exports.generateRollupConfig = generateRollupConfig;
