import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export const generateRollupConfig = (relativePackagePath: string) => {
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
            dts(),
            postcss({
                inject: false
            })
        ]
    }]
}