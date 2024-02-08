/* eslint-disable @typescript-eslint/no-namespace */
import * as constants from './constants';
import * as utils from './utils';
import { Long as LongClass } from './long';
import { Encoding as EncodingEnum } from './encoding';
import { Builder as BuilderClass } from './builder';
import { ByteBuffer as ByteBufferClass } from './byte-buffer';
export var flatbuffers;
(function (flatbuffers) {
    flatbuffers.SIZEOF_SHORT = constants.SIZEOF_SHORT;
    flatbuffers.SIZEOF_INT = constants.SIZEOF_INT;
    flatbuffers.FILE_IDENTIFIER_LENGTH = constants.FILE_IDENTIFIER_LENGTH;
    flatbuffers.SIZE_PREFIX_LENGTH = constants.SIZE_PREFIX_LENGTH;
    flatbuffers.Encoding = EncodingEnum;
    flatbuffers.int32 = utils.int32;
    flatbuffers.float32 = utils.float32;
    flatbuffers.float64 = utils.float64;
    flatbuffers.isLittleEndian = utils.isLittleEndian;
    flatbuffers.Long = LongClass;
    flatbuffers.Builder = BuilderClass;
    flatbuffers.ByteBuffer = ByteBufferClass;
})(flatbuffers || (flatbuffers = {}));
export default flatbuffers;
//# sourceMappingURL=flatbuffers.js.map