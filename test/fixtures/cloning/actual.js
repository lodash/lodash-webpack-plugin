import { conforms, isNumber } from 'lodash';

conforms({ 'a': isNumber })({ 'a': 1 });
