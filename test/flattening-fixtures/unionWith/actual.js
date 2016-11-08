import { unionWith } from 'lodash';

unionWith([1, 2], [2, 3], (a, b) => a === b);
