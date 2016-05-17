import { curryRight } from 'lodash';

curryRight((a, b, c) => [a, b, c])(3)(2)(1);
