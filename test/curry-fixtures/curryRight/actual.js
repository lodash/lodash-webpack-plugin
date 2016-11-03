import { curryRight } from 'lodash';

curryRight((a, b) => [a, b])(2)(1);
