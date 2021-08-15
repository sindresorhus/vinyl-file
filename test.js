import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {Buffer} from 'node:buffer';
import test from 'ava';
import {isStream} from 'is-stream';
import {vinylFile, vinylFileSync} from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('async', async t => {
	const index = await vinylFile('index.js');
	t.is(index.cwd, process.cwd());
	t.is(index.base, process.cwd());
	t.is(index.path, path.join(__dirname, 'index.js'));
	t.true(Buffer.isBuffer(index.contents));
	t.true(index.contents.length > 10);

	const readme = await vinylFile('readme.md', {cwd: 'node_modules/ava'});
	t.regex(readme.contents.toString('utf8'), /How is the name written and pronounced/);

	const wow = await vinylFile('index.js', {base: 'wow'});
	t.is(wow.base, 'wow');

	const noContents = await vinylFile('index.js', {read: false});
	t.is(noContents.contents, null);

	const stream = await vinylFile('index.js', {buffer: false});
	t.true(isStream(stream.contents));
});

test('sync', t => {
	const index = vinylFileSync('index.js');
	t.is(index.cwd, process.cwd());
	t.is(index.base, process.cwd());
	t.is(index.path, path.join(__dirname, 'index.js'));
	t.true(Buffer.isBuffer(index.contents));
	t.true(index.contents.length > 10);

	const readme = vinylFileSync('readme.md', {cwd: 'node_modules/ava'});
	t.regex(readme.contents.toString('utf8'), /How is the name written and pronounced/);

	const wow = vinylFileSync('index.js', {base: 'wow'});
	t.is(wow.base, 'wow');

	const noContents = vinylFileSync('index.js', {read: false});
	t.is(noContents.contents, null);

	const stream = vinylFileSync('index.js', {buffer: false});
	t.true(isStream(stream.contents));
});
