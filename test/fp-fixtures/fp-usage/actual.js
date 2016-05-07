import { map } from 'lodash';
import { map as fmap } from 'lodash/fp';

map([1, 2, 3], String);
fmap(String, [1, 2, 3]);
