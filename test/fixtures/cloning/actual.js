import { conforms, isString } from 'lodash';

conforms({ 'a': isString })({ 'a': 1 });
