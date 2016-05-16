import { isArguments } from 'lodash';

(() => isArguments(arguments))(1, 2, 3);
