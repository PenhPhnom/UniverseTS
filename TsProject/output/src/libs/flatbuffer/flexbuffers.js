/* eslint-disable @typescript-eslint/no-namespace */
import { Builder } from './flexbuffers/builder';
import { toReference as toReferenceFunction } from './flexbuffers/reference';
export function builder() {
    return new Builder();
}
export function toObject(buffer) {
    return toReferenceFunction(buffer).toObject();
}
export function encode(object, size = 2048, deduplicateStrings = true, deduplicateKeys = true, deduplicateKeyVectors = true) {
    const builder = new Builder(size > 0 ? size : 2048, deduplicateStrings, deduplicateKeys, deduplicateKeyVectors);
    builder.add(object);
    return builder.finish();
}
const builderFunction = builder;
const toObjectFunction = toObject;
const encodeFunction = encode;
export var flexbuffers;
(function (flexbuffers) {
    flexbuffers.builder = builderFunction;
    flexbuffers.toObject = toObjectFunction;
    flexbuffers.encode = encodeFunction;
    flexbuffers.toReference = toReferenceFunction;
})(flexbuffers || (flexbuffers = {}));
export default flexbuffers;
//# sourceMappingURL=flexbuffers.js.map