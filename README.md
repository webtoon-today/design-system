### Webtoon Today Design System

### Preferred Dev Environment

* Ubuntu Linux 20.04.
* Node 18.22.

### Install instruction

#### 1. run dependency install on root folder. 

```bash
design-system$ npm install
```

#### 2. dev

```bash
design-system$ npm run storybook
```

#### 3. test

[test-storybook CLI options](https://storybook.js.org/docs/writing-tests/test-runner#cli-options)
- `--help`
- `--watchAll`
- `--watch`
- `--coverage`

```bash
design-system$ npm run test-storybook
design-system$ npm run test-storybook -- --<option> 
```

#### 4. build

At root directory

```bash
// build all packages
design-system$ npm run build
```

```bash
// build each package
design-system$ npm run build --package=toast
design-system$ npm run build --package=drawer
```

At package directory
```bash
design-system/packages/toast$ npm run build
```

### Create New Package
1. make directory

```bash
design-system$ mkdir packages/<root-package>/<new-package>
```

2. touch and copy config file

```bash
design-system$ 
mkdir packages/<root-package>/<new-package>/src && touch packages/<root-package>/<new-package>/src/main.ts

design-system$ 
cp packages/utils/Dawer/package.json \
packages/utils/Dawer/rollup.config.mjs \
packages/utils/Dawer/tsconfig.json \
packages/<root-package>/<new-package>
```

3. change config file

- `<root-package>/<new-package>/package.json`

```diff
{
-    "name": "drawer",
+    "name": "<new-package>",
    "version": "0.1.0",
    "main": "./index.js",
    "types": "./index.d.ts",
    "scripts": {
        "build": "rollup -c"
    },
    "devDependencies": {
        "rollup-config": "file: ../../../configs/rollup"
    }
}
```

- `<root-package>/<new-package>/rollup.config.mjs`

```diff
import { generateRollupConfig } from "rollup-config";

- export default generateRollupConfig(../../../dist/Drawer');
+ export default generateRollupConfig('../../dist/<new-package>');
```

TODO: 패키지를 새로 만드는 과정은 반복적인 일이기 때문에 필요시 스크립트를 작성할 수 있습니다.