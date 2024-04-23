### Webtoon Today Design System

### Preferred Dev Environment

* Ubuntu Linux 20.04.
* Node 18.22.

### Install instruction

1. run dependency install on root folder. 

```bash
design-system$ npm install
```

2. build

At root directory

```bash
// build all packages
design-system$ npm run build:all
```

```bash
// build each package
design-system$ npm run build:toast
design-system$ npm run build:drawer
```

At package directory
```bash
design-system/packages/toast$ npm run build
```

### Create New Package
1. make directory

```bash
design-system$ mkdir packages/<new-package>
```

2. touch and copy config file

```bash
design-system$ 
mkdir packages/<new-package>/src \ 
touch packages/<new-package>/src/main.ts

design-system$ 
cp packages/toast/package.json \
packages/toast/rollup.config.mjs \
packages/toast/tsconfig.json \
packages/<new-package>
```

3. change config file

- `<new-package>/package.json`

```diff
{
-    "name": "toast",
+    "name": "<new-package>",
    "version": "0.1.0",
    "main": "./index.js",
    "types": "./index.d.ts",
    "scripts": {
        "build": "rollup -c"
    },
    "dependencies": {
    ...
    }
}
```

- `<new-package>/rollup.config.mjs`

```diff
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default [
    {
        input: 'src/main.ts',
        output: {
-           file: '../../toast/index.js',
+           file: '../../<new-package>/index.js',
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
-           file: '../../toast/index.d.ts',
+           file: '../../<new-package>/index.d.ts',
            format: 'es'
        },
        plugins: [
            dts(),
            postcss({
                inject: false
            })
        ]
    }
];
```

- `./package.json`

```diff
{
    ...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "storybook": "storybook dev -p 6006",
        "build-storybook": "storybook build",
-       "build:all": "npm run build:toast && npm run build:drawer",
+       "build:all": "npm run build:toast && npm run build:drawer && npm run build:<new-package>",
+       "build:<new-package>": "npm run build -w <new-package>",
        "build:toast": "npm run build -w toast",
        "build:drawer": "npm run build -w drawer"
    },
    ...
}
```

TODO: 패키지를 새로 만드는 과정은 반복적인 일이기 때문에 필요시 스크립트를 작성할 수 있습니다.

TODO: 패키지의 양이 많아져 빌드 스크립트의 유지 보수가 어려게 되면 `build.js` 스크립트 작성합니다.