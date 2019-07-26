export const features = {
  'caching': [
    ['_baseIndexOf', '_strictIndexOf'],
    ['_cacheHas', '_arrayIncludes'],
    ['_createSet', 'noop'],
    ['_MapCache', '_ListCache'],
    ['_SetCache', 'castArray'],
    ['_Stack', '_ListCache']
  ],
  'chaining': [
    ['_getFuncName', 'stubString'],
    ['_isLaziable', 'stubFalse'],
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
    ['sample', '_arraySample'],
    ['sampleSize', '_arraySampleSize'],
    ['shuffle', '_arrayShuffle'],
    ['some', '_arraySome']
  ],
  'currying': [
    ['_createWrap', '_createPartial'],
    ['unary', '_baseUnary']
  ],
  'deburring': [
    ['deburr', 'toString']
  ],
  'exotics': [
    ['_baseGetTag', '_objectToString'],
    ['_equalByTag', 'eq'],
    ['_getAllKeys', '_nativeKeys'],
    ['_getAllKeysIn', '_nativeKeysIn'],
    ['_getSymbols', 'stubArray'],
    ['_getSymbolsIn', 'stubArray'],
    ['_getTag', '_objectToString'],
    ['_initCloneByTag', 'identity'],
    ['_mapToArray', 'stubArray'],
    ['_setToArray', 'stubArray'],
    ['_setToPairs', 'stubArray'],
    ['isArguments', 'stubFalse'],
    ['isArrayBuffer', 'baseIsArrayBuffer'],
    ['isBuffer', 'stubFalse'],
    ['isDate', 'baseIsDate'],
    ['isMap', 'stubFalse'],
    ['isRegExp', 'baseIsRegExp'],
    ['isSet', 'stubFalse'],
    ['isSymbol', 'stubFalse'],
    ['isTypedArray', 'stubFalse']
  ],
  'flattening': [
    ['_baseFlatten', 'head'],
    ['_flatRest', 'identity']
  ],
  'guards': [
    ['_getNative', '_getValue'],
    ['_getRawTag', '_objectToString'],
    ['_isIterateeCall', 'stubFalse'],
    ['_isPrototype', 'stubFalse'],
    ['_baseKeys', '_nativeKeys'],
    ['_baseKeysIn', '_nativeKeysIn'],
    ['_castFunction', 'identity'],
    ['_castRest', 'identity'],
    ['_shortOut', 'identity'],
    ['isNaN', 'baseIsNaN'],
    ['isNative', 'stubTrue'],
    ['keys', '_nativeKeys'],
    ['keysIn', '_nativeKeysIn'],
    ['times', '_baseTimes']
  ],
  'memoizing': [
    ['_memoizeCapped', 'identity'],
    ['memoize', 'identity']
  ],
  'metadata': [
    ['_baseSetData', 'identity'],
    ['_getData', 'noop'],
    ['_mergeData', 'identity'],
    ['_setData', 'identity'],
    ['_setToString', 'identity'],
    ['_setWrapToString', 'identity']
  ],
  'paths': [
    ['_baseGet', '_getValue'],
    ['_castPath', 'castArray'],
    ['_isKey', 'identity'],
    ['_parent', 'identity'],
    ['has', '_baseHas'],
    ['hasIn', '_baseHasIn'],
    ['property', '_baseProperty'],
    ['propertyOf', '_basePropertyOf']
  ],
  'placeholders': [
    ['_getHolder', 'noop'],
    ['_replaceHolders', 'stubArray']
  ],
  'shorthands': [
    ['_baseIteratee', 'identity']
  ],
  'unicode': [
    ['_hasUnicode', 'stubFalse'],
    ['_hasUnicodeWord', 'stubFalse'],
    ['_unicodeSize', '_asciiSize'],
    ['_unicodeToArray', '_asciiToArray'],
    ['_unicodeWords', '_asciiWords'],
    ['stringSize', '_asciiSize'],
    ['stringToArray', '_asciiToArray']
  ]
}

export const overrides = {
  'ary': { 'currying': true },
  'camelCase': { 'unicode': true },
  'clone': { 'cloning': true },
  'cloneDeep': { 'cloning': true },
  'cloneDeepWith': { 'cloning': true },
  'cloneWith': { 'cloning': true },
  'concat': { 'flattening': true },
  'curry': { 'currying': true },
  'curryRight': { 'currying': true },
  'difference': { 'flattening': true },
  'differenceBy': { 'flattening': true },
  'differenceWith': { 'flattening': true },
  'fill': { 'coercions': true },
  'flatMap': { 'flattening': true },
  'flatMapDeep': { 'flattening': true },
  'flatMapDepth': { 'flattening': true },
  'flatten': { 'flattening': true },
  'flattenDeep': { 'flattening': true },
  'flattenDepth': { 'flattening': true },
  'flip': { 'currying': true },
  'isInteger': { 'coercions': true },
  'kebabCase': { 'unicode': true },
  'lowerCase': { 'unicode': true },
  'parseInt': { 'coercions': true },
  'partialRight': { 'currying': true },
  'pick': { 'paths': true },
  'rearg': { 'currying': true },
  'snakeCase': { 'unicode': true },
  'startCase': { 'unicode': true },
  'union': { 'flattening': true },
  'unionBy': { 'flattening': true },
  'unionWith': { 'flattening': true },
  'uniqueId': { 'coercions': true },
  'upperCase': { 'unicode': true },
  'xor': { 'flattening': true },
  'xorBy': { 'flattening': true },
  'xorWith': { 'flattening': true }
}

export default { features, overrides }
