### Webtoon Today Design System

### Preferred Dev Environment

* Ubuntu Linux 20.04.
* Node 18.22.

### Install instruction

1. run dependency install on root folder. 

```bash
webtoon-today-ui$ npm install
```

2. build

At root directory

```bash
// build all packages
webtoon-today-ui$ npm run build:all
```

```bash
// build each package
webtoon-today-ui$ npm run build:toast
webtoon-today-ui$ npm run build:drawer
```

At package directory
```bash
webtoon-today-ui/packages/toast$ npm run build
```