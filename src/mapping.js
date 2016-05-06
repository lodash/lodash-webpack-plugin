export const features = {
  'caching': [
    ['_createSet', 'noop'],
    ['_MapCache', '_ListCache'],
    ['_Stack', '_ListCache']
  ],
  'coercions': [
    ['_baseToNumber', 'identity'],
    ['_baseToString', 'identity'],
    ['_toKey', 'identity'],
    ['toFinite', 'identity'],
    ['toInteger', 'identity'],
    ['toLength', 'identity'],
    ['toNumber', 'identity'],
    ['toString', 'identity']
  ],
  'collections': [
    ['_baseAggregator', '_arrayAggregator'],
    ['each', '_arrayEach'],
    ['eachRight', '_arrayEachRight'],
    ['every', '_arrayEvery'],
    ['filter', '_arrayFilter'],
    ['forEach', '_arrayEach'],
    ['forEachRight', '_arrayEachRight'],
    ['includes', '_arrayIncludes'],
    ['map', '_arrayMap'],
    ['reduce', '_arrayReduce'],
    ['reduceRight', '_arrayReduceRight'],
    ['some', '_arraySome']
  ],
  'currying': [
    ['_createWrapper', '_createPartialWrapper']
  ],
  'guards': [
    ['_getTag', '_baseGetTag'],
    ['_isIterateeCall', 'noop'],
    ['keys', '_baseKeys']
  ],
  'metadata': [
    ['_baseSetData', 'identity'],
    ['_getData', 'noop'],
    ['_mergeData', 'identity'],
    ['_setData', 'identity']
  ],
  'paths':[
    ['_castPath', 'identity'],
    ['_isKey', 'identity']
  ],
  'placeholders': [
    ['_composeArgs', 'identity'],
    ['_composeArgsRight', 'identity'],
    ['_getHolder', 'noop'],
    ['_getPlaceholder', 'noop'],
    ['_replaceHolders', 'noop']
  ],
  'shorthands': [
    ['_baseIteratee', 'identity']
  ]
};

export default { features };
