import { rearg } from 'lodash';

rearg((a, b) => [a, b], 1, 0)(2, 1);
