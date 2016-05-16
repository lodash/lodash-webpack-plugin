import { toPath, memoize } from 'lodash';

toPath('a.b.c');
memoize(value => JSON.stringify(value));
