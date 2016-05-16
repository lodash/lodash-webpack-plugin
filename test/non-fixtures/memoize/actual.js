import { memoize } from 'lodash';

memoize(value => JSON.stringify(value));
