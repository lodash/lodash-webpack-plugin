import { partialRight } from 'lodash';

partialRight((a, b, c) => [a, b, c], 2, 3)(1);
