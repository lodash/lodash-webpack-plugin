import { partial } from 'lodash';

partial((a, b) => [a, b], 1)(2);
