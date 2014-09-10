'use strict';
var path = require('path');
var fs = require('graceful-fs');
var stripBom = require('strip-bom');
var File = require('vinyl');

exports.read = function (pth, cb) {
	fs.stat(pth, function (err, stat) {
		if (err) {
			cb(err);
			return;
		}

		fs.readFile(pth, function (err, buf) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, new File({
				cwd: process.cwd(),
				base: process.cwd(),
				path: path.resolve(pth),
				stat: stat,
				contents: stripBom(buf)
			}));
		});
	});
};

exports.readSync = function (pth) {
	return new File({
		cwd: process.cwd(),
		base: process.cwd(),
		path: path.resolve(pth),
		stat: fs.statSync(pth),
		contents: stripBom(fs.readFileSync(pth))
	});
};
