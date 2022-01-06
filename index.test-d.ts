import {expectType} from 'tsd';
import {BufferFile, NullFile, StreamFile} from 'vinyl';
import {vinylFile, vinylFileSync} from './index.js';

expectType<Promise<NullFile>>(vinylFile('./', {read: false}));
expectType<Promise<NullFile>>(vinylFile('./', {read: false, buffer: true}));
expectType<Promise<NullFile>>(vinylFile('./', {read: false, buffer: false}));

expectType<Promise<StreamFile>>(vinylFile('./', {buffer: false}));
expectType<Promise<StreamFile>>(vinylFile('./', {read: true, buffer: false}));

expectType<Promise<BufferFile>>(vinylFile('./', {base: undefined, cwd: undefined, buffer: true, read: true}));
expectType<Promise<BufferFile>>(vinylFile('./', {buffer: true}));
expectType<Promise<BufferFile>>(vinylFile('./', {buffer: undefined, read: true}));
expectType<Promise<BufferFile>>(vinylFile('./', {read: undefined}));
expectType<Promise<BufferFile>>(vinylFile('./', {}));
expectType<Promise<BufferFile>>(vinylFile('./'));

expectType<NullFile>(vinylFileSync('./', {read: false}));
expectType<NullFile>(vinylFileSync('./', {read: false, buffer: true}));
expectType<NullFile>(vinylFileSync('./', {read: false, buffer: false}));

expectType<StreamFile>(vinylFileSync('./', {buffer: false}));
expectType<StreamFile>(vinylFileSync('./', {read: true, buffer: false}));

expectType<BufferFile>(vinylFileSync('./', {base: undefined, cwd: undefined, buffer: true, read: true}));
expectType<BufferFile>(vinylFileSync('./', {buffer: true}));
expectType<BufferFile>(vinylFileSync('./', {buffer: undefined, read: true}));
expectType<BufferFile>(vinylFileSync('./', {read: undefined}));
expectType<BufferFile>(vinylFileSync('./', {}));
expectType<BufferFile>(vinylFileSync('./'));
