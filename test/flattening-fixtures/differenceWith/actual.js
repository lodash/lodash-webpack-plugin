import { differenceWith } from 'lodash';

differenceWith([1, 2], [2, 3], (a, b) => a === b);
