import { partialRight } from 'lodash';

partialRight((a, b) => [a, b], 2)(1);
