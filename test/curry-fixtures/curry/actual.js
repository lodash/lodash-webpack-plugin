import { curry } from 'lodash';

curry((a, b, c) => [a, b, c])(1)(2)(3);
