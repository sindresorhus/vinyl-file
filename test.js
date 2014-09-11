'use strict';
var test = require('ava');
var vinylFile = require('./');
var isStream = require('isstream');

test('.read()', function (t) {
	t.plan(10);

	vinylFile.read('index.js', function (err, file) {
		t.assert(file.cwd === process.cwd());
		t.assert(file.base === process.cwd());
		t.assert(file.path === __dirname + '/index.js');
		t.assert(typeof file.stat === 'object');
		t.assert(Buffer.isBuffer(file.contents));
		t.assert(file.contents.length > 10);
	});

	vinylFile.read('index.js', {cwd: 'wow'}, function (err, file) {
		t.assert(file.cwd === 'wow');
	});

	vinylFile.read('index.js', {base: 'wow'}, function (err, file) {
		t.assert(file.base === 'wow');
	});

	vinylFile.read('index.js', {read: false}, function (err, file) {
		t.assert(file.contents === null);
	});

	vinylFile.read('index.js', {buffer: false}, function (err, file) {
		t.assert(isStream(file.contents));
	});
});

test('.readSync()', function (t) {
	t.plan(10);

	var file = vinylFile.readSync('index.js');
	t.assert(file.cwd === process.cwd());
	t.assert(file.base === process.cwd());
	t.assert(file.path === __dirname + '/index.js');
	t.assert(typeof file.stat === 'object');
	t.assert(Buffer.isBuffer(file.contents));
	t.assert(file.contents.length > 10);

	file = vinylFile.readSync('index.js', {cwd: 'wow'});
	t.assert(file.cwd === 'wow');

	file = vinylFile.readSync('index.js', {base: 'wow'});
	t.assert(file.base === 'wow');

	file = vinylFile.readSync('index.js', {read: false});
	t.assert(file.contents === null);

	file = vinylFile.readSync('index.js', {buffer: false});
	t.assert(isStream(file.contents));
});
