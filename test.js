import path from 'path';
import test from 'ava';
import isStream from 'is-stream';
import m from './';

test('async', async t => {
	const index = await m.read('index.js');
	t.is(index.cwd, process.cwd());
	t.is(index.base, process.cwd());
	t.is(index.path, path.join(__dirname, 'index.js'));
	t.true(Buffer.isBuffer(index.contents));
	t.true(index.contents.length > 10);

	const readme = await m.read('readme.md', {cwd: 'node_modules/ava'});
	t.true(/Futuristic test runner/.test(readme.contents.toString('utf8')));

	const wow = await m.read('index.js', {base: 'wow'});
	t.is(wow.base, 'wow');

	const noContents = await m.read('index.js', {read: false});
	t.deepEqual(noContents.contents, null);

	const stream = await m.read('index.js', {buffer: false});
	t.true(isStream(stream.contents));
});

test('sync', t => {
	const index = m.readSync('index.js');
	t.is(index.cwd, process.cwd());
	t.is(index.base, process.cwd());
	t.is(index.path, path.join(__dirname, 'index.js'));
	t.true(Buffer.isBuffer(index.contents));
	t.true(index.contents.length > 10);

	const readme = m.readSync('readme.md', {cwd: 'node_modules/ava'});
	t.true(/Futuristic test runner/.test(readme.contents.toString('utf8')));

	const wow = m.readSync('index.js', {base: 'wow'});
	t.is(wow.base, 'wow');

	const noContents = m.readSync('index.js', {read: false});
	t.deepEqual(noContents.contents, null);

	const stream = m.readSync('index.js', {buffer: false});
	t.true(isStream(stream.contents));
});
