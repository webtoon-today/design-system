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