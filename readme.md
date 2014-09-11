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

## API

### read(path, [options], callback)

Creates vinyl file from `path`. Resulting file will be passed to callback.

#### options
Type: `Object`

#### options.base
Type: `String`
Default: `process.cwd()`

Base path, that will be written in resulting object.

#### options.cwd
Type: `String`
Default: `process.cwd()`

Current working directory, that will be written in resulting object.

#### options.buffer
Type: `Boolean`
Default: `true`

Setting this to `false` will return `file.contents` as a stream and not buffer files. This is useful when working with large files. **Note:** Plugins might not implement support for streams.

#### options.read
Type: `Boolean`
Default: `true`

Setting this to `false` will return `file.contents` as null and not read the file at all.

## readSync(path, [options])

Creates vinyl file in sync way. Returns vinyl object.

#### options

Same as in `read` method

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
