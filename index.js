'use strict';
var path = require('path');
var fs = require('graceful-fs');
var stripBom = require('strip-bom');
var File = require('vinyl');

exports.read = function (pth, opts, cb) {

	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	fs.stat(pth, function (err, stat) {
		if (err) {
			cb(err);
			return;
		}

		var cwd = process.cwd();
		var resolvedPath = path.resolve(pth);
		var base = opts.base || cwd;

		var file = new File({
			cwd: cwd,
			base: base,
			path: resolvedPath,
			stat: stat,
		});

		if (opts.read === false) {
			return cb(null, file);
		}

		if (opts.buffer === false) {
			file.contents = fs.createReadStream(pth).pipe(stripBom.stream());
			return cb(null, file);
		}

		fs.readFile(pth, function (err, buf) {
			if (err) {
				cb(err);
				return;
			}
			file.contents = stripBom(buf);
			cb(null, file);
		});
	});
};

exports.readSync = function (pth, opts) {
	if (!opts) { opts = {}; }

	var contents;

	if (opts.read !== false) {
		contents = opts.buffer === false ?
			fs.createReadStream(pth).pipe(stripBom.stream()) :
			stripBom(fs.readFileSync(pth));
	}

	return new File({
		cwd: process.cwd(),
		base: opts.base || process.cwd(),
		path: path.resolve(pth),
		stat: fs.statSync(pth),
		contents: contents
	});
};
