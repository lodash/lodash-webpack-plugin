import { curry } from 'lodash';

curry((a, b) => [a, b])(1)(2);
