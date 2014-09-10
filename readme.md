# vinyl-file [![Build Status](https://travis-ci.org/sindresorhus/vinyl-file.svg?branch=master)](https://travis-ci.org/sindresorhus/vinyl-file)

> Create a [vinyl file](https://github.com/wearefractal/vinyl) from an actual file


## Install

```sh
$ npm install --save vinyl-file
```


## Usage

```js
var vinylFile = require('vinyl-file');

var file = vinylFile.readSync('index.js');

console.log(file.path);
//=> /Users/sindresorhus/dev/vinyl-file/index.js

console.log(file.cwd);
//=> /Users/sindresorhus/dev/vinyl-file
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
