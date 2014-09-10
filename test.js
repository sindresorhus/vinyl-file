'use strict';
var test = require('ava');
var vinylFile = require('./');

test('.read()', function (t) {
	t.plan(6);

	vinylFile.read('index.js', function (err, file) {
		t.assert(file.cwd === process.cwd());
		t.assert(file.base === process.cwd());
		t.assert(file.path === __dirname + '/index.js');
		t.assert(typeof file.stat === 'object');
		t.assert(Buffer.isBuffer(file.contents));
		t.assert(file.contents.length > 10);
	});
});

test('.readSync()', function (t) {
	t.plan(6);

	var file = vinylFile.readSync('index.js')
	t.assert(file.cwd === process.cwd());
	t.assert(file.base === process.cwd());
	t.assert(file.path === __dirname + '/index.js');
	t.assert(typeof file.stat === 'object');
	t.assert(Buffer.isBuffer(file.contents));
	t.assert(file.contents.length > 10);
});
