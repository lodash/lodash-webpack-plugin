export const features = {
  'caching': [
    ['_createSet', 'noop'],
    ['_MapCache', '_ListCache'],
    ['_Stack', '_ListCache']
  ],
  'chaining': [
    ['_getFuncName', 'stubString'],
    ['_getFuncName', 'noop'],
    ['_isLaziable', 'stubFalse'],
    ['_isLaziable', 'noop'],
    ['_LodashWrapper', 'noop']
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
    ['_baseFilter', '_arrayFilter'],
    ['_baseMap', '_arrayMap'],
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
  'flattening': [
    ['_baseFlatten', 'identity']
  ],
  'guards': [
    ['_getNative', '_getValue'],
    ['_isHostObject', 'stubFalse'],
    ['_isHostObject', 'noop'],
    ['_isIterateeCall', 'stubFalse'],
    ['_isIterateeCall', 'noop'],
    ['_isPrototype', 'stubFalse'],
    ['_isPrototype', 'noop'],
    ['isArguments', 'stubFalse'],
    ['isArguments', 'noop'],
    ['isNative', 'stubTrue'],
    ['isNative', 'identity'],
    ['keys', '_baseKeys'],
    ['times', '_baseTimes']
  ],
  'memoizing': [
    ['memoize', 'identity']
  ],
  'metadata': [
    ['_baseSetData', 'identity'],
    ['_getData', 'noop'],
    ['_mergeData', 'identity'],
    ['_setData', 'identity']
  ],
  'paths':[
    ['_baseGet', '_getValue'],
    ['_castPath', 'identity'],
    ['_isKey', 'identity'],
    ['has', '_baseHas'],
    ['hasIn', '_baseHasIn'],
    ['property', '_baseProperty']
  ],
  'placeholders': [
    ['_composeArgs', 'identity'],
    ['_composeArgsRight', 'identity'],
    ['_getHolder', 'noop'],
    ['_getPlaceholder', 'noop'],
    ['_replaceHolders', 'stubArray'],
    ['_replaceHolders', 'constant']
  ],
  'shorthands': [
    ['_baseIteratee', 'identity']
  ]
};

export default { features };
