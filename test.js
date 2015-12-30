import test from 'ava';
import path from 'path';
import isStream from 'is-stream';
import fn from './';

test('read', async t => {
	const index = await fn.read('index.js');
	t.is(index.cwd, process.cwd());
	t.is(index.base, process.cwd());
	t.is(index.path, path.join(__dirname, 'index.js'));
	t.true(Buffer.isBuffer(index.contents));
	t.true(index.contents.length > 10);

	const readme = await fn.read('readme.md', {cwd: 'node_modules/ava'});
	t.true(/Futuristic test runner/.test(readme.contents.toString('utf8')));

	const wow = await fn.read('index.js', {base: 'wow'});
	t.is(wow.base, 'wow');

	const noContents = await fn.read('index.js', {read: false});
	t.same(noContents.contents, null);

	const stream = await fn.read('index.js', {buffer: false});
	t.true(isStream(stream.contents));
});

test('read sync', t => {
	const index = fn.readSync('index.js');
	t.is(index.cwd, process.cwd());
	t.is(index.base, process.cwd());
	t.is(index.path, path.join(__dirname, 'index.js'));
	t.true(Buffer.isBuffer(index.contents));
	t.true(index.contents.length > 10);

	const readme = fn.readSync('readme.md', {cwd: 'node_modules/ava'});
	t.true(/Futuristic test runner/.test(readme.contents.toString('utf8')));

	const wow = fn.readSync('index.js', {base: 'wow'});
	t.is(wow.base, 'wow');

	const noContents = fn.readSync('index.js', {read: false});
	t.same(noContents.contents, null);

	const stream = fn.readSync('index.js', {buffer: false});
	t.true(isStream(stream.contents));
});
