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
  'cloning': [
    ['_baseClone', 'identity']
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
    ['_createWrapper', '_createPartialWrapper'],
    ['unary', '_baseUnary']
  ],
  'flattening': [
    ['_baseFlatten', 'head']
  ],
  'guards': [
    ['_getNative', '_getValue'],
    ['_isHostObject', 'stubFalse'],
    ['_isHostObject', 'noop'],
    ['_isIterateeCall', 'stubFalse'],
    ['_isIterateeCall', 'noop'],
    ['_isPrototype', 'stubFalse'],
    ['_isPrototype', 'noop'],
    ['isNaN', 'baseIsNaN'],
    ['isNative', 'stubTrue'],
    ['isNative', 'identity'],
    ['keys', '_baseKeys'],
    ['keysIn', '_baseKeysIn'],
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
  'paths': [
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
    ['_baseIteratee', 'identity'],
    ['_isFlattenableIteratee', 'isArray']
  ],
  'uncommons': [
    ['_equalByTag', 'eq'],
    ['_initCloneByTag', 'identity'],
    ['isArguments', 'stubFalse'],
    ['isArguments', 'noop'],
    ['isSymbol', 'stubFalse'],
    ['isTypedArray', 'stubFalse']
  ],
};

export const overrides = {
  'ary': { 'currying': true },
  'clone': { 'cloning': true },
  'cloneDeep': { 'cloning': true },
  'cloneDeepWith': { 'cloning': true },
  'cloneWith': { 'cloning': true },
  'concat': { 'flattening': true },
  'curry': { 'currying': true },
  'curryRight': { 'currying': true },
  'flatMap': { 'flattening': true },
  'flatMapDeep': { 'flattening': true },
  'flatMapDepth': { 'flattening': true },
  'flatten': { 'flattening': true },
  'flattenDeep': { 'flattening': true },
  'flattenDepth': { 'flattening': true },
  'flip': { 'currying': true },
  'partialRight': { 'currying': true },
  'rearg': { 'currying': true }
};

export default { features, overrides };
