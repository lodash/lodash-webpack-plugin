import { flatten, isArguments } from 'lodash';

flatten([[1]]);
(() => isArguments(arguments))(1, 2, 3);
