export default {
  'features': {
    'caching': [
      ['_createSet', 'noop'],
      ['_setToArray', 'noop'],
      ['_MapCache', '_ListCache']
    ],
    'coercions': [
      ['_baseToNumber', 'identity'],
      ['_baseToString', 'identity'],
      ['_toKey', 'identity'],
      ['toInteger', 'identity'],
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
  }
};
