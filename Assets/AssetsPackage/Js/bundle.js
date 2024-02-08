/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/GameMain.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@protobufjs/aspromise/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@protobufjs/aspromise/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "./node_modules/@protobufjs/base64/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@protobufjs/base64/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "./node_modules/@protobufjs/eventemitter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@protobufjs/eventemitter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "./node_modules/@protobufjs/float/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@protobufjs/float/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "./node_modules/@protobufjs/inquire/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@protobufjs/inquire/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "./node_modules/@protobufjs/pool/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/pool/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "./node_modules/@protobufjs/utf8/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/utf8/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ "./node_modules/inkjs/dist/ink-es2015.js":
/*!***********************************************!*\
  !*** ./node_modules/inkjs/dist/ink-es2015.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?e(exports):undefined}(this,(function(t){"use strict";class e{constructor(){if(this._components=[],this._componentsString=null,this._isRelative=!1,"string"==typeof arguments[0]){let t=arguments[0];this.componentsString=t}else if(arguments[0]instanceof e.Component&&arguments[1]instanceof e){let t=arguments[0],e=arguments[1];this._components.push(t),this._components=this._components.concat(e._components)}else if(arguments[0]instanceof Array){let t=arguments[0],e=!!arguments[1];this._components=this._components.concat(t),this._isRelative=e}}get isRelative(){return this._isRelative}get componentCount(){return this._components.length}get head(){return this._components.length>0?this._components[0]:null}get tail(){if(this._components.length>=2){let t=this._components.slice(1,this._components.length);return new e(t)}return e.self}get length(){return this._components.length}get lastComponent(){let t=this._components.length-1;return t>=0?this._components[t]:null}get containsNamedComponent(){for(let t=0,e=this._components.length;t<e;t++)if(!this._components[t].isIndex)return!0;return!1}static get self(){let t=new e;return t._isRelative=!0,t}GetComponent(t){return this._components[t]}PathByAppendingPath(t){let n=new e,i=0;for(let e=0;e<t._components.length&&t._components[e].isParent;++e)i++;for(let t=0;t<this._components.length-i;++t)n._components.push(this._components[t]);for(let e=i;e<t._components.length;++e)n._components.push(t._components[e]);return n}get componentsString(){return null==this._componentsString&&(this._componentsString=this._components.join("."),this.isRelative&&(this._componentsString="."+this._componentsString)),this._componentsString}set componentsString(t){if(this._components.length=0,this._componentsString=t,null==this._componentsString||""==this._componentsString)return;"."==this._componentsString[0]&&(this._isRelative=!0,this._componentsString=this._componentsString.substring(1));let n=this._componentsString.split(".");for(let t of n)/^(\-|\+)?([0-9]+|Infinity)$/.test(t)?this._components.push(new e.Component(parseInt(t))):this._components.push(new e.Component(t))}toString(){return this.componentsString}Equals(t){if(null==t)return!1;if(t._components.length!=this._components.length)return!1;if(t.isRelative!=this.isRelative)return!1;for(let e=0,n=t._components.length;e<n;e++)if(!t._components[e].Equals(this._components[e]))return!1;return!0}PathByAppendingComponent(t){let n=new e;return n._components.push.apply(n._components,this._components),n._components.push(t),n}}var n,i,r;function a(t,e){return t instanceof e?h(t):null}function s(t,e){if(t instanceof e)return h(t);throw new Error(`${t} is not of type ${e}`)}function l(t){return t.hasValidName&&t.name?t:null}function o(t){return void 0===t?null:t}function u(t){return"object"==typeof t&&"function"==typeof t.Equals}function h(t,e){return t}e.parentId="^",function(t){class e{constructor(t){this.index=-1,this.name=null,"string"==typeof t?this.name=t:this.index=t}get isIndex(){return this.index>=0}get isParent(){return this.name==t.parentId}static ToParent(){return new e(t.parentId)}toString(){return this.isIndex?this.index.toString():this.name}Equals(t){return null!=t&&t.isIndex==this.isIndex&&(this.isIndex?this.index==t.index:this.name==t.name)}}t.Component=e}(e||(e={})),function(t){function e(t,e){if(!t)throw void 0!==e&&console.warn(e),console.trace&&console.trace(),new Error("")}t.AssertType=function(t,n,i){e(t instanceof n,i)},t.Assert=e}(n||(n={}));class c extends Error{}function d(t){throw new c(t+" is null or undefined")}class p{constructor(){this.parent=null,this._debugMetadata=null,this._path=null}get debugMetadata(){return null===this._debugMetadata&&this.parent?this.parent.debugMetadata:this._debugMetadata}set debugMetadata(t){this._debugMetadata=t}get ownDebugMetadata(){return this._debugMetadata}DebugLineNumberOfPath(t){if(null===t)return null;let e=this.rootContentContainer;if(e){let n=e.ContentAtPath(t).obj;if(n){let t=n.debugMetadata;if(null!==t)return t.startLineNumber}}return null}get path(){if(null==this._path)if(null==this.parent)this._path=new e;else{let t=[],n=this,i=a(n.parent,N);for(;null!==i;){let r=l(n);null!=r&&r.hasValidName?t.unshift(new e.Component(r.name)):t.unshift(new e.Component(i.content.indexOf(n))),n=i,i=a(i.parent,N)}this._path=new e(t)}return this._path}ResolvePath(t){if(null===t)return d("path");if(t.isRelative){let e=a(this,N);return null===e&&(n.Assert(null!==this.parent,"Can't resolve relative path because we don't have a parent"),e=a(this.parent,N),n.Assert(null!==e,"Expected parent to be a container"),n.Assert(t.GetComponent(0).isParent),t=t.tail),null===e?d("nearestContainer"):e.ContentAtPath(t)}{let e=this.rootContentContainer;return null===e?d("contentContainer"):e.ContentAtPath(t)}}ConvertPathToRelative(t){let n=this.path,i=Math.min(t.length,n.length),r=-1;for(let e=0;e<i;++e){let i=n.GetComponent(e),a=t.GetComponent(e);if(!i.Equals(a))break;r=e}if(-1==r)return t;let a=n.componentCount-1-r,s=[];for(let t=0;t<a;++t)s.push(e.Component.ToParent());for(let e=r+1;e<t.componentCount;++e)s.push(t.GetComponent(e));return new e(s,!0)}CompactPathString(t){let e=null,n=null;if(t.isRelative)n=t.componentsString,e=this.path.PathByAppendingPath(t).componentsString;else{n=this.ConvertPathToRelative(t).componentsString,e=t.componentsString}return n.length<e.length?n:e}get rootContentContainer(){let t=this;for(;t.parent;)t=t.parent;return a(t,N)}Copy(){throw Error("Not Implemented: Doesn't support copying")}SetChild(t,e,n){t[e]&&(t[e]=null),t[e]=n,t[e]&&(t[e].parent=this)}}class m{constructor(t){t=void 0!==t?t.toString():"",this.string=t}get Length(){return this.string.length}Append(t){null!==t&&(this.string+=t)}AppendLine(t){void 0!==t&&this.Append(t),this.string+="\n"}AppendFormat(t,...e){this.string+=t.replace(/{(\d+)}/g,(t,n)=>void 0!==e[n]?e[n]:t)}toString(){return this.string}}class f{constructor(){if(this.originName=null,this.itemName=null,void 0!==arguments[1]){let t=arguments[0],e=arguments[1];this.originName=t,this.itemName=e}else if(arguments[0]){let t=arguments[0].toString().split(".");this.originName=t[0],this.itemName=t[1]}}static get Null(){return new f(null,null)}get isNull(){return null==this.originName&&null==this.itemName}get fullName(){return(null!==this.originName?this.originName:"?")+"."+this.itemName}toString(){return this.fullName}Equals(t){if(t instanceof f){let e=t;return e.itemName==this.itemName&&e.originName==this.originName}return!1}copy(){return new f(this.originName,this.itemName)}serialized(){return JSON.stringify({originName:this.originName,itemName:this.itemName})}static fromSerializedKey(t){let e=JSON.parse(t);if(!f.isLikeInkListItem(e))return f.Null;let n=e;return new f(n.originName,n.itemName)}static isLikeInkListItem(t){return"object"==typeof t&&(!(!t.hasOwnProperty("originName")||!t.hasOwnProperty("itemName"))&&(("string"==typeof t.originName||null===typeof t.originName)&&("string"==typeof t.itemName||null===typeof t.itemName)))}}class g extends Map{constructor(){if(super(arguments[0]instanceof g?arguments[0]:[]),this.origins=null,this._originNames=[],arguments[0]instanceof g){let t=arguments[0];t._originNames&&(this._originNames=t._originNames.slice())}else if("string"==typeof arguments[0]){let t=arguments[0],e=arguments[1];this.SetInitialOriginName(t);let n=e.listDefinitions.TryListGetDefinition(t,null);if(!n.exists)throw new Error("InkList origin could not be found in story when constructing new list: "+t);this.origins=[n.result]}else if("object"==typeof arguments[0]&&arguments[0].hasOwnProperty("Key")&&arguments[0].hasOwnProperty("Value")){let t=arguments[0];this.Add(t.Key,t.Value)}}AddItem(t){if(t instanceof f){let e=t;if(null==e.originName)return void this.AddItem(e.itemName);if(null===this.origins)return d("this.origins");for(let t of this.origins)if(t.name==e.originName){let n=t.TryGetValueForItem(e,0);if(n.exists)return void this.Add(e,n.result);throw new Error("Could not add the item "+e+" to this list because it doesn't exist in the original list definition in ink.")}throw new Error("Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found.")}{let e=t,n=null;if(null===this.origins)return d("this.origins");for(let t of this.origins){if(null===e)return d("itemName");if(t.ContainsItemWithName(e)){if(null!=n)throw new Error("Could not add the item "+e+" to this list because it could come from either "+t.name+" or "+n.name);n=t}}if(null==n)throw new Error("Could not add the item "+e+" to this list because it isn't known to any list definitions previously associated with this list.");let i=new f(n.name,e),r=n.ValueForItem(i);this.Add(i,r)}}ContainsItemNamed(t){for(let[e]of this){if(f.fromSerializedKey(e).itemName==t)return!0}return!1}ContainsKey(t){return this.has(t.serialized())}Add(t,e){let n=t.serialized();if(this.has(n))throw new Error("The Map already contains an entry for "+t);this.set(n,e)}Remove(t){return this.delete(t.serialized())}get Count(){return this.size}get originOfMaxItem(){if(null==this.origins)return null;let t=this.maxItem.Key.originName,e=null;return this.origins.every(n=>n.name!=t||(e=n,!1)),e}get originNames(){if(this.Count>0){null==this._originNames&&this.Count>0?this._originNames=[]:(this._originNames||(this._originNames=[]),this._originNames.length=0);for(let[t]of this){let e=f.fromSerializedKey(t);if(null===e.originName)return d("item.originName");this._originNames.push(e.originName)}}return this._originNames}SetInitialOriginName(t){this._originNames=[t]}SetInitialOriginNames(t){this._originNames=null==t?null:t.slice()}get maxItem(){let t={Key:f.Null,Value:0};for(let[e,n]of this){let i=f.fromSerializedKey(e);(t.Key.isNull||n>t.Value)&&(t={Key:i,Value:n})}return t}get minItem(){let t={Key:f.Null,Value:0};for(let[e,n]of this){let i=f.fromSerializedKey(e);(t.Key.isNull||n<t.Value)&&(t={Key:i,Value:n})}return t}get inverse(){let t=new g;if(null!=this.origins)for(let e of this.origins)for(let[n,i]of e.items){let e=f.fromSerializedKey(n);this.ContainsKey(e)||t.Add(e,i)}return t}get all(){let t=new g;if(null!=this.origins)for(let e of this.origins)for(let[n,i]of e.items){let e=f.fromSerializedKey(n);t.set(e.serialized(),i)}return t}Union(t){let e=new g(this);for(let[n,i]of t)e.set(n,i);return e}Intersect(t){let e=new g;for(let[n,i]of this)t.has(n)&&e.set(n,i);return e}Without(t){let e=new g(this);for(let[n]of t)e.delete(n);return e}Contains(t){for(let[e]of t)if(!this.has(e))return!1;return!0}GreaterThan(t){return 0!=this.Count&&(0==t.Count||this.minItem.Value>t.maxItem.Value)}GreaterThanOrEquals(t){return 0!=this.Count&&(0==t.Count||this.minItem.Value>=t.minItem.Value&&this.maxItem.Value>=t.maxItem.Value)}LessThan(t){return 0!=t.Count&&(0==this.Count||this.maxItem.Value<t.minItem.Value)}LessThanOrEquals(t){return 0!=t.Count&&(0==this.Count||this.maxItem.Value<=t.maxItem.Value&&this.minItem.Value<=t.minItem.Value)}MaxAsList(){return this.Count>0?new g(this.maxItem):new g}MinAsList(){return this.Count>0?new g(this.minItem):new g}ListWithSubRange(t,e){if(0==this.Count)return new g;let n=this.orderedItems,i=0,r=Number.MAX_SAFE_INTEGER;Number.isInteger(t)?i=t:t instanceof g&&t.Count>0&&(i=t.minItem.Value),Number.isInteger(e)?r=e:t instanceof g&&t.Count>0&&(r=e.maxItem.Value);let a=new g;a.SetInitialOriginNames(this.originNames);for(let t of n)t.Value>=i&&t.Value<=r&&a.Add(t.Key,t.Value);return a}Equals(t){if(t instanceof g==!1)return!1;if(t.Count!=this.Count)return!1;for(let[e]of this)if(!t.has(e))return!1;return!0}get orderedItems(){let t=new Array;for(let[e,n]of this){let i=f.fromSerializedKey(e);t.push({Key:i,Value:n})}return t.sort((t,e)=>null===t.Key.originName?d("x.Key.originName"):null===e.Key.originName?d("y.Key.originName"):t.Value==e.Value?t.Key.originName.localeCompare(e.Key.originName):t.Value<e.Value?-1:t.Value>e.Value?1:0),t}toString(){let t=this.orderedItems,e=new m;for(let n=0;n<t.length;n++){n>0&&e.Append(", ");let i=t[n].Key;if(null===i.itemName)return d("item.itemName");e.Append(i.itemName)}return e.toString()}valueOf(){return NaN}}class S extends Error{constructor(t){super(t),this.useEndLineNumber=!1,this.message=t,this.name="StoryException"}}function y(t,e,n){if(null===t)return{result:n,exists:!1};let i=t.get(e);return void 0===i?{result:n,exists:!1}:{result:i,exists:!0}}class C extends p{static Create(t,n){if(n){if(n===i.Int&&Number.isInteger(Number(t)))return new b(Number(t));if(n===i.Float&&!isNaN(t))return new _(Number(t))}if("boolean"==typeof t){t=!!t?1:0}return"string"==typeof t?new T(String(t)):Number.isInteger(Number(t))?new b(Number(t)):isNaN(t)?t instanceof e?new P(s(t,e)):t instanceof g?new O(s(t,g)):null:new _(Number(t))}Copy(){return s(C.Create(this),p)}BadCastException(t){return new S("Can't cast "+this.valueObject+" from "+this.valueType+" to "+t)}}class v extends C{constructor(t){super(),this.value=t}get valueObject(){return this.value}toString(){return null===this.value?d("Value.value"):this.value.toString()}}class b extends v{constructor(t){super(t||0)}get isTruthy(){return 0!=this.value}get valueType(){return i.Int}Cast(t){if(null===this.value)return d("Value.value");if(t==this.valueType)return this;if(t==i.Float)return new _(this.value);if(t==i.String)return new T(""+this.value);throw this.BadCastException(t)}}class _ extends v{constructor(t){super(t||0)}get isTruthy(){return 0!=this.value}get valueType(){return i.Float}Cast(t){if(null===this.value)return d("Value.value");if(t==this.valueType)return this;if(t==i.Int)return new b(this.value);if(t==i.String)return new T(""+this.value);throw this.BadCastException(t)}}class T extends v{constructor(t){if(super(t||""),this._isNewline="\n"==this.value,this._isInlineWhitespace=!0,null===this.value)return d("Value.value");this.value.length>0&&this.value.split("").every(t=>" "==t||"\t"==t||(this._isInlineWhitespace=!1,!1))}get valueType(){return i.String}get isTruthy(){return null===this.value?d("Value.value"):this.value.length>0}get isNewline(){return this._isNewline}get isInlineWhitespace(){return this._isInlineWhitespace}get isNonWhitespace(){return!this.isNewline&&!this.isInlineWhitespace}Cast(t){if(t==this.valueType)return this;if(t==i.Int){let e=function(t,e=0){let n=parseInt(t);return Number.isNaN(n)?{result:e,exists:!1}:{result:n,exists:!0}}(this.value);if(e.exists)return new b(e.result);throw this.BadCastException(t)}if(t==i.Float){let e=function(t,e=0){let n=parseFloat(t);return Number.isNaN(n)?{result:e,exists:!1}:{result:n,exists:!0}}(this.value);if(e.exists)return new _(e.result);throw this.BadCastException(t)}throw this.BadCastException(t)}}class P extends v{constructor(t){super(t)}get valueType(){return i.DivertTarget}get targetPath(){return null===this.value?d("Value.value"):this.value}set targetPath(t){this.value=t}get isTruthy(){throw new Error("Shouldn't be checking the truthiness of a divert target")}Cast(t){if(t==this.valueType)return this;throw this.BadCastException(t)}toString(){return"DivertTargetValue("+this.targetPath+")"}}class w extends v{constructor(t,e=-1){super(t),this._contextIndex=e}get contextIndex(){return this._contextIndex}set contextIndex(t){this._contextIndex=t}get variableName(){return null===this.value?d("Value.value"):this.value}set variableName(t){this.value=t}get valueType(){return i.VariablePointer}get isTruthy(){throw new Error("Shouldn't be checking the truthiness of a variable pointer")}Cast(t){if(t==this.valueType)return this;throw this.BadCastException(t)}toString(){return"VariablePointerValue("+this.variableName+")"}Copy(){return new w(this.variableName,this.contextIndex)}}class O extends v{get isTruthy(){return null===this.value?d("this.value"):this.value.Count>0}get valueType(){return i.List}Cast(t){if(null===this.value)return d("Value.value");if(t==i.Int){let t=this.value.maxItem;return t.Key.isNull?new b(0):new b(t.Value)}if(t==i.Float){let t=this.value.maxItem;return t.Key.isNull?new _(0):new _(t.Value)}if(t==i.String){let t=this.value.maxItem;return t.Key.isNull?new T(""):new T(t.Key.toString())}if(t==this.valueType)return this;throw this.BadCastException(t)}constructor(t,e){super(null),t||e?t instanceof g?this.value=new g(t):t instanceof f&&"number"==typeof e&&(this.value=new g({Key:t,Value:e})):this.value=new g}static RetainListOriginsForAssignment(t,e){let n=a(t,O),i=a(e,O);return i&&null===i.value?d("newList.value"):n&&null===n.value?d("oldList.value"):void(n&&i&&0==i.value.Count&&i.value.SetInitialOriginNames(n.value.originNames))}}!function(t){t[t.Int=0]="Int",t[t.Float=1]="Float",t[t.List=2]="List",t[t.String=3]="String",t[t.DivertTarget=4]="DivertTarget",t[t.VariablePointer=5]="VariablePointer"}(i||(i={}));class E{constructor(){this.obj=null,this.approximate=!1}get correctObj(){return this.approximate?null:this.obj}get container(){return this.obj instanceof N?this.obj:null}copy(){let t=new E;return t.obj=this.obj,t.approximate=this.approximate,t}}class N extends p{constructor(){super(...arguments),this.name="",this._content=[],this.namedContent=new Map,this.visitsShouldBeCounted=!1,this.turnIndexShouldBeCounted=!1,this.countingAtStartOnly=!1,this._pathToFirstLeafContent=null}get hasValidName(){return null!=this.name&&this.name.length>0}get content(){return this._content}set content(t){this.AddContent(t)}get namedOnlyContent(){let t=new Map;for(let[e,n]of this.namedContent){let i=s(n,p);t.set(e,i)}for(let e of this.content){let n=l(e);null!=n&&n.hasValidName&&t.delete(n.name)}return 0==t.size&&(t=null),t}set namedOnlyContent(t){let e=this.namedOnlyContent;if(null!=e)for(let[t]of e)this.namedContent.delete(t);if(null!=t)for(let[,e]of t){let t=l(e);null!=t&&this.AddToNamedContentOnly(t)}}get countFlags(){let t=0;return this.visitsShouldBeCounted&&(t|=N.CountFlags.Visits),this.turnIndexShouldBeCounted&&(t|=N.CountFlags.Turns),this.countingAtStartOnly&&(t|=N.CountFlags.CountStartOnly),t==N.CountFlags.CountStartOnly&&(t=0),t}set countFlags(t){let e=t;(e&N.CountFlags.Visits)>0&&(this.visitsShouldBeCounted=!0),(e&N.CountFlags.Turns)>0&&(this.turnIndexShouldBeCounted=!0),(e&N.CountFlags.CountStartOnly)>0&&(this.countingAtStartOnly=!0)}get pathToFirstLeafContent(){return null==this._pathToFirstLeafContent&&(this._pathToFirstLeafContent=this.path.PathByAppendingPath(this.internalPathToFirstLeafContent)),this._pathToFirstLeafContent}get internalPathToFirstLeafContent(){let t=[],n=this;for(;n instanceof N;)n.content.length>0&&(t.push(new e.Component(0)),n=n.content[0]);return new e(t)}AddContent(t){if(t instanceof Array){let e=t;for(let t of e)this.AddContent(t)}else{let e=t;if(this._content.push(e),e.parent)throw new Error("content is already in "+e.parent);e.parent=this,this.TryAddNamedContent(e)}}TryAddNamedContent(t){let e=l(t);null!=e&&e.hasValidName&&this.AddToNamedContentOnly(e)}AddToNamedContentOnly(t){n.AssertType(t,p,"Can only add Runtime.Objects to a Runtime.Container"),s(t,p).parent=this,this.namedContent.set(t.name,t)}ContentAtPath(t,e=0,n=-1){-1==n&&(n=t.length);let i=new E;i.approximate=!1;let r=this,s=this;for(let l=e;l<n;++l){let e=t.GetComponent(l);if(null==r){i.approximate=!0;break}let n=r.ContentWithPathComponent(e);if(null==n){i.approximate=!0;break}s=n,r=a(n,N)}return i.obj=s,i}InsertContent(t,e){if(this.content[e]=t,t.parent)throw new Error("content is already in "+t.parent);t.parent=this,this.TryAddNamedContent(t)}AddContentsOfContainer(t){this.content=this.content.concat(t.content);for(let e of t.content)e.parent=this,this.TryAddNamedContent(e)}ContentWithPathComponent(t){if(t.isIndex)return t.index>=0&&t.index<this.content.length?this.content[t.index]:null;if(t.isParent)return this.parent;{if(null===t.name)return d("component.name");let e=y(this.namedContent,t.name,null);return e.exists?s(e.result,p):null}}BuildStringOfHierarchy(){let t;if(0==arguments.length)return t=new m,this.BuildStringOfHierarchy(t,0,null),t.toString();t=arguments[0];let e=arguments[1],i=arguments[2];function r(){for(let n=0;n<4*e;++n)t.Append(" ")}r(),t.Append("["),this.hasValidName&&t.AppendFormat(" ({0})",this.name),this==i&&t.Append("  <---"),t.AppendLine(),e++;for(let n=0;n<this.content.length;++n){let a=this.content[n];if(a instanceof N){a.BuildStringOfHierarchy(t,e,i)}else r(),a instanceof T?(t.Append('"'),t.Append(a.toString().replace("\n","\\n")),t.Append('"')):t.Append(a.toString());n!=this.content.length-1&&t.Append(","),a instanceof N||a!=i||t.Append("  <---"),t.AppendLine()}let a=new Map;for(let[t,e]of this.namedContent)this.content.indexOf(s(e,p))>=0||a.set(t,e);if(a.size>0){r(),t.AppendLine("-- named: --");for(let[,r]of a){n.AssertType(r,N,"Can only print out named Containers"),r.BuildStringOfHierarchy(t,e,i),t.AppendLine()}}e--,r(),t.Append("]")}}!function(t){let e;!function(t){t[t.Visits=1]="Visits",t[t.Turns=2]="Turns",t[t.CountStartOnly=4]="CountStartOnly"}(e=t.CountFlags||(t.CountFlags={}))}(N||(N={}));class x extends p{toString(){return"Glue"}}class A extends p{constructor(t=A.CommandType.NotSet){super(),this._commandType=t}get commandType(){return this._commandType}Copy(){return new A(this.commandType)}static EvalStart(){return new A(A.CommandType.EvalStart)}static EvalOutput(){return new A(A.CommandType.EvalOutput)}static EvalEnd(){return new A(A.CommandType.EvalEnd)}static Duplicate(){return new A(A.CommandType.Duplicate)}static PopEvaluatedValue(){return new A(A.CommandType.PopEvaluatedValue)}static PopFunction(){return new A(A.CommandType.PopFunction)}static PopTunnel(){return new A(A.CommandType.PopTunnel)}static BeginString(){return new A(A.CommandType.BeginString)}static EndString(){return new A(A.CommandType.EndString)}static NoOp(){return new A(A.CommandType.NoOp)}static ChoiceCount(){return new A(A.CommandType.ChoiceCount)}static Turns(){return new A(A.CommandType.Turns)}static TurnsSince(){return new A(A.CommandType.TurnsSince)}static ReadCount(){return new A(A.CommandType.ReadCount)}static Random(){return new A(A.CommandType.Random)}static SeedRandom(){return new A(A.CommandType.SeedRandom)}static VisitIndex(){return new A(A.CommandType.VisitIndex)}static SequenceShuffleIndex(){return new A(A.CommandType.SequenceShuffleIndex)}static StartThread(){return new A(A.CommandType.StartThread)}static Done(){return new A(A.CommandType.Done)}static End(){return new A(A.CommandType.End)}static ListFromInt(){return new A(A.CommandType.ListFromInt)}static ListRange(){return new A(A.CommandType.ListRange)}static ListRandom(){return new A(A.CommandType.ListRandom)}toString(){return this.commandType.toString()}}!function(t){let e;!function(t){t[t.NotSet=-1]="NotSet",t[t.EvalStart=0]="EvalStart",t[t.EvalOutput=1]="EvalOutput",t[t.EvalEnd=2]="EvalEnd",t[t.Duplicate=3]="Duplicate",t[t.PopEvaluatedValue=4]="PopEvaluatedValue",t[t.PopFunction=5]="PopFunction",t[t.PopTunnel=6]="PopTunnel",t[t.BeginString=7]="BeginString",t[t.EndString=8]="EndString",t[t.NoOp=9]="NoOp",t[t.ChoiceCount=10]="ChoiceCount",t[t.Turns=11]="Turns",t[t.TurnsSince=12]="TurnsSince",t[t.Random=13]="Random",t[t.SeedRandom=14]="SeedRandom",t[t.VisitIndex=15]="VisitIndex",t[t.SequenceShuffleIndex=16]="SequenceShuffleIndex",t[t.StartThread=17]="StartThread",t[t.Done=18]="Done",t[t.End=19]="End",t[t.ListFromInt=20]="ListFromInt",t[t.ListRange=21]="ListRange",t[t.ListRandom=22]="ListRandom",t[t.ReadCount=23]="ReadCount",t[t.TOTAL_VALUES=24]="TOTAL_VALUES"}(e=t.CommandType||(t.CommandType={}))}(A||(A={})),function(t){t[t.Tunnel=0]="Tunnel",t[t.Function=1]="Function",t[t.FunctionEvaluationFromGame=2]="FunctionEvaluationFromGame"}(r||(r={}));class I{constructor(){this.container=null,this.index=-1,2===arguments.length&&(this.container=arguments[0],this.index=arguments[1])}Resolve(){return this.index<0?this.container:null==this.container?null:0==this.container.content.length?this.container:this.index>=this.container.content.length?null:this.container.content[this.index]}get isNull(){return null==this.container}get path(){return this.isNull?null:this.index>=0?this.container.path.PathByAppendingComponent(new e.Component(this.index)):this.container.path}toString(){return this.container?"Ink Pointer -> "+this.container.path.toString()+" -- index "+this.index:"Ink Pointer (null)"}copy(){return new I(this.container,this.index)}static StartOf(t){return new I(t,0)}static get Null(){return new I(null,-1)}}class k extends p{constructor(t){super(),this._targetPath=null,this._targetPointer=I.Null,this.variableDivertName=null,this.pushesToStack=!1,this.stackPushType=0,this.isExternal=!1,this.externalArgs=0,this.isConditional=!1,this.pushesToStack=!1,void 0!==t&&(this.pushesToStack=!0,this.stackPushType=t)}get targetPath(){if(null!=this._targetPath&&this._targetPath.isRelative){let t=this.targetPointer.Resolve();t&&(this._targetPath=t.path)}return this._targetPath}set targetPath(t){this._targetPath=t,this._targetPointer=I.Null}get targetPointer(){if(this._targetPointer.isNull){let t=this.ResolvePath(this._targetPath).obj;if(null===this._targetPath)return d("this._targetPath");if(null===this._targetPath.lastComponent)return d("this._targetPath.lastComponent");if(this._targetPath.lastComponent.isIndex){if(null===t)return d("targetObj");this._targetPointer.container=t.parent instanceof N?t.parent:null,this._targetPointer.index=this._targetPath.lastComponent.index}else this._targetPointer=I.StartOf(t instanceof N?t:null)}return this._targetPointer.copy()}get targetPathString(){return null==this.targetPath?null:this.CompactPathString(this.targetPath)}set targetPathString(t){this.targetPath=null==t?null:new e(t)}get hasVariableTarget(){return null!=this.variableDivertName}Equals(t){let e=t;return e instanceof k&&this.hasVariableTarget==e.hasVariableTarget&&(this.hasVariableTarget?this.variableDivertName==e.variableDivertName:null===this.targetPath?d("this.targetPath"):this.targetPath.Equals(e.targetPath))}toString(){if(this.hasVariableTarget)return"Divert(variable: "+this.variableDivertName+")";if(null==this.targetPath)return"Divert(null)";{let t=new m,e=this.targetPath.toString();return t.Append("Divert"),this.isConditional&&t.Append("?"),this.pushesToStack&&(this.stackPushType==r.Function?t.Append(" function"):t.Append(" tunnel")),t.Append(" -> "),t.Append(this.targetPathString),t.Append(" ("),t.Append(e),t.Append(")"),t.toString()}}}class W extends p{constructor(t=!0){super(),this._pathOnChoice=null,this.hasCondition=!1,this.hasStartContent=!1,this.hasChoiceOnlyContent=!1,this.isInvisibleDefault=!1,this.onceOnly=!0,this.onceOnly=t}get pathOnChoice(){if(null!=this._pathOnChoice&&this._pathOnChoice.isRelative){let t=this.choiceTarget;t&&(this._pathOnChoice=t.path)}return this._pathOnChoice}set pathOnChoice(t){this._pathOnChoice=t}get choiceTarget(){return null===this._pathOnChoice?d("ChoicePoint._pathOnChoice"):this.ResolvePath(this._pathOnChoice).container}get pathStringOnChoice(){return null===this.pathOnChoice?d("ChoicePoint.pathOnChoice"):this.CompactPathString(this.pathOnChoice)}set pathStringOnChoice(t){this.pathOnChoice=new e(t)}get flags(){let t=0;return this.hasCondition&&(t|=1),this.hasStartContent&&(t|=2),this.hasChoiceOnlyContent&&(t|=4),this.isInvisibleDefault&&(t|=8),this.onceOnly&&(t|=16),t}set flags(t){this.hasCondition=(1&t)>0,this.hasStartContent=(2&t)>0,this.hasChoiceOnlyContent=(4&t)>0,this.isInvisibleDefault=(8&t)>0,this.onceOnly=(16&t)>0}toString(){if(null===this.pathOnChoice)return d("ChoicePoint.pathOnChoice");return"Choice: -> "+this.pathOnChoice.toString()}}class F extends p{constructor(t=null){super(),this.pathForCount=null,this.name=t}get containerForCount(){return null===this.pathForCount?null:this.ResolvePath(this.pathForCount).container}get pathStringForCount(){return null===this.pathForCount?null:this.CompactPathString(this.pathForCount)}set pathStringForCount(t){this.pathForCount=null===t?null:new e(t)}toString(){if(null!=this.name)return"var("+this.name+")";return"read_count("+this.pathStringForCount+")"}}class V extends p{constructor(t,e){super(),this.variableName=t||null,this.isNewDeclaration=!!e,this.isGlobal=!1}toString(){return"VarAssign to "+this.variableName}}class L extends p{}class R extends p{constructor(){if(super(),this._name=null,this._numberOfParameters=0,this._prototype=null,this._isPrototype=!1,this._operationFuncs=null,0===arguments.length)R.GenerateNativeFunctionsIfNecessary();else if(1===arguments.length){let t=arguments[0];R.GenerateNativeFunctionsIfNecessary(),this.name=t}else if(2===arguments.length){let t=arguments[0],e=arguments[1];this._isPrototype=!0,this.name=t,this.numberOfParameters=e}}static CallWithName(t){return new R(t)}static CallExistsWithName(t){return this.GenerateNativeFunctionsIfNecessary(),this._nativeFunctions.get(t)}get name(){return null===this._name?d("NativeFunctionCall._name"):this._name}set name(t){this._name=t,this._isPrototype||(null===R._nativeFunctions?d("NativeFunctionCall._nativeFunctions"):this._prototype=R._nativeFunctions.get(this._name)||null)}get numberOfParameters(){return this._prototype?this._prototype.numberOfParameters:this._numberOfParameters}set numberOfParameters(t){this._numberOfParameters=t}Call(t){if(this._prototype)return this._prototype.Call(t);if(this.numberOfParameters!=t.length)throw new Error("Unexpected number of parameters");let e=!1;for(let n of t){if(n instanceof L)throw new S('Attempting to perform operation on a void value. Did you forget to "return" a value from a function you called here?');n instanceof O&&(e=!0)}if(2==t.length&&e)return this.CallBinaryListOperation(t);let n=this.CoerceValuesToSingleType(t),r=n[0].valueType;return r==i.Int||r==i.Float||r==i.String||r==i.DivertTarget||r==i.List?this.CallType(n):null}CallType(t){let e=s(t[0],v),n=e.valueType,r=e,a=t.length;if(2==a||1==a){if(null===this._operationFuncs)return d("NativeFunctionCall._operationFuncs");let l=this._operationFuncs.get(n);if(!l){const t=i[n];throw new S("Cannot perform operation "+this.name+" on "+t)}if(2==a){let e=s(t[1],v),n=l;if(null===r.value||null===e.value)return d("NativeFunctionCall.Call BinaryOp values");let i=n(r.value,e.value);return v.Create(i)}{let t=l;if(null===r.value)return d("NativeFunctionCall.Call UnaryOp value");let n=t(r.value);return this.name===R.Int?v.Create(n,i.Int):this.name===R.Float?v.Create(n,i.Float):v.Create(n,e.valueType)}}throw new Error("Unexpected number of parameters to NativeFunctionCall: "+t.length)}CallBinaryListOperation(t){if(("+"==this.name||"-"==this.name)&&t[0]instanceof O&&t[1]instanceof b)return this.CallListIncrementOperation(t);let e=s(t[0],v),n=s(t[1],v);if(!("&&"!=this.name&&"||"!=this.name||e.valueType==i.List&&n.valueType==i.List)){if(null===this._operationFuncs)return d("NativeFunctionCall._operationFuncs");let t=this._operationFuncs.get(i.Int);if(null===t)return d("NativeFunctionCall.CallBinaryListOperation op");let r=t(e.isTruthy?1:0,n.isTruthy?1:0);return new b(r)}if(e.valueType==i.List&&n.valueType==i.List)return this.CallType([e,n]);throw new S("Can not call use "+this.name+" operation on "+i[e.valueType]+" and "+i[n.valueType])}CallListIncrementOperation(t){let e=s(t[0],O),n=s(t[1],b),r=new g;if(null===e.value)return d("NativeFunctionCall.CallListIncrementOperation listVal.value");for(let[t,a]of e.value){let s=f.fromSerializedKey(t);if(null===this._operationFuncs)return d("NativeFunctionCall._operationFuncs");let l=this._operationFuncs.get(i.Int);if(null===n.value)return d("NativeFunctionCall.CallListIncrementOperation intVal.value");let o=l(a,n.value),u=null;if(null===e.value.origins)return d("NativeFunctionCall.CallListIncrementOperation listVal.value.origins");for(let t of e.value.origins)if(t.name==s.originName){u=t;break}if(null!=u){let t=u.TryGetItemWithValue(o,f.Null);t.exists&&r.Add(t.result,o)}}return new O(r)}CoerceValuesToSingleType(t){let e=i.Int,n=null;for(let r of t){let t=s(r,v);t.valueType>e&&(e=t.valueType),t.valueType==i.List&&(n=a(t,O))}let r=[];if(i[e]==i[i.List])for(let e of t){let t=s(e,v);if(t.valueType==i.List)r.push(t);else{if(t.valueType!=i.Int){const e=i[t.valueType];throw new S("Cannot mix Lists and "+e+" values in this operation")}{let e=parseInt(t.valueObject);if(n=s(n,O),null===n.value)return d("NativeFunctionCall.CoerceValuesToSingleType specialCaseList.value");let i=n.value.originOfMaxItem;if(null===i)return d("NativeFunctionCall.CoerceValuesToSingleType list");let a=i.TryGetItemWithValue(e,f.Null);if(!a.exists)throw new S("Could not find List item with the value "+e+" in "+i.name);{let t=new O(a.result,e);r.push(t)}}}}else for(let n of t){let t=s(n,v).Cast(e);r.push(t)}return r}static Identity(t){return t}static GenerateNativeFunctionsIfNecessary(){if(null==this._nativeFunctions){this._nativeFunctions=new Map,this.AddIntBinaryOp(this.Add,(t,e)=>t+e),this.AddIntBinaryOp(this.Subtract,(t,e)=>t-e),this.AddIntBinaryOp(this.Multiply,(t,e)=>t*e),this.AddIntBinaryOp(this.Divide,(t,e)=>Math.floor(t/e)),this.AddIntBinaryOp(this.Mod,(t,e)=>t%e),this.AddIntUnaryOp(this.Negate,t=>-t),this.AddIntBinaryOp(this.Equal,(t,e)=>t==e?1:0),this.AddIntBinaryOp(this.Greater,(t,e)=>t>e?1:0),this.AddIntBinaryOp(this.Less,(t,e)=>t<e?1:0),this.AddIntBinaryOp(this.GreaterThanOrEquals,(t,e)=>t>=e?1:0),this.AddIntBinaryOp(this.LessThanOrEquals,(t,e)=>t<=e?1:0),this.AddIntBinaryOp(this.NotEquals,(t,e)=>t!=e?1:0),this.AddIntUnaryOp(this.Not,t=>0==t?1:0),this.AddIntBinaryOp(this.And,(t,e)=>0!=t&&0!=e?1:0),this.AddIntBinaryOp(this.Or,(t,e)=>0!=t||0!=e?1:0),this.AddIntBinaryOp(this.Max,(t,e)=>Math.max(t,e)),this.AddIntBinaryOp(this.Min,(t,e)=>Math.min(t,e)),this.AddIntBinaryOp(this.Pow,(t,e)=>Math.pow(t,e)),this.AddIntUnaryOp(this.Floor,R.Identity),this.AddIntUnaryOp(this.Ceiling,R.Identity),this.AddIntUnaryOp(this.Int,R.Identity),this.AddIntUnaryOp(this.Float,t=>t),this.AddFloatBinaryOp(this.Add,(t,e)=>t+e),this.AddFloatBinaryOp(this.Subtract,(t,e)=>t-e),this.AddFloatBinaryOp(this.Multiply,(t,e)=>t*e),this.AddFloatBinaryOp(this.Divide,(t,e)=>t/e),this.AddFloatBinaryOp(this.Mod,(t,e)=>t%e),this.AddFloatUnaryOp(this.Negate,t=>-t),this.AddFloatBinaryOp(this.Equal,(t,e)=>t==e?1:0),this.AddFloatBinaryOp(this.Greater,(t,e)=>t>e?1:0),this.AddFloatBinaryOp(this.Less,(t,e)=>t<e?1:0),this.AddFloatBinaryOp(this.GreaterThanOrEquals,(t,e)=>t>=e?1:0),this.AddFloatBinaryOp(this.LessThanOrEquals,(t,e)=>t<=e?1:0),this.AddFloatBinaryOp(this.NotEquals,(t,e)=>t!=e?1:0),this.AddFloatUnaryOp(this.Not,t=>0==t?1:0),this.AddFloatBinaryOp(this.And,(t,e)=>0!=t&&0!=e?1:0),this.AddFloatBinaryOp(this.Or,(t,e)=>0!=t||0!=e?1:0),this.AddFloatBinaryOp(this.Max,(t,e)=>Math.max(t,e)),this.AddFloatBinaryOp(this.Min,(t,e)=>Math.min(t,e)),this.AddFloatBinaryOp(this.Pow,(t,e)=>Math.pow(t,e)),this.AddFloatUnaryOp(this.Floor,t=>Math.floor(t)),this.AddFloatUnaryOp(this.Ceiling,t=>Math.ceil(t)),this.AddFloatUnaryOp(this.Int,t=>Math.floor(t)),this.AddFloatUnaryOp(this.Float,R.Identity),this.AddStringBinaryOp(this.Add,(t,e)=>t+e),this.AddStringBinaryOp(this.Equal,(t,e)=>t===e?1:0),this.AddStringBinaryOp(this.NotEquals,(t,e)=>t!==e?1:0),this.AddStringBinaryOp(this.Has,(t,e)=>t.includes(e)?1:0),this.AddStringBinaryOp(this.Hasnt,(t,e)=>t.includes(e)?0:1),this.AddListBinaryOp(this.Add,(t,e)=>t.Union(e)),this.AddListBinaryOp(this.Subtract,(t,e)=>t.Without(e)),this.AddListBinaryOp(this.Has,(t,e)=>t.Contains(e)?1:0),this.AddListBinaryOp(this.Hasnt,(t,e)=>t.Contains(e)?0:1),this.AddListBinaryOp(this.Intersect,(t,e)=>t.Intersect(e)),this.AddListBinaryOp(this.Equal,(t,e)=>t.Equals(e)?1:0),this.AddListBinaryOp(this.Greater,(t,e)=>t.GreaterThan(e)?1:0),this.AddListBinaryOp(this.Less,(t,e)=>t.LessThan(e)?1:0),this.AddListBinaryOp(this.GreaterThanOrEquals,(t,e)=>t.GreaterThanOrEquals(e)?1:0),this.AddListBinaryOp(this.LessThanOrEquals,(t,e)=>t.LessThanOrEquals(e)?1:0),this.AddListBinaryOp(this.NotEquals,(t,e)=>t.Equals(e)?0:1),this.AddListBinaryOp(this.And,(t,e)=>t.Count>0&&e.Count>0?1:0),this.AddListBinaryOp(this.Or,(t,e)=>t.Count>0||e.Count>0?1:0),this.AddListUnaryOp(this.Not,t=>0==t.Count?1:0),this.AddListUnaryOp(this.Invert,t=>t.inverse),this.AddListUnaryOp(this.All,t=>t.all),this.AddListUnaryOp(this.ListMin,t=>t.MinAsList()),this.AddListUnaryOp(this.ListMax,t=>t.MaxAsList()),this.AddListUnaryOp(this.Count,t=>t.Count),this.AddListUnaryOp(this.ValueOfList,t=>t.maxItem.Value);let t=(t,e)=>t.Equals(e)?1:0,e=(t,e)=>t.Equals(e)?0:1;this.AddOpToNativeFunc(this.Equal,2,i.DivertTarget,t),this.AddOpToNativeFunc(this.NotEquals,2,i.DivertTarget,e)}}AddOpFuncForType(t,e){null==this._operationFuncs&&(this._operationFuncs=new Map),this._operationFuncs.set(t,e)}static AddOpToNativeFunc(t,e,n,i){if(null===this._nativeFunctions)return d("NativeFunctionCall._nativeFunctions");let r=this._nativeFunctions.get(t);r||(r=new R(t,e),this._nativeFunctions.set(t,r)),r.AddOpFuncForType(n,i)}static AddIntBinaryOp(t,e){this.AddOpToNativeFunc(t,2,i.Int,e)}static AddIntUnaryOp(t,e){this.AddOpToNativeFunc(t,1,i.Int,e)}static AddFloatBinaryOp(t,e){this.AddOpToNativeFunc(t,2,i.Float,e)}static AddFloatUnaryOp(t,e){this.AddOpToNativeFunc(t,1,i.Float,e)}static AddStringBinaryOp(t,e){this.AddOpToNativeFunc(t,2,i.String,e)}static AddListBinaryOp(t,e){this.AddOpToNativeFunc(t,2,i.List,e)}static AddListUnaryOp(t,e){this.AddOpToNativeFunc(t,1,i.List,e)}toString(){return'Native "'+this.name+'"'}}R.Add="+",R.Subtract="-",R.Divide="/",R.Multiply="*",R.Mod="%",R.Negate="_",R.Equal="==",R.Greater=">",R.Less="<",R.GreaterThanOrEquals=">=",R.LessThanOrEquals="<=",R.NotEquals="!=",R.Not="!",R.And="&&",R.Or="||",R.Min="MIN",R.Max="MAX",R.Pow="POW",R.Floor="FLOOR",R.Ceiling="CEILING",R.Int="INT",R.Float="FLOAT",R.Has="?",R.Hasnt="!?",R.Intersect="^",R.ListMin="LIST_MIN",R.ListMax="LIST_MAX",R.All="LIST_ALL",R.Count="LIST_COUNT",R.ValueOfList="LIST_VALUE",R.Invert="LIST_INVERT",R._nativeFunctions=null;class j extends p{constructor(t){super(),this.text=t.toString()||""}toString(){return"# "+this.text}}class D extends p{constructor(){super(...arguments),this.text="",this.index=0,this.threadAtGeneration=null,this.sourcePath="",this.targetPath=null,this.isInvisibleDefault=!1,this.originalThreadIndex=0}get pathStringOnChoice(){return null===this.targetPath?d("Choice.targetPath"):this.targetPath.toString()}set pathStringOnChoice(t){this.targetPath=new e(t)}}class G{constructor(t,e){this._name=t||"",this._items=null,this._itemNameToValues=e||new Map}get name(){return this._name}get items(){if(null==this._items){this._items=new Map;for(let[t,e]of this._itemNameToValues){let n=new f(this.name,t);this._items.set(n.serialized(),e)}}return this._items}ValueForItem(t){if(!t.itemName)return 0;let e=this._itemNameToValues.get(t.itemName);return void 0!==e?e:0}ContainsItem(t){return!!t.itemName&&(t.originName==this.name&&this._itemNameToValues.has(t.itemName))}ContainsItemWithName(t){return this._itemNameToValues.has(t)}TryGetItemWithValue(t,e){for(let[e,n]of this._itemNameToValues)if(n==t)return{result:new f(this.name,e),exists:!0};return{result:f.Null,exists:!1}}TryGetValueForItem(t,e){if(!t.itemName)return{result:0,exists:!1};let n=this._itemNameToValues.get(t.itemName);return n?{result:n,exists:!0}:{result:0,exists:!1}}}class B{constructor(t){this._lists=new Map,this._allUnambiguousListValueCache=new Map;for(let e of t){this._lists.set(e.name,e);for(let[t,n]of e.items){let e=f.fromSerializedKey(t),i=new O(e,n);if(!e.itemName)throw new Error("item.itemName is null or undefined.");this._allUnambiguousListValueCache.set(e.itemName,i),this._allUnambiguousListValueCache.set(e.fullName,i)}}}get lists(){let t=[];for(let[,e]of this._lists)t.push(e);return t}TryListGetDefinition(t,e){if(null===t)return{result:e,exists:!1};let n=this._lists.get(t);return n?{result:n,exists:!0}:{result:e,exists:!1}}FindSingleItemListWithName(t){if(null===t)return d("name");let e=this._allUnambiguousListValueCache.get(t);return void 0!==e?e:null}}class M{static JArrayToRuntimeObjList(t,e=!1){let n=t.length;e&&n--;let i=[];for(let e=0;e<n;e++){let n=t[e],r=this.JTokenToRuntimeObject(n);if(null===r)return d("runtimeObj");i.push(r)}return i}static WriteDictionaryRuntimeObjs(t,e){t.WriteObjectStart();for(let[n,i]of e)t.WritePropertyStart(n),this.WriteRuntimeObject(t,i),t.WritePropertyEnd();t.WriteObjectEnd()}static WriteListRuntimeObjs(t,e){t.WriteArrayStart();for(let n of e)this.WriteRuntimeObject(t,n);t.WriteArrayEnd()}static WriteIntDictionary(t,e){t.WriteObjectStart();for(let[n,i]of e)t.WriteIntProperty(n,i);t.WriteObjectEnd()}static WriteRuntimeObject(t,e){let n=a(e,N);if(n)return void this.WriteRuntimeContainer(t,n);let i=a(e,k);if(i){let e,n="->";return i.isExternal?n="x()":i.pushesToStack&&(i.stackPushType==r.Function?n="f()":i.stackPushType==r.Tunnel&&(n="->t->")),e=i.hasVariableTarget?i.variableDivertName:i.targetPathString,t.WriteObjectStart(),t.WriteProperty(n,e),i.hasVariableTarget&&t.WriteProperty("var",!0),i.isConditional&&t.WriteProperty("c",!0),i.externalArgs>0&&t.WriteIntProperty("exArgs",i.externalArgs),void t.WriteObjectEnd()}let s=a(e,W);if(s)return t.WriteObjectStart(),t.WriteProperty("*",s.pathStringOnChoice),t.WriteIntProperty("flg",s.flags),void t.WriteObjectEnd();let l=a(e,b);if(l)return void t.WriteInt(l.value);let o=a(e,_);if(o)return void t.WriteFloat(o.value);let u=a(e,T);if(u)return void(u.isNewline?t.Write("\n",!1):(t.WriteStringStart(),t.WriteStringInner("^"),t.WriteStringInner(u.value),t.WriteStringEnd()));let h=a(e,O);if(h)return void this.WriteInkList(t,h);let c=a(e,P);if(c)return t.WriteObjectStart(),null===c.value?d("divTargetVal.value"):(t.WriteProperty("^->",c.value.componentsString),void t.WriteObjectEnd());let p=a(e,w);if(p)return t.WriteObjectStart(),t.WriteProperty("^var",p.value),t.WriteIntProperty("ci",p.contextIndex),void t.WriteObjectEnd();if(a(e,x))return void t.Write("<>");let m=a(e,A);if(m)return void t.Write(M._controlCommandNames[m.commandType]);let f=a(e,R);if(f){let e=f.name;return"^"==e&&(e="L^"),void t.Write(e)}let g=a(e,F);if(g){t.WriteObjectStart();let e=g.pathStringForCount;return null!=e?t.WriteProperty("CNT?",e):t.WriteProperty("VAR?",g.name),void t.WriteObjectEnd()}let S=a(e,V);if(S){t.WriteObjectStart();let e=S.isGlobal?"VAR=":"temp=";return t.WriteProperty(e,S.variableName),S.isNewDeclaration||t.WriteProperty("re",!0),void t.WriteObjectEnd()}if(a(e,L))return void t.Write("void");let y=a(e,j);if(y)return t.WriteObjectStart(),t.WriteProperty("#",y.text),void t.WriteObjectEnd();let C=a(e,D);if(!C)throw new Error("Failed to convert runtime object to Json token: "+e);this.WriteChoice(t,C)}static JObjectToDictionaryRuntimeObjs(t){let e=new Map;for(let n in t)if(t.hasOwnProperty(n)){let i=this.JTokenToRuntimeObject(t[n]);if(null===i)return d("inkObject");e.set(n,i)}return e}static JObjectToIntDictionary(t){let e=new Map;for(let n in t)t.hasOwnProperty(n)&&e.set(n,parseInt(t[n]));return e}static JTokenToRuntimeObject(t){if("number"==typeof t&&!isNaN(t))return v.Create(t);if("string"==typeof t){let e=t.toString(),n=e[0];if("^"==n)return new T(e.substring(1));if("\n"==n&&1==e.length)return new T("\n");if("<>"==e)return new x;for(let t=0;t<M._controlCommandNames.length;++t){if(e==M._controlCommandNames[t])return new A(t)}if("L^"==e&&(e="^"),R.CallExistsWithName(e))return R.CallWithName(e);if("->->"==e)return A.PopTunnel();if("~ret"==e)return A.PopFunction();if("void"==e)return new L}if("object"==typeof t&&!Array.isArray(t)){let n,i=t;if(i["^->"])return n=i["^->"],new P(new e(n.toString()));if(i["^var"]){n=i["^var"];let t=new w(n.toString());return"ci"in i&&(n=i.ci,t.contextIndex=parseInt(n)),t}let a=!1,s=!1,l=r.Function,o=!1;if((n=i["->"])?a=!0:(n=i["f()"])?(a=!0,s=!0,l=r.Function):(n=i["->t->"])?(a=!0,s=!0,l=r.Tunnel):(n=i["x()"])&&(a=!0,o=!0,s=!1,l=r.Function),a){let t=new k;t.pushesToStack=s,t.stackPushType=l,t.isExternal=o;let e=n.toString();return(n=i.var)?t.variableDivertName=e:t.targetPathString=e,t.isConditional=!!i.c,o&&(n=i.exArgs)&&(t.externalArgs=parseInt(n)),t}if(n=i["*"]){let t=new W;return t.pathStringOnChoice=n.toString(),(n=i.flg)&&(t.flags=parseInt(n)),t}if(n=i["VAR?"])return new F(n.toString());if(n=i["CNT?"]){let t=new F;return t.pathStringForCount=n.toString(),t}let u=!1,h=!1;if((n=i["VAR="])?(u=!0,h=!0):(n=i["temp="])&&(u=!0,h=!1),u){let t=n.toString(),e=!i.re,r=new V(t,e);return r.isGlobal=h,r}if(void 0!==i["#"])return n=i["#"],new j(n.toString());if(n=i.list){let t=n,e=new g;if(n=i.origins){let t=n;e.SetInitialOriginNames(t)}for(let n in t)if(t.hasOwnProperty(n)){let i=t[n],r=new f(n),a=parseInt(i);e.Add(r,a)}return new O(e)}if(null!=i.originalChoicePath)return this.JObjectToChoice(i)}if(Array.isArray(t))return this.JArrayToContainer(t);if(null==t)return null;throw new Error("Failed to convert token to runtime object: "+JSON.stringify(t))}static WriteRuntimeContainer(t,e,n=!1){if(t.WriteArrayStart(),null===e)return d("container");for(let n of e.content)this.WriteRuntimeObject(t,n);let i=e.namedOnlyContent,r=e.countFlags,s=null!=e.name&&!n,l=null!=i||r>0||s;if(l&&t.WriteObjectStart(),null!=i)for(let[e,n]of i){let i=e,r=a(n,N);t.WritePropertyStart(i),this.WriteRuntimeContainer(t,r,!0),t.WritePropertyEnd()}s&&t.WriteProperty("#n",e.name),l?t.WriteObjectEnd():t.WriteNull(),t.WriteArrayEnd()}static JArrayToContainer(t){let e=new N;e.content=this.JArrayToRuntimeObjList(t,!0);let n=t[t.length-1];if(null!=n){let t=new Map;for(let i in n)if("#f"==i)e.countFlags=parseInt(n[i]);else if("#n"==i)e.name=n[i].toString();else{let e=this.JTokenToRuntimeObject(n[i]),r=a(e,N);r&&(r.name=i),t.set(i,e)}e.namedOnlyContent=t}return e}static JObjectToChoice(t){let e=new D;return e.text=t.text.toString(),e.index=parseInt(t.index),e.sourcePath=t.originalChoicePath.toString(),e.originalThreadIndex=parseInt(t.originalThreadIndex),e.pathStringOnChoice=t.targetPath.toString(),e}static WriteChoice(t,e){t.WriteObjectStart(),t.WriteProperty("text",e.text),t.WriteIntProperty("index",e.index),t.WriteProperty("originalChoicePath",e.sourcePath),t.WriteIntProperty("originalThreadIndex",e.originalThreadIndex),t.WriteProperty("targetPath",e.pathStringOnChoice),t.WriteObjectEnd()}static WriteInkList(t,e){let n=e.value;if(null===n)return d("rawList");t.WriteObjectStart(),t.WritePropertyStart("list"),t.WriteObjectStart();for(let[e,i]of n){let n=f.fromSerializedKey(e),r=i;if(null===n.itemName)return d("item.itemName");t.WritePropertyNameStart(),t.WritePropertyNameInner(n.originName?n.originName:"?"),t.WritePropertyNameInner("."),t.WritePropertyNameInner(n.itemName),t.WritePropertyNameEnd(),t.Write(r),t.WritePropertyEnd()}if(t.WriteObjectEnd(),t.WritePropertyEnd(),0==n.Count&&null!=n.originNames&&n.originNames.length>0){t.WritePropertyStart("origins"),t.WriteArrayStart();for(let e of n.originNames)t.Write(e);t.WriteArrayEnd(),t.WritePropertyEnd()}t.WriteObjectEnd()}static ListDefinitionsToJToken(t){let e={};for(let n of t.lists){let t={};for(let[e,i]of n.items){let n=f.fromSerializedKey(e);if(null===n.itemName)return d("item.itemName");t[n.itemName]=i}e[n.name]=t}return e}static JTokenToListDefinitions(t){let e=t,n=[];for(let t in e)if(e.hasOwnProperty(t)){let i=t.toString(),r=e[t],a=new Map;for(let n in r)if(e.hasOwnProperty(t)){let t=r[n];a.set(n,parseInt(t))}let s=new G(i,a);n.push(s)}return new B(n)}}M._controlCommandNames=(()=>{let t=[];t[A.CommandType.EvalStart]="ev",t[A.CommandType.EvalOutput]="out",t[A.CommandType.EvalEnd]="/ev",t[A.CommandType.Duplicate]="du",t[A.CommandType.PopEvaluatedValue]="pop",t[A.CommandType.PopFunction]="~ret",t[A.CommandType.PopTunnel]="->->",t[A.CommandType.BeginString]="str",t[A.CommandType.EndString]="/str",t[A.CommandType.NoOp]="nop",t[A.CommandType.ChoiceCount]="choiceCnt",t[A.CommandType.Turns]="turn",t[A.CommandType.TurnsSince]="turns",t[A.CommandType.ReadCount]="readc",t[A.CommandType.Random]="rnd",t[A.CommandType.SeedRandom]="srnd",t[A.CommandType.VisitIndex]="visit",t[A.CommandType.SequenceShuffleIndex]="seq",t[A.CommandType.StartThread]="thread",t[A.CommandType.Done]="done",t[A.CommandType.End]="end",t[A.CommandType.ListFromInt]="listInt",t[A.CommandType.ListRange]="range",t[A.CommandType.ListRandom]="lrnd";for(let e=0;e<A.CommandType.TOTAL_VALUES;++e)if(null==t[e])throw new Error("Control command not accounted for in serialisation");return t})();class q{constructor(){if(this._threadCounter=0,this._startOfRoot=I.Null,arguments[0]instanceof X){let t=arguments[0];this._startOfRoot=I.StartOf(t.rootContentContainer),this.Reset()}else{let t=arguments[0];this._threads=[];for(let e of t._threads)this._threads.push(e.Copy());this._threadCounter=t._threadCounter,this._startOfRoot=t._startOfRoot}}get elements(){return this.callStack}get depth(){return this.elements.length}get currentElement(){let t=this._threads[this._threads.length-1].callstack;return t[t.length-1]}get currentElementIndex(){return this.callStack.length-1}get currentThread(){return this._threads[this._threads.length-1]}set currentThread(t){n.Assert(1==this._threads.length,"Shouldn't be directly setting the current thread when we have a stack of them"),this._threads.length=0,this._threads.push(t)}get canPop(){return this.callStack.length>1}Reset(){this._threads=[],this._threads.push(new q.Thread),this._threads[0].callstack.push(new q.Element(r.Tunnel,this._startOfRoot))}SetJsonToken(t,e){this._threads.length=0;let n=t.threads;for(let t of n){let n=t,i=new q.Thread(n,e);this._threads.push(i)}this._threadCounter=parseInt(t.threadCounter),this._startOfRoot=I.StartOf(e.rootContentContainer)}WriteJson(t){t.WriteObject(t=>{t.WritePropertyStart("threads"),t.WriteArrayStart();for(let e of this._threads)e.WriteJson(t);t.WriteArrayEnd(),t.WritePropertyEnd(),t.WritePropertyStart("threadCounter"),t.WriteInt(this._threadCounter),t.WritePropertyEnd()})}PushThread(){let t=this.currentThread.Copy();this._threadCounter++,t.threadIndex=this._threadCounter,this._threads.push(t)}ForkThread(){let t=this.currentThread.Copy();return this._threadCounter++,t.threadIndex=this._threadCounter,t}PopThread(){if(!this.canPopThread)throw new Error("Can't pop thread");this._threads.splice(this._threads.indexOf(this.currentThread),1)}get canPopThread(){return this._threads.length>1&&!this.elementIsEvaluateFromGame}get elementIsEvaluateFromGame(){return this.currentElement.type==r.FunctionEvaluationFromGame}Push(t,e=0,n=0){let i=new q.Element(t,this.currentElement.currentPointer,!1);i.evaluationStackHeightWhenPushed=e,i.functionStartInOutputStream=n,this.callStack.push(i)}CanPop(t=null){return!!this.canPop&&(null==t||this.currentElement.type==t)}Pop(t=null){if(!this.CanPop(t))throw new Error("Mismatched push/pop in Callstack");this.callStack.pop()}GetTemporaryVariableWithName(t,e=-1){-1==e&&(e=this.currentElementIndex+1);let n=y(this.callStack[e-1].temporaryVariables,t,null);return n.exists?n.result:null}SetTemporaryVariable(t,e,n,i=-1){-1==i&&(i=this.currentElementIndex+1);let r=this.callStack[i-1];if(!n&&!r.temporaryVariables.get(t))throw new S("Could not find temporary variable to set: "+t);let a=y(r.temporaryVariables,t,null);a.exists&&O.RetainListOriginsForAssignment(a.result,e),r.temporaryVariables.set(t,e)}ContextForVariableNamed(t){return this.currentElement.temporaryVariables.get(t)?this.currentElementIndex+1:0}ThreadWithIndex(t){let e=this._threads.filter(e=>{if(e.threadIndex==t)return e});return e.length>0?e[0]:null}get callStack(){return this.currentThread.callstack}get callStackTrace(){let t=new m;for(let e=0;e<this._threads.length;e++){let n=this._threads[e],i=e==this._threads.length-1;t.AppendFormat("=== THREAD {0}/{1} {2}===\n",e+1,this._threads.length,i?"(current) ":"");for(let e=0;e<n.callstack.length;e++){n.callstack[e].type==r.Function?t.Append("  [FUNCTION] "):t.Append("  [TUNNEL] ");let i=n.callstack[e].currentPointer;if(!i.isNull){if(t.Append("<SOMEWHERE IN "),null===i.container)return d("pointer.container");t.Append(i.container.path.toString()),t.AppendLine(">")}}}return t.toString()}}!function(t){class n{constructor(t,e,n=!1){this.evaluationStackHeightWhenPushed=0,this.functionStartInOutputStream=0,this.currentPointer=e.copy(),this.inExpressionEvaluation=n,this.temporaryVariables=new Map,this.type=t}Copy(){let t=new n(this.type,this.currentPointer,this.inExpressionEvaluation);return t.temporaryVariables=new Map(this.temporaryVariables),t.evaluationStackHeightWhenPushed=this.evaluationStackHeightWhenPushed,t.functionStartInOutputStream=this.functionStartInOutputStream,t}}t.Element=n;class i{constructor(){if(this.threadIndex=0,this.previousPointer=I.Null,this.callstack=[],arguments[0]&&arguments[1]){let t=arguments[0],i=arguments[1];this.threadIndex=parseInt(t.threadIndex);let r=t.callstack;for(let t of r){let r,a=t,s=parseInt(a.type),l=I.Null,o=a.cPath;if(void 0!==o){r=o.toString();let t=i.ContentAtPath(new e(r));if(l.container=t.container,l.index=parseInt(a.idx),null==t.obj)throw new Error("When loading state, internal story location couldn't be found: "+r+". Has the story changed since this save data was created?");if(t.approximate){if(null===l.container)return d("pointer.container");i.Warning("When loading state, exact internal story location couldn't be found: '"+r+"', so it was approximated to '"+l.container.path.toString()+"' to recover. Has the story changed since this save data was created?")}}let u=!!a.exp,h=new n(s,l,u),c=a.temp;void 0!==c?h.temporaryVariables=M.JObjectToDictionaryRuntimeObjs(c):h.temporaryVariables.clear(),this.callstack.push(h)}let a=t.previousContentObject;if(void 0!==a){let t=new e(a.toString());this.previousPointer=i.PointerAtPath(t)}}}Copy(){let t=new i;t.threadIndex=this.threadIndex;for(let e of this.callstack)t.callstack.push(e.Copy());return t.previousPointer=this.previousPointer.copy(),t}WriteJson(t){t.WriteObjectStart(),t.WritePropertyStart("callstack"),t.WriteArrayStart();for(let e of this.callstack){if(t.WriteObjectStart(),!e.currentPointer.isNull){if(null===e.currentPointer.container)return d("el.currentPointer.container");t.WriteProperty("cPath",e.currentPointer.container.path.componentsString),t.WriteIntProperty("idx",e.currentPointer.index)}t.WriteProperty("exp",e.inExpressionEvaluation),t.WriteIntProperty("type",e.type),e.temporaryVariables.size>0&&(t.WritePropertyStart("temp"),M.WriteDictionaryRuntimeObjs(t,e.temporaryVariables),t.WritePropertyEnd()),t.WriteObjectEnd()}if(t.WriteArrayEnd(),t.WritePropertyEnd(),t.WriteIntProperty("threadIndex",this.threadIndex),!this.previousPointer.isNull){let e=this.previousPointer.Resolve();if(null===e)return d("this.previousPointer.Resolve()");t.WriteProperty("previousContentObject",e.path.toString())}t.WriteObjectEnd()}}t.Thread=i}(q||(q={}));class J{constructor(t,e){this.variableChangedEventCallbacks=[],this.patch=null,this._batchObservingVariableChanges=!1,this._defaultGlobalVariables=new Map,this._changedVariablesForBatchObs=new Set,this._globalVariables=new Map,this._callStack=t,this._listDefsOrigin=e;try{return new Proxy(this,{get:(t,e)=>e in t?t[e]:t.$(e),set:(t,e,n)=>(e in t?t[e]=n:t.$(e,n),!0)})}catch(t){}}variableChangedEvent(t,e){for(let n of this.variableChangedEventCallbacks)n(t,e)}get batchObservingVariableChanges(){return this._batchObservingVariableChanges}set batchObservingVariableChanges(t){if(this._batchObservingVariableChanges=t,t)this._changedVariablesForBatchObs=new Set;else if(null!=this._changedVariablesForBatchObs){for(let t of this._changedVariablesForBatchObs){let e=this._globalVariables.get(t);e?this.variableChangedEvent(t,e):d("currentValue")}this._changedVariablesForBatchObs=null}}get callStack(){return this._callStack}set callStack(t){this._callStack=t}$(t,e){if(void 0===e){let e=null;return null!==this.patch&&(e=this.patch.TryGetGlobal(t,null),e.exists)?e.result.valueObject:(e=this._globalVariables.get(t),void 0===e&&(e=this._defaultGlobalVariables.get(t)),void 0!==e?e.valueObject:null)}{if(void 0===this._defaultGlobalVariables.get(t))throw new S("Cannot assign to a variable ("+t+") that hasn't been declared in the story");let n=v.Create(e);if(null==n)throw new S(null==e?"Cannot pass null to VariableState":"Invalid value passed to VariableState: "+e.toString());this.SetGlobal(t,n)}}ApplyPatch(){if(null===this.patch)return d("this.patch");for(let[t,e]of this.patch.globals)this._globalVariables.set(t,e);if(null!==this._changedVariablesForBatchObs)for(let t of this.patch.changedVariables)this._changedVariablesForBatchObs.add(t);this.patch=null}SetJsonToken(t){this._globalVariables.clear();for(let[e,n]of this._defaultGlobalVariables){let i=t[e];if(void 0!==i){let t=M.JTokenToRuntimeObject(i);if(null===t)return d("tokenInkObject");this._globalVariables.set(e,t)}else this._globalVariables.set(e,n)}}WriteJson(t){t.WriteObjectStart();for(let[e,n]of this._globalVariables){let i=e,r=n;if(J.dontSaveDefaultValues&&this._defaultGlobalVariables.has(i)){let t=this._defaultGlobalVariables.get(i);if(this.RuntimeObjectsEqual(r,t))continue}t.WritePropertyStart(i),M.WriteRuntimeObject(t,r),t.WritePropertyEnd()}t.WriteObjectEnd()}RuntimeObjectsEqual(t,e){if(null===t)return d("obj1");if(null===e)return d("obj2");if(t.constructor!==e.constructor)return!1;let n=a(t,b);if(null!==n)return n.value===s(e,b).value;let i=a(t,_);if(null!==i)return i.value===s(e,_).value;let r=a(t,v),l=a(e,v);if(null!==r&&null!==l)return u(r.valueObject)&&u(l.valueObject)?r.valueObject.Equals(l.valueObject):r.valueObject===l.valueObject;throw new Error("FastRoughDefinitelyEquals: Unsupported runtime object type: "+t.constructor.name)}GetVariableWithName(t,e=-1){let n=this.GetRawVariableWithName(t,e),i=a(n,w);return null!==i&&(n=this.ValueAtVariablePointer(i)),n}TryGetDefaultVariableValue(t){let e=y(this._defaultGlobalVariables,t,null);return e.exists?e.result:null}GlobalVariableExistsWithName(t){return this._globalVariables.has(t)||null!==this._defaultGlobalVariables&&this._defaultGlobalVariables.has(t)}GetRawVariableWithName(t,e){let n=null;if(0==e||-1==e){let e=null;if(null!==this.patch&&(e=this.patch.TryGetGlobal(t,null),e.exists))return e.result;if(e=y(this._globalVariables,t,null),e.exists)return e.result;if(null!==this._defaultGlobalVariables&&(e=y(this._defaultGlobalVariables,t,null),e.exists))return e.result;if(null===this._listDefsOrigin)return d("VariablesState._listDefsOrigin");let n=this._listDefsOrigin.FindSingleItemListWithName(t);if(n)return n}return n=this._callStack.GetTemporaryVariableWithName(t,e),n}ValueAtVariablePointer(t){return this.GetVariableWithName(t.variableName,t.contextIndex)}Assign(t,e){let n=t.variableName;if(null===n)return d("name");let i=-1,r=!1;if(r=t.isNewDeclaration?t.isGlobal:this.GlobalVariableExistsWithName(n),t.isNewDeclaration){let t=a(e,w);if(null!==t){e=this.ResolveVariablePointer(t)}}else{let t=null;do{t=a(this.GetRawVariableWithName(n,i),w),null!=t&&(n=t.variableName,i=t.contextIndex,r=0==i)}while(null!=t)}r?this.SetGlobal(n,e):this._callStack.SetTemporaryVariable(n,e,t.isNewDeclaration,i)}SnapshotDefaultGlobals(){this._defaultGlobalVariables=new Map(this._globalVariables)}RetainListOriginsForAssignment(t,e){let n=s(t,O),i=s(e,O);n.value&&i.value&&0==i.value.Count&&i.value.SetInitialOriginNames(n.value.originNames)}SetGlobal(t,e){let n=null;if(null===this.patch&&(n=y(this._globalVariables,t,null)),null!==this.patch&&(n=this.patch.TryGetGlobal(t,null),n.exists||(n=y(this._globalVariables,t,null))),O.RetainListOriginsForAssignment(n.result,e),null===t)return d("variableName");if(null!==this.patch?this.patch.SetGlobal(t,e):this._globalVariables.set(t,e),null!==this.variableChangedEvent&&null!==n&&e!==n.result)if(this.batchObservingVariableChanges){if(null===this._changedVariablesForBatchObs)return d("this._changedVariablesForBatchObs");null!==this.patch?this.patch.AddChangedVariable(t):null!==this._changedVariablesForBatchObs&&this._changedVariablesForBatchObs.add(t)}else this.variableChangedEvent(t,e)}ResolveVariablePointer(t){let e=t.contextIndex;-1==e&&(e=this.GetContextIndexOfVariableNamed(t.variableName));let n=a(this.GetRawVariableWithName(t.variableName,e),w);return null!=n?n:new w(t.variableName,e)}GetContextIndexOfVariableNamed(t){return this.GlobalVariableExistsWithName(t)?0:this._callStack.currentElementIndex}ObserveVariableChange(t){this.variableChangedEventCallbacks.push(t)}}J.dontSaveDefaultValues=!0;class K{constructor(t){this.seed=t%2147483647,this.seed<=0&&(this.seed+=2147483646)}next(){return this.seed=16807*this.seed%2147483647}nextFloat(){return(this.next()-1)/2147483646}}class U{constructor(){if(this._changedVariables=new Set,this._visitCounts=new Map,this._turnIndices=new Map,1===arguments.length&&null!==arguments[0]){let t=arguments[0];this._globals=new Map(t._globals),this._changedVariables=new Set(t._changedVariables),this._visitCounts=new Map(t._visitCounts),this._turnIndices=new Map(t._turnIndices)}else this._globals=new Map,this._changedVariables=new Set,this._visitCounts=new Map,this._turnIndices=new Map}get globals(){return this._globals}get changedVariables(){return this._changedVariables}get visitCounts(){return this._visitCounts}get turnIndices(){return this._turnIndices}TryGetGlobal(t,e){return null!==t&&this._globals.has(t)?{result:this._globals.get(t),exists:!0}:{result:e,exists:!1}}SetGlobal(t,e){this._globals.set(t,e)}AddChangedVariable(t){return this._changedVariables.add(t)}TryGetVisitCount(t,e){return this._visitCounts.has(t)?{result:this._visitCounts.get(t),exists:!0}:{result:e,exists:!1}}SetVisitCount(t,e){this._visitCounts.set(t,e)}SetTurnIndex(t,e){this._turnIndices.set(t,e)}TryGetTurnIndex(t,e){return this._turnIndices.has(t)?{result:this._turnIndices.get(t),exists:!0}:{result:e,exists:!1}}}class z{static TextToDictionary(t){return new z.Reader(t).ToDictionary()}static TextToArray(t){return new z.Reader(t).ToArray()}}!function(t){t.Reader=class{constructor(t){this._rootObject=JSON.parse(t)}ToDictionary(){return this._rootObject}ToArray(){return this._rootObject}};class e{constructor(){this._currentPropertyName=null,this._currentString=null,this._stateStack=[],this._collectionStack=[],this._propertyNameStack=[],this._jsonObject=null}WriteObject(t){this.WriteObjectStart(),t(this),this.WriteObjectEnd()}WriteObjectStart(){this.StartNewObject(!0);let e={};if(this.state===t.Writer.State.Property){this.Assert(null!==this.currentCollection),this.Assert(null!==this.currentPropertyName);let t=this._propertyNameStack.pop();this.currentCollection[t]=e,this._collectionStack.push(e)}else this.state===t.Writer.State.Array?(this.Assert(null!==this.currentCollection),this.currentCollection.push(e),this._collectionStack.push(e)):(this.Assert(this.state===t.Writer.State.None),this._jsonObject=e,this._collectionStack.push(e));this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Object))}WriteObjectEnd(){this.Assert(this.state===t.Writer.State.Object),this._collectionStack.pop(),this._stateStack.pop()}WriteProperty(t,e){if(this.WritePropertyStart(t),arguments[1]instanceof Function){(0,arguments[1])(this)}else{let t=arguments[1];this.Write(t)}this.WritePropertyEnd()}WriteIntProperty(t,e){this.WritePropertyStart(t),this.WriteInt(e),this.WritePropertyEnd()}WriteFloatProperty(t,e){this.WritePropertyStart(t),this.WriteFloat(e),this.WritePropertyEnd()}WritePropertyStart(e){this.Assert(this.state===t.Writer.State.Object),this._propertyNameStack.push(e),this.IncrementChildCount(),this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Property))}WritePropertyEnd(){this.Assert(this.state===t.Writer.State.Property),this.Assert(1===this.childCount),this._stateStack.pop()}WritePropertyNameStart(){this.Assert(this.state===t.Writer.State.Object),this.IncrementChildCount(),this._currentPropertyName="",this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Property)),this._stateStack.push(new t.Writer.StateElement(t.Writer.State.PropertyName))}WritePropertyNameEnd(){this.Assert(this.state===t.Writer.State.PropertyName),this.Assert(null!==this._currentPropertyName),this._propertyNameStack.push(this._currentPropertyName),this._currentPropertyName=null,this._stateStack.pop()}WritePropertyNameInner(e){this.Assert(this.state===t.Writer.State.PropertyName),this.Assert(null!==this._currentPropertyName),this._currentPropertyName+=e}WriteArrayStart(){this.StartNewObject(!0);let e=[];if(this.state===t.Writer.State.Property){this.Assert(null!==this.currentCollection),this.Assert(null!==this.currentPropertyName);let t=this._propertyNameStack.pop();this.currentCollection[t]=e,this._collectionStack.push(e)}else this.state===t.Writer.State.Array?(this.Assert(null!==this.currentCollection),this.currentCollection.push(e),this._collectionStack.push(e)):(this.Assert(this.state===t.Writer.State.None),this._jsonObject=e,this._collectionStack.push(e));this._stateStack.push(new t.Writer.StateElement(t.Writer.State.Array))}WriteArrayEnd(){this.Assert(this.state===t.Writer.State.Array),this._collectionStack.pop(),this._stateStack.pop()}Write(t,e=!0){null!==t?(this.StartNewObject(!1),this._addToCurrentObject(t)):console.error("Warning: trying to write a null string")}WriteInt(t){null!==t&&(this.StartNewObject(!1),this._addToCurrentObject(Math.floor(t)))}WriteFloat(t){null!==t&&(this.StartNewObject(!1),t==Number.POSITIVE_INFINITY?this._addToCurrentObject(34e37):t==Number.NEGATIVE_INFINITY?this._addToCurrentObject(-34e37):isNaN(t)?this._addToCurrentObject(0):this._addToCurrentObject(t))}WriteNull(){this.StartNewObject(!1),this._addToCurrentObject(null)}WriteStringStart(){this.StartNewObject(!1),this._currentString="",this._stateStack.push(new t.Writer.StateElement(t.Writer.State.String))}WriteStringEnd(){this.Assert(this.state==t.Writer.State.String),this._stateStack.pop(),this._addToCurrentObject(this._currentString),this._currentString=null}WriteStringInner(e,n=!0){this.Assert(this.state===t.Writer.State.String),null!==e?this._currentString+=e:console.error("Warning: trying to write a null string")}ToString(){return null===this._jsonObject?"":JSON.stringify(this._jsonObject)}StartNewObject(e){e?this.Assert(this.state===t.Writer.State.None||this.state===t.Writer.State.Property||this.state===t.Writer.State.Array):this.Assert(this.state===t.Writer.State.Property||this.state===t.Writer.State.Array),this.state===t.Writer.State.Property&&this.Assert(0===this.childCount),this.state!==t.Writer.State.Array&&this.state!==t.Writer.State.Property||this.IncrementChildCount()}get state(){return this._stateStack.length>0?this._stateStack[this._stateStack.length-1].type:t.Writer.State.None}get childCount(){return this._stateStack.length>0?this._stateStack[this._stateStack.length-1].childCount:0}get currentCollection(){return this._collectionStack.length>0?this._collectionStack[this._collectionStack.length-1]:null}get currentPropertyName(){return this._propertyNameStack.length>0?this._propertyNameStack[this._propertyNameStack.length-1]:null}IncrementChildCount(){this.Assert(this._stateStack.length>0);let t=this._stateStack.pop();t.childCount++,this._stateStack.push(t)}Assert(t){if(!t)throw Error("Assert failed while writing JSON")}_addToCurrentObject(e){this.Assert(null!==this.currentCollection),this.state===t.Writer.State.Array?(this.Assert(Array.isArray(this.currentCollection)),this.currentCollection.push(e)):this.state===t.Writer.State.Property&&(this.Assert(!Array.isArray(this.currentCollection)),this.Assert(null!==this.currentPropertyName),this.currentCollection[this.currentPropertyName]=e,this._propertyNameStack.pop())}}t.Writer=e,function(e){let n;!function(t){t[t.None=0]="None",t[t.Object=1]="Object",t[t.Array=2]="Array",t[t.Property=3]="Property",t[t.PropertyName=4]="PropertyName",t[t.String=5]="String"}(n=e.State||(e.State={}));e.StateElement=class{constructor(e){this.type=t.Writer.State.None,this.childCount=0,this.type=e}}}(e=t.Writer||(t.Writer={}))}(z||(z={}));class H{constructor(t){this.kInkSaveStateVersion=8,this.kMinCompatibleLoadVersion=8,this._currentErrors=null,this._currentWarnings=null,this.divertedPointer=I.Null,this._currentTurnIndex=0,this.storySeed=0,this.previousRandom=0,this.didSafeExit=!1,this._currentText=null,this._currentTags=null,this._outputStreamTextDirty=!0,this._outputStreamTagsDirty=!0,this._patch=null,this.story=t,this._outputStream=[],this.OutputStreamDirty(),this._evaluationStack=[],this.callStack=new q(t),this._variablesState=new J(this.callStack,t.listDefinitions),this._visitCounts=new Map,this._turnIndices=new Map,this.currentTurnIndex=-1;let e=(new Date).getTime();this.storySeed=new K(e).next()%100,this.previousRandom=0,this._currentChoices=[],this.GoToStart()}ToJson(t=!1){let e=new z.Writer;return this.WriteJson(e),e.ToString()}toJson(t=!1){return this.ToJson(t)}LoadJson(t){let e=z.TextToDictionary(t);this.LoadJsonObj(e)}VisitCountAtPathString(t){let n;if(null!==this._patch){let i=this.story.ContentAtPath(new e(t)).container;if(null===i)throw new Error("Content at path not found: "+t);if(n=this._patch.TryGetVisitCount(i,0),n.exists)return n.result}return n=y(this._visitCounts,t,null),n.exists?n.result:0}VisitCountForContainer(t){if(null===t)return d("container");if(!t.visitsShouldBeCounted)return this.story.Error("Read count for target ("+t.name+" - on "+t.debugMetadata+") unknown. The story may need to be compiled with countAllVisits flag (-c)."),0;if(null!==this._patch){let e=this._patch.TryGetVisitCount(t,0);if(e.exists)return e.result}let e=t.path.toString(),n=y(this._visitCounts,e,null);return n.exists?n.result:0}IncrementVisitCountForContainer(t){if(null!==this._patch){let e=this.VisitCountForContainer(t);return e++,void this._patch.SetVisitCount(t,e)}let e=t.path.toString(),n=y(this._visitCounts,e,null);n.exists?this._visitCounts.set(e,n.result+1):this._visitCounts.set(e,1)}RecordTurnIndexVisitToContainer(t){if(null!==this._patch)return void this._patch.SetTurnIndex(t,this.currentTurnIndex);let e=t.path.toString();this._turnIndices.set(e,this.currentTurnIndex)}TurnsSinceForContainer(t){if(t.turnIndexShouldBeCounted||this.story.Error("TURNS_SINCE() for target ("+t.name+" - on "+t.debugMetadata+") unknown. The story may need to be compiled with countAllVisits flag (-c)."),null!==this._patch){let e=this._patch.TryGetTurnIndex(t,0);if(e.exists)return this.currentTurnIndex-e.result}let e=t.path.toString(),n=y(this._turnIndices,e,0);return n.exists?this.currentTurnIndex-n.result:-1}get callstackDepth(){return this.callStack.depth}get outputStream(){return this._outputStream}get currentChoices(){return this.canContinue?[]:this._currentChoices}get generatedChoices(){return this._currentChoices}get currentErrors(){return this._currentErrors}get currentWarnings(){return this._currentWarnings}get variablesState(){return this._variablesState}set variablesState(t){this._variablesState=t}get evaluationStack(){return this._evaluationStack}get visitCounts(){return this._visitCounts}get turnIndices(){return this._turnIndices}get currentTurnIndex(){return this._currentTurnIndex}set currentTurnIndex(t){this._currentTurnIndex=t}get currentPathString(){let t=this.currentPointer;return t.isNull?null:null===t.path?d("pointer.path"):t.path.toString()}get currentPointer(){return this.callStack.currentElement.currentPointer.copy()}set currentPointer(t){this.callStack.currentElement.currentPointer=t.copy()}get previousPointer(){return this.callStack.currentThread.previousPointer.copy()}set previousPointer(t){this.callStack.currentThread.previousPointer=t.copy()}get canContinue(){return!this.currentPointer.isNull&&!this.hasError}get hasError(){return null!=this.currentErrors&&this.currentErrors.length>0}get hasWarning(){return null!=this.currentWarnings&&this.currentWarnings.length>0}get currentText(){if(this._outputStreamTextDirty){let t=new m;for(let e of this._outputStream){let n=a(e,T);null!==n&&t.Append(n.value)}this._currentText=this.CleanOutputWhitespace(t.toString()),this._outputStreamTextDirty=!1}return this._currentText}CleanOutputWhitespace(t){let e=new m,n=-1,i=0;for(let r=0;r<t.length;r++){let a=t.charAt(r),s=" "==a||"\t"==a;s&&-1==n&&(n=r),s||("\n"!=a&&n>0&&n!=i&&e.Append(" "),n=-1),"\n"==a&&(i=r+1),s||e.Append(a)}return e.toString()}get currentTags(){if(this._outputStreamTagsDirty){this._currentTags=[];for(let t of this._outputStream){let e=a(t,j);null!==e&&this._currentTags.push(e.text)}this._outputStreamTagsDirty=!1}return this._currentTags}get inExpressionEvaluation(){return this.callStack.currentElement.inExpressionEvaluation}set inExpressionEvaluation(t){this.callStack.currentElement.inExpressionEvaluation=t}GoToStart(){this.callStack.currentElement.currentPointer=I.StartOf(this.story.mainContentContainer)}CopyAndStartPatching(){let t=new H(this.story);return t._patch=new U(this._patch),t.outputStream.push.apply(t.outputStream,this._outputStream),t.OutputStreamDirty(),t._currentChoices.push.apply(t._currentChoices,this._currentChoices),this.hasError&&(t._currentErrors=[],t._currentErrors.push.apply(t._currentErrors,this.currentErrors||[])),this.hasWarning&&(t._currentWarnings=[],t._currentWarnings.push.apply(t._currentWarnings,this.currentWarnings||[])),t.callStack=new q(this.callStack),t.variablesState=this.variablesState,t.variablesState.callStack=t.callStack,t.variablesState.patch=t._patch,t.evaluationStack.push.apply(t.evaluationStack,this.evaluationStack),this.divertedPointer.isNull||(t.divertedPointer=this.divertedPointer.copy()),t.previousPointer=this.previousPointer.copy(),t._visitCounts=this._visitCounts,t._turnIndices=this._turnIndices,t.currentTurnIndex=this.currentTurnIndex,t.storySeed=this.storySeed,t.previousRandom=this.previousRandom,t.didSafeExit=this.didSafeExit,t}RestoreAfterPatch(){this.variablesState.callStack=this.callStack,this.variablesState.patch=this._patch}ApplyAnyPatch(){if(null!==this._patch){this.variablesState.ApplyPatch();for(let[t,e]of this._patch.visitCounts)this.ApplyCountChanges(t,e,!0);for(let[t,e]of this._patch.turnIndices)this.ApplyCountChanges(t,e,!1);this._patch=null}}ApplyCountChanges(t,e,n){(n?this._visitCounts:this._turnIndices).set(t.path.toString(),e)}WriteJson(t){t.WriteObjectStart();let e=!1;for(let n of this._currentChoices){if(null===n.threadAtGeneration)return d("c.threadAtGeneration");n.originalThreadIndex=n.threadAtGeneration.threadIndex,null===this.callStack.ThreadWithIndex(n.originalThreadIndex)&&(e||(e=!0,t.WritePropertyStart("choiceThreads"),t.WriteObjectStart()),t.WritePropertyStart(n.originalThreadIndex),n.threadAtGeneration.WriteJson(t),t.WritePropertyEnd())}if(e&&(t.WriteObjectEnd(),t.WritePropertyEnd()),t.WriteProperty("callstackThreads",t=>this.callStack.WriteJson(t)),t.WriteProperty("variablesState",t=>this.variablesState.WriteJson(t)),t.WriteProperty("evalStack",t=>M.WriteListRuntimeObjs(t,this.evaluationStack)),t.WriteProperty("outputStream",t=>M.WriteListRuntimeObjs(t,this._outputStream)),t.WriteProperty("currentChoices",t=>{t.WriteArrayStart();for(let e of this._currentChoices)M.WriteChoice(t,e);t.WriteArrayEnd()}),!this.divertedPointer.isNull){if(null===this.divertedPointer.path)return d("divertedPointer");t.WriteProperty("currentDivertTarget",this.divertedPointer.path.componentsString)}t.WriteProperty("visitCounts",t=>M.WriteIntDictionary(t,this._visitCounts)),t.WriteProperty("turnIndices",t=>M.WriteIntDictionary(t,this._turnIndices)),t.WriteIntProperty("turnIdx",this.currentTurnIndex),t.WriteIntProperty("storySeed",this.storySeed),t.WriteIntProperty("previousRandom",this.previousRandom),t.WriteIntProperty("inkSaveVersion",this.kInkSaveStateVersion),t.WriteIntProperty("inkFormatVersion",X.inkVersionCurrent),t.WriteObjectEnd()}LoadJsonObj(t){let n=t,i=n.inkSaveVersion;if(null==i)throw new S("ink save format incorrect, can't load.");if(parseInt(i)<this.kMinCompatibleLoadVersion)throw new S("Ink save format isn't compatible with the current version (saw '"+i+"', but minimum is "+this.kMinCompatibleLoadVersion+"), so can't load.");this.callStack.SetJsonToken(n.callstackThreads,this.story),this.variablesState.SetJsonToken(n.variablesState),this._evaluationStack=M.JArrayToRuntimeObjList(n.evalStack),this._outputStream=M.JArrayToRuntimeObjList(n.outputStream),this.OutputStreamDirty(),this._currentChoices=M.JArrayToRuntimeObjList(n.currentChoices);let r=n.currentDivertTarget;if(null!=r){let t=new e(r.toString());this.divertedPointer=this.story.PointerAtPath(t)}this._visitCounts=M.JObjectToIntDictionary(n.visitCounts),this._turnIndices=M.JObjectToIntDictionary(n.turnIndices),this.currentTurnIndex=parseInt(n.turnIdx),this.storySeed=parseInt(n.storySeed),this.previousRandom=parseInt(n.previousRandom);let a=n.choiceThreads;for(let t of this._currentChoices){let e=this.callStack.ThreadWithIndex(t.originalThreadIndex);if(null!=e)t.threadAtGeneration=e.Copy();else{let e=a[t.originalThreadIndex.toString()];t.threadAtGeneration=new q.Thread(e,this.story)}}}ResetErrors(){this._currentErrors=null,this._currentWarnings=null}ResetOutput(t=null){this._outputStream.length=0,null!==t&&this._outputStream.push.apply(this._outputStream,t),this.OutputStreamDirty()}PushToOutputStream(t){let e=a(t,T);if(null!==e){let t=this.TrySplittingHeadTailWhitespace(e);if(null!==t){for(let e of t)this.PushToOutputStreamIndividual(e);return void this.OutputStreamDirty()}}this.PushToOutputStreamIndividual(t),this.OutputStreamDirty()}PopFromOutputStream(t){this.outputStream.splice(this.outputStream.length-t,t),this.OutputStreamDirty()}TrySplittingHeadTailWhitespace(t){let e=t.value;if(null===e)return d("single.value");let n=-1,i=-1;for(let t=0;t<e.length;++t){let r=e[t];if("\n"!=r){if(" "==r||"\t"==r)continue;break}-1==n&&(n=t),i=t}let r=-1,a=-1;for(let t=0;t<e.length;++t){let n=e[t];if("\n"!=n){if(" "==n||"\t"==n)continue;break}-1==r&&(r=t),a=t}if(-1==n&&-1==r)return null;let s=[],l=0,o=e.length;if(-1!=n){if(n>0){let t=new T(e.substring(0,n));s.push(t)}s.push(new T("\n")),l=i+1}if(-1!=r&&(o=a),o>l){let t=e.substring(l,o-l);s.push(new T(t))}if(-1!=r&&a>i&&(s.push(new T("\n")),r<e.length-1)){let t=e.length-r-1,n=new T(e.substring(r+1,t));s.push(n)}return s}PushToOutputStreamIndividual(t){let e=a(t,x),n=a(t,T),i=!0;if(e)this.TrimNewlinesFromOutputStream(),i=!0;else if(n){let t=-1,e=this.callStack.currentElement;e.type==r.Function&&(t=e.functionStartInOutputStream);let a=-1;for(let e=this._outputStream.length-1;e>=0;e--){let n=this._outputStream[e],i=n instanceof A?n:null;if(null!=(n instanceof x?n:null)){a=e;break}if(null!=i&&i.commandType==A.CommandType.BeginString){e>=t&&(t=-1);break}}let s=-1;if(s=-1!=a&&-1!=t?Math.min(t,a):-1!=a?a:t,-1!=s){if(n.isNewline)i=!1;else if(n.isNonWhitespace&&(a>-1&&this.RemoveExistingGlue(),t>-1)){let t=this.callStack.elements;for(let e=t.length-1;e>=0;e--){let n=t[e];if(n.type!=r.Function)break;n.functionStartInOutputStream=-1}}}else n.isNewline&&(!this.outputStreamEndsInNewline&&this.outputStreamContainsContent||(i=!1))}if(i){if(null===t)return d("obj");this._outputStream.push(t),this.OutputStreamDirty()}}TrimNewlinesFromOutputStream(){let t=-1,e=this._outputStream.length-1;for(;e>=0;){let n=this._outputStream[e],i=a(n,A),r=a(n,T);if(null!=i||null!=r&&r.isNonWhitespace)break;null!=r&&r.isNewline&&(t=e),e--}if(t>=0)for(e=t;e<this._outputStream.length;){a(this._outputStream[e],T)?this._outputStream.splice(e,1):e++}this.OutputStreamDirty()}RemoveExistingGlue(){for(let t=this._outputStream.length-1;t>=0;t--){let e=this._outputStream[t];if(e instanceof x)this._outputStream.splice(t,1);else if(e instanceof A)break}this.OutputStreamDirty()}get outputStreamEndsInNewline(){if(this._outputStream.length>0)for(let t=this._outputStream.length-1;t>=0;t--){if(this._outputStream[t]instanceof A)break;let e=this._outputStream[t];if(e instanceof T){if(e.isNewline)return!0;if(e.isNonWhitespace)break}}return!1}get outputStreamContainsContent(){for(let t=0;t<this._outputStream.length;t++)if(this._outputStream[t]instanceof T)return!0;return!1}get inStringEvaluation(){for(let t=this._outputStream.length-1;t>=0;t--){let e=a(this._outputStream[t],A);if(e instanceof A&&e.commandType==A.CommandType.BeginString)return!0}return!1}PushEvaluationStack(t){let e=a(t,O);if(e){let t=e.value;if(null===t)return d("rawList");if(null!=t.originNames){t.origins||(t.origins=[]),t.origins.length=0;for(let e of t.originNames){if(null===this.story.listDefinitions)return d("StoryState.story.listDefinitions");let n=this.story.listDefinitions.TryListGetDefinition(e,null);if(null===n.result)return d("StoryState def.result");t.origins.indexOf(n.result)<0&&t.origins.push(n.result)}}}if(null===t)return d("obj");this.evaluationStack.push(t)}PopEvaluationStack(t){if(void 0===t){return o(this.evaluationStack.pop())}if(t>this.evaluationStack.length)throw new Error("trying to pop too many objects");return o(this.evaluationStack.splice(this.evaluationStack.length-t,t))}PeekEvaluationStack(){return this.evaluationStack[this.evaluationStack.length-1]}ForceEnd(){this.callStack.Reset(),this._currentChoices.length=0,this.currentPointer=I.Null,this.previousPointer=I.Null,this.didSafeExit=!0}TrimWhitespaceFromFunctionEnd(){n.Assert(this.callStack.currentElement.type==r.Function);let t=this.callStack.currentElement.functionStartInOutputStream;-1==t&&(t=0);for(let e=this._outputStream.length-1;e>=t;e--){let t=this._outputStream[e],n=a(t,T),i=a(t,A);if(null!=n){if(i)break;if(!n.isNewline&&!n.isInlineWhitespace)break;this._outputStream.splice(e,1),this.OutputStreamDirty()}}}PopCallStack(t=null){this.callStack.currentElement.type==r.Function&&this.TrimWhitespaceFromFunctionEnd(),this.callStack.Pop(t)}SetChosenPath(t,e){this._currentChoices.length=0;let n=this.story.PointerAtPath(t);n.isNull||-1!=n.index||(n.index=0),this.currentPointer=n,e&&this.currentTurnIndex++}StartFunctionEvaluationFromGame(t,e){this.callStack.Push(r.FunctionEvaluationFromGame,this.evaluationStack.length),this.callStack.currentElement.currentPointer=I.StartOf(t),this.PassArgumentsToEvaluationStack(e)}PassArgumentsToEvaluationStack(t){if(null!=t)for(let e=0;e<t.length;e++){if("number"!=typeof t[e]&&"string"!=typeof t[e])throw new Error("ink arguments when calling EvaluateFunction / ChoosePathStringWithParameters  must be int, float or string");this.PushEvaluationStack(v.Create(t[e]))}}TryExitFunctionEvaluationFromGame(){return this.callStack.currentElement.type==r.FunctionEvaluationFromGame&&(this.currentPointer=I.Null,this.didSafeExit=!0,!0)}CompleteFunctionEvaluationFromGame(){if(this.callStack.currentElement.type!=r.FunctionEvaluationFromGame)throw new S("Expected external function evaluation to be complete. Stack trace: "+this.callStack.callStackTrace);let t=this.callStack.currentElement.evaluationStackHeightWhenPushed,e=null;for(;this.evaluationStack.length>t;){let t=this.PopEvaluationStack();null===e&&(e=t)}if(this.PopCallStack(r.FunctionEvaluationFromGame),e){if(e instanceof L)return null;let t=s(e,v);return t.valueType==i.DivertTarget?t.valueObject.toString():t.valueObject}return null}AddError(t,e){e?(null==this._currentWarnings&&(this._currentWarnings=[]),this._currentWarnings.push(t)):(null==this._currentErrors&&(this._currentErrors=[]),this._currentErrors.push(t))}OutputStreamDirty(){this._outputStreamTextDirty=!0,this._outputStreamTagsDirty=!0}}class ${constructor(){this.startTime=void 0}get ElapsedMilliseconds(){return void 0===this.startTime?0:(new Date).getTime()-this.startTime}Start(){this.startTime=(new Date).getTime()}Stop(){this.startTime=void 0}}Number.isInteger||(Number.isInteger=function(t){return"number"==typeof t&&isFinite(t)&&t>-9007199254740992&&t<9007199254740992&&Math.floor(t)===t});class X extends p{constructor(){let t;super(),this.inkVersionMinimumCompatible=18,this._prevContainers=[],this.allowExternalFunctionFallbacks=!1,this._listDefinitions=null,this._variableObservers=null,this._hasValidatedExternals=!1,this._temporaryEvaluationContainer=null,this._asyncContinueActive=!1,this._stateSnapshotAtLastNewline=null,this._recursiveContinueCount=0,this._asyncSaving=!1,this._profiler=null;let e=null,n=null;if(arguments[0]instanceof N)t=arguments[0],void 0!==arguments[1]&&(e=arguments[1]),this._mainContentContainer=t;else if("string"==typeof arguments[0]){let t=arguments[0];n=z.TextToDictionary(t)}else n=arguments[0];if(null!=e&&(this._listDefinitions=new B(e)),this._externals=new Map,null!==n){let t=n,e=t.inkVersion;if(null==e)throw new Error("ink version number not found. Are you sure it's a valid .ink.json file?");let i=parseInt(e);if(i>X.inkVersionCurrent)throw new Error("Version of ink used to build story was newer than the current version of the engine");if(i<this.inkVersionMinimumCompatible)throw new Error("Version of ink used to build story is too old to be loaded by this version of the engine");i!=X.inkVersionCurrent&&console.warn("WARNING: Version of ink used to build story doesn't match current version of engine. Non-critical, but recommend synchronising.");let r,a=t.root;if(null==a)throw new Error("Root node for ink not found. Are you sure it's a valid .ink.json file?");(r=t.listDefs)&&(this._listDefinitions=M.JTokenToListDefinitions(r)),this._mainContentContainer=s(M.JTokenToRuntimeObject(a),N),this.ResetState()}}get currentChoices(){let t=[];if(null===this._state)return d("this._state");for(let e of this._state.currentChoices)e.isInvisibleDefault||(e.index=t.length,t.push(e));return t}get currentText(){return this.IfAsyncWeCant("call currentText since it's a work in progress"),this.state.currentText}get currentTags(){return this.IfAsyncWeCant("call currentTags since it's a work in progress"),this.state.currentTags}get currentErrors(){return this.state.currentErrors}get currentWarnings(){return this.state.currentWarnings}get hasError(){return this.state.hasError}get hasWarning(){return this.state.hasWarning}get variablesState(){return this.state.variablesState}get listDefinitions(){return this._listDefinitions}get state(){return this._state}StartProfiling(){}EndProfiling(){}ToJson(t){let e=!1;if(t||(e=!0,t=new z.Writer),t.WriteObjectStart(),t.WriteIntProperty("inkVersion",X.inkVersionCurrent),t.WriteProperty("root",t=>M.WriteRuntimeContainer(t,this._mainContentContainer)),null!=this._listDefinitions){t.WritePropertyStart("listDefs"),t.WriteObjectStart();for(let e of this._listDefinitions.lists){t.WritePropertyStart(e.name),t.WriteObjectStart();for(let[n,i]of e.items){let e=f.fromSerializedKey(n),r=i;t.WriteIntProperty(e.itemName,r)}t.WriteObjectEnd(),t.WritePropertyEnd()}t.WriteObjectEnd(),t.WritePropertyEnd()}if(t.WriteObjectEnd(),e)return t.ToString()}ResetState(){this.IfAsyncWeCant("ResetState"),this._state=new H(this),this._state.variablesState.ObserveVariableChange(this.VariableStateDidChangeEvent.bind(this)),this.ResetGlobals()}ResetErrors(){if(null===this._state)return d("this._state");this._state.ResetErrors()}ResetCallstack(){if(this.IfAsyncWeCant("ResetCallstack"),null===this._state)return d("this._state");this._state.ForceEnd()}ResetGlobals(){if(this._mainContentContainer.namedContent.get("global decl")){let t=this.state.currentPointer.copy();this.ChoosePath(new e("global decl"),!1),this.ContinueInternal(),this.state.currentPointer=t}this.state.variablesState.SnapshotDefaultGlobals()}Continue(){return this.ContinueAsync(0),this.currentText}get canContinue(){return this.state.canContinue}get asyncContinueComplete(){return!this._asyncContinueActive}ContinueAsync(t){this._hasValidatedExternals||this.ValidateExternalBindings(),this.ContinueInternal(t)}ContinueInternal(t=0){null!=this._profiler&&this._profiler.PreContinue();let e=t>0;if(this._recursiveContinueCount++,!this._asyncContinueActive){if(this._asyncContinueActive=e,!this.canContinue)throw new S("Can't continue - should check canContinue before calling Continue");this._state.didSafeExit=!1,this._state.ResetOutput(),1==this._recursiveContinueCount&&(this._state.variablesState.batchObservingVariableChanges=!0)}let n=new $;n.Start();let i=!1;do{try{i=this.ContinueSingleStep()}catch(t){if(!(t instanceof S))throw t;this.AddError(t.message,void 0,t.useEndLineNumber);break}if(i)break;if(this._asyncContinueActive&&n.ElapsedMilliseconds>t)break}while(this.canContinue);n.Stop(),!i&&this.canContinue||(null!==this._stateSnapshotAtLastNewline&&this.RestoreStateSnapshot(),this.canContinue||(this.state.callStack.canPopThread&&this.AddError("Thread available to pop, threads should always be flat by the end of evaluation?"),0!=this.state.generatedChoices.length||this.state.didSafeExit||null!=this._temporaryEvaluationContainer||(this.state.callStack.CanPop(r.Tunnel)?this.AddError("unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?"):this.state.callStack.CanPop(r.Function)?this.AddError("unexpectedly reached end of content. Do you need a '~ return'?"):this.state.callStack.canPop?this.AddError("unexpectedly reached end of content for unknown reason. Please debug compiler!"):this.AddError("ran out of content. Do you need a '-> DONE' or '-> END'?"))),this.state.didSafeExit=!1,1==this._recursiveContinueCount&&(this._state.variablesState.batchObservingVariableChanges=!1),this._asyncContinueActive=!1),this._recursiveContinueCount--,null!=this._profiler&&this._profiler.PostContinue()}ContinueSingleStep(){if(null!=this._profiler&&this._profiler.PreStep(),this.Step(),null!=this._profiler&&this._profiler.PostStep(),this.canContinue||this.state.callStack.elementIsEvaluateFromGame||this.TryFollowDefaultInvisibleChoice(),null!=this._profiler&&this._profiler.PreSnapshot(),!this.state.inStringEvaluation){if(null!==this._stateSnapshotAtLastNewline){if(null===this._stateSnapshotAtLastNewline.currentTags)return d("this._stateAtLastNewline.currentTags");if(null===this.state.currentTags)return d("this.state.currentTags");let t=this.CalculateNewlineOutputStateChange(this._stateSnapshotAtLastNewline.currentText,this.state.currentText,this._stateSnapshotAtLastNewline.currentTags.length,this.state.currentTags.length);if(t==X.OutputStateChange.ExtendedBeyondNewline)return this.RestoreStateSnapshot(),!0;t==X.OutputStateChange.NewlineRemoved&&this.DiscardSnapshot()}this.state.outputStreamEndsInNewline&&(this.canContinue?null==this._stateSnapshotAtLastNewline&&this.StateSnapshot():this.DiscardSnapshot())}return null!=this._profiler&&this._profiler.PostSnapshot(),!1}CalculateNewlineOutputStateChange(t,e,n,i){if(null===t)return d("prevText");if(null===e)return d("currText");let r=e.length>=t.length&&"\n"==e.charAt(t.length-1);if(n==i&&t.length==e.length&&r)return X.OutputStateChange.NoChange;if(!r)return X.OutputStateChange.NewlineRemoved;if(i>n)return X.OutputStateChange.ExtendedBeyondNewline;for(let n=t.length;n<e.length;n++){let t=e.charAt(n);if(" "!=t&&"\t"!=t)return X.OutputStateChange.ExtendedBeyondNewline}return X.OutputStateChange.NoChange}ContinueMaximally(){this.IfAsyncWeCant("ContinueMaximally");let t=new m;for(;this.canContinue;)t.Append(this.Continue());return t.toString()}ContentAtPath(t){return this.mainContentContainer.ContentAtPath(t)}KnotContainerWithName(t){let e=this.mainContentContainer.namedContent.get(t);return e instanceof N?e:null}PointerAtPath(t){if(0==t.length)return I.Null;let e=new I,n=t.length,i=null;return null===t.lastComponent?d("path.lastComponent"):(t.lastComponent.isIndex?(n=t.length-1,i=this.mainContentContainer.ContentAtPath(t,void 0,n),e.container=i.container,e.index=t.lastComponent.index):(i=this.mainContentContainer.ContentAtPath(t),e.container=i.container,e.index=-1),null==i.obj||i.obj==this.mainContentContainer&&n>0?this.Error("Failed to find content at path '"+t+"', and no approximation of it was possible."):i.approximate&&this.Warning("Failed to find content at path '"+t+"', so it was approximated to: '"+i.obj.path+"'."),e)}StateSnapshot(){this._stateSnapshotAtLastNewline=this._state,this._state=this._state.CopyAndStartPatching()}RestoreStateSnapshot(){null===this._stateSnapshotAtLastNewline&&d("_stateSnapshotAtLastNewline"),this._stateSnapshotAtLastNewline.RestoreAfterPatch(),this._state=this._stateSnapshotAtLastNewline,this._stateSnapshotAtLastNewline=null,this._asyncSaving||this._state.ApplyAnyPatch()}DiscardSnapshot(){this._asyncSaving||this._state.ApplyAnyPatch(),this._stateSnapshotAtLastNewline=null}CopyStateForBackgroundThreadSave(){if(this.IfAsyncWeCant("start saving on a background thread"),this._asyncSaving)throw new Error("Story is already in background saving mode, can't call CopyStateForBackgroundThreadSave again!");let t=this._state;return this._state=this._state.CopyAndStartPatching(),this._asyncSaving=!0,t}BackgroundSaveComplete(){null===this._stateSnapshotAtLastNewline&&this._state.ApplyAnyPatch(),this._asyncSaving=!1}Step(){let t=!0,e=this.state.currentPointer.copy();if(e.isNull)return;let n=a(e.Resolve(),N);for(;n&&(this.VisitContainer(n,!0),0!=n.content.length);)e=I.StartOf(n),n=a(e.Resolve(),N);this.state.currentPointer=e.copy(),null!=this._profiler&&this._profiler.Step(this.state.callStack);let i=e.Resolve(),r=this.PerformLogicAndFlowControl(i);if(this.state.currentPointer.isNull)return;r&&(t=!1);let s=a(i,W);if(s){let e=this.ProcessChoice(s);e&&this.state.generatedChoices.push(e),i=null,t=!1}if(i instanceof N&&(t=!1),t){let t=a(i,w);if(t&&-1==t.contextIndex){let e=this.state.callStack.ContextForVariableNamed(t.variableName);i=new w(t.variableName,e)}this.state.inExpressionEvaluation?this.state.PushEvaluationStack(i):this.state.PushToOutputStream(i)}this.NextContent();let l=a(i,A);l&&l.commandType==A.CommandType.StartThread&&this.state.callStack.PushThread()}VisitContainer(t,e){t.countingAtStartOnly&&!e||(t.visitsShouldBeCounted&&this.state.IncrementVisitCountForContainer(t),t.turnIndexShouldBeCounted&&this.state.RecordTurnIndexVisitToContainer(t))}VisitChangedContainersDueToDivert(){let t=this.state.previousPointer.copy(),e=this.state.currentPointer.copy();if(e.isNull||-1==e.index)return;if(this._prevContainers.length=0,!t.isNull){let e=a(t.Resolve(),N)||a(t.container,N);for(;e;)this._prevContainers.push(e),e=a(e.parent,N)}let n=e.Resolve();if(null==n)return;let i=a(n.parent,N);for(;i&&(this._prevContainers.indexOf(i)<0||i.countingAtStartOnly);){let t=i.content.length>0&&n==i.content[0];this.VisitContainer(i,t),n=i,i=a(i.parent,N)}}ProcessChoice(t){let e=!0;if(t.hasCondition){let t=this.state.PopEvaluationStack();this.IsTruthy(t)||(e=!1)}let n="",i="";if(t.hasChoiceOnlyContent){i=s(this.state.PopEvaluationStack(),T).value||""}if(t.hasStartContent){n=s(this.state.PopEvaluationStack(),T).value||""}if(t.onceOnly){this.state.VisitCountForContainer(t.choiceTarget)>0&&(e=!1)}if(!e)return null;let r=new D;return r.targetPath=t.pathOnChoice,r.sourcePath=t.path.toString(),r.isInvisibleDefault=t.isInvisibleDefault,r.threadAtGeneration=this.state.callStack.ForkThread(),r.text=(n+i).replace(/^[ \t]+|[ \t]+$/g,""),r}IsTruthy(t){if(t instanceof v){let e=t;if(e instanceof P){let t=e;return this.Error("Shouldn't use a divert target (to "+t.targetPath+") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)"),!1}return e.isTruthy}return!1}PerformLogicAndFlowControl(t){if(null==t)return!1;if(t instanceof k){let e=t;if(e.isConditional){let t=this.state.PopEvaluationStack();if(!this.IsTruthy(t))return!0}if(e.hasVariableTarget){let t=e.variableDivertName,n=this.state.variablesState.GetVariableWithName(t);if(null==n)this.Error("Tried to divert using a target from a variable that could not be found ("+t+")");else if(!(n instanceof P)){let e=a(n,b),i="Tried to divert to a target from a variable, but the variable ("+t+") didn't contain a divert target, it ";e instanceof b&&0==e.value?i+="was empty/null (the value 0).":i+="contained '"+n+"'.",this.Error(i)}let i=s(n,P);this.state.divertedPointer=this.PointerAtPath(i.targetPath)}else{if(e.isExternal)return this.CallExternalFunction(e.targetPathString,e.externalArgs),!0;this.state.divertedPointer=e.targetPointer.copy()}return e.pushesToStack&&this.state.callStack.Push(e.stackPushType,void 0,this.state.outputStream.length),this.state.divertedPointer.isNull&&!e.isExternal&&(e&&e.debugMetadata&&null!=e.debugMetadata.sourceName?this.Error("Divert target doesn't exist: "+e.debugMetadata.sourceName):this.Error("Divert resolution failed: "+e)),!0}if(t instanceof A){let e=t;switch(e.commandType){case A.CommandType.EvalStart:this.Assert(!1===this.state.inExpressionEvaluation,"Already in expression evaluation?"),this.state.inExpressionEvaluation=!0;break;case A.CommandType.EvalEnd:this.Assert(!0===this.state.inExpressionEvaluation,"Not in expression evaluation mode"),this.state.inExpressionEvaluation=!1;break;case A.CommandType.EvalOutput:if(this.state.evaluationStack.length>0){let t=this.state.PopEvaluationStack();if(!(t instanceof L)){let e=new T(t.toString());this.state.PushToOutputStream(e)}}break;case A.CommandType.NoOp:break;case A.CommandType.Duplicate:this.state.PushEvaluationStack(this.state.PeekEvaluationStack());break;case A.CommandType.PopEvaluatedValue:this.state.PopEvaluationStack();break;case A.CommandType.PopFunction:case A.CommandType.PopTunnel:let t=e.commandType==A.CommandType.PopFunction?r.Function:r.Tunnel,n=null;if(t==r.Tunnel){let t=this.state.PopEvaluationStack();n=a(t,P),null===n&&this.Assert(t instanceof L,"Expected void if ->-> doesn't override target")}if(this.state.TryExitFunctionEvaluationFromGame())break;if(this.state.callStack.currentElement.type==t&&this.state.callStack.canPop)this.state.PopCallStack(),n&&(this.state.divertedPointer=this.PointerAtPath(n.targetPath));else{let e=new Map;e.set(r.Function,"function return statement (~ return)"),e.set(r.Tunnel,"tunnel onwards statement (->->)");let n=e.get(this.state.callStack.currentElement.type);this.state.callStack.canPop||(n="end of flow (-> END or choice)");let i="Found "+e.get(t)+", when expected "+n;this.Error(i)}break;case A.CommandType.BeginString:this.state.PushToOutputStream(e),this.Assert(!0===this.state.inExpressionEvaluation,"Expected to be in an expression when evaluating a string"),this.state.inExpressionEvaluation=!1;break;case A.CommandType.EndString:let i=[],l=0;for(let t=this.state.outputStream.length-1;t>=0;--t){let e=this.state.outputStream[t];l++;let n=a(e,A);if(n&&n.commandType==A.CommandType.BeginString)break;e instanceof T&&i.push(e)}this.state.PopFromOutputStream(l),i=i.reverse();let o=new m;for(let t of i)o.Append(t.toString());this.state.inExpressionEvaluation=!0,this.state.PushEvaluationStack(new T(o.toString()));break;case A.CommandType.ChoiceCount:let u=this.state.generatedChoices.length;this.state.PushEvaluationStack(new b(u));break;case A.CommandType.Turns:this.state.PushEvaluationStack(new b(this.state.currentTurnIndex+1));break;case A.CommandType.TurnsSince:case A.CommandType.ReadCount:let h=this.state.PopEvaluationStack();if(!(h instanceof P)){let t="";h instanceof b&&(t=". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?"),this.Error("TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw "+h+t);break}let c,p=s(h,P),y=a(this.ContentAtPath(p.targetPath).correctObj,N);null!=y?c=e.commandType==A.CommandType.TurnsSince?this.state.TurnsSinceForContainer(y):this.state.VisitCountForContainer(y):(c=e.commandType==A.CommandType.TurnsSince?-1:0,this.Warning("Failed to find container for "+e.toString()+" lookup at "+p.targetPath.toString())),this.state.PushEvaluationStack(new b(c));break;case A.CommandType.Random:{let t=a(this.state.PopEvaluationStack(),b),e=a(this.state.PopEvaluationStack(),b);if(null==e||e instanceof b==!1)return this.Error("Invalid value for minimum parameter of RANDOM(min, max)");if(null==t||e instanceof b==!1)return this.Error("Invalid value for maximum parameter of RANDOM(min, max)");if(null===t.value)return d("maxInt.value");if(null===e.value)return d("minInt.value");let n=t.value-e.value+1;n<=0&&this.Error("RANDOM was called with minimum as "+e.value+" and maximum as "+t.value+". The maximum must be larger");let i=this.state.storySeed+this.state.previousRandom,r=new K(i).next(),s=r%n+e.value;this.state.PushEvaluationStack(new b(s)),this.state.previousRandom=r;break}case A.CommandType.SeedRandom:let C=a(this.state.PopEvaluationStack(),b);if(null==C||C instanceof b==!1)return this.Error("Invalid value passed to SEED_RANDOM");if(null===C.value)return d("minInt.value");this.state.storySeed=C.value,this.state.previousRandom=0,this.state.PushEvaluationStack(new L);break;case A.CommandType.VisitIndex:let _=this.state.VisitCountForContainer(this.state.currentPointer.container)-1;this.state.PushEvaluationStack(new b(_));break;case A.CommandType.SequenceShuffleIndex:let w=this.NextSequenceShuffleIndex();this.state.PushEvaluationStack(new b(w));break;case A.CommandType.StartThread:break;case A.CommandType.Done:this.state.callStack.canPopThread?this.state.callStack.PopThread():(this.state.didSafeExit=!0,this.state.currentPointer=I.Null);break;case A.CommandType.End:this.state.ForceEnd();break;case A.CommandType.ListFromInt:let E=a(this.state.PopEvaluationStack(),b),x=s(this.state.PopEvaluationStack(),T);if(null===E)throw new S("Passed non-integer when creating a list element from a numerical value.");let k=null;if(null===this.listDefinitions)return d("this.listDefinitions");let W=this.listDefinitions.TryListGetDefinition(x.value,null);if(!W.exists)throw new S("Failed to find LIST called "+x.value);{if(null===E.value)return d("minInt.value");let t=W.result.TryGetItemWithValue(E.value,f.Null);t.exists&&(k=new O(t.result,E.value))}null==k&&(k=new O),this.state.PushEvaluationStack(k);break;case A.CommandType.ListRange:let F=a(this.state.PopEvaluationStack(),v),V=a(this.state.PopEvaluationStack(),v),R=a(this.state.PopEvaluationStack(),O);if(null===R||null===V||null===F)throw new S("Expected list, minimum and maximum for LIST_RANGE");if(null===R.value)return d("targetList.value");let j=R.value.ListWithSubRange(V.valueObject,F.valueObject);this.state.PushEvaluationStack(new O(j));break;case A.CommandType.ListRandom:{let t=this.state.PopEvaluationStack();if(null===t)throw new S("Expected list for LIST_RANDOM");let e=t.value,n=null;if(null===e)throw d("list");if(0==e.Count)n=new g;else{let t=this.state.storySeed+this.state.previousRandom,i=new K(t).next(),r=i%e.Count,a=e.entries();for(let t=0;t<=r-1;t++)a.next();let s=a.next().value,l={Key:f.fromSerializedKey(s[0]),Value:s[1]};if(null===l.Key.originName)return d("randomItem.Key.originName");n=new g(l.Key.originName,this),n.Add(l.Key,l.Value),this.state.previousRandom=i}this.state.PushEvaluationStack(new O(n));break}default:this.Error("unhandled ControlCommand: "+e)}return!0}if(t instanceof V){let e=t,n=this.state.PopEvaluationStack();return this.state.variablesState.Assign(e,n),!0}if(t instanceof F){let e=t,n=null;if(null!=e.pathForCount){let t=e.containerForCount,i=this.state.VisitCountForContainer(t);n=new b(i)}else n=this.state.variablesState.GetVariableWithName(e.name),null==n&&(this.Warning("Variable not found: '"+e.name+"'. Using default value of 0 (false). This can happen with temporary variables if the declaration hasn't yet been hit. Globals are always given a default value on load if a value doesn't exist in the save state."),n=new b(0));return this.state.PushEvaluationStack(n),!0}if(t instanceof R){let e=t,n=this.state.PopEvaluationStack(e.numberOfParameters),i=e.Call(n);return this.state.PushEvaluationStack(i),!0}return!1}ChoosePathString(t,n=!0,i=[]){if(this.IfAsyncWeCant("call ChoosePathString right now"),n)this.ResetCallstack();else if(this.state.callStack.currentElement.type==r.Function){let e="",n=this.state.callStack.currentElement.currentPointer.container;throw null!=n&&(e="("+n.path.toString()+") "),new Error("Story was running a function "+e+"when you called ChoosePathString("+t+") - this is almost certainly not not what you want! Full stack trace: \n"+this.state.callStack.callStackTrace)}this.state.PassArgumentsToEvaluationStack(i),this.ChoosePath(new e(t))}IfAsyncWeCant(t){if(this._asyncContinueActive)throw new Error("Can't "+t+". Story is in the middle of a ContinueAsync(). Make more ContinueAsync() calls or a single Continue() call beforehand.")}ChoosePath(t,e=!0){this.state.SetChosenPath(t,e),this.VisitChangedContainersDueToDivert()}ChooseChoiceIndex(t){t=t;let e=this.currentChoices;this.Assert(t>=0&&t<e.length,"choice out of range");let n=e[t];return null===n.threadAtGeneration?d("choiceToChoose.threadAtGeneration"):null===n.targetPath?d("choiceToChoose.targetPath"):(this.state.callStack.currentThread=n.threadAtGeneration,void this.ChoosePath(n.targetPath))}HasFunction(t){try{return null!=this.KnotContainerWithName(t)}catch(t){return!1}}EvaluateFunction(t,e=[],n=!1){if(this.IfAsyncWeCant("evaluate a function"),null==t)throw new Error("Function is null");if(""==t||""==t.trim())throw new Error("Function is empty or white space.");let i=this.KnotContainerWithName(t);if(null==i)throw new Error("Function doesn't exist: '"+t+"'");let r=[];r.push.apply(r,this.state.outputStream),this._state.ResetOutput(),this.state.StartFunctionEvaluationFromGame(i,e);let a=new m;for(;this.canContinue;)a.Append(this.Continue());let s=a.toString();this._state.ResetOutput(r);let l=this.state.CompleteFunctionEvaluationFromGame();return n?{returned:l,output:s}:l}EvaluateExpression(t){let e=this.state.callStack.elements.length;this.state.callStack.Push(r.Tunnel),this._temporaryEvaluationContainer=t,this.state.GoToStart();let n=this.state.evaluationStack.length;return this.Continue(),this._temporaryEvaluationContainer=null,this.state.callStack.elements.length>e&&this.state.PopCallStack(),this.state.evaluationStack.length>n?this.state.PopEvaluationStack():null}CallExternalFunction(t,e){if(null===t)return d("funcName");let n=this._externals.get(t),i=null;if(!(void 0!==n)){if(this.allowExternalFunctionFallbacks)return i=this.KnotContainerWithName(t),this.Assert(null!==i,"Trying to call EXTERNAL function '"+t+"' which has not been bound, and fallback ink function could not be found."),this.state.callStack.Push(r.Function,void 0,this.state.outputStream.length),void(this.state.divertedPointer=I.StartOf(i));this.Assert(!1,"Trying to call EXTERNAL function '"+t+"' which has not been bound (and ink fallbacks disabled).")}let a=[];for(let t=0;t<e;++t){let t=s(this.state.PopEvaluationStack(),v).valueObject;a.push(t)}a.reverse();let l=n(a),o=null;null!=l?(o=v.Create(l),this.Assert(null!==o,"Could not create ink value from returned object of type "+typeof l)):o=new L,this.state.PushEvaluationStack(o)}BindExternalFunctionGeneral(t,e){this.IfAsyncWeCant("bind an external function"),this.Assert(!this._externals.has(t),"Function '"+t+"' has already been bound."),this._externals.set(t,e)}TryCoerce(t){return t}BindExternalFunction(t,e){this.Assert(null!=e,"Can't bind a null function"),this.BindExternalFunctionGeneral(t,t=>{this.Assert(t.length>=e.length,"External function expected "+e.length+" arguments");let n=[];for(let e=0,i=t.length;e<i;e++)n[e]=this.TryCoerce(t[e]);return e.apply(null,n)})}UnbindExternalFunction(t){this.IfAsyncWeCant("unbind an external a function"),this.Assert(this._externals.has(t),"Function '"+t+"' has not been bound."),this._externals.delete(t)}ValidateExternalBindings(){let t=null,e=null,n=arguments[1]||new Set;if(arguments[0]instanceof N&&(t=arguments[0]),arguments[0]instanceof p&&(e=arguments[0]),null===t&&null===e)if(this.ValidateExternalBindings(this._mainContentContainer,n),this._hasValidatedExternals=!0,0==n.size)this._hasValidatedExternals=!0;else{let t="Error: Missing function binding for external";t+=n.size>1?"s":"",t+=": '",t+=Array.from(n).join("', '"),t+="' ",t+=this.allowExternalFunctionFallbacks?", and no fallback ink function found.":" (ink fallbacks disabled)",this.Error(t)}else if(null!=t){for(let e of t.content){let t=e;null!=t&&t.hasValidName||this.ValidateExternalBindings(e,n)}for(let[,e]of t.namedContent)this.ValidateExternalBindings(a(e,p),n)}else if(null!=e){let t=a(e,k);if(t&&t.isExternal){let e=t.targetPathString;if(null===e)return d("name");if(!this._externals.has(e))if(this.allowExternalFunctionFallbacks){this.mainContentContainer.namedContent.has(e)||n.add(e)}else n.add(e)}}}ObserveVariable(t,e){if(this.IfAsyncWeCant("observe a new variable"),null===this._variableObservers&&(this._variableObservers=new Map),!this.state.variablesState.GlobalVariableExistsWithName(t))throw new S("Cannot observe variable '"+t+"' because it wasn't declared in the ink story.");this._variableObservers.has(t)?this._variableObservers.get(t).push(e):this._variableObservers.set(t,[e])}ObserveVariables(t,e){for(let n=0,i=t.length;n<i;n++)this.ObserveVariable(t[n],e[n])}RemoveVariableObserver(t,e){if(this.IfAsyncWeCant("remove a variable observer"),null!==this._variableObservers)if(void 0!==e){if(this._variableObservers.has(e)){let n=this._variableObservers.get(e);null!==t?n.splice(n.indexOf(t),1):this._variableObservers.delete(e)}}else if(null!==t){let e=this._variableObservers.keys();for(let n of e){let e=this._variableObservers.get(n);e.splice(e.indexOf(t),1)}}}VariableStateDidChangeEvent(t,e){if(null===this._variableObservers)return;let n=this._variableObservers.get(t);if(void 0!==n){if(!(e instanceof v))throw new Error("Tried to get the value of a variable that isn't a standard type");let i=s(e,v);for(let e of n)e(t,i.valueObject)}}get globalTags(){return this.TagsAtStartOfFlowContainerWithPathString("")}TagsForContentAtPath(t){return this.TagsAtStartOfFlowContainerWithPathString(t)}TagsAtStartOfFlowContainerWithPathString(t){let n=new e(t),i=this.ContentAtPath(n).container;if(null===i)return d("flowContainer");for(;;){let t=i.content[0];if(!(t instanceof N))break;i=t}let r=null;for(let t of i.content){let e=a(t,j);if(!e)break;null==r&&(r=[]),r.push(e.text)}return r}BuildStringOfHierarchy(){let t=new m;return this.mainContentContainer.BuildStringOfHierarchy(t,0,this.state.currentPointer.Resolve()),t.toString()}BuildStringOfContainer(t){let e=new m;return t.BuildStringOfHierarchy(e,0,this.state.currentPointer.Resolve()),e.toString()}NextContent(){if(this.state.previousPointer=this.state.currentPointer.copy(),!this.state.divertedPointer.isNull&&(this.state.currentPointer=this.state.divertedPointer.copy(),this.state.divertedPointer=I.Null,this.VisitChangedContainersDueToDivert(),!this.state.currentPointer.isNull))return;if(!this.IncrementContentPointer()){let t=!1;this.state.callStack.CanPop(r.Function)?(this.state.PopCallStack(r.Function),this.state.inExpressionEvaluation&&this.state.PushEvaluationStack(new L),t=!0):this.state.callStack.canPopThread?(this.state.callStack.PopThread(),t=!0):this.state.TryExitFunctionEvaluationFromGame(),t&&!this.state.currentPointer.isNull&&this.NextContent()}}IncrementContentPointer(){let t=!0,e=this.state.callStack.currentElement.currentPointer.copy();if(e.index++,null===e.container)return d("pointer.container");for(;e.index>=e.container.content.length;){t=!1;let n=a(e.container.parent,N);if(n instanceof N==!1)break;let i=n.content.indexOf(e.container);if(-1==i)break;if(e=new I(n,i),e.index++,t=!0,null===e.container)return d("pointer.container")}return t||(e=I.Null),this.state.callStack.currentElement.currentPointer=e.copy(),t}TryFollowDefaultInvisibleChoice(){let t=this._state.currentChoices,e=t.filter(t=>t.isInvisibleDefault);if(0==e.length||t.length>e.length)return!1;let n=e[0];return null===n.targetPath?d("choice.targetPath"):null===n.threadAtGeneration?d("choice.threadAtGeneration"):(this.state.callStack.currentThread=n.threadAtGeneration,this.ChoosePath(n.targetPath,!1),!0)}NextSequenceShuffleIndex(){let t=a(this.state.PopEvaluationStack(),b);if(!(t instanceof b))return this.Error("expected number of elements in sequence for shuffle index"),0;let e=this.state.currentPointer.container;if(null===e)return d("seqContainer");if(null===t.value)return d("numElementsIntVal.value");let n=t.value,i=s(this.state.PopEvaluationStack(),b).value;if(null===i)return d("seqCount");let r=i/n,l=i%n,o=e.path.toString(),u=0;for(let t=0,e=o.length;t<e;t++)u+=o.charCodeAt(t)||0;let h=u+r+this.state.storySeed,c=new K(Math.floor(h)),p=[];for(let t=0;t<n;++t)p.push(t);for(let t=0;t<=l;++t){let e=c.next()%p.length,n=p[e];if(p.splice(e,1),t==l)return n}throw new Error("Should never reach here")}Error(t,e=!1){let n=new S(t);throw n.useEndLineNumber=e,n}Warning(t){this.AddError(t,!0)}AddError(t,e=!1,n=!1){let i=this.currentDebugMetadata,r=e?"WARNING":"ERROR";if(null!=i){let e=n?i.endLineNumber:i.startLineNumber;t="RUNTIME "+r+": '"+i.fileName+"' line "+e+": "+t}else t=this.state.currentPointer.isNull?"RUNTIME "+r+": "+t:"RUNTIME "+r+": ("+this.state.currentPointer+"): "+t;this.state.AddError(t,e),e||this.state.ForceEnd()}Assert(t,e=null){if(0==t)throw null==e&&(e="Story assert"),new Error(e+" "+this.currentDebugMetadata)}get currentDebugMetadata(){let t,e=this.state.currentPointer;if(!e.isNull&&null!==e.Resolve()&&(t=e.Resolve().debugMetadata,null!==t))return t;for(let n=this.state.callStack.elements.length-1;n>=0;--n)if(e=this.state.callStack.elements[n].currentPointer,!e.isNull&&null!==e.Resolve()&&(t=e.Resolve().debugMetadata,null!==t))return t;for(let e=this.state.outputStream.length-1;e>=0;--e){if(t=this.state.outputStream[e].debugMetadata,null!==t)return t}return null}get mainContentContainer(){return this._temporaryEvaluationContainer?this._temporaryEvaluationContainer:this._mainContentContainer}}X.inkVersionCurrent=19,function(t){let e;!function(t){t[t.NoChange=0]="NoChange",t[t.ExtendedBeyondNewline=1]="ExtendedBeyondNewline",t[t.NewlineRemoved=2]="NewlineRemoved"}(e=t.OutputStateChange||(t.OutputStateChange={}))}(X||(X={})),t.InkList=g,t.Story=X,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=ink-es2015.js.map


/***/ }),

/***/ "./node_modules/inkjs/engine/CallStack.js":
/*!************************************************!*\
  !*** ./node_modules/inkjs/engine/CallStack.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CallStack = void 0;
const PushPop_1 = __webpack_require__(/*! ./PushPop */ "./node_modules/inkjs/engine/PushPop.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const Story_1 = __webpack_require__(/*! ./Story */ "./node_modules/inkjs/engine/Story.js");
const StoryException_1 = __webpack_require__(/*! ./StoryException */ "./node_modules/inkjs/engine/StoryException.js");
const JsonSerialisation_1 = __webpack_require__(/*! ./JsonSerialisation */ "./node_modules/inkjs/engine/JsonSerialisation.js");
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const StringBuilder_1 = __webpack_require__(/*! ./StringBuilder */ "./node_modules/inkjs/engine/StringBuilder.js");
const Pointer_1 = __webpack_require__(/*! ./Pointer */ "./node_modules/inkjs/engine/Pointer.js");
const Debug_1 = __webpack_require__(/*! ./Debug */ "./node_modules/inkjs/engine/Debug.js");
const TryGetResult_1 = __webpack_require__(/*! ./TryGetResult */ "./node_modules/inkjs/engine/TryGetResult.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class CallStack {
    constructor() {
        this._threadCounter = 0;
        this._startOfRoot = Pointer_1.Pointer.Null;
        if (arguments[0] instanceof Story_1.Story) {
            let storyContext = arguments[0];
            this._startOfRoot = Pointer_1.Pointer.StartOf(storyContext.rootContentContainer);
            this.Reset();
        }
        else {
            let toCopy = arguments[0];
            this._threads = [];
            for (let otherThread of toCopy._threads) {
                this._threads.push(otherThread.Copy());
            }
            this._threadCounter = toCopy._threadCounter;
            this._startOfRoot = toCopy._startOfRoot;
        }
    }
    get elements() {
        return this.callStack;
    }
    get depth() {
        return this.elements.length;
    }
    get currentElement() {
        let thread = this._threads[this._threads.length - 1];
        let cs = thread.callstack;
        return cs[cs.length - 1];
    }
    get currentElementIndex() {
        return this.callStack.length - 1;
    }
    get currentThread() {
        return this._threads[this._threads.length - 1];
    }
    set currentThread(value) {
        Debug_1.Debug.Assert(this._threads.length == 1, "Shouldn't be directly setting the current thread when we have a stack of them");
        this._threads.length = 0;
        this._threads.push(value);
    }
    get canPop() {
        return this.callStack.length > 1;
    }
    Reset() {
        this._threads = [];
        this._threads.push(new CallStack.Thread());
        this._threads[0].callstack.push(new CallStack.Element(PushPop_1.PushPopType.Tunnel, this._startOfRoot));
    }
    SetJsonToken(jObject, storyContext) {
        this._threads.length = 0;
        // TODO: (List<object>) jObject ["threads"];
        let jThreads = jObject["threads"];
        for (let jThreadTok of jThreads) {
            // TODO: var jThreadObj = (Dictionary<string, object>)jThreadTok;
            let jThreadObj = jThreadTok;
            let thread = new CallStack.Thread(jThreadObj, storyContext);
            this._threads.push(thread);
        }
        // TODO: (int)jObject ["threadCounter"];
        this._threadCounter = parseInt(jObject["threadCounter"]);
        this._startOfRoot = Pointer_1.Pointer.StartOf(storyContext.rootContentContainer);
    }
    WriteJson(w) {
        w.WriteObject((writer) => {
            writer.WritePropertyStart("threads");
            writer.WriteArrayStart();
            for (let thread of this._threads) {
                thread.WriteJson(writer);
            }
            writer.WriteArrayEnd();
            writer.WritePropertyEnd();
            writer.WritePropertyStart("threadCounter");
            writer.WriteInt(this._threadCounter);
            writer.WritePropertyEnd();
        });
    }
    PushThread() {
        let newThread = this.currentThread.Copy();
        this._threadCounter++;
        newThread.threadIndex = this._threadCounter;
        this._threads.push(newThread);
    }
    ForkThread() {
        let forkedThread = this.currentThread.Copy();
        this._threadCounter++;
        forkedThread.threadIndex = this._threadCounter;
        return forkedThread;
    }
    PopThread() {
        if (this.canPopThread) {
            this._threads.splice(this._threads.indexOf(this.currentThread), 1); // should be equivalent to a pop()
        }
        else {
            throw new Error("Can't pop thread");
        }
    }
    get canPopThread() {
        return this._threads.length > 1 && !this.elementIsEvaluateFromGame;
    }
    get elementIsEvaluateFromGame() {
        return this.currentElement.type == PushPop_1.PushPopType.FunctionEvaluationFromGame;
    }
    Push(type, externalEvaluationStackHeight = 0, outputStreamLengthWithPushed = 0) {
        let element = new CallStack.Element(type, this.currentElement.currentPointer, false);
        element.evaluationStackHeightWhenPushed = externalEvaluationStackHeight;
        element.functionStartInOutputStream = outputStreamLengthWithPushed;
        this.callStack.push(element);
    }
    CanPop(type = null) {
        if (!this.canPop)
            return false;
        if (type == null)
            return true;
        return this.currentElement.type == type;
    }
    Pop(type = null) {
        if (this.CanPop(type)) {
            this.callStack.pop();
            return;
        }
        else {
            throw new Error("Mismatched push/pop in Callstack");
        }
    }
    GetTemporaryVariableWithName(name, contextIndex = -1) {
        if (contextIndex == -1)
            contextIndex = this.currentElementIndex + 1;
        let contextElement = this.callStack[contextIndex - 1];
        let varValue = TryGetResult_1.tryGetValueFromMap(contextElement.temporaryVariables, name, null);
        if (varValue.exists) {
            return varValue.result;
        }
        else {
            return null;
        }
    }
    SetTemporaryVariable(name, value, declareNew, contextIndex = -1) {
        if (contextIndex == -1)
            contextIndex = this.currentElementIndex + 1;
        let contextElement = this.callStack[contextIndex - 1];
        if (!declareNew && !contextElement.temporaryVariables.get(name)) {
            throw new StoryException_1.StoryException("Could not find temporary variable to set: " + name);
        }
        let oldValue = TryGetResult_1.tryGetValueFromMap(contextElement.temporaryVariables, name, null);
        if (oldValue.exists)
            Value_1.ListValue.RetainListOriginsForAssignment(oldValue.result, value);
        contextElement.temporaryVariables.set(name, value);
    }
    ContextForVariableNamed(name) {
        if (this.currentElement.temporaryVariables.get(name)) {
            return this.currentElementIndex + 1;
        }
        else {
            return 0;
        }
    }
    ThreadWithIndex(index) {
        let filtered = this._threads.filter((t) => {
            if (t.threadIndex == index)
                return t;
        });
        return filtered.length > 0 ? filtered[0] : null;
    }
    get callStack() {
        return this.currentThread.callstack;
    }
    get callStackTrace() {
        let sb = new StringBuilder_1.StringBuilder();
        for (let t = 0; t < this._threads.length; t++) {
            let thread = this._threads[t];
            let isCurrent = t == this._threads.length - 1;
            sb.AppendFormat("=== THREAD {0}/{1} {2}===\n", t + 1, this._threads.length, isCurrent ? "(current) " : "");
            for (let i = 0; i < thread.callstack.length; i++) {
                if (thread.callstack[i].type == PushPop_1.PushPopType.Function)
                    sb.Append("  [FUNCTION] ");
                else
                    sb.Append("  [TUNNEL] ");
                let pointer = thread.callstack[i].currentPointer;
                if (!pointer.isNull) {
                    sb.Append("<SOMEWHERE IN ");
                    if (pointer.container === null) {
                        return NullException_1.throwNullException("pointer.container");
                    }
                    sb.Append(pointer.container.path.toString());
                    sb.AppendLine(">");
                }
            }
        }
        return sb.toString();
    }
}
exports.CallStack = CallStack;
(function (CallStack) {
    class Element {
        constructor(type, pointer, inExpressionEvaluation = false) {
            this.evaluationStackHeightWhenPushed = 0;
            this.functionStartInOutputStream = 0;
            this.currentPointer = pointer.copy();
            this.inExpressionEvaluation = inExpressionEvaluation;
            this.temporaryVariables = new Map();
            this.type = type;
        }
        Copy() {
            let copy = new Element(this.type, this.currentPointer, this.inExpressionEvaluation);
            copy.temporaryVariables = new Map(this.temporaryVariables);
            copy.evaluationStackHeightWhenPushed = this.evaluationStackHeightWhenPushed;
            copy.functionStartInOutputStream = this.functionStartInOutputStream;
            return copy;
        }
    }
    CallStack.Element = Element;
    class Thread {
        constructor() {
            this.threadIndex = 0;
            this.previousPointer = Pointer_1.Pointer.Null;
            this.callstack = [];
            if (arguments[0] && arguments[1]) {
                let jThreadObj = arguments[0];
                let storyContext = arguments[1];
                // TODO: (int) jThreadObj['threadIndex'] can raise;
                this.threadIndex = parseInt(jThreadObj["threadIndex"]);
                let jThreadCallstack = jThreadObj["callstack"];
                for (let jElTok of jThreadCallstack) {
                    let jElementObj = jElTok;
                    // TODO: (int) jElementObj['type'] can raise;
                    let pushPopType = parseInt(jElementObj["type"]);
                    let pointer = Pointer_1.Pointer.Null;
                    let currentContainerPathStr;
                    // TODO: jElementObj.TryGetValue ("cPath", out currentContainerPathStrToken);
                    let currentContainerPathStrToken = jElementObj["cPath"];
                    if (typeof currentContainerPathStrToken !== "undefined") {
                        currentContainerPathStr = currentContainerPathStrToken.toString();
                        let threadPointerResult = storyContext.ContentAtPath(new Path_1.Path(currentContainerPathStr));
                        pointer.container = threadPointerResult.container;
                        pointer.index = parseInt(jElementObj["idx"]);
                        if (threadPointerResult.obj == null)
                            throw new Error("When loading state, internal story location couldn't be found: " +
                                currentContainerPathStr +
                                ". Has the story changed since this save data was created?");
                        else if (threadPointerResult.approximate) {
                            if (pointer.container === null) {
                                return NullException_1.throwNullException("pointer.container");
                            }
                            storyContext.Warning("When loading state, exact internal story location couldn't be found: '" +
                                currentContainerPathStr +
                                "', so it was approximated to '" +
                                pointer.container.path.toString() +
                                "' to recover. Has the story changed since this save data was created?");
                        }
                    }
                    let inExpressionEvaluation = !!jElementObj["exp"];
                    let el = new Element(pushPopType, pointer, inExpressionEvaluation);
                    let temps = jElementObj["temp"];
                    if (typeof temps !== "undefined") {
                        el.temporaryVariables = JsonSerialisation_1.JsonSerialisation.JObjectToDictionaryRuntimeObjs(temps);
                    }
                    else {
                        el.temporaryVariables.clear();
                    }
                    this.callstack.push(el);
                }
                let prevContentObjPath = jThreadObj["previousContentObject"];
                if (typeof prevContentObjPath !== "undefined") {
                    let prevPath = new Path_1.Path(prevContentObjPath.toString());
                    this.previousPointer = storyContext.PointerAtPath(prevPath);
                }
            }
        }
        Copy() {
            let copy = new Thread();
            copy.threadIndex = this.threadIndex;
            for (let e of this.callstack) {
                copy.callstack.push(e.Copy());
            }
            copy.previousPointer = this.previousPointer.copy();
            return copy;
        }
        WriteJson(writer) {
            writer.WriteObjectStart();
            writer.WritePropertyStart("callstack");
            writer.WriteArrayStart();
            for (let el of this.callstack) {
                writer.WriteObjectStart();
                if (!el.currentPointer.isNull) {
                    if (el.currentPointer.container === null) {
                        return NullException_1.throwNullException("el.currentPointer.container");
                    }
                    writer.WriteProperty("cPath", el.currentPointer.container.path.componentsString);
                    writer.WriteIntProperty("idx", el.currentPointer.index);
                }
                writer.WriteProperty("exp", el.inExpressionEvaluation);
                writer.WriteIntProperty("type", el.type);
                if (el.temporaryVariables.size > 0) {
                    writer.WritePropertyStart("temp");
                    JsonSerialisation_1.JsonSerialisation.WriteDictionaryRuntimeObjs(writer, el.temporaryVariables);
                    writer.WritePropertyEnd();
                }
                writer.WriteObjectEnd();
            }
            writer.WriteArrayEnd();
            writer.WritePropertyEnd();
            writer.WriteIntProperty("threadIndex", this.threadIndex);
            if (!this.previousPointer.isNull) {
                let resolvedPointer = this.previousPointer.Resolve();
                if (resolvedPointer === null) {
                    return NullException_1.throwNullException("this.previousPointer.Resolve()");
                }
                writer.WriteProperty("previousContentObject", resolvedPointer.path.toString());
            }
            writer.WriteObjectEnd();
        }
    }
    CallStack.Thread = Thread;
})(CallStack = exports.CallStack || (exports.CallStack = {}));
//# sourceMappingURL=CallStack.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Choice.js":
/*!*********************************************!*\
  !*** ./node_modules/inkjs/engine/Choice.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Choice = void 0;
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
class Choice extends Object_1.InkObject {
    constructor() {
        super(...arguments);
        this.text = "";
        this.index = 0;
        this.threadAtGeneration = null;
        this.sourcePath = "";
        this.targetPath = null;
        this.isInvisibleDefault = false;
        this.originalThreadIndex = 0;
    }
    get pathStringOnChoice() {
        if (this.targetPath === null)
            return NullException_1.throwNullException("Choice.targetPath");
        return this.targetPath.toString();
    }
    set pathStringOnChoice(value) {
        this.targetPath = new Path_1.Path(value);
    }
}
exports.Choice = Choice;
//# sourceMappingURL=Choice.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/ChoicePoint.js":
/*!**************************************************!*\
  !*** ./node_modules/inkjs/engine/ChoicePoint.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoicePoint = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class ChoicePoint extends Object_1.InkObject {
    constructor(onceOnly = true) {
        super();
        this._pathOnChoice = null;
        this.hasCondition = false;
        this.hasStartContent = false;
        this.hasChoiceOnlyContent = false;
        this.isInvisibleDefault = false;
        this.onceOnly = true;
        this.onceOnly = onceOnly;
    }
    get pathOnChoice() {
        if (this._pathOnChoice != null && this._pathOnChoice.isRelative) {
            let choiceTargetObj = this.choiceTarget;
            if (choiceTargetObj) {
                this._pathOnChoice = choiceTargetObj.path;
            }
        }
        return this._pathOnChoice;
    }
    set pathOnChoice(value) {
        this._pathOnChoice = value;
    }
    get choiceTarget() {
        if (this._pathOnChoice === null)
            return NullException_1.throwNullException("ChoicePoint._pathOnChoice");
        return this.ResolvePath(this._pathOnChoice).container;
    }
    get pathStringOnChoice() {
        if (this.pathOnChoice === null)
            return NullException_1.throwNullException("ChoicePoint.pathOnChoice");
        return this.CompactPathString(this.pathOnChoice);
    }
    set pathStringOnChoice(value) {
        this.pathOnChoice = new Path_1.Path(value);
    }
    get flags() {
        let flags = 0;
        if (this.hasCondition)
            flags |= 1;
        if (this.hasStartContent)
            flags |= 2;
        if (this.hasChoiceOnlyContent)
            flags |= 4;
        if (this.isInvisibleDefault)
            flags |= 8;
        if (this.onceOnly)
            flags |= 16;
        return flags;
    }
    set flags(value) {
        this.hasCondition = (value & 1) > 0;
        this.hasStartContent = (value & 2) > 0;
        this.hasChoiceOnlyContent = (value & 4) > 0;
        this.isInvisibleDefault = (value & 8) > 0;
        this.onceOnly = (value & 16) > 0;
    }
    toString() {
        if (this.pathOnChoice === null)
            return NullException_1.throwNullException("ChoicePoint.pathOnChoice");
        // int? targetLineNum = DebugLineNumberOfPath (pathOnChoice);
        let targetLineNum = null;
        let targetString = this.pathOnChoice.toString();
        if (targetLineNum != null) {
            targetString = " line " + targetLineNum + "(" + targetString + ")";
        }
        return "Choice: -> " + targetString;
    }
}
exports.ChoicePoint = ChoicePoint;
//# sourceMappingURL=ChoicePoint.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Container.js":
/*!************************************************!*\
  !*** ./node_modules/inkjs/engine/Container.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
const StringBuilder_1 = __webpack_require__(/*! ./StringBuilder */ "./node_modules/inkjs/engine/StringBuilder.js");
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const SearchResult_1 = __webpack_require__(/*! ./SearchResult */ "./node_modules/inkjs/engine/SearchResult.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const Debug_1 = __webpack_require__(/*! ./Debug */ "./node_modules/inkjs/engine/Debug.js");
const TryGetResult_1 = __webpack_require__(/*! ./TryGetResult */ "./node_modules/inkjs/engine/TryGetResult.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
class Container extends Object_1.InkObject {
    constructor() {
        super(...arguments);
        this.name = "";
        this._content = [];
        this.namedContent = new Map();
        this.visitsShouldBeCounted = false;
        this.turnIndexShouldBeCounted = false;
        this.countingAtStartOnly = false;
        this._pathToFirstLeafContent = null;
    }
    get hasValidName() {
        return this.name != null && this.name.length > 0;
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this.AddContent(value);
    }
    get namedOnlyContent() {
        let namedOnlyContentDict = new Map();
        for (let [key, value] of this.namedContent) {
            let inkObject = TypeAssertion_1.asOrThrows(value, Object_1.InkObject);
            namedOnlyContentDict.set(key, inkObject);
        }
        for (let c of this.content) {
            let named = TypeAssertion_1.asINamedContentOrNull(c);
            if (named != null && named.hasValidName) {
                namedOnlyContentDict.delete(named.name);
            }
        }
        if (namedOnlyContentDict.size == 0)
            namedOnlyContentDict = null;
        return namedOnlyContentDict;
    }
    set namedOnlyContent(value) {
        let existingNamedOnly = this.namedOnlyContent;
        if (existingNamedOnly != null) {
            for (let [key] of existingNamedOnly) {
                this.namedContent.delete(key);
            }
        }
        if (value == null)
            return;
        for (let [, val] of value) {
            let named = TypeAssertion_1.asINamedContentOrNull(val);
            if (named != null)
                this.AddToNamedContentOnly(named);
        }
    }
    get countFlags() {
        let flags = 0;
        if (this.visitsShouldBeCounted)
            flags |= Container.CountFlags.Visits;
        if (this.turnIndexShouldBeCounted)
            flags |= Container.CountFlags.Turns;
        if (this.countingAtStartOnly)
            flags |= Container.CountFlags.CountStartOnly;
        if (flags == Container.CountFlags.CountStartOnly) {
            flags = 0;
        }
        return flags;
    }
    set countFlags(value) {
        let flag = value;
        if ((flag & Container.CountFlags.Visits) > 0)
            this.visitsShouldBeCounted = true;
        if ((flag & Container.CountFlags.Turns) > 0)
            this.turnIndexShouldBeCounted = true;
        if ((flag & Container.CountFlags.CountStartOnly) > 0)
            this.countingAtStartOnly = true;
    }
    get pathToFirstLeafContent() {
        if (this._pathToFirstLeafContent == null)
            this._pathToFirstLeafContent = this.path.PathByAppendingPath(this.internalPathToFirstLeafContent);
        return this._pathToFirstLeafContent;
    }
    get internalPathToFirstLeafContent() {
        let components = [];
        let container = this;
        while (container instanceof Container) {
            if (container.content.length > 0) {
                components.push(new Path_1.Path.Component(0));
                container = container.content[0];
            }
        }
        return new Path_1.Path(components);
    }
    AddContent(contentObjOrList) {
        if (contentObjOrList instanceof Array) {
            let contentList = contentObjOrList;
            for (let c of contentList) {
                this.AddContent(c);
            }
        }
        else {
            let contentObj = contentObjOrList;
            this._content.push(contentObj);
            if (contentObj.parent) {
                throw new Error("content is already in " + contentObj.parent);
            }
            contentObj.parent = this;
            this.TryAddNamedContent(contentObj);
        }
    }
    TryAddNamedContent(contentObj) {
        let namedContentObj = TypeAssertion_1.asINamedContentOrNull(contentObj);
        if (namedContentObj != null && namedContentObj.hasValidName) {
            this.AddToNamedContentOnly(namedContentObj);
        }
    }
    AddToNamedContentOnly(namedContentObj) {
        Debug_1.Debug.AssertType(namedContentObj, Object_1.InkObject, "Can only add Runtime.Objects to a Runtime.Container");
        let runtimeObj = TypeAssertion_1.asOrThrows(namedContentObj, Object_1.InkObject);
        runtimeObj.parent = this;
        this.namedContent.set(namedContentObj.name, namedContentObj);
    }
    ContentAtPath(path, partialPathStart = 0, partialPathLength = -1) {
        if (partialPathLength == -1)
            partialPathLength = path.length;
        let result = new SearchResult_1.SearchResult();
        result.approximate = false;
        let currentContainer = this;
        let currentObj = this;
        for (let i = partialPathStart; i < partialPathLength; ++i) {
            let comp = path.GetComponent(i);
            if (currentContainer == null) {
                result.approximate = true;
                break;
            }
            let foundObj = currentContainer.ContentWithPathComponent(comp);
            if (foundObj == null) {
                result.approximate = true;
                break;
            }
            currentObj = foundObj;
            currentContainer = TypeAssertion_1.asOrNull(foundObj, Container);
        }
        result.obj = currentObj;
        return result;
    }
    InsertContent(contentObj, index) {
        this.content[index] = contentObj;
        if (contentObj.parent) {
            throw new Error("content is already in " + contentObj.parent);
        }
        contentObj.parent = this;
        this.TryAddNamedContent(contentObj);
    }
    AddContentsOfContainer(otherContainer) {
        this.content = this.content.concat(otherContainer.content);
        for (let obj of otherContainer.content) {
            obj.parent = this;
            this.TryAddNamedContent(obj);
        }
    }
    ContentWithPathComponent(component) {
        if (component.isIndex) {
            if (component.index >= 0 && component.index < this.content.length) {
                return this.content[component.index];
            }
            else {
                return null;
            }
        }
        else if (component.isParent) {
            return this.parent;
        }
        else {
            if (component.name === null) {
                return NullException_1.throwNullException("component.name");
            }
            let foundContent = TryGetResult_1.tryGetValueFromMap(this.namedContent, component.name, null);
            if (foundContent.exists) {
                return TypeAssertion_1.asOrThrows(foundContent.result, Object_1.InkObject);
            }
            else {
                return null;
            }
        }
    }
    BuildStringOfHierarchy() {
        let sb;
        if (arguments.length == 0) {
            sb = new StringBuilder_1.StringBuilder();
            this.BuildStringOfHierarchy(sb, 0, null);
            return sb.toString();
        }
        sb = arguments[0];
        let indentation = arguments[1];
        let pointedObj = arguments[2];
        function appendIndentation() {
            const spacesPerIndent = 4; // Truly const in the original code
            for (let i = 0; i < spacesPerIndent * indentation; ++i) {
                sb.Append(" ");
            }
        }
        appendIndentation();
        sb.Append("[");
        if (this.hasValidName) {
            sb.AppendFormat(" ({0})", this.name);
        }
        if (this == pointedObj) {
            sb.Append("  <---");
        }
        sb.AppendLine();
        indentation++;
        for (let i = 0; i < this.content.length; ++i) {
            let obj = this.content[i];
            if (obj instanceof Container) {
                let container = obj;
                container.BuildStringOfHierarchy(sb, indentation, pointedObj);
            }
            else {
                appendIndentation();
                if (obj instanceof Value_1.StringValue) {
                    sb.Append('"');
                    sb.Append(obj.toString().replace("\n", "\\n"));
                    sb.Append('"');
                }
                else {
                    sb.Append(obj.toString());
                }
            }
            if (i != this.content.length - 1) {
                sb.Append(",");
            }
            if (!(obj instanceof Container) && obj == pointedObj) {
                sb.Append("  <---");
            }
            sb.AppendLine();
        }
        let onlyNamed = new Map();
        for (let [key, value] of this.namedContent) {
            if (this.content.indexOf(TypeAssertion_1.asOrThrows(value, Object_1.InkObject)) >= 0) {
                continue;
            }
            else {
                onlyNamed.set(key, value);
            }
        }
        if (onlyNamed.size > 0) {
            appendIndentation();
            sb.AppendLine("-- named: --");
            for (let [, value] of onlyNamed) {
                Debug_1.Debug.AssertType(value, Container, "Can only print out named Containers");
                let container = value;
                container.BuildStringOfHierarchy(sb, indentation, pointedObj);
                sb.AppendLine();
            }
        }
        indentation--;
        appendIndentation();
        sb.Append("]");
    }
}
exports.Container = Container;
(function (Container) {
    let CountFlags;
    (function (CountFlags) {
        CountFlags[CountFlags["Visits"] = 1] = "Visits";
        CountFlags[CountFlags["Turns"] = 2] = "Turns";
        CountFlags[CountFlags["CountStartOnly"] = 4] = "CountStartOnly";
    })(CountFlags = Container.CountFlags || (Container.CountFlags = {}));
})(Container = exports.Container || (exports.Container = {}));
//# sourceMappingURL=Container.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/ControlCommand.js":
/*!*****************************************************!*\
  !*** ./node_modules/inkjs/engine/ControlCommand.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlCommand = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
class ControlCommand extends Object_1.InkObject {
    constructor(commandType = ControlCommand.CommandType.NotSet) {
        super();
        this._commandType = commandType;
    }
    get commandType() {
        return this._commandType;
    }
    Copy() {
        return new ControlCommand(this.commandType);
    }
    static EvalStart() {
        return new ControlCommand(ControlCommand.CommandType.EvalStart);
    }
    static EvalOutput() {
        return new ControlCommand(ControlCommand.CommandType.EvalOutput);
    }
    static EvalEnd() {
        return new ControlCommand(ControlCommand.CommandType.EvalEnd);
    }
    static Duplicate() {
        return new ControlCommand(ControlCommand.CommandType.Duplicate);
    }
    static PopEvaluatedValue() {
        return new ControlCommand(ControlCommand.CommandType.PopEvaluatedValue);
    }
    static PopFunction() {
        return new ControlCommand(ControlCommand.CommandType.PopFunction);
    }
    static PopTunnel() {
        return new ControlCommand(ControlCommand.CommandType.PopTunnel);
    }
    static BeginString() {
        return new ControlCommand(ControlCommand.CommandType.BeginString);
    }
    static EndString() {
        return new ControlCommand(ControlCommand.CommandType.EndString);
    }
    static NoOp() {
        return new ControlCommand(ControlCommand.CommandType.NoOp);
    }
    static ChoiceCount() {
        return new ControlCommand(ControlCommand.CommandType.ChoiceCount);
    }
    static Turns() {
        return new ControlCommand(ControlCommand.CommandType.Turns);
    }
    static TurnsSince() {
        return new ControlCommand(ControlCommand.CommandType.TurnsSince);
    }
    static ReadCount() {
        return new ControlCommand(ControlCommand.CommandType.ReadCount);
    }
    static Random() {
        return new ControlCommand(ControlCommand.CommandType.Random);
    }
    static SeedRandom() {
        return new ControlCommand(ControlCommand.CommandType.SeedRandom);
    }
    static VisitIndex() {
        return new ControlCommand(ControlCommand.CommandType.VisitIndex);
    }
    static SequenceShuffleIndex() {
        return new ControlCommand(ControlCommand.CommandType.SequenceShuffleIndex);
    }
    static StartThread() {
        return new ControlCommand(ControlCommand.CommandType.StartThread);
    }
    static Done() {
        return new ControlCommand(ControlCommand.CommandType.Done);
    }
    static End() {
        return new ControlCommand(ControlCommand.CommandType.End);
    }
    static ListFromInt() {
        return new ControlCommand(ControlCommand.CommandType.ListFromInt);
    }
    static ListRange() {
        return new ControlCommand(ControlCommand.CommandType.ListRange);
    }
    static ListRandom() {
        return new ControlCommand(ControlCommand.CommandType.ListRandom);
    }
    toString() {
        return this.commandType.toString();
    }
}
exports.ControlCommand = ControlCommand;
(function (ControlCommand) {
    let CommandType;
    (function (CommandType) {
        CommandType[CommandType["NotSet"] = -1] = "NotSet";
        CommandType[CommandType["EvalStart"] = 0] = "EvalStart";
        CommandType[CommandType["EvalOutput"] = 1] = "EvalOutput";
        CommandType[CommandType["EvalEnd"] = 2] = "EvalEnd";
        CommandType[CommandType["Duplicate"] = 3] = "Duplicate";
        CommandType[CommandType["PopEvaluatedValue"] = 4] = "PopEvaluatedValue";
        CommandType[CommandType["PopFunction"] = 5] = "PopFunction";
        CommandType[CommandType["PopTunnel"] = 6] = "PopTunnel";
        CommandType[CommandType["BeginString"] = 7] = "BeginString";
        CommandType[CommandType["EndString"] = 8] = "EndString";
        CommandType[CommandType["NoOp"] = 9] = "NoOp";
        CommandType[CommandType["ChoiceCount"] = 10] = "ChoiceCount";
        CommandType[CommandType["Turns"] = 11] = "Turns";
        CommandType[CommandType["TurnsSince"] = 12] = "TurnsSince";
        CommandType[CommandType["Random"] = 13] = "Random";
        CommandType[CommandType["SeedRandom"] = 14] = "SeedRandom";
        CommandType[CommandType["VisitIndex"] = 15] = "VisitIndex";
        CommandType[CommandType["SequenceShuffleIndex"] = 16] = "SequenceShuffleIndex";
        CommandType[CommandType["StartThread"] = 17] = "StartThread";
        CommandType[CommandType["Done"] = 18] = "Done";
        CommandType[CommandType["End"] = 19] = "End";
        CommandType[CommandType["ListFromInt"] = 20] = "ListFromInt";
        CommandType[CommandType["ListRange"] = 21] = "ListRange";
        CommandType[CommandType["ListRandom"] = 22] = "ListRandom";
        CommandType[CommandType["ReadCount"] = 23] = "ReadCount";
        CommandType[CommandType["TOTAL_VALUES"] = 24] = "TOTAL_VALUES";
    })(CommandType = ControlCommand.CommandType || (ControlCommand.CommandType = {}));
})(ControlCommand = exports.ControlCommand || (exports.ControlCommand = {}));
//# sourceMappingURL=ControlCommand.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Debug.js":
/*!********************************************!*\
  !*** ./node_modules/inkjs/engine/Debug.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
var Debug;
(function (Debug) {
    function AssertType(variable, type, message) {
        Assert(variable instanceof type, message);
    }
    Debug.AssertType = AssertType;
    function Assert(condition, message) {
        if (!condition) {
            if (typeof message !== "undefined") {
                console.warn(message);
            }
            if (console.trace) {
                console.trace();
            }
            throw new Error("");
        }
    }
    Debug.Assert = Assert;
})(Debug = exports.Debug || (exports.Debug = {}));
//# sourceMappingURL=Debug.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Divert.js":
/*!*********************************************!*\
  !*** ./node_modules/inkjs/engine/Divert.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Divert = void 0;
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const PushPop_1 = __webpack_require__(/*! ./PushPop */ "./node_modules/inkjs/engine/PushPop.js");
const StringBuilder_1 = __webpack_require__(/*! ./StringBuilder */ "./node_modules/inkjs/engine/StringBuilder.js");
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const Pointer_1 = __webpack_require__(/*! ./Pointer */ "./node_modules/inkjs/engine/Pointer.js");
const Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/inkjs/engine/Container.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class Divert extends Object_1.InkObject {
    constructor(stackPushType) {
        super();
        this._targetPath = null;
        this._targetPointer = Pointer_1.Pointer.Null;
        this.variableDivertName = null;
        this.pushesToStack = false;
        this.stackPushType = 0;
        this.isExternal = false;
        this.externalArgs = 0;
        this.isConditional = false;
        this.pushesToStack = false;
        if (typeof stackPushType !== "undefined") {
            this.pushesToStack = true;
            this.stackPushType = stackPushType;
        }
    }
    get targetPath() {
        if (this._targetPath != null && this._targetPath.isRelative) {
            let targetObj = this.targetPointer.Resolve();
            if (targetObj) {
                this._targetPath = targetObj.path;
            }
        }
        return this._targetPath;
    }
    set targetPath(value) {
        this._targetPath = value;
        this._targetPointer = Pointer_1.Pointer.Null;
    }
    get targetPointer() {
        if (this._targetPointer.isNull) {
            let targetObj = this.ResolvePath(this._targetPath).obj;
            if (this._targetPath === null)
                return NullException_1.throwNullException("this._targetPath");
            if (this._targetPath.lastComponent === null)
                return NullException_1.throwNullException("this._targetPath.lastComponent");
            if (this._targetPath.lastComponent.isIndex) {
                if (targetObj === null)
                    return NullException_1.throwNullException("targetObj");
                this._targetPointer.container =
                    targetObj.parent instanceof Container_1.Container ? targetObj.parent : null;
                this._targetPointer.index = this._targetPath.lastComponent.index;
            }
            else {
                this._targetPointer = Pointer_1.Pointer.StartOf(targetObj instanceof Container_1.Container ? targetObj : null);
            }
        }
        return this._targetPointer.copy();
    }
    get targetPathString() {
        if (this.targetPath == null)
            return null;
        return this.CompactPathString(this.targetPath);
    }
    set targetPathString(value) {
        if (value == null) {
            this.targetPath = null;
        }
        else {
            this.targetPath = new Path_1.Path(value);
        }
    }
    get hasVariableTarget() {
        return this.variableDivertName != null;
    }
    Equals(obj) {
        let otherDivert = obj;
        if (otherDivert instanceof Divert) {
            if (this.hasVariableTarget == otherDivert.hasVariableTarget) {
                if (this.hasVariableTarget) {
                    return this.variableDivertName == otherDivert.variableDivertName;
                }
                else {
                    if (this.targetPath === null)
                        return NullException_1.throwNullException("this.targetPath");
                    return this.targetPath.Equals(otherDivert.targetPath);
                }
            }
        }
        return false;
    }
    toString() {
        if (this.hasVariableTarget) {
            return "Divert(variable: " + this.variableDivertName + ")";
        }
        else if (this.targetPath == null) {
            return "Divert(null)";
        }
        else {
            let sb = new StringBuilder_1.StringBuilder();
            let targetStr = this.targetPath.toString();
            // int? targetLineNum = DebugLineNumberOfPath (targetPath);
            let targetLineNum = null;
            if (targetLineNum != null) {
                targetStr = "line " + targetLineNum;
            }
            sb.Append("Divert");
            if (this.isConditional)
                sb.Append("?");
            if (this.pushesToStack) {
                if (this.stackPushType == PushPop_1.PushPopType.Function) {
                    sb.Append(" function");
                }
                else {
                    sb.Append(" tunnel");
                }
            }
            sb.Append(" -> ");
            sb.Append(this.targetPathString);
            sb.Append(" (");
            sb.Append(targetStr);
            sb.Append(")");
            return sb.toString();
        }
    }
}
exports.Divert = Divert;
//# sourceMappingURL=Divert.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Glue.js":
/*!*******************************************!*\
  !*** ./node_modules/inkjs/engine/Glue.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Glue = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
class Glue extends Object_1.InkObject {
    toString() {
        return "Glue";
    }
}
exports.Glue = Glue;
//# sourceMappingURL=Glue.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/InkList.js":
/*!**********************************************!*\
  !*** ./node_modules/inkjs/engine/InkList.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InkList = exports.InkListItem = void 0;
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
const StringBuilder_1 = __webpack_require__(/*! ./StringBuilder */ "./node_modules/inkjs/engine/StringBuilder.js");
class InkListItem {
    constructor() {
        // InkListItem is a struct
        this.originName = null;
        this.itemName = null;
        if (typeof arguments[1] !== "undefined") {
            let originName = arguments[0];
            let itemName = arguments[1];
            this.originName = originName;
            this.itemName = itemName;
        }
        else if (arguments[0]) {
            let fullName = arguments[0];
            let nameParts = fullName.toString().split(".");
            this.originName = nameParts[0];
            this.itemName = nameParts[1];
        }
    }
    static get Null() {
        return new InkListItem(null, null);
    }
    get isNull() {
        return this.originName == null && this.itemName == null;
    }
    get fullName() {
        return ((this.originName !== null ? this.originName : "?") + "." + this.itemName);
    }
    toString() {
        return this.fullName;
    }
    Equals(obj) {
        if (obj instanceof InkListItem) {
            let otherItem = obj;
            return (otherItem.itemName == this.itemName &&
                otherItem.originName == this.originName);
        }
        return false;
    }
    // These methods did not exist in the original C# code. Their purpose is to
    // make `InkListItem` mimics the value-type semantics of the original
    // struct. Please refer to the end of this file, for a more in-depth
    // explanation.
    /**
     * Returns a shallow clone of the current instance.
     */
    copy() {
        return new InkListItem(this.originName, this.itemName);
    }
    /**
     * Returns a `SerializedInkListItem` representing the current
     * instance. The result is intended to be used as a key inside a Map.
     */
    serialized() {
        // We are simply using a JSON representation as a value-typed key.
        return JSON.stringify({
            originName: this.originName,
            itemName: this.itemName,
        });
    }
    /**
     * Reconstructs a `InkListItem` from the given SerializedInkListItem.
     */
    static fromSerializedKey(key) {
        let obj = JSON.parse(key);
        if (!InkListItem.isLikeInkListItem(obj))
            return InkListItem.Null;
        let inkListItem = obj;
        return new InkListItem(inkListItem.originName, inkListItem.itemName);
    }
    /**
     * Determines whether the given item is sufficiently `InkListItem`-like
     * to be used as a template when reconstructing the InkListItem.
     */
    static isLikeInkListItem(item) {
        if (typeof item !== "object")
            return false;
        if (!item.hasOwnProperty("originName") || !item.hasOwnProperty("itemName"))
            return false;
        if (typeof item.originName !== "string" && typeof item.originName !== null)
            return false;
        if (typeof item.itemName !== "string" && typeof item.itemName !== null)
            return false;
        return true;
    }
}
exports.InkListItem = InkListItem;
class InkList extends Map {
    constructor() {
        // Trying to be smart here, this emulates the constructor inheritance found
        // in the original code, but only if otherList is an InkList. IIFE FTW.
        super((() => {
            if (arguments[0] instanceof InkList) {
                return arguments[0];
            }
            else {
                return [];
            }
        })());
        this.origins = null;
        this._originNames = [];
        if (arguments[0] instanceof InkList) {
            let otherList = arguments[0];
            if (otherList._originNames) {
                this._originNames = otherList._originNames.slice();
            }
        }
        else if (typeof arguments[0] === "string") {
            let singleOriginListName = arguments[0];
            let originStory = arguments[1]; /* as Story */
            this.SetInitialOriginName(singleOriginListName);
            let def = originStory.listDefinitions.TryListGetDefinition(singleOriginListName, null);
            if (def.exists) {
                this.origins = [def.result];
            }
            else {
                throw new Error("InkList origin could not be found in story when constructing new list: " +
                    singleOriginListName);
            }
        }
        else if (typeof arguments[0] === "object" &&
            arguments[0].hasOwnProperty("Key") &&
            arguments[0].hasOwnProperty("Value")) {
            let singleElement = arguments[0];
            this.Add(singleElement.Key, singleElement.Value);
        }
    }
    AddItem(itemOrItemName) {
        if (itemOrItemName instanceof InkListItem) {
            let item = itemOrItemName;
            if (item.originName == null) {
                this.AddItem(item.itemName);
                return;
            }
            if (this.origins === null)
                return NullException_1.throwNullException("this.origins");
            for (let origin of this.origins) {
                if (origin.name == item.originName) {
                    let intVal = origin.TryGetValueForItem(item, 0);
                    if (intVal.exists) {
                        this.Add(item, intVal.result);
                        return;
                    }
                    else {
                        throw new Error("Could not add the item " +
                            item +
                            " to this list because it doesn't exist in the original list definition in ink.");
                    }
                }
            }
            throw new Error("Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found.");
        }
        else {
            let itemName = itemOrItemName;
            let foundListDef = null;
            if (this.origins === null)
                return NullException_1.throwNullException("this.origins");
            for (let origin of this.origins) {
                if (itemName === null)
                    return NullException_1.throwNullException("itemName");
                if (origin.ContainsItemWithName(itemName)) {
                    if (foundListDef != null) {
                        throw new Error("Could not add the item " +
                            itemName +
                            " to this list because it could come from either " +
                            origin.name +
                            " or " +
                            foundListDef.name);
                    }
                    else {
                        foundListDef = origin;
                    }
                }
            }
            if (foundListDef == null)
                throw new Error("Could not add the item " +
                    itemName +
                    " to this list because it isn't known to any list definitions previously associated with this list.");
            let item = new InkListItem(foundListDef.name, itemName);
            let itemVal = foundListDef.ValueForItem(item);
            this.Add(item, itemVal);
        }
    }
    ContainsItemNamed(itemName) {
        for (let [key] of this) {
            let item = InkListItem.fromSerializedKey(key);
            if (item.itemName == itemName)
                return true;
        }
        return false;
    }
    ContainsKey(key) {
        return this.has(key.serialized());
    }
    Add(key, value) {
        let serializedKey = key.serialized();
        if (this.has(serializedKey)) {
            // Throw an exception to match the C# behavior.
            throw new Error(`The Map already contains an entry for ${key}`);
        }
        this.set(serializedKey, value);
    }
    Remove(key) {
        return this.delete(key.serialized());
    }
    get Count() {
        return this.size;
    }
    get originOfMaxItem() {
        if (this.origins == null)
            return null;
        let maxOriginName = this.maxItem.Key.originName;
        let result = null;
        this.origins.every((origin) => {
            if (origin.name == maxOriginName) {
                result = origin;
                return false;
            }
            else
                return true;
        });
        return result;
    }
    get originNames() {
        if (this.Count > 0) {
            if (this._originNames == null && this.Count > 0)
                this._originNames = [];
            else {
                if (!this._originNames)
                    this._originNames = [];
                this._originNames.length = 0;
            }
            for (let [key] of this) {
                let item = InkListItem.fromSerializedKey(key);
                if (item.originName === null)
                    return NullException_1.throwNullException("item.originName");
                this._originNames.push(item.originName);
            }
        }
        return this._originNames;
    }
    SetInitialOriginName(initialOriginName) {
        this._originNames = [initialOriginName];
    }
    SetInitialOriginNames(initialOriginNames) {
        if (initialOriginNames == null)
            this._originNames = null;
        else
            this._originNames = initialOriginNames.slice(); // store a copy
    }
    get maxItem() {
        let max = {
            Key: InkListItem.Null,
            Value: 0,
        };
        for (let [key, value] of this) {
            let item = InkListItem.fromSerializedKey(key);
            if (max.Key.isNull || value > max.Value)
                max = { Key: item, Value: value };
        }
        return max;
    }
    get minItem() {
        let min = {
            Key: InkListItem.Null,
            Value: 0,
        };
        for (let [key, value] of this) {
            let item = InkListItem.fromSerializedKey(key);
            if (min.Key.isNull || value < min.Value) {
                min = { Key: item, Value: value };
            }
        }
        return min;
    }
    get inverse() {
        let list = new InkList();
        if (this.origins != null) {
            for (let origin of this.origins) {
                for (let [key, value] of origin.items) {
                    let item = InkListItem.fromSerializedKey(key);
                    if (!this.ContainsKey(item))
                        list.Add(item, value);
                }
            }
        }
        return list;
    }
    get all() {
        let list = new InkList();
        if (this.origins != null) {
            for (let origin of this.origins) {
                for (let [key, value] of origin.items) {
                    let item = InkListItem.fromSerializedKey(key);
                    list.set(item.serialized(), value);
                }
            }
        }
        return list;
    }
    Union(otherList) {
        let union = new InkList(this);
        for (let [key, value] of otherList) {
            union.set(key, value);
        }
        return union;
    }
    Intersect(otherList) {
        let intersection = new InkList();
        for (let [key, value] of this) {
            if (otherList.has(key))
                intersection.set(key, value);
        }
        return intersection;
    }
    Without(listToRemove) {
        let result = new InkList(this);
        for (let [key] of listToRemove) {
            result.delete(key);
        }
        return result;
    }
    Contains(otherList) {
        for (let [key] of otherList) {
            if (!this.has(key))
                return false;
        }
        return true;
    }
    GreaterThan(otherList) {
        if (this.Count == 0)
            return false;
        if (otherList.Count == 0)
            return true;
        return this.minItem.Value > otherList.maxItem.Value;
    }
    GreaterThanOrEquals(otherList) {
        if (this.Count == 0)
            return false;
        if (otherList.Count == 0)
            return true;
        return (this.minItem.Value >= otherList.minItem.Value &&
            this.maxItem.Value >= otherList.maxItem.Value);
    }
    LessThan(otherList) {
        if (otherList.Count == 0)
            return false;
        if (this.Count == 0)
            return true;
        return this.maxItem.Value < otherList.minItem.Value;
    }
    LessThanOrEquals(otherList) {
        if (otherList.Count == 0)
            return false;
        if (this.Count == 0)
            return true;
        return (this.maxItem.Value <= otherList.maxItem.Value &&
            this.minItem.Value <= otherList.minItem.Value);
    }
    MaxAsList() {
        if (this.Count > 0)
            return new InkList(this.maxItem);
        else
            return new InkList();
    }
    MinAsList() {
        if (this.Count > 0)
            return new InkList(this.minItem);
        else
            return new InkList();
    }
    ListWithSubRange(minBound, maxBound) {
        if (this.Count == 0)
            return new InkList();
        let ordered = this.orderedItems;
        let minValue = 0;
        let maxValue = Number.MAX_SAFE_INTEGER;
        if (Number.isInteger(minBound)) {
            minValue = minBound;
        }
        else {
            if (minBound instanceof InkList && minBound.Count > 0)
                minValue = minBound.minItem.Value;
        }
        if (Number.isInteger(maxBound)) {
            maxValue = maxBound;
        }
        else {
            if (minBound instanceof InkList && minBound.Count > 0)
                maxValue = maxBound.maxItem.Value;
        }
        let subList = new InkList();
        subList.SetInitialOriginNames(this.originNames);
        for (let item of ordered) {
            if (item.Value >= minValue && item.Value <= maxValue) {
                subList.Add(item.Key, item.Value);
            }
        }
        return subList;
    }
    Equals(otherInkList) {
        if (otherInkList instanceof InkList === false)
            return false;
        if (otherInkList.Count != this.Count)
            return false;
        for (let [key] of this) {
            if (!otherInkList.has(key))
                return false;
        }
        return true;
    }
    // GetHashCode not implemented
    get orderedItems() {
        // List<KeyValuePair<InkListItem, int>>
        let ordered = new Array();
        for (let [key, value] of this) {
            let item = InkListItem.fromSerializedKey(key);
            ordered.push({ Key: item, Value: value });
        }
        ordered.sort((x, y) => {
            if (x.Key.originName === null) {
                return NullException_1.throwNullException("x.Key.originName");
            }
            if (y.Key.originName === null) {
                return NullException_1.throwNullException("y.Key.originName");
            }
            if (x.Value == y.Value) {
                return x.Key.originName.localeCompare(y.Key.originName);
            }
            else {
                // TODO: refactor this bit into a numberCompareTo method?
                if (x.Value < y.Value)
                    return -1;
                return x.Value > y.Value ? 1 : 0;
            }
        });
        return ordered;
    }
    toString() {
        let ordered = this.orderedItems;
        let sb = new StringBuilder_1.StringBuilder();
        for (let i = 0; i < ordered.length; i++) {
            if (i > 0)
                sb.Append(", ");
            let item = ordered[i].Key;
            if (item.itemName === null)
                return NullException_1.throwNullException("item.itemName");
            sb.Append(item.itemName);
        }
        return sb.toString();
    }
    // casting a InkList to a Number, for somereason, actually gives a number.
    // This messes up the type detection when creating a Value from a InkList.
    // Returning NaN here prevents that.
    valueOf() {
        return NaN;
    }
}
exports.InkList = InkList;
//# sourceMappingURL=InkList.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/JsonSerialisation.js":
/*!********************************************************!*\
  !*** ./node_modules/inkjs/engine/JsonSerialisation.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSerialisation = void 0;
const Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/inkjs/engine/Container.js");
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const Glue_1 = __webpack_require__(/*! ./Glue */ "./node_modules/inkjs/engine/Glue.js");
const ControlCommand_1 = __webpack_require__(/*! ./ControlCommand */ "./node_modules/inkjs/engine/ControlCommand.js");
const PushPop_1 = __webpack_require__(/*! ./PushPop */ "./node_modules/inkjs/engine/PushPop.js");
const Divert_1 = __webpack_require__(/*! ./Divert */ "./node_modules/inkjs/engine/Divert.js");
const ChoicePoint_1 = __webpack_require__(/*! ./ChoicePoint */ "./node_modules/inkjs/engine/ChoicePoint.js");
const VariableReference_1 = __webpack_require__(/*! ./VariableReference */ "./node_modules/inkjs/engine/VariableReference.js");
const VariableAssignment_1 = __webpack_require__(/*! ./VariableAssignment */ "./node_modules/inkjs/engine/VariableAssignment.js");
const NativeFunctionCall_1 = __webpack_require__(/*! ./NativeFunctionCall */ "./node_modules/inkjs/engine/NativeFunctionCall.js");
const Void_1 = __webpack_require__(/*! ./Void */ "./node_modules/inkjs/engine/Void.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/inkjs/engine/Tag.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const Choice_1 = __webpack_require__(/*! ./Choice */ "./node_modules/inkjs/engine/Choice.js");
const ListDefinition_1 = __webpack_require__(/*! ./ListDefinition */ "./node_modules/inkjs/engine/ListDefinition.js");
const ListDefinitionsOrigin_1 = __webpack_require__(/*! ./ListDefinitionsOrigin */ "./node_modules/inkjs/engine/ListDefinitionsOrigin.js");
const InkList_1 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class JsonSerialisation {
    static JArrayToRuntimeObjList(jArray, skipLast = false) {
        let count = jArray.length;
        if (skipLast)
            count--;
        let list = [];
        for (let i = 0; i < count; i++) {
            let jTok = jArray[i];
            let runtimeObj = this.JTokenToRuntimeObject(jTok);
            if (runtimeObj === null) {
                return NullException_1.throwNullException("runtimeObj");
            }
            list.push(runtimeObj);
        }
        return list;
    }
    static WriteDictionaryRuntimeObjs(writer, dictionary) {
        writer.WriteObjectStart();
        for (let [key, value] of dictionary) {
            writer.WritePropertyStart(key);
            this.WriteRuntimeObject(writer, value);
            writer.WritePropertyEnd();
        }
        writer.WriteObjectEnd();
    }
    static WriteListRuntimeObjs(writer, list) {
        writer.WriteArrayStart();
        for (let value of list) {
            this.WriteRuntimeObject(writer, value);
        }
        writer.WriteArrayEnd();
    }
    static WriteIntDictionary(writer, dict) {
        writer.WriteObjectStart();
        for (let [key, value] of dict) {
            writer.WriteIntProperty(key, value);
        }
        writer.WriteObjectEnd();
    }
    static WriteRuntimeObject(writer, obj) {
        let container = TypeAssertion_1.asOrNull(obj, Container_1.Container);
        if (container) {
            this.WriteRuntimeContainer(writer, container);
            return;
        }
        let divert = TypeAssertion_1.asOrNull(obj, Divert_1.Divert);
        if (divert) {
            let divTypeKey = "->";
            if (divert.isExternal) {
                divTypeKey = "x()";
            }
            else if (divert.pushesToStack) {
                if (divert.stackPushType == PushPop_1.PushPopType.Function) {
                    divTypeKey = "f()";
                }
                else if (divert.stackPushType == PushPop_1.PushPopType.Tunnel) {
                    divTypeKey = "->t->";
                }
            }
            let targetStr;
            if (divert.hasVariableTarget) {
                targetStr = divert.variableDivertName;
            }
            else {
                targetStr = divert.targetPathString;
            }
            writer.WriteObjectStart();
            writer.WriteProperty(divTypeKey, targetStr);
            if (divert.hasVariableTarget) {
                writer.WriteProperty("var", true);
            }
            if (divert.isConditional) {
                writer.WriteProperty("c", true);
            }
            if (divert.externalArgs > 0) {
                writer.WriteIntProperty("exArgs", divert.externalArgs);
            }
            writer.WriteObjectEnd();
            return;
        }
        let choicePoint = TypeAssertion_1.asOrNull(obj, ChoicePoint_1.ChoicePoint);
        if (choicePoint) {
            writer.WriteObjectStart();
            writer.WriteProperty("*", choicePoint.pathStringOnChoice);
            writer.WriteIntProperty("flg", choicePoint.flags);
            writer.WriteObjectEnd();
            return;
        }
        let intVal = TypeAssertion_1.asOrNull(obj, Value_1.IntValue);
        if (intVal) {
            writer.WriteInt(intVal.value);
            return;
        }
        let floatVal = TypeAssertion_1.asOrNull(obj, Value_1.FloatValue);
        if (floatVal) {
            writer.WriteFloat(floatVal.value);
            return;
        }
        let strVal = TypeAssertion_1.asOrNull(obj, Value_1.StringValue);
        if (strVal) {
            if (strVal.isNewline) {
                writer.Write("\n", false);
            }
            else {
                writer.WriteStringStart();
                writer.WriteStringInner("^");
                writer.WriteStringInner(strVal.value);
                writer.WriteStringEnd();
            }
            return;
        }
        let listVal = TypeAssertion_1.asOrNull(obj, Value_1.ListValue);
        if (listVal) {
            this.WriteInkList(writer, listVal);
            return;
        }
        let divTargetVal = TypeAssertion_1.asOrNull(obj, Value_1.DivertTargetValue);
        if (divTargetVal) {
            writer.WriteObjectStart();
            if (divTargetVal.value === null) {
                return NullException_1.throwNullException("divTargetVal.value");
            }
            writer.WriteProperty("^->", divTargetVal.value.componentsString);
            writer.WriteObjectEnd();
            return;
        }
        let varPtrVal = TypeAssertion_1.asOrNull(obj, Value_1.VariablePointerValue);
        if (varPtrVal) {
            writer.WriteObjectStart();
            writer.WriteProperty("^var", varPtrVal.value);
            writer.WriteIntProperty("ci", varPtrVal.contextIndex);
            writer.WriteObjectEnd();
            return;
        }
        let glue = TypeAssertion_1.asOrNull(obj, Glue_1.Glue);
        if (glue) {
            writer.Write("<>");
            return;
        }
        let controlCmd = TypeAssertion_1.asOrNull(obj, ControlCommand_1.ControlCommand);
        if (controlCmd) {
            writer.Write(JsonSerialisation._controlCommandNames[controlCmd.commandType]);
            return;
        }
        let nativeFunc = TypeAssertion_1.asOrNull(obj, NativeFunctionCall_1.NativeFunctionCall);
        if (nativeFunc) {
            let name = nativeFunc.name;
            if (name == "^")
                name = "L^";
            writer.Write(name);
            return;
        }
        let varRef = TypeAssertion_1.asOrNull(obj, VariableReference_1.VariableReference);
        if (varRef) {
            writer.WriteObjectStart();
            let readCountPath = varRef.pathStringForCount;
            if (readCountPath != null) {
                writer.WriteProperty("CNT?", readCountPath);
            }
            else {
                writer.WriteProperty("VAR?", varRef.name);
            }
            writer.WriteObjectEnd();
            return;
        }
        let varAss = TypeAssertion_1.asOrNull(obj, VariableAssignment_1.VariableAssignment);
        if (varAss) {
            writer.WriteObjectStart();
            let key = varAss.isGlobal ? "VAR=" : "temp=";
            writer.WriteProperty(key, varAss.variableName);
            // Reassignment?
            if (!varAss.isNewDeclaration)
                writer.WriteProperty("re", true);
            writer.WriteObjectEnd();
            return;
        }
        let voidObj = TypeAssertion_1.asOrNull(obj, Void_1.Void);
        if (voidObj) {
            writer.Write("void");
            return;
        }
        let tag = TypeAssertion_1.asOrNull(obj, Tag_1.Tag);
        if (tag) {
            writer.WriteObjectStart();
            writer.WriteProperty("#", tag.text);
            writer.WriteObjectEnd();
            return;
        }
        let choice = TypeAssertion_1.asOrNull(obj, Choice_1.Choice);
        if (choice) {
            this.WriteChoice(writer, choice);
            return;
        }
        throw new Error("Failed to convert runtime object to Json token: " + obj);
    }
    static JObjectToDictionaryRuntimeObjs(jObject) {
        let dict = new Map();
        for (let key in jObject) {
            if (jObject.hasOwnProperty(key)) {
                let inkObject = this.JTokenToRuntimeObject(jObject[key]);
                if (inkObject === null) {
                    return NullException_1.throwNullException("inkObject");
                }
                dict.set(key, inkObject);
            }
        }
        return dict;
    }
    static JObjectToIntDictionary(jObject) {
        let dict = new Map();
        for (let key in jObject) {
            if (jObject.hasOwnProperty(key)) {
                dict.set(key, parseInt(jObject[key]));
            }
        }
        return dict;
    }
    static JTokenToRuntimeObject(token) {
        if (typeof token === "number" && !isNaN(token)) {
            return Value_1.Value.Create(token);
        }
        if (typeof token === "string") {
            let str = token.toString();
            // String value
            let firstChar = str[0];
            if (firstChar == "^")
                return new Value_1.StringValue(str.substring(1));
            else if (firstChar == "\n" && str.length == 1)
                return new Value_1.StringValue("\n");
            // Glue
            if (str == "<>")
                return new Glue_1.Glue();
            // Control commands (would looking up in a hash set be faster?)
            for (let i = 0; i < JsonSerialisation._controlCommandNames.length; ++i) {
                let cmdName = JsonSerialisation._controlCommandNames[i];
                if (str == cmdName) {
                    return new ControlCommand_1.ControlCommand(i);
                }
            }
            // Native functions
            if (str == "L^")
                str = "^";
            if (NativeFunctionCall_1.NativeFunctionCall.CallExistsWithName(str))
                return NativeFunctionCall_1.NativeFunctionCall.CallWithName(str);
            // Pop
            if (str == "->->")
                return ControlCommand_1.ControlCommand.PopTunnel();
            else if (str == "~ret")
                return ControlCommand_1.ControlCommand.PopFunction();
            // Void
            if (str == "void")
                return new Void_1.Void();
        }
        if (typeof token === "object" && !Array.isArray(token)) {
            let obj = token;
            let propValue;
            // Divert target value to path
            if (obj["^->"]) {
                propValue = obj["^->"];
                return new Value_1.DivertTargetValue(new Path_1.Path(propValue.toString()));
            }
            // VariablePointerValue
            if (obj["^var"]) {
                propValue = obj["^var"];
                let varPtr = new Value_1.VariablePointerValue(propValue.toString());
                if ("ci" in obj) {
                    propValue = obj["ci"];
                    varPtr.contextIndex = parseInt(propValue);
                }
                return varPtr;
            }
            // Divert
            let isDivert = false;
            let pushesToStack = false;
            let divPushType = PushPop_1.PushPopType.Function;
            let external = false;
            if ((propValue = obj["->"])) {
                isDivert = true;
            }
            else if ((propValue = obj["f()"])) {
                isDivert = true;
                pushesToStack = true;
                divPushType = PushPop_1.PushPopType.Function;
            }
            else if ((propValue = obj["->t->"])) {
                isDivert = true;
                pushesToStack = true;
                divPushType = PushPop_1.PushPopType.Tunnel;
            }
            else if ((propValue = obj["x()"])) {
                isDivert = true;
                external = true;
                pushesToStack = false;
                divPushType = PushPop_1.PushPopType.Function;
            }
            if (isDivert) {
                let divert = new Divert_1.Divert();
                divert.pushesToStack = pushesToStack;
                divert.stackPushType = divPushType;
                divert.isExternal = external;
                let target = propValue.toString();
                if ((propValue = obj["var"]))
                    divert.variableDivertName = target;
                else
                    divert.targetPathString = target;
                divert.isConditional = !!obj["c"];
                if (external) {
                    if ((propValue = obj["exArgs"]))
                        divert.externalArgs = parseInt(propValue);
                }
                return divert;
            }
            // Choice
            if ((propValue = obj["*"])) {
                let choice = new ChoicePoint_1.ChoicePoint();
                choice.pathStringOnChoice = propValue.toString();
                if ((propValue = obj["flg"]))
                    choice.flags = parseInt(propValue);
                return choice;
            }
            // Variable reference
            if ((propValue = obj["VAR?"])) {
                return new VariableReference_1.VariableReference(propValue.toString());
            }
            else if ((propValue = obj["CNT?"])) {
                let readCountVarRef = new VariableReference_1.VariableReference();
                readCountVarRef.pathStringForCount = propValue.toString();
                return readCountVarRef;
            }
            // Variable assignment
            let isVarAss = false;
            let isGlobalVar = false;
            if ((propValue = obj["VAR="])) {
                isVarAss = true;
                isGlobalVar = true;
            }
            else if ((propValue = obj["temp="])) {
                isVarAss = true;
                isGlobalVar = false;
            }
            if (isVarAss) {
                let varName = propValue.toString();
                let isNewDecl = !obj["re"];
                let varAss = new VariableAssignment_1.VariableAssignment(varName, isNewDecl);
                varAss.isGlobal = isGlobalVar;
                return varAss;
            }
            if (obj["#"] !== undefined) {
                propValue = obj["#"];
                return new Tag_1.Tag(propValue.toString());
            }
            // List value
            if ((propValue = obj["list"])) {
                // var listContent = (Dictionary<string, object>)propValue;
                let listContent = propValue;
                let rawList = new InkList_1.InkList();
                if ((propValue = obj["origins"])) {
                    // var namesAsObjs = (List<object>)propValue;
                    let namesAsObjs = propValue;
                    // rawList.SetInitialOriginNames(namesAsObjs.Cast<string>().ToList());
                    rawList.SetInitialOriginNames(namesAsObjs);
                }
                for (let key in listContent) {
                    if (listContent.hasOwnProperty(key)) {
                        let nameToVal = listContent[key];
                        let item = new InkList_1.InkListItem(key);
                        let val = parseInt(nameToVal);
                        rawList.Add(item, val);
                    }
                }
                return new Value_1.ListValue(rawList);
            }
            if (obj["originalChoicePath"] != null)
                return this.JObjectToChoice(obj);
        }
        // Array is always a Runtime.Container
        if (Array.isArray(token)) {
            return this.JArrayToContainer(token);
        }
        if (token === null || token === undefined)
            return null;
        throw new Error("Failed to convert token to runtime object: " + JSON.stringify(token));
    }
    static WriteRuntimeContainer(writer, container, withoutName = false) {
        writer.WriteArrayStart();
        if (container === null) {
            return NullException_1.throwNullException("container");
        }
        for (let c of container.content)
            this.WriteRuntimeObject(writer, c);
        let namedOnlyContent = container.namedOnlyContent;
        let countFlags = container.countFlags;
        let hasNameProperty = container.name != null && !withoutName;
        let hasTerminator = namedOnlyContent != null || countFlags > 0 || hasNameProperty;
        if (hasTerminator) {
            writer.WriteObjectStart();
        }
        if (namedOnlyContent != null) {
            for (let [key, value] of namedOnlyContent) {
                let name = key;
                let namedContainer = TypeAssertion_1.asOrNull(value, Container_1.Container);
                writer.WritePropertyStart(name);
                this.WriteRuntimeContainer(writer, namedContainer, true);
                writer.WritePropertyEnd();
            }
        }
        if (hasNameProperty)
            writer.WriteProperty("#n", container.name);
        if (hasTerminator)
            writer.WriteObjectEnd();
        else
            writer.WriteNull();
        writer.WriteArrayEnd();
    }
    static JArrayToContainer(jArray) {
        let container = new Container_1.Container();
        container.content = this.JArrayToRuntimeObjList(jArray, true);
        let terminatingObj = jArray[jArray.length - 1];
        if (terminatingObj != null) {
            let namedOnlyContent = new Map();
            for (let key in terminatingObj) {
                if (key == "#f") {
                    container.countFlags = parseInt(terminatingObj[key]);
                }
                else if (key == "#n") {
                    container.name = terminatingObj[key].toString();
                }
                else {
                    let namedContentItem = this.JTokenToRuntimeObject(terminatingObj[key]);
                    // var namedSubContainer = namedContentItem as Container;
                    let namedSubContainer = TypeAssertion_1.asOrNull(namedContentItem, Container_1.Container);
                    if (namedSubContainer)
                        namedSubContainer.name = key;
                    namedOnlyContent.set(key, namedContentItem);
                }
            }
            container.namedOnlyContent = namedOnlyContent;
        }
        return container;
    }
    static JObjectToChoice(jObj) {
        let choice = new Choice_1.Choice();
        choice.text = jObj["text"].toString();
        choice.index = parseInt(jObj["index"]);
        choice.sourcePath = jObj["originalChoicePath"].toString();
        choice.originalThreadIndex = parseInt(jObj["originalThreadIndex"]);
        choice.pathStringOnChoice = jObj["targetPath"].toString();
        return choice;
    }
    static WriteChoice(writer, choice) {
        writer.WriteObjectStart();
        writer.WriteProperty("text", choice.text);
        writer.WriteIntProperty("index", choice.index);
        writer.WriteProperty("originalChoicePath", choice.sourcePath);
        writer.WriteIntProperty("originalThreadIndex", choice.originalThreadIndex);
        writer.WriteProperty("targetPath", choice.pathStringOnChoice);
        writer.WriteObjectEnd();
    }
    static WriteInkList(writer, listVal) {
        let rawList = listVal.value;
        if (rawList === null) {
            return NullException_1.throwNullException("rawList");
        }
        writer.WriteObjectStart();
        writer.WritePropertyStart("list");
        writer.WriteObjectStart();
        for (let [key, val] of rawList) {
            let item = InkList_1.InkListItem.fromSerializedKey(key);
            let itemVal = val;
            if (item.itemName === null) {
                return NullException_1.throwNullException("item.itemName");
            }
            writer.WritePropertyNameStart();
            writer.WritePropertyNameInner(item.originName ? item.originName : "?");
            writer.WritePropertyNameInner(".");
            writer.WritePropertyNameInner(item.itemName);
            writer.WritePropertyNameEnd();
            writer.Write(itemVal);
            writer.WritePropertyEnd();
        }
        writer.WriteObjectEnd();
        writer.WritePropertyEnd();
        if (rawList.Count == 0 &&
            rawList.originNames != null &&
            rawList.originNames.length > 0) {
            writer.WritePropertyStart("origins");
            writer.WriteArrayStart();
            for (let name of rawList.originNames)
                writer.Write(name);
            writer.WriteArrayEnd();
            writer.WritePropertyEnd();
        }
        writer.WriteObjectEnd();
    }
    static ListDefinitionsToJToken(origin) {
        let result = {};
        for (let def of origin.lists) {
            let listDefJson = {};
            for (let [key, val] of def.items) {
                let item = InkList_1.InkListItem.fromSerializedKey(key);
                if (item.itemName === null) {
                    return NullException_1.throwNullException("item.itemName");
                }
                listDefJson[item.itemName] = val;
            }
            result[def.name] = listDefJson;
        }
        return result;
    }
    static JTokenToListDefinitions(obj) {
        // var defsObj = (Dictionary<string, object>)obj;
        let defsObj = obj;
        let allDefs = [];
        for (let key in defsObj) {
            if (defsObj.hasOwnProperty(key)) {
                let name = key.toString();
                // var listDefJson = (Dictionary<string, object>)kv.Value;
                let listDefJson = defsObj[key];
                // Cast (string, object) to (string, int) for items
                let items = new Map();
                for (let nameValueKey in listDefJson) {
                    if (defsObj.hasOwnProperty(key)) {
                        let nameValue = listDefJson[nameValueKey];
                        items.set(nameValueKey, parseInt(nameValue));
                    }
                }
                let def = new ListDefinition_1.ListDefinition(name, items);
                allDefs.push(def);
            }
        }
        return new ListDefinitionsOrigin_1.ListDefinitionsOrigin(allDefs);
    }
}
exports.JsonSerialisation = JsonSerialisation;
JsonSerialisation._controlCommandNames = (() => {
    let _controlCommandNames = [];
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.EvalStart] = "ev";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.EvalOutput] = "out";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.EvalEnd] = "/ev";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.Duplicate] = "du";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.PopEvaluatedValue] = "pop";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.PopFunction] = "~ret";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.PopTunnel] = "->->";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.BeginString] = "str";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.EndString] = "/str";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.NoOp] = "nop";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.ChoiceCount] = "choiceCnt";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.Turns] = "turn";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.TurnsSince] = "turns";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.ReadCount] = "readc";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.Random] = "rnd";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.SeedRandom] = "srnd";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.VisitIndex] = "visit";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.SequenceShuffleIndex] =
        "seq";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.StartThread] = "thread";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.Done] = "done";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.End] = "end";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.ListFromInt] = "listInt";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.ListRange] = "range";
    _controlCommandNames[ControlCommand_1.ControlCommand.CommandType.ListRandom] = "lrnd";
    for (let i = 0; i < ControlCommand_1.ControlCommand.CommandType.TOTAL_VALUES; ++i) {
        if (_controlCommandNames[i] == null)
            throw new Error("Control command not accounted for in serialisation");
    }
    return _controlCommandNames;
})();
//# sourceMappingURL=JsonSerialisation.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/ListDefinition.js":
/*!*****************************************************!*\
  !*** ./node_modules/inkjs/engine/ListDefinition.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDefinition = void 0;
const InkList_1 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
class ListDefinition {
    constructor(name, items) {
        this._name = name || "";
        this._items = null;
        this._itemNameToValues = items || new Map();
    }
    get name() {
        return this._name;
    }
    get items() {
        if (this._items == null) {
            this._items = new Map();
            for (let [key, value] of this._itemNameToValues) {
                let item = new InkList_1.InkListItem(this.name, key);
                this._items.set(item.serialized(), value);
            }
        }
        return this._items;
    }
    ValueForItem(item) {
        if (!item.itemName)
            return 0;
        let intVal = this._itemNameToValues.get(item.itemName);
        if (typeof intVal !== "undefined")
            return intVal;
        else
            return 0;
    }
    ContainsItem(item) {
        if (!item.itemName)
            return false;
        if (item.originName != this.name)
            return false;
        return this._itemNameToValues.has(item.itemName);
    }
    ContainsItemWithName(itemName) {
        return this._itemNameToValues.has(itemName);
    }
    TryGetItemWithValue(val, 
    /* out */ item) {
        for (let [key, value] of this._itemNameToValues) {
            if (value == val) {
                item = new InkList_1.InkListItem(this.name, key);
                return { result: item, exists: true };
            }
        }
        item = InkList_1.InkListItem.Null;
        return { result: item, exists: false };
    }
    TryGetValueForItem(item, 
    /* out */ intVal) {
        if (!item.itemName)
            return { result: 0, exists: false };
        let value = this._itemNameToValues.get(item.itemName);
        if (!value)
            return { result: 0, exists: false };
        return { result: value, exists: true };
    }
}
exports.ListDefinition = ListDefinition;
//# sourceMappingURL=ListDefinition.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/ListDefinitionsOrigin.js":
/*!************************************************************!*\
  !*** ./node_modules/inkjs/engine/ListDefinitionsOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDefinitionsOrigin = void 0;
const InkList_1 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class ListDefinitionsOrigin {
    constructor(lists) {
        this._lists = new Map();
        this._allUnambiguousListValueCache = new Map();
        for (let list of lists) {
            this._lists.set(list.name, list);
            for (let [key, val] of list.items) {
                let item = InkList_1.InkListItem.fromSerializedKey(key);
                let listValue = new Value_1.ListValue(item, val);
                if (!item.itemName) {
                    throw new Error("item.itemName is null or undefined.");
                }
                this._allUnambiguousListValueCache.set(item.itemName, listValue);
                this._allUnambiguousListValueCache.set(item.fullName, listValue);
            }
        }
    }
    get lists() {
        let listOfLists = [];
        for (let [, value] of this._lists) {
            listOfLists.push(value);
        }
        return listOfLists;
    }
    TryListGetDefinition(name, 
    /* out */ def) {
        if (name === null) {
            return { result: def, exists: false };
        }
        // initially, this function returns a boolean and the second parameter is an out.
        let definition = this._lists.get(name);
        if (!definition)
            return { result: def, exists: false };
        return { result: definition, exists: true };
    }
    FindSingleItemListWithName(name) {
        if (name === null) {
            return NullException_1.throwNullException("name");
        }
        let val = this._allUnambiguousListValueCache.get(name);
        if (typeof val !== "undefined") {
            return val;
        }
        return null;
    }
}
exports.ListDefinitionsOrigin = ListDefinitionsOrigin;
//# sourceMappingURL=ListDefinitionsOrigin.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/NativeFunctionCall.js":
/*!*********************************************************!*\
  !*** ./node_modules/inkjs/engine/NativeFunctionCall.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeFunctionCall = void 0;
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const StoryException_1 = __webpack_require__(/*! ./StoryException */ "./node_modules/inkjs/engine/StoryException.js");
const Void_1 = __webpack_require__(/*! ./Void */ "./node_modules/inkjs/engine/Void.js");
const InkList_1 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class NativeFunctionCall extends Object_1.InkObject {
    constructor() {
        super();
        this._name = null;
        this._numberOfParameters = 0;
        this._prototype = null;
        this._isPrototype = false;
        this._operationFuncs = null;
        if (arguments.length === 0) {
            NativeFunctionCall.GenerateNativeFunctionsIfNecessary();
        }
        else if (arguments.length === 1) {
            let name = arguments[0];
            NativeFunctionCall.GenerateNativeFunctionsIfNecessary();
            this.name = name;
        }
        else if (arguments.length === 2) {
            let name = arguments[0];
            let numberOfParameters = arguments[1];
            this._isPrototype = true;
            this.name = name;
            this.numberOfParameters = numberOfParameters;
        }
    }
    static CallWithName(functionName) {
        return new NativeFunctionCall(functionName);
    }
    static CallExistsWithName(functionName) {
        this.GenerateNativeFunctionsIfNecessary();
        return this._nativeFunctions.get(functionName);
    }
    get name() {
        if (this._name === null)
            return NullException_1.throwNullException("NativeFunctionCall._name");
        return this._name;
    }
    set name(value) {
        this._name = value;
        if (!this._isPrototype) {
            if (NativeFunctionCall._nativeFunctions === null)
                NullException_1.throwNullException("NativeFunctionCall._nativeFunctions");
            else
                this._prototype =
                    NativeFunctionCall._nativeFunctions.get(this._name) || null;
        }
    }
    get numberOfParameters() {
        if (this._prototype) {
            return this._prototype.numberOfParameters;
        }
        else {
            return this._numberOfParameters;
        }
    }
    set numberOfParameters(value) {
        this._numberOfParameters = value;
    }
    Call(parameters) {
        if (this._prototype) {
            return this._prototype.Call(parameters);
        }
        if (this.numberOfParameters != parameters.length) {
            throw new Error("Unexpected number of parameters");
        }
        let hasList = false;
        for (let p of parameters) {
            if (p instanceof Void_1.Void)
                throw new StoryException_1.StoryException('Attempting to perform operation on a void value. Did you forget to "return" a value from a function you called here?');
            if (p instanceof Value_1.ListValue)
                hasList = true;
        }
        if (parameters.length == 2 && hasList) {
            return this.CallBinaryListOperation(parameters);
        }
        let coercedParams = this.CoerceValuesToSingleType(parameters);
        let coercedType = coercedParams[0].valueType;
        if (coercedType == Value_1.ValueType.Int) {
            return this.CallType(coercedParams);
        }
        else if (coercedType == Value_1.ValueType.Float) {
            return this.CallType(coercedParams);
        }
        else if (coercedType == Value_1.ValueType.String) {
            return this.CallType(coercedParams);
        }
        else if (coercedType == Value_1.ValueType.DivertTarget) {
            return this.CallType(coercedParams);
        }
        else if (coercedType == Value_1.ValueType.List) {
            return this.CallType(coercedParams);
        }
        return null;
    }
    CallType(parametersOfSingleType) {
        let param1 = TypeAssertion_1.asOrThrows(parametersOfSingleType[0], Value_1.Value);
        let valType = param1.valueType;
        let val1 = param1;
        let paramCount = parametersOfSingleType.length;
        if (paramCount == 2 || paramCount == 1) {
            if (this._operationFuncs === null)
                return NullException_1.throwNullException("NativeFunctionCall._operationFuncs");
            let opForTypeObj = this._operationFuncs.get(valType);
            if (!opForTypeObj) {
                const key = Value_1.ValueType[valType];
                throw new StoryException_1.StoryException("Cannot perform operation " + this.name + " on " + key);
            }
            if (paramCount == 2) {
                let param2 = TypeAssertion_1.asOrThrows(parametersOfSingleType[1], Value_1.Value);
                let val2 = param2;
                let opForType = opForTypeObj;
                if (val1.value === null || val2.value === null)
                    return NullException_1.throwNullException("NativeFunctionCall.Call BinaryOp values");
                let resultVal = opForType(val1.value, val2.value);
                return Value_1.Value.Create(resultVal);
            }
            else {
                let opForType = opForTypeObj;
                if (val1.value === null)
                    return NullException_1.throwNullException("NativeFunctionCall.Call UnaryOp value");
                let resultVal = opForType(val1.value);
                // This code is different from upstream. Since JavaScript treats
                // integers and floats as the same numbers, it's impossible
                // to force an number to be either an integer or a float.
                //
                // It can be useful to force a specific number type
                // (especially for divisions), so the result of INT() & FLOAT()
                // is coerced to the the proper value type.
                //
                // Note that we also force all other unary operation to
                // return the same value type, although this is only
                // meaningful for numbers. See `Value.Create`.
                if (this.name === NativeFunctionCall.Int) {
                    return Value_1.Value.Create(resultVal, Value_1.ValueType.Int);
                }
                else if (this.name === NativeFunctionCall.Float) {
                    return Value_1.Value.Create(resultVal, Value_1.ValueType.Float);
                }
                else {
                    return Value_1.Value.Create(resultVal, param1.valueType);
                }
            }
        }
        else {
            throw new Error("Unexpected number of parameters to NativeFunctionCall: " +
                parametersOfSingleType.length);
        }
    }
    CallBinaryListOperation(parameters) {
        if ((this.name == "+" || this.name == "-") &&
            parameters[0] instanceof Value_1.ListValue &&
            parameters[1] instanceof Value_1.IntValue)
            return this.CallListIncrementOperation(parameters);
        let v1 = TypeAssertion_1.asOrThrows(parameters[0], Value_1.Value);
        let v2 = TypeAssertion_1.asOrThrows(parameters[1], Value_1.Value);
        if ((this.name == "&&" || this.name == "||") &&
            (v1.valueType != Value_1.ValueType.List || v2.valueType != Value_1.ValueType.List)) {
            if (this._operationFuncs === null)
                return NullException_1.throwNullException("NativeFunctionCall._operationFuncs");
            let op = this._operationFuncs.get(Value_1.ValueType.Int);
            if (op === null)
                return NullException_1.throwNullException("NativeFunctionCall.CallBinaryListOperation op");
            let result = op(v1.isTruthy ? 1 : 0, v2.isTruthy ? 1 : 0);
            return new Value_1.IntValue(result);
        }
        if (v1.valueType == Value_1.ValueType.List && v2.valueType == Value_1.ValueType.List)
            return this.CallType([v1, v2]);
        throw new StoryException_1.StoryException("Can not call use " +
            this.name +
            " operation on " +
            Value_1.ValueType[v1.valueType] +
            " and " +
            Value_1.ValueType[v2.valueType]);
    }
    CallListIncrementOperation(listIntParams) {
        let listVal = TypeAssertion_1.asOrThrows(listIntParams[0], Value_1.ListValue);
        let intVal = TypeAssertion_1.asOrThrows(listIntParams[1], Value_1.IntValue);
        let resultInkList = new InkList_1.InkList();
        if (listVal.value === null)
            return NullException_1.throwNullException("NativeFunctionCall.CallListIncrementOperation listVal.value");
        for (let [listItemKey, listItemValue] of listVal.value) {
            let listItem = InkList_1.InkListItem.fromSerializedKey(listItemKey);
            if (this._operationFuncs === null)
                return NullException_1.throwNullException("NativeFunctionCall._operationFuncs");
            let intOp = this._operationFuncs.get(Value_1.ValueType.Int);
            if (intVal.value === null)
                return NullException_1.throwNullException("NativeFunctionCall.CallListIncrementOperation intVal.value");
            let targetInt = intOp(listItemValue, intVal.value);
            let itemOrigin = null;
            if (listVal.value.origins === null)
                return NullException_1.throwNullException("NativeFunctionCall.CallListIncrementOperation listVal.value.origins");
            for (let origin of listVal.value.origins) {
                if (origin.name == listItem.originName) {
                    itemOrigin = origin;
                    break;
                }
            }
            if (itemOrigin != null) {
                let incrementedItem = itemOrigin.TryGetItemWithValue(targetInt, InkList_1.InkListItem.Null);
                if (incrementedItem.exists)
                    resultInkList.Add(incrementedItem.result, targetInt);
            }
        }
        return new Value_1.ListValue(resultInkList);
    }
    CoerceValuesToSingleType(parametersIn) {
        let valType = Value_1.ValueType.Int;
        let specialCaseList = null;
        for (let obj of parametersIn) {
            let val = TypeAssertion_1.asOrThrows(obj, Value_1.Value);
            if (val.valueType > valType) {
                valType = val.valueType;
            }
            if (val.valueType == Value_1.ValueType.List) {
                specialCaseList = TypeAssertion_1.asOrNull(val, Value_1.ListValue);
            }
        }
        let parametersOut = [];
        if (Value_1.ValueType[valType] == Value_1.ValueType[Value_1.ValueType.List]) {
            for (let inkObjectVal of parametersIn) {
                let val = TypeAssertion_1.asOrThrows(inkObjectVal, Value_1.Value);
                if (val.valueType == Value_1.ValueType.List) {
                    parametersOut.push(val);
                }
                else if (val.valueType == Value_1.ValueType.Int) {
                    let intVal = parseInt(val.valueObject);
                    specialCaseList = TypeAssertion_1.asOrThrows(specialCaseList, Value_1.ListValue);
                    if (specialCaseList.value === null)
                        return NullException_1.throwNullException("NativeFunctionCall.CoerceValuesToSingleType specialCaseList.value");
                    let list = specialCaseList.value.originOfMaxItem;
                    if (list === null)
                        return NullException_1.throwNullException("NativeFunctionCall.CoerceValuesToSingleType list");
                    let item = list.TryGetItemWithValue(intVal, InkList_1.InkListItem.Null);
                    if (item.exists) {
                        let castedValue = new Value_1.ListValue(item.result, intVal);
                        parametersOut.push(castedValue);
                    }
                    else
                        throw new StoryException_1.StoryException("Could not find List item with the value " +
                            intVal +
                            " in " +
                            list.name);
                }
                else {
                    const key = Value_1.ValueType[val.valueType];
                    throw new StoryException_1.StoryException("Cannot mix Lists and " + key + " values in this operation");
                }
            }
        }
        else {
            for (let inkObjectVal of parametersIn) {
                let val = TypeAssertion_1.asOrThrows(inkObjectVal, Value_1.Value);
                let castedValue = val.Cast(valType);
                parametersOut.push(castedValue);
            }
        }
        return parametersOut;
    }
    static Identity(t) {
        return t;
    }
    static GenerateNativeFunctionsIfNecessary() {
        if (this._nativeFunctions == null) {
            this._nativeFunctions = new Map();
            // Int operations
            this.AddIntBinaryOp(this.Add, (x, y) => x + y);
            this.AddIntBinaryOp(this.Subtract, (x, y) => x - y);
            this.AddIntBinaryOp(this.Multiply, (x, y) => x * y);
            this.AddIntBinaryOp(this.Divide, (x, y) => Math.floor(x / y));
            this.AddIntBinaryOp(this.Mod, (x, y) => x % y);
            this.AddIntUnaryOp(this.Negate, (x) => -x);
            this.AddIntBinaryOp(this.Equal, (x, y) => (x == y ? 1 : 0));
            this.AddIntBinaryOp(this.Greater, (x, y) => (x > y ? 1 : 0));
            this.AddIntBinaryOp(this.Less, (x, y) => (x < y ? 1 : 0));
            this.AddIntBinaryOp(this.GreaterThanOrEquals, (x, y) => (x >= y ? 1 : 0));
            this.AddIntBinaryOp(this.LessThanOrEquals, (x, y) => (x <= y ? 1 : 0));
            this.AddIntBinaryOp(this.NotEquals, (x, y) => (x != y ? 1 : 0));
            this.AddIntUnaryOp(this.Not, (x) => (x == 0 ? 1 : 0));
            this.AddIntBinaryOp(this.And, (x, y) => (x != 0 && y != 0 ? 1 : 0));
            this.AddIntBinaryOp(this.Or, (x, y) => (x != 0 || y != 0 ? 1 : 0));
            this.AddIntBinaryOp(this.Max, (x, y) => Math.max(x, y));
            this.AddIntBinaryOp(this.Min, (x, y) => Math.min(x, y));
            this.AddIntBinaryOp(this.Pow, (x, y) => Math.pow(x, y));
            this.AddIntUnaryOp(this.Floor, NativeFunctionCall.Identity);
            this.AddIntUnaryOp(this.Ceiling, NativeFunctionCall.Identity);
            this.AddIntUnaryOp(this.Int, NativeFunctionCall.Identity);
            this.AddIntUnaryOp(this.Float, (x) => x);
            // Float operations
            this.AddFloatBinaryOp(this.Add, (x, y) => x + y);
            this.AddFloatBinaryOp(this.Subtract, (x, y) => x - y);
            this.AddFloatBinaryOp(this.Multiply, (x, y) => x * y);
            this.AddFloatBinaryOp(this.Divide, (x, y) => x / y);
            this.AddFloatBinaryOp(this.Mod, (x, y) => x % y);
            this.AddFloatUnaryOp(this.Negate, (x) => -x);
            this.AddFloatBinaryOp(this.Equal, (x, y) => (x == y ? 1 : 0));
            this.AddFloatBinaryOp(this.Greater, (x, y) => (x > y ? 1 : 0));
            this.AddFloatBinaryOp(this.Less, (x, y) => (x < y ? 1 : 0));
            this.AddFloatBinaryOp(this.GreaterThanOrEquals, (x, y) => x >= y ? 1 : 0);
            this.AddFloatBinaryOp(this.LessThanOrEquals, (x, y) => (x <= y ? 1 : 0));
            this.AddFloatBinaryOp(this.NotEquals, (x, y) => (x != y ? 1 : 0));
            this.AddFloatUnaryOp(this.Not, (x) => (x == 0.0 ? 1 : 0));
            this.AddFloatBinaryOp(this.And, (x, y) => (x != 0.0 && y != 0.0 ? 1 : 0));
            this.AddFloatBinaryOp(this.Or, (x, y) => (x != 0.0 || y != 0.0 ? 1 : 0));
            this.AddFloatBinaryOp(this.Max, (x, y) => Math.max(x, y));
            this.AddFloatBinaryOp(this.Min, (x, y) => Math.min(x, y));
            this.AddFloatBinaryOp(this.Pow, (x, y) => Math.pow(x, y));
            this.AddFloatUnaryOp(this.Floor, (x) => Math.floor(x));
            this.AddFloatUnaryOp(this.Ceiling, (x) => Math.ceil(x));
            this.AddFloatUnaryOp(this.Int, (x) => Math.floor(x));
            this.AddFloatUnaryOp(this.Float, NativeFunctionCall.Identity);
            // String operations
            this.AddStringBinaryOp(this.Add, (x, y) => x + y); // concat
            this.AddStringBinaryOp(this.Equal, (x, y) => (x === y ? 1 : 0));
            this.AddStringBinaryOp(this.NotEquals, (x, y) => (!(x === y) ? 1 : 0));
            this.AddStringBinaryOp(this.Has, (x, y) => (x.includes(y) ? 1 : 0));
            this.AddStringBinaryOp(this.Hasnt, (x, y) => (x.includes(y) ? 0 : 1));
            this.AddListBinaryOp(this.Add, (x, y) => x.Union(y));
            this.AddListBinaryOp(this.Subtract, (x, y) => x.Without(y));
            this.AddListBinaryOp(this.Has, (x, y) => (x.Contains(y) ? 1 : 0));
            this.AddListBinaryOp(this.Hasnt, (x, y) => (x.Contains(y) ? 0 : 1));
            this.AddListBinaryOp(this.Intersect, (x, y) => x.Intersect(y));
            this.AddListBinaryOp(this.Equal, (x, y) => (x.Equals(y) ? 1 : 0));
            this.AddListBinaryOp(this.Greater, (x, y) => (x.GreaterThan(y) ? 1 : 0));
            this.AddListBinaryOp(this.Less, (x, y) => (x.LessThan(y) ? 1 : 0));
            this.AddListBinaryOp(this.GreaterThanOrEquals, (x, y) => x.GreaterThanOrEquals(y) ? 1 : 0);
            this.AddListBinaryOp(this.LessThanOrEquals, (x, y) => x.LessThanOrEquals(y) ? 1 : 0);
            this.AddListBinaryOp(this.NotEquals, (x, y) => (!x.Equals(y) ? 1 : 0));
            this.AddListBinaryOp(this.And, (x, y) => x.Count > 0 && y.Count > 0 ? 1 : 0);
            this.AddListBinaryOp(this.Or, (x, y) => x.Count > 0 || y.Count > 0 ? 1 : 0);
            this.AddListUnaryOp(this.Not, (x) => (x.Count == 0 ? 1 : 0));
            this.AddListUnaryOp(this.Invert, (x) => x.inverse);
            this.AddListUnaryOp(this.All, (x) => x.all);
            this.AddListUnaryOp(this.ListMin, (x) => x.MinAsList());
            this.AddListUnaryOp(this.ListMax, (x) => x.MaxAsList());
            this.AddListUnaryOp(this.Count, (x) => x.Count);
            this.AddListUnaryOp(this.ValueOfList, (x) => x.maxItem.Value);
            let divertTargetsEqual = (d1, d2) => (d1.Equals(d2) ? 1 : 0);
            let divertTargetsNotEqual = (d1, d2) => d1.Equals(d2) ? 0 : 1;
            this.AddOpToNativeFunc(this.Equal, 2, Value_1.ValueType.DivertTarget, divertTargetsEqual);
            this.AddOpToNativeFunc(this.NotEquals, 2, Value_1.ValueType.DivertTarget, divertTargetsNotEqual);
        }
    }
    AddOpFuncForType(valType, op) {
        if (this._operationFuncs == null) {
            this._operationFuncs = new Map();
        }
        this._operationFuncs.set(valType, op);
    }
    static AddOpToNativeFunc(name, args, valType, op) {
        if (this._nativeFunctions === null)
            return NullException_1.throwNullException("NativeFunctionCall._nativeFunctions");
        let nativeFunc = this._nativeFunctions.get(name);
        if (!nativeFunc) {
            nativeFunc = new NativeFunctionCall(name, args);
            this._nativeFunctions.set(name, nativeFunc);
        }
        nativeFunc.AddOpFuncForType(valType, op);
    }
    static AddIntBinaryOp(name, op) {
        this.AddOpToNativeFunc(name, 2, Value_1.ValueType.Int, op);
    }
    static AddIntUnaryOp(name, op) {
        this.AddOpToNativeFunc(name, 1, Value_1.ValueType.Int, op);
    }
    static AddFloatBinaryOp(name, op) {
        this.AddOpToNativeFunc(name, 2, Value_1.ValueType.Float, op);
    }
    static AddFloatUnaryOp(name, op) {
        this.AddOpToNativeFunc(name, 1, Value_1.ValueType.Float, op);
    }
    static AddStringBinaryOp(name, op) {
        this.AddOpToNativeFunc(name, 2, Value_1.ValueType.String, op);
    }
    static AddListBinaryOp(name, op) {
        this.AddOpToNativeFunc(name, 2, Value_1.ValueType.List, op);
    }
    static AddListUnaryOp(name, op) {
        this.AddOpToNativeFunc(name, 1, Value_1.ValueType.List, op);
    }
    toString() {
        return 'Native "' + this.name + '"';
    }
}
exports.NativeFunctionCall = NativeFunctionCall;
NativeFunctionCall.Add = "+";
NativeFunctionCall.Subtract = "-";
NativeFunctionCall.Divide = "/";
NativeFunctionCall.Multiply = "*";
NativeFunctionCall.Mod = "%";
NativeFunctionCall.Negate = "_";
NativeFunctionCall.Equal = "==";
NativeFunctionCall.Greater = ">";
NativeFunctionCall.Less = "<";
NativeFunctionCall.GreaterThanOrEquals = ">=";
NativeFunctionCall.LessThanOrEquals = "<=";
NativeFunctionCall.NotEquals = "!=";
NativeFunctionCall.Not = "!";
NativeFunctionCall.And = "&&";
NativeFunctionCall.Or = "||";
NativeFunctionCall.Min = "MIN";
NativeFunctionCall.Max = "MAX";
NativeFunctionCall.Pow = "POW";
NativeFunctionCall.Floor = "FLOOR";
NativeFunctionCall.Ceiling = "CEILING";
NativeFunctionCall.Int = "INT";
NativeFunctionCall.Float = "FLOAT";
NativeFunctionCall.Has = "?";
NativeFunctionCall.Hasnt = "!?";
NativeFunctionCall.Intersect = "^";
NativeFunctionCall.ListMin = "LIST_MIN";
NativeFunctionCall.ListMax = "LIST_MAX";
NativeFunctionCall.All = "LIST_ALL";
NativeFunctionCall.Count = "LIST_COUNT";
NativeFunctionCall.ValueOfList = "LIST_VALUE";
NativeFunctionCall.Invert = "LIST_INVERT";
NativeFunctionCall._nativeFunctions = null;
//# sourceMappingURL=NativeFunctionCall.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/NullException.js":
/*!****************************************************!*\
  !*** ./node_modules/inkjs/engine/NullException.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.throwNullException = exports.NullException = void 0;
/**
 * In the original C# code, a SystemException would be thrown when passing
 * null to methods expected a valid instance. Javascript has no such
 * concept, but TypeScript will not allow `null` to be passed to methods
 * explicitely requiring a valid type.
 *
 * Whenever TypeScript complain about the possibility of a `null` value,
 * check the offending value and it it's null, throw this exception using
 * `throwNullException(name: string)`.
 */
class NullException extends Error {
}
exports.NullException = NullException;
/**
 * Throw a NullException.
 *
 * @param name a short description of the offending value (often its name within the code).
 */
function throwNullException(name) {
    throw new NullException(`${name} is null or undefined`);
}
exports.throwNullException = throwNullException;
//# sourceMappingURL=NullException.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Object.js":
/*!*********************************************!*\
  !*** ./node_modules/inkjs/engine/Object.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InkObject = void 0;
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/inkjs/engine/Container.js");
const Debug_1 = __webpack_require__(/*! ./Debug */ "./node_modules/inkjs/engine/Debug.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class InkObject {
    constructor() {
        this.parent = null;
        this._debugMetadata = null;
        this._path = null;
    }
    get debugMetadata() {
        if (this._debugMetadata === null) {
            if (this.parent) {
                return this.parent.debugMetadata;
            }
        }
        return this._debugMetadata;
    }
    set debugMetadata(value) {
        this._debugMetadata = value;
    }
    get ownDebugMetadata() {
        return this._debugMetadata;
    }
    DebugLineNumberOfPath(path) {
        if (path === null)
            return null;
        // Try to get a line number from debug metadata
        let root = this.rootContentContainer;
        if (root) {
            let targetContent = root.ContentAtPath(path).obj;
            if (targetContent) {
                let dm = targetContent.debugMetadata;
                if (dm !== null) {
                    return dm.startLineNumber;
                }
            }
        }
        return null;
    }
    get path() {
        if (this._path == null) {
            if (this.parent == null) {
                this._path = new Path_1.Path();
            }
            else {
                let comps = [];
                let child = this;
                let container = TypeAssertion_1.asOrNull(child.parent, Container_1.Container);
                while (container !== null) {
                    let namedChild = TypeAssertion_1.asINamedContentOrNull(child);
                    if (namedChild != null && namedChild.hasValidName) {
                        comps.unshift(new Path_1.Path.Component(namedChild.name));
                    }
                    else {
                        comps.unshift(new Path_1.Path.Component(container.content.indexOf(child)));
                    }
                    child = container;
                    container = TypeAssertion_1.asOrNull(container.parent, Container_1.Container);
                }
                this._path = new Path_1.Path(comps);
            }
        }
        return this._path;
    }
    ResolvePath(path) {
        if (path === null)
            return NullException_1.throwNullException("path");
        if (path.isRelative) {
            let nearestContainer = TypeAssertion_1.asOrNull(this, Container_1.Container);
            if (nearestContainer === null) {
                Debug_1.Debug.Assert(this.parent !== null, "Can't resolve relative path because we don't have a parent");
                nearestContainer = TypeAssertion_1.asOrNull(this.parent, Container_1.Container);
                Debug_1.Debug.Assert(nearestContainer !== null, "Expected parent to be a container");
                Debug_1.Debug.Assert(path.GetComponent(0).isParent);
                path = path.tail;
            }
            if (nearestContainer === null) {
                return NullException_1.throwNullException("nearestContainer");
            }
            return nearestContainer.ContentAtPath(path);
        }
        else {
            let contentContainer = this.rootContentContainer;
            if (contentContainer === null) {
                return NullException_1.throwNullException("contentContainer");
            }
            return contentContainer.ContentAtPath(path);
        }
    }
    ConvertPathToRelative(globalPath) {
        let ownPath = this.path;
        let minPathLength = Math.min(globalPath.length, ownPath.length);
        let lastSharedPathCompIndex = -1;
        for (let i = 0; i < minPathLength; ++i) {
            let ownComp = ownPath.GetComponent(i);
            let otherComp = globalPath.GetComponent(i);
            if (ownComp.Equals(otherComp)) {
                lastSharedPathCompIndex = i;
            }
            else {
                break;
            }
        }
        // No shared path components, so just use global path
        if (lastSharedPathCompIndex == -1)
            return globalPath;
        let numUpwardsMoves = ownPath.componentCount - 1 - lastSharedPathCompIndex;
        let newPathComps = [];
        for (let up = 0; up < numUpwardsMoves; ++up)
            newPathComps.push(Path_1.Path.Component.ToParent());
        for (let down = lastSharedPathCompIndex + 1; down < globalPath.componentCount; ++down)
            newPathComps.push(globalPath.GetComponent(down));
        let relativePath = new Path_1.Path(newPathComps, true);
        return relativePath;
    }
    CompactPathString(otherPath) {
        let globalPathStr = null;
        let relativePathStr = null;
        if (otherPath.isRelative) {
            relativePathStr = otherPath.componentsString;
            globalPathStr = this.path.PathByAppendingPath(otherPath).componentsString;
        }
        else {
            let relativePath = this.ConvertPathToRelative(otherPath);
            relativePathStr = relativePath.componentsString;
            globalPathStr = otherPath.componentsString;
        }
        if (relativePathStr.length < globalPathStr.length)
            return relativePathStr;
        else
            return globalPathStr;
    }
    get rootContentContainer() {
        let ancestor = this;
        while (ancestor.parent) {
            ancestor = ancestor.parent;
        }
        return TypeAssertion_1.asOrNull(ancestor, Container_1.Container);
    }
    Copy() {
        throw Error("Not Implemented: Doesn't support copying");
    }
    // SetChild works slightly diferently in the js implementation.
    // Since we can't pass an objets property by reference, we instead pass
    // the object and the property string.
    // TODO: This method can probably be rewritten with type-safety in mind.
    SetChild(obj, prop, value) {
        if (obj[prop])
            obj[prop] = null;
        obj[prop] = value;
        if (obj[prop])
            obj[prop].parent = this;
    }
}
exports.InkObject = InkObject;
//# sourceMappingURL=Object.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/PRNG.js":
/*!*******************************************!*\
  !*** ./node_modules/inkjs/engine/PRNG.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PRNG = void 0;
// Taken from https://gist.github.com/blixt/f17b47c62508be59987b
// Ink uses a seedable PRNG of which there is none in native javascript.
class PRNG {
    constructor(seed) {
        this.seed = seed % 2147483647;
        if (this.seed <= 0)
            this.seed += 2147483646;
    }
    next() {
        return (this.seed = (this.seed * 16807) % 2147483647);
    }
    nextFloat() {
        return (this.next() - 1) / 2147483646;
    }
}
exports.PRNG = PRNG;
//# sourceMappingURL=PRNG.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Path.js":
/*!*******************************************!*\
  !*** ./node_modules/inkjs/engine/Path.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
class Path {
    constructor() {
        this._components = [];
        this._componentsString = null;
        this._isRelative = false;
        if (typeof arguments[0] == "string") {
            let componentsString = arguments[0];
            this.componentsString = componentsString;
        }
        else if (arguments[0] instanceof Path.Component &&
            arguments[1] instanceof Path) {
            let head = arguments[0];
            let tail = arguments[1];
            this._components.push(head);
            this._components = this._components.concat(tail._components);
        }
        else if (arguments[0] instanceof Array) {
            let head = arguments[0];
            let relative = !!arguments[1];
            this._components = this._components.concat(head);
            this._isRelative = relative;
        }
    }
    get isRelative() {
        return this._isRelative;
    }
    get componentCount() {
        return this._components.length;
    }
    get head() {
        if (this._components.length > 0) {
            return this._components[0];
        }
        else {
            return null;
        }
    }
    get tail() {
        if (this._components.length >= 2) {
            // careful, the original code uses length-1 here. This is because the second argument of
            // List.GetRange is a number of elements to extract, wherease Array.slice uses an index
            let tailComps = this._components.slice(1, this._components.length);
            return new Path(tailComps);
        }
        else {
            return Path.self;
        }
    }
    get length() {
        return this._components.length;
    }
    get lastComponent() {
        let lastComponentIdx = this._components.length - 1;
        if (lastComponentIdx >= 0) {
            return this._components[lastComponentIdx];
        }
        else {
            return null;
        }
    }
    get containsNamedComponent() {
        for (let i = 0, l = this._components.length; i < l; i++) {
            if (!this._components[i].isIndex) {
                return true;
            }
        }
        return false;
    }
    static get self() {
        let path = new Path();
        path._isRelative = true;
        return path;
    }
    GetComponent(index) {
        return this._components[index];
    }
    PathByAppendingPath(pathToAppend) {
        let p = new Path();
        let upwardMoves = 0;
        for (let i = 0; i < pathToAppend._components.length; ++i) {
            if (pathToAppend._components[i].isParent) {
                upwardMoves++;
            }
            else {
                break;
            }
        }
        for (let i = 0; i < this._components.length - upwardMoves; ++i) {
            p._components.push(this._components[i]);
        }
        for (let i = upwardMoves; i < pathToAppend._components.length; ++i) {
            p._components.push(pathToAppend._components[i]);
        }
        return p;
    }
    get componentsString() {
        if (this._componentsString == null) {
            this._componentsString = this._components.join(".");
            if (this.isRelative)
                this._componentsString = "." + this._componentsString;
        }
        return this._componentsString;
    }
    set componentsString(value) {
        this._components.length = 0;
        this._componentsString = value;
        if (this._componentsString == null || this._componentsString == "")
            return;
        if (this._componentsString[0] == ".") {
            this._isRelative = true;
            this._componentsString = this._componentsString.substring(1);
        }
        let componentStrings = this._componentsString.split(".");
        for (let str of componentStrings) {
            // we need to distinguish between named components that start with a number, eg "42somewhere", and indexed components
            // the normal parseInt won't do for the detection because it's too relaxed.
            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            if (/^(\-|\+)?([0-9]+|Infinity)$/.test(str)) {
                this._components.push(new Path.Component(parseInt(str)));
            }
            else {
                this._components.push(new Path.Component(str));
            }
        }
    }
    toString() {
        return this.componentsString;
    }
    Equals(otherPath) {
        if (otherPath == null)
            return false;
        if (otherPath._components.length != this._components.length)
            return false;
        if (otherPath.isRelative != this.isRelative)
            return false;
        // the original code uses SequenceEqual here, so we need to iterate over the components manually.
        for (let i = 0, l = otherPath._components.length; i < l; i++) {
            // it's not quite clear whether this test should use Equals or a simple == operator,
            // see https://github.com/y-lohse/inkjs/issues/22
            if (!otherPath._components[i].Equals(this._components[i]))
                return false;
        }
        return true;
    }
    PathByAppendingComponent(c) {
        let p = new Path();
        p._components.push.apply(p._components, this._components);
        p._components.push(c);
        return p;
    }
}
exports.Path = Path;
Path.parentId = "^";
(function (Path) {
    class Component {
        constructor(indexOrName) {
            this.index = -1;
            this.name = null;
            if (typeof indexOrName == "string") {
                this.name = indexOrName;
            }
            else {
                this.index = indexOrName;
            }
        }
        get isIndex() {
            return this.index >= 0;
        }
        get isParent() {
            return this.name == Path.parentId;
        }
        static ToParent() {
            return new Component(Path.parentId);
        }
        toString() {
            if (this.isIndex) {
                return this.index.toString();
            }
            else {
                return this.name;
            }
        }
        Equals(otherComp) {
            if (otherComp != null && otherComp.isIndex == this.isIndex) {
                if (this.isIndex) {
                    return this.index == otherComp.index;
                }
                else {
                    return this.name == otherComp.name;
                }
            }
            return false;
        }
    }
    Path.Component = Component;
})(Path = exports.Path || (exports.Path = {}));
//# sourceMappingURL=Path.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Pointer.js":
/*!**********************************************!*\
  !*** ./node_modules/inkjs/engine/Pointer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
class Pointer {
    constructor() {
        this.container = null;
        this.index = -1;
        if (arguments.length === 2) {
            this.container = arguments[0];
            this.index = arguments[1];
        }
    }
    Resolve() {
        if (this.index < 0)
            return this.container;
        if (this.container == null)
            return null;
        if (this.container.content.length == 0)
            return this.container;
        if (this.index >= this.container.content.length)
            return null;
        return this.container.content[this.index];
    }
    get isNull() {
        return this.container == null;
    }
    get path() {
        if (this.isNull)
            return null;
        if (this.index >= 0)
            return this.container.path.PathByAppendingComponent(new Path_1.Path.Component(this.index));
        else
            return this.container.path;
    }
    toString() {
        if (!this.container)
            return "Ink Pointer (null)";
        return ("Ink Pointer -> " +
            this.container.path.toString() +
            " -- index " +
            this.index);
    }
    // This method does not exist in the original C# code, but is here to maintain the
    // value semantics of Pointer.
    copy() {
        return new Pointer(this.container, this.index);
    }
    static StartOf(container) {
        return new Pointer(container, 0);
    }
    static get Null() {
        return new Pointer(null, -1);
    }
}
exports.Pointer = Pointer;
//# sourceMappingURL=Pointer.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/PushPop.js":
/*!**********************************************!*\
  !*** ./node_modules/inkjs/engine/PushPop.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PushPopType = void 0;
var PushPopType;
(function (PushPopType) {
    PushPopType[PushPopType["Tunnel"] = 0] = "Tunnel";
    PushPopType[PushPopType["Function"] = 1] = "Function";
    PushPopType[PushPopType["FunctionEvaluationFromGame"] = 2] = "FunctionEvaluationFromGame";
})(PushPopType = exports.PushPopType || (exports.PushPopType = {}));
//# sourceMappingURL=PushPop.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/SearchResult.js":
/*!***************************************************!*\
  !*** ./node_modules/inkjs/engine/SearchResult.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
const Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/inkjs/engine/Container.js");
class SearchResult {
    constructor() {
        this.obj = null;
        this.approximate = false;
    }
    get correctObj() {
        return this.approximate ? null : this.obj;
    }
    get container() {
        return this.obj instanceof Container_1.Container ? this.obj : null;
    }
    copy() {
        let searchResult = new SearchResult();
        searchResult.obj = this.obj;
        searchResult.approximate = this.approximate;
        return searchResult;
    }
}
exports.SearchResult = SearchResult;
//# sourceMappingURL=SearchResult.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/SimpleJson.js":
/*!*************************************************!*\
  !*** ./node_modules/inkjs/engine/SimpleJson.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleJson = void 0;
class SimpleJson {
    static TextToDictionary(text) {
        return new SimpleJson.Reader(text).ToDictionary();
    }
    static TextToArray(text) {
        return new SimpleJson.Reader(text).ToArray();
    }
}
exports.SimpleJson = SimpleJson;
(function (SimpleJson) {
    class Reader {
        constructor(text) {
            this._rootObject = JSON.parse(text);
        }
        ToDictionary() {
            return this._rootObject;
        }
        ToArray() {
            return this._rootObject;
        }
    }
    SimpleJson.Reader = Reader;
    // In C#, this class writes json tokens directly to a StringWriter or
    // another stream. Here, a temporary hierarchy is created in the form
    // of a javascript object, which is serialised in the `toString` method.
    // See individual methods and properties for more information.
    class Writer {
        constructor() {
            // In addition to `_stateStack` present in the original code,
            // this implementation of SimpleJson use two other stacks and two
            // temporary variables holding the current context.
            // Used to keep track of the current property name being built
            // with `WritePropertyNameStart`, `WritePropertyNameInner` and
            // `WritePropertyNameEnd`.
            this._currentPropertyName = null;
            // Used to keep track of the current string value being built
            // with `WriteStringStart`, `WriteStringInner` and
            // `WriteStringEnd`.
            this._currentString = null;
            this._stateStack = [];
            // Keep track of the current collection being built (either an array
            // or an object). For instance, at the '?' step during the hiarchy
            // creation, this hierarchy:
            // [3, {a: [b, ?]}] will have this corresponding stack:
            // (bottom) [Array, Object, Array] (top)
            this._collectionStack = [];
            // Keep track of the current property being assigned. For instance, at
            // the '?' step during the hiarchy creation, this hierarchy:
            // [3, {a: [b, {c: ?}]}] will have this corresponding stack:
            // (bottom) [a, c] (top)
            this._propertyNameStack = [];
            // Object containing the entire hiearchy.
            this._jsonObject = null;
        }
        WriteObject(inner) {
            this.WriteObjectStart();
            inner(this);
            this.WriteObjectEnd();
        }
        // Add a new object.
        WriteObjectStart() {
            this.StartNewObject(true);
            let newObject = {};
            if (this.state === SimpleJson.Writer.State.Property) {
                // This object is created as the value of a property,
                // inside an other object.
                this.Assert(this.currentCollection !== null);
                this.Assert(this.currentPropertyName !== null);
                let propertyName = this._propertyNameStack.pop();
                this.currentCollection[propertyName] = newObject;
                this._collectionStack.push(newObject);
            }
            else if (this.state === SimpleJson.Writer.State.Array) {
                // This object is created as the child of an array.
                this.Assert(this.currentCollection !== null);
                this.currentCollection.push(newObject);
                this._collectionStack.push(newObject);
            }
            else {
                // This object is the root object.
                this.Assert(this.state === SimpleJson.Writer.State.None);
                this._jsonObject = newObject;
                this._collectionStack.push(newObject);
            }
            this._stateStack.push(new SimpleJson.Writer.StateElement(SimpleJson.Writer.State.Object));
        }
        WriteObjectEnd() {
            this.Assert(this.state === SimpleJson.Writer.State.Object);
            this._collectionStack.pop();
            this._stateStack.pop();
        }
        // Write a property name / value pair to the current object.
        WriteProperty(name, innerOrContent) {
            this.WritePropertyStart(name);
            if (arguments[1] instanceof Function) {
                let inner = arguments[1];
                inner(this);
            }
            else {
                let content = arguments[1];
                this.Write(content);
            }
            this.WritePropertyEnd();
        }
        // Int and Float are separate calls, since there both are
        // numbers in JavaScript, but need to be handled differently.
        WriteIntProperty(name, content) {
            this.WritePropertyStart(name);
            this.WriteInt(content);
            this.WritePropertyEnd();
        }
        WriteFloatProperty(name, content) {
            this.WritePropertyStart(name);
            this.WriteFloat(content);
            this.WritePropertyEnd();
        }
        // Prepare a new property name, which will be use to add the
        // new object when calling _addToCurrentObject() from a Write
        // method.
        WritePropertyStart(name) {
            this.Assert(this.state === SimpleJson.Writer.State.Object);
            this._propertyNameStack.push(name);
            this.IncrementChildCount();
            this._stateStack.push(new SimpleJson.Writer.StateElement(SimpleJson.Writer.State.Property));
        }
        WritePropertyEnd() {
            this.Assert(this.state === SimpleJson.Writer.State.Property);
            this.Assert(this.childCount === 1);
            this._stateStack.pop();
        }
        // Prepare a new property name, except this time, the property name
        // will be created by concatenating all the strings passed to
        // WritePropertyNameInner.
        WritePropertyNameStart() {
            this.Assert(this.state === SimpleJson.Writer.State.Object);
            this.IncrementChildCount();
            this._currentPropertyName = "";
            this._stateStack.push(new SimpleJson.Writer.StateElement(SimpleJson.Writer.State.Property));
            this._stateStack.push(new SimpleJson.Writer.StateElement(SimpleJson.Writer.State.PropertyName));
        }
        WritePropertyNameEnd() {
            this.Assert(this.state === SimpleJson.Writer.State.PropertyName);
            this.Assert(this._currentPropertyName !== null);
            this._propertyNameStack.push(this._currentPropertyName);
            this._currentPropertyName = null;
            this._stateStack.pop();
        }
        WritePropertyNameInner(str) {
            this.Assert(this.state === SimpleJson.Writer.State.PropertyName);
            this.Assert(this._currentPropertyName !== null);
            this._currentPropertyName += str;
        }
        // Add a new array.
        WriteArrayStart() {
            this.StartNewObject(true);
            let newObject = [];
            if (this.state === SimpleJson.Writer.State.Property) {
                // This array is created as the value of a property,
                // inside an object.
                this.Assert(this.currentCollection !== null);
                this.Assert(this.currentPropertyName !== null);
                let propertyName = this._propertyNameStack.pop();
                this.currentCollection[propertyName] = newObject;
                this._collectionStack.push(newObject);
            }
            else if (this.state === SimpleJson.Writer.State.Array) {
                // This array is created as the child of another array.
                this.Assert(this.currentCollection !== null);
                this.currentCollection.push(newObject);
                this._collectionStack.push(newObject);
            }
            else {
                // This array is the root object.
                this.Assert(this.state === SimpleJson.Writer.State.None);
                this._jsonObject = newObject;
                this._collectionStack.push(newObject);
            }
            this._stateStack.push(new SimpleJson.Writer.StateElement(SimpleJson.Writer.State.Array));
        }
        WriteArrayEnd() {
            this.Assert(this.state === SimpleJson.Writer.State.Array);
            this._collectionStack.pop();
            this._stateStack.pop();
        }
        // Add the value to the appropriate collection (array / object), given the current
        // context.
        Write(value, escape = true) {
            if (value === null) {
                console.error("Warning: trying to write a null string");
                return;
            }
            this.StartNewObject(false);
            this._addToCurrentObject(value);
        }
        WriteInt(value) {
            if (value === null) {
                return;
            }
            this.StartNewObject(false);
            // Math.floor is used as a precaution:
            //     1. to ensure that the value is written as an integer
            //        (without a fractional part -> 1 instead of 1.0), even
            //        though it should be the default behaviour of
            //        JSON.serialize;
            //     2. to ensure that if a floating number is passed
            //        accidentally, it's converted to an integer.
            //
            // This guarantees savegame compatibility with the reference
            // implementation.
            this._addToCurrentObject(Math.floor(value));
        }
        // Since JSON doesn't support NaN and Infinity, these values
        // are converted here.
        WriteFloat(value) {
            if (value === null) {
                return;
            }
            this.StartNewObject(false);
            if (value == Number.POSITIVE_INFINITY) {
                this._addToCurrentObject(3.4e38);
            }
            else if (value == Number.NEGATIVE_INFINITY) {
                this._addToCurrentObject(-3.4e38);
            }
            else if (isNaN(value)) {
                this._addToCurrentObject(0.0);
            }
            else {
                this._addToCurrentObject(value);
            }
        }
        WriteNull() {
            this.StartNewObject(false);
            this._addToCurrentObject(null);
        }
        // Prepare a string before adding it to the current collection in
        // WriteStringEnd(). The string will be a concatenation of all the
        // strings passed to WriteStringInner.
        WriteStringStart() {
            this.StartNewObject(false);
            this._currentString = "";
            this._stateStack.push(new SimpleJson.Writer.StateElement(SimpleJson.Writer.State.String));
        }
        WriteStringEnd() {
            this.Assert(this.state == SimpleJson.Writer.State.String);
            this._stateStack.pop();
            this._addToCurrentObject(this._currentString);
            this._currentString = null;
        }
        WriteStringInner(str, escape = true) {
            this.Assert(this.state === SimpleJson.Writer.State.String);
            if (str === null) {
                console.error("Warning: trying to write a null string");
                return;
            }
            this._currentString += str;
        }
        // Serialise the root object into a JSON string.
        ToString() {
            if (this._jsonObject === null) {
                return "";
            }
            return JSON.stringify(this._jsonObject);
        }
        // Prepare the state stack when adding new objects / values.
        StartNewObject(container) {
            if (container) {
                this.Assert(this.state === SimpleJson.Writer.State.None ||
                    this.state === SimpleJson.Writer.State.Property ||
                    this.state === SimpleJson.Writer.State.Array);
            }
            else {
                this.Assert(this.state === SimpleJson.Writer.State.Property ||
                    this.state === SimpleJson.Writer.State.Array);
            }
            if (this.state === SimpleJson.Writer.State.Property) {
                this.Assert(this.childCount === 0);
            }
            if (this.state === SimpleJson.Writer.State.Array ||
                this.state === SimpleJson.Writer.State.Property) {
                this.IncrementChildCount();
            }
        }
        // These getters peek all the different stacks.
        get state() {
            if (this._stateStack.length > 0) {
                return this._stateStack[this._stateStack.length - 1].type;
            }
            else {
                return SimpleJson.Writer.State.None;
            }
        }
        get childCount() {
            if (this._stateStack.length > 0) {
                return this._stateStack[this._stateStack.length - 1].childCount;
            }
            else {
                return 0;
            }
        }
        get currentCollection() {
            if (this._collectionStack.length > 0) {
                return this._collectionStack[this._collectionStack.length - 1];
            }
            else {
                return null;
            }
        }
        get currentPropertyName() {
            if (this._propertyNameStack.length > 0) {
                return this._propertyNameStack[this._propertyNameStack.length - 1];
            }
            else {
                return null;
            }
        }
        IncrementChildCount() {
            this.Assert(this._stateStack.length > 0);
            let currEl = this._stateStack.pop();
            currEl.childCount++;
            this._stateStack.push(currEl);
        }
        Assert(condition) {
            if (!condition)
                throw Error("Assert failed while writing JSON");
        }
        // This method did not exist in the original C# code. It adds
        // the given value to the current collection (used by Write methods).
        _addToCurrentObject(value) {
            this.Assert(this.currentCollection !== null);
            if (this.state === SimpleJson.Writer.State.Array) {
                this.Assert(Array.isArray(this.currentCollection));
                this.currentCollection.push(value);
            }
            else if (this.state === SimpleJson.Writer.State.Property) {
                this.Assert(!Array.isArray(this.currentCollection));
                this.Assert(this.currentPropertyName !== null);
                this.currentCollection[this.currentPropertyName] = value;
                this._propertyNameStack.pop();
            }
        }
    }
    SimpleJson.Writer = Writer;
    (function (Writer) {
        let State;
        (function (State) {
            State[State["None"] = 0] = "None";
            State[State["Object"] = 1] = "Object";
            State[State["Array"] = 2] = "Array";
            State[State["Property"] = 3] = "Property";
            State[State["PropertyName"] = 4] = "PropertyName";
            State[State["String"] = 5] = "String";
        })(State = Writer.State || (Writer.State = {}));
        class StateElement {
            constructor(type) {
                this.type = SimpleJson.Writer.State.None;
                this.childCount = 0;
                this.type = type;
            }
        }
        Writer.StateElement = StateElement;
    })(Writer = SimpleJson.Writer || (SimpleJson.Writer = {}));
})(SimpleJson = exports.SimpleJson || (exports.SimpleJson = {}));
//# sourceMappingURL=SimpleJson.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/StatePatch.js":
/*!*************************************************!*\
  !*** ./node_modules/inkjs/engine/StatePatch.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StatePatch = void 0;
class StatePatch {
    constructor() {
        this._changedVariables = new Set();
        this._visitCounts = new Map();
        this._turnIndices = new Map();
        if (arguments.length === 1 && arguments[0] !== null) {
            let toCopy = arguments[0];
            this._globals = new Map(toCopy._globals);
            this._changedVariables = new Set(toCopy._changedVariables);
            this._visitCounts = new Map(toCopy._visitCounts);
            this._turnIndices = new Map(toCopy._turnIndices);
        }
        else {
            this._globals = new Map();
            this._changedVariables = new Set();
            this._visitCounts = new Map();
            this._turnIndices = new Map();
        }
    }
    get globals() {
        return this._globals;
    }
    get changedVariables() {
        return this._changedVariables;
    }
    get visitCounts() {
        return this._visitCounts;
    }
    get turnIndices() {
        return this._turnIndices;
    }
    TryGetGlobal(name, /* out */ value) {
        if (name !== null && this._globals.has(name)) {
            return { result: this._globals.get(name), exists: true };
        }
        return { result: value, exists: false };
    }
    SetGlobal(name, value) {
        this._globals.set(name, value);
    }
    AddChangedVariable(name) {
        return this._changedVariables.add(name);
    }
    TryGetVisitCount(container, /* out */ count) {
        if (this._visitCounts.has(container)) {
            return { result: this._visitCounts.get(container), exists: true };
        }
        return { result: count, exists: false };
    }
    SetVisitCount(container, count) {
        this._visitCounts.set(container, count);
    }
    SetTurnIndex(container, index) {
        this._turnIndices.set(container, index);
    }
    TryGetTurnIndex(container, /* out */ index) {
        if (this._turnIndices.has(container)) {
            return { result: this._turnIndices.get(container), exists: true };
        }
        return { result: index, exists: false };
    }
}
exports.StatePatch = StatePatch;
//# sourceMappingURL=StatePatch.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/StopWatch.js":
/*!************************************************!*\
  !*** ./node_modules/inkjs/engine/StopWatch.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
// This is simple replacement of the Stopwatch class from the .NET Framework.
// The original class can count time with much more accuracy than the Javascript version.
// It might be worth considering using `window.performance` in the browser
// or `process.hrtime()` in node.
class Stopwatch {
    constructor() {
        this.startTime = undefined;
    }
    get ElapsedMilliseconds() {
        if (typeof this.startTime === "undefined") {
            return 0;
        }
        return new Date().getTime() - this.startTime;
    }
    Start() {
        this.startTime = new Date().getTime();
    }
    Stop() {
        this.startTime = undefined;
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=StopWatch.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Story.js":
/*!********************************************!*\
  !*** ./node_modules/inkjs/engine/Story.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
const Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/inkjs/engine/Container.js");
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const JsonSerialisation_1 = __webpack_require__(/*! ./JsonSerialisation */ "./node_modules/inkjs/engine/JsonSerialisation.js");
const StoryState_1 = __webpack_require__(/*! ./StoryState */ "./node_modules/inkjs/engine/StoryState.js");
const ControlCommand_1 = __webpack_require__(/*! ./ControlCommand */ "./node_modules/inkjs/engine/ControlCommand.js");
const PushPop_1 = __webpack_require__(/*! ./PushPop */ "./node_modules/inkjs/engine/PushPop.js");
const ChoicePoint_1 = __webpack_require__(/*! ./ChoicePoint */ "./node_modules/inkjs/engine/ChoicePoint.js");
const Choice_1 = __webpack_require__(/*! ./Choice */ "./node_modules/inkjs/engine/Choice.js");
const Divert_1 = __webpack_require__(/*! ./Divert */ "./node_modules/inkjs/engine/Divert.js");
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const Void_1 = __webpack_require__(/*! ./Void */ "./node_modules/inkjs/engine/Void.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/inkjs/engine/Tag.js");
const VariableAssignment_1 = __webpack_require__(/*! ./VariableAssignment */ "./node_modules/inkjs/engine/VariableAssignment.js");
const VariableReference_1 = __webpack_require__(/*! ./VariableReference */ "./node_modules/inkjs/engine/VariableReference.js");
const NativeFunctionCall_1 = __webpack_require__(/*! ./NativeFunctionCall */ "./node_modules/inkjs/engine/NativeFunctionCall.js");
const StoryException_1 = __webpack_require__(/*! ./StoryException */ "./node_modules/inkjs/engine/StoryException.js");
const PRNG_1 = __webpack_require__(/*! ./PRNG */ "./node_modules/inkjs/engine/PRNG.js");
const StringBuilder_1 = __webpack_require__(/*! ./StringBuilder */ "./node_modules/inkjs/engine/StringBuilder.js");
const ListDefinitionsOrigin_1 = __webpack_require__(/*! ./ListDefinitionsOrigin */ "./node_modules/inkjs/engine/ListDefinitionsOrigin.js");
const StopWatch_1 = __webpack_require__(/*! ./StopWatch */ "./node_modules/inkjs/engine/StopWatch.js");
const Pointer_1 = __webpack_require__(/*! ./Pointer */ "./node_modules/inkjs/engine/Pointer.js");
const InkList_1 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
const SimpleJson_1 = __webpack_require__(/*! ./SimpleJson */ "./node_modules/inkjs/engine/SimpleJson.js");
var InkList_2 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
Object.defineProperty(exports, "InkList", { enumerable: true, get: function () { return InkList_2.InkList; } });
if (!Number.isInteger) {
    Number.isInteger = function isInteger(nVal) {
        return (typeof nVal === "number" &&
            isFinite(nVal) &&
            nVal > -9007199254740992 &&
            nVal < 9007199254740992 &&
            Math.floor(nVal) === nVal);
    };
}
class Story extends Object_1.InkObject {
    constructor() {
        super();
        this.inkVersionMinimumCompatible = 18;
        this._prevContainers = [];
        this.allowExternalFunctionFallbacks = false;
        this._listDefinitions = null;
        this._variableObservers = null;
        this._hasValidatedExternals = false;
        this._temporaryEvaluationContainer = null;
        this._asyncContinueActive = false;
        this._stateSnapshotAtLastNewline = null;
        this._recursiveContinueCount = 0;
        this._asyncSaving = false;
        this._profiler = null; // TODO: Profiler
        // Discrimination between constructors
        let contentContainer;
        let lists = null;
        let json = null;
        if (arguments[0] instanceof Container_1.Container) {
            contentContainer = arguments[0];
            if (typeof arguments[1] !== "undefined") {
                lists = arguments[1];
            }
            // ------ Story (Container contentContainer, List<Runtime.ListDefinition> lists = null)
            this._mainContentContainer = contentContainer;
            // ------
        }
        else {
            if (typeof arguments[0] === "string") {
                let jsonString = arguments[0];
                json = SimpleJson_1.SimpleJson.TextToDictionary(jsonString);
            }
            else {
                json = arguments[0];
            }
        }
        // ------ Story (Container contentContainer, List<Runtime.ListDefinition> lists = null)
        if (lists != null)
            this._listDefinitions = new ListDefinitionsOrigin_1.ListDefinitionsOrigin(lists);
        this._externals = new Map();
        // ------
        // ------ Story(string jsonString) : this((Container)null)
        if (json !== null) {
            let rootObject = json;
            let versionObj = rootObject["inkVersion"];
            if (versionObj == null)
                throw new Error("ink version number not found. Are you sure it's a valid .ink.json file?");
            let formatFromFile = parseInt(versionObj);
            if (formatFromFile > Story.inkVersionCurrent) {
                throw new Error("Version of ink used to build story was newer than the current version of the engine");
            }
            else if (formatFromFile < this.inkVersionMinimumCompatible) {
                throw new Error("Version of ink used to build story is too old to be loaded by this version of the engine");
            }
            else if (formatFromFile != Story.inkVersionCurrent) {
                console.warn("WARNING: Version of ink used to build story doesn't match current version of engine. Non-critical, but recommend synchronising.");
            }
            let rootToken = rootObject["root"];
            if (rootToken == null)
                throw new Error("Root node for ink not found. Are you sure it's a valid .ink.json file?");
            let listDefsObj;
            if ((listDefsObj = rootObject["listDefs"])) {
                this._listDefinitions = JsonSerialisation_1.JsonSerialisation.JTokenToListDefinitions(listDefsObj);
            }
            this._mainContentContainer = TypeAssertion_1.asOrThrows(JsonSerialisation_1.JsonSerialisation.JTokenToRuntimeObject(rootToken), Container_1.Container);
            this.ResetState();
        }
        // ------
    }
    get currentChoices() {
        let choices = [];
        if (this._state === null) {
            return NullException_1.throwNullException("this._state");
        }
        for (let c of this._state.currentChoices) {
            if (!c.isInvisibleDefault) {
                c.index = choices.length;
                choices.push(c);
            }
        }
        return choices;
    }
    get currentText() {
        this.IfAsyncWeCant("call currentText since it's a work in progress");
        return this.state.currentText;
    }
    get currentTags() {
        this.IfAsyncWeCant("call currentTags since it's a work in progress");
        return this.state.currentTags;
    }
    get currentErrors() {
        return this.state.currentErrors;
    }
    get currentWarnings() {
        return this.state.currentWarnings;
    }
    get hasError() {
        return this.state.hasError;
    }
    get hasWarning() {
        return this.state.hasWarning;
    }
    get variablesState() {
        return this.state.variablesState;
    }
    get listDefinitions() {
        return this._listDefinitions;
    }
    get state() {
        return this._state;
    }
    // TODO: Implement Profiler
    StartProfiling() {
        /* */
    }
    EndProfiling() {
        /* */
    }
    // Merge together `public string ToJson()` and `void ToJson(SimpleJson.Writer writer)`.
    // Will only return a value if writer was not provided.
    ToJson(writer) {
        let shouldReturn = false;
        if (!writer) {
            shouldReturn = true;
            writer = new SimpleJson_1.SimpleJson.Writer();
        }
        writer.WriteObjectStart();
        writer.WriteIntProperty("inkVersion", Story.inkVersionCurrent);
        writer.WriteProperty("root", (w) => JsonSerialisation_1.JsonSerialisation.WriteRuntimeContainer(w, this._mainContentContainer));
        if (this._listDefinitions != null) {
            writer.WritePropertyStart("listDefs");
            writer.WriteObjectStart();
            for (let def of this._listDefinitions.lists) {
                writer.WritePropertyStart(def.name);
                writer.WriteObjectStart();
                for (let [key, value] of def.items) {
                    let item = InkList_1.InkListItem.fromSerializedKey(key);
                    let val = value;
                    writer.WriteIntProperty(item.itemName, val);
                }
                writer.WriteObjectEnd();
                writer.WritePropertyEnd();
            }
            writer.WriteObjectEnd();
            writer.WritePropertyEnd();
        }
        writer.WriteObjectEnd();
        if (shouldReturn)
            return writer.ToString();
    }
    ResetState() {
        this.IfAsyncWeCant("ResetState");
        this._state = new StoryState_1.StoryState(this);
        this._state.variablesState.ObserveVariableChange(this.VariableStateDidChangeEvent.bind(this));
        this.ResetGlobals();
    }
    ResetErrors() {
        if (this._state === null) {
            return NullException_1.throwNullException("this._state");
        }
        this._state.ResetErrors();
    }
    ResetCallstack() {
        this.IfAsyncWeCant("ResetCallstack");
        if (this._state === null) {
            return NullException_1.throwNullException("this._state");
        }
        this._state.ForceEnd();
    }
    ResetGlobals() {
        if (this._mainContentContainer.namedContent.get("global decl")) {
            let originalPointer = this.state.currentPointer.copy();
            this.ChoosePath(new Path_1.Path("global decl"), false);
            this.ContinueInternal();
            this.state.currentPointer = originalPointer;
        }
        this.state.variablesState.SnapshotDefaultGlobals();
    }
    Continue() {
        this.ContinueAsync(0);
        return this.currentText;
    }
    get canContinue() {
        return this.state.canContinue;
    }
    get asyncContinueComplete() {
        return !this._asyncContinueActive;
    }
    ContinueAsync(millisecsLimitAsync) {
        if (!this._hasValidatedExternals)
            this.ValidateExternalBindings();
        this.ContinueInternal(millisecsLimitAsync);
    }
    ContinueInternal(millisecsLimitAsync = 0) {
        if (this._profiler != null)
            this._profiler.PreContinue();
        let isAsyncTimeLimited = millisecsLimitAsync > 0;
        this._recursiveContinueCount++;
        if (!this._asyncContinueActive) {
            this._asyncContinueActive = isAsyncTimeLimited;
            if (!this.canContinue) {
                throw new StoryException_1.StoryException("Can't continue - should check canContinue before calling Continue");
            }
            this._state.didSafeExit = false;
            this._state.ResetOutput();
            if (this._recursiveContinueCount == 1)
                this._state.variablesState.batchObservingVariableChanges = true;
        }
        let durationStopwatch = new StopWatch_1.Stopwatch();
        durationStopwatch.Start();
        let outputStreamEndsInNewline = false;
        do {
            try {
                outputStreamEndsInNewline = this.ContinueSingleStep();
            }
            catch (e) {
                if (!(e instanceof StoryException_1.StoryException))
                    throw e;
                this.AddError(e.message, undefined, e.useEndLineNumber);
                break;
            }
            if (outputStreamEndsInNewline)
                break;
            if (this._asyncContinueActive &&
                durationStopwatch.ElapsedMilliseconds > millisecsLimitAsync) {
                break;
            }
        } while (this.canContinue);
        durationStopwatch.Stop();
        if (outputStreamEndsInNewline || !this.canContinue) {
            if (this._stateSnapshotAtLastNewline !== null) {
                this.RestoreStateSnapshot();
            }
            if (!this.canContinue) {
                if (this.state.callStack.canPopThread)
                    this.AddError("Thread available to pop, threads should always be flat by the end of evaluation?");
                if (this.state.generatedChoices.length == 0 &&
                    !this.state.didSafeExit &&
                    this._temporaryEvaluationContainer == null) {
                    if (this.state.callStack.CanPop(PushPop_1.PushPopType.Tunnel))
                        this.AddError("unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?");
                    else if (this.state.callStack.CanPop(PushPop_1.PushPopType.Function))
                        this.AddError("unexpectedly reached end of content. Do you need a '~ return'?");
                    else if (!this.state.callStack.canPop)
                        this.AddError("ran out of content. Do you need a '-> DONE' or '-> END'?");
                    else
                        this.AddError("unexpectedly reached end of content for unknown reason. Please debug compiler!");
                }
            }
            this.state.didSafeExit = false;
            if (this._recursiveContinueCount == 1)
                this._state.variablesState.batchObservingVariableChanges = false;
            this._asyncContinueActive = false;
        }
        this._recursiveContinueCount--;
        if (this._profiler != null)
            this._profiler.PostContinue();
    }
    ContinueSingleStep() {
        if (this._profiler != null)
            this._profiler.PreStep();
        this.Step();
        if (this._profiler != null)
            this._profiler.PostStep();
        if (!this.canContinue && !this.state.callStack.elementIsEvaluateFromGame) {
            this.TryFollowDefaultInvisibleChoice();
        }
        if (this._profiler != null)
            this._profiler.PreSnapshot();
        if (!this.state.inStringEvaluation) {
            if (this._stateSnapshotAtLastNewline !== null) {
                if (this._stateSnapshotAtLastNewline.currentTags === null) {
                    return NullException_1.throwNullException("this._stateAtLastNewline.currentTags");
                }
                if (this.state.currentTags === null) {
                    return NullException_1.throwNullException("this.state.currentTags");
                }
                let change = this.CalculateNewlineOutputStateChange(this._stateSnapshotAtLastNewline.currentText, this.state.currentText, this._stateSnapshotAtLastNewline.currentTags.length, this.state.currentTags.length);
                if (change == Story.OutputStateChange.ExtendedBeyondNewline) {
                    this.RestoreStateSnapshot();
                    return true;
                }
                else if (change == Story.OutputStateChange.NewlineRemoved) {
                    this.DiscardSnapshot();
                }
            }
            if (this.state.outputStreamEndsInNewline) {
                if (this.canContinue) {
                    if (this._stateSnapshotAtLastNewline == null)
                        this.StateSnapshot();
                }
                else {
                    this.DiscardSnapshot();
                }
            }
        }
        if (this._profiler != null)
            this._profiler.PostSnapshot();
        return false;
    }
    CalculateNewlineOutputStateChange(prevText, currText, prevTagCount, currTagCount) {
        if (prevText === null) {
            return NullException_1.throwNullException("prevText");
        }
        if (currText === null) {
            return NullException_1.throwNullException("currText");
        }
        let newlineStillExists = currText.length >= prevText.length &&
            currText.charAt(prevText.length - 1) == "\n";
        if (prevTagCount == currTagCount &&
            prevText.length == currText.length &&
            newlineStillExists)
            return Story.OutputStateChange.NoChange;
        if (!newlineStillExists) {
            return Story.OutputStateChange.NewlineRemoved;
        }
        if (currTagCount > prevTagCount)
            return Story.OutputStateChange.ExtendedBeyondNewline;
        for (let i = prevText.length; i < currText.length; i++) {
            let c = currText.charAt(i);
            if (c != " " && c != "\t") {
                return Story.OutputStateChange.ExtendedBeyondNewline;
            }
        }
        return Story.OutputStateChange.NoChange;
    }
    ContinueMaximally() {
        this.IfAsyncWeCant("ContinueMaximally");
        let sb = new StringBuilder_1.StringBuilder();
        while (this.canContinue) {
            sb.Append(this.Continue());
        }
        return sb.toString();
    }
    ContentAtPath(path) {
        return this.mainContentContainer.ContentAtPath(path);
    }
    KnotContainerWithName(name) {
        let namedContainer = this.mainContentContainer.namedContent.get(name);
        if (namedContainer instanceof Container_1.Container)
            return namedContainer;
        else
            return null;
    }
    PointerAtPath(path) {
        if (path.length == 0)
            return Pointer_1.Pointer.Null;
        let p = new Pointer_1.Pointer();
        let pathLengthToUse = path.length;
        let result = null;
        if (path.lastComponent === null) {
            return NullException_1.throwNullException("path.lastComponent");
        }
        if (path.lastComponent.isIndex) {
            pathLengthToUse = path.length - 1;
            result = this.mainContentContainer.ContentAtPath(path, undefined, pathLengthToUse);
            p.container = result.container;
            p.index = path.lastComponent.index;
        }
        else {
            result = this.mainContentContainer.ContentAtPath(path);
            p.container = result.container;
            p.index = -1;
        }
        if (result.obj == null ||
            (result.obj == this.mainContentContainer && pathLengthToUse > 0)) {
            this.Error("Failed to find content at path '" +
                path +
                "', and no approximation of it was possible.");
        }
        else if (result.approximate)
            this.Warning("Failed to find content at path '" +
                path +
                "', so it was approximated to: '" +
                result.obj.path +
                "'.");
        return p;
    }
    StateSnapshot() {
        this._stateSnapshotAtLastNewline = this._state;
        this._state = this._state.CopyAndStartPatching();
    }
    RestoreStateSnapshot() {
        if (this._stateSnapshotAtLastNewline === null) {
            NullException_1.throwNullException("_stateSnapshotAtLastNewline");
        }
        this._stateSnapshotAtLastNewline.RestoreAfterPatch();
        this._state = this._stateSnapshotAtLastNewline;
        this._stateSnapshotAtLastNewline = null;
        if (!this._asyncSaving) {
            this._state.ApplyAnyPatch();
        }
    }
    DiscardSnapshot() {
        if (!this._asyncSaving)
            this._state.ApplyAnyPatch();
        this._stateSnapshotAtLastNewline = null;
    }
    CopyStateForBackgroundThreadSave() {
        this.IfAsyncWeCant("start saving on a background thread");
        if (this._asyncSaving)
            throw new Error("Story is already in background saving mode, can't call CopyStateForBackgroundThreadSave again!");
        let stateToSave = this._state;
        this._state = this._state.CopyAndStartPatching();
        this._asyncSaving = true;
        return stateToSave;
    }
    BackgroundSaveComplete() {
        if (this._stateSnapshotAtLastNewline === null) {
            this._state.ApplyAnyPatch();
        }
        this._asyncSaving = false;
    }
    Step() {
        let shouldAddToStream = true;
        let pointer = this.state.currentPointer.copy();
        if (pointer.isNull) {
            return;
        }
        // Container containerToEnter = pointer.Resolve () as Container;
        let containerToEnter = TypeAssertion_1.asOrNull(pointer.Resolve(), Container_1.Container);
        while (containerToEnter) {
            this.VisitContainer(containerToEnter, true);
            // No content? the most we can do is step past it
            if (containerToEnter.content.length == 0) {
                break;
            }
            pointer = Pointer_1.Pointer.StartOf(containerToEnter);
            // containerToEnter = pointer.Resolve() as Container;
            containerToEnter = TypeAssertion_1.asOrNull(pointer.Resolve(), Container_1.Container);
        }
        this.state.currentPointer = pointer.copy();
        if (this._profiler != null)
            this._profiler.Step(this.state.callStack);
        // Is the current content object:
        //  - Normal content
        //  - Or a logic/flow statement - if so, do it
        // Stop flow if we hit a stack pop when we're unable to pop (e.g. return/done statement in knot
        // that was diverted to rather than called as a function)
        let currentContentObj = pointer.Resolve();
        let isLogicOrFlowControl = this.PerformLogicAndFlowControl(currentContentObj);
        // Has flow been forced to end by flow control above?
        if (this.state.currentPointer.isNull) {
            return;
        }
        if (isLogicOrFlowControl) {
            shouldAddToStream = false;
        }
        // Choice with condition?
        // var choicePoint = currentContentObj as ChoicePoint;
        let choicePoint = TypeAssertion_1.asOrNull(currentContentObj, ChoicePoint_1.ChoicePoint);
        if (choicePoint) {
            let choice = this.ProcessChoice(choicePoint);
            if (choice) {
                this.state.generatedChoices.push(choice);
            }
            currentContentObj = null;
            shouldAddToStream = false;
        }
        // If the container has no content, then it will be
        // the "content" itself, but we skip over it.
        if (currentContentObj instanceof Container_1.Container) {
            shouldAddToStream = false;
        }
        // Content to add to evaluation stack or the output stream
        if (shouldAddToStream) {
            // If we're pushing a variable pointer onto the evaluation stack, ensure that it's specific
            // to our current (possibly temporary) context index. And make a copy of the pointer
            // so that we're not editing the original runtime object.
            // var varPointer = currentContentObj as VariablePointerValue;
            let varPointer = TypeAssertion_1.asOrNull(currentContentObj, Value_1.VariablePointerValue);
            if (varPointer && varPointer.contextIndex == -1) {
                // Create new object so we're not overwriting the story's own data
                let contextIdx = this.state.callStack.ContextForVariableNamed(varPointer.variableName);
                currentContentObj = new Value_1.VariablePointerValue(varPointer.variableName, contextIdx);
            }
            // Expression evaluation content
            if (this.state.inExpressionEvaluation) {
                this.state.PushEvaluationStack(currentContentObj);
            }
            // Output stream content (i.e. not expression evaluation)
            else {
                this.state.PushToOutputStream(currentContentObj);
            }
        }
        // Increment the content pointer, following diverts if necessary
        this.NextContent();
        // Starting a thread should be done after the increment to the content pointer,
        // so that when returning from the thread, it returns to the content after this instruction.
        // var controlCmd = currentContentObj as ;
        let controlCmd = TypeAssertion_1.asOrNull(currentContentObj, ControlCommand_1.ControlCommand);
        if (controlCmd &&
            controlCmd.commandType == ControlCommand_1.ControlCommand.CommandType.StartThread) {
            this.state.callStack.PushThread();
        }
    }
    VisitContainer(container, atStart) {
        if (!container.countingAtStartOnly || atStart) {
            if (container.visitsShouldBeCounted)
                this.state.IncrementVisitCountForContainer(container);
            if (container.turnIndexShouldBeCounted)
                this.state.RecordTurnIndexVisitToContainer(container);
        }
    }
    VisitChangedContainersDueToDivert() {
        let previousPointer = this.state.previousPointer.copy();
        let pointer = this.state.currentPointer.copy();
        if (pointer.isNull || pointer.index == -1)
            return;
        this._prevContainers.length = 0;
        if (!previousPointer.isNull) {
            // Container prevAncestor = previousPointer.Resolve() as Container ?? previousPointer.container as Container;
            let resolvedPreviousAncestor = previousPointer.Resolve();
            let prevAncestor = TypeAssertion_1.asOrNull(resolvedPreviousAncestor, Container_1.Container) ||
                TypeAssertion_1.asOrNull(previousPointer.container, Container_1.Container);
            while (prevAncestor) {
                this._prevContainers.push(prevAncestor);
                // prevAncestor = prevAncestor.parent as Container;
                prevAncestor = TypeAssertion_1.asOrNull(prevAncestor.parent, Container_1.Container);
            }
        }
        let currentChildOfContainer = pointer.Resolve();
        if (currentChildOfContainer == null)
            return;
        // Container currentContainerAncestor = currentChildOfContainer.parent as Container;
        let currentContainerAncestor = TypeAssertion_1.asOrNull(currentChildOfContainer.parent, Container_1.Container);
        while (currentContainerAncestor &&
            (this._prevContainers.indexOf(currentContainerAncestor) < 0 ||
                currentContainerAncestor.countingAtStartOnly)) {
            // Check whether this ancestor container is being entered at the start,
            // by checking whether the child object is the first.
            let enteringAtStart = currentContainerAncestor.content.length > 0 &&
                currentChildOfContainer == currentContainerAncestor.content[0];
            // Mark a visit to this container
            this.VisitContainer(currentContainerAncestor, enteringAtStart);
            currentChildOfContainer = currentContainerAncestor;
            // currentContainerAncestor = currentContainerAncestor.parent as Container;
            currentContainerAncestor = TypeAssertion_1.asOrNull(currentContainerAncestor.parent, Container_1.Container);
        }
    }
    ProcessChoice(choicePoint) {
        let showChoice = true;
        // Don't create choice if choice point doesn't pass conditional
        if (choicePoint.hasCondition) {
            let conditionValue = this.state.PopEvaluationStack();
            if (!this.IsTruthy(conditionValue)) {
                showChoice = false;
            }
        }
        let startText = "";
        let choiceOnlyText = "";
        if (choicePoint.hasChoiceOnlyContent) {
            // var choiceOnlyStrVal = state.PopEvaluationStack () as StringValue;
            let choiceOnlyStrVal = TypeAssertion_1.asOrThrows(this.state.PopEvaluationStack(), Value_1.StringValue);
            choiceOnlyText = choiceOnlyStrVal.value || "";
        }
        if (choicePoint.hasStartContent) {
            // var startStrVal = state.PopEvaluationStack () as StringValue;
            let startStrVal = TypeAssertion_1.asOrThrows(this.state.PopEvaluationStack(), Value_1.StringValue);
            startText = startStrVal.value || "";
        }
        // Don't create choice if player has already read this content
        if (choicePoint.onceOnly) {
            let visitCount = this.state.VisitCountForContainer(choicePoint.choiceTarget);
            if (visitCount > 0) {
                showChoice = false;
            }
        }
        // We go through the full process of creating the choice above so
        // that we consume the content for it, since otherwise it'll
        // be shown on the output stream.
        if (!showChoice) {
            return null;
        }
        let choice = new Choice_1.Choice();
        choice.targetPath = choicePoint.pathOnChoice;
        choice.sourcePath = choicePoint.path.toString();
        choice.isInvisibleDefault = choicePoint.isInvisibleDefault;
        choice.threadAtGeneration = this.state.callStack.ForkThread();
        choice.text = (startText + choiceOnlyText).replace(/^[ \t]+|[ \t]+$/g, "");
        return choice;
    }
    IsTruthy(obj) {
        let truthy = false;
        if (obj instanceof Value_1.Value) {
            let val = obj;
            if (val instanceof Value_1.DivertTargetValue) {
                let divTarget = val;
                this.Error("Shouldn't use a divert target (to " +
                    divTarget.targetPath +
                    ") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)");
                return false;
            }
            return val.isTruthy;
        }
        return truthy;
    }
    PerformLogicAndFlowControl(contentObj) {
        if (contentObj == null) {
            return false;
        }
        // Divert
        if (contentObj instanceof Divert_1.Divert) {
            let currentDivert = contentObj;
            if (currentDivert.isConditional) {
                let conditionValue = this.state.PopEvaluationStack();
                // False conditional? Cancel divert
                if (!this.IsTruthy(conditionValue))
                    return true;
            }
            if (currentDivert.hasVariableTarget) {
                let varName = currentDivert.variableDivertName;
                let varContents = this.state.variablesState.GetVariableWithName(varName);
                if (varContents == null) {
                    this.Error("Tried to divert using a target from a variable that could not be found (" +
                        varName +
                        ")");
                }
                else if (!(varContents instanceof Value_1.DivertTargetValue)) {
                    // var intContent = varContents as IntValue;
                    let intContent = TypeAssertion_1.asOrNull(varContents, Value_1.IntValue);
                    let errorMessage = "Tried to divert to a target from a variable, but the variable (" +
                        varName +
                        ") didn't contain a divert target, it ";
                    if (intContent instanceof Value_1.IntValue && intContent.value == 0) {
                        errorMessage += "was empty/null (the value 0).";
                    }
                    else {
                        errorMessage += "contained '" + varContents + "'.";
                    }
                    this.Error(errorMessage);
                }
                let target = TypeAssertion_1.asOrThrows(varContents, Value_1.DivertTargetValue);
                this.state.divertedPointer = this.PointerAtPath(target.targetPath);
            }
            else if (currentDivert.isExternal) {
                this.CallExternalFunction(currentDivert.targetPathString, currentDivert.externalArgs);
                return true;
            }
            else {
                this.state.divertedPointer = currentDivert.targetPointer.copy();
            }
            if (currentDivert.pushesToStack) {
                this.state.callStack.Push(currentDivert.stackPushType, undefined, this.state.outputStream.length);
            }
            if (this.state.divertedPointer.isNull && !currentDivert.isExternal) {
                if (currentDivert &&
                    currentDivert.debugMetadata &&
                    currentDivert.debugMetadata.sourceName != null) {
                    this.Error("Divert target doesn't exist: " +
                        currentDivert.debugMetadata.sourceName);
                }
                else {
                    this.Error("Divert resolution failed: " + currentDivert);
                }
            }
            return true;
        }
        // Start/end an expression evaluation? Or print out the result?
        else if (contentObj instanceof ControlCommand_1.ControlCommand) {
            let evalCommand = contentObj;
            switch (evalCommand.commandType) {
                case ControlCommand_1.ControlCommand.CommandType.EvalStart:
                    this.Assert(this.state.inExpressionEvaluation === false, "Already in expression evaluation?");
                    this.state.inExpressionEvaluation = true;
                    break;
                case ControlCommand_1.ControlCommand.CommandType.EvalEnd:
                    this.Assert(this.state.inExpressionEvaluation === true, "Not in expression evaluation mode");
                    this.state.inExpressionEvaluation = false;
                    break;
                case ControlCommand_1.ControlCommand.CommandType.EvalOutput:
                    // If the expression turned out to be empty, there may not be anything on the stack
                    if (this.state.evaluationStack.length > 0) {
                        let output = this.state.PopEvaluationStack();
                        // Functions may evaluate to Void, in which case we skip output
                        if (!(output instanceof Void_1.Void)) {
                            // TODO: Should we really always blanket convert to string?
                            // It would be okay to have numbers in the output stream the
                            // only problem is when exporting text for viewing, it skips over numbers etc.
                            let text = new Value_1.StringValue(output.toString());
                            this.state.PushToOutputStream(text);
                        }
                    }
                    break;
                case ControlCommand_1.ControlCommand.CommandType.NoOp:
                    break;
                case ControlCommand_1.ControlCommand.CommandType.Duplicate:
                    this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
                    break;
                case ControlCommand_1.ControlCommand.CommandType.PopEvaluatedValue:
                    this.state.PopEvaluationStack();
                    break;
                case ControlCommand_1.ControlCommand.CommandType.PopFunction:
                case ControlCommand_1.ControlCommand.CommandType.PopTunnel:
                    let popType = evalCommand.commandType == ControlCommand_1.ControlCommand.CommandType.PopFunction
                        ? PushPop_1.PushPopType.Function
                        : PushPop_1.PushPopType.Tunnel;
                    let overrideTunnelReturnTarget = null;
                    if (popType == PushPop_1.PushPopType.Tunnel) {
                        let popped = this.state.PopEvaluationStack();
                        // overrideTunnelReturnTarget = popped as DivertTargetValue;
                        overrideTunnelReturnTarget = TypeAssertion_1.asOrNull(popped, Value_1.DivertTargetValue);
                        if (overrideTunnelReturnTarget === null) {
                            this.Assert(popped instanceof Void_1.Void, "Expected void if ->-> doesn't override target");
                        }
                    }
                    if (this.state.TryExitFunctionEvaluationFromGame()) {
                        break;
                    }
                    else if (this.state.callStack.currentElement.type != popType ||
                        !this.state.callStack.canPop) {
                        let names = new Map();
                        names.set(PushPop_1.PushPopType.Function, "function return statement (~ return)");
                        names.set(PushPop_1.PushPopType.Tunnel, "tunnel onwards statement (->->)");
                        let expected = names.get(this.state.callStack.currentElement.type);
                        if (!this.state.callStack.canPop) {
                            expected = "end of flow (-> END or choice)";
                        }
                        let errorMsg = "Found " + names.get(popType) + ", when expected " + expected;
                        this.Error(errorMsg);
                    }
                    else {
                        this.state.PopCallStack();
                        if (overrideTunnelReturnTarget)
                            this.state.divertedPointer = this.PointerAtPath(overrideTunnelReturnTarget.targetPath);
                    }
                    break;
                case ControlCommand_1.ControlCommand.CommandType.BeginString:
                    this.state.PushToOutputStream(evalCommand);
                    this.Assert(this.state.inExpressionEvaluation === true, "Expected to be in an expression when evaluating a string");
                    this.state.inExpressionEvaluation = false;
                    break;
                case ControlCommand_1.ControlCommand.CommandType.EndString:
                    let contentStackForString = [];
                    let outputCountConsumed = 0;
                    for (let i = this.state.outputStream.length - 1; i >= 0; --i) {
                        let obj = this.state.outputStream[i];
                        outputCountConsumed++;
                        // var command = obj as ControlCommand;
                        let command = TypeAssertion_1.asOrNull(obj, ControlCommand_1.ControlCommand);
                        if (command &&
                            command.commandType == ControlCommand_1.ControlCommand.CommandType.BeginString) {
                            break;
                        }
                        if (obj instanceof Value_1.StringValue) {
                            contentStackForString.push(obj);
                        }
                    }
                    // Consume the content that was produced for this string
                    this.state.PopFromOutputStream(outputCountConsumed);
                    // The C# version uses a Stack for contentStackForString, but we're
                    // using a simple array, so we need to reverse it before using it
                    contentStackForString = contentStackForString.reverse();
                    // Build string out of the content we collected
                    let sb = new StringBuilder_1.StringBuilder();
                    for (let c of contentStackForString) {
                        sb.Append(c.toString());
                    }
                    // Return to expression evaluation (from content mode)
                    this.state.inExpressionEvaluation = true;
                    this.state.PushEvaluationStack(new Value_1.StringValue(sb.toString()));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.ChoiceCount:
                    let choiceCount = this.state.generatedChoices.length;
                    this.state.PushEvaluationStack(new Value_1.IntValue(choiceCount));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.Turns:
                    this.state.PushEvaluationStack(new Value_1.IntValue(this.state.currentTurnIndex + 1));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.TurnsSince:
                case ControlCommand_1.ControlCommand.CommandType.ReadCount:
                    let target = this.state.PopEvaluationStack();
                    if (!(target instanceof Value_1.DivertTargetValue)) {
                        let extraNote = "";
                        if (target instanceof Value_1.IntValue)
                            extraNote =
                                ". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?";
                        this.Error("TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw " +
                            target +
                            extraNote);
                        break;
                    }
                    // var divertTarget = target as DivertTargetValue;
                    let divertTarget = TypeAssertion_1.asOrThrows(target, Value_1.DivertTargetValue);
                    // var container = ContentAtPath (divertTarget.targetPath).correctObj as Container;
                    let container = TypeAssertion_1.asOrNull(this.ContentAtPath(divertTarget.targetPath).correctObj, Container_1.Container);
                    let eitherCount;
                    if (container != null) {
                        if (evalCommand.commandType == ControlCommand_1.ControlCommand.CommandType.TurnsSince)
                            eitherCount = this.state.TurnsSinceForContainer(container);
                        else
                            eitherCount = this.state.VisitCountForContainer(container);
                    }
                    else {
                        if (evalCommand.commandType == ControlCommand_1.ControlCommand.CommandType.TurnsSince)
                            eitherCount = -1;
                        else
                            eitherCount = 0;
                        this.Warning("Failed to find container for " +
                            evalCommand.toString() +
                            " lookup at " +
                            divertTarget.targetPath.toString());
                    }
                    this.state.PushEvaluationStack(new Value_1.IntValue(eitherCount));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.Random: {
                    let maxInt = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.IntValue);
                    let minInt = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.IntValue);
                    if (minInt == null || minInt instanceof Value_1.IntValue === false)
                        return this.Error("Invalid value for minimum parameter of RANDOM(min, max)");
                    if (maxInt == null || minInt instanceof Value_1.IntValue === false)
                        return this.Error("Invalid value for maximum parameter of RANDOM(min, max)");
                    // Originally a primitive type, but here, can be null.
                    // TODO: Replace by default value?
                    if (maxInt.value === null) {
                        return NullException_1.throwNullException("maxInt.value");
                    }
                    if (minInt.value === null) {
                        return NullException_1.throwNullException("minInt.value");
                    }
                    let randomRange = maxInt.value - minInt.value + 1;
                    if (randomRange <= 0)
                        this.Error("RANDOM was called with minimum as " +
                            minInt.value +
                            " and maximum as " +
                            maxInt.value +
                            ". The maximum must be larger");
                    let resultSeed = this.state.storySeed + this.state.previousRandom;
                    let random = new PRNG_1.PRNG(resultSeed);
                    let nextRandom = random.next();
                    let chosenValue = (nextRandom % randomRange) + minInt.value;
                    this.state.PushEvaluationStack(new Value_1.IntValue(chosenValue));
                    // Next random number (rather than keeping the Random object around)
                    this.state.previousRandom = nextRandom;
                    break;
                }
                case ControlCommand_1.ControlCommand.CommandType.SeedRandom:
                    let seed = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.IntValue);
                    if (seed == null || seed instanceof Value_1.IntValue === false)
                        return this.Error("Invalid value passed to SEED_RANDOM");
                    // Originally a primitive type, but here, can be null.
                    // TODO: Replace by default value?
                    if (seed.value === null) {
                        return NullException_1.throwNullException("minInt.value");
                    }
                    this.state.storySeed = seed.value;
                    this.state.previousRandom = 0;
                    this.state.PushEvaluationStack(new Void_1.Void());
                    break;
                case ControlCommand_1.ControlCommand.CommandType.VisitIndex:
                    let count = this.state.VisitCountForContainer(this.state.currentPointer.container) - 1; // index not count
                    this.state.PushEvaluationStack(new Value_1.IntValue(count));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.SequenceShuffleIndex:
                    let shuffleIndex = this.NextSequenceShuffleIndex();
                    this.state.PushEvaluationStack(new Value_1.IntValue(shuffleIndex));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.StartThread:
                    // Handled in main step function
                    break;
                case ControlCommand_1.ControlCommand.CommandType.Done:
                    // We may exist in the context of the initial
                    // act of creating the thread, or in the context of
                    // evaluating the content.
                    if (this.state.callStack.canPopThread) {
                        this.state.callStack.PopThread();
                    }
                    // In normal flow - allow safe exit without warning
                    else {
                        this.state.didSafeExit = true;
                        // Stop flow in current thread
                        this.state.currentPointer = Pointer_1.Pointer.Null;
                    }
                    break;
                // Force flow to end completely
                case ControlCommand_1.ControlCommand.CommandType.End:
                    this.state.ForceEnd();
                    break;
                case ControlCommand_1.ControlCommand.CommandType.ListFromInt:
                    // var intVal = state.PopEvaluationStack () as IntValue;
                    let intVal = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.IntValue);
                    // var listNameVal = state.PopEvaluationStack () as StringValue;
                    let listNameVal = TypeAssertion_1.asOrThrows(this.state.PopEvaluationStack(), Value_1.StringValue);
                    if (intVal === null) {
                        throw new StoryException_1.StoryException("Passed non-integer when creating a list element from a numerical value.");
                    }
                    let generatedListValue = null;
                    if (this.listDefinitions === null) {
                        return NullException_1.throwNullException("this.listDefinitions");
                    }
                    let foundListDef = this.listDefinitions.TryListGetDefinition(listNameVal.value, null);
                    if (foundListDef.exists) {
                        // Originally a primitive type, but here, can be null.
                        // TODO: Replace by default value?
                        if (intVal.value === null) {
                            return NullException_1.throwNullException("minInt.value");
                        }
                        let foundItem = foundListDef.result.TryGetItemWithValue(intVal.value, InkList_1.InkListItem.Null);
                        if (foundItem.exists) {
                            generatedListValue = new Value_1.ListValue(foundItem.result, intVal.value);
                        }
                    }
                    else {
                        throw new StoryException_1.StoryException("Failed to find LIST called " + listNameVal.value);
                    }
                    if (generatedListValue == null)
                        generatedListValue = new Value_1.ListValue();
                    this.state.PushEvaluationStack(generatedListValue);
                    break;
                case ControlCommand_1.ControlCommand.CommandType.ListRange:
                    let max = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.Value);
                    let min = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.Value);
                    // var targetList = state.PopEvaluationStack () as ListValue;
                    let targetList = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.ListValue);
                    if (targetList === null || min === null || max === null)
                        throw new StoryException_1.StoryException("Expected list, minimum and maximum for LIST_RANGE");
                    if (targetList.value === null) {
                        return NullException_1.throwNullException("targetList.value");
                    }
                    let result = targetList.value.ListWithSubRange(min.valueObject, max.valueObject);
                    this.state.PushEvaluationStack(new Value_1.ListValue(result));
                    break;
                case ControlCommand_1.ControlCommand.CommandType.ListRandom: {
                    let listVal = this.state.PopEvaluationStack();
                    if (listVal === null)
                        throw new StoryException_1.StoryException("Expected list for LIST_RANDOM");
                    let list = listVal.value;
                    let newList = null;
                    if (list === null) {
                        throw NullException_1.throwNullException("list");
                    }
                    if (list.Count == 0) {
                        newList = new InkList_1.InkList();
                    }
                    else {
                        // Generate a random index for the element to take
                        let resultSeed = this.state.storySeed + this.state.previousRandom;
                        let random = new PRNG_1.PRNG(resultSeed);
                        let nextRandom = random.next();
                        let listItemIndex = nextRandom % list.Count;
                        // This bit is a little different from the original
                        // C# code, since iterators do not work in the same way.
                        // First, we iterate listItemIndex - 1 times, calling next().
                        // The listItemIndex-th time is made outside of the loop,
                        // in order to retrieve the value.
                        let listEnumerator = list.entries();
                        for (let i = 0; i <= listItemIndex - 1; i++) {
                            listEnumerator.next();
                        }
                        let value = listEnumerator.next().value;
                        let randomItem = {
                            Key: InkList_1.InkListItem.fromSerializedKey(value[0]),
                            Value: value[1],
                        };
                        // Origin list is simply the origin of the one element
                        if (randomItem.Key.originName === null) {
                            return NullException_1.throwNullException("randomItem.Key.originName");
                        }
                        newList = new InkList_1.InkList(randomItem.Key.originName, this);
                        newList.Add(randomItem.Key, randomItem.Value);
                        this.state.previousRandom = nextRandom;
                    }
                    this.state.PushEvaluationStack(new Value_1.ListValue(newList));
                    break;
                }
                default:
                    this.Error("unhandled ControlCommand: " + evalCommand);
                    break;
            }
            return true;
        }
        // Variable assignment
        else if (contentObj instanceof VariableAssignment_1.VariableAssignment) {
            let varAss = contentObj;
            let assignedVal = this.state.PopEvaluationStack();
            this.state.variablesState.Assign(varAss, assignedVal);
            return true;
        }
        // Variable reference
        else if (contentObj instanceof VariableReference_1.VariableReference) {
            let varRef = contentObj;
            let foundValue = null;
            // Explicit read count value
            if (varRef.pathForCount != null) {
                let container = varRef.containerForCount;
                let count = this.state.VisitCountForContainer(container);
                foundValue = new Value_1.IntValue(count);
            }
            // Normal variable reference
            else {
                foundValue = this.state.variablesState.GetVariableWithName(varRef.name);
                if (foundValue == null) {
                    this.Warning("Variable not found: '" +
                        varRef.name +
                        "'. Using default value of 0 (false). This can happen with temporary variables if the declaration hasn't yet been hit. Globals are always given a default value on load if a value doesn't exist in the save state.");
                    foundValue = new Value_1.IntValue(0);
                }
            }
            this.state.PushEvaluationStack(foundValue);
            return true;
        }
        // Native function call
        else if (contentObj instanceof NativeFunctionCall_1.NativeFunctionCall) {
            let func = contentObj;
            let funcParams = this.state.PopEvaluationStack(func.numberOfParameters);
            let result = func.Call(funcParams);
            this.state.PushEvaluationStack(result);
            return true;
        }
        // No control content, must be ordinary content
        return false;
    }
    ChoosePathString(path, resetCallstack = true, args = []) {
        this.IfAsyncWeCant("call ChoosePathString right now");
        if (resetCallstack) {
            this.ResetCallstack();
        }
        else {
            if (this.state.callStack.currentElement.type == PushPop_1.PushPopType.Function) {
                let funcDetail = "";
                let container = this.state.callStack.currentElement.currentPointer
                    .container;
                if (container != null) {
                    funcDetail = "(" + container.path.toString() + ") ";
                }
                throw new Error("Story was running a function " +
                    funcDetail +
                    "when you called ChoosePathString(" +
                    path +
                    ") - this is almost certainly not not what you want! Full stack trace: \n" +
                    this.state.callStack.callStackTrace);
            }
        }
        this.state.PassArgumentsToEvaluationStack(args);
        this.ChoosePath(new Path_1.Path(path));
    }
    IfAsyncWeCant(activityStr) {
        if (this._asyncContinueActive)
            throw new Error("Can't " +
                activityStr +
                ". Story is in the middle of a ContinueAsync(). Make more ContinueAsync() calls or a single Continue() call beforehand.");
    }
    ChoosePath(p, incrementingTurnIndex = true) {
        this.state.SetChosenPath(p, incrementingTurnIndex);
        // Take a note of newly visited containers for read counts etc
        this.VisitChangedContainersDueToDivert();
    }
    ChooseChoiceIndex(choiceIdx) {
        choiceIdx = choiceIdx;
        let choices = this.currentChoices;
        this.Assert(choiceIdx >= 0 && choiceIdx < choices.length, "choice out of range");
        let choiceToChoose = choices[choiceIdx];
        if (choiceToChoose.threadAtGeneration === null) {
            return NullException_1.throwNullException("choiceToChoose.threadAtGeneration");
        }
        if (choiceToChoose.targetPath === null) {
            return NullException_1.throwNullException("choiceToChoose.targetPath");
        }
        this.state.callStack.currentThread = choiceToChoose.threadAtGeneration;
        this.ChoosePath(choiceToChoose.targetPath);
    }
    HasFunction(functionName) {
        try {
            return this.KnotContainerWithName(functionName) != null;
        }
        catch (e) {
            return false;
        }
    }
    EvaluateFunction(functionName, args = [], returnTextOutput = false) {
        // EvaluateFunction behaves slightly differently than the C# version.
        // In C#, you can pass a (second) parameter `out textOutput` to get the
        // text outputted by the function. This is not possible in js. Instead,
        // we maintain the regular signature (functionName, args), plus an
        // optional third parameter returnTextOutput. If set to true, we will
        // return both the textOutput and the returned value, as an object.
        this.IfAsyncWeCant("evaluate a function");
        if (functionName == null) {
            throw new Error("Function is null");
        }
        else if (functionName == "" || functionName.trim() == "") {
            throw new Error("Function is empty or white space.");
        }
        let funcContainer = this.KnotContainerWithName(functionName);
        if (funcContainer == null) {
            throw new Error("Function doesn't exist: '" + functionName + "'");
        }
        let outputStreamBefore = [];
        outputStreamBefore.push.apply(outputStreamBefore, this.state.outputStream);
        this._state.ResetOutput();
        this.state.StartFunctionEvaluationFromGame(funcContainer, args);
        // Evaluate the function, and collect the string output
        let stringOutput = new StringBuilder_1.StringBuilder();
        while (this.canContinue) {
            stringOutput.Append(this.Continue());
        }
        let textOutput = stringOutput.toString();
        this._state.ResetOutput(outputStreamBefore);
        let result = this.state.CompleteFunctionEvaluationFromGame();
        return returnTextOutput ? { returned: result, output: textOutput } : result;
    }
    EvaluateExpression(exprContainer) {
        let startCallStackHeight = this.state.callStack.elements.length;
        this.state.callStack.Push(PushPop_1.PushPopType.Tunnel);
        this._temporaryEvaluationContainer = exprContainer;
        this.state.GoToStart();
        let evalStackHeight = this.state.evaluationStack.length;
        this.Continue();
        this._temporaryEvaluationContainer = null;
        // Should have fallen off the end of the Container, which should
        // have auto-popped, but just in case we didn't for some reason,
        // manually pop to restore the state (including currentPath).
        if (this.state.callStack.elements.length > startCallStackHeight) {
            this.state.PopCallStack();
        }
        let endStackHeight = this.state.evaluationStack.length;
        if (endStackHeight > evalStackHeight) {
            return this.state.PopEvaluationStack();
        }
        else {
            return null;
        }
    }
    CallExternalFunction(funcName, numberOfArguments) {
        if (funcName === null) {
            return NullException_1.throwNullException("funcName");
        }
        let func = this._externals.get(funcName);
        let fallbackFunctionContainer = null;
        let foundExternal = typeof func !== "undefined";
        // Try to use fallback function?
        if (!foundExternal) {
            if (this.allowExternalFunctionFallbacks) {
                fallbackFunctionContainer = this.KnotContainerWithName(funcName);
                this.Assert(fallbackFunctionContainer !== null, "Trying to call EXTERNAL function '" +
                    funcName +
                    "' which has not been bound, and fallback ink function could not be found.");
                // Divert direct into fallback function and we're done
                this.state.callStack.Push(PushPop_1.PushPopType.Function, undefined, this.state.outputStream.length);
                this.state.divertedPointer = Pointer_1.Pointer.StartOf(fallbackFunctionContainer);
                return;
            }
            else {
                this.Assert(false, "Trying to call EXTERNAL function '" +
                    funcName +
                    "' which has not been bound (and ink fallbacks disabled).");
            }
        }
        // Pop arguments
        let args = [];
        for (let i = 0; i < numberOfArguments; ++i) {
            // var poppedObj = state.PopEvaluationStack () as Value;
            let poppedObj = TypeAssertion_1.asOrThrows(this.state.PopEvaluationStack(), Value_1.Value);
            let valueObj = poppedObj.valueObject;
            args.push(valueObj);
        }
        // Reverse arguments from the order they were popped,
        // so they're the right way round again.
        args.reverse();
        // Run the function!
        let funcResult = func(args);
        // Convert return value (if any) to the a type that the ink engine can use
        let returnObj = null;
        if (funcResult != null) {
            returnObj = Value_1.Value.Create(funcResult);
            this.Assert(returnObj !== null, "Could not create ink value from returned object of type " +
                typeof funcResult);
        }
        else {
            returnObj = new Void_1.Void();
        }
        this.state.PushEvaluationStack(returnObj);
    }
    BindExternalFunctionGeneral(funcName, func) {
        this.IfAsyncWeCant("bind an external function");
        this.Assert(!this._externals.has(funcName), "Function '" + funcName + "' has already been bound.");
        this._externals.set(funcName, func);
    }
    TryCoerce(value) {
        // We're skipping type coercition in this implementation. First of, js
        // is loosely typed, so it's not that important. Secondly, there is no
        // clean way (AFAIK) for the user to describe what type of parameters
        // they expect.
        return value;
    }
    BindExternalFunction(funcName, func) {
        this.Assert(func != null, "Can't bind a null function");
        this.BindExternalFunctionGeneral(funcName, (args) => {
            this.Assert(args.length >= func.length, "External function expected " + func.length + " arguments");
            let coercedArgs = [];
            for (let i = 0, l = args.length; i < l; i++) {
                coercedArgs[i] = this.TryCoerce(args[i]);
            }
            return func.apply(null, coercedArgs);
        });
    }
    UnbindExternalFunction(funcName) {
        this.IfAsyncWeCant("unbind an external a function");
        this.Assert(this._externals.has(funcName), "Function '" + funcName + "' has not been bound.");
        this._externals.delete(funcName);
    }
    ValidateExternalBindings() {
        let c = null;
        let o = null;
        let missingExternals = arguments[1] || new Set();
        if (arguments[0] instanceof Container_1.Container) {
            c = arguments[0];
        }
        if (arguments[0] instanceof Object_1.InkObject) {
            o = arguments[0];
        }
        if (c === null && o === null) {
            this.ValidateExternalBindings(this._mainContentContainer, missingExternals);
            this._hasValidatedExternals = true;
            // No problem! Validation complete
            if (missingExternals.size == 0) {
                this._hasValidatedExternals = true;
            }
            else {
                let message = "Error: Missing function binding for external";
                message += missingExternals.size > 1 ? "s" : "";
                message += ": '";
                message += Array.from(missingExternals).join("', '");
                message += "' ";
                message += this.allowExternalFunctionFallbacks
                    ? ", and no fallback ink function found."
                    : " (ink fallbacks disabled)";
                this.Error(message);
            }
        }
        else if (c != null) {
            for (let innerContent of c.content) {
                let container = innerContent;
                if (container == null || !container.hasValidName)
                    this.ValidateExternalBindings(innerContent, missingExternals);
            }
            for (let [, value] of c.namedContent) {
                this.ValidateExternalBindings(TypeAssertion_1.asOrNull(value, Object_1.InkObject), missingExternals);
            }
        }
        else if (o != null) {
            let divert = TypeAssertion_1.asOrNull(o, Divert_1.Divert);
            if (divert && divert.isExternal) {
                let name = divert.targetPathString;
                if (name === null) {
                    return NullException_1.throwNullException("name");
                }
                if (!this._externals.has(name)) {
                    if (this.allowExternalFunctionFallbacks) {
                        let fallbackFound = this.mainContentContainer.namedContent.has(name);
                        if (!fallbackFound) {
                            missingExternals.add(name);
                        }
                    }
                    else {
                        missingExternals.add(name);
                    }
                }
            }
        }
    }
    ObserveVariable(variableName, observer) {
        this.IfAsyncWeCant("observe a new variable");
        if (this._variableObservers === null)
            this._variableObservers = new Map();
        if (!this.state.variablesState.GlobalVariableExistsWithName(variableName))
            throw new StoryException_1.StoryException("Cannot observe variable '" +
                variableName +
                "' because it wasn't declared in the ink story.");
        if (this._variableObservers.has(variableName)) {
            this._variableObservers.get(variableName).push(observer);
        }
        else {
            this._variableObservers.set(variableName, [observer]);
        }
    }
    ObserveVariables(variableNames, observers) {
        for (let i = 0, l = variableNames.length; i < l; i++) {
            this.ObserveVariable(variableNames[i], observers[i]);
        }
    }
    RemoveVariableObserver(observer, specificVariableName) {
        this.IfAsyncWeCant("remove a variable observer");
        if (this._variableObservers === null)
            return;
        if (typeof specificVariableName !== "undefined") {
            if (this._variableObservers.has(specificVariableName)) {
                let observers = this._variableObservers.get(specificVariableName);
                if (observer !== null) {
                    observers.splice(observers.indexOf(observer), 1);
                }
                else {
                    this._variableObservers.delete(specificVariableName);
                }
            }
        }
        else if (observer !== null) {
            let keys = this._variableObservers.keys();
            for (let varName of keys) {
                let observers = this._variableObservers.get(varName);
                observers.splice(observers.indexOf(observer), 1);
            }
        }
    }
    VariableStateDidChangeEvent(variableName, newValueObj) {
        if (this._variableObservers === null)
            return;
        let observers = this._variableObservers.get(variableName);
        if (typeof observers !== "undefined") {
            if (!(newValueObj instanceof Value_1.Value)) {
                throw new Error("Tried to get the value of a variable that isn't a standard type");
            }
            // var val = newValueObj as Value;
            let val = TypeAssertion_1.asOrThrows(newValueObj, Value_1.Value);
            for (let observer of observers) {
                observer(variableName, val.valueObject);
            }
        }
    }
    get globalTags() {
        return this.TagsAtStartOfFlowContainerWithPathString("");
    }
    TagsForContentAtPath(path) {
        return this.TagsAtStartOfFlowContainerWithPathString(path);
    }
    TagsAtStartOfFlowContainerWithPathString(pathString) {
        let path = new Path_1.Path(pathString);
        let flowContainer = this.ContentAtPath(path).container;
        if (flowContainer === null) {
            return NullException_1.throwNullException("flowContainer");
        }
        while (true) {
            let firstContent = flowContainer.content[0];
            if (firstContent instanceof Container_1.Container)
                flowContainer = firstContent;
            else
                break;
        }
        let tags = null;
        for (let c of flowContainer.content) {
            // var tag = c as Runtime.Tag;
            let tag = TypeAssertion_1.asOrNull(c, Tag_1.Tag);
            if (tag) {
                if (tags == null)
                    tags = [];
                tags.push(tag.text);
            }
            else
                break;
        }
        return tags;
    }
    BuildStringOfHierarchy() {
        let sb = new StringBuilder_1.StringBuilder();
        this.mainContentContainer.BuildStringOfHierarchy(sb, 0, this.state.currentPointer.Resolve());
        return sb.toString();
    }
    BuildStringOfContainer(container) {
        let sb = new StringBuilder_1.StringBuilder();
        container.BuildStringOfHierarchy(sb, 0, this.state.currentPointer.Resolve());
        return sb.toString();
    }
    NextContent() {
        this.state.previousPointer = this.state.currentPointer.copy();
        if (!this.state.divertedPointer.isNull) {
            this.state.currentPointer = this.state.divertedPointer.copy();
            this.state.divertedPointer = Pointer_1.Pointer.Null;
            this.VisitChangedContainersDueToDivert();
            if (!this.state.currentPointer.isNull) {
                return;
            }
        }
        let successfulPointerIncrement = this.IncrementContentPointer();
        if (!successfulPointerIncrement) {
            let didPop = false;
            if (this.state.callStack.CanPop(PushPop_1.PushPopType.Function)) {
                this.state.PopCallStack(PushPop_1.PushPopType.Function);
                if (this.state.inExpressionEvaluation) {
                    this.state.PushEvaluationStack(new Void_1.Void());
                }
                didPop = true;
            }
            else if (this.state.callStack.canPopThread) {
                this.state.callStack.PopThread();
                didPop = true;
            }
            else {
                this.state.TryExitFunctionEvaluationFromGame();
            }
            if (didPop && !this.state.currentPointer.isNull) {
                this.NextContent();
            }
        }
    }
    IncrementContentPointer() {
        let successfulIncrement = true;
        let pointer = this.state.callStack.currentElement.currentPointer.copy();
        pointer.index++;
        if (pointer.container === null) {
            return NullException_1.throwNullException("pointer.container");
        }
        while (pointer.index >= pointer.container.content.length) {
            successfulIncrement = false;
            // Container nextAncestor = pointer.container.parent as Container;
            let nextAncestor = TypeAssertion_1.asOrNull(pointer.container.parent, Container_1.Container);
            if (nextAncestor instanceof Container_1.Container === false) {
                break;
            }
            let indexInAncestor = nextAncestor.content.indexOf(pointer.container);
            if (indexInAncestor == -1) {
                break;
            }
            pointer = new Pointer_1.Pointer(nextAncestor, indexInAncestor);
            pointer.index++;
            successfulIncrement = true;
            if (pointer.container === null) {
                return NullException_1.throwNullException("pointer.container");
            }
        }
        if (!successfulIncrement)
            pointer = Pointer_1.Pointer.Null;
        this.state.callStack.currentElement.currentPointer = pointer.copy();
        return successfulIncrement;
    }
    TryFollowDefaultInvisibleChoice() {
        let allChoices = this._state.currentChoices;
        let invisibleChoices = allChoices.filter((c) => c.isInvisibleDefault);
        if (invisibleChoices.length == 0 ||
            allChoices.length > invisibleChoices.length)
            return false;
        let choice = invisibleChoices[0];
        if (choice.targetPath === null) {
            return NullException_1.throwNullException("choice.targetPath");
        }
        if (choice.threadAtGeneration === null) {
            return NullException_1.throwNullException("choice.threadAtGeneration");
        }
        this.state.callStack.currentThread = choice.threadAtGeneration;
        this.ChoosePath(choice.targetPath, false);
        return true;
    }
    NextSequenceShuffleIndex() {
        // var numElementsIntVal = state.PopEvaluationStack () as IntValue;
        let numElementsIntVal = TypeAssertion_1.asOrNull(this.state.PopEvaluationStack(), Value_1.IntValue);
        if (!(numElementsIntVal instanceof Value_1.IntValue)) {
            this.Error("expected number of elements in sequence for shuffle index");
            return 0;
        }
        let seqContainer = this.state.currentPointer.container;
        if (seqContainer === null) {
            return NullException_1.throwNullException("seqContainer");
        }
        // Originally a primitive type, but here, can be null.
        // TODO: Replace by default value?
        if (numElementsIntVal.value === null) {
            return NullException_1.throwNullException("numElementsIntVal.value");
        }
        let numElements = numElementsIntVal.value;
        // var seqCountVal = state.PopEvaluationStack () as IntValue;
        let seqCountVal = TypeAssertion_1.asOrThrows(this.state.PopEvaluationStack(), Value_1.IntValue);
        let seqCount = seqCountVal.value;
        // Originally a primitive type, but here, can be null.
        // TODO: Replace by default value?
        if (seqCount === null) {
            return NullException_1.throwNullException("seqCount");
        }
        let loopIndex = seqCount / numElements;
        let iterationIndex = seqCount % numElements;
        let seqPathStr = seqContainer.path.toString();
        let sequenceHash = 0;
        for (let i = 0, l = seqPathStr.length; i < l; i++) {
            sequenceHash += seqPathStr.charCodeAt(i) || 0;
        }
        let randomSeed = sequenceHash + loopIndex + this.state.storySeed;
        let random = new PRNG_1.PRNG(Math.floor(randomSeed));
        let unpickedIndices = [];
        for (let i = 0; i < numElements; ++i) {
            unpickedIndices.push(i);
        }
        for (let i = 0; i <= iterationIndex; ++i) {
            let chosen = random.next() % unpickedIndices.length;
            let chosenIndex = unpickedIndices[chosen];
            unpickedIndices.splice(chosen, 1);
            if (i == iterationIndex) {
                return chosenIndex;
            }
        }
        throw new Error("Should never reach here");
    }
    Error(message, useEndLineNumber = false) {
        let e = new StoryException_1.StoryException(message);
        e.useEndLineNumber = useEndLineNumber;
        throw e;
    }
    Warning(message) {
        this.AddError(message, true);
    }
    AddError(message, isWarning = false, useEndLineNumber = false) {
        let dm = this.currentDebugMetadata;
        let errorTypeStr = isWarning ? "WARNING" : "ERROR";
        if (dm != null) {
            let lineNum = useEndLineNumber ? dm.endLineNumber : dm.startLineNumber;
            message =
                "RUNTIME " +
                    errorTypeStr +
                    ": '" +
                    dm.fileName +
                    "' line " +
                    lineNum +
                    ": " +
                    message;
        }
        else if (!this.state.currentPointer.isNull) {
            message =
                "RUNTIME " +
                    errorTypeStr +
                    ": (" +
                    this.state.currentPointer +
                    "): " +
                    message;
        }
        else {
            message = "RUNTIME " + errorTypeStr + ": " + message;
        }
        this.state.AddError(message, isWarning);
        // In a broken state don't need to know about any other errors.
        if (!isWarning)
            this.state.ForceEnd();
    }
    Assert(condition, message = null) {
        if (condition == false) {
            if (message == null) {
                message = "Story assert";
            }
            throw new Error(message + " " + this.currentDebugMetadata);
        }
    }
    get currentDebugMetadata() {
        let dm;
        let pointer = this.state.currentPointer;
        if (!pointer.isNull && pointer.Resolve() !== null) {
            dm = pointer.Resolve().debugMetadata;
            if (dm !== null) {
                return dm;
            }
        }
        for (let i = this.state.callStack.elements.length - 1; i >= 0; --i) {
            pointer = this.state.callStack.elements[i].currentPointer;
            if (!pointer.isNull && pointer.Resolve() !== null) {
                dm = pointer.Resolve().debugMetadata;
                if (dm !== null) {
                    return dm;
                }
            }
        }
        for (let i = this.state.outputStream.length - 1; i >= 0; --i) {
            let outputObj = this.state.outputStream[i];
            dm = outputObj.debugMetadata;
            if (dm !== null) {
                return dm;
            }
        }
        return null;
    }
    get mainContentContainer() {
        if (this._temporaryEvaluationContainer) {
            return this._temporaryEvaluationContainer;
        }
        else {
            return this._mainContentContainer;
        }
    }
}
exports.Story = Story;
Story.inkVersionCurrent = 19;
(function (Story) {
    let OutputStateChange;
    (function (OutputStateChange) {
        OutputStateChange[OutputStateChange["NoChange"] = 0] = "NoChange";
        OutputStateChange[OutputStateChange["ExtendedBeyondNewline"] = 1] = "ExtendedBeyondNewline";
        OutputStateChange[OutputStateChange["NewlineRemoved"] = 2] = "NewlineRemoved";
    })(OutputStateChange = Story.OutputStateChange || (Story.OutputStateChange = {}));
})(Story = exports.Story || (exports.Story = {}));
//# sourceMappingURL=Story.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/StoryException.js":
/*!*****************************************************!*\
  !*** ./node_modules/inkjs/engine/StoryException.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryException = void 0;
class StoryException extends Error {
    constructor(message) {
        super(message);
        this.useEndLineNumber = false;
        this.message = message;
        this.name = "StoryException";
    }
}
exports.StoryException = StoryException;
//# sourceMappingURL=StoryException.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/StoryState.js":
/*!*************************************************!*\
  !*** ./node_modules/inkjs/engine/StoryState.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryState = void 0;
const CallStack_1 = __webpack_require__(/*! ./CallStack */ "./node_modules/inkjs/engine/CallStack.js");
const VariablesState_1 = __webpack_require__(/*! ./VariablesState */ "./node_modules/inkjs/engine/VariablesState.js");
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const PushPop_1 = __webpack_require__(/*! ./PushPop */ "./node_modules/inkjs/engine/PushPop.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/inkjs/engine/Tag.js");
const Glue_1 = __webpack_require__(/*! ./Glue */ "./node_modules/inkjs/engine/Glue.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const ControlCommand_1 = __webpack_require__(/*! ./ControlCommand */ "./node_modules/inkjs/engine/ControlCommand.js");
const StoryException_1 = __webpack_require__(/*! ./StoryException */ "./node_modules/inkjs/engine/StoryException.js");
const StringBuilder_1 = __webpack_require__(/*! ./StringBuilder */ "./node_modules/inkjs/engine/StringBuilder.js");
const JsonSerialisation_1 = __webpack_require__(/*! ./JsonSerialisation */ "./node_modules/inkjs/engine/JsonSerialisation.js");
const PRNG_1 = __webpack_require__(/*! ./PRNG */ "./node_modules/inkjs/engine/PRNG.js");
const Void_1 = __webpack_require__(/*! ./Void */ "./node_modules/inkjs/engine/Void.js");
const Pointer_1 = __webpack_require__(/*! ./Pointer */ "./node_modules/inkjs/engine/Pointer.js");
const TryGetResult_1 = __webpack_require__(/*! ./TryGetResult */ "./node_modules/inkjs/engine/TryGetResult.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const Debug_1 = __webpack_require__(/*! ./Debug */ "./node_modules/inkjs/engine/Debug.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
const Story_1 = __webpack_require__(/*! ./Story */ "./node_modules/inkjs/engine/Story.js");
const StatePatch_1 = __webpack_require__(/*! ./StatePatch */ "./node_modules/inkjs/engine/StatePatch.js");
const SimpleJson_1 = __webpack_require__(/*! ./SimpleJson */ "./node_modules/inkjs/engine/SimpleJson.js");
class StoryState {
    constructor(story) {
        this.kInkSaveStateVersion = 8;
        this.kMinCompatibleLoadVersion = 8;
        this._currentErrors = null;
        this._currentWarnings = null;
        this.divertedPointer = Pointer_1.Pointer.Null;
        this._currentTurnIndex = 0;
        this.storySeed = 0;
        this.previousRandom = 0;
        this.didSafeExit = false;
        this._currentText = null;
        this._currentTags = null;
        this._outputStreamTextDirty = true;
        this._outputStreamTagsDirty = true;
        this._patch = null;
        this.story = story;
        this._outputStream = [];
        this.OutputStreamDirty();
        this._evaluationStack = [];
        this.callStack = new CallStack_1.CallStack(story);
        this._variablesState = new VariablesState_1.VariablesState(this.callStack, story.listDefinitions);
        this._visitCounts = new Map();
        this._turnIndices = new Map();
        this.currentTurnIndex = -1;
        let timeSeed = new Date().getTime();
        this.storySeed = new PRNG_1.PRNG(timeSeed).next() % 100;
        this.previousRandom = 0;
        this._currentChoices = [];
        this.GoToStart();
    }
    ToJson(indented = false) {
        let writer = new SimpleJson_1.SimpleJson.Writer();
        this.WriteJson(writer);
        return writer.ToString();
    }
    toJson(indented = false) {
        return this.ToJson(indented);
    }
    LoadJson(json) {
        let jObject = SimpleJson_1.SimpleJson.TextToDictionary(json);
        this.LoadJsonObj(jObject);
    }
    VisitCountAtPathString(pathString) {
        let visitCountOut;
        if (this._patch !== null) {
            let container = this.story.ContentAtPath(new Path_1.Path(pathString)).container;
            if (container === null)
                throw new Error("Content at path not found: " + pathString);
            visitCountOut = this._patch.TryGetVisitCount(container, 0);
            if (visitCountOut.exists)
                return visitCountOut.result;
        }
        visitCountOut = TryGetResult_1.tryGetValueFromMap(this._visitCounts, pathString, null);
        if (visitCountOut.exists)
            return visitCountOut.result;
        return 0;
    }
    VisitCountForContainer(container) {
        if (container === null) {
            return NullException_1.throwNullException("container");
        }
        if (!container.visitsShouldBeCounted) {
            this.story.Error("Read count for target (" +
                container.name +
                " - on " +
                container.debugMetadata +
                ") unknown. The story may need to be compiled with countAllVisits flag (-c).");
            return 0;
        }
        if (this._patch !== null) {
            let count = this._patch.TryGetVisitCount(container, 0);
            if (count.exists) {
                return count.result;
            }
        }
        let containerPathStr = container.path.toString();
        let count2 = TryGetResult_1.tryGetValueFromMap(this._visitCounts, containerPathStr, null);
        if (count2.exists) {
            return count2.result;
        }
        return 0;
    }
    IncrementVisitCountForContainer(container) {
        if (this._patch !== null) {
            let currCount = this.VisitCountForContainer(container);
            currCount++;
            this._patch.SetVisitCount(container, currCount);
            return;
        }
        let containerPathStr = container.path.toString();
        let count = TryGetResult_1.tryGetValueFromMap(this._visitCounts, containerPathStr, null);
        if (count.exists) {
            this._visitCounts.set(containerPathStr, count.result + 1);
        }
        else {
            this._visitCounts.set(containerPathStr, 1);
        }
    }
    RecordTurnIndexVisitToContainer(container) {
        if (this._patch !== null) {
            this._patch.SetTurnIndex(container, this.currentTurnIndex);
            return;
        }
        let containerPathStr = container.path.toString();
        this._turnIndices.set(containerPathStr, this.currentTurnIndex);
    }
    TurnsSinceForContainer(container) {
        if (!container.turnIndexShouldBeCounted) {
            this.story.Error("TURNS_SINCE() for target (" +
                container.name +
                " - on " +
                container.debugMetadata +
                ") unknown. The story may need to be compiled with countAllVisits flag (-c).");
        }
        if (this._patch !== null) {
            let index = this._patch.TryGetTurnIndex(container, 0);
            if (index.exists) {
                return this.currentTurnIndex - index.result;
            }
        }
        let containerPathStr = container.path.toString();
        let index2 = TryGetResult_1.tryGetValueFromMap(this._turnIndices, containerPathStr, 0);
        if (index2.exists) {
            return this.currentTurnIndex - index2.result;
        }
        else {
            return -1;
        }
    }
    get callstackDepth() {
        return this.callStack.depth;
    }
    get outputStream() {
        return this._outputStream;
    }
    get currentChoices() {
        // If we can continue generating text content rather than choices,
        // then we reflect the choice list as being empty, since choices
        // should always come at the end.
        if (this.canContinue)
            return [];
        return this._currentChoices;
    }
    get generatedChoices() {
        return this._currentChoices;
    }
    get currentErrors() {
        return this._currentErrors;
    }
    get currentWarnings() {
        return this._currentWarnings;
    }
    get variablesState() {
        return this._variablesState;
    }
    set variablesState(value) {
        this._variablesState = value;
    }
    get evaluationStack() {
        return this._evaluationStack;
    }
    get visitCounts() {
        return this._visitCounts;
    }
    get turnIndices() {
        return this._turnIndices;
    }
    get currentTurnIndex() {
        return this._currentTurnIndex;
    }
    set currentTurnIndex(value) {
        this._currentTurnIndex = value;
    }
    get currentPathString() {
        let pointer = this.currentPointer;
        if (pointer.isNull) {
            return null;
        }
        else {
            if (pointer.path === null) {
                return NullException_1.throwNullException("pointer.path");
            }
            return pointer.path.toString();
        }
    }
    get currentPointer() {
        return this.callStack.currentElement.currentPointer.copy();
    }
    set currentPointer(value) {
        this.callStack.currentElement.currentPointer = value.copy();
    }
    get previousPointer() {
        return this.callStack.currentThread.previousPointer.copy();
    }
    set previousPointer(value) {
        this.callStack.currentThread.previousPointer = value.copy();
    }
    get canContinue() {
        return !this.currentPointer.isNull && !this.hasError;
    }
    get hasError() {
        return this.currentErrors != null && this.currentErrors.length > 0;
    }
    get hasWarning() {
        return this.currentWarnings != null && this.currentWarnings.length > 0;
    }
    get currentText() {
        if (this._outputStreamTextDirty) {
            let sb = new StringBuilder_1.StringBuilder();
            for (let outputObj of this._outputStream) {
                // var textContent = outputObj as StringValue;
                let textContent = TypeAssertion_1.asOrNull(outputObj, Value_1.StringValue);
                if (textContent !== null) {
                    sb.Append(textContent.value);
                }
            }
            this._currentText = this.CleanOutputWhitespace(sb.toString());
            this._outputStreamTextDirty = false;
        }
        return this._currentText;
    }
    CleanOutputWhitespace(str) {
        let sb = new StringBuilder_1.StringBuilder();
        let currentWhitespaceStart = -1;
        let startOfLine = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charAt(i);
            let isInlineWhitespace = c == " " || c == "\t";
            if (isInlineWhitespace && currentWhitespaceStart == -1)
                currentWhitespaceStart = i;
            if (!isInlineWhitespace) {
                if (c != "\n" &&
                    currentWhitespaceStart > 0 &&
                    currentWhitespaceStart != startOfLine) {
                    sb.Append(" ");
                }
                currentWhitespaceStart = -1;
            }
            if (c == "\n")
                startOfLine = i + 1;
            if (!isInlineWhitespace)
                sb.Append(c);
        }
        return sb.toString();
    }
    get currentTags() {
        if (this._outputStreamTagsDirty) {
            this._currentTags = [];
            for (let outputObj of this._outputStream) {
                // var tag = outputObj as Tag;
                let tag = TypeAssertion_1.asOrNull(outputObj, Tag_1.Tag);
                if (tag !== null) {
                    this._currentTags.push(tag.text);
                }
            }
            this._outputStreamTagsDirty = false;
        }
        return this._currentTags;
    }
    get inExpressionEvaluation() {
        return this.callStack.currentElement.inExpressionEvaluation;
    }
    set inExpressionEvaluation(value) {
        this.callStack.currentElement.inExpressionEvaluation = value;
    }
    GoToStart() {
        this.callStack.currentElement.currentPointer = Pointer_1.Pointer.StartOf(this.story.mainContentContainer);
    }
    CopyAndStartPatching() {
        let copy = new StoryState(this.story);
        copy._patch = new StatePatch_1.StatePatch(this._patch);
        copy.outputStream.push.apply(copy.outputStream, this._outputStream);
        copy.OutputStreamDirty();
        copy._currentChoices.push.apply(copy._currentChoices, this._currentChoices);
        if (this.hasError) {
            copy._currentErrors = [];
            copy._currentErrors.push.apply(copy._currentErrors, this.currentErrors || []);
        }
        if (this.hasWarning) {
            copy._currentWarnings = [];
            copy._currentWarnings.push.apply(copy._currentWarnings, this.currentWarnings || []);
        }
        copy.callStack = new CallStack_1.CallStack(this.callStack);
        copy.variablesState = this.variablesState;
        copy.variablesState.callStack = copy.callStack;
        copy.variablesState.patch = copy._patch;
        copy.evaluationStack.push.apply(copy.evaluationStack, this.evaluationStack);
        if (!this.divertedPointer.isNull)
            copy.divertedPointer = this.divertedPointer.copy();
        copy.previousPointer = this.previousPointer.copy();
        copy._visitCounts = this._visitCounts;
        copy._turnIndices = this._turnIndices;
        copy.currentTurnIndex = this.currentTurnIndex;
        copy.storySeed = this.storySeed;
        copy.previousRandom = this.previousRandom;
        copy.didSafeExit = this.didSafeExit;
        return copy;
    }
    RestoreAfterPatch() {
        this.variablesState.callStack = this.callStack;
        this.variablesState.patch = this._patch;
    }
    ApplyAnyPatch() {
        if (this._patch === null)
            return;
        this.variablesState.ApplyPatch();
        for (let [key, value] of this._patch.visitCounts)
            this.ApplyCountChanges(key, value, true);
        for (let [key, value] of this._patch.turnIndices)
            this.ApplyCountChanges(key, value, false);
        this._patch = null;
    }
    ApplyCountChanges(container, newCount, isVisit) {
        let counts = isVisit ? this._visitCounts : this._turnIndices;
        counts.set(container.path.toString(), newCount);
    }
    WriteJson(writer) {
        writer.WriteObjectStart();
        let hasChoiceThreads = false;
        for (let c of this._currentChoices) {
            if (c.threadAtGeneration === null) {
                return NullException_1.throwNullException("c.threadAtGeneration");
            }
            c.originalThreadIndex = c.threadAtGeneration.threadIndex;
            if (this.callStack.ThreadWithIndex(c.originalThreadIndex) === null) {
                if (!hasChoiceThreads) {
                    hasChoiceThreads = true;
                    writer.WritePropertyStart("choiceThreads");
                    writer.WriteObjectStart();
                }
                writer.WritePropertyStart(c.originalThreadIndex);
                c.threadAtGeneration.WriteJson(writer);
                writer.WritePropertyEnd();
            }
        }
        if (hasChoiceThreads) {
            writer.WriteObjectEnd();
            writer.WritePropertyEnd();
        }
        // In the following two calls, `WriteJson` is called inside an arrow
        // function to make sure `this` is correctly bound and passed down
        // the call hierarchy.
        writer.WriteProperty("callstackThreads", (w) => this.callStack.WriteJson(w));
        writer.WriteProperty("variablesState", (w) => this.variablesState.WriteJson(w));
        writer.WriteProperty("evalStack", (w) => JsonSerialisation_1.JsonSerialisation.WriteListRuntimeObjs(w, this.evaluationStack));
        writer.WriteProperty("outputStream", (w) => JsonSerialisation_1.JsonSerialisation.WriteListRuntimeObjs(w, this._outputStream));
        writer.WriteProperty("currentChoices", (w) => {
            w.WriteArrayStart();
            for (let c of this._currentChoices)
                JsonSerialisation_1.JsonSerialisation.WriteChoice(w, c);
            w.WriteArrayEnd();
        });
        if (!this.divertedPointer.isNull) {
            if (this.divertedPointer.path === null) {
                return NullException_1.throwNullException("divertedPointer");
            }
            writer.WriteProperty("currentDivertTarget", this.divertedPointer.path.componentsString);
        }
        writer.WriteProperty("visitCounts", (w) => JsonSerialisation_1.JsonSerialisation.WriteIntDictionary(w, this._visitCounts));
        writer.WriteProperty("turnIndices", (w) => JsonSerialisation_1.JsonSerialisation.WriteIntDictionary(w, this._turnIndices));
        writer.WriteIntProperty("turnIdx", this.currentTurnIndex);
        writer.WriteIntProperty("storySeed", this.storySeed);
        writer.WriteIntProperty("previousRandom", this.previousRandom);
        writer.WriteIntProperty("inkSaveVersion", this.kInkSaveStateVersion);
        writer.WriteIntProperty("inkFormatVersion", Story_1.Story.inkVersionCurrent);
        writer.WriteObjectEnd();
    }
    LoadJsonObj(value) {
        let jObject = value;
        let jSaveVersion = jObject["inkSaveVersion"];
        if (jSaveVersion == null) {
            throw new StoryException_1.StoryException("ink save format incorrect, can't load.");
        }
        else if (parseInt(jSaveVersion) < this.kMinCompatibleLoadVersion) {
            throw new StoryException_1.StoryException("Ink save format isn't compatible with the current version (saw '" +
                jSaveVersion +
                "', but minimum is " +
                this.kMinCompatibleLoadVersion +
                "), so can't load.");
        }
        this.callStack.SetJsonToken(jObject["callstackThreads"], this.story);
        this.variablesState.SetJsonToken(jObject["variablesState"]);
        this._evaluationStack = JsonSerialisation_1.JsonSerialisation.JArrayToRuntimeObjList(jObject["evalStack"]);
        this._outputStream = JsonSerialisation_1.JsonSerialisation.JArrayToRuntimeObjList(jObject["outputStream"]);
        this.OutputStreamDirty();
        // currentChoices = Json.JArrayToRuntimeObjList<Choice>((JArray)jObject ["currentChoices"]);
        this._currentChoices = JsonSerialisation_1.JsonSerialisation.JArrayToRuntimeObjList(jObject["currentChoices"]);
        let currentDivertTargetPath = jObject["currentDivertTarget"];
        if (currentDivertTargetPath != null) {
            let divertPath = new Path_1.Path(currentDivertTargetPath.toString());
            this.divertedPointer = this.story.PointerAtPath(divertPath);
        }
        this._visitCounts = JsonSerialisation_1.JsonSerialisation.JObjectToIntDictionary(jObject["visitCounts"]);
        this._turnIndices = JsonSerialisation_1.JsonSerialisation.JObjectToIntDictionary(jObject["turnIndices"]);
        this.currentTurnIndex = parseInt(jObject["turnIdx"]);
        this.storySeed = parseInt(jObject["storySeed"]);
        this.previousRandom = parseInt(jObject["previousRandom"]);
        // var jChoiceThreads = jObject["choiceThreads"] as JObject;
        let jChoiceThreads = jObject["choiceThreads"];
        for (let c of this._currentChoices) {
            let foundActiveThread = this.callStack.ThreadWithIndex(c.originalThreadIndex);
            if (foundActiveThread != null) {
                c.threadAtGeneration = foundActiveThread.Copy();
            }
            else {
                let jSavedChoiceThread = jChoiceThreads[c.originalThreadIndex.toString()];
                c.threadAtGeneration = new CallStack_1.CallStack.Thread(jSavedChoiceThread, this.story);
            }
        }
    }
    ResetErrors() {
        this._currentErrors = null;
        this._currentWarnings = null;
    }
    ResetOutput(objs = null) {
        this._outputStream.length = 0;
        if (objs !== null)
            this._outputStream.push.apply(this._outputStream, objs);
        this.OutputStreamDirty();
    }
    PushToOutputStream(obj) {
        // var text = obj as StringValue;
        let text = TypeAssertion_1.asOrNull(obj, Value_1.StringValue);
        if (text !== null) {
            let listText = this.TrySplittingHeadTailWhitespace(text);
            if (listText !== null) {
                for (let textObj of listText) {
                    this.PushToOutputStreamIndividual(textObj);
                }
                this.OutputStreamDirty();
                return;
            }
        }
        this.PushToOutputStreamIndividual(obj);
        this.OutputStreamDirty();
    }
    PopFromOutputStream(count) {
        this.outputStream.splice(this.outputStream.length - count, count);
        this.OutputStreamDirty();
    }
    TrySplittingHeadTailWhitespace(single) {
        let str = single.value;
        if (str === null) {
            return NullException_1.throwNullException("single.value");
        }
        let headFirstNewlineIdx = -1;
        let headLastNewlineIdx = -1;
        for (let i = 0; i < str.length; ++i) {
            let c = str[i];
            if (c == "\n") {
                if (headFirstNewlineIdx == -1)
                    headFirstNewlineIdx = i;
                headLastNewlineIdx = i;
            }
            else if (c == " " || c == "\t")
                continue;
            else
                break;
        }
        let tailLastNewlineIdx = -1;
        let tailFirstNewlineIdx = -1;
        for (let i = 0; i < str.length; ++i) {
            let c = str[i];
            if (c == "\n") {
                if (tailLastNewlineIdx == -1)
                    tailLastNewlineIdx = i;
                tailFirstNewlineIdx = i;
            }
            else if (c == " " || c == "\t")
                continue;
            else
                break;
        }
        // No splitting to be done?
        if (headFirstNewlineIdx == -1 && tailLastNewlineIdx == -1)
            return null;
        let listTexts = [];
        let innerStrStart = 0;
        let innerStrEnd = str.length;
        if (headFirstNewlineIdx != -1) {
            if (headFirstNewlineIdx > 0) {
                let leadingSpaces = new Value_1.StringValue(str.substring(0, headFirstNewlineIdx));
                listTexts.push(leadingSpaces);
            }
            listTexts.push(new Value_1.StringValue("\n"));
            innerStrStart = headLastNewlineIdx + 1;
        }
        if (tailLastNewlineIdx != -1) {
            innerStrEnd = tailFirstNewlineIdx;
        }
        if (innerStrEnd > innerStrStart) {
            let innerStrText = str.substring(innerStrStart, innerStrEnd - innerStrStart);
            listTexts.push(new Value_1.StringValue(innerStrText));
        }
        if (tailLastNewlineIdx != -1 && tailFirstNewlineIdx > headLastNewlineIdx) {
            listTexts.push(new Value_1.StringValue("\n"));
            if (tailLastNewlineIdx < str.length - 1) {
                let numSpaces = str.length - tailLastNewlineIdx - 1;
                let trailingSpaces = new Value_1.StringValue(str.substring(tailLastNewlineIdx + 1, numSpaces));
                listTexts.push(trailingSpaces);
            }
        }
        return listTexts;
    }
    PushToOutputStreamIndividual(obj) {
        let glue = TypeAssertion_1.asOrNull(obj, Glue_1.Glue);
        let text = TypeAssertion_1.asOrNull(obj, Value_1.StringValue);
        let includeInOutput = true;
        if (glue) {
            this.TrimNewlinesFromOutputStream();
            includeInOutput = true;
        }
        else if (text) {
            let functionTrimIndex = -1;
            let currEl = this.callStack.currentElement;
            if (currEl.type == PushPop_1.PushPopType.Function) {
                functionTrimIndex = currEl.functionStartInOutputStream;
            }
            let glueTrimIndex = -1;
            for (let i = this._outputStream.length - 1; i >= 0; i--) {
                let o = this._outputStream[i];
                let c = o instanceof ControlCommand_1.ControlCommand ? o : null;
                let g = o instanceof Glue_1.Glue ? o : null;
                if (g != null) {
                    glueTrimIndex = i;
                    break;
                }
                else if (c != null &&
                    c.commandType == ControlCommand_1.ControlCommand.CommandType.BeginString) {
                    if (i >= functionTrimIndex) {
                        functionTrimIndex = -1;
                    }
                    break;
                }
            }
            let trimIndex = -1;
            if (glueTrimIndex != -1 && functionTrimIndex != -1)
                trimIndex = Math.min(functionTrimIndex, glueTrimIndex);
            else if (glueTrimIndex != -1)
                trimIndex = glueTrimIndex;
            else
                trimIndex = functionTrimIndex;
            if (trimIndex != -1) {
                if (text.isNewline) {
                    includeInOutput = false;
                }
                else if (text.isNonWhitespace) {
                    if (glueTrimIndex > -1)
                        this.RemoveExistingGlue();
                    if (functionTrimIndex > -1) {
                        let callStackElements = this.callStack.elements;
                        for (let i = callStackElements.length - 1; i >= 0; i--) {
                            let el = callStackElements[i];
                            if (el.type == PushPop_1.PushPopType.Function) {
                                el.functionStartInOutputStream = -1;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
            else if (text.isNewline) {
                if (this.outputStreamEndsInNewline || !this.outputStreamContainsContent)
                    includeInOutput = false;
            }
        }
        if (includeInOutput) {
            if (obj === null) {
                return NullException_1.throwNullException("obj");
            }
            this._outputStream.push(obj);
            this.OutputStreamDirty();
        }
    }
    TrimNewlinesFromOutputStream() {
        let removeWhitespaceFrom = -1;
        let i = this._outputStream.length - 1;
        while (i >= 0) {
            let obj = this._outputStream[i];
            let cmd = TypeAssertion_1.asOrNull(obj, ControlCommand_1.ControlCommand);
            let txt = TypeAssertion_1.asOrNull(obj, Value_1.StringValue);
            if (cmd != null || (txt != null && txt.isNonWhitespace)) {
                break;
            }
            else if (txt != null && txt.isNewline) {
                removeWhitespaceFrom = i;
            }
            i--;
        }
        // Remove the whitespace
        if (removeWhitespaceFrom >= 0) {
            i = removeWhitespaceFrom;
            while (i < this._outputStream.length) {
                let text = TypeAssertion_1.asOrNull(this._outputStream[i], Value_1.StringValue);
                if (text) {
                    this._outputStream.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
        this.OutputStreamDirty();
    }
    RemoveExistingGlue() {
        for (let i = this._outputStream.length - 1; i >= 0; i--) {
            let c = this._outputStream[i];
            if (c instanceof Glue_1.Glue) {
                this._outputStream.splice(i, 1);
            }
            else if (c instanceof ControlCommand_1.ControlCommand) {
                break;
            }
        }
        this.OutputStreamDirty();
    }
    get outputStreamEndsInNewline() {
        if (this._outputStream.length > 0) {
            for (let i = this._outputStream.length - 1; i >= 0; i--) {
                let obj = this._outputStream[i];
                if (obj instanceof ControlCommand_1.ControlCommand)
                    break;
                let text = this._outputStream[i];
                if (text instanceof Value_1.StringValue) {
                    if (text.isNewline)
                        return true;
                    else if (text.isNonWhitespace)
                        break;
                }
            }
        }
        return false;
    }
    get outputStreamContainsContent() {
        for (let i = 0; i < this._outputStream.length; i++) {
            if (this._outputStream[i] instanceof Value_1.StringValue)
                return true;
        }
        return false;
    }
    get inStringEvaluation() {
        for (let i = this._outputStream.length - 1; i >= 0; i--) {
            // var cmd = this._outputStream[i] as ControlCommand;
            let cmd = TypeAssertion_1.asOrNull(this._outputStream[i], ControlCommand_1.ControlCommand);
            if (cmd instanceof ControlCommand_1.ControlCommand &&
                cmd.commandType == ControlCommand_1.ControlCommand.CommandType.BeginString) {
                return true;
            }
        }
        return false;
    }
    PushEvaluationStack(obj) {
        // var listValue = obj as ListValue;
        let listValue = TypeAssertion_1.asOrNull(obj, Value_1.ListValue);
        if (listValue) {
            // Update origin when list is has something to indicate the list origin
            let rawList = listValue.value;
            if (rawList === null) {
                return NullException_1.throwNullException("rawList");
            }
            if (rawList.originNames != null) {
                if (!rawList.origins)
                    rawList.origins = [];
                rawList.origins.length = 0;
                for (let n of rawList.originNames) {
                    if (this.story.listDefinitions === null)
                        return NullException_1.throwNullException("StoryState.story.listDefinitions");
                    let def = this.story.listDefinitions.TryListGetDefinition(n, null);
                    if (def.result === null)
                        return NullException_1.throwNullException("StoryState def.result");
                    if (rawList.origins.indexOf(def.result) < 0)
                        rawList.origins.push(def.result);
                }
            }
        }
        if (obj === null) {
            return NullException_1.throwNullException("obj");
        }
        this.evaluationStack.push(obj);
    }
    PopEvaluationStack(numberOfObjects) {
        if (typeof numberOfObjects === "undefined") {
            let obj = this.evaluationStack.pop();
            return TypeAssertion_1.nullIfUndefined(obj);
        }
        else {
            if (numberOfObjects > this.evaluationStack.length) {
                throw new Error("trying to pop too many objects");
            }
            let popped = this.evaluationStack.splice(this.evaluationStack.length - numberOfObjects, numberOfObjects);
            return TypeAssertion_1.nullIfUndefined(popped);
        }
    }
    PeekEvaluationStack() {
        return this.evaluationStack[this.evaluationStack.length - 1];
    }
    ForceEnd() {
        this.callStack.Reset();
        this._currentChoices.length = 0;
        this.currentPointer = Pointer_1.Pointer.Null;
        this.previousPointer = Pointer_1.Pointer.Null;
        this.didSafeExit = true;
    }
    TrimWhitespaceFromFunctionEnd() {
        Debug_1.Debug.Assert(this.callStack.currentElement.type == PushPop_1.PushPopType.Function);
        let functionStartPoint = this.callStack.currentElement
            .functionStartInOutputStream;
        if (functionStartPoint == -1) {
            functionStartPoint = 0;
        }
        for (let i = this._outputStream.length - 1; i >= functionStartPoint; i--) {
            let obj = this._outputStream[i];
            let txt = TypeAssertion_1.asOrNull(obj, Value_1.StringValue);
            let cmd = TypeAssertion_1.asOrNull(obj, ControlCommand_1.ControlCommand);
            if (txt == null)
                continue;
            if (cmd)
                break;
            if (txt.isNewline || txt.isInlineWhitespace) {
                this._outputStream.splice(i, 1);
                this.OutputStreamDirty();
            }
            else {
                break;
            }
        }
    }
    PopCallStack(popType = null) {
        if (this.callStack.currentElement.type == PushPop_1.PushPopType.Function)
            this.TrimWhitespaceFromFunctionEnd();
        this.callStack.Pop(popType);
    }
    SetChosenPath(path, incrementingTurnIndex) {
        // Changing direction, assume we need to clear current set of choices
        this._currentChoices.length = 0;
        let newPointer = this.story.PointerAtPath(path);
        if (!newPointer.isNull && newPointer.index == -1)
            newPointer.index = 0;
        this.currentPointer = newPointer;
        if (incrementingTurnIndex) {
            this.currentTurnIndex++;
        }
    }
    StartFunctionEvaluationFromGame(funcContainer, args) {
        this.callStack.Push(PushPop_1.PushPopType.FunctionEvaluationFromGame, this.evaluationStack.length);
        this.callStack.currentElement.currentPointer = Pointer_1.Pointer.StartOf(funcContainer);
        this.PassArgumentsToEvaluationStack(args);
    }
    PassArgumentsToEvaluationStack(args) {
        // Pass arguments onto the evaluation stack
        if (args != null) {
            for (let i = 0; i < args.length; i++) {
                if (!(typeof args[i] === "number" || typeof args[i] === "string")) {
                    throw new Error("ink arguments when calling EvaluateFunction / ChoosePathStringWithParameters  must be int, float or string");
                }
                this.PushEvaluationStack(Value_1.Value.Create(args[i]));
            }
        }
    }
    TryExitFunctionEvaluationFromGame() {
        if (this.callStack.currentElement.type ==
            PushPop_1.PushPopType.FunctionEvaluationFromGame) {
            this.currentPointer = Pointer_1.Pointer.Null;
            this.didSafeExit = true;
            return true;
        }
        return false;
    }
    CompleteFunctionEvaluationFromGame() {
        if (this.callStack.currentElement.type !=
            PushPop_1.PushPopType.FunctionEvaluationFromGame) {
            throw new StoryException_1.StoryException("Expected external function evaluation to be complete. Stack trace: " +
                this.callStack.callStackTrace);
        }
        let originalEvaluationStackHeight = this.callStack.currentElement
            .evaluationStackHeightWhenPushed;
        let returnedObj = null;
        while (this.evaluationStack.length > originalEvaluationStackHeight) {
            let poppedObj = this.PopEvaluationStack();
            if (returnedObj === null)
                returnedObj = poppedObj;
        }
        this.PopCallStack(PushPop_1.PushPopType.FunctionEvaluationFromGame);
        if (returnedObj) {
            if (returnedObj instanceof Void_1.Void)
                return null;
            // Some kind of value, if not void
            // var returnVal = returnedObj as Runtime.Value;
            let returnVal = TypeAssertion_1.asOrThrows(returnedObj, Value_1.Value);
            // DivertTargets get returned as the string of components
            // (rather than a Path, which isn't public)
            if (returnVal.valueType == Value_1.ValueType.DivertTarget) {
                return returnVal.valueObject.toString();
            }
            // Other types can just have their exact object type:
            // int, float, string. VariablePointers get returned as strings.
            return returnVal.valueObject;
        }
        return null;
    }
    AddError(message, isWarning) {
        if (!isWarning) {
            if (this._currentErrors == null)
                this._currentErrors = [];
            this._currentErrors.push(message);
        }
        else {
            if (this._currentWarnings == null)
                this._currentWarnings = [];
            this._currentWarnings.push(message);
        }
    }
    OutputStreamDirty() {
        this._outputStreamTextDirty = true;
        this._outputStreamTagsDirty = true;
    }
}
exports.StoryState = StoryState;
//# sourceMappingURL=StoryState.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/StringBuilder.js":
/*!****************************************************!*\
  !*** ./node_modules/inkjs/engine/StringBuilder.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
class StringBuilder {
    constructor(str) {
        str = typeof str !== "undefined" ? str.toString() : "";
        this.string = str;
    }
    get Length() {
        return this.string.length;
    }
    Append(str) {
        if (str !== null) {
            this.string += str;
        }
    }
    AppendLine(str) {
        if (typeof str !== "undefined")
            this.Append(str);
        this.string += "\n";
    }
    AppendFormat(format, ...args) {
        // taken from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
        this.string += format.replace(/{(\d+)}/g, (match, num) => typeof args[num] != "undefined" ? args[num] : match);
    }
    toString() {
        return this.string;
    }
}
exports.StringBuilder = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Tag.js":
/*!******************************************!*\
  !*** ./node_modules/inkjs/engine/Tag.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
class Tag extends Object_1.InkObject {
    constructor(tagText) {
        super();
        this.text = tagText.toString() || "";
    }
    toString() {
        return "# " + this.text;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/TryGetResult.js":
/*!***************************************************!*\
  !*** ./node_modules/inkjs/engine/TryGetResult.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseFloat = exports.tryParseInt = exports.tryGetValueFromMap = void 0;
function tryGetValueFromMap(map, key, 
/* out */ value) {
    if (map === null) {
        return { result: value, exists: false };
    }
    let val = map.get(key);
    if (typeof val === "undefined") {
        return { result: value, exists: false };
    }
    else {
        return { result: val, exists: true };
    }
}
exports.tryGetValueFromMap = tryGetValueFromMap;
function tryParseInt(value, 
/* out */ defaultValue = 0) {
    let val = parseInt(value);
    if (!Number.isNaN(val)) {
        return { result: val, exists: true };
    }
    else {
        return { result: defaultValue, exists: false };
    }
}
exports.tryParseInt = tryParseInt;
function tryParseFloat(value, 
/* out */ defaultValue = 0) {
    let val = parseFloat(value);
    if (!Number.isNaN(val)) {
        return { result: val, exists: true };
    }
    else {
        return { result: defaultValue, exists: false };
    }
}
exports.tryParseFloat = tryParseFloat;
//# sourceMappingURL=TryGetResult.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/TypeAssertion.js":
/*!****************************************************!*\
  !*** ./node_modules/inkjs/engine/TypeAssertion.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isEquatable = exports.nullIfUndefined = exports.asINamedContentOrNull = exports.asNumberOrThrows = exports.asOrThrows = exports.asOrNull = void 0;
function asOrNull(obj, type) {
    if (obj instanceof type) {
        return unsafeTypeAssertion(obj, type);
    }
    else {
        return null;
    }
}
exports.asOrNull = asOrNull;
function asOrThrows(obj, type) {
    if (obj instanceof type) {
        return unsafeTypeAssertion(obj, type);
    }
    else {
        throw new Error(`${obj} is not of type ${type}`);
    }
}
exports.asOrThrows = asOrThrows;
function asNumberOrThrows(obj) {
    if (typeof obj === "number") {
        return obj;
    }
    else {
        throw new Error(`${obj} is not a number`);
    }
}
exports.asNumberOrThrows = asNumberOrThrows;
// So here, in the reference implementation, contentObj is casted to an INamedContent
// but here we use js-style duck typing: if it implements the same props as the interface,
// we treat it as valid.
function asINamedContentOrNull(obj) {
    if (obj.hasValidName && obj.name) {
        return obj;
    }
    return null;
}
exports.asINamedContentOrNull = asINamedContentOrNull;
function nullIfUndefined(obj) {
    if (typeof obj === "undefined") {
        return null;
    }
    return obj;
}
exports.nullIfUndefined = nullIfUndefined;
function isEquatable(type) {
    return typeof type === "object" && typeof type.Equals === "function";
}
exports.isEquatable = isEquatable;
function unsafeTypeAssertion(obj, type) {
    return obj;
}
//# sourceMappingURL=TypeAssertion.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Value.js":
/*!********************************************!*\
  !*** ./node_modules/inkjs/engine/Value.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueType = exports.ListValue = exports.VariablePointerValue = exports.DivertTargetValue = exports.StringValue = exports.FloatValue = exports.IntValue = exports.Value = exports.AbstractValue = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
const InkList_1 = __webpack_require__(/*! ./InkList */ "./node_modules/inkjs/engine/InkList.js");
const StoryException_1 = __webpack_require__(/*! ./StoryException */ "./node_modules/inkjs/engine/StoryException.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const TryGetResult_1 = __webpack_require__(/*! ./TryGetResult */ "./node_modules/inkjs/engine/TryGetResult.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class AbstractValue extends Object_1.InkObject {
    static Create(val, preferredNumberType) {
        // This code doesn't exist in upstream and is simply here to enforce
        // the creation of the proper number value.
        // If `preferredNumberType` is not provided or if value doesn't match
        // `preferredNumberType`, this conditional does nothing.
        if (preferredNumberType) {
            if (preferredNumberType === ValueType.Int &&
                Number.isInteger(Number(val))) {
                return new IntValue(Number(val));
            }
            else if (preferredNumberType === ValueType.Float &&
                !isNaN(val)) {
                return new FloatValue(Number(val));
            }
        }
        // Implicitly convert bools into ints
        if (typeof val === "boolean") {
            let b = !!val;
            val = b ? 1 : 0;
        }
        // https://github.com/y-lohse/inkjs/issues/425
        // Changed condition sequence, because Number('') is
        // parsed to 0, which made setting string to empty
        // impossible
        if (typeof val === "string") {
            return new StringValue(String(val));
        }
        else if (Number.isInteger(Number(val))) {
            return new IntValue(Number(val));
        }
        else if (!isNaN(val)) {
            return new FloatValue(Number(val));
        }
        else if (val instanceof Path_1.Path) {
            return new DivertTargetValue(TypeAssertion_1.asOrThrows(val, Path_1.Path));
        }
        else if (val instanceof InkList_1.InkList) {
            return new ListValue(TypeAssertion_1.asOrThrows(val, InkList_1.InkList));
        }
        return null;
    }
    Copy() {
        return TypeAssertion_1.asOrThrows(AbstractValue.Create(this), Object_1.InkObject);
    }
    BadCastException(targetType) {
        return new StoryException_1.StoryException("Can't cast " +
            this.valueObject +
            " from " +
            this.valueType +
            " to " +
            targetType);
    }
}
exports.AbstractValue = AbstractValue;
class Value extends AbstractValue {
    constructor(val) {
        super();
        this.value = val;
    }
    get valueObject() {
        return this.value;
    }
    toString() {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        return this.value.toString();
    }
}
exports.Value = Value;
class IntValue extends Value {
    constructor(val) {
        super(val || 0);
    }
    get isTruthy() {
        return this.value != 0;
    }
    get valueType() {
        return ValueType.Int;
    }
    Cast(newType) {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        if (newType == this.valueType) {
            return this;
        }
        if (newType == ValueType.Float) {
            return new FloatValue(this.value);
        }
        if (newType == ValueType.String) {
            return new StringValue("" + this.value);
        }
        throw this.BadCastException(newType);
    }
}
exports.IntValue = IntValue;
class FloatValue extends Value {
    constructor(val) {
        super(val || 0.0);
    }
    get isTruthy() {
        return this.value != 0.0;
    }
    get valueType() {
        return ValueType.Float;
    }
    Cast(newType) {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        if (newType == this.valueType) {
            return this;
        }
        if (newType == ValueType.Int) {
            return new IntValue(this.value);
        }
        if (newType == ValueType.String) {
            return new StringValue("" + this.value);
        }
        throw this.BadCastException(newType);
    }
}
exports.FloatValue = FloatValue;
class StringValue extends Value {
    constructor(val) {
        super(val || "");
        this._isNewline = this.value == "\n";
        this._isInlineWhitespace = true;
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        if (this.value.length > 0) {
            this.value.split("").every((c) => {
                if (c != " " && c != "\t") {
                    this._isInlineWhitespace = false;
                    return false;
                }
                return true;
            });
        }
    }
    get valueType() {
        return ValueType.String;
    }
    get isTruthy() {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        return this.value.length > 0;
    }
    get isNewline() {
        return this._isNewline;
    }
    get isInlineWhitespace() {
        return this._isInlineWhitespace;
    }
    get isNonWhitespace() {
        return !this.isNewline && !this.isInlineWhitespace;
    }
    Cast(newType) {
        if (newType == this.valueType) {
            return this;
        }
        if (newType == ValueType.Int) {
            let parsedInt = TryGetResult_1.tryParseInt(this.value);
            if (parsedInt.exists) {
                return new IntValue(parsedInt.result);
            }
            else {
                throw this.BadCastException(newType);
            }
        }
        if (newType == ValueType.Float) {
            let parsedFloat = TryGetResult_1.tryParseFloat(this.value);
            if (parsedFloat.exists) {
                return new FloatValue(parsedFloat.result);
            }
            else {
                throw this.BadCastException(newType);
            }
        }
        throw this.BadCastException(newType);
    }
}
exports.StringValue = StringValue;
class DivertTargetValue extends Value {
    constructor(targetPath) {
        super(targetPath);
    }
    get valueType() {
        return ValueType.DivertTarget;
    }
    get targetPath() {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        return this.value;
    }
    set targetPath(value) {
        this.value = value;
    }
    get isTruthy() {
        throw new Error("Shouldn't be checking the truthiness of a divert target");
    }
    Cast(newType) {
        if (newType == this.valueType)
            return this;
        throw this.BadCastException(newType);
    }
    toString() {
        return "DivertTargetValue(" + this.targetPath + ")";
    }
}
exports.DivertTargetValue = DivertTargetValue;
class VariablePointerValue extends Value {
    constructor(variableName, contextIndex = -1) {
        super(variableName);
        this._contextIndex = contextIndex;
    }
    get contextIndex() {
        return this._contextIndex;
    }
    set contextIndex(value) {
        this._contextIndex = value;
    }
    get variableName() {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        return this.value;
    }
    set variableName(value) {
        this.value = value;
    }
    get valueType() {
        return ValueType.VariablePointer;
    }
    get isTruthy() {
        throw new Error("Shouldn't be checking the truthiness of a variable pointer");
    }
    Cast(newType) {
        if (newType == this.valueType)
            return this;
        throw this.BadCastException(newType);
    }
    toString() {
        return "VariablePointerValue(" + this.variableName + ")";
    }
    Copy() {
        return new VariablePointerValue(this.variableName, this.contextIndex);
    }
}
exports.VariablePointerValue = VariablePointerValue;
class ListValue extends Value {
    get isTruthy() {
        if (this.value === null) {
            return NullException_1.throwNullException("this.value");
        }
        return this.value.Count > 0;
    }
    get valueType() {
        return ValueType.List;
    }
    Cast(newType) {
        if (this.value === null)
            return NullException_1.throwNullException("Value.value");
        if (newType == ValueType.Int) {
            let max = this.value.maxItem;
            if (max.Key.isNull)
                return new IntValue(0);
            else
                return new IntValue(max.Value);
        }
        else if (newType == ValueType.Float) {
            let max = this.value.maxItem;
            if (max.Key.isNull)
                return new FloatValue(0.0);
            else
                return new FloatValue(max.Value);
        }
        else if (newType == ValueType.String) {
            let max = this.value.maxItem;
            if (max.Key.isNull)
                return new StringValue("");
            else {
                return new StringValue(max.Key.toString());
            }
        }
        if (newType == this.valueType)
            return this;
        throw this.BadCastException(newType);
    }
    constructor(listOrSingleItem, singleValue) {
        super(null);
        if (!listOrSingleItem && !singleValue) {
            this.value = new InkList_1.InkList();
        }
        else if (listOrSingleItem instanceof InkList_1.InkList) {
            this.value = new InkList_1.InkList(listOrSingleItem);
        }
        else if (listOrSingleItem instanceof InkList_1.InkListItem &&
            typeof singleValue === "number") {
            this.value = new InkList_1.InkList({
                Key: listOrSingleItem,
                Value: singleValue,
            });
        }
    }
    static RetainListOriginsForAssignment(oldValue, newValue) {
        let oldList = TypeAssertion_1.asOrNull(oldValue, ListValue);
        let newList = TypeAssertion_1.asOrNull(newValue, ListValue);
        if (newList && newList.value === null)
            return NullException_1.throwNullException("newList.value");
        if (oldList && oldList.value === null)
            return NullException_1.throwNullException("oldList.value");
        // When assigning the empty list, try to retain any initial origin names
        if (oldList && newList && newList.value.Count == 0)
            newList.value.SetInitialOriginNames(oldList.value.originNames);
    }
}
exports.ListValue = ListValue;
var ValueType;
(function (ValueType) {
    ValueType[ValueType["Int"] = 0] = "Int";
    ValueType[ValueType["Float"] = 1] = "Float";
    ValueType[ValueType["List"] = 2] = "List";
    ValueType[ValueType["String"] = 3] = "String";
    ValueType[ValueType["DivertTarget"] = 4] = "DivertTarget";
    ValueType[ValueType["VariablePointer"] = 5] = "VariablePointer";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
//# sourceMappingURL=Value.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/VariableAssignment.js":
/*!*********************************************************!*\
  !*** ./node_modules/inkjs/engine/VariableAssignment.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableAssignment = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
class VariableAssignment extends Object_1.InkObject {
    constructor(variableName, isNewDeclaration) {
        super();
        this.variableName = variableName || null;
        this.isNewDeclaration = !!isNewDeclaration;
        this.isGlobal = false;
    }
    toString() {
        return "VarAssign to " + this.variableName;
    }
}
exports.VariableAssignment = VariableAssignment;
//# sourceMappingURL=VariableAssignment.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/VariableReference.js":
/*!********************************************************!*\
  !*** ./node_modules/inkjs/engine/VariableReference.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableReference = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
const Path_1 = __webpack_require__(/*! ./Path */ "./node_modules/inkjs/engine/Path.js");
class VariableReference extends Object_1.InkObject {
    constructor(name = null) {
        super();
        this.pathForCount = null;
        this.name = name;
    }
    get containerForCount() {
        if (this.pathForCount === null)
            return null;
        return this.ResolvePath(this.pathForCount).container;
    }
    get pathStringForCount() {
        if (this.pathForCount === null)
            return null;
        return this.CompactPathString(this.pathForCount);
    }
    set pathStringForCount(value) {
        if (value === null)
            this.pathForCount = null;
        else
            this.pathForCount = new Path_1.Path(value);
    }
    toString() {
        if (this.name != null) {
            return "var(" + this.name + ")";
        }
        else {
            let pathStr = this.pathStringForCount;
            return "read_count(" + pathStr + ")";
        }
    }
}
exports.VariableReference = VariableReference;
//# sourceMappingURL=VariableReference.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/VariablesState.js":
/*!*****************************************************!*\
  !*** ./node_modules/inkjs/engine/VariablesState.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VariablesState = void 0;
const Value_1 = __webpack_require__(/*! ./Value */ "./node_modules/inkjs/engine/Value.js");
const StoryException_1 = __webpack_require__(/*! ./StoryException */ "./node_modules/inkjs/engine/StoryException.js");
const JsonSerialisation_1 = __webpack_require__(/*! ./JsonSerialisation */ "./node_modules/inkjs/engine/JsonSerialisation.js");
const TypeAssertion_1 = __webpack_require__(/*! ./TypeAssertion */ "./node_modules/inkjs/engine/TypeAssertion.js");
const TryGetResult_1 = __webpack_require__(/*! ./TryGetResult */ "./node_modules/inkjs/engine/TryGetResult.js");
const NullException_1 = __webpack_require__(/*! ./NullException */ "./node_modules/inkjs/engine/NullException.js");
class VariablesState {
    constructor(callStack, listDefsOrigin) {
        // The way variableChangedEvent is a bit different than the reference implementation.
        // Originally it uses the C# += operator to add delegates, but in js we need to maintain
        // an actual collection of delegates (ie. callbacks) to register a new one, there is a
        // special ObserveVariableChange method below.
        this.variableChangedEventCallbacks = [];
        this.patch = null;
        this._batchObservingVariableChanges = false;
        this._defaultGlobalVariables = new Map();
        this._changedVariablesForBatchObs = new Set();
        this._globalVariables = new Map();
        this._callStack = callStack;
        this._listDefsOrigin = listDefsOrigin;
        // if es6 proxies are available, use them.
        try {
            // the proxy is used to allow direct manipulation of global variables.
            // It first tries to access the objects own property, and if none is
            // found it delegates the call to the $ method, defined below
            let p = new Proxy(this, {
                get(target, name) {
                    return name in target ? target[name] : target.$(name);
                },
                set(target, name, value) {
                    if (name in target)
                        target[name] = value;
                    else
                        target.$(name, value);
                    return true; // returning a falsy value make the trap fail
                },
            });
            return p;
        }
        catch (e) {
            // thr proxy object is not available in this context. we should warn the
            // dev but writting to the console feels a bit intrusive.
            // console.log("ES6 Proxy not available - direct manipulation of global variables can't work, use $() instead.");
        }
    }
    variableChangedEvent(variableName, newValue) {
        for (let callback of this.variableChangedEventCallbacks) {
            callback(variableName, newValue);
        }
    }
    get batchObservingVariableChanges() {
        return this._batchObservingVariableChanges;
    }
    set batchObservingVariableChanges(value) {
        this._batchObservingVariableChanges = value;
        if (value) {
            this._changedVariablesForBatchObs = new Set();
        }
        else {
            if (this._changedVariablesForBatchObs != null) {
                for (let variableName of this._changedVariablesForBatchObs) {
                    let currentValue = this._globalVariables.get(variableName);
                    if (!currentValue) {
                        NullException_1.throwNullException("currentValue");
                    }
                    else {
                        this.variableChangedEvent(variableName, currentValue);
                    }
                }
                this._changedVariablesForBatchObs = null;
            }
        }
    }
    get callStack() {
        return this._callStack;
    }
    set callStack(callStack) {
        this._callStack = callStack;
    }
    // the original code uses a magic getter and setter for global variables,
    // allowing things like variableState['varname]. This is not quite possible
    // in js without a Proxy, so it is replaced with this $ function.
    $(variableName, value) {
        if (typeof value === "undefined") {
            let varContents = null;
            if (this.patch !== null) {
                varContents = this.patch.TryGetGlobal(variableName, null);
                if (varContents.exists)
                    return varContents.result.valueObject;
            }
            varContents = this._globalVariables.get(variableName);
            if (typeof varContents === "undefined") {
                varContents = this._defaultGlobalVariables.get(variableName);
            }
            if (typeof varContents !== "undefined")
                return varContents.valueObject;
            else
                return null;
        }
        else {
            if (typeof this._defaultGlobalVariables.get(variableName) === "undefined")
                throw new StoryException_1.StoryException("Cannot assign to a variable (" +
                    variableName +
                    ") that hasn't been declared in the story");
            let val = Value_1.Value.Create(value);
            if (val == null) {
                if (value == null) {
                    throw new StoryException_1.StoryException("Cannot pass null to VariableState");
                }
                else {
                    throw new StoryException_1.StoryException("Invalid value passed to VariableState: " + value.toString());
                }
            }
            this.SetGlobal(variableName, val);
        }
    }
    ApplyPatch() {
        if (this.patch === null) {
            return NullException_1.throwNullException("this.patch");
        }
        for (let [namedVarKey, namedVarValue] of this.patch.globals) {
            this._globalVariables.set(namedVarKey, namedVarValue);
        }
        if (this._changedVariablesForBatchObs !== null) {
            for (let name of this.patch.changedVariables) {
                this._changedVariablesForBatchObs.add(name);
            }
        }
        this.patch = null;
    }
    SetJsonToken(jToken) {
        this._globalVariables.clear();
        for (let [varValKey, varValValue] of this._defaultGlobalVariables) {
            let loadedToken = jToken[varValKey];
            if (typeof loadedToken !== "undefined") {
                let tokenInkObject = JsonSerialisation_1.JsonSerialisation.JTokenToRuntimeObject(loadedToken);
                if (tokenInkObject === null) {
                    return NullException_1.throwNullException("tokenInkObject");
                }
                this._globalVariables.set(varValKey, tokenInkObject);
            }
            else {
                this._globalVariables.set(varValKey, varValValue);
            }
        }
    }
    WriteJson(writer) {
        writer.WriteObjectStart();
        for (let [keyValKey, keyValValue] of this._globalVariables) {
            let name = keyValKey;
            let val = keyValValue;
            if (VariablesState.dontSaveDefaultValues) {
                if (this._defaultGlobalVariables.has(name)) {
                    let defaultVal = this._defaultGlobalVariables.get(name);
                    if (this.RuntimeObjectsEqual(val, defaultVal))
                        continue;
                }
            }
            writer.WritePropertyStart(name);
            JsonSerialisation_1.JsonSerialisation.WriteRuntimeObject(writer, val);
            writer.WritePropertyEnd();
        }
        writer.WriteObjectEnd();
    }
    RuntimeObjectsEqual(obj1, obj2) {
        if (obj1 === null) {
            return NullException_1.throwNullException("obj1");
        }
        if (obj2 === null) {
            return NullException_1.throwNullException("obj2");
        }
        if (obj1.constructor !== obj2.constructor)
            return false;
        let intVal = TypeAssertion_1.asOrNull(obj1, Value_1.IntValue);
        if (intVal !== null) {
            return intVal.value === TypeAssertion_1.asOrThrows(obj2, Value_1.IntValue).value;
        }
        let floatVal = TypeAssertion_1.asOrNull(obj1, Value_1.FloatValue);
        if (floatVal !== null) {
            return floatVal.value === TypeAssertion_1.asOrThrows(obj2, Value_1.FloatValue).value;
        }
        let val1 = TypeAssertion_1.asOrNull(obj1, Value_1.Value);
        let val2 = TypeAssertion_1.asOrNull(obj2, Value_1.Value);
        if (val1 !== null && val2 !== null) {
            if (TypeAssertion_1.isEquatable(val1.valueObject) && TypeAssertion_1.isEquatable(val2.valueObject)) {
                return val1.valueObject.Equals(val2.valueObject);
            }
            else {
                return val1.valueObject === val2.valueObject;
            }
        }
        throw new Error("FastRoughDefinitelyEquals: Unsupported runtime object type: " +
            obj1.constructor.name);
    }
    GetVariableWithName(name, contextIndex = -1) {
        let varValue = this.GetRawVariableWithName(name, contextIndex);
        // var varPointer = varValue as VariablePointerValue;
        let varPointer = TypeAssertion_1.asOrNull(varValue, Value_1.VariablePointerValue);
        if (varPointer !== null) {
            varValue = this.ValueAtVariablePointer(varPointer);
        }
        return varValue;
    }
    TryGetDefaultVariableValue(name) {
        let val = TryGetResult_1.tryGetValueFromMap(this._defaultGlobalVariables, name, null);
        return val.exists ? val.result : null;
    }
    GlobalVariableExistsWithName(name) {
        return (this._globalVariables.has(name) ||
            (this._defaultGlobalVariables !== null &&
                this._defaultGlobalVariables.has(name)));
    }
    GetRawVariableWithName(name, contextIndex) {
        let varValue = null;
        if (contextIndex == 0 || contextIndex == -1) {
            let variableValue = null;
            if (this.patch !== null) {
                variableValue = this.patch.TryGetGlobal(name, null);
                if (variableValue.exists)
                    return variableValue.result;
            }
            // this is a conditional assignment
            variableValue = TryGetResult_1.tryGetValueFromMap(this._globalVariables, name, null);
            if (variableValue.exists)
                return variableValue.result;
            if (this._defaultGlobalVariables !== null) {
                variableValue = TryGetResult_1.tryGetValueFromMap(this._defaultGlobalVariables, name, null);
                if (variableValue.exists)
                    return variableValue.result;
            }
            if (this._listDefsOrigin === null)
                return NullException_1.throwNullException("VariablesState._listDefsOrigin");
            let listItemValue = this._listDefsOrigin.FindSingleItemListWithName(name);
            if (listItemValue)
                return listItemValue;
        }
        varValue = this._callStack.GetTemporaryVariableWithName(name, contextIndex);
        return varValue;
    }
    ValueAtVariablePointer(pointer) {
        return this.GetVariableWithName(pointer.variableName, pointer.contextIndex);
    }
    Assign(varAss, value) {
        let name = varAss.variableName;
        if (name === null) {
            return NullException_1.throwNullException("name");
        }
        let contextIndex = -1;
        let setGlobal = false;
        if (varAss.isNewDeclaration) {
            setGlobal = varAss.isGlobal;
        }
        else {
            setGlobal = this.GlobalVariableExistsWithName(name);
        }
        if (varAss.isNewDeclaration) {
            // var varPointer = value as VariablePointerValue;
            let varPointer = TypeAssertion_1.asOrNull(value, Value_1.VariablePointerValue);
            if (varPointer !== null) {
                let fullyResolvedVariablePointer = this.ResolveVariablePointer(varPointer);
                value = fullyResolvedVariablePointer;
            }
        }
        else {
            let existingPointer = null;
            do {
                // existingPointer = GetRawVariableWithName (name, contextIndex) as VariablePointerValue;
                existingPointer = TypeAssertion_1.asOrNull(this.GetRawVariableWithName(name, contextIndex), Value_1.VariablePointerValue);
                if (existingPointer != null) {
                    name = existingPointer.variableName;
                    contextIndex = existingPointer.contextIndex;
                    setGlobal = contextIndex == 0;
                }
            } while (existingPointer != null);
        }
        if (setGlobal) {
            this.SetGlobal(name, value);
        }
        else {
            this._callStack.SetTemporaryVariable(name, value, varAss.isNewDeclaration, contextIndex);
        }
    }
    SnapshotDefaultGlobals() {
        this._defaultGlobalVariables = new Map(this._globalVariables);
    }
    RetainListOriginsForAssignment(oldValue, newValue) {
        let oldList = TypeAssertion_1.asOrThrows(oldValue, Value_1.ListValue);
        let newList = TypeAssertion_1.asOrThrows(newValue, Value_1.ListValue);
        if (oldList.value && newList.value && newList.value.Count == 0) {
            newList.value.SetInitialOriginNames(oldList.value.originNames);
        }
    }
    SetGlobal(variableName, value) {
        let oldValue = null;
        if (this.patch === null) {
            oldValue = TryGetResult_1.tryGetValueFromMap(this._globalVariables, variableName, null);
        }
        if (this.patch !== null) {
            oldValue = this.patch.TryGetGlobal(variableName, null);
            if (!oldValue.exists) {
                oldValue = TryGetResult_1.tryGetValueFromMap(this._globalVariables, variableName, null);
            }
        }
        Value_1.ListValue.RetainListOriginsForAssignment(oldValue.result, value);
        if (variableName === null) {
            return NullException_1.throwNullException("variableName");
        }
        if (this.patch !== null) {
            this.patch.SetGlobal(variableName, value);
        }
        else {
            this._globalVariables.set(variableName, value);
        }
        // TODO: Not sure !== is equivalent to !value.Equals(oldValue)
        if (this.variableChangedEvent !== null &&
            oldValue !== null &&
            value !== oldValue.result) {
            if (this.batchObservingVariableChanges) {
                if (this._changedVariablesForBatchObs === null) {
                    return NullException_1.throwNullException("this._changedVariablesForBatchObs");
                }
                if (this.patch !== null) {
                    this.patch.AddChangedVariable(variableName);
                }
                else if (this._changedVariablesForBatchObs !== null) {
                    this._changedVariablesForBatchObs.add(variableName);
                }
            }
            else {
                this.variableChangedEvent(variableName, value);
            }
        }
    }
    ResolveVariablePointer(varPointer) {
        let contextIndex = varPointer.contextIndex;
        if (contextIndex == -1)
            contextIndex = this.GetContextIndexOfVariableNamed(varPointer.variableName);
        let valueOfVariablePointedTo = this.GetRawVariableWithName(varPointer.variableName, contextIndex);
        // var doubleRedirectionPointer = valueOfVariablePointedTo as VariablePointerValue;
        let doubleRedirectionPointer = TypeAssertion_1.asOrNull(valueOfVariablePointedTo, Value_1.VariablePointerValue);
        if (doubleRedirectionPointer != null) {
            return doubleRedirectionPointer;
        }
        else {
            return new Value_1.VariablePointerValue(varPointer.variableName, contextIndex);
        }
    }
    GetContextIndexOfVariableNamed(varName) {
        if (this.GlobalVariableExistsWithName(varName))
            return 0;
        return this._callStack.currentElementIndex;
    }
    /**
     * This function is specific to the js version of ink. It allows to register a
     * callback that will be called when a variable changes. The original code uses
     * `state.variableChangedEvent += callback` instead.
     *
     * @param {function} callback
     */
    ObserveVariableChange(callback) {
        this.variableChangedEventCallbacks.push(callback);
    }
}
exports.VariablesState = VariablesState;
VariablesState.dontSaveDefaultValues = true;
//# sourceMappingURL=VariablesState.js.map

/***/ }),

/***/ "./node_modules/inkjs/engine/Void.js":
/*!*******************************************!*\
  !*** ./node_modules/inkjs/engine/Void.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Void = void 0;
const Object_1 = __webpack_require__(/*! ./Object */ "./node_modules/inkjs/engine/Object.js");
class Void extends Object_1.InkObject {
}
exports.Void = Void;
//# sourceMappingURL=Void.js.map

/***/ }),

/***/ "./node_modules/long/src/long.js":
/*!***************************************!*\
  !*** ./node_modules/long/src/long.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),

/***/ "./node_modules/protobufjs/minimal.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/minimal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(/*! ./src/index-minimal */ "./node_modules/protobufjs/src/index-minimal.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/index-minimal.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/index-minimal.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "./node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "./node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "./node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "./node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}

// Set up buffer utility according to the environment
configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/reader.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/reader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create();

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "./node_modules/protobufjs/src/reader_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/reader_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

BufferReader._configure = function () {
    /* istanbul ignore else */
    if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
};


/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice
        ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
        : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

BufferReader._configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/roots.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/roots.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/src/rpc.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "./node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc/service.js":
/*!****************************************************!*\
  !*** ./node_modules/protobufjs/src/rpc/service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/longbits.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/util/longbits.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/minimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/protobufjs/src/util/minimal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "./node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "./node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "./node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "./node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "./node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "./node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "./node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "./node_modules/protobufjs/src/util/longbits.js");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(typeof global !== "undefined"
                   && global
                   && global.process
                   && global.process.versions
                   && global.process.versions.node);

/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */
util.global = util.isNode && global
           || typeof window !== "undefined" && window
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/protobufjs/src/writer.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/writer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/writer_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter.alloc = util._Buffer_allocUnsafe;

    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};


/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
        buf.utf8Write(val, pos);
    else
        buf.write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/GameMain.ts":
/*!*************************!*\
  !*** ./src/GameMain.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unittest_UnitTest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unittest/UnitTest */ "./src/unittest/UnitTest.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _game_module_login_ui_UIServerListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game/module/login/ui/UIServerListItem */ "./src/game/module/login/ui/UIServerListItem.ts");







class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_1__["JsManager"].Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_1__["JsManager"].Instance.JsOnDispose = () => this.onDispose();
    }
    async start() {
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].log("Game start in JS....");
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].StoryManager.initialize();
            //预加载excel数据
            //ExcelManager.Instance(ExcelManager);
            //加载通用FairyGUI资源
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].ResManager.loadFairyGUIPackage(_data_ui_common__WEBPACK_IMPORTED_MODULE_5__["commonUI"].PackageName);
            //do Unit Test
            _unittest_UnitTest__WEBPACK_IMPORTED_MODULE_0__["UnitTest"].doTest();
            //进入登录模块
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_2__["SceneDef"].LoginScene);
            //JS启动完成，通知C#层
            csharp__WEBPACK_IMPORTED_MODULE_1__["GameLaunch"].Instance.JsLuanchFinish();
            let extItem = () => {
                let item = new _game_module_login_ui_UIServerListItem__WEBPACK_IMPORTED_MODULE_6__["UIServerListItem"]();
                // pool.push(item)
                return item;
            };
            // let pool = []
            csharp__WEBPACK_IMPORTED_MODULE_1__["FairyGUI"].UIObjectFactory.SetPackageItemExtension("ui://l64dumk9feeg54", extItem);
        }
        catch (ex) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].error(ex);
        }
    }
    onApplicationQuit() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].GameObjectPool.cleanup(true);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].log("Game onDispose in JS....");
    }
}
new GameMain().start();


/***/ }),

/***/ "./src/data/excel/SkillConfig.ts":
/*!***************************************!*\
  !*** ./src/data/excel/SkillConfig.ts ***!
  \***************************************/
/*! exports provided: SkillConfigTR, SkillConfigTB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillConfigTR", function() { return SkillConfigTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillConfigTB", function() { return SkillConfigTB; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");

class SkillConfigTR {
    constructor(_id, _Name, _Description, _CoolTime, _CostSP, _AttackDistance, _AttackAngle, _AttackTargetTags, _ImpactType, _NextBattlerId, _AtkRatio, _DurationTime, _AtkInterval, _SkillPrefab, _AnimationName, _HitFxPrefab, _Level, _AttackType, _SelectorType) {
        this._id = _id;
        this._Name = _Name;
        this._Description = _Description;
        this._CoolTime = _CoolTime;
        this._CostSP = _CostSP;
        this._AttackDistance = _AttackDistance;
        this._AttackAngle = _AttackAngle;
        this._AttackTargetTags = _AttackTargetTags;
        this._ImpactType = _ImpactType;
        this._NextBattlerId = _NextBattlerId;
        this._AtkRatio = _AtkRatio;
        this._DurationTime = _DurationTime;
        this._AtkInterval = _AtkInterval;
        this._SkillPrefab = _SkillPrefab;
        this._AnimationName = _AnimationName;
        this._HitFxPrefab = _HitFxPrefab;
        this._Level = _Level;
        this._AttackType = _AttackType;
        this._SelectorType = _SelectorType;
    }
}
class SkillConfigTB extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.trs = new Map();
        this.trs.set(1001, new SkillConfigTR(1001, "降龙十八掌", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill1", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1002, new SkillConfigTR(1002, "暴雨梨花", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill2", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1003, new SkillConfigTR(1003, "排山倒海", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill3", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1004, new SkillConfigTR(1004, "葵花点穴手", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill4", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
    }
}


/***/ }),

/***/ "./src/data/pb/Opcode.ts":
/*!*******************************!*\
  !*** ./src/data/pb/Opcode.ts ***!
  \*******************************/
/*! exports provided: DecodeMsg, Opcode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecodeMsg", function() { return DecodeMsg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Opcode", function() { return Opcode; });
/* harmony import */ var _gen_pb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gen/pb */ "./src/data/pb/gen/pb.js");
/* harmony import */ var _gen_pb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gen_pb__WEBPACK_IMPORTED_MODULE_0__);

class DecodeMsg {
}
class Opcode {
    static decode(opcode, msg) {
        let msgObj = this.map[opcode]["decode"](msg);
        let decodeMsg = new DecodeMsg();
        decodeMsg.rpcId = msgObj.RpcId;
        decodeMsg.msgObj = msgObj;
        return decodeMsg;
    }
    static encode(opcode, msg) {
        let buf = this.map[opcode]["encode"](msg).finish();
        return buf;
    }
}
Opcode.MSG_C2R_Login = 1000;
Opcode.MSG_R2C_Login = 1001;
Opcode.MSG_C2G_LoginGate = 1002;
Opcode.MSG_G2C_LoginGate = 1003;
Opcode.MSG_C2GS_Test = 2001;
Opcode.MSG_GS2C_Test = 2002;
Opcode.map = {
    1000: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2R_Login.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2R_Login.encode },
    1001: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].R2C_Login.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].R2C_Login.encode },
    1002: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2G_LoginGate.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2G_LoginGate.encode },
    1003: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].G2C_LoginGate.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].G2C_LoginGate.encode },
    2001: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2GS_Test.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2GS_Test.encode },
    2002: { "decode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].GS2C_Test.decode, "encode": _gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].GS2C_Test.encode }
};


/***/ }),

/***/ "./src/data/pb/gen/pb.js":
/*!*******************************!*\
  !*** ./src/data/pb/gen/pb.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/


var $protobuf = __webpack_require__(/*! protobufjs/minimal */ "./node_modules/protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
$protobuf.util.Long = Long;
$protobuf.configure();


// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.nice_ts = (function() {

    /**
     * Namespace nice_ts.
     * @exports nice_ts
     * @namespace
     */
    var nice_ts = {};

    nice_ts.C2R_Login = (function() {

        /**
         * Properties of a C2R_Login.
         * @memberof nice_ts
         * @interface IC2R_Login
         * @property {string|null} [Account] C2R_Login Account
         * @property {string|null} [Password] C2R_Login Password
         */

        /**
         * Constructs a new C2R_Login.
         * @memberof nice_ts
         * @classdesc Represents a C2R_Login.
         * @implements IC2R_Login
         * @constructor
         * @param {nice_ts.IC2R_Login=} [properties] Properties to set
         */
        function C2R_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2R_Login Account.
         * @member {string} Account
         * @memberof nice_ts.C2R_Login
         * @instance
         */
        C2R_Login.prototype.Account = "";

        /**
         * C2R_Login Password.
         * @member {string} Password
         * @memberof nice_ts.C2R_Login
         * @instance
         */
        C2R_Login.prototype.Password = "";

        /**
         * Creates a new C2R_Login instance using the specified properties.
         * @function create
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.IC2R_Login=} [properties] Properties to set
         * @returns {nice_ts.C2R_Login} C2R_Login instance
         */
        C2R_Login.create = function create(properties) {
            return new C2R_Login(properties);
        };

        /**
         * Encodes the specified C2R_Login message. Does not implicitly {@link nice_ts.C2R_Login.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.IC2R_Login} message C2R_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Account != null && Object.hasOwnProperty.call(message, "Account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Account);
            if (message.Password != null && Object.hasOwnProperty.call(message, "Password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Password);
            return writer;
        };

        /**
         * Encodes the specified C2R_Login message, length delimited. Does not implicitly {@link nice_ts.C2R_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.IC2R_Login} message C2R_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2R_Login message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.C2R_Login} C2R_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.C2R_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Account = reader.string();
                    break;
                case 2:
                    message.Password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2R_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.C2R_Login} C2R_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2R_Login message.
         * @function verify
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2R_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Account != null && message.hasOwnProperty("Account"))
                if (!$util.isString(message.Account))
                    return "Account: string expected";
            if (message.Password != null && message.hasOwnProperty("Password"))
                if (!$util.isString(message.Password))
                    return "Password: string expected";
            return null;
        };

        /**
         * Creates a C2R_Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.C2R_Login} C2R_Login
         */
        C2R_Login.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.C2R_Login)
                return object;
            var message = new $root.nice_ts.C2R_Login();
            if (object.Account != null)
                message.Account = String(object.Account);
            if (object.Password != null)
                message.Password = String(object.Password);
            return message;
        };

        /**
         * Creates a plain object from a C2R_Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.C2R_Login
         * @static
         * @param {nice_ts.C2R_Login} message C2R_Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2R_Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Account = "";
                object.Password = "";
            }
            if (message.Account != null && message.hasOwnProperty("Account"))
                object.Account = message.Account;
            if (message.Password != null && message.hasOwnProperty("Password"))
                object.Password = message.Password;
            return object;
        };

        /**
         * Converts this C2R_Login to JSON.
         * @function toJSON
         * @memberof nice_ts.C2R_Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2R_Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2R_Login;
    })();

    nice_ts.R2C_Login = (function() {

        /**
         * Properties of a R2C_Login.
         * @memberof nice_ts
         * @interface IR2C_Login
         * @property {number|null} [Error] R2C_Login Error
         * @property {string|null} [Message] R2C_Login Message
         * @property {string|null} [Address] R2C_Login Address
         * @property {number|Long|null} [Key] R2C_Login Key
         * @property {number|Long|null} [GateId] R2C_Login GateId
         */

        /**
         * Constructs a new R2C_Login.
         * @memberof nice_ts
         * @classdesc Represents a R2C_Login.
         * @implements IR2C_Login
         * @constructor
         * @param {nice_ts.IR2C_Login=} [properties] Properties to set
         */
        function R2C_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * R2C_Login Error.
         * @member {number} Error
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Error = 0;

        /**
         * R2C_Login Message.
         * @member {string} Message
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Message = "";

        /**
         * R2C_Login Address.
         * @member {string} Address
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Address = "";

        /**
         * R2C_Login Key.
         * @member {number|Long} Key
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Key = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * R2C_Login GateId.
         * @member {number|Long} GateId
         * @memberof nice_ts.R2C_Login
         * @instance
         */
        R2C_Login.prototype.GateId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new R2C_Login instance using the specified properties.
         * @function create
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.IR2C_Login=} [properties] Properties to set
         * @returns {nice_ts.R2C_Login} R2C_Login instance
         */
        R2C_Login.create = function create(properties) {
            return new R2C_Login(properties);
        };

        /**
         * Encodes the specified R2C_Login message. Does not implicitly {@link nice_ts.R2C_Login.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.IR2C_Login} message R2C_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Address != null && Object.hasOwnProperty.call(message, "Address"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Address);
            if (message.Key != null && Object.hasOwnProperty.call(message, "Key"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.Key);
            if (message.GateId != null && Object.hasOwnProperty.call(message, "GateId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.GateId);
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified R2C_Login message, length delimited. Does not implicitly {@link nice_ts.R2C_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.IR2C_Login} message R2C_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a R2C_Login message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.R2C_Login} R2C_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.R2C_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.Address = reader.string();
                    break;
                case 2:
                    message.Key = reader.int64();
                    break;
                case 3:
                    message.GateId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a R2C_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.R2C_Login} R2C_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a R2C_Login message.
         * @function verify
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        R2C_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.Address != null && message.hasOwnProperty("Address"))
                if (!$util.isString(message.Address))
                    return "Address: string expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isInteger(message.Key) && !(message.Key && $util.isInteger(message.Key.low) && $util.isInteger(message.Key.high)))
                    return "Key: integer|Long expected";
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (!$util.isInteger(message.GateId) && !(message.GateId && $util.isInteger(message.GateId.low) && $util.isInteger(message.GateId.high)))
                    return "GateId: integer|Long expected";
            return null;
        };

        /**
         * Creates a R2C_Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.R2C_Login} R2C_Login
         */
        R2C_Login.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.R2C_Login)
                return object;
            var message = new $root.nice_ts.R2C_Login();
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.Address != null)
                message.Address = String(object.Address);
            if (object.Key != null)
                if ($util.Long)
                    (message.Key = $util.Long.fromValue(object.Key)).unsigned = false;
                else if (typeof object.Key === "string")
                    message.Key = parseInt(object.Key, 10);
                else if (typeof object.Key === "number")
                    message.Key = object.Key;
                else if (typeof object.Key === "object")
                    message.Key = new $util.LongBits(object.Key.low >>> 0, object.Key.high >>> 0).toNumber();
            if (object.GateId != null)
                if ($util.Long)
                    (message.GateId = $util.Long.fromValue(object.GateId)).unsigned = false;
                else if (typeof object.GateId === "string")
                    message.GateId = parseInt(object.GateId, 10);
                else if (typeof object.GateId === "number")
                    message.GateId = object.GateId;
                else if (typeof object.GateId === "object")
                    message.GateId = new $util.LongBits(object.GateId.low >>> 0, object.GateId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a R2C_Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.R2C_Login
         * @static
         * @param {nice_ts.R2C_Login} message R2C_Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        R2C_Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Address = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Key = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Key = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.GateId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.GateId = options.longs === String ? "0" : 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.Address != null && message.hasOwnProperty("Address"))
                object.Address = message.Address;
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (typeof message.Key === "number")
                    object.Key = options.longs === String ? String(message.Key) : message.Key;
                else
                    object.Key = options.longs === String ? $util.Long.prototype.toString.call(message.Key) : options.longs === Number ? new $util.LongBits(message.Key.low >>> 0, message.Key.high >>> 0).toNumber() : message.Key;
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (typeof message.GateId === "number")
                    object.GateId = options.longs === String ? String(message.GateId) : message.GateId;
                else
                    object.GateId = options.longs === String ? $util.Long.prototype.toString.call(message.GateId) : options.longs === Number ? new $util.LongBits(message.GateId.low >>> 0, message.GateId.high >>> 0).toNumber() : message.GateId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this R2C_Login to JSON.
         * @function toJSON
         * @memberof nice_ts.R2C_Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        R2C_Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return R2C_Login;
    })();

    nice_ts.C2G_LoginGate = (function() {

        /**
         * Properties of a C2G_LoginGate.
         * @memberof nice_ts
         * @interface IC2G_LoginGate
         * @property {number|Long|null} [Key] C2G_LoginGate Key
         * @property {number|Long|null} [GateId] C2G_LoginGate GateId
         */

        /**
         * Constructs a new C2G_LoginGate.
         * @memberof nice_ts
         * @classdesc Represents a C2G_LoginGate.
         * @implements IC2G_LoginGate
         * @constructor
         * @param {nice_ts.IC2G_LoginGate=} [properties] Properties to set
         */
        function C2G_LoginGate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2G_LoginGate Key.
         * @member {number|Long} Key
         * @memberof nice_ts.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.Key = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * C2G_LoginGate GateId.
         * @member {number|Long} GateId
         * @memberof nice_ts.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.GateId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new C2G_LoginGate instance using the specified properties.
         * @function create
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.IC2G_LoginGate=} [properties] Properties to set
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate instance
         */
        C2G_LoginGate.create = function create(properties) {
            return new C2G_LoginGate(properties);
        };

        /**
         * Encodes the specified C2G_LoginGate message. Does not implicitly {@link nice_ts.C2G_LoginGate.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.IC2G_LoginGate} message C2G_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_LoginGate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Key != null && Object.hasOwnProperty.call(message, "Key"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.Key);
            if (message.GateId != null && Object.hasOwnProperty.call(message, "GateId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.GateId);
            return writer;
        };

        /**
         * Encodes the specified C2G_LoginGate message, length delimited. Does not implicitly {@link nice_ts.C2G_LoginGate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.IC2G_LoginGate} message C2G_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_LoginGate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2G_LoginGate message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_LoginGate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.C2G_LoginGate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Key = reader.int64();
                    break;
                case 2:
                    message.GateId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2G_LoginGate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_LoginGate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2G_LoginGate message.
         * @function verify
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2G_LoginGate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isInteger(message.Key) && !(message.Key && $util.isInteger(message.Key.low) && $util.isInteger(message.Key.high)))
                    return "Key: integer|Long expected";
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (!$util.isInteger(message.GateId) && !(message.GateId && $util.isInteger(message.GateId.low) && $util.isInteger(message.GateId.high)))
                    return "GateId: integer|Long expected";
            return null;
        };

        /**
         * Creates a C2G_LoginGate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.C2G_LoginGate} C2G_LoginGate
         */
        C2G_LoginGate.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.C2G_LoginGate)
                return object;
            var message = new $root.nice_ts.C2G_LoginGate();
            if (object.Key != null)
                if ($util.Long)
                    (message.Key = $util.Long.fromValue(object.Key)).unsigned = false;
                else if (typeof object.Key === "string")
                    message.Key = parseInt(object.Key, 10);
                else if (typeof object.Key === "number")
                    message.Key = object.Key;
                else if (typeof object.Key === "object")
                    message.Key = new $util.LongBits(object.Key.low >>> 0, object.Key.high >>> 0).toNumber();
            if (object.GateId != null)
                if ($util.Long)
                    (message.GateId = $util.Long.fromValue(object.GateId)).unsigned = false;
                else if (typeof object.GateId === "string")
                    message.GateId = parseInt(object.GateId, 10);
                else if (typeof object.GateId === "number")
                    message.GateId = object.GateId;
                else if (typeof object.GateId === "object")
                    message.GateId = new $util.LongBits(object.GateId.low >>> 0, object.GateId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a C2G_LoginGate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.C2G_LoginGate
         * @static
         * @param {nice_ts.C2G_LoginGate} message C2G_LoginGate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2G_LoginGate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Key = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Key = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.GateId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.GateId = options.longs === String ? "0" : 0;
            }
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (typeof message.Key === "number")
                    object.Key = options.longs === String ? String(message.Key) : message.Key;
                else
                    object.Key = options.longs === String ? $util.Long.prototype.toString.call(message.Key) : options.longs === Number ? new $util.LongBits(message.Key.low >>> 0, message.Key.high >>> 0).toNumber() : message.Key;
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (typeof message.GateId === "number")
                    object.GateId = options.longs === String ? String(message.GateId) : message.GateId;
                else
                    object.GateId = options.longs === String ? $util.Long.prototype.toString.call(message.GateId) : options.longs === Number ? new $util.LongBits(message.GateId.low >>> 0, message.GateId.high >>> 0).toNumber() : message.GateId;
            return object;
        };

        /**
         * Converts this C2G_LoginGate to JSON.
         * @function toJSON
         * @memberof nice_ts.C2G_LoginGate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2G_LoginGate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2G_LoginGate;
    })();

    nice_ts.G2C_LoginGate = (function() {

        /**
         * Properties of a G2C_LoginGate.
         * @memberof nice_ts
         * @interface IG2C_LoginGate
         * @property {number|null} [Error] G2C_LoginGate Error
         * @property {string|null} [Message] G2C_LoginGate Message
         * @property {number|Long|null} [PlayerId] G2C_LoginGate PlayerId
         */

        /**
         * Constructs a new G2C_LoginGate.
         * @memberof nice_ts
         * @classdesc Represents a G2C_LoginGate.
         * @implements IG2C_LoginGate
         * @constructor
         * @param {nice_ts.IG2C_LoginGate=} [properties] Properties to set
         */
        function G2C_LoginGate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G2C_LoginGate Error.
         * @member {number} Error
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.Error = 0;

        /**
         * G2C_LoginGate Message.
         * @member {string} Message
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.Message = "";

        /**
         * G2C_LoginGate PlayerId.
         * @member {number|Long} PlayerId
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.PlayerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new G2C_LoginGate instance using the specified properties.
         * @function create
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.IG2C_LoginGate=} [properties] Properties to set
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate instance
         */
        G2C_LoginGate.create = function create(properties) {
            return new G2C_LoginGate(properties);
        };

        /**
         * Encodes the specified G2C_LoginGate message. Does not implicitly {@link nice_ts.G2C_LoginGate.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.IG2C_LoginGate} message G2C_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_LoginGate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PlayerId != null && Object.hasOwnProperty.call(message, "PlayerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.PlayerId);
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified G2C_LoginGate message, length delimited. Does not implicitly {@link nice_ts.G2C_LoginGate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.IG2C_LoginGate} message G2C_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_LoginGate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_LoginGate message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_LoginGate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.G2C_LoginGate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.PlayerId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_LoginGate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_LoginGate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_LoginGate message.
         * @function verify
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_LoginGate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                if (!$util.isInteger(message.PlayerId) && !(message.PlayerId && $util.isInteger(message.PlayerId.low) && $util.isInteger(message.PlayerId.high)))
                    return "PlayerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a G2C_LoginGate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.G2C_LoginGate} G2C_LoginGate
         */
        G2C_LoginGate.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.G2C_LoginGate)
                return object;
            var message = new $root.nice_ts.G2C_LoginGate();
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.PlayerId != null)
                if ($util.Long)
                    (message.PlayerId = $util.Long.fromValue(object.PlayerId)).unsigned = false;
                else if (typeof object.PlayerId === "string")
                    message.PlayerId = parseInt(object.PlayerId, 10);
                else if (typeof object.PlayerId === "number")
                    message.PlayerId = object.PlayerId;
                else if (typeof object.PlayerId === "object")
                    message.PlayerId = new $util.LongBits(object.PlayerId.low >>> 0, object.PlayerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a G2C_LoginGate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.G2C_LoginGate
         * @static
         * @param {nice_ts.G2C_LoginGate} message G2C_LoginGate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_LoginGate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.PlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.PlayerId = options.longs === String ? "0" : 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                if (typeof message.PlayerId === "number")
                    object.PlayerId = options.longs === String ? String(message.PlayerId) : message.PlayerId;
                else
                    object.PlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.PlayerId) : options.longs === Number ? new $util.LongBits(message.PlayerId.low >>> 0, message.PlayerId.high >>> 0).toNumber() : message.PlayerId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this G2C_LoginGate to JSON.
         * @function toJSON
         * @memberof nice_ts.G2C_LoginGate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_LoginGate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_LoginGate;
    })();

    nice_ts.C2GS_Test = (function() {

        /**
         * Properties of a C2GS_Test.
         * @memberof nice_ts
         * @interface IC2GS_Test
         * @property {number|null} [testID] C2GS_Test testID
         * @property {string|null} [testName] C2GS_Test testName
         */

        /**
         * Constructs a new C2GS_Test.
         * @memberof nice_ts
         * @classdesc Represents a C2GS_Test.
         * @implements IC2GS_Test
         * @constructor
         * @param {nice_ts.IC2GS_Test=} [properties] Properties to set
         */
        function C2GS_Test(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2GS_Test testID.
         * @member {number} testID
         * @memberof nice_ts.C2GS_Test
         * @instance
         */
        C2GS_Test.prototype.testID = 0;

        /**
         * C2GS_Test testName.
         * @member {string} testName
         * @memberof nice_ts.C2GS_Test
         * @instance
         */
        C2GS_Test.prototype.testName = "";

        /**
         * Creates a new C2GS_Test instance using the specified properties.
         * @function create
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.IC2GS_Test=} [properties] Properties to set
         * @returns {nice_ts.C2GS_Test} C2GS_Test instance
         */
        C2GS_Test.create = function create(properties) {
            return new C2GS_Test(properties);
        };

        /**
         * Encodes the specified C2GS_Test message. Does not implicitly {@link nice_ts.C2GS_Test.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.IC2GS_Test} message C2GS_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2GS_Test.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.testID != null && Object.hasOwnProperty.call(message, "testID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.testID);
            if (message.testName != null && Object.hasOwnProperty.call(message, "testName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.testName);
            return writer;
        };

        /**
         * Encodes the specified C2GS_Test message, length delimited. Does not implicitly {@link nice_ts.C2GS_Test.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.IC2GS_Test} message C2GS_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2GS_Test.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2GS_Test message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.C2GS_Test} C2GS_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2GS_Test.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.C2GS_Test();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.testID = reader.int32();
                    break;
                case 2:
                    message.testName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2GS_Test message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.C2GS_Test} C2GS_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2GS_Test.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2GS_Test message.
         * @function verify
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2GS_Test.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.testID != null && message.hasOwnProperty("testID"))
                if (!$util.isInteger(message.testID))
                    return "testID: integer expected";
            if (message.testName != null && message.hasOwnProperty("testName"))
                if (!$util.isString(message.testName))
                    return "testName: string expected";
            return null;
        };

        /**
         * Creates a C2GS_Test message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.C2GS_Test} C2GS_Test
         */
        C2GS_Test.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.C2GS_Test)
                return object;
            var message = new $root.nice_ts.C2GS_Test();
            if (object.testID != null)
                message.testID = object.testID | 0;
            if (object.testName != null)
                message.testName = String(object.testName);
            return message;
        };

        /**
         * Creates a plain object from a C2GS_Test message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.C2GS_Test
         * @static
         * @param {nice_ts.C2GS_Test} message C2GS_Test
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2GS_Test.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.testID = 0;
                object.testName = "";
            }
            if (message.testID != null && message.hasOwnProperty("testID"))
                object.testID = message.testID;
            if (message.testName != null && message.hasOwnProperty("testName"))
                object.testName = message.testName;
            return object;
        };

        /**
         * Converts this C2GS_Test to JSON.
         * @function toJSON
         * @memberof nice_ts.C2GS_Test
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2GS_Test.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2GS_Test;
    })();

    nice_ts.GS2C_Test = (function() {

        /**
         * Properties of a GS2C_Test.
         * @memberof nice_ts
         * @interface IGS2C_Test
         * @property {number|null} [Error] GS2C_Test Error
         * @property {string|null} [Message] GS2C_Test Message
         * @property {string|null} [testResponse] GS2C_Test testResponse
         */

        /**
         * Constructs a new GS2C_Test.
         * @memberof nice_ts
         * @classdesc Represents a GS2C_Test.
         * @implements IGS2C_Test
         * @constructor
         * @param {nice_ts.IGS2C_Test=} [properties] Properties to set
         */
        function GS2C_Test(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GS2C_Test Error.
         * @member {number} Error
         * @memberof nice_ts.GS2C_Test
         * @instance
         */
        GS2C_Test.prototype.Error = 0;

        /**
         * GS2C_Test Message.
         * @member {string} Message
         * @memberof nice_ts.GS2C_Test
         * @instance
         */
        GS2C_Test.prototype.Message = "";

        /**
         * GS2C_Test testResponse.
         * @member {string} testResponse
         * @memberof nice_ts.GS2C_Test
         * @instance
         */
        GS2C_Test.prototype.testResponse = "";

        /**
         * Creates a new GS2C_Test instance using the specified properties.
         * @function create
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.IGS2C_Test=} [properties] Properties to set
         * @returns {nice_ts.GS2C_Test} GS2C_Test instance
         */
        GS2C_Test.create = function create(properties) {
            return new GS2C_Test(properties);
        };

        /**
         * Encodes the specified GS2C_Test message. Does not implicitly {@link nice_ts.GS2C_Test.verify|verify} messages.
         * @function encode
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.IGS2C_Test} message GS2C_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2C_Test.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.testResponse != null && Object.hasOwnProperty.call(message, "testResponse"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.testResponse);
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified GS2C_Test message, length delimited. Does not implicitly {@link nice_ts.GS2C_Test.verify|verify} messages.
         * @function encodeDelimited
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.IGS2C_Test} message GS2C_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2C_Test.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GS2C_Test message from the specified reader or buffer.
         * @function decode
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {nice_ts.GS2C_Test} GS2C_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2C_Test.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nice_ts.GS2C_Test();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.testResponse = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GS2C_Test message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {nice_ts.GS2C_Test} GS2C_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2C_Test.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GS2C_Test message.
         * @function verify
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GS2C_Test.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.testResponse != null && message.hasOwnProperty("testResponse"))
                if (!$util.isString(message.testResponse))
                    return "testResponse: string expected";
            return null;
        };

        /**
         * Creates a GS2C_Test message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {nice_ts.GS2C_Test} GS2C_Test
         */
        GS2C_Test.fromObject = function fromObject(object) {
            if (object instanceof $root.nice_ts.GS2C_Test)
                return object;
            var message = new $root.nice_ts.GS2C_Test();
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.testResponse != null)
                message.testResponse = String(object.testResponse);
            return message;
        };

        /**
         * Creates a plain object from a GS2C_Test message. Also converts values to other types if specified.
         * @function toObject
         * @memberof nice_ts.GS2C_Test
         * @static
         * @param {nice_ts.GS2C_Test} message GS2C_Test
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GS2C_Test.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.testResponse = "";
                object.Error = 0;
                object.Message = "";
            }
            if (message.testResponse != null && message.hasOwnProperty("testResponse"))
                object.testResponse = message.testResponse;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this GS2C_Test to JSON.
         * @function toJSON
         * @memberof nice_ts.GS2C_Test
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GS2C_Test.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GS2C_Test;
    })();

    return nice_ts;
})();

module.exports = $root;


/***/ }),

/***/ "./src/data/ui/combat.ts":
/*!*******************************!*\
  !*** ./src/data/ui/combat.ts ***!
  \*******************************/
/*! exports provided: combatUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combatUI", function() { return combatUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class combatUI {
}
combatUI.PackageName = "combat";
combatUI.PackageBytes = "combat_fui.bytes";
combatUI.UItest = "test";
combatUI.UICard = "Card";
combatUI.UICombatPage = "CombatPage";
combatUI.UIRoom = "Room";


/***/ }),

/***/ "./src/data/ui/common.ts":
/*!*******************************!*\
  !*** ./src/data/ui/common.ts ***!
  \*******************************/
/*! exports provided: commonUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonUI", function() { return commonUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class commonUI {
}
commonUI.PackageName = "common";
commonUI.PackageBytes = "common_fui.bytes";
commonUI.UILoadingPage = "LoadingPage";
commonUI.UIUIGuideWin = "UIGuideWin";
commonUI.UIUINoticeWin = "UINoticeWin";


/***/ }),

/***/ "./src/data/ui/home.ts":
/*!*****************************!*\
  !*** ./src/data/ui/home.ts ***!
  \*****************************/
/*! exports provided: homeUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homeUI", function() { return homeUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class homeUI {
}
homeUI.PackageName = "home";
homeUI.PackageBytes = "home_fui.bytes";
homeUI.UIHomePage = "HomePage";
homeUI.UILevelPage = "LevelPage";
homeUI.UIShopPage = "ShopPage";


/***/ }),

/***/ "./src/data/ui/login.ts":
/*!******************************!*\
  !*** ./src/data/ui/login.ts ***!
  \******************************/
/*! exports provided: loginUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginUI", function() { return loginUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class loginUI {
}
loginUI.PackageName = "login";
loginUI.PackageBytes = "login_fui.bytes";
loginUI.UILoginPage = "LoginPage";
loginUI.UISelServerWin = "SelServerWin";
loginUI.UIAreaItem = "AreaItem";


/***/ }),

/***/ "./src/data/ui/story.ts":
/*!******************************!*\
  !*** ./src/data/ui/story.ts ***!
  \******************************/
/*! exports provided: storyUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storyUI", function() { return storyUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class storyUI {
}
storyUI.PackageName = "story";
storyUI.PackageBytes = "story_fui.bytes";
storyUI.UIStoryWin = "StoryWin";


/***/ }),

/***/ "./src/framework/common/GameObjectPool.ts":
/*!************************************************!*\
  !*** ./src/framework/common/GameObjectPool.ts ***!
  \************************************************/
/*! exports provided: GameObjectPool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameObjectPool", function() { return GameObjectPool; });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



// -- GameObject缓存池
// -- 注意：
// -- 1、所有需要预设都从这里加载，不要直接到ResourcesManager去加载，由这里统一做缓存管理
// -- 2、缓存分为两部分：从资源层加载的原始GameObject(Asset)，从GameObject实例化出来的多个Inst
class GameObjectPool extends _Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.__cacheTransRoot = null;
        this.__goPool = new Map();
        this.__instCache = new Map();
        let go = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Find("GameObjectCacheRoot");
        if (go == undefined) {
            go = new csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject("GameObjectCacheRoot");
            csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].Object.DontDestroyOnLoad(go);
        }
        this.__cacheTransRoot = go.transform;
    }
    //-- 检测是否已经被缓存
    checkHasCached(path) {
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            return true;
        }
        let pooledGo = this.__goPool.get(path);
        return pooledGo != undefined;
    }
    //-- 缓存并实例化GameObject
    cacheAndInstGameObject(path, go, inst_count = 1) {
        this.__goPool.set(path, go);
        if (inst_count > 0) {
            let cachedInst = this.__instCache.get(path);
            for (let i = 0; i < inst_count; i++) {
                let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(go);
                inst.transform.SetParent(this.__cacheTransRoot);
                inst.SetActive(false);
                cachedInst.push(inst);
            }
        }
    }
    //-- 尝试从缓存中获取
    tryGetFromCache(path) {
        if (!this.checkHasCached(path)) {
            return null;
        }
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            let inst = cachedInst.pop();
            return inst;
        }
        let pooledGo = this.__goPool.get(path);
        if (pooledGo != undefined) {
            let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(pooledGo);
            return inst;
        }
        return null;
    }
    //预加载：可提供初始实例化个数
    async preLoadGameObjectAsync(path, inst_count, callback, ...params) {
        if (this.checkHasCached(path)) {
            if (callback != null) {
                callback(params);
            }
            return;
        }
        let go = await _ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).loadPrefab(path);
        if (go != undefined) {
            this.cacheAndInstGameObject(path, go, inst_count);
        }
        if (callback != null) {
            callback(params);
        }
    }
    //-- 异步获取：必要时加载
    async getGameObjectAsync(path, callback, ...params) {
        let inst = this.tryGetFromCache(path);
        if (inst == null) {
            await this.preLoadGameObjectAsync(path, 1, callback, params);
        }
        inst = this.tryGetFromCache(path);
        inst.SetActive(true);
    }
    //-- 回收
    recycleGameObject(path, inst) {
        inst.transform.SetParent(this.__cacheTransRoot);
        inst.SetActive(false);
        let cachedInst = this.__instCache.get(path) || new Array();
        cachedInst.push(inst);
        this.__instCache.set(path, cachedInst);
    }
    //-- 清理缓存
    cleanup(includePooledGo = false) {
        this.__instCache.forEach((values, key) => {
            for (let inst of values) {
                if (inst != null) {
                    csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Destroy(inst);
                }
            }
        });
        this.__instCache.clear();
        if (includePooledGo) {
            this.__goPool.forEach((go, key) => {
                if (go != null) {
                    _ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).releaseAddressGO(go);
                }
            });
            this.__goPool.clear();
        }
    }
}


/***/ }),

/***/ "./src/framework/common/List.ts":
/*!**************************************!*\
  !*** ./src/framework/common/List.ts ***!
  \**************************************/
/*! exports provided: List */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
class List extends Array {
    constructor() {
        super();
        this.add = function (value) {
            this.push(value);
        };
        this.insert = function (index, value) {
            this.splice(index, 0, value);
        };
        this.remove = function (value) {
            var index = this.indexOf(value);
            this.removeAt(index);
        };
        this.removeAt = function (index) {
            this.splice(index, 1);
        };
        this.contains = function (value) {
            return this.indexOf(value) >= 0;
        };
        this.clear = function () {
            this.splice(0);
        };
        this.foreach = function (callback) {
            this._breaking = false;
            var sum = this.length;
            for (var i = 0; i < sum; i++) {
                if (this._breaking) {
                    break;
                }
                callback(this[i]);
            }
        };
        this._breaking = false;
        this.break = function () {
            this._breaking = true;
        };
        this.toArray = function () {
            var array = [];
            this.forEach(element => {
                array.push(element);
            });
            return array;
        };
        this.append = function (value) {
            value.forEach(element => {
                this.push(element);
            });
        };
    }
    get count() {
        return this.length;
    }
}


/***/ }),

/***/ "./src/framework/common/Messenger.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Messenger.ts ***!
  \*******************************************/
/*! exports provided: MesObj, Messenger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MesObj", function() { return MesObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messenger", function() { return Messenger; });
class MesObj {
}
class Messenger {
    constructor() {
        this.listenerMap = new Map();
    }
    addListener(e_type, e_obj, e_listner) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) == "undefined") {
            msgObj = new MesObj();
            msgObj.obj = e_obj;
            msgObj.listeners = new Array();
        }
        msgObj.listeners.push(e_listner);
        this.listenerMap.set(e_type, msgObj);
    }
    getListener(e_type) {
        return this.listenerMap.get(e_type);
    }
    broadcast(e_type, ...params) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) != "undefined") {
            for (let l of msgObj.listeners) {
                l.apply(msgObj.obj, params);
            }
        }
    }
    removeListenerByType(e_type) {
        this.listenerMap.delete(e_type);
    }
    removeListener(e_type, e_listener) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) != "undefined") {
            for (let i = 0; i < msgObj.listeners.length; i++) {
                if (msgObj.listeners[i] == e_listener) {
                    msgObj.listeners.splice(i, 1);
                }
            }
        }
    }
    clearup() {
        this.listenerMap.clear();
    }
}


/***/ }),

/***/ "./src/framework/common/NiceDecorator.ts":
/*!***********************************************!*\
  !*** ./src/framework/common/NiceDecorator.ts ***!
  \***********************************************/
/*! exports provided: binder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binder", function() { return binder; });
// FairyGUI 元件 绑定器
function binder(name) {
    return function (target, key) {
        target["binders"] = target["binders"] || {};
        target["binders"][key] = name;
    };
}


/***/ }),

/***/ "./src/framework/common/ResManager.ts":
/*!********************************************!*\
  !*** ./src/framework/common/ResManager.ts ***!
  \********************************************/
/*! exports provided: ResManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResManager", function() { return ResManager; });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");




class ResManager extends _Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this._pkgMap = new Map();
    }
    async loadFairyGUIPackage(packageName) {
        try {
            let count = this._pkgMap.get(packageName);
            if (count == null || count < 1) {
                //没有缓存，加载
                let address = packageName + "_fui.bytes";
                let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadFairyGUIPackage(address, packageName);
                await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
                this._pkgMap.set(packageName, 1);
            }
            else {
                this._pkgMap.set(packageName, count + 1);
            }
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load fairyGUI :${packageName} : ${ex}`);
        }
    }
    releaseFairyGUIPackage(packageName) {
        let count = this._pkgMap.get(packageName);
        if (count != null && count > 1) {
            this._pkgMap.set(packageName, count - 1);
        }
        else {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log(`release fagui package:${packageName}`);
            this._pkgMap.delete(packageName);
            csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.ReleaseFGUIPackage(packageName);
        }
    }
    async loadScene(sceneName, mode = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].SceneManagement.LoadSceneMode.Single) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadScene(sceneName, mode, (progress) => {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("load scene: " + progress);
            });
            let scenInstance = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return scenInstance;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load Scene :${sceneName} : ${ex}`);
            return null;
        }
    }
    async unloadScene(sceneInstance) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.UnloadScene(sceneInstance);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Unload scene  : ${ex}`);
            return null;
        }
    }
    unloadSceneByName(sceneName) {
        csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.UnloadSceneByName(sceneName);
    }
    async loadPrefab(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadPrefab(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load prefab :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextAsset(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadTextAsset(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load textasset :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextBytes(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadTextBytes(address);
            let bytes = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return bytes;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`LoadTextBytes :${address} : ${ex}`);
        }
    }
    async loadSprite(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadSprite(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load sprite :${address} : ${ex}`);
            return null;
        }
    }
    releaseAddressGO(go) {
        csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.ReleaseAddressGO(go);
    }
}


/***/ }),

/***/ "./src/framework/common/Singleton.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Singleton.ts ***!
  \*******************************************/
/*! exports provided: Singleton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Singleton", function() { return Singleton; });
class Singleton {
    static Instance(c) {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    }
}
Singleton.instance = null;


/***/ }),

/***/ "./src/framework/core/ArrayMap.ts":
/*!****************************************!*\
  !*** ./src/framework/core/ArrayMap.ts ***!
  \****************************************/
/*! exports provided: ArrayMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayMap", function() { return ArrayMap; });
class ArrayMap {
    constructor() {
        this._arr = new Array();
        this._map = new Map();
    }
    add(key, value) {
        this._map.set(key, value);
        this._arr.push(value);
        return value;
    }
    get(key) {
        return this._map.get(key);
    }
    remove(key) {
        var obj = this._map.get(key);
        if (!obj)
            return null;
        var index = this._arr.indexOf(obj);
        this._arr.splice(index, 1);
        this._map.delete(key);
        return obj;
    }
    /**
     * 返回新的数组实例
     */
    getArr() {
        return this._arr;
    }
    dispose() {
        this._arr.length = 0;
        this._map.clear();
    }
}


/***/ }),

/***/ "./src/framework/entity/AEntity.ts":
/*!*****************************************!*\
  !*** ./src/framework/entity/AEntity.ts ***!
  \*****************************************/
/*! exports provided: AEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AEntity", function() { return AEntity; });
/* harmony import */ var _core_ArrayMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ArrayMap */ "./src/framework/core/ArrayMap.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");


class AEntity {
    constructor() {
        this.uuid = 0;
        this.eventsMap = new Map();
        this.components = new Map();
        this.parent = null;
        this._children = new _core_ArrayMap__WEBPACK_IMPORTED_MODULE_0__["ArrayMap"]();
        this._typeChildren = new Map();
    }
    addChild(child, c) {
        child.parent = this;
        this._children.add(child.uuid, child);
        let childrenArr = this._typeChildren.get(c.name);
        if (childrenArr == null) {
            childrenArr = new Array();
            this._typeChildren.set(c.name, childrenArr);
        }
        childrenArr.push(child);
    }
    removeChild(child) {
        let entity = this._children.remove(child.uuid);
        entity.dispose();
    }
    getChildren() {
        return this._children.getArr();
    }
    getChildByUUID(uuid) {
        return this._children.get(uuid);
    }
    getChildrenByType(c) {
        return this._typeChildren.get(c.name);
    }
    getChildByType(c) {
        return this.getChildrenByType(c)[0];
    }
    addComponent(c) {
        let cc = new c();
        cc.entity = this;
        this.components[c.name] = cc;
        return cc;
    }
    getComponent(c) {
        return this.components[c.name];
    }
    getOrAddComponent(c) {
        let com = this.getComponent(c);
        if (com == null) {
            com = this.addComponent(c);
        }
        return com;
    }
    publish(event, c) {
        let array = this.eventsMap.get(c.name);
        if (array == null || array.length == 0) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("this event not subscribed...");
            return;
        }
        for (let i = 0; i < array.length; i++) {
            let f = array[i];
            if (f != null)
                f(event);
        }
    }
    subscribe(action, c) {
        let array = this.eventsMap.get(c.name);
        if (array == null) {
            array = new Array();
            this.eventsMap.set(c.name, array);
        }
        array.push(action);
    }
    unSubscribe(action, c) {
        let array = this.eventsMap.get(c.name);
        let index = array.indexOf(action, 0);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    dispose() {
        let children = this.getChildren;
        for (let i = 0; i < children.length; i++) {
            children[i].dispose();
        }
        this.components.clear();
        this.eventsMap.clear();
        this._typeChildren.clear();
        this._children.dispose();
        this.parent = null;
    }
}


/***/ }),

/***/ "./src/framework/entity/Component.ts":
/*!*******************************************!*\
  !*** ./src/framework/entity/Component.ts ***!
  \*******************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
class Component {
    publish(event, c) {
        this.entity.publish(event, c);
    }
    subscribe(action, c) {
        this.entity.subscribe(action, c);
    }
    unSubscribe(action, c) {
        this.entity.unSubscribe(action, c);
    }
}


/***/ }),

/***/ "./src/framework/entity/EntityFactory.ts":
/*!***********************************************!*\
  !*** ./src/framework/entity/EntityFactory.ts ***!
  \***********************************************/
/*! exports provided: EntityFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityFactory", function() { return EntityFactory; });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");

class EntityFactory extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super(...arguments);
        this.autoID = 0;
    }
    create(c) {
        let cc = new c();
        cc.uuid = ++this.autoID;
        cc.onAwake(null);
        return cc;
    }
    createWithData(initData, c) {
        let cc = new c();
        cc.uuid = ++this.autoID;
        cc.onAwake(initData);
        return cc;
    }
}


/***/ }),

/***/ "./src/framework/ink/InkStateInspector.ts":
/*!************************************************!*\
  !*** ./src/framework/ink/InkStateInspector.ts ***!
  \************************************************/
/*! exports provided: InkStateInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InkStateInspector", function() { return InkStateInspector; });
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");

class InkStateInspector {
    BindInkMethods(inkStory) {
        //3参数以下采用此方式
        this.bindInkMethodOnce(inkStory, "GetCharacterName", this.getCharacterName);
        //3参数以上采用此方式 
        this.bindInkMethodOnceGeneral(inkStory, "GetCharacterNameByMutiParams", this.getCharacterNameMutiParams);
    }
    getCharacterName() {
        return "Justin Test Puerts";
    }
    getCharacterNameMutiParams(p1, p2, p3) {
        return "Justin Muti Params";
    }
    bindInkMethodOnce(inkStory, funcName, func) {
        try {
            inkStory.BindExternalFunction(funcName, func);
        }
        catch (err) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].warn(err);
        }
    }
    bindInkMethodOnceGeneral(inkStory, funcName, func) {
        try {
            inkStory.BindExternalFunctionGeneral(funcName, func);
        }
        catch (err) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].warn(err);
        }
    }
    unbindInkMethod(inkStory, funcName) {
        try {
            inkStory.UnbindExternalFunction(funcName);
        }
        catch (err) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].warn(err);
        }
    }
}


/***/ }),

/***/ "./src/framework/ink/InkWriter.ts":
/*!****************************************!*\
  !*** ./src/framework/ink/InkWriter.ts ***!
  \****************************************/
/*! exports provided: InkWriter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InkWriter", function() { return InkWriter; });
/* harmony import */ var inkjs_engine_Story__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inkjs/engine/Story */ "./node_modules/inkjs/engine/Story.js");
/* harmony import */ var inkjs_engine_Story__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inkjs_engine_Story__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _InkStateInspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InkStateInspector */ "./src/framework/ink/InkStateInspector.ts");
/* harmony import */ var _StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StoryMessageManager */ "./src/framework/ink/StoryMessageManager.ts");




class InkWriter {
    constructor(storyJson) {
        this._allInkCommands = new Map();
        this.setupInkCommands();
        this.createStroy(storyJson);
        this.load();
    }
    load() {
        let storyState = "";
        if (storyState != null && storyState != "") {
            this._currentStory.state.LoadJson(storyState);
        }
    }
    createStroy(json) {
        this._currentStory = new inkjs_engine_Story__WEBPACK_IMPORTED_MODULE_0__["Story"](json);
    }
    beginStory(knotName) {
        if (this._currentStory == null) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].warn("Trying to AdvanceStory in InkWriter when no story has been created");
            return;
        }
        this._currentStory.ChoosePathString(knotName, true);
        let inkState = new _InkStateInspector__WEBPACK_IMPORTED_MODULE_2__["InkStateInspector"]();
        inkState.BindInkMethods(this._currentStory);
        this.advanceStory();
    }
    giveReward() {
        _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("give reward...");
        return true;
    }
    setupInkCommands() {
        this._allInkCommands.set("GIVE_REWARD", this.giveReward);
    }
    handleCommand(command, args) {
        if (this._allInkCommands.has(command)) {
            return this._allInkCommands.get(command)(args);
        }
        _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].error("Could not find InkCommand with name:" + command);
        return true;
    }
    parseCommandName(text) {
        let num = text.indexOf(InkWriter.COMMAND_PREFIX);
        let num2 = text.indexOf(InkWriter.COMMAND_DELIMITER);
        if (num2 == -1) {
            num2 = text.length;
        }
        let length = num2 - (num + InkWriter.COMMAND_PREFIX.length);
        return text.substr(num + InkWriter.COMMAND_PREFIX.length, length).trim();
    }
    parseCommandArgs(text) {
        let num = text.indexOf(InkWriter.COMMAND_DELIMITER);
        if (num == -1) {
            return [];
        }
        let length = text.length - (num + 1);
        let list = text.substr(num + 1, length).
            trim().
            split(InkWriter.COMMAND_ARG_DELIMITER);
        for (let i = 0; i < list.length; i++) {
            list[i] = list[i].trim();
        }
        return list;
    }
    extractSpeaker(line) {
        if (line.startsWith(InkWriter.COMMAND_PREFIX)) {
            return ["0", line.trim()];
        }
        let array = line.split(':', 2);
        if (array.length > 1) {
            let speakID = array[0].trim();
            let speakContent = array[1].trim();
            return [speakID, speakContent];
        }
        return ["0", line.trim()];
    }
    saveCurrentStory() {
        let currState = this._currentStory.state.toJson();
        //TODOｓａｖｅ
    }
    canContinue() {
        return this._currentStory.canContinue;
    }
    advanceStory() {
        if (this._currentStory == null) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].warn("Trying to AdvanceStory in InkWriter when no story has been created");
        }
        else if (this._currentStory.canContinue) {
            let text = this._currentStory.Continue().trim();
            if (text == "") {
                this.advanceStory();
                return;
            }
            let speakID;
            let speakContent;
            [speakID, speakContent] = this.extractSpeaker(text);
            let commandName = null;
            let args = null;
            if (speakContent.startsWith(InkWriter.COMMAND_PREFIX)) {
                commandName = this.parseCommandName(speakContent);
                args = this.parseCommandArgs(speakContent);
                if (commandName != null && commandName != "") {
                    if (this.handleCommand(commandName, args)) {
                        this.advanceStory();
                    }
                }
            }
            else {
                //OnContentReady
                _StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].Instance(_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"]).broadcastContentReady(_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].ONCONTENTREADY, speakContent, speakID, this._currentStory.currentTags, this._currentStory.currentChoices);
            }
        }
        else if (this._currentStory.currentChoices.length > 0) {
            //OnChoicesPresented
            _StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].Instance(_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"]).broadcastChoicesPresented(_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].ONCHOICESPRESENTED, this._currentStory.currentChoices);
        }
        else {
            //OnStoryFinished
            _StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].Instance(_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"]).broadcastStoryFinished(_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].ONSTORYFINISHED);
        }
    }
    selectChoice(choiceIndex) {
        if (this._currentStory == null) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].warn("Trying to ChooseChoice in InkWriter when no story has begun");
            return;
        }
        this._currentStory.ChooseChoiceIndex(choiceIndex);
        this.advanceStory();
    }
    getVariable(variableName) {
        return this._currentStory.variablesState.GetVariableWithName(variableName);
    }
    setVariable(variableName, value) {
        this._currentStory.variablesState.$(variableName, value);
    }
}
InkWriter.DEBUG_STORY_ID = "DEBUG_STORY";
InkWriter.COMMAND_PREFIX = ">>>";
InkWriter.COMMAND_DELIMITER = ":";
InkWriter.COMMAND_ARG_DELIMITER = ',';


/***/ }),

/***/ "./src/framework/ink/StoryManager.ts":
/*!*******************************************!*\
  !*** ./src/framework/ink/StoryManager.ts ***!
  \*******************************************/
/*! exports provided: StoryManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoryManager", function() { return StoryManager; });
/* harmony import */ var _common_ResManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _InkWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InkWriter */ "./src/framework/ink/InkWriter.ts");



class StoryManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super();
        this.storyAddress = "Story/TestStory.json";
    }
    get inkWriter() {
        return this._inkWriter;
    }
    async initialize() {
        if (this._inkWriter == null) {
            var json = (await _common_ResManager__WEBPACK_IMPORTED_MODULE_0__["ResManager"].Instance(_common_ResManager__WEBPACK_IMPORTED_MODULE_0__["ResManager"]).loadTextAsset(this.storyAddress)).text;
            this._inkWriter = new _InkWriter__WEBPACK_IMPORTED_MODULE_2__["InkWriter"](json);
        }
    }
    beginStory(knotName) {
        this._inkWriter.beginStory(knotName);
    }
    canContinue() {
        return this._inkWriter.canContinue;
    }
    advanceStory() {
        this._inkWriter.advanceStory();
    }
    selectChoice(choice) {
        this._inkWriter.selectChoice(choice.index);
    }
    loadCurrent() {
        if (this._inkWriter != null)
            this._inkWriter.load();
    }
    getVariable(variableName) {
        return this._inkWriter.getVariable(variableName);
    }
    setVariable(variableName, value) {
        this.inkWriter.setVariable(variableName, value);
    }
}


/***/ }),

/***/ "./src/framework/ink/StoryMessageManager.ts":
/*!**************************************************!*\
  !*** ./src/framework/ink/StoryMessageManager.ts ***!
  \**************************************************/
/*! exports provided: StoryMessageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoryMessageManager", function() { return StoryMessageManager; });
/* harmony import */ var _common_Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");


class StoryMessageManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super(...arguments);
        this.storyMessage = new _common_Messenger__WEBPACK_IMPORTED_MODULE_0__["Messenger"]();
    }
    addListener(msgCode, obj, listener) {
        this.storyMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.storyMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.storyMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.storyMessage.clearup();
    }
    broadcastContentReady(msgCode, speakerContent, speakerId, currentTags, currentChoices) {
        this.storyMessage.broadcast(msgCode, speakerContent, speakerId, currentTags, currentChoices);
    }
    broadcastChoicesPresented(mesgCode, currentChoices) {
        this.storyMessage.broadcast(mesgCode, currentChoices);
    }
    broadcastStoryFinished(mesgCode) {
        this.storyMessage.broadcast(mesgCode);
    }
}
StoryMessageManager.ONCONTENTREADY = 1001;
StoryMessageManager.ONCHOICESPRESENTED = 1002;
StoryMessageManager.ONSTORYFINISHED = 1003;


/***/ }),

/***/ "./src/framework/logger/Logger.ts":
/*!****************************************!*\
  !*** ./src/framework/logger/Logger.ts ***!
  \****************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");


var LogType;
(function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Assert"] = 1] = "Assert";
    LogType[LogType["Warning"] = 2] = "Warning";
    LogType[LogType["Log"] = 3] = "Log";
    LogType[LogType["Exception"] = 4] = "Exception";
})(LogType || (LogType = {}));
class Logger {
    static getPrintStack(type, showStack, ...args) {
        let message = '';
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            if (typeof element === 'object' && Logger.LOG_OBJECT_TO_JSON) {
                message += JSON.stringify(element);
            }
            else {
                message += element;
            }
            if (i < args.length - 1) {
                message += ' ';
            }
        }
        if (showStack || csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].Application.isEditor) {
            var stacks = new Error().stack.split('\n');
            for (let i = 3; i < stacks.length; i++) {
                const line = stacks[i];
                message += '\n';
                message += line;
            }
        }
        if (!Logger.unity_log_target) {
            Logger.unity_log_target = new csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].Object();
        }
        return message;
    }
    static log(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /**
     * Outputs a warning message to the Logger.
     * @param message  list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static warn(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Warning, true, args);
        console.warn(msg);
    }
    /**
     * Outputs an error message to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static error(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Error, true, args);
        console.error(msg);
    }
    /** Outputs a stack trace to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
    */
    static trace(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /** Log JavaScript Objects as JSON format */
    static LOG_OBJECT_TO_JSON(...args) {
        return false;
    }
}
Logger.unity_log_target = null;


/***/ }),

/***/ "./src/framework/net/GameSession.ts":
/*!******************************************!*\
  !*** ./src/framework/net/GameSession.ts ***!
  \******************************************/
/*! exports provided: MsgPack, GameSession */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsgPack", function() { return MsgPack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameSession", function() { return GameSession; });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _NetErrorCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NetErrorCode */ "./src/framework/net/NetErrorCode.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _MessageParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MessageParser */ "./src/framework/net/MessageParser.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");






class MsgPack {
    constructor() {
        this.retryTimes = 0;
    }
}
class GameSession extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.id = 0; //session ID
        this.reSendInterval = 10000; //10秒重发一次
        this.timeoutInterval = 5000; //5秒检查一次是否超时
        this.maxReSendTimes = 5; //最大重发次数
        this._rpcId = 1;
        this.requestCallback = new Map();
        this.listeners = new Map();
        //返回的服务器ID, 类型
        this._serverId = -1;
        this._serverType = 1;
    }
    get rpcId() {
        return ++this._rpcId;
    }
    //address-> ip:port
    connectChannel(address, connCaback) {
        this.channel = csharp__WEBPACK_IMPORTED_MODULE_3__["NiceTS"].TService.Instance.GetChannel();
        this.channel.errorCallback = (channel, code) => {
            if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_2__["NetErrorCode"].ERR_SocketConnSucc) {
                this.timeoutIimer = setInterval(() => {
                    this.checkTimeoutMsg();
                }, this.timeoutInterval);
            }
            connCaback(channel, code);
        };
        this.channel.readCallback = (buffer) => {
            this.onReceive(buffer);
        };
        this.channel.Connect(address);
        return this;
    }
    //接收服务器通知
    listen(opcode, callback) {
        this.listeners.set(opcode, callback);
    }
    //发送protoubf消息
    //消息： rpc_id[4] - opcode[2] - server_id[2] - server_type[1] - 
    send(opcode, rpcid, message, callBack) {
        //封装消息：
        let rpcBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].encodeInt(rpcid); //4
        let opcodeBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].encodeShort(opcode); //2
        let serveridBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].encodeShort(this._serverId); //2
        let servertypeBuf = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].encodeByte(this._serverType); //1
        let sendArray = new Uint8Array(4 + 2 + 2 + 1 + message.length);
        sendArray.set(rpcBuf);
        sendArray.set(opcodeBuf, 4);
        sendArray.set(serveridBuf, 4 + 2);
        sendArray.set(servertypeBuf, 4 + 2 + 2);
        sendArray.set(message, 4 + 2 + 2 + 1);
        if (callBack != null) {
            let msgPack = new MsgPack();
            msgPack.sendTime = new Date().getTime();
            msgPack.callback = callBack;
            msgPack.bytes = sendArray;
            this.requestCallback.set(rpcid, msgPack);
        }
        // for(let i in sendArray){
        //     Logger.log("TS -- send array: "+i);
        // }
        //Logger.log("send array: "+sendArray);
        this.channel.Send(sendArray);
    }
    reSend(bytes) {
        this.channel.Send(bytes);
    }
    onReceive(buffer) {
        let msgBuf = new Uint8Array(buffer);
        let rpcid = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].decodeInt(msgBuf.subarray(0, 4));
        let opcode = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].decodeShort(msgBuf.subarray(4, 6));
        let serverid = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].decodeShort(msgBuf.subarray(6, 8));
        let servertype = _MessageParser__WEBPACK_IMPORTED_MODULE_4__["MessageParser"].decodeByte(msgBuf.subarray(8, 9));
        this._serverId = serverid;
        this._serverType = servertype;
        let msgBytes = msgBuf.subarray(9);
        try {
            let decodeMsg = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__["Opcode"].decode(opcode, msgBytes);
            if (rpcid == undefined || !this.requestCallback.has(rpcid)) {
                //检查是否是服务器下发的消息
                if (this.listeners.has(opcode)) {
                    let listen = this.listeners.get(opcode);
                    listen(decodeMsg.msgObj);
                }
            }
            else {
                let msgPack = this.requestCallback.get(rpcid);
                msgPack.callback(decodeMsg.msgObj);
                this.requestCallback.delete(rpcid);
            }
        }
        catch (e) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].error("parse msg error, opcode:" + opcode);
        }
    }
    checkTimeoutMsg() {
        let currTime = new Date().getTime();
        this.requestCallback.forEach((value, key) => {
            if (value.retryTimes >= this.maxReSendTimes) {
                //超过最大重发次数，丢弃
                _logger_Logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].log(`Message resend too more, opcode:${key}, lastsend:${value.sendTime}`);
                this.requestCallback.delete(key);
            }
            else {
                if ((currTime - value.sendTime) >= this.reSendInterval) {
                    value.retryTimes++;
                    value.sendTime = currTime;
                    //重发消息
                    this.reSend(value.bytes);
                    _logger_Logger__WEBPACK_IMPORTED_MODULE_5__["Logger"].log(`resend message:, opcode:${key}, retry times:${value.retryTimes}`);
                }
            }
        });
    }
    disconnect() {
        clearInterval(this.timeoutIimer);
        this.channel.Dispose();
    }
}


/***/ }),

/***/ "./src/framework/net/HttpManager.ts":
/*!******************************************!*\
  !*** ./src/framework/net/HttpManager.ts ***!
  \******************************************/
/*! exports provided: HttpManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpManager", function() { return HttpManager; });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");




class HttpManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_2__["Singleton"] {
    constructor() {
        super();
    }
    async get(url) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_0__["NiceTS"].HttpManager.Get(url);
            let txt = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return txt;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Get error :${url} : ${ex}`);
            return null;
        }
    }
    async post(url, form) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_0__["NiceTS"].HttpManager.Post(url, form);
            let txt = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return txt;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Post error :${url} : ${ex}`);
            return null;
        }
    }
}


/***/ }),

/***/ "./src/framework/net/MessageParser.ts":
/*!********************************************!*\
  !*** ./src/framework/net/MessageParser.ts ***!
  \********************************************/
/*! exports provided: MessageParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageParser", function() { return MessageParser; });
class MessageParser {
    static encodeInt(n) {
        let buffer = new Uint8Array(4);
        buffer[0] = n >>> 24;
        buffer[1] = n >>> 16;
        buffer[2] = n >>> 8;
        buffer[3] = n & 0xff;
        return buffer;
    }
    static decodeInt(buffer) {
        let n = buffer[0] << 24 | buffer[1] << 16 | buffer[2] << 8 | buffer[3];
        return n;
    }
    static encodeShort(n) {
        let buffer = new Uint8Array(2);
        buffer[0] = n >>> 8;
        buffer[1] = n & 0xff;
        return buffer;
    }
    static decodeShort(buffer) {
        let n = buffer[0] << 8 | buffer[1];
        return n;
    }
    static encodeByte(n) {
        let buffer = new Uint8Array(1);
        buffer[0] = n & 0xff;
        return buffer;
    }
    static decodeByte(buffer) {
        let n = buffer[0];
        return n;
    }
}


/***/ }),

/***/ "./src/framework/net/NetErrorCode.ts":
/*!*******************************************!*\
  !*** ./src/framework/net/NetErrorCode.ts ***!
  \*******************************************/
/*! exports provided: NetErrorCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetErrorCode", function() { return NetErrorCode; });
class NetErrorCode {
}
NetErrorCode.ERR_SocketConnSucc = 100000;
NetErrorCode.ERR_ConnectGateKeyError = 100006;
NetErrorCode.ERR_PeerDisconnect = 102008;
NetErrorCode.ERR_SocketCantSend = 102009;
NetErrorCode.ERR_SocketError = 102010;
NetErrorCode.ERR_SocketConnError = 102011;


/***/ }),

/***/ "./src/framework/net/SessionManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/net/SessionManager.ts ***!
  \*********************************************/
/*! exports provided: SessionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionManager", function() { return SessionManager; });
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _GameSession__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameSession */ "./src/framework/net/GameSession.ts");
/* harmony import */ var _NetErrorCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NetErrorCode */ "./src/framework/net/NetErrorCode.ts");






class SessionManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_2__["Singleton"] {
    get realmRpcID() {
        return this.sessionReam.rpcId;
    }
    get gateRpcID() {
        return this.sessionGate.rpcId;
    }
    async connectRealmServer() {
        let promise = new Promise(resove => {
            this.sessionReam = _GameSession__WEBPACK_IMPORTED_MODULE_4__["GameSession"].Instance(_GameSession__WEBPACK_IMPORTED_MODULE_4__["GameSession"]).connectChannel(_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].realmServerIP + ":" + _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].realmServerPort, (channel, code) => {
                if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_5__["NetErrorCode"].ERR_SocketConnSucc) {
                    this.sessionReam.id = channel.Id;
                    resove(true);
                }
                else {
                    resove(false);
                    _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error("login reamserver err, code: " + code + ",id:" + channel.Id);
                }
            });
        });
        return promise;
    }
    disconnectRealmServer() {
        this.sessionReam.disconnect();
        this.sessionReam = null;
    }
    async sendRealmMsg(opcode, msg) {
        let rpcID = this.sessionReam.rpcId;
        let promise = new Promise((resove) => {
            let buf = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__["Opcode"].encode(opcode, msg);
            this.sessionReam.send(opcode, rpcID, buf, (response) => {
                resove(response);
            });
        });
        return promise;
    }
    async connectGateServer(address) {
        let promise = new Promise(resove => {
            this.sessionGate = _GameSession__WEBPACK_IMPORTED_MODULE_4__["GameSession"].Instance(_GameSession__WEBPACK_IMPORTED_MODULE_4__["GameSession"]).connectChannel(address, (channel, code) => {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("login Gate Server: " + code);
                if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_5__["NetErrorCode"].ERR_SocketConnSucc) {
                    this.sessionGate.id = channel.Id;
                    resove(true);
                }
                else {
                    resove(false);
                    _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error("gate server err, code: " + code + ",id:" + channel.Id);
                }
            });
        });
        return promise;
    }
    disconnectGateServer() {
        this.sessionGate.disconnect();
        this.sessionGate = null;
    }
    async sendGateMsg(opcode, msg) {
        let rpcID = this.sessionGate.rpcId;
        let promise = new Promise((resove) => {
            let buf = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__["Opcode"].encode(opcode, msg);
            this.sessionGate.send(opcode, rpcID, buf, (response) => {
                resove(response);
            });
        });
        return promise;
    }
}


/***/ }),

/***/ "./src/framework/redhints/RedHintsManager.ts":
/*!***************************************************!*\
  !*** ./src/framework/redhints/RedHintsManager.ts ***!
  \***************************************************/
/*! exports provided: enumRedHints, RedHintsManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumRedHints", function() { return enumRedHints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedHintsManager", function() { return RedHintsManager; });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RedHintsMessageManager */ "./src/framework/redhints/RedHintsMessageManager.ts");



var enumRedHints;
(function (enumRedHints) {
    /** 标记位 */
    enumRedHints[enumRedHints["none"] = 0] = "none";
    /** 聊天 */
    enumRedHints[enumRedHints["chat"] = 1] = "chat";
    /** 聊天世界频道 */
    enumRedHints[enumRedHints["chat_world"] = 2] = "chat_world";
    /** 聊天公会频道 */
    enumRedHints[enumRedHints["chat_family"] = 3] = "chat_family";
    /** 聊天系统频道 */
    enumRedHints[enumRedHints["chat_system"] = 4] = "chat_system";
})(enumRedHints || (enumRedHints = {}));
class RedHintsManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.init();
    }
    init() {
        this._data = [0]; //第一位无意义
        this._parentIndex = [0];
        this._childNum = [0];
        this._childIndex = [0];
        //------------------------记录父子关系-----------------------
        //聊天
        this.setParent(enumRedHints.chat_world, enumRedHints.chat);
        this.setParent(enumRedHints.chat_family, enumRedHints.chat);
        this.setParent(enumRedHints.chat_system, enumRedHints.chat);
    }
    /**
     * 设置红点的开启和关闭
    */
    setRedHintOpenOrClose(red, isOpen) {
        if (this._childNum[red] > 0) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("红点数据设置错误：不能直接对高级的红点数据操作");
            return;
        }
        this.doSetRedHintOpenOrClose(red, isOpen ? 1 : 0);
    }
    /**
     * 记录父子关系：子---父
    */
    setParent(child, parent) {
        if (this._parentIndex[parent] == child) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("关系反了");
            return;
        }
        if (this._parentIndex[child]) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("重复设置");
            return;
        }
        this._parentIndex[child] = parent;
        if (isNaN(this._childNum[parent])) {
            this._childNum[parent] = 0;
        }
        this._childNum[parent]++; //子项数量增加
        this._childIndex[child] = this._childNum[parent]; //子项的索引 从1开始
    }
    doSetRedHintOpenOrClose(red, value) {
        if (this._data[red] != value) {
            this._data[red] = value;
            let _parent = this._parentIndex[red];
            if (_parent) {
                //如果有父级，更新父级
                let index = this._childIndex[red]; //获取在父级中的索引
                this.doSetRedHintOpenOrClose(_parent, value > 0 ? this._data[_parent] | this.addV(index) : this._data[_parent] & this.subV(index)); //设置父级的值
            }
            //发改变事件:全局事件
            //emit(RedHintsManager.RED_HINT_VALUE_CHANGED, red);
            //红点事件，局部事件
            _RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_2__["RedHintsMessageManager"].Instance(_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_2__["RedHintsMessageManager"]).broadcast(red, value);
        }
    }
    addV(index) {
        return 1 << (index - 1);
    }
    subV(index) {
        return ~this.addV(index);
    }
    /**
     * 查看红点是否开启
    */
    checkRedIsOpen(red) {
        return this._data[red] > 0;
    }
}
/**
 * 红点值改变
*/
RedHintsManager.RED_HINT_VALUE_CHANGED = "RED_HINT_VALUE_CHANGED";


/***/ }),

/***/ "./src/framework/redhints/RedHintsMessageManager.ts":
/*!**********************************************************!*\
  !*** ./src/framework/redhints/RedHintsMessageManager.ts ***!
  \**********************************************************/
/*! exports provided: RedHintsMessageManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedHintsMessageManager", function() { return RedHintsMessageManager; });
/* harmony import */ var _common_Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");


class RedHintsMessageManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super(...arguments);
        this.redhintsMessage = new _common_Messenger__WEBPACK_IMPORTED_MODULE_0__["Messenger"]();
    }
    addListener(msgCode, obj, listener) {
        this.redhintsMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.redhintsMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.redhintsMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.redhintsMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.redhintsMessage.broadcast(msgCode, params);
    }
}


/***/ }),

/***/ "./src/framework/scene/BaseScene.ts":
/*!******************************************!*\
  !*** ./src/framework/scene/BaseScene.ts ***!
  \******************************************/
/*! exports provided: BaseScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseScene", function() { return BaseScene; });
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");

class BaseScene {
    constructor() {
        this.finishCount = 0;
        this.totalCount = 0;
        this.preloadPrefab = new Map();
        this.finishCount = 0;
    }
    addPreloadPrefab(address, instCount) {
        if (!this.preloadPrefab.has(address)) {
            this.preloadPrefab.set(address, instCount);
            return;
        }
        this.preloadPrefab.set(address, this.preloadPrefab.get(address) + instCount);
    }
    setSceneInstance(sceneInstance) {
        this.sceneInstance = sceneInstance;
    }
    async loadAssetsAsync() {
        this.totalCount = this.preloadPrefab.size;
        let premises = [];
        this.preloadPrefab.forEach((value, key) => {
            let premise = _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].GameObjectPool.preLoadGameObjectAsync(key, value, () => {
                this.finishCount++;
            });
            premises.push(premise);
        });
        await Promise.all(premises);
    }
    onDestroy() {
        //清理资源缓存
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].GameObjectPool.cleanup(true);
        //卸载场景
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].ResManager.unloadScene(this.sceneInstance);
        this.preloadPrefab.clear();
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneDef.ts":
/*!*****************************************!*\
  !*** ./src/framework/scene/SceneDef.ts ***!
  \*****************************************/
/*! exports provided: SceneDef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneDef", function() { return SceneDef; });
class SceneDef {
}
SceneDef.LoadingScene = "LoadingScene";
SceneDef.LaunchScene = "LaunchScene";
SceneDef.HomeScene = "HomeScene";
SceneDef.LoginScene = "LoginScene";
SceneDef.PveScene = "PveScene";


/***/ }),

/***/ "./src/framework/scene/SceneFactory.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneFactory.ts ***!
  \*********************************************/
/*! exports provided: SceneFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneFactory", function() { return SceneFactory; });
/* harmony import */ var _game_module_pve_scene_PveScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game/module/pve/scene/PveScene */ "./src/game/module/pve/scene/PveScene.ts");
/* harmony import */ var _game_module_home_scene_HomeScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/module/home/scene/HomeScene */ "./src/game/module/home/scene/HomeScene.ts");
/* harmony import */ var _game_module_login_scene_LoginScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game/module/login/scene/LoginScene */ "./src/game/module/login/scene/LoginScene.ts");
/* harmony import */ var _SceneDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SceneDef */ "./src/framework/scene/SceneDef.ts");




class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_3__["SceneDef"].LoginScene:
                scene = new _game_module_login_scene_LoginScene__WEBPACK_IMPORTED_MODULE_2__["LoginScene"]();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_3__["SceneDef"].HomeScene:
                scene = new _game_module_home_scene_HomeScene__WEBPACK_IMPORTED_MODULE_1__["HomeScene"]();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_3__["SceneDef"].PveScene:
                scene = new _game_module_pve_scene_PveScene__WEBPACK_IMPORTED_MODULE_0__["PveScene"]();
                break;
        }
        return scene;
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneManager.ts ***!
  \*********************************************/
/*! exports provided: SceneManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneManager", function() { return SceneManager; });
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _game_event_UIMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _SceneFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SceneFactory */ "./src/framework/scene/SceneFactory.ts");






class SceneManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_3__["Singleton"] {
    constructor() {
        super();
        this.currentScene = null;
    }
    async loadScene(scene) {
        try {
            //打开Loading界面
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIManager.openLoading(_data_ui_common__WEBPACK_IMPORTED_MODULE_0__["commonUI"].PackageName, _data_ui_common__WEBPACK_IMPORTED_MODULE_0__["commonUI"].UILoadingPage);
            //清理旧场景
            if (this.currentScene) {
                this.currentScene.onLeave();
                this.currentScene.onDestroy();
            }
            //开始加载场景
            let sceneInstance = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].ResManager.loadScene(scene);
            //开始加载进入场景的资源
            this.currentScene = _SceneFactory__WEBPACK_IMPORTED_MODULE_5__["SceneFactory"].createScene(scene);
            this.currentScene.setSceneInstance(sceneInstance);
            this.currentScene.onEnter();
            //设置当前场景加载进度Timer
            let progressInterval = setInterval(() => {
                let progress = this.currentScene.finishCount / this.currentScene.totalCount;
                _logger_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].log("progress:" + progress + " = " + this.currentScene.finishCount + " = " + this.currentScene.totalCount);
                _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIMessageManger.broadcast(_game_event_UIMessage__WEBPACK_IMPORTED_MODULE_1__["UIMessage"].MSG_SCENE_PROGRESS, progress * 100);
            }, 100);
            //加载资源
            await this.currentScene.loadAssetsAsync();
            //加载完成
            clearInterval(progressInterval);
            //关闭所有Page
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIManager.closeAllPanels();
            await this.currentScene.onComplete();
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIManager.closeLoading();
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].log("load scene excep:" + ex);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIBase.ts":
/*!************************************!*\
  !*** ./src/framework/ui/UIBase.ts ***!
  \************************************/
/*! exports provided: UIBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIBase", function() { return UIBase; });
class UIBase {
    //绑定FairyGUI元件
    bindAll(target) {
        for (let k in target["binders"]) {
            let fguiName = this["binders"][k];
            this[k] = this.fui.GetChild(fguiName);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIDefine.ts":
/*!**************************************!*\
  !*** ./src/framework/ui/UIDefine.ts ***!
  \**************************************/
/*! exports provided: UITypeDef, UILayerDef, UIComDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UITypeDef", function() { return UITypeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILayerDef", function() { return UILayerDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIComDefs", function() { return UIComDefs; });
var UITypeDef;
(function (UITypeDef) {
    UITypeDef[UITypeDef["Unkown"] = 0] = "Unkown";
    UITypeDef[UITypeDef["Page"] = 1] = "Page";
    UITypeDef[UITypeDef["Window"] = 2] = "Window";
    UITypeDef[UITypeDef["Widget"] = 3] = "Widget";
    UITypeDef[UITypeDef["Loading"] = 4] = "Loading";
})(UITypeDef || (UITypeDef = {}));
class UILayerDef {
    static getDefaultLayer(type) {
        switch (type) {
            case UITypeDef.Loading: return this.Loading;
            case UITypeDef.Widget: return this.Widget;
            case UITypeDef.Window: return this.NormalWindow;
            case UITypeDef.Page: return this.Page;
            case UITypeDef.Unkown: return this.Unkown;
            default: return this.Unkown;
        }
    }
}
UILayerDef.Background = 0;
UILayerDef.Page = 1000;
UILayerDef.NormalWindow = 2000;
UILayerDef.TopWindow = 3000;
UILayerDef.Widget = 4000;
UILayerDef.Loading = 5000;
UILayerDef.Unkown = 9999;
class UIComDefs {
}
UIComDefs.BackBtn = "back_btn";
UIComDefs.WindowCloseBtn = "win_close_btn";


/***/ }),

/***/ "./src/framework/ui/UIFactory.ts":
/*!***************************************!*\
  !*** ./src/framework/ui/UIFactory.ts ***!
  \***************************************/
/*! exports provided: UIFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIFactory", function() { return UIFactory; });
/* harmony import */ var _game_module_login_ui_UILoginPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game/module/login/ui/UILoginPage */ "./src/game/module/login/ui/UILoginPage.ts");
/* harmony import */ var _game_module_home_ui_UIHomePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/module/home/ui/UIHomePage */ "./src/game/module/home/ui/UIHomePage.ts");
/* harmony import */ var _UILib_UILoading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UILib/UILoading */ "./src/framework/ui/UILib/UILoading.ts");
/* harmony import */ var _data_ui_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/ui/login */ "./src/data/ui/login.ts");
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _data_ui_home__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/ui/home */ "./src/data/ui/home.ts");
/* harmony import */ var _UILib_UIMsgBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UILib/UIMsgBox */ "./src/framework/ui/UILib/UIMsgBox.ts");
/* harmony import */ var _game_module_login_ui_UISelServerWin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../game/module/login/ui/UISelServerWin */ "./src/game/module/login/ui/UISelServerWin.ts");
/* harmony import */ var _game_module_home_ui_UIShopPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../game/module/home/ui/UIShopPage */ "./src/game/module/home/ui/UIShopPage.ts");
/* harmony import */ var _data_ui_story__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../data/ui/story */ "./src/data/ui/story.ts");
/* harmony import */ var _game_module_story_UIStoryWin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../game/module/story/UIStoryWin */ "./src/game/module/story/UIStoryWin.ts");
/* harmony import */ var _data_ui_combat__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../data/ui/combat */ "./src/data/ui/combat.ts");
/* harmony import */ var _game_module_guide_UIGuideWin__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../game/module/guide/UIGuideWin */ "./src/game/module/guide/UIGuideWin.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");














const CS = __webpack_require__(/*! csharp */ "csharp");
class UIFactory {
    static createUI(pkg, name) {
        _logger_Logger__WEBPACK_IMPORTED_MODULE_13__["Logger"].log(`create UI: ${pkg}:${name}`);
        let comp = CS.FairyGUI.UIPackage.CreateObject(pkg, name).asCom;
        let ui = this.uiCache.get(name);
        if (!ui) {
            switch (pkg) {
                case _data_ui_common__WEBPACK_IMPORTED_MODULE_4__["commonUI"].PackageName:
                    switch (name) {
                        //common
                        case _data_ui_common__WEBPACK_IMPORTED_MODULE_4__["commonUI"].UIUINoticeWin:
                            ui = new _UILib_UIMsgBox__WEBPACK_IMPORTED_MODULE_6__["UIMsgBox"]();
                            break;
                        case _data_ui_common__WEBPACK_IMPORTED_MODULE_4__["commonUI"].UILoadingPage:
                            ui = new _UILib_UILoading__WEBPACK_IMPORTED_MODULE_2__["UILoading"]();
                            break;
                        case _data_ui_common__WEBPACK_IMPORTED_MODULE_4__["commonUI"].UIUIGuideWin:
                            ui = new _game_module_guide_UIGuideWin__WEBPACK_IMPORTED_MODULE_12__["UIGuideWin"]();
                    }
                    break;
                case _data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].PackageName:
                    switch (name) {
                        //login
                        case _data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].UILoginPage:
                            ui = new _game_module_login_ui_UILoginPage__WEBPACK_IMPORTED_MODULE_0__["UILoginPage"]();
                            break;
                        case _data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].UISelServerWin:
                            ui = new _game_module_login_ui_UISelServerWin__WEBPACK_IMPORTED_MODULE_7__["UISelServerWin"]();
                            break;
                    }
                    break;
                case _data_ui_combat__WEBPACK_IMPORTED_MODULE_11__["combatUI"].PackageName:
                    break;
                case _data_ui_home__WEBPACK_IMPORTED_MODULE_5__["homeUI"].PackageName:
                    switch (name) {
                        case _data_ui_home__WEBPACK_IMPORTED_MODULE_5__["homeUI"].UIHomePage:
                            ui = new _game_module_home_ui_UIHomePage__WEBPACK_IMPORTED_MODULE_1__["UIHomePage"]();
                            break;
                        case _data_ui_home__WEBPACK_IMPORTED_MODULE_5__["homeUI"].UIShopPage:
                            ui = new _game_module_home_ui_UIShopPage__WEBPACK_IMPORTED_MODULE_8__["UIShopPage"]();
                            break;
                    }
                    break;
                case _data_ui_story__WEBPACK_IMPORTED_MODULE_9__["storyUI"].PackageName:
                    switch (name) {
                        case _data_ui_story__WEBPACK_IMPORTED_MODULE_9__["storyUI"].UIStoryWin:
                            ui = new _game_module_story_UIStoryWin__WEBPACK_IMPORTED_MODULE_10__["UIStoryWin"]();
                            break;
                    }
                    break;
            }
            this.uiCache.set(name, ui);
        }
        if (ui != null) {
            ui.fui = comp;
            ui.name = name;
            ui.pkgName = pkg;
            //绑定FairyGUI控件
            ui.bindAll(ui);
            ui.awake();
        }
        else {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_13__["Logger"].error(`not create ui: ${pkg}-${name}`);
        }
        return ui;
    }
}
UIFactory.uiCache = new Map();


/***/ }),

/***/ "./src/framework/ui/UILib/UILoading.ts":
/*!*********************************************!*\
  !*** ./src/framework/ui/UILib/UILoading.ts ***!
  \*********************************************/
/*! exports provided: UILoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILoading", function() { return UILoading; });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var _common_NiceDecorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _game_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../game/event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../global/GameConfig */ "./src/global/GameConfig.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class UILoading extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__["UIPanel"] {
    onAwake() {
    }
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__["UITypeDef"].Loading;
    }
    onShow(arg) {
        this.progressLoading.value = 0;
        this.progressLoading.visible = true;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__["S"].UIMessageManger.addListener(_game_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__["UIMessage"].MSG_SCENE_PROGRESS, this, (progress) => {
            this.progressLoading.TweenValue(progress, 0.1);
        });
    }
    onClose(arg) {
        this.progressLoading.visible = false;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_4__["S"].UIMessageManger.removeListenerByCode(_game_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__["UIMessage"].MSG_SCENE_PROGRESS);
    }
}
__decorate([
    Object(_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_2__["binder"])("loading_pregress")
], UILoading.prototype, "progressLoading", void 0);


/***/ }),

/***/ "./src/framework/ui/UILib/UIMsgBox.ts":
/*!********************************************!*\
  !*** ./src/framework/ui/UILib/UIMsgBox.ts ***!
  \********************************************/
/*! exports provided: UIMsgBoxArg, UIMsgBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMsgBoxArg", function() { return UIMsgBoxArg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMsgBox", function() { return UIMsgBox; });
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _UIWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UIWindow */ "./src/framework/ui/UIWindow.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// 通用弹窗
class UIMsgBoxArg {
    constructor() {
        this.title = "";
        this.content = "";
        this.btnText = ""; //"确定|取消|关闭"
    }
}
class UIMsgBox extends _UIWindow__WEBPACK_IMPORTED_MODULE_1__["UIWindow"] {
    onAwake() {
        super.onAwake();
        this.bindAll(this);
    }
    onShow(arg) {
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("msgTxt")
], UIMsgBox.prototype, "m_txt", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("okBtn")
], UIMsgBox.prototype, "m_okBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("cancelBtn")
], UIMsgBox.prototype, "m_cancelBtn", void 0);


/***/ }),

/***/ "./src/framework/ui/UIManager.ts":
/*!***************************************!*\
  !*** ./src/framework/ui/UIManager.ts ***!
  \***************************************/
/*! exports provided: UIPageTrack, UIManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIPageTrack", function() { return UIPageTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIManager", function() { return UIManager; });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _UIFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIFactory */ "./src/framework/ui/UIFactory.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");




class UIPageTrack {
}
class UIManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.m_pageTrackStack = new Array();
        this.m_listLoadedPanel = new Array();
    }
    distroyPanel(panel) {
        if (panel.isOpen) {
            panel.close();
        }
        //卸载资源
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].ResManager.releaseFairyGUIPackage(panel.pkgName);
        panel.dispose();
    }
    distroyAllLoadedPanel() {
        for (let i = this.m_listLoadedPanel.length - 1; i >= 0; i--) {
            let panel = this.m_listLoadedPanel[i];
            this.distroyPanel(panel);
            this.m_listLoadedPanel.splice(i, 1);
        }
    }
    clean() {
        this.distroyAllLoadedPanel();
        this.m_pageTrackStack.length = 0;
        this.m_listLoadedPanel.length = 0;
    }
    getPanelUI(name) {
        for (const panel of this.m_listLoadedPanel) {
            if (panel.name == name) {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("find panel in cache: " + name);
                return panel;
            }
        }
        return null;
    }
    async open(pkg, name, arg) {
        let ui = this.getPanelUI(name);
        if (ui == null) {
            //加载 package
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].ResManager.loadFairyGUIPackage(pkg);
            ui = _UIFactory__WEBPACK_IMPORTED_MODULE_1__["UIFactory"].createUI(pkg, name);
            this.m_listLoadedPanel.push(ui);
        }
        if (ui != null) {
            // ###  ui as any 调用私有方法
            ui._internalOpen(arg);
        }
        return ui;
    }
    async openPageWorker(pkg, page, arg) {
        //设置 m_currentPage
        this.m_currentPage = new UIPageTrack();
        this.m_currentPage.pkg = pkg;
        this.m_currentPage.name = page;
        this.m_currentPage.arg = arg;
        //打开新Page
        await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].ResManager.loadFairyGUIPackage(pkg);
        let ui = _UIFactory__WEBPACK_IMPORTED_MODULE_1__["UIFactory"].createUI(pkg, page);
        ui._internalOpen(arg);
        //保存到 m_currentPage
        this.m_currentPage.ui = ui;
        //销毁当前page 中打开的各自Panels
        this.distroyAllLoadedPanel();
        return this.m_currentPage;
    }
    //==========================================================UIPage
    //打开场景页面,此页面不计入页面栈,无返回上一面按钮
    async openPageInScene(pkg, page, arg) {
        let _openPage = await this.openPageWorker(pkg, page, arg);
        if (this.m_lastScensePage) {
            this.distroyPanel(this.m_lastScensePage.ui);
        }
        this.m_lastScensePage = _openPage;
    }
    //打开页面, 会关闭上一个页面上的所有窗口,Widiget等
    async openPage(pkg, name, arg) {
        //1, 检查栈中是否存在此页面
        let len = this.m_pageTrackStack.length;
        for (let i = len - 1; i >= 0; i--) {
            let track = this.m_pageTrackStack[i];
            if (track.pkg == pkg && track.name == name) {
                this.distroyAllLoadedPanel();
                this.distroyPanel(this.m_currentPage.ui);
                track.ui.visible = true;
                track.ui.onShow(track.arg);
                //卸载此页栈上面的界面
                for (let j = len - 1; j > i; j--) {
                    let del_track = this.m_pageTrackStack[j];
                    this.distroyPanel(del_track.ui);
                    this.m_pageTrackStack.slice(j, 1);
                }
                this.m_currentPage = this.m_pageTrackStack.pop();
                return this.m_currentPage;
            }
        }
        //2 先把当前Page入栈
        if (this.m_currentPage != undefined && this.m_currentPage.name != name) {
            this.m_pageTrackStack.push(this.m_currentPage);
        }
        //将栈中其它Page 设为不可见
        for (let track of this.m_pageTrackStack) {
            track.ui.visible = false;
        }
        await this.openPageWorker(pkg, name, arg);
    }
    //返回上一个页面
    async goBackPage() {
        if (this.m_pageTrackStack.length > 0) {
            //关闭当前页面
            this.distroyAllLoadedPanel();
            this.distroyPanel(this.m_currentPage.ui);
            //打开堆栈中的上一页面
            let track = this.m_pageTrackStack.pop();
            track.ui.visible = true;
            this.m_currentPage = track;
            track.ui.onShow(track.arg);
        }
        else {
            await this.enterMainPage();
        }
    }
    //回到主城
    enterMainPage() {
        //将栈中其它Page 设为不可见
        for (let track of this.m_pageTrackStack) {
            this.distroyPanel(track.ui);
        }
        this.m_pageTrackStack.length = 0;
    }
    //==========================================================UILoading
    //打开Loading界面
    async openLoading(pkg, name, arg) {
        if (!this.m_loadingPage) {
            this.m_loadingPage = _UIFactory__WEBPACK_IMPORTED_MODULE_1__["UIFactory"].createUI(pkg, name);
        }
        this.m_loadingPage._internalOpen(arg);
    }
    //关闭Loading界面
    closeLoading(arg) {
        if (this.m_loadingPage) {
            this.m_loadingPage.close(arg);
        }
    }
    //==========================================================UIWindow
    //打开窗口
    async openWindow(pkg, name, arg) {
        let ui = await this.open(pkg, name, arg);
        return ui;
    }
    //关闭窗口
    closeWindow(name, arg) {
        let ui = this.getPanelUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
    //==========================================================UIWidget
    //打开Widiget
    async openWidget(pkg, name, arg) {
        let ui = await this.open(pkg, name, arg);
        return ui;
    }
    //u关闭Widiget
    closeWidget(name, arg) {
        let ui = this.getPanelUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
    closeAllPanels() {
        //删除除Loading界面外的所有Window, Widget
        this.distroyAllLoadedPanel();
        //删除所有Page
        let len = this.m_pageTrackStack.length;
        for (let i = len - 1; i >= 0; i--) {
            let track = this.m_pageTrackStack[i];
            this.distroyPanel(track.ui);
            this.m_pageTrackStack.slice(i, 1);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIPage.ts":
/*!************************************!*\
  !*** ./src/framework/ui/UIPage.ts ***!
  \************************************/
/*! exports provided: UIPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIPage", function() { return UIPage; });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");



class UIPage extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__["UIPanel"] {
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__["UITypeDef"].Page;
    }
    onAwake() {
        this.m_btnGoBack = this.fui.GetChild(_UIDefine__WEBPACK_IMPORTED_MODULE_1__["UIComDefs"].BackBtn);
        if (this.m_btnGoBack != undefined) {
            this.m_btnGoBack.onClick.Add(() => {
                this.onBtnGoBack();
            });
        }
    }
    onShow(vo) {
    }
    onClose(arg) {
    }
    onBtnGoBack() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIManager.goBackPage();
    }
}


/***/ }),

/***/ "./src/framework/ui/UIPanel.ts":
/*!*************************************!*\
  !*** ./src/framework/ui/UIPanel.ts ***!
  \*************************************/
/*! exports provided: UIPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIPanel", function() { return UIPanel; });
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _UIBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UIBase */ "./src/framework/ui/UIBase.ts");
/* harmony import */ var _common_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/List */ "./src/framework/common/List.ts");





class UIPanel extends _UIBase__WEBPACK_IMPORTED_MODULE_3__["UIBase"] {
    constructor() {
        super(...arguments);
        this._components = new _common_List__WEBPACK_IMPORTED_MODULE_4__["List"]();
        this._uiComponents = new _common_List__WEBPACK_IMPORTED_MODULE_4__["List"]();
        this.m_layer = _UIDefine__WEBPACK_IMPORTED_MODULE_0__["UILayerDef"].Unkown;
    }
    set name(v) {
        this._name = v;
    }
    get name() {
        return this._name;
    }
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_0__["UITypeDef"].Unkown;
    }
    get layer() {
        return this.m_layer;
    }
    set layer(v) {
        this.m_layer = v;
    }
    get isOpen() {
        return this.fui.visible;
    }
    set visible(isActivate) {
        this.fui.visible = isActivate;
    }
    onDispose() { }
    ;
    onUpdate() { }
    awake() {
        this.onAwake();
    }
    startTimer() {
        if (!this._timer)
            this._timer = setInterval(this.update.bind(this), 200);
    }
    update() {
        this.onUpdate();
    }
    /**
     * 此私有方法在UI Manager中调用 ，特殊调用。
     * @param arg
     */
    _internalOpen(arg) {
        this.layer = _UIDefine__WEBPACK_IMPORTED_MODULE_0__["UILayerDef"].getDefaultLayer(this.uiType);
        csharp__WEBPACK_IMPORTED_MODULE_1__["FairyGUI"].GRoot.inst.AddChild(this.fui);
        this.onShow(arg);
    }
    async createComponent(pkg, name, cls) {
        //加载组件Package资源
        if (pkg != this.pkgName && !this._components.contains(pkg)) {
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].ResManager.loadFairyGUIPackage(pkg);
            this._components.add(pkg);
        }
        let comp = new cls();
        comp.createUI(pkg, name);
        this._uiComponents.add(comp);
        return comp;
    }
    close(arg = null) {
        this.onClose(arg);
        csharp__WEBPACK_IMPORTED_MODULE_1__["FairyGUI"].GRoot.inst.RemoveChild(this.fui);
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    dispose() {
        //卸载组件Package
        this._components.foreach(element => {
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].ResManager.releaseFairyGUIPackage(element);
        });
        this._uiComponents.forEach(element => {
            element.onClose();
            if (element.parent != undefined && element.parent != null) {
                element.parent.RemoveChild(element.fui);
            }
            element.fui.Dispose();
        });
        this._components.clear();
        this._uiComponents.clear();
        this.fui.Dispose();
        this.onDispose();
    }
}


/***/ }),

/***/ "./src/framework/ui/UIWindow.ts":
/*!**************************************!*\
  !*** ./src/framework/ui/UIWindow.ts ***!
  \**************************************/
/*! exports provided: UIWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIWindow", function() { return UIWindow; });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



class UIWindow extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__["UIPanel"] {
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__["UITypeDef"].Window;
    }
    onAwake() {
        this.m_btnClose = this.fui.GetChild(_UIDefine__WEBPACK_IMPORTED_MODULE_1__["UIComDefs"].WindowCloseBtn);
    }
    onShow(arg) {
        this.fui.x = csharp__WEBPACK_IMPORTED_MODULE_2__["FairyGUI"].GRoot.inst.width / 2 - this.fui.width / 2;
        this.fui.y = csharp__WEBPACK_IMPORTED_MODULE_2__["FairyGUI"].GRoot.inst.height / 2 - this.fui.height / 2;
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Add(this.onBtnClose);
        }
    }
    onClose(arg) {
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Remove(this.onBtnClose);
        }
    }
    onBtnClose() {
        this.close(0);
    }
}


/***/ }),

/***/ "./src/framework/util/TimeUtil.ts":
/*!****************************************!*\
  !*** ./src/framework/util/TimeUtil.ts ***!
  \****************************************/
/*! exports provided: TimeUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return TimeUtil; });
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");

class TimeUtil {
    static prefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
    //将一个时间数转换成"00:00:00"格式
    static getTimeString1(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let hour = Math.floor(timeInt / (60 * 60));
            let hourstr = this.prefixInteger(hour, 2);
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            let second = timeInt % 60;
            let secondstr = this.prefixInteger(second, 2);
            return `${hourstr}:${minutestr}:${secondstr}`;
        }
    }
    //将一个时间数转换成"00:00"格式
    static getTimeString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let hour = Math.floor(timeInt / (60 * 60));
            let hourstr = this.prefixInteger(hour, 2);
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            return `${hourstr}:${minutestr}`;
        }
    }
    //将一个时间数转换成"00"分格式
    static getTimeMinuteString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            return `${minutestr}`;
        }
    }
    //将一个时间数转换成"00“秒格式
    static getTimeSecondString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let second = timeInt % 60;
            let secondstr = this.prefixInteger(second, 2);
            return `${secondstr}`;
        }
    }
    //获取本月1号是星期几
    static getWeekOfMonthFirstDay(time) {
        let date = new Date(time);
        date.setDate(1);
        return date.getDay();
    }
    //判断是否为闰年
    static isLeapYear(year) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return true;
        }
        return false;
    }
    static getMonthDays_(year, month) {
        if (month == 2) {
            if (this.isLeapYear(year))
                return 29;
            else {
                return 28;
            }
        }
        else {
            return this.months[month];
        }
    }
    static getMonthDays(time) {
        let t = new Date(time);
        return this.getMonthDays_(t.getFullYear(), t.getMonth());
    }
    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, ms);
        });
    }
    static test() {
        let t1 = this.getTimeString1(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].log(t1);
        let t2 = this.getTimeString(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].log(t2);
        let t3 = this.getTimeMinuteString(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].log(t3);
        let t4 = this.getTimeSecondString(5000);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].log(t4);
        let time = new Date().getTime();
        let t5 = this.getWeekOfMonthFirstDay(time);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].log("getWeekOfMonthFirstDay: " + t5 + " ,time:" + time);
        let t6 = this.getMonthDays(time);
        _logger_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].log("getMonthDays: " + t6);
    }
}
//每个月对应的天数
TimeUtil.months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


/***/ }),

/***/ "./src/game/api/LoginAPI.ts":
/*!**********************************!*\
  !*** ./src/game/api/LoginAPI.ts ***!
  \**********************************/
/*! exports provided: LoginAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginAPI", function() { return LoginAPI; });
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/pb/gen/pb */ "./src/data/pb/gen/pb.js");
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");




class LoginAPI {
    static async benchmarkTest() {
        for (let i = 1; i < 2; i++) {
            let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2GS_Test.create();
            msg.testID = i;
            msg.testName = "benchmark test";
            let response = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].SessionManager.sendGateMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__["Opcode"].MSG_C2GS_Test, msg);
            let test = response;
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("code: " + test.Error + ",msg:" + test.Message + ",res:" + test.testResponse);
        }
    }
    static async loginRealmServer(account, password) {
        let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2R_Login.create();
        msg.Account = account;
        msg.Password = password;
        let response = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].SessionManager.sendRealmMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__["Opcode"].MSG_C2R_Login, msg);
        return response;
    }
    static async loginGateServer(gateId, gateKey) {
        let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_0__["nice_ts"].C2G_LoginGate.create();
        msg.GateId = gateId;
        msg.Key = gateKey;
        let response = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_3__["S"].SessionManager.sendGateMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__["Opcode"].MSG_C2G_LoginGate, msg);
        return response;
    }
}


/***/ }),

/***/ "./src/game/entity/Player.ts":
/*!***********************************!*\
  !*** ./src/game/entity/Player.ts ***!
  \***********************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _framework_entity_AEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/entity/AEntity */ "./src/framework/entity/AEntity.ts");

class Player extends _framework_entity_AEntity__WEBPACK_IMPORTED_MODULE_0__["AEntity"] {
    constructor() {
        super();
        this.level = 1;
        this.hp = 100;
    }
    onAwake(initData) {
    }
}


/***/ }),

/***/ "./src/game/entity/PlayerManager.ts":
/*!******************************************!*\
  !*** ./src/game/entity/PlayerManager.ts ***!
  \******************************************/
/*! exports provided: PlayerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerManager", function() { return PlayerManager; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/entity/EntityFactory */ "./src/framework/entity/EntityFactory.ts");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/game/entity/Player.ts");



class PlayerManager extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    getPlayer(reCreate = false) {
        if (reCreate) {
            this.player = null;
            this.player = _framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__["EntityFactory"].Instance(_framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__["EntityFactory"]).create(_Player__WEBPACK_IMPORTED_MODULE_2__["Player"]);
        }
        else {
            if (this.player == null) {
                this.player = _framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__["EntityFactory"].Instance(_framework_entity_EntityFactory__WEBPACK_IMPORTED_MODULE_1__["EntityFactory"]).create(_Player__WEBPACK_IMPORTED_MODULE_2__["Player"]);
            }
        }
        return this.player;
    }
}


/***/ }),

/***/ "./src/game/entity/component/BagComponent.ts":
/*!***************************************************!*\
  !*** ./src/game/entity/component/BagComponent.ts ***!
  \***************************************************/
/*! exports provided: BagComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BagComponent", function() { return BagComponent; });
/* harmony import */ var _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/entity/Component */ "./src/framework/entity/Component.ts");

class BagComponent extends _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.name = "hello";
        this.size = 100;
    }
}


/***/ }),

/***/ "./src/game/entity/component/PlayerInfoComponent.ts":
/*!**********************************************************!*\
  !*** ./src/game/entity/component/PlayerInfoComponent.ts ***!
  \**********************************************************/
/*! exports provided: PlayerInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerInfoComponent", function() { return PlayerInfoComponent; });
/* harmony import */ var _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/entity/Component */ "./src/framework/entity/Component.ts");

class PlayerInfoComponent extends _framework_entity_Component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super(...arguments);
        this.nickName = "Justin";
        this.money = 1000001;
    }
}


/***/ }),

/***/ "./src/game/event/UIMessage.ts":
/*!*************************************!*\
  !*** ./src/game/event/UIMessage.ts ***!
  \*************************************/
/*! exports provided: UIMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMessage", function() { return UIMessage; });
class UIMessage {
}
UIMessage.MSG_SELECT_SERVER = 1000;
UIMessage.MSG_SCENE_PROGRESS = 1001;


/***/ }),

/***/ "./src/game/event/UIMessageManager.ts":
/*!********************************************!*\
  !*** ./src/game/event/UIMessageManager.ts ***!
  \********************************************/
/*! exports provided: UIMessageManger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMessageManger", function() { return UIMessageManger; });
/* harmony import */ var _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");


class UIMessageManger extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super(...arguments);
        this.uiMessage = new _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_0__["Messenger"]();
    }
    addListener(msgCode, obj, listener) {
        this.uiMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.uiMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.uiMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.uiMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.uiMessage.broadcast(msgCode, params);
    }
}


/***/ }),

/***/ "./src/game/module/guide/UIGuideWin.ts":
/*!*********************************************!*\
  !*** ./src/game/module/guide/UIGuideWin.ts ***!
  \*********************************************/
/*! exports provided: UIGuideWin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIGuideWin", function() { return UIGuideWin; });
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../framework/ui/UIWindow */ "./src/framework/ui/UIWindow.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class UIGuideWin extends _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__["UIWindow"] {
    onAwake() {
        super.onAwake();
        this.m_focus.alpha = 0.2;
        this.m_focus.SetXY(520, 550);
    }
    onShow(vo) {
        super.onShow(vo);
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("focus")
], UIGuideWin.prototype, "m_focus", void 0);


/***/ }),

/***/ "./src/game/module/home/scene/HomeScene.ts":
/*!*************************************************!*\
  !*** ./src/game/module/home/scene/HomeScene.ts ***!
  \*************************************************/
/*! exports provided: HomeScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeScene", function() { return HomeScene; });
/* harmony import */ var _data_ui_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/home */ "./src/data/ui/home.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _vo_VoHome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vo/VoHome */ "./src/game/module/home/vo/VoHome.ts");




class HomeScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__["BaseScene"] {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        let vo = new _vo_VoHome__WEBPACK_IMPORTED_MODULE_3__["VoHome"]();
        vo.name = "Justin";
        vo.hp = 1200;
        vo.mp = 3300;
        vo.money = 666;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIManager.openPageInScene(_data_ui_home__WEBPACK_IMPORTED_MODULE_0__["homeUI"].PackageName, _data_ui_home__WEBPACK_IMPORTED_MODULE_0__["homeUI"].UIHomePage, vo);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/home/ui/UIHomePage.ts":
/*!***********************************************!*\
  !*** ./src/game/module/home/ui/UIHomePage.ts ***!
  \***********************************************/
/*! exports provided: UIHomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIHomePage", function() { return UIHomePage; });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _data_ui_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../data/ui/home */ "./src/data/ui/home.ts");
/* harmony import */ var _api_LoginAPI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/LoginAPI */ "./src/game/api/LoginAPI.ts");
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








class UIHomePage extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__["UIPage"] {
    onAwake() {
        super.onAwake();
        this.m_chatBtn.onClick.Add(() => {
            this.onchatBtn();
        });
        this.m_bagBtn.onClick.Add(() => {
            this.onbagBtn();
        });
        this.m_shopBtn.onClick.Add(() => {
            this.onshopBtn();
        });
        this.m_levelBtn.onClick.Add(() => {
            this.onlevelBtn();
        });
    }
    onShow(vo) {
        super.onShow(vo);
        this.m_nameLbl.text = vo.name;
        this.m_mpLbl.text = vo.mp.toString();
        this.m_hpLbl.text = vo.hp.toString();
        this.m_moneyLbl.text = vo.money.toString();
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_6__["S"].GameSession.listen(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_5__["Opcode"].MSG_GS2C_Test, function (msg) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_7__["Logger"].log("收到服务器下发的消息。。。。" + msg.testResponse);
        });
    }
    onClose(arg) {
        super.onClose(arg);
    }
    onchatBtn() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_6__["S"].UIManager.openWindow(_data_ui_common__WEBPACK_IMPORTED_MODULE_2__["commonUI"].PackageName, _data_ui_common__WEBPACK_IMPORTED_MODULE_2__["commonUI"].UIUINoticeWin, null);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_7__["Logger"].log("on chat...");
    }
    onbagBtn() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_7__["Logger"].log("on bag ..");
        //benchmark test
        _api_LoginAPI__WEBPACK_IMPORTED_MODULE_4__["LoginAPI"].benchmarkTest();
    }
    onshopBtn() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_6__["S"].UIManager.openPage(_data_ui_home__WEBPACK_IMPORTED_MODULE_3__["homeUI"].PackageName, _data_ui_home__WEBPACK_IMPORTED_MODULE_3__["homeUI"].UIShopPage);
    }
    onlevelBtn() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_7__["Logger"].log("on level...");
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("chatBtn")
], UIHomePage.prototype, "m_chatBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("bagBtn")
], UIHomePage.prototype, "m_bagBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("shopBtn")
], UIHomePage.prototype, "m_shopBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("levelBtn")
], UIHomePage.prototype, "m_levelBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("nameTxt")
], UIHomePage.prototype, "m_nameLbl", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("hpTxt")
], UIHomePage.prototype, "m_hpLbl", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("mpTxt")
], UIHomePage.prototype, "m_mpLbl", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("moneyTxt")
], UIHomePage.prototype, "m_moneyLbl", void 0);


/***/ }),

/***/ "./src/game/module/home/ui/UIShopPage.ts":
/*!***********************************************!*\
  !*** ./src/game/module/home/ui/UIShopPage.ts ***!
  \***********************************************/
/*! exports provided: UIShopPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIShopPage", function() { return UIShopPage; });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");

class UIShopPage extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__["UIPage"] {
    onAwake() {
        super.onAwake();
    }
    onShow(vo) {
        super.onShow(vo);
    }
    onClose(arg) {
        super.onClose(arg);
    }
}


/***/ }),

/***/ "./src/game/module/home/vo/VoHome.ts":
/*!*******************************************!*\
  !*** ./src/game/module/home/vo/VoHome.ts ***!
  \*******************************************/
/*! exports provided: VoHome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoHome", function() { return VoHome; });
class VoHome {
}


/***/ }),

/***/ "./src/game/module/login/scene/LoginScene.ts":
/*!***************************************************!*\
  !*** ./src/game/module/login/scene/LoginScene.ts ***!
  \***************************************************/
/*! exports provided: LoginScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginScene", function() { return LoginScene; });
/* harmony import */ var _data_ui_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/login */ "./src/data/ui/login.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");



class LoginScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__["BaseScene"] {
    onEnter() {
    }
    onComplete() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIManager.openPageInScene(_data_ui_login__WEBPACK_IMPORTED_MODULE_0__["loginUI"].PackageName, _data_ui_login__WEBPACK_IMPORTED_MODULE_0__["loginUI"].UILoginPage, null);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/login/ui/UILoginPage.ts":
/*!*************************************************!*\
  !*** ./src/game/module/login/ui/UILoginPage.ts ***!
  \*************************************************/
/*! exports provided: UILoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILoginPage", function() { return UILoginPage; });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_ui_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../data/ui/login */ "./src/data/ui/login.ts");
/* harmony import */ var _vo_VoServer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vo/VoServer */ "./src/game/module/login/vo/VoServer.ts");
/* harmony import */ var _event_UIMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _data_ui_story__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../data/ui/story */ "./src/data/ui/story.ts");
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











class UILoginPage extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__["UIPage"] {
    constructor() {
        super(...arguments);
        this._effectGo = null;
    }
    async onAwake() {
        super.onAwake();
        this.m_loginBtn.onClick.Add(() => {
            this.onLoginClick();
        });
        this.m_storyBtn.onClick.Add(() => {
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].UIManager.openWindow(_data_ui_story__WEBPACK_IMPORTED_MODULE_7__["storyUI"].PackageName, _data_ui_story__WEBPACK_IMPORTED_MODULE_7__["storyUI"].UIStoryWin, null);
        });
        this.m_newGuideBtn.onClick.Add(() => {
            _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].UIManager.openWindow(_data_ui_common__WEBPACK_IMPORTED_MODULE_8__["commonUI"].PackageName, _data_ui_common__WEBPACK_IMPORTED_MODULE_8__["commonUI"].UIUIGuideWin, null);
        });
        this.m_selserverBtn.onClick.Add(() => {
            this.openSelServerWin();
        });
        // let connected = await S.SessionManager.connectRealmServer();
        // this.m_loginBtn.enabled = connected;
        // Logger.log("connect ream server: "+connected)
    }
    onSelectServer(serverItem) {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(" server selected: " + serverItem.serverName);
        this.m_selserverBtn.text = serverItem.serverName;
    }
    async onShow(vo) {
        super.onShow(vo);
        //加载特效
        this._effectGo = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].ResManager.loadPrefab("Effect/Prefab/UI/ef_ui_pet_rank_yellow_test.prefab");
        let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(this._effectGo);
        let wrapper = new csharp__WEBPACK_IMPORTED_MODULE_2__["FairyGUI"].GoWrapper(inst);
        this.m_holder.SetNativeObject(wrapper);
        //监听选服消息
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].UIMessageManger.addListener(_event_UIMessage__WEBPACK_IMPORTED_MODULE_5__["UIMessage"].MSG_SELECT_SERVER, this, this.onSelectServer);
    }
    onClose(arg) {
        super.onClose(arg);
        //卸载铁效
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].ResManager.releaseAddressGO(this._effectGo);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].UIMessageManger.removeListener(_event_UIMessage__WEBPACK_IMPORTED_MODULE_5__["UIMessage"].MSG_SELECT_SERVER, this.onSelectServer);
    }
    openSelServerWin() {
        // 测试数据
        let voServer = new _vo_VoServer__WEBPACK_IMPORTED_MODULE_4__["VoServer"]();
        for (let i = 1; i < 10; i++) {
            voServer.areaMap.set(i, "分区" + i);
            voServer.serverMap.set(i, new Array());
            for (let j = 1; j < 200; j++) {
                let voServerItem = new _vo_VoServer__WEBPACK_IMPORTED_MODULE_4__["VoServerItem"]();
                voServerItem.areaId = i;
                voServerItem.serverId = j;
                voServerItem.serverName = "测试服务器" + i + ":" + j;
                voServerItem.serverStatus = Math.floor(Math.random() * 3 + 1);
                voServer.serverMap.get(i).push(voServerItem);
            }
        }
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].UIManager.openWindow(_data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].PackageName, _data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].UISelServerWin, voServer);
    }
    async onLoginClick() {
        let account = this.m_account.text;
        let password = this.m_password.text;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(`account:${account} - password: ${password}`);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_6__["SceneDef"].HomeScene);
        // if(account != "" && password != ""){
        //     let msg = await LoginAPI.loginRealmServer(account, password)
        //     this.gateId = msg.GateId;
        //     this.gateKey = msg.Key;
        //     Logger.log("login ream succ, gate addr:"+msg.Address + ",key:"+msg.Key);
        //     S.SessionManager.disconnectRealmServer();
        //     //登录网关服
        //     let connected = await S.SessionManager.connectGateServer(msg.Address);
        //     if(connected){
        //         Logger.log("connect gate succ")
        //         let msg = await LoginAPI.loginGateServer( this.gateId, this.gateKey)
        //         let playerID = msg.PlayerId;
        //         Logger.log("login gate response.." +playerID);
        //         S.SceneManager.loadScene(SceneDef.HomeScene);
        //     }else{
        //     Logger.log("connect gate err ")
        //     }
        //  }
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("account")
], UILoginPage.prototype, "m_account", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("password")
], UILoginPage.prototype, "m_password", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("selserverBtn")
], UILoginPage.prototype, "m_selserverBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("loginBtn")
], UILoginPage.prototype, "m_loginBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("storyBtn")
], UILoginPage.prototype, "m_storyBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("newGuideBtn")
], UILoginPage.prototype, "m_newGuideBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("hold")
], UILoginPage.prototype, "m_holder", void 0);


/***/ }),

/***/ "./src/game/module/login/ui/UISelServerWin.ts":
/*!****************************************************!*\
  !*** ./src/game/module/login/ui/UISelServerWin.ts ***!
  \****************************************************/
/*! exports provided: UISelServerWin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UISelServerWin", function() { return UISelServerWin; });
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/ui/UIWindow */ "./src/framework/ui/UIWindow.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _event_UIMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _UIServerListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UIServerListItem */ "./src/game/module/login/ui/UIServerListItem.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class UISelServerWin extends _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__["UIWindow"] {
    constructor() {
        super(...arguments);
        this.clickAreaIndex = 0;
        this.clickServerIndex = 0;
    }
    onAwake() {
        super.onAwake();
        this.backBtn.onClick.Add(() => {
            this.close();
        });
        this.okBtn.onClick.Add(() => {
            this.onSelectServer();
        });
        this.areaList.onClickItem.Add((event) => {
            this.clickAreaIndex = this.areaList.GetChildIndex(event.data);
            this.serverList.numItems = this.voServer.serverMap.get(this.clickAreaIndex + 1).length;
            this.serverList.RefreshVirtualList();
        });
        this.serverList.onClickItem.Add((event) => {
            this.clickServerIndex = this.serverList.GetChildIndex(event.data);
            this.title.text = "已选择服务器：" + this.clickServerIndex;
        });
        let pool = [];
    }
    onSelectServer() {
        let selItem = this.voServer.serverMap.get(this.clickAreaIndex + 1)[this.clickServerIndex];
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].UIMessageManger.broadcast(_event_UIMessage__WEBPACK_IMPORTED_MODULE_3__["UIMessage"].MSG_SELECT_SERVER, selItem);
        this.close();
    }
    onShow(vo) {
        super.onShow(vo);
        this.voServer = vo;
        this.areaList.SetVirtual();
        this.areaList.itemRenderer = (index, obj) => {
            this.renderAreaListItem(index, obj);
        };
        this.areaList.numItems = vo.areaMap.size;
        this.serverList.SetVirtual();
        this.serverList.itemRenderer = (index, obj) => {
            this.renderServerListItem(index, obj);
        };
        this.serverList.numItems = vo.serverMap.get(this.clickAreaIndex + 1).length;
    }
    renderAreaListItem(index, obj) {
        let areaBtn = obj.asButton;
        areaBtn.text = this.voServer.areaMap.get(index + 1);
    }
    renderServerListItem(index, item) {
        if (item instanceof _UIServerListItem__WEBPACK_IMPORTED_MODULE_4__["UIServerListItem"]) {
            console.log("1111111111111111111111");
        }
        else {
            console.log("333333333333333333");
        }
        item.itemLabel = this.voServer.serverMap.get(this.clickAreaIndex + 1)[index].serverName;
        //serverBtn.icon = FairyGUI.UIPackage.
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("areaList")
], UISelServerWin.prototype, "areaList", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("serverList")
], UISelServerWin.prototype, "serverList", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("backBtn")
], UISelServerWin.prototype, "backBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("okBtn")
], UISelServerWin.prototype, "okBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("title")
], UISelServerWin.prototype, "title", void 0);


/***/ }),

/***/ "./src/game/module/login/ui/UIServerListItem.ts":
/*!******************************************************!*\
  !*** ./src/game/module/login/ui/UIServerListItem.ts ***!
  \******************************************************/
/*! exports provided: UIServerListItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIServerListItem", function() { return UIServerListItem; });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);

/**
 *
 *  此处之所以要引用 UIServerListItem 对象，是因为 V8会GC掉此对象， 但是c#端确仍然存在此Delegate
 *  注意：要将宏： FAIRYGUI_PUERTS 打开才能有效释放引用
 *
 */
let __cacheListItemMap = new Map();
let __id = 0;
class UIServerListItem extends csharp__WEBPACK_IMPORTED_MODULE_0__["FairyGUI"].GButton {
    constructor() {
        super();
        this.itemid = 0;
        this["__onDispose"] = () => { this.onDispose(); };
        __id++;
        this.itemid = __id;
        __cacheListItemMap.set(this.itemid, this);
    }
    onDispose() {
        __cacheListItemMap.delete(this.itemid);
    }
    set itemLabel(txt) {
        this.text = txt;
    }
}


/***/ }),

/***/ "./src/game/module/login/vo/VoServer.ts":
/*!**********************************************!*\
  !*** ./src/game/module/login/vo/VoServer.ts ***!
  \**********************************************/
/*! exports provided: VoServerItem, VoServer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoServerItem", function() { return VoServerItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoServer", function() { return VoServer; });
class VoServerItem {
}
class VoServer {
    constructor() {
        this.serverMap = new Map();
        this.areaMap = new Map();
    }
}


/***/ }),

/***/ "./src/game/module/pve/scene/PveScene.ts":
/*!***********************************************!*\
  !*** ./src/game/module/pve/scene/PveScene.ts ***!
  \***********************************************/
/*! exports provided: PveScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PveScene", function() { return PveScene; });
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");

class PveScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__["BaseScene"] {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/story/UIStoryWin.ts":
/*!*********************************************!*\
  !*** ./src/game/module/story/UIStoryWin.ts ***!
  \*********************************************/
/*! exports provided: UIStoryWin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIStoryWin", function() { return UIStoryWin; });
/* harmony import */ var _data_ui_story__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/ui/story */ "./src/data/ui/story.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../framework/ink/StoryMessageManager */ "./src/framework/ink/StoryMessageManager.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../framework/ui/UIWindow */ "./src/framework/ui/UIWindow.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/GameConfig */ "./src/global/GameConfig.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class UIStoryWin extends _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_4__["UIWindow"] {
    constructor() {
        super(...arguments);
        this.shouldContineStory = false;
        this.optionsMap = new Map();
    }
    onAwake() {
        super.onAwake();
        this.m_btnList.itemRenderer = (index, obj) => {
            this.renderBtnList(index, obj);
        };
        this.m_btnList.onClickItem.Add((event) => {
            let clickId = this.m_btnList.GetChildIndex(event.data);
            if (this.shouldContineStory) {
                _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryManager.advanceStory();
            }
            else {
                this.optionsMap.clear();
                _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryManager.selectChoice(this.allChoices[clickId]);
            }
        });
    }
    onShow(vo) {
        super.onShow(vo);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryMessageManager.addListener(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__["StoryMessageManager"].ONCONTENTREADY, this, this.OnContentReady);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryMessageManager.addListener(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__["StoryMessageManager"].ONCHOICESPRESENTED, this, this.OnChoicesPresented);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryMessageManager.addListener(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__["StoryMessageManager"].ONSTORYFINISHED, this, this.OnStoryFinished);
        this.optionsMap.clear();
        this.shouldContineStory = false;
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryManager.beginStory("story2");
    }
    OnContentReady(speakerContent, speakerId, currentTags, currentChoices) {
        this.m_speakerTxt.text = speakerContent;
        if (_global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryManager.canContinue) {
            this.shouldContineStory = true;
            this.m_btnList.numItems = 1;
        }
        if (currentChoices.length > 0) {
            this.allChoices = currentChoices;
            this.shouldContineStory = false;
            let len = currentChoices.length;
            for (let i = 0; i < len; i++) {
                this.optionsMap.set(i, currentChoices[i].text);
            }
            this.m_btnList.numItems = len;
        }
    }
    renderBtnList(index, obj) {
        let continueBtn = obj.asButton;
        if (this.optionsMap.size > 0) {
            continueBtn.text = this.optionsMap.get(index);
        }
        else {
            continueBtn.text = "点击继续";
        }
    }
    OnChoicesPresented(currentChoices) {
        this.shouldContineStory = false;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("....OnChoicesPresented......");
    }
    OnStoryFinished() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Story Finished");
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].UIManager.closeWindow(_data_ui_story__WEBPACK_IMPORTED_MODULE_0__["storyUI"].UIStoryWin, null);
    }
    onClose(arg) {
        super.onClose(arg);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryMessageManager.removeListener(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__["StoryMessageManager"].ONCONTENTREADY, this.OnContentReady);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryMessageManager.removeListener(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__["StoryMessageManager"].ONCHOICESPRESENTED, this.OnChoicesPresented);
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_5__["S"].StoryMessageManager.removeListener(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_2__["StoryMessageManager"].ONSTORYFINISHED, this.OnStoryFinished);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("speakerTxt")
], UIStoryWin.prototype, "m_speakerTxt", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("btnList")
], UIStoryWin.prototype, "m_btnList", void 0);


/***/ }),

/***/ "./src/global/GameConfig.ts":
/*!**********************************!*\
  !*** ./src/global/GameConfig.ts ***!
  \**********************************/
/*! exports provided: GameConfig, S */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameConfig", function() { return GameConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony import */ var _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/common/GameObjectPool */ "./src/framework/common/GameObjectPool.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _framework_ink_StoryManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/ink/StoryManager */ "./src/framework/ink/StoryManager.ts");
/* harmony import */ var _framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../framework/ink/StoryMessageManager */ "./src/framework/ink/StoryMessageManager.ts");
/* harmony import */ var _framework_net_GameSession__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/net/GameSession */ "./src/framework/net/GameSession.ts");
/* harmony import */ var _framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../framework/net/HttpManager */ "./src/framework/net/HttpManager.ts");
/* harmony import */ var _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../framework/net/SessionManager */ "./src/framework/net/SessionManager.ts");
/* harmony import */ var _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../framework/scene/SceneManager */ "./src/framework/scene/SceneManager.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");
/* harmony import */ var _game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../game/event/UIMessageManager */ "./src/game/event/UIMessageManager.ts");










class GameConfig {
}
GameConfig.debug = true;
GameConfig.realmServerIP = "127.0.0.1";
GameConfig.realmServerPort = 9001;
class S {
}
S.UIManager = _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_8__["UIManager"].Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_8__["UIManager"]);
S.UIMessageManger = _game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_9__["UIMessageManger"].Instance(_game_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_9__["UIMessageManger"]);
S.SceneManager = _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_7__["SceneManager"].Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_7__["SceneManager"]);
S.GameObjectPool = _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"].Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"]);
S.ResManager = _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]);
S.StoryManager = _framework_ink_StoryManager__WEBPACK_IMPORTED_MODULE_2__["StoryManager"].Instance(_framework_ink_StoryManager__WEBPACK_IMPORTED_MODULE_2__["StoryManager"]);
S.SessionManager = _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_6__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_6__["SessionManager"]);
S.GameSession = _framework_net_GameSession__WEBPACK_IMPORTED_MODULE_4__["GameSession"].Instance(_framework_net_GameSession__WEBPACK_IMPORTED_MODULE_4__["GameSession"]);
S.StoryMessageManager = _framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"].Instance(_framework_ink_StoryMessageManager__WEBPACK_IMPORTED_MODULE_3__["StoryMessageManager"]);
S.HttpManager = _framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_5__["HttpManager"].Instance(_framework_net_HttpManager__WEBPACK_IMPORTED_MODULE_5__["HttpManager"]);


/***/ }),

/***/ "./src/unittest/SingletonTest.ts":
/*!***************************************!*\
  !*** ./src/unittest/SingletonTest.ts ***!
  \***************************************/
/*! exports provided: SingletonTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingletonTest", function() { return SingletonTest; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/logger/Logger */ "./src/framework/logger/Logger.ts");


class SingletonTest extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.num = 0;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("SingletonTest call constructor");
    }
    add() {
        this.num += 1;
    }
    test() {
        return this.num;
    }
}


/***/ }),

/***/ "./src/unittest/UnitTest.ts":
/*!**********************************!*\
  !*** ./src/unittest/UnitTest.ts ***!
  \**********************************/
/*! exports provided: UnitTest, Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitTest", function() { return UnitTest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/util/TimeUtil */ "./src/framework/util/TimeUtil.ts");
/* harmony import */ var _SingletonTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingletonTest */ "./src/unittest/SingletonTest.ts");
/* harmony import */ var _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/excel/SkillConfig */ "./src/data/excel/SkillConfig.ts");
/* harmony import */ var _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../framework/redhints/RedHintsMessageManager */ "./src/framework/redhints/RedHintsMessageManager.ts");
/* harmony import */ var _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../framework/redhints/RedHintsManager */ "./src/framework/redhints/RedHintsManager.ts");
/* harmony import */ var inkjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! inkjs */ "./node_modules/inkjs/dist/ink-es2015.js");
/* harmony import */ var inkjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(inkjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../data/pb/gen/pb */ "./src/data/pb/gen/pb.js");
/* harmony import */ var _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _game_entity_PlayerManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../game/entity/PlayerManager */ "./src/game/entity/PlayerManager.ts");
/* harmony import */ var _game_entity_component_BagComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../game/entity/component/BagComponent */ "./src/game/entity/component/BagComponent.ts");
/* harmony import */ var _game_entity_component_PlayerInfoComponent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../game/entity/component/PlayerInfoComponent */ "./src/game/entity/component/PlayerInfoComponent.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_14__);















class UnitTest {
    static async doTest() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("TimeUtil =============================");
        _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__["TimeUtil"].test();
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("Singleton =============================");
        _SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"].Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"]);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("===");
        let t1 = _SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"].Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"]);
        let t2 = _SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"].Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"]);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(t1.test() + " : " + t2.test());
        t1.add();
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(t1.test() + " : " + t2.test());
        t2.add();
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(t1.test() + " : " + t2.test());
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("Messager =============================");
        let messenger = new _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_2__["Messenger"]();
        let listen = function (a, b) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(`listen call: ${a} , ${b}`);
        };
        let listen2 = function (a, b) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(`listen call2: ${a} , ${b}`);
        };
        let EVENT_CODE = 100;
        messenger.addListener(EVENT_CODE, this, listen);
        messenger.addListener(EVENT_CODE, this, listen2);
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        messenger.removeListener(EVENT_CODE, listen);
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        messenger.clearup();
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("Timer =============================");
        let interval = setInterval(() => {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("inter val..");
        }, 1000);
        let timeout = setTimeout(() => {
            clearInterval(interval);
        }, 5000);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("ResourceManager =============================");
        // let prefab = await ResManager.Instance(ResManager).loadPrefab("Models/1001/Character.prefab") ;
        //Logger.log(prefab);
        //let inst = CS.UnityEngine.GameObject.Instantiate(prefab);
        //inst.name = "Test Ch";
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("引用类型 =============================");
        let testMap = new Map();
        testMap.set("key1", new Array());
        let arr1 = testMap.get("key1");
        arr1.push(12);
        arr1.push(333);
        let arr2 = testMap.get("key1");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(arr2);
        // Logger.log("FariyGUI =============================");
        //  let page:UI_LoginPage = new UI_LoginPage();
        //  CS.FairyGUI.GRoot.inst.AddChild(page._ui);
        //  Logger.log(page._ui);
        // Logger.log("ModuleManager =============================");
        // ModuleManager.Instance(ModuleManager).createModule(ModuleDef.LoginModule,"create login");
        // ModuleManager.Instance(ModuleManager).sendMessage(ModuleDef.LoginModule, "test1",2233);
        // ModuleManager.Instance(ModuleManager).sendMessage(ModuleDef.HomeModule, "test2",2233);
        // Logger.log("then create Home");
        // ModuleManager.Instance(ModuleManager).createModule(ModuleDef.HomeModule,"create login");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("UIManager =============================");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("excel data =============================");
        let skillMap = _data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_4__["SkillConfigTB"].Instance(_data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_4__["SkillConfigTB"]).trs;
        let skilltr = skillMap.get(1003);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(`${skilltr._Name} : ${skilltr._AttackType}`);
        let impacttype = skilltr._ImpactType;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(impacttype);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("Protobuf =============================");
        try {
            let c2rLogin = {
                "Account": "test",
                "Password": "1234"
            };
            //验证
            let v1 = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8__["nice_ts"].C2R_Login.verify(c2rLogin);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("verify pb: " + v1);
            let msg = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8__["nice_ts"].C2R_Login.create(c2rLogin);
            msg.Account = "test1";
            msg.Password = "1122";
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(msg);
            let buf = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8__["nice_ts"].C2R_Login.encode(msg).finish();
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(buf);
            let de_buf = _data_pb_gen_pb__WEBPACK_IMPORTED_MODULE_8__["nice_ts"].C2R_Login.decode(buf);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(de_buf.Account);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(de_buf.Password);
        }
        catch (ex) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(ex);
        }
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("UintArray =============================");
        let opcode_arr = new Uint8Array([257, 25]);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(opcode_arr.subarray(0, 1));
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(opcode_arr.length);
        let opcode_arr2 = new Uint8Array([33]);
        //合并 Uint8Array
        let merge_arr = new Uint8Array(opcode_arr.length + opcode_arr2.length);
        merge_arr.set(opcode_arr2);
        merge_arr.set(opcode_arr, opcode_arr2.length);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(merge_arr.length);
        let n = 5678;
        let buffer = new Uint8Array(4);
        // << 左移  >> 右移  >>> 无符号右移
        //n转uint8Array
        buffer[0] = n >>> 24;
        buffer[1] = n >>> 16;
        buffer[2] = n >>> 8;
        buffer[3] = n & 0xff;
        //unit8Array转n
        n = buffer[0] << 24 | buffer[1] << 16 | buffer[2] << 8 | buffer[3];
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(n);
        n = 300;
        let buffer1 = new Uint8Array(2);
        buffer1[0] = n >>> 8;
        buffer1[1] = n & 0xff;
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(buffer1);
        n = buffer1[0] << 8 | buffer1[1];
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(n);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("sleep =============================");
        await _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__["TimeUtil"].sleep(1000);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("sleep ..end");
        // Logger.log("flatbuffer =============================");
        // try{
        //     let bytes:ArrayBuffer = await ResManager.Instance(ResManager).loadTextBytes("Config/fb/unitconfig.bytes")
        //     let unitByte = new flatbuffers.ByteBuffer(new Uint8Array(bytes));
        //     Logger.log(unitByte);
        //     let unitconfig:fb.unitconfigTB = fb.unitconfigTB.getRootAsunitconfigTB(unitByte)
        //     Logger.log(unitconfig.unitconfigTRSLength());
        //     for(let i=0; i<unitconfig.unitconfigTRSLength(); i++){
        //         let a =  unitconfig.unitconfigTRS(i);
        //         Logger.log(a.Name());
        //     }
        // }catch(ex){
        //     Logger.error(ex);
        // }
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("测试红点系统 =============================");
            _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__["RedHintsMessageManager"].Instance(_framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__["RedHintsMessageManager"]).addListener(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat, this, function () {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("red hints chat...");
            });
            _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__["RedHintsMessageManager"].Instance(_framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__["RedHintsMessageManager"]).addListener(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat_family, this, function () {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("red hints chat_family...");
            });
            _framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__["RedHintsMessageManager"].Instance(_framework_redhints_RedHintsMessageManager__WEBPACK_IMPORTED_MODULE_5__["RedHintsMessageManager"]).addListener(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat_system, this, function () {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("red hints chat...");
            });
            _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"].Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"]).setRedHintOpenOrClose(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat_family, true);
            let r_chat = _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"].Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"]).checkRedIsOpen(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat);
            let r_chat_family = _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"].Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"]).checkRedIsOpen(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat_family);
            let r_chat_system = _framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"].Instance(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["RedHintsManager"]).checkRedIsOpen(_framework_redhints_RedHintsManager__WEBPACK_IMPORTED_MODULE_6__["enumRedHints"].chat_system);
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(r_chat, r_chat_family, r_chat_system);
        }
        catch (error) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(error);
        }
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("Ink Story =============================");
            var json = await (await _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__["ResManager"].Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__["ResManager"]).loadTextAsset("Story/TestStory.json")).text;
            let story = new inkjs__WEBPACK_IMPORTED_MODULE_7__["Story"](json);
            story.ChoosePathString("story1", true);
            story.BindExternalFunction("GetCharacterName", () => {
                return "Justin Test";
            });
            story.BindExternalFunctionGeneral("GetCharacterNameByMutiParams", (args) => {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(args.length);
                return "TTTT";
            });
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(story.Continue());
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(story.Continue());
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(story.Continue());
        }
        catch (error) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(error);
        }
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log("HttpManager=========================");
        let txt = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_9__["S"].HttpManager.get("https://www.baidu.com/");
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_10__["Logger"].log(txt);
        //Logger.log("entity=========================")
        let player = _game_entity_PlayerManager__WEBPACK_IMPORTED_MODULE_11__["PlayerManager"].Instance(_game_entity_PlayerManager__WEBPACK_IMPORTED_MODULE_11__["PlayerManager"]).getPlayer();
        let bagC = player.addComponent(_game_entity_component_BagComponent__WEBPACK_IMPORTED_MODULE_12__["BagComponent"]);
        //Logger.log(bagC.name);
        let infoC = player.addComponent(_game_entity_component_PlayerInfoComponent__WEBPACK_IMPORTED_MODULE_13__["PlayerInfoComponent"]);
        //Logger.log(infoC.nickName);
        //测试事件
        let event = new Event();
        event.name = "helloEvent";
        //Lambda 表达式订阅
        bagC.subscribe((e) => {
            //Logger.log("Event trigger:"+e.name)
        }, Event);
        let trigger2 = (e) => {
            //Logger.log("Event trigger2:"+e.name)
        };
        //订阅
        bagC.subscribe(trigger2, Event);
        //取消订阅
        bagC.unSubscribe(trigger2, Event);
        bagC.publish(event, Event);
        //test delegate
        csharp__WEBPACK_IMPORTED_MODULE_14__["TestC"].SetPackageItemExtension(new TTestC());
        setInterval(() => {
            let p = csharp__WEBPACK_IMPORTED_MODULE_14__["TestC"].getObj();
            if (p instanceof TTestC) {
                console.log("aaaaaaaaaaaaaaaa");
            }
            else {
                console.log("bbbbbbbbbbbbbbbbbbbb");
            }
        }, 1000);
    }
}
UnitTest.testVar = 10000;
class TTestC extends csharp__WEBPACK_IMPORTED_MODULE_14__["TestP"] {
    test() {
        console.log("hello test delegate");
    }
}
class Event {
}


/***/ }),

/***/ "csharp":
/*!*************************!*\
  !*** external "csharp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csharp");

/***/ }),

/***/ "puerts":
/*!*************************!*\
  !*** external "puerts" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puerts");

/***/ })

/******/ });