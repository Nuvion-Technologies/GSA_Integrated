import {DecodeStream as $6uUbQ$DecodeStream, Struct as $6uUbQ$Struct, String as $6uUbQ$String, uint32 as $6uUbQ$uint32, Pointer as $6uUbQ$Pointer, uint16 as $6uUbQ$uint16, Array as $6uUbQ$Array, VoidPointer as $6uUbQ$VoidPointer, int16 as $6uUbQ$int16, uint24 as $6uUbQ$uint24, uint8 as $6uUbQ$uint8, VersionedStruct as $6uUbQ$VersionedStruct, LazyArray as $6uUbQ$LazyArray, Reserved as $6uUbQ$Reserved, int32 as $6uUbQ$int32, Bitfield as $6uUbQ$Bitfield, fixed32 as $6uUbQ$fixed32, Buffer as $6uUbQ$Buffer, Number as $6uUbQ$Number, resolveLength as $6uUbQ$resolveLength, fixed16 as $6uUbQ$fixed16, PropertyDescriptor as $6uUbQ$PropertyDescriptor, Fixed as $6uUbQ$Fixed, int8 as $6uUbQ$int8, Optional as $6uUbQ$Optional, EncodeStream as $6uUbQ$EncodeStream} from "restructure";
import {_ as $6uUbQ$_} from "@swc/helpers/_/_define_property";
import {_ as $6uUbQ$_1} from "@swc/helpers/_/_ts_decorate";
import $6uUbQ$fastdeepequal from "fast-deep-equal";
import {getCombiningClass as $6uUbQ$getCombiningClass, getScript as $6uUbQ$getScript, isDigit as $6uUbQ$isDigit, getCategory as $6uUbQ$getCategory, isMark as $6uUbQ$isMark} from "unicode-properties";
import $6uUbQ$unicodetrie from "unicode-trie";
import $6uUbQ$dfa from "dfa";
import $6uUbQ$clone from "clone";
import $6uUbQ$tinyinflate from "tiny-inflate";
import $6uUbQ$brotlidecompressjs from "brotli/decompress.js";


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $d636bc798e7178db$exports = {};

$parcel$export($d636bc798e7178db$exports, "logErrors", () => $d636bc798e7178db$export$bd5c5d8b8dcafd78);
$parcel$export($d636bc798e7178db$exports, "registerFormat", () => $d636bc798e7178db$export$36b2f24e97d43be);
$parcel$export($d636bc798e7178db$exports, "create", () => $d636bc798e7178db$export$185802fd694ee1f5);
$parcel$export($d636bc798e7178db$exports, "defaultLanguage", () => $d636bc798e7178db$export$42940898df819940);
$parcel$export($d636bc798e7178db$exports, "setDefaultLanguage", () => $d636bc798e7178db$export$5157e7780d44cc36);

let $d636bc798e7178db$export$bd5c5d8b8dcafd78 = false;
let $d636bc798e7178db$var$formats = [];
function $d636bc798e7178db$export$36b2f24e97d43be(format) {
    $d636bc798e7178db$var$formats.push(format);
}
function $d636bc798e7178db$export$185802fd694ee1f5(buffer, postscriptName) {
    for(let i = 0; i < $d636bc798e7178db$var$formats.length; i++){
        let format = $d636bc798e7178db$var$formats[i];
        if (format.probe(buffer)) {
            let font = new format(new (0, $6uUbQ$DecodeStream)(buffer));
            if (postscriptName) return font.getFont(postscriptName);
            return font;
        }
    }
    throw new Error('Unknown font format');
}
let $d636bc798e7178db$export$42940898df819940 = 'en';
function $d636bc798e7178db$export$5157e7780d44cc36(lang = 'en') {
    $d636bc798e7178db$export$42940898df819940 = lang;
}





/**
 * This decorator caches the results of a getter or method such that
 * the results are lazily computed once, and then cached.
 * @private
 */ function $e71565f2ce09cb6b$export$69a3209f1a06c04d(target, key, descriptor) {
    if (descriptor.get) {
        let get = descriptor.get;
        descriptor.get = function() {
            let value = get.call(this);
            Object.defineProperty(this, key, {
                value: value
            });
            return value;
        };
    } else if (typeof descriptor.value === 'function') {
        let fn = descriptor.value;
        return {
            get () {
                let cache = new Map;
                function memoized(...args) {
                    let key = args.length > 0 ? args[0] : 'value';
                    if (cache.has(key)) return cache.get(key);
                    let result = fn.apply(this, args);
                    cache.set(key, result);
                    return result;
                }
                Object.defineProperty(this, key, {
                    value: memoized
                });
                return memoized;
            }
        };
    }
}





let $26a62205ad06574e$var$SubHeader = new $6uUbQ$Struct({
    firstCode: $6uUbQ$uint16,
    entryCount: $6uUbQ$uint16,
    idDelta: $6uUbQ$int16,
    idRangeOffset: $6uUbQ$uint16
});
let $26a62205ad06574e$var$CmapGroup = new $6uUbQ$Struct({
    startCharCode: $6uUbQ$uint32,
    endCharCode: $6uUbQ$uint32,
    glyphID: $6uUbQ$uint32
});
let $26a62205ad06574e$var$UnicodeValueRange = new $6uUbQ$Struct({
    startUnicodeValue: $6uUbQ$uint24,
    additionalCount: $6uUbQ$uint8
});
let $26a62205ad06574e$var$UVSMapping = new $6uUbQ$Struct({
    unicodeValue: $6uUbQ$uint24,
    glyphID: $6uUbQ$uint16
});
let $26a62205ad06574e$var$DefaultUVS = new $6uUbQ$Array($26a62205ad06574e$var$UnicodeValueRange, $6uUbQ$uint32);
let $26a62205ad06574e$var$NonDefaultUVS = new $6uUbQ$Array($26a62205ad06574e$var$UVSMapping, $6uUbQ$uint32);
let $26a62205ad06574e$var$VarSelectorRecord = new $6uUbQ$Struct({
    varSelector: $6uUbQ$uint24,
    defaultUVS: new $6uUbQ$Pointer($6uUbQ$uint32, $26a62205ad06574e$var$DefaultUVS, {
        type: 'parent'
    }),
    nonDefaultUVS: new $6uUbQ$Pointer($6uUbQ$uint32, $26a62205ad06574e$var$NonDefaultUVS, {
        type: 'parent'
    })
});
let $26a62205ad06574e$var$CmapSubtable = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    0: {
        length: $6uUbQ$uint16,
        language: $6uUbQ$uint16,
        codeMap: new $6uUbQ$LazyArray($6uUbQ$uint8, 256)
    },
    2: {
        length: $6uUbQ$uint16,
        language: $6uUbQ$uint16,
        subHeaderKeys: new $6uUbQ$Array($6uUbQ$uint16, 256),
        subHeaderCount: (t)=>Math.max.apply(Math, t.subHeaderKeys),
        subHeaders: new $6uUbQ$LazyArray($26a62205ad06574e$var$SubHeader, 'subHeaderCount'),
        glyphIndexArray: new $6uUbQ$LazyArray($6uUbQ$uint16, 'subHeaderCount')
    },
    4: {
        length: $6uUbQ$uint16,
        language: $6uUbQ$uint16,
        segCountX2: $6uUbQ$uint16,
        segCount: (t)=>t.segCountX2 >> 1,
        searchRange: $6uUbQ$uint16,
        entrySelector: $6uUbQ$uint16,
        rangeShift: $6uUbQ$uint16,
        endCode: new $6uUbQ$LazyArray($6uUbQ$uint16, 'segCount'),
        reservedPad: new $6uUbQ$Reserved($6uUbQ$uint16),
        startCode: new $6uUbQ$LazyArray($6uUbQ$uint16, 'segCount'),
        idDelta: new $6uUbQ$LazyArray($6uUbQ$int16, 'segCount'),
        idRangeOffset: new $6uUbQ$LazyArray($6uUbQ$uint16, 'segCount'),
        glyphIndexArray: new $6uUbQ$LazyArray($6uUbQ$uint16, (t)=>(t.length - t._currentOffset) / 2)
    },
    6: {
        length: $6uUbQ$uint16,
        language: $6uUbQ$uint16,
        firstCode: $6uUbQ$uint16,
        entryCount: $6uUbQ$uint16,
        glyphIndices: new $6uUbQ$LazyArray($6uUbQ$uint16, 'entryCount')
    },
    8: {
        reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
        length: $6uUbQ$uint32,
        language: $6uUbQ$uint16,
        is32: new $6uUbQ$LazyArray($6uUbQ$uint8, 8192),
        nGroups: $6uUbQ$uint32,
        groups: new $6uUbQ$LazyArray($26a62205ad06574e$var$CmapGroup, 'nGroups')
    },
    10: {
        reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
        length: $6uUbQ$uint32,
        language: $6uUbQ$uint32,
        firstCode: $6uUbQ$uint32,
        entryCount: $6uUbQ$uint32,
        glyphIndices: new $6uUbQ$LazyArray($6uUbQ$uint16, 'numChars')
    },
    12: {
        reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
        length: $6uUbQ$uint32,
        language: $6uUbQ$uint32,
        nGroups: $6uUbQ$uint32,
        groups: new $6uUbQ$LazyArray($26a62205ad06574e$var$CmapGroup, 'nGroups')
    },
    13: {
        reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
        length: $6uUbQ$uint32,
        language: $6uUbQ$uint32,
        nGroups: $6uUbQ$uint32,
        groups: new $6uUbQ$LazyArray($26a62205ad06574e$var$CmapGroup, 'nGroups')
    },
    14: {
        length: $6uUbQ$uint32,
        numRecords: $6uUbQ$uint32,
        varSelectors: new $6uUbQ$LazyArray($26a62205ad06574e$var$VarSelectorRecord, 'numRecords')
    }
});
let $26a62205ad06574e$var$CmapEntry = new $6uUbQ$Struct({
    platformID: $6uUbQ$uint16,
    encodingID: $6uUbQ$uint16,
    table: new $6uUbQ$Pointer($6uUbQ$uint32, $26a62205ad06574e$var$CmapSubtable, {
        type: 'parent',
        lazy: true
    })
});
var // character to glyph mapping
$26a62205ad06574e$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    numSubtables: $6uUbQ$uint16,
    tables: new $6uUbQ$Array($26a62205ad06574e$var$CmapEntry, 'numSubtables')
});



var // font header
$f2612a29f92ac062$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$int32,
    revision: $6uUbQ$int32,
    checkSumAdjustment: $6uUbQ$uint32,
    magicNumber: $6uUbQ$uint32,
    flags: $6uUbQ$uint16,
    unitsPerEm: $6uUbQ$uint16,
    created: new $6uUbQ$Array($6uUbQ$int32, 2),
    modified: new $6uUbQ$Array($6uUbQ$int32, 2),
    xMin: $6uUbQ$int16,
    yMin: $6uUbQ$int16,
    xMax: $6uUbQ$int16,
    yMax: $6uUbQ$int16,
    macStyle: new $6uUbQ$Bitfield($6uUbQ$uint16, [
        'bold',
        'italic',
        'underline',
        'outline',
        'shadow',
        'condensed',
        'extended'
    ]),
    lowestRecPPEM: $6uUbQ$uint16,
    fontDirectionHint: $6uUbQ$int16,
    indexToLocFormat: $6uUbQ$int16,
    glyphDataFormat: $6uUbQ$int16 // 0 for current format
});



var // horizontal header
$2c179dd593583073$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$int32,
    ascent: $6uUbQ$int16,
    descent: $6uUbQ$int16,
    lineGap: $6uUbQ$int16,
    advanceWidthMax: $6uUbQ$uint16,
    minLeftSideBearing: $6uUbQ$int16,
    minRightSideBearing: $6uUbQ$int16,
    xMaxExtent: $6uUbQ$int16,
    caretSlopeRise: $6uUbQ$int16,
    caretSlopeRun: $6uUbQ$int16,
    caretOffset: $6uUbQ$int16,
    reserved: new $6uUbQ$Reserved($6uUbQ$int16, 4),
    metricDataFormat: $6uUbQ$int16,
    numberOfMetrics: $6uUbQ$uint16 // Number of advance widths in 'hmtx' table
});



let $bdc9060542264b85$var$HmtxEntry = new $6uUbQ$Struct({
    advance: $6uUbQ$uint16,
    bearing: $6uUbQ$int16
});
var $bdc9060542264b85$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    metrics: new $6uUbQ$LazyArray($bdc9060542264b85$var$HmtxEntry, (t)=>t.parent.hhea.numberOfMetrics),
    bearings: new $6uUbQ$LazyArray($6uUbQ$int16, (t)=>t.parent.maxp.numGlyphs - t.parent.hhea.numberOfMetrics)
});



var // maxiumum profile
$dbf51cb3d3fe409d$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$int32,
    numGlyphs: $6uUbQ$uint16,
    maxPoints: $6uUbQ$uint16,
    maxContours: $6uUbQ$uint16,
    maxComponentPoints: $6uUbQ$uint16,
    maxComponentContours: $6uUbQ$uint16,
    maxZones: $6uUbQ$uint16,
    maxTwilightPoints: $6uUbQ$uint16,
    maxStorage: $6uUbQ$uint16,
    maxFunctionDefs: $6uUbQ$uint16,
    maxInstructionDefs: $6uUbQ$uint16,
    maxStackElements: $6uUbQ$uint16,
    maxSizeOfInstructions: $6uUbQ$uint16,
    maxComponentElements: $6uUbQ$uint16,
    maxComponentDepth: $6uUbQ$uint16 // Maximum levels of recursion; 1 for simple components
});



/**
 * Gets an encoding name from platform, encoding, and language ids.
 * Returned encoding names can be used in iconv-lite to decode text.
 */ function $e449ad78d50845fe$export$badc544e0651b6b1(platformID, encodingID, languageID = 0) {
    if (platformID === 1 && $e449ad78d50845fe$export$479e671907f486d1[languageID]) return $e449ad78d50845fe$export$479e671907f486d1[languageID];
    return $e449ad78d50845fe$export$6fef87b7618bdf0b[platformID][encodingID];
}
const $e449ad78d50845fe$var$SINGLE_BYTE_ENCODINGS = new Set([
    'x-mac-roman',
    'x-mac-cyrillic',
    'iso-8859-6',
    'iso-8859-8'
]);
const $e449ad78d50845fe$var$MAC_ENCODINGS = {
    'x-mac-croatian': "\xc4\xc5\xc7\xc9\xd1\xd6\xdc\xe1\xe0\xe2\xe4\xe3\xe5\xe7\xe9\xe8\xea\xeb\xed\xec\xee\xef\xf1\xf3\xf2\xf4\xf6\xf5\xfa\xf9\xfb\xfc\u2020\xb0\xa2\xa3\xa7\u2022\xb6\xdf\xae\u0160\u2122\xb4\xa8\u2260\u017D\xd8\u221E\xb1\u2264\u2265\u2206\xb5\u2202\u2211\u220F\u0161\u222B\xaa\xba\u03A9\u017E\xf8\xbf\xa1\xac\u221A\u0192\u2248\u0106\xab\u010C\u2026 \xc0\xc3\xd5\u0152\u0153\u0110\u2014\u201C\u201D\u2018\u2019\xf7\u25CA\uF8FF\xa9\u2044\u20AC\u2039\u203A\xc6\xbb\u2013\xb7\u201A\u201E\u2030\xc2\u0107\xc1\u010D\xc8\xcd\xce\xcf\xcc\xd3\xd4\u0111\xd2\xda\xdb\xd9\u0131\u02C6\u02DC\xaf\u03C0\xcb\u02DA\xb8\xca\xe6\u02C7",
    'x-mac-gaelic': "\xc4\xc5\xc7\xc9\xd1\xd6\xdc\xe1\xe0\xe2\xe4\xe3\xe5\xe7\xe9\xe8\xea\xeb\xed\xec\xee\xef\xf1\xf3\xf2\xf4\xf6\xf5\xfa\xf9\xfb\xfc\u2020\xb0\xa2\xa3\xa7\u2022\xb6\xdf\xae\xa9\u2122\xb4\xa8\u2260\xc6\xd8\u1E02\xb1\u2264\u2265\u1E03\u010A\u010B\u1E0A\u1E0B\u1E1E\u1E1F\u0120\u0121\u1E40\xe6\xf8\u1E41\u1E56\u1E57\u027C\u0192\u017F\u1E60\xab\xbb\u2026 \xc0\xc3\xd5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\u1E61\u1E9B\xff\u0178\u1E6A\u20AC\u2039\u203A\u0176\u0177\u1E6B\xb7\u1EF2\u1EF3\u204A\xc2\xca\xc1\xcb\xc8\xcd\xce\xcf\xcc\xd3\xd4\u2663\xd2\xda\xdb\xd9\u0131\xdd\xfd\u0174\u0175\u1E84\u1E85\u1E80\u1E81\u1E82\u1E83",
    'x-mac-greek': "\xc4\xb9\xb2\xc9\xb3\xd6\xdc\u0385\xe0\xe2\xe4\u0384\xa8\xe7\xe9\xe8\xea\xeb\xa3\u2122\xee\xef\u2022\xbd\u2030\xf4\xf6\xa6\u20AC\xf9\xfb\xfc\u2020\u0393\u0394\u0398\u039B\u039E\u03A0\xdf\xae\xa9\u03A3\u03AA\xa7\u2260\xb0\xb7\u0391\xb1\u2264\u2265\xa5\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u03A6\u03AB\u03A8\u03A9\u03AC\u039D\xac\u039F\u03A1\u2248\u03A4\xab\xbb\u2026 \u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xf7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xad",
    'x-mac-icelandic': "\xc4\xc5\xc7\xc9\xd1\xd6\xdc\xe1\xe0\xe2\xe4\xe3\xe5\xe7\xe9\xe8\xea\xeb\xed\xec\xee\xef\xf1\xf3\xf2\xf4\xf6\xf5\xfa\xf9\xfb\xfc\xdd\xb0\xa2\xa3\xa7\u2022\xb6\xdf\xae\xa9\u2122\xb4\xa8\u2260\xc6\xd8\u221E\xb1\u2264\u2265\xa5\xb5\u2202\u2211\u220F\u03C0\u222B\xaa\xba\u03A9\xe6\xf8\xbf\xa1\xac\u221A\u0192\u2248\u2206\xab\xbb\u2026 \xc0\xc3\xd5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xf7\u25CA\xff\u0178\u2044\u20AC\xd0\xf0\xde\xfe\xfd\xb7\u201A\u201E\u2030\xc2\xca\xc1\xcb\xc8\xcd\xce\xcf\xcc\xd3\xd4\uF8FF\xd2\xda\xdb\xd9\u0131\u02C6\u02DC\xaf\u02D8\u02D9\u02DA\xb8\u02DD\u02DB\u02C7",
    'x-mac-inuit': "\u1403\u1404\u1405\u1406\u140A\u140B\u1431\u1432\u1433\u1434\u1438\u1439\u1449\u144E\u144F\u1450\u1451\u1455\u1456\u1466\u146D\u146E\u146F\u1470\u1472\u1473\u1483\u148B\u148C\u148D\u148E\u1490\u1491\xb0\u14A1\u14A5\u14A6\u2022\xb6\u14A7\xae\xa9\u2122\u14A8\u14AA\u14AB\u14BB\u14C2\u14C3\u14C4\u14C5\u14C7\u14C8\u14D0\u14EF\u14F0\u14F1\u14F2\u14F4\u14F5\u1505\u14D5\u14D6\u14D7\u14D8\u14DA\u14DB\u14EA\u1528\u1529\u152A\u152B\u152D\u2026 \u152E\u153E\u1555\u1556\u1557\u2013\u2014\u201C\u201D\u2018\u2019\u1558\u1559\u155A\u155D\u1546\u1547\u1548\u1549\u154B\u154C\u1550\u157F\u1580\u1581\u1582\u1583\u1584\u1585\u158F\u1590\u1591\u1592\u1593\u1594\u1595\u1671\u1672\u1673\u1674\u1675\u1676\u1596\u15A0\u15A1\u15A2\u15A3\u15A4\u15A5\u15A6\u157C\u0141\u0142",
    'x-mac-ce': "\xc4\u0100\u0101\xc9\u0104\xd6\xdc\xe1\u0105\u010C\xe4\u010D\u0106\u0107\xe9\u0179\u017A\u010E\xed\u010F\u0112\u0113\u0116\xf3\u0117\xf4\xf6\xf5\xfa\u011A\u011B\xfc\u2020\xb0\u0118\xa3\xa7\u2022\xb6\xdf\xae\xa9\u2122\u0119\xa8\u2260\u0123\u012E\u012F\u012A\u2264\u2265\u012B\u0136\u2202\u2211\u0142\u013B\u013C\u013D\u013E\u0139\u013A\u0145\u0146\u0143\xac\u221A\u0144\u0147\u2206\xab\xbb\u2026 \u0148\u0150\xd5\u0151\u014C\u2013\u2014\u201C\u201D\u2018\u2019\xf7\u25CA\u014D\u0154\u0155\u0158\u2039\u203A\u0159\u0156\u0157\u0160\u201A\u201E\u0161\u015A\u015B\xc1\u0164\u0165\xcd\u017D\u017E\u016A\xd3\xd4\u016B\u016E\xda\u016F\u0170\u0171\u0172\u0173\xdd\xfd\u0137\u017B\u0141\u017C\u0122\u02C7",
    'x-mac-romanian': "\xc4\xc5\xc7\xc9\xd1\xd6\xdc\xe1\xe0\xe2\xe4\xe3\xe5\xe7\xe9\xe8\xea\xeb\xed\xec\xee\xef\xf1\xf3\xf2\xf4\xf6\xf5\xfa\xf9\xfb\xfc\u2020\xb0\xa2\xa3\xa7\u2022\xb6\xdf\xae\xa9\u2122\xb4\xa8\u2260\u0102\u0218\u221E\xb1\u2264\u2265\xa5\xb5\u2202\u2211\u220F\u03C0\u222B\xaa\xba\u03A9\u0103\u0219\xbf\xa1\xac\u221A\u0192\u2248\u2206\xab\xbb\u2026 \xc0\xc3\xd5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xf7\u25CA\xff\u0178\u2044\u20AC\u2039\u203A\u021A\u021B\u2021\xb7\u201A\u201E\u2030\xc2\xca\xc1\xcb\xc8\xcd\xce\xcf\xcc\xd3\xd4\uF8FF\xd2\xda\xdb\xd9\u0131\u02C6\u02DC\xaf\u02D8\u02D9\u02DA\xb8\u02DD\u02DB\u02C7",
    'x-mac-turkish': "\xc4\xc5\xc7\xc9\xd1\xd6\xdc\xe1\xe0\xe2\xe4\xe3\xe5\xe7\xe9\xe8\xea\xeb\xed\xec\xee\xef\xf1\xf3\xf2\xf4\xf6\xf5\xfa\xf9\xfb\xfc\u2020\xb0\xa2\xa3\xa7\u2022\xb6\xdf\xae\xa9\u2122\xb4\xa8\u2260\xc6\xd8\u221E\xb1\u2264\u2265\xa5\xb5\u2202\u2211\u220F\u03C0\u222B\xaa\xba\u03A9\xe6\xf8\xbf\xa1\xac\u221A\u0192\u2248\u2206\xab\xbb\u2026 \xc0\xc3\xd5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xf7\u25CA\xff\u0178\u011E\u011F\u0130\u0131\u015E\u015F\u2021\xb7\u201A\u201E\u2030\xc2\xca\xc1\xcb\xc8\xcd\xce\xcf\xcc\xd3\xd4\uF8FF\xd2\xda\xdb\xd9\uF8A0\u02C6\u02DC\xaf\u02D8\u02D9\u02DA\xb8\u02DD\u02DB\u02C7"
};
const $e449ad78d50845fe$var$encodingCache = new Map();
function $e449ad78d50845fe$export$1dceb3c14ed68bee(encoding) {
    let cached = $e449ad78d50845fe$var$encodingCache.get(encoding);
    if (cached) return cached;
    // These encodings aren't supported by TextDecoder.
    let mapping = $e449ad78d50845fe$var$MAC_ENCODINGS[encoding];
    if (mapping) {
        let res = new Map();
        for(let i = 0; i < mapping.length; i++)res.set(mapping.charCodeAt(i), 0x80 + i);
        $e449ad78d50845fe$var$encodingCache.set(encoding, res);
        return res;
    }
    // Only single byte encodings can be mapped 1:1.
    if ($e449ad78d50845fe$var$SINGLE_BYTE_ENCODINGS.has(encoding)) {
        // TextEncoder only supports utf8, whereas TextDecoder supports legacy encodings.
        // Use this to create a mapping of code points.
        let decoder = new TextDecoder(encoding);
        let mapping = new Uint8Array(0x80);
        for(let i = 0; i < 0x80; i++)mapping[i] = 0x80 + i;
        let res = new Map();
        let s = decoder.decode(mapping);
        for(let i = 0; i < 0x80; i++)res.set(s.charCodeAt(i), 0x80 + i);
        $e449ad78d50845fe$var$encodingCache.set(encoding, res);
        return res;
    }
}
const $e449ad78d50845fe$export$6fef87b7618bdf0b = [
    // unicode
    [
        'utf-16be',
        'utf-16be',
        'utf-16be',
        'utf-16be',
        'utf-16be',
        'utf-16be',
        'utf-16be'
    ],
    // macintosh
    // Mappings available at http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/
    // 0	Roman                 17	Malayalam
    // 1	Japanese	            18	Sinhalese
    // 2	Traditional Chinese	  19	Burmese
    // 3	Korean	              20	Khmer
    // 4	Arabic	              21	Thai
    // 5	Hebrew	              22	Laotian
    // 6	Greek	                23	Georgian
    // 7	Russian	              24	Armenian
    // 8	RSymbol	              25	Simplified Chinese
    // 9	Devanagari	          26	Tibetan
    // 10	Gurmukhi	            27	Mongolian
    // 11	Gujarati	            28	Geez
    // 12	Oriya	                29	Slavic
    // 13	Bengali	              30	Vietnamese
    // 14	Tamil	                31	Sindhi
    // 15	Telugu	              32	(Uninterpreted)
    // 16	Kannada
    [
        'x-mac-roman',
        'shift-jis',
        'big5',
        'euc-kr',
        'iso-8859-6',
        'iso-8859-8',
        'x-mac-greek',
        'x-mac-cyrillic',
        'x-mac-symbol',
        'x-mac-devanagari',
        'x-mac-gurmukhi',
        'x-mac-gujarati',
        'Oriya',
        'Bengali',
        'Tamil',
        'Telugu',
        'Kannada',
        'Malayalam',
        'Sinhalese',
        'Burmese',
        'Khmer',
        'iso-8859-11',
        'Laotian',
        'Georgian',
        'Armenian',
        'gbk',
        'Tibetan',
        'Mongolian',
        'Geez',
        'x-mac-ce',
        'Vietnamese',
        'Sindhi'
    ],
    // ISO (deprecated)
    [
        'ascii',
        null,
        'iso-8859-1'
    ],
    // windows
    // Docs here: http://msdn.microsoft.com/en-us/library/system.text.encoding(v=vs.110).aspx
    [
        'symbol',
        'utf-16be',
        'shift-jis',
        'gb18030',
        'big5',
        'euc-kr',
        'johab',
        null,
        null,
        null,
        'utf-16be'
    ]
];
const $e449ad78d50845fe$export$479e671907f486d1 = {
    15: 'x-mac-icelandic',
    17: 'x-mac-turkish',
    18: 'x-mac-croatian',
    24: 'x-mac-ce',
    25: 'x-mac-ce',
    26: 'x-mac-ce',
    27: 'x-mac-ce',
    28: 'x-mac-ce',
    30: 'x-mac-icelandic',
    37: 'x-mac-romanian',
    38: 'x-mac-ce',
    39: 'x-mac-ce',
    40: 'x-mac-ce',
    143: 'x-mac-inuit',
    146: 'x-mac-gaelic'
};
const $e449ad78d50845fe$export$2092376fd002e13 = [
    // unicode
    [],
    {
        0: 'en',
        30: 'fo',
        60: 'ks',
        90: 'rw',
        1: 'fr',
        31: 'fa',
        61: 'ku',
        91: 'rn',
        2: 'de',
        32: 'ru',
        62: 'sd',
        92: 'ny',
        3: 'it',
        33: 'zh',
        63: 'bo',
        93: 'mg',
        4: 'nl',
        34: 'nl-BE',
        64: 'ne',
        94: 'eo',
        5: 'sv',
        35: 'ga',
        65: 'sa',
        128: 'cy',
        6: 'es',
        36: 'sq',
        66: 'mr',
        129: 'eu',
        7: 'da',
        37: 'ro',
        67: 'bn',
        130: 'ca',
        8: 'pt',
        38: 'cz',
        68: 'as',
        131: 'la',
        9: 'no',
        39: 'sk',
        69: 'gu',
        132: 'qu',
        10: 'he',
        40: 'si',
        70: 'pa',
        133: 'gn',
        11: 'ja',
        41: 'yi',
        71: 'or',
        134: 'ay',
        12: 'ar',
        42: 'sr',
        72: 'ml',
        135: 'tt',
        13: 'fi',
        43: 'mk',
        73: 'kn',
        136: 'ug',
        14: 'el',
        44: 'bg',
        74: 'ta',
        137: 'dz',
        15: 'is',
        45: 'uk',
        75: 'te',
        138: 'jv',
        16: 'mt',
        46: 'be',
        76: 'si',
        139: 'su',
        17: 'tr',
        47: 'uz',
        77: 'my',
        140: 'gl',
        18: 'hr',
        48: 'kk',
        78: 'km',
        141: 'af',
        19: 'zh-Hant',
        49: 'az-Cyrl',
        79: 'lo',
        142: 'br',
        20: 'ur',
        50: 'az-Arab',
        80: 'vi',
        143: 'iu',
        21: 'hi',
        51: 'hy',
        81: 'id',
        144: 'gd',
        22: 'th',
        52: 'ka',
        82: 'tl',
        145: 'gv',
        23: 'ko',
        53: 'mo',
        83: 'ms',
        146: 'ga',
        24: 'lt',
        54: 'ky',
        84: 'ms-Arab',
        147: 'to',
        25: 'pl',
        55: 'tg',
        85: 'am',
        148: 'el-polyton',
        26: 'hu',
        56: 'tk',
        86: 'ti',
        149: 'kl',
        27: 'es',
        57: 'mn-CN',
        87: 'om',
        150: 'az',
        28: 'lv',
        58: 'mn',
        88: 'so',
        151: 'nn',
        29: 'se',
        59: 'ps',
        89: 'sw'
    },
    // ISO (deprecated)
    [],
    {
        0x0436: 'af',
        0x4009: 'en-IN',
        0x0487: 'rw',
        0x0432: 'tn',
        0x041C: 'sq',
        0x1809: 'en-IE',
        0x0441: 'sw',
        0x045B: 'si',
        0x0484: 'gsw',
        0x2009: 'en-JM',
        0x0457: 'kok',
        0x041B: 'sk',
        0x045E: 'am',
        0x4409: 'en-MY',
        0x0412: 'ko',
        0x0424: 'sl',
        0x1401: 'ar-DZ',
        0x1409: 'en-NZ',
        0x0440: 'ky',
        0x2C0A: 'es-AR',
        0x3C01: 'ar-BH',
        0x3409: 'en-PH',
        0x0454: 'lo',
        0x400A: 'es-BO',
        0x0C01: 'ar',
        0x4809: 'en-SG',
        0x0426: 'lv',
        0x340A: 'es-CL',
        0x0801: 'ar-IQ',
        0x1C09: 'en-ZA',
        0x0427: 'lt',
        0x240A: 'es-CO',
        0x2C01: 'ar-JO',
        0x2C09: 'en-TT',
        0x082E: 'dsb',
        0x140A: 'es-CR',
        0x3401: 'ar-KW',
        0x0809: 'en-GB',
        0x046E: 'lb',
        0x1C0A: 'es-DO',
        0x3001: 'ar-LB',
        0x0409: 'en',
        0x042F: 'mk',
        0x300A: 'es-EC',
        0x1001: 'ar-LY',
        0x3009: 'en-ZW',
        0x083E: 'ms-BN',
        0x440A: 'es-SV',
        0x1801: 'ary',
        0x0425: 'et',
        0x043E: 'ms',
        0x100A: 'es-GT',
        0x2001: 'ar-OM',
        0x0438: 'fo',
        0x044C: 'ml',
        0x480A: 'es-HN',
        0x4001: 'ar-QA',
        0x0464: 'fil',
        0x043A: 'mt',
        0x080A: 'es-MX',
        0x0401: 'ar-SA',
        0x040B: 'fi',
        0x0481: 'mi',
        0x4C0A: 'es-NI',
        0x2801: 'ar-SY',
        0x080C: 'fr-BE',
        0x047A: 'arn',
        0x180A: 'es-PA',
        0x1C01: 'aeb',
        0x0C0C: 'fr-CA',
        0x044E: 'mr',
        0x3C0A: 'es-PY',
        0x3801: 'ar-AE',
        0x040C: 'fr',
        0x047C: 'moh',
        0x280A: 'es-PE',
        0x2401: 'ar-YE',
        0x140C: 'fr-LU',
        0x0450: 'mn',
        0x500A: 'es-PR',
        0x042B: 'hy',
        0x180C: 'fr-MC',
        0x0850: 'mn-CN',
        0x0C0A: 'es',
        0x044D: 'as',
        0x100C: 'fr-CH',
        0x0461: 'ne',
        0x040A: 'es',
        0x082C: 'az-Cyrl',
        0x0462: 'fy',
        0x0414: 'nb',
        0x540A: 'es-US',
        0x042C: 'az',
        0x0456: 'gl',
        0x0814: 'nn',
        0x380A: 'es-UY',
        0x046D: 'ba',
        0x0437: 'ka',
        0x0482: 'oc',
        0x200A: 'es-VE',
        0x042D: 'eu',
        0x0C07: 'de-AT',
        0x0448: 'or',
        0x081D: 'sv-FI',
        0x0423: 'be',
        0x0407: 'de',
        0x0463: 'ps',
        0x041D: 'sv',
        0x0845: 'bn',
        0x1407: 'de-LI',
        0x0415: 'pl',
        0x045A: 'syr',
        0x0445: 'bn-IN',
        0x1007: 'de-LU',
        0x0416: 'pt',
        0x0428: 'tg',
        0x201A: 'bs-Cyrl',
        0x0807: 'de-CH',
        0x0816: 'pt-PT',
        0x085F: 'tzm',
        0x141A: 'bs',
        0x0408: 'el',
        0x0446: 'pa',
        0x0449: 'ta',
        0x047E: 'br',
        0x046F: 'kl',
        0x046B: 'qu-BO',
        0x0444: 'tt',
        0x0402: 'bg',
        0x0447: 'gu',
        0x086B: 'qu-EC',
        0x044A: 'te',
        0x0403: 'ca',
        0x0468: 'ha',
        0x0C6B: 'qu',
        0x041E: 'th',
        0x0C04: 'zh-HK',
        0x040D: 'he',
        0x0418: 'ro',
        0x0451: 'bo',
        0x1404: 'zh-MO',
        0x0439: 'hi',
        0x0417: 'rm',
        0x041F: 'tr',
        0x0804: 'zh',
        0x040E: 'hu',
        0x0419: 'ru',
        0x0442: 'tk',
        0x1004: 'zh-SG',
        0x040F: 'is',
        0x243B: 'smn',
        0x0480: 'ug',
        0x0404: 'zh-TW',
        0x0470: 'ig',
        0x103B: 'smj-NO',
        0x0422: 'uk',
        0x0483: 'co',
        0x0421: 'id',
        0x143B: 'smj',
        0x042E: 'hsb',
        0x041A: 'hr',
        0x045D: 'iu',
        0x0C3B: 'se-FI',
        0x0420: 'ur',
        0x101A: 'hr-BA',
        0x085D: 'iu-Latn',
        0x043B: 'se',
        0x0843: 'uz-Cyrl',
        0x0405: 'cs',
        0x083C: 'ga',
        0x083B: 'se-SE',
        0x0443: 'uz',
        0x0406: 'da',
        0x0434: 'xh',
        0x203B: 'sms',
        0x042A: 'vi',
        0x048C: 'prs',
        0x0435: 'zu',
        0x183B: 'sma-NO',
        0x0452: 'cy',
        0x0465: 'dv',
        0x0410: 'it',
        0x1C3B: 'sms',
        0x0488: 'wo',
        0x0813: 'nl-BE',
        0x0810: 'it-CH',
        0x044F: 'sa',
        0x0485: 'sah',
        0x0413: 'nl',
        0x0411: 'ja',
        0x1C1A: 'sr-Cyrl-BA',
        0x0478: 'ii',
        0x0C09: 'en-AU',
        0x044B: 'kn',
        0x0C1A: 'sr',
        0x046A: 'yo',
        0x2809: 'en-BZ',
        0x043F: 'kk',
        0x181A: 'sr-Latn-BA',
        0x1009: 'en-CA',
        0x0453: 'km',
        0x081A: 'sr-Latn',
        0x2409: 'en-029',
        0x0486: 'quc',
        0x046C: 'nso'
    }
];


let $2bcf221753ec8e32$var$NameRecord = new $6uUbQ$Struct({
    platformID: $6uUbQ$uint16,
    encodingID: $6uUbQ$uint16,
    languageID: $6uUbQ$uint16,
    nameID: $6uUbQ$uint16,
    length: $6uUbQ$uint16,
    string: new $6uUbQ$Pointer($6uUbQ$uint16, new $6uUbQ$String('length', (t)=>(0, $e449ad78d50845fe$export$badc544e0651b6b1)(t.platformID, t.encodingID, t.languageID)), {
        type: 'parent',
        relativeTo: (ctx)=>ctx.parent.stringOffset,
        allowNull: false
    })
});
let $2bcf221753ec8e32$var$LangTagRecord = new $6uUbQ$Struct({
    length: $6uUbQ$uint16,
    tag: new $6uUbQ$Pointer($6uUbQ$uint16, new $6uUbQ$String('length', 'utf16be'), {
        type: 'parent',
        relativeTo: (ctx)=>ctx.stringOffset
    })
});
var $2bcf221753ec8e32$var$NameTable = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    0: {
        count: $6uUbQ$uint16,
        stringOffset: $6uUbQ$uint16,
        records: new $6uUbQ$Array($2bcf221753ec8e32$var$NameRecord, 'count')
    },
    1: {
        count: $6uUbQ$uint16,
        stringOffset: $6uUbQ$uint16,
        records: new $6uUbQ$Array($2bcf221753ec8e32$var$NameRecord, 'count'),
        langTagCount: $6uUbQ$uint16,
        langTags: new $6uUbQ$Array($2bcf221753ec8e32$var$LangTagRecord, 'langTagCount')
    }
});
var $2bcf221753ec8e32$export$2e2bcd8739ae039 = $2bcf221753ec8e32$var$NameTable;
const $2bcf221753ec8e32$var$NAMES = [
    'copyright',
    'fontFamily',
    'fontSubfamily',
    'uniqueSubfamily',
    'fullName',
    'version',
    'postscriptName',
    'trademark',
    'manufacturer',
    'designer',
    'description',
    'vendorURL',
    'designerURL',
    'license',
    'licenseURL',
    null,
    'preferredFamily',
    'preferredSubfamily',
    'compatibleFull',
    'sampleText',
    'postscriptCIDFontName',
    'wwsFamilyName',
    'wwsSubfamilyName'
];
$2bcf221753ec8e32$var$NameTable.process = function(stream) {
    var records = {};
    for (let record of this.records){
        // find out what language this is for
        let language = (0, $e449ad78d50845fe$export$2092376fd002e13)[record.platformID][record.languageID];
        if (language == null && this.langTags != null && record.languageID >= 0x8000) language = this.langTags[record.languageID - 0x8000].tag;
        if (language == null) language = record.platformID + '-' + record.languageID;
        // if the nameID is >= 256, it is a font feature record (AAT)
        let key = record.nameID >= 256 ? 'fontFeatures' : $2bcf221753ec8e32$var$NAMES[record.nameID] || record.nameID;
        if (records[key] == null) records[key] = {};
        let obj = records[key];
        if (record.nameID >= 256) obj = obj[record.nameID] || (obj[record.nameID] = {});
        if (typeof record.string === 'string' || typeof obj[language] !== 'string') obj[language] = record.string;
    }
    this.records = records;
};
$2bcf221753ec8e32$var$NameTable.preEncode = function() {
    if (Array.isArray(this.records)) return;
    this.version = 0;
    let records = [];
    for(let key in this.records){
        let val = this.records[key];
        if (key === 'fontFeatures') continue;
        records.push({
            platformID: 3,
            encodingID: 1,
            languageID: 0x409,
            nameID: $2bcf221753ec8e32$var$NAMES.indexOf(key),
            length: val.en.length * 2,
            string: val.en
        });
        if (key === 'postscriptName') records.push({
            platformID: 1,
            encodingID: 0,
            languageID: 0,
            nameID: $2bcf221753ec8e32$var$NAMES.indexOf(key),
            length: val.en.length,
            string: val.en
        });
    }
    this.records = records;
    this.count = records.length;
    this.stringOffset = $2bcf221753ec8e32$var$NameTable.size(this, null, false);
};



var $84b272aa31b70606$var$OS2 = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    header: {
        xAvgCharWidth: $6uUbQ$int16,
        usWeightClass: $6uUbQ$uint16,
        usWidthClass: $6uUbQ$uint16,
        fsType: new $6uUbQ$Bitfield($6uUbQ$uint16, [
            null,
            'noEmbedding',
            'viewOnly',
            'editable',
            null,
            null,
            null,
            null,
            'noSubsetting',
            'bitmapOnly'
        ]),
        ySubscriptXSize: $6uUbQ$int16,
        ySubscriptYSize: $6uUbQ$int16,
        ySubscriptXOffset: $6uUbQ$int16,
        ySubscriptYOffset: $6uUbQ$int16,
        ySuperscriptXSize: $6uUbQ$int16,
        ySuperscriptYSize: $6uUbQ$int16,
        ySuperscriptXOffset: $6uUbQ$int16,
        ySuperscriptYOffset: $6uUbQ$int16,
        yStrikeoutSize: $6uUbQ$int16,
        yStrikeoutPosition: $6uUbQ$int16,
        sFamilyClass: $6uUbQ$int16,
        panose: new $6uUbQ$Array($6uUbQ$uint8, 10),
        ulCharRange: new $6uUbQ$Array($6uUbQ$uint32, 4),
        vendorID: new $6uUbQ$String(4),
        fsSelection: new $6uUbQ$Bitfield($6uUbQ$uint16, [
            'italic',
            'underscore',
            'negative',
            'outlined',
            'strikeout',
            'bold',
            'regular',
            'useTypoMetrics',
            'wws',
            'oblique'
        ]),
        usFirstCharIndex: $6uUbQ$uint16,
        usLastCharIndex: $6uUbQ$uint16 // The maximum Unicode index in this font
    },
    // The Apple version of this table ends here, but the Microsoft one continues on...
    0: {},
    1: {
        typoAscender: $6uUbQ$int16,
        typoDescender: $6uUbQ$int16,
        typoLineGap: $6uUbQ$int16,
        winAscent: $6uUbQ$uint16,
        winDescent: $6uUbQ$uint16,
        codePageRange: new $6uUbQ$Array($6uUbQ$uint32, 2)
    },
    2: {
        // these should be common with version 1 somehow
        typoAscender: $6uUbQ$int16,
        typoDescender: $6uUbQ$int16,
        typoLineGap: $6uUbQ$int16,
        winAscent: $6uUbQ$uint16,
        winDescent: $6uUbQ$uint16,
        codePageRange: new $6uUbQ$Array($6uUbQ$uint32, 2),
        xHeight: $6uUbQ$int16,
        capHeight: $6uUbQ$int16,
        defaultChar: $6uUbQ$uint16,
        breakChar: $6uUbQ$uint16,
        maxContent: $6uUbQ$uint16
    },
    5: {
        typoAscender: $6uUbQ$int16,
        typoDescender: $6uUbQ$int16,
        typoLineGap: $6uUbQ$int16,
        winAscent: $6uUbQ$uint16,
        winDescent: $6uUbQ$uint16,
        codePageRange: new $6uUbQ$Array($6uUbQ$uint32, 2),
        xHeight: $6uUbQ$int16,
        capHeight: $6uUbQ$int16,
        defaultChar: $6uUbQ$uint16,
        breakChar: $6uUbQ$uint16,
        maxContent: $6uUbQ$uint16,
        usLowerOpticalPointSize: $6uUbQ$uint16,
        usUpperOpticalPointSize: $6uUbQ$uint16
    }
});
let $84b272aa31b70606$var$versions = $84b272aa31b70606$var$OS2.versions;
$84b272aa31b70606$var$versions[3] = $84b272aa31b70606$var$versions[4] = $84b272aa31b70606$var$versions[2];
var $84b272aa31b70606$export$2e2bcd8739ae039 = $84b272aa31b70606$var$OS2;



var // PostScript information
$32d9e2eb9565d93c$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$fixed32, {
    header: {
        italicAngle: $6uUbQ$fixed32,
        underlinePosition: $6uUbQ$int16,
        underlineThickness: $6uUbQ$int16,
        isFixedPitch: $6uUbQ$uint32,
        minMemType42: $6uUbQ$uint32,
        maxMemType42: $6uUbQ$uint32,
        minMemType1: $6uUbQ$uint32,
        maxMemType1: $6uUbQ$uint32 // Maximum memory usage when a TrueType font is downloaded as a Type 1 font
    },
    1: {},
    2: {
        numberOfGlyphs: $6uUbQ$uint16,
        glyphNameIndex: new $6uUbQ$Array($6uUbQ$uint16, 'numberOfGlyphs'),
        names: new $6uUbQ$Array(new $6uUbQ$String($6uUbQ$uint8))
    },
    2.5: {
        numberOfGlyphs: $6uUbQ$uint16,
        offsets: new $6uUbQ$Array($6uUbQ$uint8, 'numberOfGlyphs')
    },
    3: {},
    4: {
        map: new $6uUbQ$Array($6uUbQ$uint32, (t)=>t.parent.maxp.numGlyphs)
    }
});



var // An array of predefined values accessible by instructions
$5202bd9d9ad8eaac$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    controlValues: new $6uUbQ$Array($6uUbQ$int16)
});



var // A list of instructions that are executed once when a font is first used.
// These instructions are known as the font program. The main use of this table
// is for the definition of functions that are used in many different glyph programs.
$5c0f37ca5ffb1850$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    instructions: new $6uUbQ$Array($6uUbQ$uint8)
});



let $2b2b260902b1c57e$var$loca = new $6uUbQ$VersionedStruct('head.indexToLocFormat', {
    0: {
        offsets: new $6uUbQ$Array($6uUbQ$uint16)
    },
    1: {
        offsets: new $6uUbQ$Array($6uUbQ$uint32)
    }
});
$2b2b260902b1c57e$var$loca.process = function() {
    if (this.version === 0 && !this._processed) {
        for(let i = 0; i < this.offsets.length; i++)this.offsets[i] <<= 1;
        this._processed = true;
    }
};
$2b2b260902b1c57e$var$loca.preEncode = function() {
    if (this.version === 0 && this._processed !== false) {
        for(let i = 0; i < this.offsets.length; i++)this.offsets[i] >>>= 1;
        this._processed = false;
    }
};
var $2b2b260902b1c57e$export$2e2bcd8739ae039 = $2b2b260902b1c57e$var$loca;



var // Set of instructions executed whenever the point size or font transformation change
$7afb878c7bea4f66$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    controlValueProgram: new $6uUbQ$Array($6uUbQ$uint8)
});



var // only used for encoding
$6c92b6371bce8bd9$export$2e2bcd8739ae039 = new $6uUbQ$Array(new $6uUbQ$Buffer);




class $43e9821ef3717eec$export$2e2bcd8739ae039 {
    getCFFVersion(ctx) {
        while(ctx && !ctx.hdrSize)ctx = ctx.parent;
        return ctx ? ctx.version : -1;
    }
    decode(stream, parent) {
        let version = this.getCFFVersion(parent);
        let count = version >= 2 ? stream.readUInt32BE() : stream.readUInt16BE();
        if (count === 0) return [];
        let offSize = stream.readUInt8();
        let offsetType;
        if (offSize === 1) offsetType = $6uUbQ$uint8;
        else if (offSize === 2) offsetType = $6uUbQ$uint16;
        else if (offSize === 3) offsetType = $6uUbQ$uint24;
        else if (offSize === 4) offsetType = $6uUbQ$uint32;
        else throw new Error(`Bad offset size in CFFIndex: ${offSize} ${stream.pos}`);
        let ret = [];
        let startPos = stream.pos + (count + 1) * offSize - 1;
        let start = offsetType.decode(stream);
        for(let i = 0; i < count; i++){
            let end = offsetType.decode(stream);
            if (this.type != null) {
                let pos = stream.pos;
                stream.pos = startPos + start;
                parent.length = end - start;
                ret.push(this.type.decode(stream, parent));
                stream.pos = pos;
            } else ret.push({
                offset: startPos + start,
                length: end - start
            });
            start = end;
        }
        stream.pos = startPos + start;
        return ret;
    }
    size(arr, parent) {
        let size = 2;
        if (arr.length === 0) return size;
        let type = this.type || new $6uUbQ$Buffer;
        // find maximum offset to detminine offset type
        let offset = 1;
        for(let i = 0; i < arr.length; i++){
            let item = arr[i];
            offset += type.size(item, parent);
        }
        let offsetType;
        if (offset <= 0xff) offsetType = $6uUbQ$uint8;
        else if (offset <= 0xffff) offsetType = $6uUbQ$uint16;
        else if (offset <= 0xffffff) offsetType = $6uUbQ$uint24;
        else if (offset <= 0xffffffff) offsetType = $6uUbQ$uint32;
        else throw new Error("Bad offset in CFFIndex");
        size += 1 + offsetType.size() * (arr.length + 1);
        size += offset - 1;
        return size;
    }
    encode(stream, arr, parent) {
        stream.writeUInt16BE(arr.length);
        if (arr.length === 0) return;
        let type = this.type || new $6uUbQ$Buffer;
        // find maximum offset to detminine offset type
        let sizes = [];
        let offset = 1;
        for (let item of arr){
            let s = type.size(item, parent);
            sizes.push(s);
            offset += s;
        }
        let offsetType;
        if (offset <= 0xff) offsetType = $6uUbQ$uint8;
        else if (offset <= 0xffff) offsetType = $6uUbQ$uint16;
        else if (offset <= 0xffffff) offsetType = $6uUbQ$uint24;
        else if (offset <= 0xffffffff) offsetType = $6uUbQ$uint32;
        else throw new Error("Bad offset in CFFIndex");
        // write offset size
        stream.writeUInt8(offsetType.size());
        // write elements
        offset = 1;
        offsetType.encode(stream, offset);
        for (let size of sizes){
            offset += size;
            offsetType.encode(stream, offset);
        }
        for (let item of arr)type.encode(stream, item, parent);
        return;
    }
    constructor(type){
        this.type = type;
    }
}





const $c2d28e92708f99da$var$FLOAT_EOF = 0xf;
const $c2d28e92708f99da$var$FLOAT_LOOKUP = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    'E',
    'E-',
    null,
    '-'
];
const $c2d28e92708f99da$var$FLOAT_ENCODE_LOOKUP = {
    '.': 10,
    'E': 11,
    'E-': 12,
    '-': 14
};
class $c2d28e92708f99da$export$2e2bcd8739ae039 {
    static decode(stream, value) {
        if (32 <= value && value <= 246) return value - 139;
        if (247 <= value && value <= 250) return (value - 247) * 256 + stream.readUInt8() + 108;
        if (251 <= value && value <= 254) return -(value - 251) * 256 - stream.readUInt8() - 108;
        if (value === 28) return stream.readInt16BE();
        if (value === 29) return stream.readInt32BE();
        if (value === 30) {
            let str = '';
            while(true){
                let b = stream.readUInt8();
                let n1 = b >> 4;
                if (n1 === $c2d28e92708f99da$var$FLOAT_EOF) break;
                str += $c2d28e92708f99da$var$FLOAT_LOOKUP[n1];
                let n2 = b & 15;
                if (n2 === $c2d28e92708f99da$var$FLOAT_EOF) break;
                str += $c2d28e92708f99da$var$FLOAT_LOOKUP[n2];
            }
            return parseFloat(str);
        }
        return null;
    }
    static size(value) {
        // if the value needs to be forced to the largest size (32 bit)
        // e.g. for unknown pointers, set to 32768
        if (value.forceLarge) value = 32768;
        if ((value | 0) !== value) {
            let str = '' + value;
            return 1 + Math.ceil((str.length + 1) / 2);
        } else if (-107 <= value && value <= 107) return 1;
        else if (108 <= value && value <= 1131 || -1131 <= value && value <= -108) return 2;
        else if (-32768 <= value && value <= 32767) return 3;
        else return 5;
    }
    static encode(stream, value) {
        // if the value needs to be forced to the largest size (32 bit)
        // e.g. for unknown pointers, save the old value and set to 32768
        let val = Number(value);
        if (value.forceLarge) {
            stream.writeUInt8(29);
            return stream.writeInt32BE(val);
        } else if ((val | 0) !== val) {
            stream.writeUInt8(30);
            let str = '' + val;
            for(let i = 0; i < str.length; i += 2){
                let c1 = str[i];
                let n1 = $c2d28e92708f99da$var$FLOAT_ENCODE_LOOKUP[c1] || +c1;
                if (i === str.length - 1) var n2 = $c2d28e92708f99da$var$FLOAT_EOF;
                else {
                    let c2 = str[i + 1];
                    var n2 = $c2d28e92708f99da$var$FLOAT_ENCODE_LOOKUP[c2] || +c2;
                }
                stream.writeUInt8(n1 << 4 | n2 & 15);
            }
            if (n2 !== $c2d28e92708f99da$var$FLOAT_EOF) return stream.writeUInt8($c2d28e92708f99da$var$FLOAT_EOF << 4);
        } else if (-107 <= val && val <= 107) return stream.writeUInt8(val + 139);
        else if (108 <= val && val <= 1131) {
            val -= 108;
            stream.writeUInt8((val >> 8) + 247);
            return stream.writeUInt8(val & 0xff);
        } else if (-1131 <= val && val <= -108) {
            val = -val - 108;
            stream.writeUInt8((val >> 8) + 251);
            return stream.writeUInt8(val & 0xff);
        } else if (-32768 <= val && val <= 32767) {
            stream.writeUInt8(28);
            return stream.writeInt16BE(val);
        } else {
            stream.writeUInt8(29);
            return stream.writeInt32BE(val);
        }
    }
}


class $61aa549f16d58b9b$export$2e2bcd8739ae039 {
    decodeOperands(type, stream, ret, operands) {
        if (Array.isArray(type)) return operands.map((op, i)=>this.decodeOperands(type[i], stream, ret, [
                op
            ]));
        else if (type.decode != null) return type.decode(stream, ret, operands);
        else switch(type){
            case 'number':
            case 'offset':
            case 'sid':
                return operands[0];
            case 'boolean':
                return !!operands[0];
            default:
                return operands;
        }
    }
    encodeOperands(type, stream, ctx, operands) {
        if (Array.isArray(type)) return operands.map((op, i)=>this.encodeOperands(type[i], stream, ctx, op)[0]);
        else if (type.encode != null) return type.encode(stream, operands, ctx);
        else if (typeof operands === 'number') return [
            operands
        ];
        else if (typeof operands === 'boolean') return [
            +operands
        ];
        else if (Array.isArray(operands)) return operands;
        else return [
            operands
        ];
    }
    decode(stream, parent) {
        let end = stream.pos + parent.length;
        let ret = {};
        let operands = [];
        // define hidden properties
        Object.defineProperties(ret, {
            parent: {
                value: parent
            },
            _startOffset: {
                value: stream.pos
            }
        });
        // fill in defaults
        for(let key in this.fields){
            let field = this.fields[key];
            ret[field[1]] = field[3];
        }
        while(stream.pos < end){
            let b = stream.readUInt8();
            if (b < 28) {
                if (b === 12) b = b << 8 | stream.readUInt8();
                let field = this.fields[b];
                if (!field) throw new Error(`Unknown operator ${b}`);
                let val = this.decodeOperands(field[2], stream, ret, operands);
                if (val != null) {
                    if (val instanceof (0, $6uUbQ$PropertyDescriptor)) Object.defineProperty(ret, field[1], val);
                    else ret[field[1]] = val;
                }
                operands = [];
            } else operands.push((0, $c2d28e92708f99da$export$2e2bcd8739ae039).decode(stream, b));
        }
        return ret;
    }
    size(dict, parent, includePointers = true) {
        let ctx = {
            parent: parent,
            val: dict,
            pointerSize: 0,
            startOffset: parent.startOffset || 0
        };
        let len = 0;
        for(let k in this.fields){
            let field = this.fields[k];
            let val = dict[field[1]];
            if (val == null || (0, $6uUbQ$fastdeepequal)(val, field[3])) continue;
            let operands = this.encodeOperands(field[2], null, ctx, val);
            for (let op of operands)len += (0, $c2d28e92708f99da$export$2e2bcd8739ae039).size(op);
            let key = Array.isArray(field[0]) ? field[0] : [
                field[0]
            ];
            len += key.length;
        }
        if (includePointers) len += ctx.pointerSize;
        return len;
    }
    encode(stream, dict, parent) {
        let ctx = {
            pointers: [],
            startOffset: stream.pos,
            parent: parent,
            val: dict,
            pointerSize: 0
        };
        ctx.pointerOffset = stream.pos + this.size(dict, ctx, false);
        for (let field of this.ops){
            let val = dict[field[1]];
            if (val == null || (0, $6uUbQ$fastdeepequal)(val, field[3])) continue;
            let operands = this.encodeOperands(field[2], stream, ctx, val);
            for (let op of operands)(0, $c2d28e92708f99da$export$2e2bcd8739ae039).encode(stream, op);
            let key = Array.isArray(field[0]) ? field[0] : [
                field[0]
            ];
            for (let op of key)stream.writeUInt8(op);
        }
        let i = 0;
        while(i < ctx.pointers.length){
            let ptr = ctx.pointers[i++];
            ptr.type.encode(stream, ptr.val, ptr.parent);
        }
        return;
    }
    constructor(ops = []){
        this.ops = ops;
        this.fields = {};
        for (let field of ops){
            let key = Array.isArray(field[0]) ? field[0][0] << 8 | field[0][1] : field[0];
            this.fields[key] = field;
        }
    }
}




class $0e34a43d05bde82c$export$2e2bcd8739ae039 extends $6uUbQ$Pointer {
    decode(stream, parent, operands) {
        this.offsetType = {
            decode: ()=>operands[0]
        };
        return super.decode(stream, parent, operands);
    }
    encode(stream, value, ctx) {
        if (!stream) {
            // compute the size (so ctx.pointerSize is correct)
            this.offsetType = {
                size: ()=>0
            };
            this.size(value, ctx);
            return [
                new $0e34a43d05bde82c$var$Ptr(0)
            ];
        }
        let ptr = null;
        this.offsetType = {
            encode: (stream, val)=>ptr = val
        };
        super.encode(stream, value, ctx);
        return [
            new $0e34a43d05bde82c$var$Ptr(ptr)
        ];
    }
    constructor(type, options = {}){
        if (options.type == null) options.type = 'global';
        super(null, type, options);
    }
}
class $0e34a43d05bde82c$var$Ptr {
    valueOf() {
        return this.val;
    }
    constructor(val){
        this.val = val;
        this.forceLarge = true;
    }
}





class $6d59db2e29cc77b3$var$CFFBlendOp {
    static decode(stream, parent, operands) {
        let numBlends = operands.pop();
        // TODO: actually blend. For now just consume the deltas
        // since we don't use any of the values anyway.
        while(operands.length > numBlends)operands.pop();
    }
}
var $6d59db2e29cc77b3$export$2e2bcd8739ae039 = new (0, $61aa549f16d58b9b$export$2e2bcd8739ae039)([
    // key       name                    type                                          default
    [
        6,
        'BlueValues',
        'delta',
        null
    ],
    [
        7,
        'OtherBlues',
        'delta',
        null
    ],
    [
        8,
        'FamilyBlues',
        'delta',
        null
    ],
    [
        9,
        'FamilyOtherBlues',
        'delta',
        null
    ],
    [
        [
            12,
            9
        ],
        'BlueScale',
        'number',
        0.039625
    ],
    [
        [
            12,
            10
        ],
        'BlueShift',
        'number',
        7
    ],
    [
        [
            12,
            11
        ],
        'BlueFuzz',
        'number',
        1
    ],
    [
        10,
        'StdHW',
        'number',
        null
    ],
    [
        11,
        'StdVW',
        'number',
        null
    ],
    [
        [
            12,
            12
        ],
        'StemSnapH',
        'delta',
        null
    ],
    [
        [
            12,
            13
        ],
        'StemSnapV',
        'delta',
        null
    ],
    [
        [
            12,
            14
        ],
        'ForceBold',
        'boolean',
        false
    ],
    [
        [
            12,
            17
        ],
        'LanguageGroup',
        'number',
        0
    ],
    [
        [
            12,
            18
        ],
        'ExpansionFactor',
        'number',
        0.06
    ],
    [
        [
            12,
            19
        ],
        'initialRandomSeed',
        'number',
        0
    ],
    [
        20,
        'defaultWidthX',
        'number',
        0
    ],
    [
        21,
        'nominalWidthX',
        'number',
        0
    ],
    [
        22,
        'vsindex',
        'number',
        0
    ],
    [
        23,
        'blend',
        $6d59db2e29cc77b3$var$CFFBlendOp,
        null
    ],
    [
        19,
        'Subrs',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)(new (0, $43e9821ef3717eec$export$2e2bcd8739ae039), {
            type: 'local'
        }),
        null
    ]
]);


// Automatically generated from Appendix A of the CFF specification; do
// not edit. Length should be 391.
var $229224aec43783c5$export$2e2bcd8739ae039 = [
    ".notdef",
    "space",
    "exclam",
    "quotedbl",
    "numbersign",
    "dollar",
    "percent",
    "ampersand",
    "quoteright",
    "parenleft",
    "parenright",
    "asterisk",
    "plus",
    "comma",
    "hyphen",
    "period",
    "slash",
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "colon",
    "semicolon",
    "less",
    "equal",
    "greater",
    "question",
    "at",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "bracketleft",
    "backslash",
    "bracketright",
    "asciicircum",
    "underscore",
    "quoteleft",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "braceleft",
    "bar",
    "braceright",
    "asciitilde",
    "exclamdown",
    "cent",
    "sterling",
    "fraction",
    "yen",
    "florin",
    "section",
    "currency",
    "quotesingle",
    "quotedblleft",
    "guillemotleft",
    "guilsinglleft",
    "guilsinglright",
    "fi",
    "fl",
    "endash",
    "dagger",
    "daggerdbl",
    "periodcentered",
    "paragraph",
    "bullet",
    "quotesinglbase",
    "quotedblbase",
    "quotedblright",
    "guillemotright",
    "ellipsis",
    "perthousand",
    "questiondown",
    "grave",
    "acute",
    "circumflex",
    "tilde",
    "macron",
    "breve",
    "dotaccent",
    "dieresis",
    "ring",
    "cedilla",
    "hungarumlaut",
    "ogonek",
    "caron",
    "emdash",
    "AE",
    "ordfeminine",
    "Lslash",
    "Oslash",
    "OE",
    "ordmasculine",
    "ae",
    "dotlessi",
    "lslash",
    "oslash",
    "oe",
    "germandbls",
    "onesuperior",
    "logicalnot",
    "mu",
    "trademark",
    "Eth",
    "onehalf",
    "plusminus",
    "Thorn",
    "onequarter",
    "divide",
    "brokenbar",
    "degree",
    "thorn",
    "threequarters",
    "twosuperior",
    "registered",
    "minus",
    "eth",
    "multiply",
    "threesuperior",
    "copyright",
    "Aacute",
    "Acircumflex",
    "Adieresis",
    "Agrave",
    "Aring",
    "Atilde",
    "Ccedilla",
    "Eacute",
    "Ecircumflex",
    "Edieresis",
    "Egrave",
    "Iacute",
    "Icircumflex",
    "Idieresis",
    "Igrave",
    "Ntilde",
    "Oacute",
    "Ocircumflex",
    "Odieresis",
    "Ograve",
    "Otilde",
    "Scaron",
    "Uacute",
    "Ucircumflex",
    "Udieresis",
    "Ugrave",
    "Yacute",
    "Ydieresis",
    "Zcaron",
    "aacute",
    "acircumflex",
    "adieresis",
    "agrave",
    "aring",
    "atilde",
    "ccedilla",
    "eacute",
    "ecircumflex",
    "edieresis",
    "egrave",
    "iacute",
    "icircumflex",
    "idieresis",
    "igrave",
    "ntilde",
    "oacute",
    "ocircumflex",
    "odieresis",
    "ograve",
    "otilde",
    "scaron",
    "uacute",
    "ucircumflex",
    "udieresis",
    "ugrave",
    "yacute",
    "ydieresis",
    "zcaron",
    "exclamsmall",
    "Hungarumlautsmall",
    "dollaroldstyle",
    "dollarsuperior",
    "ampersandsmall",
    "Acutesmall",
    "parenleftsuperior",
    "parenrightsuperior",
    "twodotenleader",
    "onedotenleader",
    "zerooldstyle",
    "oneoldstyle",
    "twooldstyle",
    "threeoldstyle",
    "fouroldstyle",
    "fiveoldstyle",
    "sixoldstyle",
    "sevenoldstyle",
    "eightoldstyle",
    "nineoldstyle",
    "commasuperior",
    "threequartersemdash",
    "periodsuperior",
    "questionsmall",
    "asuperior",
    "bsuperior",
    "centsuperior",
    "dsuperior",
    "esuperior",
    "isuperior",
    "lsuperior",
    "msuperior",
    "nsuperior",
    "osuperior",
    "rsuperior",
    "ssuperior",
    "tsuperior",
    "ff",
    "ffi",
    "ffl",
    "parenleftinferior",
    "parenrightinferior",
    "Circumflexsmall",
    "hyphensuperior",
    "Gravesmall",
    "Asmall",
    "Bsmall",
    "Csmall",
    "Dsmall",
    "Esmall",
    "Fsmall",
    "Gsmall",
    "Hsmall",
    "Ismall",
    "Jsmall",
    "Ksmall",
    "Lsmall",
    "Msmall",
    "Nsmall",
    "Osmall",
    "Psmall",
    "Qsmall",
    "Rsmall",
    "Ssmall",
    "Tsmall",
    "Usmall",
    "Vsmall",
    "Wsmall",
    "Xsmall",
    "Ysmall",
    "Zsmall",
    "colonmonetary",
    "onefitted",
    "rupiah",
    "Tildesmall",
    "exclamdownsmall",
    "centoldstyle",
    "Lslashsmall",
    "Scaronsmall",
    "Zcaronsmall",
    "Dieresissmall",
    "Brevesmall",
    "Caronsmall",
    "Dotaccentsmall",
    "Macronsmall",
    "figuredash",
    "hypheninferior",
    "Ogoneksmall",
    "Ringsmall",
    "Cedillasmall",
    "questiondownsmall",
    "oneeighth",
    "threeeighths",
    "fiveeighths",
    "seveneighths",
    "onethird",
    "twothirds",
    "zerosuperior",
    "foursuperior",
    "fivesuperior",
    "sixsuperior",
    "sevensuperior",
    "eightsuperior",
    "ninesuperior",
    "zeroinferior",
    "oneinferior",
    "twoinferior",
    "threeinferior",
    "fourinferior",
    "fiveinferior",
    "sixinferior",
    "seveninferior",
    "eightinferior",
    "nineinferior",
    "centinferior",
    "dollarinferior",
    "periodinferior",
    "commainferior",
    "Agravesmall",
    "Aacutesmall",
    "Acircumflexsmall",
    "Atildesmall",
    "Adieresissmall",
    "Aringsmall",
    "AEsmall",
    "Ccedillasmall",
    "Egravesmall",
    "Eacutesmall",
    "Ecircumflexsmall",
    "Edieresissmall",
    "Igravesmall",
    "Iacutesmall",
    "Icircumflexsmall",
    "Idieresissmall",
    "Ethsmall",
    "Ntildesmall",
    "Ogravesmall",
    "Oacutesmall",
    "Ocircumflexsmall",
    "Otildesmall",
    "Odieresissmall",
    "OEsmall",
    "Oslashsmall",
    "Ugravesmall",
    "Uacutesmall",
    "Ucircumflexsmall",
    "Udieresissmall",
    "Yacutesmall",
    "Thornsmall",
    "Ydieresissmall",
    "001.000",
    "001.001",
    "001.002",
    "001.003",
    "Black",
    "Bold",
    "Book",
    "Light",
    "Medium",
    "Regular",
    "Roman",
    "Semibold"
];


let $bc0433d9b7e41f5f$export$dee0027060fa13bd = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'space',
    'exclam',
    'quotedbl',
    'numbersign',
    'dollar',
    'percent',
    'ampersand',
    'quoteright',
    'parenleft',
    'parenright',
    'asterisk',
    'plus',
    'comma',
    'hyphen',
    'period',
    'slash',
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'colon',
    'semicolon',
    'less',
    'equal',
    'greater',
    'question',
    'at',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'bracketleft',
    'backslash',
    'bracketright',
    'asciicircum',
    'underscore',
    'quoteleft',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'braceleft',
    'bar',
    'braceright',
    'asciitilde',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'exclamdown',
    'cent',
    'sterling',
    'fraction',
    'yen',
    'florin',
    'section',
    'currency',
    'quotesingle',
    'quotedblleft',
    'guillemotleft',
    'guilsinglleft',
    'guilsinglright',
    'fi',
    'fl',
    '',
    'endash',
    'dagger',
    'daggerdbl',
    'periodcentered',
    '',
    'paragraph',
    'bullet',
    'quotesinglbase',
    'quotedblbase',
    'quotedblright',
    'guillemotright',
    'ellipsis',
    'perthousand',
    '',
    'questiondown',
    '',
    'grave',
    'acute',
    'circumflex',
    'tilde',
    'macron',
    'breve',
    'dotaccent',
    'dieresis',
    '',
    'ring',
    'cedilla',
    '',
    'hungarumlaut',
    'ogonek',
    'caron',
    'emdash',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'AE',
    '',
    'ordfeminine',
    '',
    '',
    '',
    '',
    'Lslash',
    'Oslash',
    'OE',
    'ordmasculine',
    '',
    '',
    '',
    '',
    '',
    'ae',
    '',
    '',
    '',
    'dotlessi',
    '',
    '',
    'lslash',
    'oslash',
    'oe',
    'germandbls'
];
let $bc0433d9b7e41f5f$export$4f58f497e14a53c3 = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'space',
    'exclamsmall',
    'Hungarumlautsmall',
    '',
    'dollaroldstyle',
    'dollarsuperior',
    'ampersandsmall',
    'Acutesmall',
    'parenleftsuperior',
    'parenrightsuperior',
    'twodotenleader',
    'onedotenleader',
    'comma',
    'hyphen',
    'period',
    'fraction',
    'zerooldstyle',
    'oneoldstyle',
    'twooldstyle',
    'threeoldstyle',
    'fouroldstyle',
    'fiveoldstyle',
    'sixoldstyle',
    'sevenoldstyle',
    'eightoldstyle',
    'nineoldstyle',
    'colon',
    'semicolon',
    'commasuperior',
    'threequartersemdash',
    'periodsuperior',
    'questionsmall',
    '',
    'asuperior',
    'bsuperior',
    'centsuperior',
    'dsuperior',
    'esuperior',
    '',
    '',
    'isuperior',
    '',
    '',
    'lsuperior',
    'msuperior',
    'nsuperior',
    'osuperior',
    '',
    '',
    'rsuperior',
    'ssuperior',
    'tsuperior',
    '',
    'ff',
    'fi',
    'fl',
    'ffi',
    'ffl',
    'parenleftinferior',
    '',
    'parenrightinferior',
    'Circumflexsmall',
    'hyphensuperior',
    'Gravesmall',
    'Asmall',
    'Bsmall',
    'Csmall',
    'Dsmall',
    'Esmall',
    'Fsmall',
    'Gsmall',
    'Hsmall',
    'Ismall',
    'Jsmall',
    'Ksmall',
    'Lsmall',
    'Msmall',
    'Nsmall',
    'Osmall',
    'Psmall',
    'Qsmall',
    'Rsmall',
    'Ssmall',
    'Tsmall',
    'Usmall',
    'Vsmall',
    'Wsmall',
    'Xsmall',
    'Ysmall',
    'Zsmall',
    'colonmonetary',
    'onefitted',
    'rupiah',
    'Tildesmall',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'exclamdownsmall',
    'centoldstyle',
    'Lslashsmall',
    '',
    '',
    'Scaronsmall',
    'Zcaronsmall',
    'Dieresissmall',
    'Brevesmall',
    'Caronsmall',
    '',
    'Dotaccentsmall',
    '',
    '',
    'Macronsmall',
    '',
    '',
    'figuredash',
    'hypheninferior',
    '',
    '',
    'Ogoneksmall',
    'Ringsmall',
    'Cedillasmall',
    '',
    '',
    '',
    'onequarter',
    'onehalf',
    'threequarters',
    'questiondownsmall',
    'oneeighth',
    'threeeighths',
    'fiveeighths',
    'seveneighths',
    'onethird',
    'twothirds',
    '',
    '',
    'zerosuperior',
    'onesuperior',
    'twosuperior',
    'threesuperior',
    'foursuperior',
    'fivesuperior',
    'sixsuperior',
    'sevensuperior',
    'eightsuperior',
    'ninesuperior',
    'zeroinferior',
    'oneinferior',
    'twoinferior',
    'threeinferior',
    'fourinferior',
    'fiveinferior',
    'sixinferior',
    'seveninferior',
    'eightinferior',
    'nineinferior',
    'centinferior',
    'dollarinferior',
    'periodinferior',
    'commainferior',
    'Agravesmall',
    'Aacutesmall',
    'Acircumflexsmall',
    'Atildesmall',
    'Adieresissmall',
    'Aringsmall',
    'AEsmall',
    'Ccedillasmall',
    'Egravesmall',
    'Eacutesmall',
    'Ecircumflexsmall',
    'Edieresissmall',
    'Igravesmall',
    'Iacutesmall',
    'Icircumflexsmall',
    'Idieresissmall',
    'Ethsmall',
    'Ntildesmall',
    'Ogravesmall',
    'Oacutesmall',
    'Ocircumflexsmall',
    'Otildesmall',
    'Odieresissmall',
    'OEsmall',
    'Oslashsmall',
    'Ugravesmall',
    'Uacutesmall',
    'Ucircumflexsmall',
    'Udieresissmall',
    'Yacutesmall',
    'Thornsmall',
    'Ydieresissmall'
];


let $ef658f5c9a1488b2$export$c33b50336c234f16 = [
    '.notdef',
    'space',
    'exclam',
    'quotedbl',
    'numbersign',
    'dollar',
    'percent',
    'ampersand',
    'quoteright',
    'parenleft',
    'parenright',
    'asterisk',
    'plus',
    'comma',
    'hyphen',
    'period',
    'slash',
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'colon',
    'semicolon',
    'less',
    'equal',
    'greater',
    'question',
    'at',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'bracketleft',
    'backslash',
    'bracketright',
    'asciicircum',
    'underscore',
    'quoteleft',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'braceleft',
    'bar',
    'braceright',
    'asciitilde',
    'exclamdown',
    'cent',
    'sterling',
    'fraction',
    'yen',
    'florin',
    'section',
    'currency',
    'quotesingle',
    'quotedblleft',
    'guillemotleft',
    'guilsinglleft',
    'guilsinglright',
    'fi',
    'fl',
    'endash',
    'dagger',
    'daggerdbl',
    'periodcentered',
    'paragraph',
    'bullet',
    'quotesinglbase',
    'quotedblbase',
    'quotedblright',
    'guillemotright',
    'ellipsis',
    'perthousand',
    'questiondown',
    'grave',
    'acute',
    'circumflex',
    'tilde',
    'macron',
    'breve',
    'dotaccent',
    'dieresis',
    'ring',
    'cedilla',
    'hungarumlaut',
    'ogonek',
    'caron',
    'emdash',
    'AE',
    'ordfeminine',
    'Lslash',
    'Oslash',
    'OE',
    'ordmasculine',
    'ae',
    'dotlessi',
    'lslash',
    'oslash',
    'oe',
    'germandbls',
    'onesuperior',
    'logicalnot',
    'mu',
    'trademark',
    'Eth',
    'onehalf',
    'plusminus',
    'Thorn',
    'onequarter',
    'divide',
    'brokenbar',
    'degree',
    'thorn',
    'threequarters',
    'twosuperior',
    'registered',
    'minus',
    'eth',
    'multiply',
    'threesuperior',
    'copyright',
    'Aacute',
    'Acircumflex',
    'Adieresis',
    'Agrave',
    'Aring',
    'Atilde',
    'Ccedilla',
    'Eacute',
    'Ecircumflex',
    'Edieresis',
    'Egrave',
    'Iacute',
    'Icircumflex',
    'Idieresis',
    'Igrave',
    'Ntilde',
    'Oacute',
    'Ocircumflex',
    'Odieresis',
    'Ograve',
    'Otilde',
    'Scaron',
    'Uacute',
    'Ucircumflex',
    'Udieresis',
    'Ugrave',
    'Yacute',
    'Ydieresis',
    'Zcaron',
    'aacute',
    'acircumflex',
    'adieresis',
    'agrave',
    'aring',
    'atilde',
    'ccedilla',
    'eacute',
    'ecircumflex',
    'edieresis',
    'egrave',
    'iacute',
    'icircumflex',
    'idieresis',
    'igrave',
    'ntilde',
    'oacute',
    'ocircumflex',
    'odieresis',
    'ograve',
    'otilde',
    'scaron',
    'uacute',
    'ucircumflex',
    'udieresis',
    'ugrave',
    'yacute',
    'ydieresis',
    'zcaron'
];
let $ef658f5c9a1488b2$export$3ed0f9e1fee8d489 = [
    '.notdef',
    'space',
    'exclamsmall',
    'Hungarumlautsmall',
    'dollaroldstyle',
    'dollarsuperior',
    'ampersandsmall',
    'Acutesmall',
    'parenleftsuperior',
    'parenrightsuperior',
    'twodotenleader',
    'onedotenleader',
    'comma',
    'hyphen',
    'period',
    'fraction',
    'zerooldstyle',
    'oneoldstyle',
    'twooldstyle',
    'threeoldstyle',
    'fouroldstyle',
    'fiveoldstyle',
    'sixoldstyle',
    'sevenoldstyle',
    'eightoldstyle',
    'nineoldstyle',
    'colon',
    'semicolon',
    'commasuperior',
    'threequartersemdash',
    'periodsuperior',
    'questionsmall',
    'asuperior',
    'bsuperior',
    'centsuperior',
    'dsuperior',
    'esuperior',
    'isuperior',
    'lsuperior',
    'msuperior',
    'nsuperior',
    'osuperior',
    'rsuperior',
    'ssuperior',
    'tsuperior',
    'ff',
    'fi',
    'fl',
    'ffi',
    'ffl',
    'parenleftinferior',
    'parenrightinferior',
    'Circumflexsmall',
    'hyphensuperior',
    'Gravesmall',
    'Asmall',
    'Bsmall',
    'Csmall',
    'Dsmall',
    'Esmall',
    'Fsmall',
    'Gsmall',
    'Hsmall',
    'Ismall',
    'Jsmall',
    'Ksmall',
    'Lsmall',
    'Msmall',
    'Nsmall',
    'Osmall',
    'Psmall',
    'Qsmall',
    'Rsmall',
    'Ssmall',
    'Tsmall',
    'Usmall',
    'Vsmall',
    'Wsmall',
    'Xsmall',
    'Ysmall',
    'Zsmall',
    'colonmonetary',
    'onefitted',
    'rupiah',
    'Tildesmall',
    'exclamdownsmall',
    'centoldstyle',
    'Lslashsmall',
    'Scaronsmall',
    'Zcaronsmall',
    'Dieresissmall',
    'Brevesmall',
    'Caronsmall',
    'Dotaccentsmall',
    'Macronsmall',
    'figuredash',
    'hypheninferior',
    'Ogoneksmall',
    'Ringsmall',
    'Cedillasmall',
    'onequarter',
    'onehalf',
    'threequarters',
    'questiondownsmall',
    'oneeighth',
    'threeeighths',
    'fiveeighths',
    'seveneighths',
    'onethird',
    'twothirds',
    'zerosuperior',
    'onesuperior',
    'twosuperior',
    'threesuperior',
    'foursuperior',
    'fivesuperior',
    'sixsuperior',
    'sevensuperior',
    'eightsuperior',
    'ninesuperior',
    'zeroinferior',
    'oneinferior',
    'twoinferior',
    'threeinferior',
    'fourinferior',
    'fiveinferior',
    'sixinferior',
    'seveninferior',
    'eightinferior',
    'nineinferior',
    'centinferior',
    'dollarinferior',
    'periodinferior',
    'commainferior',
    'Agravesmall',
    'Aacutesmall',
    'Acircumflexsmall',
    'Atildesmall',
    'Adieresissmall',
    'Aringsmall',
    'AEsmall',
    'Ccedillasmall',
    'Egravesmall',
    'Eacutesmall',
    'Ecircumflexsmall',
    'Edieresissmall',
    'Igravesmall',
    'Iacutesmall',
    'Icircumflexsmall',
    'Idieresissmall',
    'Ethsmall',
    'Ntildesmall',
    'Ogravesmall',
    'Oacutesmall',
    'Ocircumflexsmall',
    'Otildesmall',
    'Odieresissmall',
    'OEsmall',
    'Oslashsmall',
    'Ugravesmall',
    'Uacutesmall',
    'Ucircumflexsmall',
    'Udieresissmall',
    'Yacutesmall',
    'Thornsmall',
    'Ydieresissmall'
];
let $ef658f5c9a1488b2$export$dc28be11139d4120 = [
    '.notdef',
    'space',
    'dollaroldstyle',
    'dollarsuperior',
    'parenleftsuperior',
    'parenrightsuperior',
    'twodotenleader',
    'onedotenleader',
    'comma',
    'hyphen',
    'period',
    'fraction',
    'zerooldstyle',
    'oneoldstyle',
    'twooldstyle',
    'threeoldstyle',
    'fouroldstyle',
    'fiveoldstyle',
    'sixoldstyle',
    'sevenoldstyle',
    'eightoldstyle',
    'nineoldstyle',
    'colon',
    'semicolon',
    'commasuperior',
    'threequartersemdash',
    'periodsuperior',
    'asuperior',
    'bsuperior',
    'centsuperior',
    'dsuperior',
    'esuperior',
    'isuperior',
    'lsuperior',
    'msuperior',
    'nsuperior',
    'osuperior',
    'rsuperior',
    'ssuperior',
    'tsuperior',
    'ff',
    'fi',
    'fl',
    'ffi',
    'ffl',
    'parenleftinferior',
    'parenrightinferior',
    'hyphensuperior',
    'colonmonetary',
    'onefitted',
    'rupiah',
    'centoldstyle',
    'figuredash',
    'hypheninferior',
    'onequarter',
    'onehalf',
    'threequarters',
    'oneeighth',
    'threeeighths',
    'fiveeighths',
    'seveneighths',
    'onethird',
    'twothirds',
    'zerosuperior',
    'onesuperior',
    'twosuperior',
    'threesuperior',
    'foursuperior',
    'fivesuperior',
    'sixsuperior',
    'sevensuperior',
    'eightsuperior',
    'ninesuperior',
    'zeroinferior',
    'oneinferior',
    'twoinferior',
    'threeinferior',
    'fourinferior',
    'fiveinferior',
    'sixinferior',
    'seveninferior',
    'eightinferior',
    'nineinferior',
    'centinferior',
    'dollarinferior',
    'periodinferior',
    'commainferior'
];



//########################
// Scripts and Languages #
//########################
let $7cbbe4e24ef3cb75$var$LangSysTable = new $6uUbQ$Struct({
    reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
    reqFeatureIndex: $6uUbQ$uint16,
    featureCount: $6uUbQ$uint16,
    featureIndexes: new $6uUbQ$Array($6uUbQ$uint16, 'featureCount')
});
let $7cbbe4e24ef3cb75$var$LangSysRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    langSys: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$LangSysTable, {
        type: 'parent'
    })
});
let $7cbbe4e24ef3cb75$var$Script = new $6uUbQ$Struct({
    defaultLangSys: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$LangSysTable),
    count: $6uUbQ$uint16,
    langSysRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$LangSysRecord, 'count')
});
let $7cbbe4e24ef3cb75$var$ScriptRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    script: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$Script, {
        type: 'parent'
    })
});
let $7cbbe4e24ef3cb75$export$3e15fc05ce864229 = new $6uUbQ$Array($7cbbe4e24ef3cb75$var$ScriptRecord, $6uUbQ$uint16);
//#######################
// Features and Lookups #
//#######################
let $7cbbe4e24ef3cb75$var$FeatureParams = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    nameID: $6uUbQ$uint16
});
let $7cbbe4e24ef3cb75$export$6e91cf7616333d5 = new $6uUbQ$Struct({
    featureParams: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$FeatureParams),
    lookupCount: $6uUbQ$uint16,
    lookupListIndexes: new $6uUbQ$Array($6uUbQ$uint16, 'lookupCount')
});
let $7cbbe4e24ef3cb75$var$FeatureRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    feature: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$6e91cf7616333d5, {
        type: 'parent'
    })
});
let $7cbbe4e24ef3cb75$export$aa18130def4b6cb4 = new $6uUbQ$Array($7cbbe4e24ef3cb75$var$FeatureRecord, $6uUbQ$uint16);
let $7cbbe4e24ef3cb75$var$LookupFlags = new $6uUbQ$Struct({
    markAttachmentType: $6uUbQ$uint8,
    flags: new $6uUbQ$Bitfield($6uUbQ$uint8, [
        'rightToLeft',
        'ignoreBaseGlyphs',
        'ignoreLigatures',
        'ignoreMarks',
        'useMarkFilteringSet'
    ])
});
function $7cbbe4e24ef3cb75$export$df0008c6ff2da22a(SubTable) {
    let Lookup = new $6uUbQ$Struct({
        lookupType: $6uUbQ$uint16,
        flags: $7cbbe4e24ef3cb75$var$LookupFlags,
        subTableCount: $6uUbQ$uint16,
        subTables: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, SubTable), 'subTableCount'),
        markFilteringSet: new $6uUbQ$Optional($6uUbQ$uint16, (t)=>t.flags.flags.useMarkFilteringSet)
    });
    return new $6uUbQ$LazyArray(new $6uUbQ$Pointer($6uUbQ$uint16, Lookup), $6uUbQ$uint16);
}
//#################
// Coverage Table #
//#################
let $7cbbe4e24ef3cb75$var$RangeRecord = new $6uUbQ$Struct({
    start: $6uUbQ$uint16,
    end: $6uUbQ$uint16,
    startCoverageIndex: $6uUbQ$uint16
});
let $7cbbe4e24ef3cb75$export$17608c3f81a6111 = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        glyphCount: $6uUbQ$uint16,
        glyphs: new $6uUbQ$Array($6uUbQ$uint16, 'glyphCount')
    },
    2: {
        rangeCount: $6uUbQ$uint16,
        rangeRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$RangeRecord, 'rangeCount')
    }
});
//#########################
// Class Definition Table #
//#########################
let $7cbbe4e24ef3cb75$var$ClassRangeRecord = new $6uUbQ$Struct({
    start: $6uUbQ$uint16,
    end: $6uUbQ$uint16,
    class: $6uUbQ$uint16
});
let $7cbbe4e24ef3cb75$export$843d551fbbafef71 = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        startGlyph: $6uUbQ$uint16,
        glyphCount: $6uUbQ$uint16,
        classValueArray: new $6uUbQ$Array($6uUbQ$uint16, 'glyphCount')
    },
    2: {
        classRangeCount: $6uUbQ$uint16,
        classRangeRecord: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$ClassRangeRecord, 'classRangeCount')
    }
});
let $7cbbe4e24ef3cb75$export$8215d14a63d9fb10 = new $6uUbQ$Struct({
    a: $6uUbQ$uint16,
    b: $6uUbQ$uint16,
    deltaFormat: $6uUbQ$uint16
});
//#############################################
// Contextual Substitution/Positioning Tables #
//#############################################
let $7cbbe4e24ef3cb75$var$LookupRecord = new $6uUbQ$Struct({
    sequenceIndex: $6uUbQ$uint16,
    lookupListIndex: $6uUbQ$uint16
});
let $7cbbe4e24ef3cb75$var$Rule = new $6uUbQ$Struct({
    glyphCount: $6uUbQ$uint16,
    lookupCount: $6uUbQ$uint16,
    input: new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.glyphCount - 1),
    lookupRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$LookupRecord, 'lookupCount')
});
let $7cbbe4e24ef3cb75$var$RuleSet = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$Rule), $6uUbQ$uint16);
let $7cbbe4e24ef3cb75$var$ClassRule = new $6uUbQ$Struct({
    glyphCount: $6uUbQ$uint16,
    lookupCount: $6uUbQ$uint16,
    classes: new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.glyphCount - 1),
    lookupRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$LookupRecord, 'lookupCount')
});
let $7cbbe4e24ef3cb75$var$ClassSet = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$ClassRule), $6uUbQ$uint16);
let $7cbbe4e24ef3cb75$export$841858b892ce1f4c = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111),
        ruleSetCount: $6uUbQ$uint16,
        ruleSets: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$RuleSet), 'ruleSetCount')
    },
    2: {
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111),
        classDef: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$843d551fbbafef71),
        classSetCnt: $6uUbQ$uint16,
        classSet: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$ClassSet), 'classSetCnt')
    },
    3: {
        glyphCount: $6uUbQ$uint16,
        lookupCount: $6uUbQ$uint16,
        coverages: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111), 'glyphCount'),
        lookupRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$LookupRecord, 'lookupCount')
    }
});
//######################################################
// Chaining Contextual Substitution/Positioning Tables #
//######################################################
let $7cbbe4e24ef3cb75$var$ChainRule = new $6uUbQ$Struct({
    backtrackGlyphCount: $6uUbQ$uint16,
    backtrack: new $6uUbQ$Array($6uUbQ$uint16, 'backtrackGlyphCount'),
    inputGlyphCount: $6uUbQ$uint16,
    input: new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.inputGlyphCount - 1),
    lookaheadGlyphCount: $6uUbQ$uint16,
    lookahead: new $6uUbQ$Array($6uUbQ$uint16, 'lookaheadGlyphCount'),
    lookupCount: $6uUbQ$uint16,
    lookupRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$LookupRecord, 'lookupCount')
});
let $7cbbe4e24ef3cb75$var$ChainRuleSet = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$ChainRule), $6uUbQ$uint16);
let $7cbbe4e24ef3cb75$export$5e6d09e6861162f6 = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111),
        chainCount: $6uUbQ$uint16,
        chainRuleSets: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$ChainRuleSet), 'chainCount')
    },
    2: {
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111),
        backtrackClassDef: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$843d551fbbafef71),
        inputClassDef: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$843d551fbbafef71),
        lookaheadClassDef: new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$843d551fbbafef71),
        chainCount: $6uUbQ$uint16,
        chainClassSet: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$var$ChainRuleSet), 'chainCount')
    },
    3: {
        backtrackGlyphCount: $6uUbQ$uint16,
        backtrackCoverage: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111), 'backtrackGlyphCount'),
        inputGlyphCount: $6uUbQ$uint16,
        inputCoverage: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111), 'inputGlyphCount'),
        lookaheadGlyphCount: $6uUbQ$uint16,
        lookaheadCoverage: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $7cbbe4e24ef3cb75$export$17608c3f81a6111), 'lookaheadGlyphCount'),
        lookupCount: $6uUbQ$uint16,
        lookupRecords: new $6uUbQ$Array($7cbbe4e24ef3cb75$var$LookupRecord, 'lookupCount')
    }
});



/*******************
 * Variation Store *
 *******************/ let $1a47b0c45c1c22fe$var$F2DOT14 = new $6uUbQ$Fixed(16, 'BE', 14);
let $1a47b0c45c1c22fe$var$RegionAxisCoordinates = new $6uUbQ$Struct({
    startCoord: $1a47b0c45c1c22fe$var$F2DOT14,
    peakCoord: $1a47b0c45c1c22fe$var$F2DOT14,
    endCoord: $1a47b0c45c1c22fe$var$F2DOT14
});
let $1a47b0c45c1c22fe$var$VariationRegionList = new $6uUbQ$Struct({
    axisCount: $6uUbQ$uint16,
    regionCount: $6uUbQ$uint16,
    variationRegions: new $6uUbQ$Array(new $6uUbQ$Array($1a47b0c45c1c22fe$var$RegionAxisCoordinates, 'axisCount'), 'regionCount')
});
let $1a47b0c45c1c22fe$var$DeltaSet = new $6uUbQ$Struct({
    shortDeltas: new $6uUbQ$Array($6uUbQ$int16, (t)=>t.parent.shortDeltaCount),
    regionDeltas: new $6uUbQ$Array($6uUbQ$int8, (t)=>t.parent.regionIndexCount - t.parent.shortDeltaCount),
    deltas: (t)=>t.shortDeltas.concat(t.regionDeltas)
});
let $1a47b0c45c1c22fe$var$ItemVariationData = new $6uUbQ$Struct({
    itemCount: $6uUbQ$uint16,
    shortDeltaCount: $6uUbQ$uint16,
    regionIndexCount: $6uUbQ$uint16,
    regionIndexes: new $6uUbQ$Array($6uUbQ$uint16, 'regionIndexCount'),
    deltaSets: new $6uUbQ$Array($1a47b0c45c1c22fe$var$DeltaSet, 'itemCount')
});
let $1a47b0c45c1c22fe$export$fe1b122a2710f241 = new $6uUbQ$Struct({
    format: $6uUbQ$uint16,
    variationRegionList: new $6uUbQ$Pointer($6uUbQ$uint32, $1a47b0c45c1c22fe$var$VariationRegionList),
    variationDataCount: $6uUbQ$uint16,
    itemVariationData: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint32, $1a47b0c45c1c22fe$var$ItemVariationData), 'variationDataCount')
});
/**********************
 * Feature Variations *
 **********************/ let $1a47b0c45c1c22fe$var$ConditionTable = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        axisIndex: $6uUbQ$uint16,
        axisIndex: $6uUbQ$uint16,
        filterRangeMinValue: $1a47b0c45c1c22fe$var$F2DOT14,
        filterRangeMaxValue: $1a47b0c45c1c22fe$var$F2DOT14
    }
});
let $1a47b0c45c1c22fe$var$ConditionSet = new $6uUbQ$Struct({
    conditionCount: $6uUbQ$uint16,
    conditionTable: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint32, $1a47b0c45c1c22fe$var$ConditionTable), 'conditionCount')
});
let $1a47b0c45c1c22fe$var$FeatureTableSubstitutionRecord = new $6uUbQ$Struct({
    featureIndex: $6uUbQ$uint16,
    alternateFeatureTable: new $6uUbQ$Pointer($6uUbQ$uint32, (0, $7cbbe4e24ef3cb75$export$6e91cf7616333d5), {
        type: 'parent'
    })
});
let $1a47b0c45c1c22fe$var$FeatureTableSubstitution = new $6uUbQ$Struct({
    version: $6uUbQ$fixed32,
    substitutionCount: $6uUbQ$uint16,
    substitutions: new $6uUbQ$Array($1a47b0c45c1c22fe$var$FeatureTableSubstitutionRecord, 'substitutionCount')
});
let $1a47b0c45c1c22fe$var$FeatureVariationRecord = new $6uUbQ$Struct({
    conditionSet: new $6uUbQ$Pointer($6uUbQ$uint32, $1a47b0c45c1c22fe$var$ConditionSet, {
        type: 'parent'
    }),
    featureTableSubstitution: new $6uUbQ$Pointer($6uUbQ$uint32, $1a47b0c45c1c22fe$var$FeatureTableSubstitution, {
        type: 'parent'
    })
});
let $1a47b0c45c1c22fe$export$441b70b7971dd419 = new $6uUbQ$Struct({
    majorVersion: $6uUbQ$uint16,
    minorVersion: $6uUbQ$uint16,
    featureVariationRecordCount: $6uUbQ$uint32,
    featureVariationRecords: new $6uUbQ$Array($1a47b0c45c1c22fe$var$FeatureVariationRecord, 'featureVariationRecordCount')
});


// Checks if an operand is an index of a predefined value,
// otherwise delegates to the provided type.
class $b84fd3dd9d8eddb2$var$PredefinedOp {
    decode(stream, parent, operands) {
        if (this.predefinedOps[operands[0]]) return this.predefinedOps[operands[0]];
        return this.type.decode(stream, parent, operands);
    }
    size(value, ctx) {
        return this.type.size(value, ctx);
    }
    encode(stream, value, ctx) {
        let index = this.predefinedOps.indexOf(value);
        if (index !== -1) return index;
        return this.type.encode(stream, value, ctx);
    }
    constructor(predefinedOps, type){
        this.predefinedOps = predefinedOps;
        this.type = type;
    }
}
class $b84fd3dd9d8eddb2$var$CFFEncodingVersion extends $6uUbQ$Number {
    decode(stream) {
        return $6uUbQ$uint8.decode(stream) & 0x7f;
    }
    constructor(){
        super('UInt8');
    }
}
let $b84fd3dd9d8eddb2$var$Range1 = new $6uUbQ$Struct({
    first: $6uUbQ$uint16,
    nLeft: $6uUbQ$uint8
});
let $b84fd3dd9d8eddb2$var$Range2 = new $6uUbQ$Struct({
    first: $6uUbQ$uint16,
    nLeft: $6uUbQ$uint16
});
let $b84fd3dd9d8eddb2$var$CFFCustomEncoding = new $6uUbQ$VersionedStruct(new $b84fd3dd9d8eddb2$var$CFFEncodingVersion(), {
    0: {
        nCodes: $6uUbQ$uint8,
        codes: new $6uUbQ$Array($6uUbQ$uint8, 'nCodes')
    },
    1: {
        nRanges: $6uUbQ$uint8,
        ranges: new $6uUbQ$Array($b84fd3dd9d8eddb2$var$Range1, 'nRanges')
    }
});
let $b84fd3dd9d8eddb2$var$CFFEncoding = new $b84fd3dd9d8eddb2$var$PredefinedOp([
    (0, $bc0433d9b7e41f5f$export$dee0027060fa13bd),
    (0, $bc0433d9b7e41f5f$export$4f58f497e14a53c3)
], new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$CFFCustomEncoding, {
    lazy: true
}));
// Decodes an array of ranges until the total
// length is equal to the provided length.
class $b84fd3dd9d8eddb2$var$RangeArray extends $6uUbQ$Array {
    decode(stream, parent) {
        let length = (0, $6uUbQ$resolveLength)(this.length, stream, parent);
        let count = 0;
        let res = [];
        while(count < length){
            let range = this.type.decode(stream, parent);
            range.offset = count;
            count += range.nLeft + 1;
            res.push(range);
        }
        return res;
    }
}
let $b84fd3dd9d8eddb2$var$CFFCustomCharset = new $6uUbQ$VersionedStruct($6uUbQ$uint8, {
    0: {
        glyphs: new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.parent.CharStrings.length - 1)
    },
    1: {
        ranges: new $b84fd3dd9d8eddb2$var$RangeArray($b84fd3dd9d8eddb2$var$Range1, (t)=>t.parent.CharStrings.length - 1)
    },
    2: {
        ranges: new $b84fd3dd9d8eddb2$var$RangeArray($b84fd3dd9d8eddb2$var$Range2, (t)=>t.parent.CharStrings.length - 1)
    }
});
let $b84fd3dd9d8eddb2$var$CFFCharset = new $b84fd3dd9d8eddb2$var$PredefinedOp([
    (0, $ef658f5c9a1488b2$export$c33b50336c234f16),
    (0, $ef658f5c9a1488b2$export$3ed0f9e1fee8d489),
    (0, $ef658f5c9a1488b2$export$dc28be11139d4120)
], new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$CFFCustomCharset, {
    lazy: true
}));
let $b84fd3dd9d8eddb2$var$FDRange3 = new $6uUbQ$Struct({
    first: $6uUbQ$uint16,
    fd: $6uUbQ$uint8
});
let $b84fd3dd9d8eddb2$var$FDRange4 = new $6uUbQ$Struct({
    first: $6uUbQ$uint32,
    fd: $6uUbQ$uint16
});
let $b84fd3dd9d8eddb2$var$FDSelect = new $6uUbQ$VersionedStruct($6uUbQ$uint8, {
    0: {
        fds: new $6uUbQ$Array($6uUbQ$uint8, (t)=>t.parent.CharStrings.length)
    },
    3: {
        nRanges: $6uUbQ$uint16,
        ranges: new $6uUbQ$Array($b84fd3dd9d8eddb2$var$FDRange3, 'nRanges'),
        sentinel: $6uUbQ$uint16
    },
    4: {
        nRanges: $6uUbQ$uint32,
        ranges: new $6uUbQ$Array($b84fd3dd9d8eddb2$var$FDRange4, 'nRanges'),
        sentinel: $6uUbQ$uint32
    }
});
let $b84fd3dd9d8eddb2$var$ptr = new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)((0, $6d59db2e29cc77b3$export$2e2bcd8739ae039));
class $b84fd3dd9d8eddb2$var$CFFPrivateOp {
    decode(stream, parent, operands) {
        parent.length = operands[0];
        return $b84fd3dd9d8eddb2$var$ptr.decode(stream, parent, [
            operands[1]
        ]);
    }
    size(dict, ctx) {
        return [
            (0, $6d59db2e29cc77b3$export$2e2bcd8739ae039).size(dict, ctx, false),
            $b84fd3dd9d8eddb2$var$ptr.size(dict, ctx)[0]
        ];
    }
    encode(stream, dict, ctx) {
        return [
            (0, $6d59db2e29cc77b3$export$2e2bcd8739ae039).size(dict, ctx, false),
            $b84fd3dd9d8eddb2$var$ptr.encode(stream, dict, ctx)[0]
        ];
    }
}
let $b84fd3dd9d8eddb2$var$FontDict = new (0, $61aa549f16d58b9b$export$2e2bcd8739ae039)([
    // key       name                   type(s)                                 default
    [
        18,
        'Private',
        new $b84fd3dd9d8eddb2$var$CFFPrivateOp,
        null
    ],
    [
        [
            12,
            38
        ],
        'FontName',
        'sid',
        null
    ],
    [
        [
            12,
            7
        ],
        'FontMatrix',
        'array',
        [
            0.001,
            0,
            0,
            0.001,
            0,
            0
        ]
    ],
    [
        [
            12,
            5
        ],
        'PaintType',
        'number',
        0
    ]
]);
let $b84fd3dd9d8eddb2$var$CFFTopDict = new (0, $61aa549f16d58b9b$export$2e2bcd8739ae039)([
    // key       name                   type(s)                                 default
    [
        [
            12,
            30
        ],
        'ROS',
        [
            'sid',
            'sid',
            'number'
        ],
        null
    ],
    [
        0,
        'version',
        'sid',
        null
    ],
    [
        1,
        'Notice',
        'sid',
        null
    ],
    [
        [
            12,
            0
        ],
        'Copyright',
        'sid',
        null
    ],
    [
        2,
        'FullName',
        'sid',
        null
    ],
    [
        3,
        'FamilyName',
        'sid',
        null
    ],
    [
        4,
        'Weight',
        'sid',
        null
    ],
    [
        [
            12,
            1
        ],
        'isFixedPitch',
        'boolean',
        false
    ],
    [
        [
            12,
            2
        ],
        'ItalicAngle',
        'number',
        0
    ],
    [
        [
            12,
            3
        ],
        'UnderlinePosition',
        'number',
        -100
    ],
    [
        [
            12,
            4
        ],
        'UnderlineThickness',
        'number',
        50
    ],
    [
        [
            12,
            5
        ],
        'PaintType',
        'number',
        0
    ],
    [
        [
            12,
            6
        ],
        'CharstringType',
        'number',
        2
    ],
    [
        [
            12,
            7
        ],
        'FontMatrix',
        'array',
        [
            0.001,
            0,
            0,
            0.001,
            0,
            0
        ]
    ],
    [
        13,
        'UniqueID',
        'number',
        null
    ],
    [
        5,
        'FontBBox',
        'array',
        [
            0,
            0,
            0,
            0
        ]
    ],
    [
        [
            12,
            8
        ],
        'StrokeWidth',
        'number',
        0
    ],
    [
        14,
        'XUID',
        'array',
        null
    ],
    [
        15,
        'charset',
        $b84fd3dd9d8eddb2$var$CFFCharset,
        (0, $ef658f5c9a1488b2$export$c33b50336c234f16)
    ],
    [
        16,
        'Encoding',
        $b84fd3dd9d8eddb2$var$CFFEncoding,
        (0, $bc0433d9b7e41f5f$export$dee0027060fa13bd)
    ],
    [
        17,
        'CharStrings',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)(new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)),
        null
    ],
    [
        18,
        'Private',
        new $b84fd3dd9d8eddb2$var$CFFPrivateOp,
        null
    ],
    [
        [
            12,
            20
        ],
        'SyntheticBase',
        'number',
        null
    ],
    [
        [
            12,
            21
        ],
        'PostScript',
        'sid',
        null
    ],
    [
        [
            12,
            22
        ],
        'BaseFontName',
        'sid',
        null
    ],
    [
        [
            12,
            23
        ],
        'BaseFontBlend',
        'delta',
        null
    ],
    // CID font specific
    [
        [
            12,
            31
        ],
        'CIDFontVersion',
        'number',
        0
    ],
    [
        [
            12,
            32
        ],
        'CIDFontRevision',
        'number',
        0
    ],
    [
        [
            12,
            33
        ],
        'CIDFontType',
        'number',
        0
    ],
    [
        [
            12,
            34
        ],
        'CIDCount',
        'number',
        8720
    ],
    [
        [
            12,
            35
        ],
        'UIDBase',
        'number',
        null
    ],
    [
        [
            12,
            37
        ],
        'FDSelect',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$FDSelect),
        null
    ],
    [
        [
            12,
            36
        ],
        'FDArray',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)(new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$FontDict)),
        null
    ],
    [
        [
            12,
            38
        ],
        'FontName',
        'sid',
        null
    ]
]);
let $b84fd3dd9d8eddb2$var$VariationStore = new $6uUbQ$Struct({
    length: $6uUbQ$uint16,
    itemVariationStore: (0, $1a47b0c45c1c22fe$export$fe1b122a2710f241)
});
let $b84fd3dd9d8eddb2$var$CFF2TopDict = new (0, $61aa549f16d58b9b$export$2e2bcd8739ae039)([
    [
        [
            12,
            7
        ],
        'FontMatrix',
        'array',
        [
            0.001,
            0,
            0,
            0.001,
            0,
            0
        ]
    ],
    [
        17,
        'CharStrings',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)(new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)),
        null
    ],
    [
        [
            12,
            37
        ],
        'FDSelect',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$FDSelect),
        null
    ],
    [
        [
            12,
            36
        ],
        'FDArray',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)(new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$FontDict)),
        null
    ],
    [
        24,
        'vstore',
        new (0, $0e34a43d05bde82c$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$VariationStore),
        null
    ],
    [
        25,
        'maxstack',
        'number',
        193
    ]
]);
let $b84fd3dd9d8eddb2$var$CFFTop = new $6uUbQ$VersionedStruct($6uUbQ$fixed16, {
    1: {
        hdrSize: $6uUbQ$uint8,
        offSize: $6uUbQ$uint8,
        nameIndex: new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)(new $6uUbQ$String('length')),
        topDictIndex: new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)($b84fd3dd9d8eddb2$var$CFFTopDict),
        stringIndex: new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)(new $6uUbQ$String('length')),
        globalSubrIndex: new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)
    },
    2: {
        hdrSize: $6uUbQ$uint8,
        length: $6uUbQ$uint16,
        topDict: $b84fd3dd9d8eddb2$var$CFF2TopDict,
        globalSubrIndex: new (0, $43e9821ef3717eec$export$2e2bcd8739ae039)
    }
});
var $b84fd3dd9d8eddb2$export$2e2bcd8739ae039 = $b84fd3dd9d8eddb2$var$CFFTop;




class $822ac0d589e4e237$var$CFFFont {
    static decode(stream) {
        return new $822ac0d589e4e237$var$CFFFont(stream);
    }
    decode() {
        let start = this.stream.pos;
        let top = (0, $b84fd3dd9d8eddb2$export$2e2bcd8739ae039).decode(this.stream);
        for(let key in top){
            let val = top[key];
            this[key] = val;
        }
        if (this.version < 2) {
            if (this.topDictIndex.length !== 1) throw new Error("Only a single font is allowed in CFF");
            this.topDict = this.topDictIndex[0];
        }
        this.isCIDFont = this.topDict.ROS != null;
        return this;
    }
    string(sid) {
        if (this.version >= 2) return null;
        if (sid < (0, $229224aec43783c5$export$2e2bcd8739ae039).length) return (0, $229224aec43783c5$export$2e2bcd8739ae039)[sid];
        return this.stringIndex[sid - (0, $229224aec43783c5$export$2e2bcd8739ae039).length];
    }
    get postscriptName() {
        if (this.version < 2) return this.nameIndex[0];
        return null;
    }
    get fullName() {
        return this.string(this.topDict.FullName);
    }
    get familyName() {
        return this.string(this.topDict.FamilyName);
    }
    getCharString(glyph) {
        this.stream.pos = this.topDict.CharStrings[glyph].offset;
        return this.stream.readBuffer(this.topDict.CharStrings[glyph].length);
    }
    getGlyphName(gid) {
        // CFF2 glyph names are in the post table.
        if (this.version >= 2) return null;
        // CID-keyed fonts don't have glyph names
        if (this.isCIDFont) return null;
        let { charset: charset } = this.topDict;
        if (Array.isArray(charset)) return charset[gid];
        if (gid === 0) return '.notdef';
        gid -= 1;
        switch(charset.version){
            case 0:
                return this.string(charset.glyphs[gid]);
            case 1:
            case 2:
                for(let i = 0; i < charset.ranges.length; i++){
                    let range = charset.ranges[i];
                    if (range.offset <= gid && gid <= range.offset + range.nLeft) return this.string(range.first + (gid - range.offset));
                }
                break;
        }
        return null;
    }
    fdForGlyph(gid) {
        if (!this.topDict.FDSelect) return null;
        switch(this.topDict.FDSelect.version){
            case 0:
                return this.topDict.FDSelect.fds[gid];
            case 3:
            case 4:
                let { ranges: ranges } = this.topDict.FDSelect;
                let low = 0;
                let high = ranges.length - 1;
                while(low <= high){
                    let mid = low + high >> 1;
                    if (gid < ranges[mid].first) high = mid - 1;
                    else if (mid < high && gid >= ranges[mid + 1].first) low = mid + 1;
                    else return ranges[mid].fd;
                }
            default:
                throw new Error(`Unknown FDSelect version: ${this.topDict.FDSelect.version}`);
        }
    }
    privateDictForGlyph(gid) {
        if (this.topDict.FDSelect) {
            let fd = this.fdForGlyph(gid);
            if (this.topDict.FDArray[fd]) return this.topDict.FDArray[fd].Private;
            return null;
        }
        if (this.version < 2) return this.topDict.Private;
        return this.topDict.FDArray[0].Private;
    }
    constructor(stream){
        this.stream = stream;
        this.decode();
    }
}
var $822ac0d589e4e237$export$2e2bcd8739ae039 = $822ac0d589e4e237$var$CFFFont;



let $2bbf2bc1ce37cd8f$var$VerticalOrigin = new $6uUbQ$Struct({
    glyphIndex: $6uUbQ$uint16,
    vertOriginY: $6uUbQ$int16
});
var $2bbf2bc1ce37cd8f$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    majorVersion: $6uUbQ$uint16,
    minorVersion: $6uUbQ$uint16,
    defaultVertOriginY: $6uUbQ$int16,
    numVertOriginYMetrics: $6uUbQ$uint16,
    metrics: new $6uUbQ$Array($2bbf2bc1ce37cd8f$var$VerticalOrigin, 'numVertOriginYMetrics')
});




let $0941618dc22a946d$export$16b227cb15d716a0 = new $6uUbQ$Struct({
    height: $6uUbQ$uint8,
    width: $6uUbQ$uint8,
    horiBearingX: $6uUbQ$int8,
    horiBearingY: $6uUbQ$int8,
    horiAdvance: $6uUbQ$uint8,
    vertBearingX: $6uUbQ$int8,
    vertBearingY: $6uUbQ$int8,
    vertAdvance: $6uUbQ$uint8
});
let $0941618dc22a946d$export$62c53e75f69bfe12 = new $6uUbQ$Struct({
    height: $6uUbQ$uint8,
    width: $6uUbQ$uint8,
    bearingX: $6uUbQ$int8,
    bearingY: $6uUbQ$int8,
    advance: $6uUbQ$uint8
});
let $0941618dc22a946d$var$EBDTComponent = new $6uUbQ$Struct({
    glyph: $6uUbQ$uint16,
    xOffset: $6uUbQ$int8,
    yOffset: $6uUbQ$int8
});
class $0941618dc22a946d$var$ByteAligned {
}
class $0941618dc22a946d$var$BitAligned {
}
let $0941618dc22a946d$export$f1f5ddeb20d14f = new $6uUbQ$VersionedStruct('version', {
    1: {
        metrics: $0941618dc22a946d$export$62c53e75f69bfe12,
        data: $0941618dc22a946d$var$ByteAligned
    },
    2: {
        metrics: $0941618dc22a946d$export$62c53e75f69bfe12,
        data: $0941618dc22a946d$var$BitAligned
    },
    // format 3 is deprecated
    // format 4 is not supported by Microsoft
    5: {
        data: $0941618dc22a946d$var$BitAligned
    },
    6: {
        metrics: $0941618dc22a946d$export$16b227cb15d716a0,
        data: $0941618dc22a946d$var$ByteAligned
    },
    7: {
        metrics: $0941618dc22a946d$export$16b227cb15d716a0,
        data: $0941618dc22a946d$var$BitAligned
    },
    8: {
        metrics: $0941618dc22a946d$export$62c53e75f69bfe12,
        pad: new $6uUbQ$Reserved($6uUbQ$uint8),
        numComponents: $6uUbQ$uint16,
        components: new $6uUbQ$Array($0941618dc22a946d$var$EBDTComponent, 'numComponents')
    },
    9: {
        metrics: $0941618dc22a946d$export$16b227cb15d716a0,
        pad: new $6uUbQ$Reserved($6uUbQ$uint8),
        numComponents: $6uUbQ$uint16,
        components: new $6uUbQ$Array($0941618dc22a946d$var$EBDTComponent, 'numComponents')
    },
    17: {
        metrics: $0941618dc22a946d$export$62c53e75f69bfe12,
        dataLen: $6uUbQ$uint32,
        data: new $6uUbQ$Buffer('dataLen')
    },
    18: {
        metrics: $0941618dc22a946d$export$16b227cb15d716a0,
        dataLen: $6uUbQ$uint32,
        data: new $6uUbQ$Buffer('dataLen')
    },
    19: {
        dataLen: $6uUbQ$uint32,
        data: new $6uUbQ$Buffer('dataLen')
    }
});


let $9911c4c7201c13de$var$SBitLineMetrics = new $6uUbQ$Struct({
    ascender: $6uUbQ$int8,
    descender: $6uUbQ$int8,
    widthMax: $6uUbQ$uint8,
    caretSlopeNumerator: $6uUbQ$int8,
    caretSlopeDenominator: $6uUbQ$int8,
    caretOffset: $6uUbQ$int8,
    minOriginSB: $6uUbQ$int8,
    minAdvanceSB: $6uUbQ$int8,
    maxBeforeBL: $6uUbQ$int8,
    minAfterBL: $6uUbQ$int8,
    pad: new $6uUbQ$Reserved($6uUbQ$int8, 2)
});
let $9911c4c7201c13de$var$CodeOffsetPair = new $6uUbQ$Struct({
    glyphCode: $6uUbQ$uint16,
    offset: $6uUbQ$uint16
});
let $9911c4c7201c13de$var$IndexSubtable = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    header: {
        imageFormat: $6uUbQ$uint16,
        imageDataOffset: $6uUbQ$uint32
    },
    1: {
        offsetArray: new $6uUbQ$Array($6uUbQ$uint32, (t)=>t.parent.lastGlyphIndex - t.parent.firstGlyphIndex + 1)
    },
    2: {
        imageSize: $6uUbQ$uint32,
        bigMetrics: (0, $0941618dc22a946d$export$16b227cb15d716a0)
    },
    3: {
        offsetArray: new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.parent.lastGlyphIndex - t.parent.firstGlyphIndex + 1)
    },
    4: {
        numGlyphs: $6uUbQ$uint32,
        glyphArray: new $6uUbQ$Array($9911c4c7201c13de$var$CodeOffsetPair, (t)=>t.numGlyphs + 1)
    },
    5: {
        imageSize: $6uUbQ$uint32,
        bigMetrics: (0, $0941618dc22a946d$export$16b227cb15d716a0),
        numGlyphs: $6uUbQ$uint32,
        glyphCodeArray: new $6uUbQ$Array($6uUbQ$uint16, 'numGlyphs')
    }
});
let $9911c4c7201c13de$var$IndexSubtableArray = new $6uUbQ$Struct({
    firstGlyphIndex: $6uUbQ$uint16,
    lastGlyphIndex: $6uUbQ$uint16,
    subtable: new $6uUbQ$Pointer($6uUbQ$uint32, $9911c4c7201c13de$var$IndexSubtable)
});
let $9911c4c7201c13de$var$BitmapSizeTable = new $6uUbQ$Struct({
    indexSubTableArray: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($9911c4c7201c13de$var$IndexSubtableArray, 1), {
        type: 'parent'
    }),
    indexTablesSize: $6uUbQ$uint32,
    numberOfIndexSubTables: $6uUbQ$uint32,
    colorRef: $6uUbQ$uint32,
    hori: $9911c4c7201c13de$var$SBitLineMetrics,
    vert: $9911c4c7201c13de$var$SBitLineMetrics,
    startGlyphIndex: $6uUbQ$uint16,
    endGlyphIndex: $6uUbQ$uint16,
    ppemX: $6uUbQ$uint8,
    ppemY: $6uUbQ$uint8,
    bitDepth: $6uUbQ$uint8,
    flags: new $6uUbQ$Bitfield($6uUbQ$uint8, [
        'horizontal',
        'vertical'
    ])
});
var $9911c4c7201c13de$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint32,
    numSizes: $6uUbQ$uint32,
    sizes: new $6uUbQ$Array($9911c4c7201c13de$var$BitmapSizeTable, 'numSizes')
});



let $abb847051efd51b1$var$ImageTable = new $6uUbQ$Struct({
    ppem: $6uUbQ$uint16,
    resolution: $6uUbQ$uint16,
    imageOffsets: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint32, 'void'), (t)=>t.parent.parent.maxp.numGlyphs + 1)
});
var // This is the Apple sbix table, used by the "Apple Color Emoji" font.
// It includes several image tables with images for each bitmap glyph
// of several different sizes.
$abb847051efd51b1$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    flags: new $6uUbQ$Bitfield($6uUbQ$uint16, [
        'renderOutlines'
    ]),
    numImgTables: $6uUbQ$uint32,
    imageTables: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint32, $abb847051efd51b1$var$ImageTable), 'numImgTables')
});



let $eb629188f3dfefdd$var$LayerRecord = new $6uUbQ$Struct({
    gid: $6uUbQ$uint16,
    paletteIndex: $6uUbQ$uint16 // Index value to use in the appropriate palette. This value must
}); // be less than numPaletteEntries in the CPAL table, except for
// the special case noted below. Each palette entry is 16 bits.
// A palette index of 0xFFFF is a special case indicating that
// the text foreground color should be used.
let $eb629188f3dfefdd$var$BaseGlyphRecord = new $6uUbQ$Struct({
    gid: $6uUbQ$uint16,
    // and is not rendered for color.
    firstLayerIndex: $6uUbQ$uint16,
    // There will be numLayers consecutive entries for this base glyph.
    numLayers: $6uUbQ$uint16
});
var $eb629188f3dfefdd$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    numBaseGlyphRecords: $6uUbQ$uint16,
    baseGlyphRecord: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($eb629188f3dfefdd$var$BaseGlyphRecord, 'numBaseGlyphRecords')),
    layerRecords: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($eb629188f3dfefdd$var$LayerRecord, 'numLayerRecords'), {
        lazy: true
    }),
    numLayerRecords: $6uUbQ$uint16
});



let $08734b8e7dc64587$var$ColorRecord = new $6uUbQ$Struct({
    blue: $6uUbQ$uint8,
    green: $6uUbQ$uint8,
    red: $6uUbQ$uint8,
    alpha: $6uUbQ$uint8
});
var $08734b8e7dc64587$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    header: {
        numPaletteEntries: $6uUbQ$uint16,
        numPalettes: $6uUbQ$uint16,
        numColorRecords: $6uUbQ$uint16,
        colorRecords: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($08734b8e7dc64587$var$ColorRecord, 'numColorRecords')),
        colorRecordIndices: new $6uUbQ$Array($6uUbQ$uint16, 'numPalettes')
    },
    0: {},
    1: {
        offsetPaletteTypeArray: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($6uUbQ$uint32, 'numPalettes')),
        offsetPaletteLabelArray: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($6uUbQ$uint16, 'numPalettes')),
        offsetPaletteEntryLabelArray: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($6uUbQ$uint16, 'numPaletteEntries'))
    }
});





let $497cef411d884e34$var$BaseCoord = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        coordinate: $6uUbQ$int16 // X or Y value, in design units
    },
    2: {
        coordinate: $6uUbQ$int16,
        referenceGlyph: $6uUbQ$uint16,
        baseCoordPoint: $6uUbQ$uint16 // Index of contour point on the referenceGlyph
    },
    3: {
        coordinate: $6uUbQ$int16,
        deviceTable: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10)) // Device table for X or Y value
    }
});
let $497cef411d884e34$var$BaseValues = new $6uUbQ$Struct({
    defaultIndex: $6uUbQ$uint16,
    baseCoordCount: $6uUbQ$uint16,
    baseCoords: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseCoord), 'baseCoordCount')
});
let $497cef411d884e34$var$FeatMinMaxRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    minCoord: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseCoord, {
        type: 'parent'
    }),
    maxCoord: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseCoord, {
        type: 'parent'
    }) // May be NULL
});
let $497cef411d884e34$var$MinMax = new $6uUbQ$Struct({
    minCoord: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseCoord),
    maxCoord: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseCoord),
    featMinMaxCount: $6uUbQ$uint16,
    featMinMaxRecords: new $6uUbQ$Array($497cef411d884e34$var$FeatMinMaxRecord, 'featMinMaxCount') // In alphabetical order
});
let $497cef411d884e34$var$BaseLangSysRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    minMax: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$MinMax, {
        type: 'parent'
    })
});
let $497cef411d884e34$var$BaseScript = new $6uUbQ$Struct({
    baseValues: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseValues),
    defaultMinMax: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$MinMax),
    baseLangSysCount: $6uUbQ$uint16,
    baseLangSysRecords: new $6uUbQ$Array($497cef411d884e34$var$BaseLangSysRecord, 'baseLangSysCount') // in alphabetical order by BaseLangSysTag
});
let $497cef411d884e34$var$BaseScriptRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    script: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseScript, {
        type: 'parent'
    })
});
let $497cef411d884e34$var$BaseScriptList = new $6uUbQ$Array($497cef411d884e34$var$BaseScriptRecord, $6uUbQ$uint16);
// Array of 4-byte baseline identification tags-must be in alphabetical order
let $497cef411d884e34$var$BaseTagList = new $6uUbQ$Array(new $6uUbQ$String(4), $6uUbQ$uint16);
let $497cef411d884e34$var$Axis = new $6uUbQ$Struct({
    baseTagList: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseTagList),
    baseScriptList: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$BaseScriptList)
});
var $497cef411d884e34$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$uint32, {
    header: {
        horizAxis: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$Axis),
        vertAxis: new $6uUbQ$Pointer($6uUbQ$uint16, $497cef411d884e34$var$Axis) // May be NULL
    },
    0x00010000: {},
    0x00010001: {
        itemVariationStore: new $6uUbQ$Pointer($6uUbQ$uint32, (0, $1a47b0c45c1c22fe$export$fe1b122a2710f241))
    }
});





let $cf5f33c63ef209e6$var$AttachPoint = new $6uUbQ$Array($6uUbQ$uint16, $6uUbQ$uint16);
let $cf5f33c63ef209e6$var$AttachList = new $6uUbQ$Struct({
    coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
    glyphCount: $6uUbQ$uint16,
    attachPoints: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$AttachPoint), 'glyphCount')
});
let $cf5f33c63ef209e6$var$CaretValue = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        coordinate: $6uUbQ$int16
    },
    2: {
        caretValuePoint: $6uUbQ$uint16
    },
    3: {
        coordinate: $6uUbQ$int16,
        deviceTable: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10))
    }
});
let $cf5f33c63ef209e6$var$LigGlyph = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$CaretValue), $6uUbQ$uint16);
let $cf5f33c63ef209e6$var$LigCaretList = new $6uUbQ$Struct({
    coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
    ligGlyphCount: $6uUbQ$uint16,
    ligGlyphs: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$LigGlyph), 'ligGlyphCount')
});
let $cf5f33c63ef209e6$var$MarkGlyphSetsDef = new $6uUbQ$Struct({
    markSetTableFormat: $6uUbQ$uint16,
    markSetCount: $6uUbQ$uint16,
    coverage: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint32, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)), 'markSetCount')
});
var $cf5f33c63ef209e6$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$uint32, {
    header: {
        glyphClassDef: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$843d551fbbafef71)),
        attachList: new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$AttachList),
        ligCaretList: new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$LigCaretList),
        markAttachClassDef: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$843d551fbbafef71))
    },
    0x00010000: {},
    0x00010002: {
        markGlyphSetsDef: new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$MarkGlyphSetsDef)
    },
    0x00010003: {
        markGlyphSetsDef: new $6uUbQ$Pointer($6uUbQ$uint16, $cf5f33c63ef209e6$var$MarkGlyphSetsDef),
        itemVariationStore: new $6uUbQ$Pointer($6uUbQ$uint32, (0, $1a47b0c45c1c22fe$export$fe1b122a2710f241))
    }
});





let $47e0e8ef515d9903$var$ValueFormat = new $6uUbQ$Bitfield($6uUbQ$uint16, [
    'xPlacement',
    'yPlacement',
    'xAdvance',
    'yAdvance',
    'xPlaDevice',
    'yPlaDevice',
    'xAdvDevice',
    'yAdvDevice'
]);
let $47e0e8ef515d9903$var$types = {
    xPlacement: $6uUbQ$int16,
    yPlacement: $6uUbQ$int16,
    xAdvance: $6uUbQ$int16,
    yAdvance: $6uUbQ$int16,
    xPlaDevice: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10), {
        type: 'global',
        relativeTo: (ctx)=>ctx.rel
    }),
    yPlaDevice: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10), {
        type: 'global',
        relativeTo: (ctx)=>ctx.rel
    }),
    xAdvDevice: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10), {
        type: 'global',
        relativeTo: (ctx)=>ctx.rel
    }),
    yAdvDevice: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10), {
        type: 'global',
        relativeTo: (ctx)=>ctx.rel
    })
};
class $47e0e8ef515d9903$var$ValueRecord {
    buildStruct(parent) {
        let struct = parent;
        while(!struct[this.key] && struct.parent)struct = struct.parent;
        if (!struct[this.key]) return;
        let fields = {};
        fields.rel = ()=>struct._startOffset;
        let format = struct[this.key];
        for(let key in format)if (format[key]) fields[key] = $47e0e8ef515d9903$var$types[key];
        return new $6uUbQ$Struct(fields);
    }
    size(val, ctx) {
        return this.buildStruct(ctx).size(val, ctx);
    }
    decode(stream, parent) {
        let res = this.buildStruct(parent).decode(stream, parent);
        delete res.rel;
        return res;
    }
    constructor(key = 'valueFormat'){
        this.key = key;
    }
}
let $47e0e8ef515d9903$var$PairValueRecord = new $6uUbQ$Struct({
    secondGlyph: $6uUbQ$uint16,
    value1: new $47e0e8ef515d9903$var$ValueRecord('valueFormat1'),
    value2: new $47e0e8ef515d9903$var$ValueRecord('valueFormat2')
});
let $47e0e8ef515d9903$var$PairSet = new $6uUbQ$Array($47e0e8ef515d9903$var$PairValueRecord, $6uUbQ$uint16);
let $47e0e8ef515d9903$var$Class2Record = new $6uUbQ$Struct({
    value1: new $47e0e8ef515d9903$var$ValueRecord('valueFormat1'),
    value2: new $47e0e8ef515d9903$var$ValueRecord('valueFormat2')
});
let $47e0e8ef515d9903$var$Anchor = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    1: {
        xCoordinate: $6uUbQ$int16,
        yCoordinate: $6uUbQ$int16
    },
    2: {
        xCoordinate: $6uUbQ$int16,
        yCoordinate: $6uUbQ$int16,
        anchorPoint: $6uUbQ$uint16
    },
    3: {
        xCoordinate: $6uUbQ$int16,
        yCoordinate: $6uUbQ$int16,
        xDeviceTable: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10)),
        yDeviceTable: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$8215d14a63d9fb10))
    }
});
let $47e0e8ef515d9903$var$EntryExitRecord = new $6uUbQ$Struct({
    entryAnchor: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$Anchor, {
        type: 'parent'
    }),
    exitAnchor: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$Anchor, {
        type: 'parent'
    })
});
let $47e0e8ef515d9903$var$MarkRecord = new $6uUbQ$Struct({
    class: $6uUbQ$uint16,
    markAnchor: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$Anchor, {
        type: 'parent'
    })
});
let $47e0e8ef515d9903$var$MarkArray = new $6uUbQ$Array($47e0e8ef515d9903$var$MarkRecord, $6uUbQ$uint16);
let $47e0e8ef515d9903$var$BaseRecord = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$Anchor), (t)=>t.parent.classCount);
let $47e0e8ef515d9903$var$BaseArray = new $6uUbQ$Array($47e0e8ef515d9903$var$BaseRecord, $6uUbQ$uint16);
let $47e0e8ef515d9903$var$ComponentRecord = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$Anchor), (t)=>t.parent.parent.classCount);
let $47e0e8ef515d9903$var$LigatureAttach = new $6uUbQ$Array($47e0e8ef515d9903$var$ComponentRecord, $6uUbQ$uint16);
let $47e0e8ef515d9903$var$LigatureArray = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$LigatureAttach), $6uUbQ$uint16);
let $47e0e8ef515d9903$export$73a8cfb19cd43a0f = new $6uUbQ$VersionedStruct('lookupType', {
    1: new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
        1: {
            coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
            valueFormat: $47e0e8ef515d9903$var$ValueFormat,
            value: new $47e0e8ef515d9903$var$ValueRecord()
        },
        2: {
            coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
            valueFormat: $47e0e8ef515d9903$var$ValueFormat,
            valueCount: $6uUbQ$uint16,
            values: new $6uUbQ$LazyArray(new $47e0e8ef515d9903$var$ValueRecord(), 'valueCount')
        }
    }),
    2: new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
        1: {
            coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
            valueFormat1: $47e0e8ef515d9903$var$ValueFormat,
            valueFormat2: $47e0e8ef515d9903$var$ValueFormat,
            pairSetCount: $6uUbQ$uint16,
            pairSets: new $6uUbQ$LazyArray(new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$PairSet), 'pairSetCount')
        },
        2: {
            coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
            valueFormat1: $47e0e8ef515d9903$var$ValueFormat,
            valueFormat2: $47e0e8ef515d9903$var$ValueFormat,
            classDef1: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$843d551fbbafef71)),
            classDef2: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$843d551fbbafef71)),
            class1Count: $6uUbQ$uint16,
            class2Count: $6uUbQ$uint16,
            classRecords: new $6uUbQ$LazyArray(new $6uUbQ$LazyArray($47e0e8ef515d9903$var$Class2Record, 'class2Count'), 'class1Count')
        }
    }),
    3: {
        format: $6uUbQ$uint16,
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        entryExitCount: $6uUbQ$uint16,
        entryExitRecords: new $6uUbQ$Array($47e0e8ef515d9903$var$EntryExitRecord, 'entryExitCount')
    },
    4: {
        format: $6uUbQ$uint16,
        markCoverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        baseCoverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        classCount: $6uUbQ$uint16,
        markArray: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$MarkArray),
        baseArray: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$BaseArray)
    },
    5: {
        format: $6uUbQ$uint16,
        markCoverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        ligatureCoverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        classCount: $6uUbQ$uint16,
        markArray: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$MarkArray),
        ligatureArray: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$LigatureArray)
    },
    6: {
        format: $6uUbQ$uint16,
        mark1Coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        mark2Coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        classCount: $6uUbQ$uint16,
        mark1Array: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$MarkArray),
        mark2Array: new $6uUbQ$Pointer($6uUbQ$uint16, $47e0e8ef515d9903$var$BaseArray)
    },
    7: (0, $7cbbe4e24ef3cb75$export$841858b892ce1f4c),
    8: (0, $7cbbe4e24ef3cb75$export$5e6d09e6861162f6),
    9: {
        posFormat: $6uUbQ$uint16,
        lookupType: $6uUbQ$uint16,
        extension: new $6uUbQ$Pointer($6uUbQ$uint32, null)
    }
});
// Fix circular reference
$47e0e8ef515d9903$export$73a8cfb19cd43a0f.versions[9].extension.type = $47e0e8ef515d9903$export$73a8cfb19cd43a0f;
var $47e0e8ef515d9903$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$uint32, {
    header: {
        scriptList: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$3e15fc05ce864229)),
        featureList: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$aa18130def4b6cb4)),
        lookupList: new $6uUbQ$Pointer($6uUbQ$uint16, new (0, $7cbbe4e24ef3cb75$export$df0008c6ff2da22a)($47e0e8ef515d9903$export$73a8cfb19cd43a0f))
    },
    0x00010000: {},
    0x00010001: {
        featureVariations: new $6uUbQ$Pointer($6uUbQ$uint32, (0, $1a47b0c45c1c22fe$export$441b70b7971dd419))
    }
});





let $d3f442064af66e06$var$Sequence = new $6uUbQ$Array($6uUbQ$uint16, $6uUbQ$uint16);
let $d3f442064af66e06$var$AlternateSet = $d3f442064af66e06$var$Sequence;
let $d3f442064af66e06$var$Ligature = new $6uUbQ$Struct({
    glyph: $6uUbQ$uint16,
    compCount: $6uUbQ$uint16,
    components: new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.compCount - 1)
});
let $d3f442064af66e06$var$LigatureSet = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $d3f442064af66e06$var$Ligature), $6uUbQ$uint16);
let $d3f442064af66e06$var$GSUBLookup = new $6uUbQ$VersionedStruct('lookupType', {
    1: new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
        1: {
            coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
            deltaGlyphID: $6uUbQ$int16
        },
        2: {
            coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
            glyphCount: $6uUbQ$uint16,
            substitute: new $6uUbQ$LazyArray($6uUbQ$uint16, 'glyphCount')
        }
    }),
    2: {
        substFormat: $6uUbQ$uint16,
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        count: $6uUbQ$uint16,
        sequences: new $6uUbQ$LazyArray(new $6uUbQ$Pointer($6uUbQ$uint16, $d3f442064af66e06$var$Sequence), 'count')
    },
    3: {
        substFormat: $6uUbQ$uint16,
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        count: $6uUbQ$uint16,
        alternateSet: new $6uUbQ$LazyArray(new $6uUbQ$Pointer($6uUbQ$uint16, $d3f442064af66e06$var$AlternateSet), 'count')
    },
    4: {
        substFormat: $6uUbQ$uint16,
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        count: $6uUbQ$uint16,
        ligatureSets: new $6uUbQ$LazyArray(new $6uUbQ$Pointer($6uUbQ$uint16, $d3f442064af66e06$var$LigatureSet), 'count')
    },
    5: (0, $7cbbe4e24ef3cb75$export$841858b892ce1f4c),
    6: (0, $7cbbe4e24ef3cb75$export$5e6d09e6861162f6),
    7: {
        substFormat: $6uUbQ$uint16,
        lookupType: $6uUbQ$uint16,
        extension: new $6uUbQ$Pointer($6uUbQ$uint32, null)
    },
    8: {
        substFormat: $6uUbQ$uint16,
        coverage: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)),
        backtrackCoverage: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)), 'backtrackGlyphCount'),
        lookaheadGlyphCount: $6uUbQ$uint16,
        lookaheadCoverage: new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$17608c3f81a6111)), 'lookaheadGlyphCount'),
        glyphCount: $6uUbQ$uint16,
        substitutes: new $6uUbQ$Array($6uUbQ$uint16, 'glyphCount')
    }
});
// Fix circular reference
$d3f442064af66e06$var$GSUBLookup.versions[7].extension.type = $d3f442064af66e06$var$GSUBLookup;
var $d3f442064af66e06$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$uint32, {
    header: {
        scriptList: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$3e15fc05ce864229)),
        featureList: new $6uUbQ$Pointer($6uUbQ$uint16, (0, $7cbbe4e24ef3cb75$export$aa18130def4b6cb4)),
        lookupList: new $6uUbQ$Pointer($6uUbQ$uint16, new (0, $7cbbe4e24ef3cb75$export$df0008c6ff2da22a)($d3f442064af66e06$var$GSUBLookup))
    },
    0x00010000: {},
    0x00010001: {
        featureVariations: new $6uUbQ$Pointer($6uUbQ$uint32, (0, $1a47b0c45c1c22fe$export$441b70b7971dd419))
    }
});





let $71cfb3c4767fbd0c$var$JstfGSUBModList = new $6uUbQ$Array($6uUbQ$uint16, $6uUbQ$uint16);
let $71cfb3c4767fbd0c$var$JstfPriority = new $6uUbQ$Struct({
    shrinkageEnableGSUB: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    shrinkageDisableGSUB: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    shrinkageEnableGPOS: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    shrinkageDisableGPOS: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    shrinkageJstfMax: new $6uUbQ$Pointer($6uUbQ$uint16, new (0, $7cbbe4e24ef3cb75$export$df0008c6ff2da22a)((0, $47e0e8ef515d9903$export$73a8cfb19cd43a0f))),
    extensionEnableGSUB: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    extensionDisableGSUB: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    extensionEnableGPOS: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    extensionDisableGPOS: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfGSUBModList),
    extensionJstfMax: new $6uUbQ$Pointer($6uUbQ$uint16, new (0, $7cbbe4e24ef3cb75$export$df0008c6ff2da22a)((0, $47e0e8ef515d9903$export$73a8cfb19cd43a0f)))
});
let $71cfb3c4767fbd0c$var$JstfLangSys = new $6uUbQ$Array(new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfPriority), $6uUbQ$uint16);
let $71cfb3c4767fbd0c$var$JstfLangSysRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    jstfLangSys: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfLangSys)
});
let $71cfb3c4767fbd0c$var$JstfScript = new $6uUbQ$Struct({
    extenderGlyphs: new $6uUbQ$Pointer($6uUbQ$uint16, new $6uUbQ$Array($6uUbQ$uint16, $6uUbQ$uint16)),
    defaultLangSys: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfLangSys),
    langSysCount: $6uUbQ$uint16,
    langSysRecords: new $6uUbQ$Array($71cfb3c4767fbd0c$var$JstfLangSysRecord, 'langSysCount')
});
let $71cfb3c4767fbd0c$var$JstfScriptRecord = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    script: new $6uUbQ$Pointer($6uUbQ$uint16, $71cfb3c4767fbd0c$var$JstfScript, {
        type: 'parent'
    })
});
var $71cfb3c4767fbd0c$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint32,
    scriptCount: $6uUbQ$uint16,
    scriptList: new $6uUbQ$Array($71cfb3c4767fbd0c$var$JstfScriptRecord, 'scriptCount')
});




// TODO: add this to restructure
class $d059a6bd2d3b5b63$var$VariableSizeNumber {
    decode(stream, parent) {
        switch(this.size(0, parent)){
            case 1:
                return stream.readUInt8();
            case 2:
                return stream.readUInt16BE();
            case 3:
                return stream.readUInt24BE();
            case 4:
                return stream.readUInt32BE();
        }
    }
    size(val, parent) {
        return (0, $6uUbQ$resolveLength)(this._size, null, parent);
    }
    constructor(size){
        this._size = size;
    }
}
let $d059a6bd2d3b5b63$var$MapDataEntry = new $6uUbQ$Struct({
    entry: new $d059a6bd2d3b5b63$var$VariableSizeNumber((t)=>((t.parent.entryFormat & 0x0030) >> 4) + 1),
    outerIndex: (t)=>t.entry >> (t.parent.entryFormat & 0x000F) + 1,
    innerIndex: (t)=>t.entry & (1 << (t.parent.entryFormat & 0x000F) + 1) - 1
});
let $d059a6bd2d3b5b63$var$DeltaSetIndexMap = new $6uUbQ$Struct({
    entryFormat: $6uUbQ$uint16,
    mapCount: $6uUbQ$uint16,
    mapData: new $6uUbQ$Array($d059a6bd2d3b5b63$var$MapDataEntry, 'mapCount')
});
var $d059a6bd2d3b5b63$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    majorVersion: $6uUbQ$uint16,
    minorVersion: $6uUbQ$uint16,
    itemVariationStore: new $6uUbQ$Pointer($6uUbQ$uint32, (0, $1a47b0c45c1c22fe$export$fe1b122a2710f241)),
    advanceWidthMapping: new $6uUbQ$Pointer($6uUbQ$uint32, $d059a6bd2d3b5b63$var$DeltaSetIndexMap),
    LSBMapping: new $6uUbQ$Pointer($6uUbQ$uint32, $d059a6bd2d3b5b63$var$DeltaSetIndexMap),
    RSBMapping: new $6uUbQ$Pointer($6uUbQ$uint32, $d059a6bd2d3b5b63$var$DeltaSetIndexMap)
});



let $dceeca3e1977ce30$var$Signature = new $6uUbQ$Struct({
    format: $6uUbQ$uint32,
    length: $6uUbQ$uint32,
    offset: $6uUbQ$uint32
});
let $dceeca3e1977ce30$var$SignatureBlock = new $6uUbQ$Struct({
    reserved: new $6uUbQ$Reserved($6uUbQ$uint16, 2),
    cbSignature: $6uUbQ$uint32,
    signature: new $6uUbQ$Buffer('cbSignature')
});
var $dceeca3e1977ce30$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    ulVersion: $6uUbQ$uint32,
    usNumSigs: $6uUbQ$uint16,
    usFlag: $6uUbQ$uint16,
    signatures: new $6uUbQ$Array($dceeca3e1977ce30$var$Signature, 'usNumSigs'),
    signatureBlocks: new $6uUbQ$Array($dceeca3e1977ce30$var$SignatureBlock, 'usNumSigs')
});



let $8acd740a9435aad0$var$GaspRange = new $6uUbQ$Struct({
    rangeMaxPPEM: $6uUbQ$uint16,
    rangeGaspBehavior: new $6uUbQ$Bitfield($6uUbQ$uint16, [
        'grayscale',
        'gridfit',
        'symmetricSmoothing',
        'symmetricGridfit' // only in version 1, for ClearType
    ])
});
var $8acd740a9435aad0$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    numRanges: $6uUbQ$uint16,
    gaspRanges: new $6uUbQ$Array($8acd740a9435aad0$var$GaspRange, 'numRanges') // Sorted by ppem
});



let $b5f380243c34d6a0$var$DeviceRecord = new $6uUbQ$Struct({
    pixelSize: $6uUbQ$uint8,
    maximumWidth: $6uUbQ$uint8,
    widths: new $6uUbQ$Array($6uUbQ$uint8, (t)=>t.parent.parent.maxp.numGlyphs)
});
var // The Horizontal Device Metrics table stores integer advance widths scaled to particular pixel sizes
$b5f380243c34d6a0$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    numRecords: $6uUbQ$int16,
    sizeDeviceRecord: $6uUbQ$int32,
    records: new $6uUbQ$Array($b5f380243c34d6a0$var$DeviceRecord, 'numRecords')
});



let $ca2df1256966e313$var$KernPair = new $6uUbQ$Struct({
    left: $6uUbQ$uint16,
    right: $6uUbQ$uint16,
    value: $6uUbQ$int16
});
let $ca2df1256966e313$var$ClassTable = new $6uUbQ$Struct({
    firstGlyph: $6uUbQ$uint16,
    nGlyphs: $6uUbQ$uint16,
    offsets: new $6uUbQ$Array($6uUbQ$uint16, 'nGlyphs'),
    max: (t)=>t.offsets.length && Math.max.apply(Math, t.offsets)
});
let $ca2df1256966e313$var$Kern2Array = new $6uUbQ$Struct({
    off: (t)=>t._startOffset - t.parent.parent._startOffset,
    len: (t)=>((t.parent.leftTable.max - t.off) / t.parent.rowWidth + 1) * (t.parent.rowWidth / 2),
    values: new $6uUbQ$LazyArray($6uUbQ$int16, 'len')
});
let $ca2df1256966e313$var$KernSubtable = new $6uUbQ$VersionedStruct('format', {
    0: {
        nPairs: $6uUbQ$uint16,
        searchRange: $6uUbQ$uint16,
        entrySelector: $6uUbQ$uint16,
        rangeShift: $6uUbQ$uint16,
        pairs: new $6uUbQ$Array($ca2df1256966e313$var$KernPair, 'nPairs')
    },
    2: {
        rowWidth: $6uUbQ$uint16,
        leftTable: new $6uUbQ$Pointer($6uUbQ$uint16, $ca2df1256966e313$var$ClassTable, {
            type: 'parent'
        }),
        rightTable: new $6uUbQ$Pointer($6uUbQ$uint16, $ca2df1256966e313$var$ClassTable, {
            type: 'parent'
        }),
        array: new $6uUbQ$Pointer($6uUbQ$uint16, $ca2df1256966e313$var$Kern2Array, {
            type: 'parent'
        })
    },
    3: {
        glyphCount: $6uUbQ$uint16,
        kernValueCount: $6uUbQ$uint8,
        leftClassCount: $6uUbQ$uint8,
        rightClassCount: $6uUbQ$uint8,
        flags: $6uUbQ$uint8,
        kernValue: new $6uUbQ$Array($6uUbQ$int16, 'kernValueCount'),
        leftClass: new $6uUbQ$Array($6uUbQ$uint8, 'glyphCount'),
        rightClass: new $6uUbQ$Array($6uUbQ$uint8, 'glyphCount'),
        kernIndex: new $6uUbQ$Array($6uUbQ$uint8, (t)=>t.leftClassCount * t.rightClassCount)
    }
});
let $ca2df1256966e313$var$KernTable = new $6uUbQ$VersionedStruct('version', {
    0: {
        subVersion: $6uUbQ$uint16,
        length: $6uUbQ$uint16,
        format: $6uUbQ$uint8,
        coverage: new $6uUbQ$Bitfield($6uUbQ$uint8, [
            'horizontal',
            'minimum',
            'crossStream',
            'override' // If set to 1 the value in this table replaces the accumulated value
        ]),
        subtable: $ca2df1256966e313$var$KernSubtable,
        padding: new $6uUbQ$Reserved($6uUbQ$uint8, (t)=>t.length - t._currentOffset)
    },
    1: {
        length: $6uUbQ$uint32,
        coverage: new $6uUbQ$Bitfield($6uUbQ$uint8, [
            null,
            null,
            null,
            null,
            null,
            'variation',
            'crossStream',
            'vertical' // Set if table has vertical kerning values
        ]),
        format: $6uUbQ$uint8,
        tupleIndex: $6uUbQ$uint16,
        subtable: $ca2df1256966e313$var$KernSubtable,
        padding: new $6uUbQ$Reserved($6uUbQ$uint8, (t)=>t.length - t._currentOffset)
    }
});
var $ca2df1256966e313$export$2e2bcd8739ae039 = new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
    0: {
        nTables: $6uUbQ$uint16,
        tables: new $6uUbQ$Array($ca2df1256966e313$var$KernTable, 'nTables')
    },
    1: {
        reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
        nTables: $6uUbQ$uint32,
        tables: new $6uUbQ$Array($ca2df1256966e313$var$KernTable, 'nTables')
    }
});



var // Linear Threshold table
// Records the ppem for each glyph at which the scaling becomes linear again,
// despite instructions effecting the advance width
$7a9f92b0c46ebe33$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    numGlyphs: $6uUbQ$uint16,
    yPels: new $6uUbQ$Array($6uUbQ$uint8, 'numGlyphs')
});



var // PCL 5 Table
// NOTE: The PCLT table is strongly discouraged for OpenType fonts with TrueType outlines
$2b2ccc419d152631$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    fontNumber: $6uUbQ$uint32,
    pitch: $6uUbQ$uint16,
    xHeight: $6uUbQ$uint16,
    style: $6uUbQ$uint16,
    typeFamily: $6uUbQ$uint16,
    capHeight: $6uUbQ$uint16,
    symbolSet: $6uUbQ$uint16,
    typeface: new $6uUbQ$String(16),
    characterComplement: new $6uUbQ$String(8),
    fileName: new $6uUbQ$String(6),
    strokeWeight: new $6uUbQ$String(1),
    widthType: new $6uUbQ$String(1),
    serifStyle: $6uUbQ$uint8,
    reserved: new $6uUbQ$Reserved($6uUbQ$uint8)
});



// VDMX tables contain ascender/descender overrides for certain (usually small)
// sizes. This is needed in order to match font metrics on Windows.
let $ca5b40b9bcda9c9b$var$Ratio = new $6uUbQ$Struct({
    bCharSet: $6uUbQ$uint8,
    xRatio: $6uUbQ$uint8,
    yStartRatio: $6uUbQ$uint8,
    yEndRatio: $6uUbQ$uint8 // Ending y-Ratio value
});
let $ca5b40b9bcda9c9b$var$vTable = new $6uUbQ$Struct({
    yPelHeight: $6uUbQ$uint16,
    yMax: $6uUbQ$int16,
    yMin: $6uUbQ$int16 // Minimum value (in pels) for this yPelHeight
});
let $ca5b40b9bcda9c9b$var$VdmxGroup = new $6uUbQ$Struct({
    recs: $6uUbQ$uint16,
    startsz: $6uUbQ$uint8,
    endsz: $6uUbQ$uint8,
    entries: new $6uUbQ$Array($ca5b40b9bcda9c9b$var$vTable, 'recs') // The VDMX records
});
var $ca5b40b9bcda9c9b$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    numRecs: $6uUbQ$uint16,
    numRatios: $6uUbQ$uint16,
    ratioRanges: new $6uUbQ$Array($ca5b40b9bcda9c9b$var$Ratio, 'numRatios'),
    offsets: new $6uUbQ$Array($6uUbQ$uint16, 'numRatios'),
    groups: new $6uUbQ$Array($ca5b40b9bcda9c9b$var$VdmxGroup, 'numRecs') // The actual VDMX groupings
});



var // Vertical Header Table
$69530a3c40755af0$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    ascent: $6uUbQ$int16,
    descent: $6uUbQ$int16,
    lineGap: $6uUbQ$int16,
    advanceHeightMax: $6uUbQ$int16,
    minTopSideBearing: $6uUbQ$int16,
    minBottomSideBearing: $6uUbQ$int16,
    yMaxExtent: $6uUbQ$int16,
    caretSlopeRise: $6uUbQ$int16,
    caretSlopeRun: $6uUbQ$int16,
    caretOffset: $6uUbQ$int16,
    reserved: new $6uUbQ$Reserved($6uUbQ$int16, 4),
    metricDataFormat: $6uUbQ$int16,
    numberOfMetrics: $6uUbQ$uint16 // Number of advance heights in the Vertical Metrics table
});



let $344073dd270f0e62$var$VmtxEntry = new $6uUbQ$Struct({
    advance: $6uUbQ$uint16,
    bearing: $6uUbQ$int16 // The top sidebearing of the glyph
});
var // Vertical Metrics Table
$344073dd270f0e62$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    metrics: new $6uUbQ$LazyArray($344073dd270f0e62$var$VmtxEntry, (t)=>t.parent.vhea.numberOfMetrics),
    bearings: new $6uUbQ$LazyArray($6uUbQ$int16, (t)=>t.parent.maxp.numGlyphs - t.parent.vhea.numberOfMetrics)
});



let $3793b781918cfced$var$shortFrac = new $6uUbQ$Fixed(16, 'BE', 14);
let $3793b781918cfced$var$Correspondence = new $6uUbQ$Struct({
    fromCoord: $3793b781918cfced$var$shortFrac,
    toCoord: $3793b781918cfced$var$shortFrac
});
let $3793b781918cfced$var$Segment = new $6uUbQ$Struct({
    pairCount: $6uUbQ$uint16,
    correspondence: new $6uUbQ$Array($3793b781918cfced$var$Correspondence, 'pairCount')
});
var $3793b781918cfced$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$fixed32,
    axisCount: $6uUbQ$uint32,
    segment: new $6uUbQ$Array($3793b781918cfced$var$Segment, 'axisCount')
});




class $6cb7dd5f47d82580$var$UnboundedArrayAccessor {
    getItem(index) {
        if (this._items[index] == null) {
            let pos = this.stream.pos;
            this.stream.pos = this.base + this.type.size(null, this.parent) * index;
            this._items[index] = this.type.decode(this.stream, this.parent);
            this.stream.pos = pos;
        }
        return this._items[index];
    }
    inspect() {
        return `[UnboundedArray ${this.type.constructor.name}]`;
    }
    constructor(type, stream, parent){
        this.type = type;
        this.stream = stream;
        this.parent = parent;
        this.base = this.stream.pos;
        this._items = [];
    }
}
class $6cb7dd5f47d82580$export$c5af1eebc882e39a extends $6uUbQ$Array {
    decode(stream, parent) {
        return new $6cb7dd5f47d82580$var$UnboundedArrayAccessor(this.type, stream, parent);
    }
    constructor(type){
        super(type, 0);
    }
}
let $6cb7dd5f47d82580$export$8351f8c2ae2f103c = function(ValueType = $6uUbQ$uint16) {
    // Helper class that makes internal structures invisible to pointers
    class Shadow {
        decode(stream, ctx) {
            ctx = ctx.parent.parent;
            return this.type.decode(stream, ctx);
        }
        size(val, ctx) {
            ctx = ctx.parent.parent;
            return this.type.size(val, ctx);
        }
        encode(stream, val, ctx) {
            ctx = ctx.parent.parent;
            return this.type.encode(stream, val, ctx);
        }
        constructor(type){
            this.type = type;
        }
    }
    ValueType = new Shadow(ValueType);
    let BinarySearchHeader = new $6uUbQ$Struct({
        unitSize: $6uUbQ$uint16,
        nUnits: $6uUbQ$uint16,
        searchRange: $6uUbQ$uint16,
        entrySelector: $6uUbQ$uint16,
        rangeShift: $6uUbQ$uint16
    });
    let LookupSegmentSingle = new $6uUbQ$Struct({
        lastGlyph: $6uUbQ$uint16,
        firstGlyph: $6uUbQ$uint16,
        value: ValueType
    });
    let LookupSegmentArray = new $6uUbQ$Struct({
        lastGlyph: $6uUbQ$uint16,
        firstGlyph: $6uUbQ$uint16,
        values: new $6uUbQ$Pointer($6uUbQ$uint16, new $6uUbQ$Array(ValueType, (t)=>t.lastGlyph - t.firstGlyph + 1), {
            type: 'parent'
        })
    });
    let LookupSingle = new $6uUbQ$Struct({
        glyph: $6uUbQ$uint16,
        value: ValueType
    });
    return new $6uUbQ$VersionedStruct($6uUbQ$uint16, {
        0: {
            values: new $6cb7dd5f47d82580$export$c5af1eebc882e39a(ValueType) // length == number of glyphs maybe?
        },
        2: {
            binarySearchHeader: BinarySearchHeader,
            segments: new $6uUbQ$Array(LookupSegmentSingle, (t)=>t.binarySearchHeader.nUnits)
        },
        4: {
            binarySearchHeader: BinarySearchHeader,
            segments: new $6uUbQ$Array(LookupSegmentArray, (t)=>t.binarySearchHeader.nUnits)
        },
        6: {
            binarySearchHeader: BinarySearchHeader,
            segments: new $6uUbQ$Array(LookupSingle, (t)=>t.binarySearchHeader.nUnits)
        },
        8: {
            firstGlyph: $6uUbQ$uint16,
            count: $6uUbQ$uint16,
            values: new $6uUbQ$Array(ValueType, 'count')
        }
    });
};
function $6cb7dd5f47d82580$export$79f7d93d790934ba(entryData = {}, lookupType = $6uUbQ$uint16) {
    let entry = Object.assign({
        newState: $6uUbQ$uint16,
        flags: $6uUbQ$uint16
    }, entryData);
    let Entry = new $6uUbQ$Struct(entry);
    let StateArray = new $6cb7dd5f47d82580$export$c5af1eebc882e39a(new $6uUbQ$Array($6uUbQ$uint16, (t)=>t.nClasses));
    let StateHeader = new $6uUbQ$Struct({
        nClasses: $6uUbQ$uint32,
        classTable: new $6uUbQ$Pointer($6uUbQ$uint32, new $6cb7dd5f47d82580$export$8351f8c2ae2f103c(lookupType)),
        stateArray: new $6uUbQ$Pointer($6uUbQ$uint32, StateArray),
        entryTable: new $6uUbQ$Pointer($6uUbQ$uint32, new $6cb7dd5f47d82580$export$c5af1eebc882e39a(Entry))
    });
    return StateHeader;
}
function $6cb7dd5f47d82580$export$105027425199cc51(entryData = {}, lookupType = $6uUbQ$uint16) {
    let ClassLookupTable = new $6uUbQ$Struct({
        version () {
            return 8;
        },
        firstGlyph: $6uUbQ$uint16,
        values: new $6uUbQ$Array($6uUbQ$uint8, $6uUbQ$uint16)
    });
    let entry = Object.assign({
        newStateOffset: $6uUbQ$uint16,
        // convert offset to stateArray index
        newState: (t)=>(t.newStateOffset - (t.parent.stateArray.base - t.parent._startOffset)) / t.parent.nClasses,
        flags: $6uUbQ$uint16
    }, entryData);
    let Entry = new $6uUbQ$Struct(entry);
    let StateArray = new $6cb7dd5f47d82580$export$c5af1eebc882e39a(new $6uUbQ$Array($6uUbQ$uint8, (t)=>t.nClasses));
    let StateHeader1 = new $6uUbQ$Struct({
        nClasses: $6uUbQ$uint16,
        classTable: new $6uUbQ$Pointer($6uUbQ$uint16, ClassLookupTable),
        stateArray: new $6uUbQ$Pointer($6uUbQ$uint16, StateArray),
        entryTable: new $6uUbQ$Pointer($6uUbQ$uint16, new $6cb7dd5f47d82580$export$c5af1eebc882e39a(Entry))
    });
    return StateHeader1;
}


let $6a3746e8c708f5a3$var$BslnSubtable = new $6uUbQ$VersionedStruct('format', {
    0: {
        deltas: new $6uUbQ$Array($6uUbQ$int16, 32)
    },
    1: {
        deltas: new $6uUbQ$Array($6uUbQ$int16, 32),
        mappingData: new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)($6uUbQ$uint16)
    },
    2: {
        standardGlyph: $6uUbQ$uint16,
        controlPoints: new $6uUbQ$Array($6uUbQ$uint16, 32)
    },
    3: {
        standardGlyph: $6uUbQ$uint16,
        controlPoints: new $6uUbQ$Array($6uUbQ$uint16, 32),
        mappingData: new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)($6uUbQ$uint16)
    }
});
var $6a3746e8c708f5a3$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$fixed32,
    format: $6uUbQ$uint16,
    defaultBaseline: $6uUbQ$uint16,
    subtable: $6a3746e8c708f5a3$var$BslnSubtable
});



let $d0c76fac617b308a$var$Setting = new $6uUbQ$Struct({
    setting: $6uUbQ$uint16,
    nameIndex: $6uUbQ$int16,
    name: (t)=>t.parent.parent.parent.name.records.fontFeatures[t.nameIndex]
});
let $d0c76fac617b308a$var$FeatureName = new $6uUbQ$Struct({
    feature: $6uUbQ$uint16,
    nSettings: $6uUbQ$uint16,
    settingTable: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array($d0c76fac617b308a$var$Setting, 'nSettings'), {
        type: 'parent'
    }),
    featureFlags: new $6uUbQ$Bitfield($6uUbQ$uint8, [
        null,
        null,
        null,
        null,
        null,
        null,
        'hasDefault',
        'exclusive'
    ]),
    defaultSetting: $6uUbQ$uint8,
    nameIndex: $6uUbQ$int16,
    name: (t)=>t.parent.parent.name.records.fontFeatures[t.nameIndex]
});
var $d0c76fac617b308a$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$fixed32,
    featureNameCount: $6uUbQ$uint16,
    reserved1: new $6uUbQ$Reserved($6uUbQ$uint16),
    reserved2: new $6uUbQ$Reserved($6uUbQ$uint32),
    featureNames: new $6uUbQ$Array($d0c76fac617b308a$var$FeatureName, 'featureNameCount')
});



let $e83fd065f00fcd01$var$Axis = new $6uUbQ$Struct({
    axisTag: new $6uUbQ$String(4),
    minValue: $6uUbQ$fixed32,
    defaultValue: $6uUbQ$fixed32,
    maxValue: $6uUbQ$fixed32,
    flags: $6uUbQ$uint16,
    nameID: $6uUbQ$uint16,
    name: (t)=>t.parent.parent.name.records.fontFeatures[t.nameID]
});
let $e83fd065f00fcd01$var$Instance = new $6uUbQ$Struct({
    nameID: $6uUbQ$uint16,
    name: (t)=>t.parent.parent.name.records.fontFeatures[t.nameID],
    flags: $6uUbQ$uint16,
    coord: new $6uUbQ$Array($6uUbQ$fixed32, (t)=>t.parent.axisCount),
    postscriptNameID: new $6uUbQ$Optional($6uUbQ$uint16, (t)=>t.parent.instanceSize - t._currentOffset > 0)
});
var $e83fd065f00fcd01$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$fixed32,
    offsetToData: $6uUbQ$uint16,
    countSizePairs: $6uUbQ$uint16,
    axisCount: $6uUbQ$uint16,
    axisSize: $6uUbQ$uint16,
    instanceCount: $6uUbQ$uint16,
    instanceSize: $6uUbQ$uint16,
    axis: new $6uUbQ$Array($e83fd065f00fcd01$var$Axis, 'axisCount'),
    instance: new $6uUbQ$Array($e83fd065f00fcd01$var$Instance, 'instanceCount')
});



let $dbe33c8d3a7f131c$var$shortFrac = new $6uUbQ$Fixed(16, 'BE', 14);
class $dbe33c8d3a7f131c$var$Offset {
    static decode(stream, parent) {
        // In short format, offsets are multiplied by 2.
        // This doesn't seem to be documented by Apple, but it
        // is implemented this way in Freetype.
        return parent.flags ? stream.readUInt32BE() : stream.readUInt16BE() * 2;
    }
}
let $dbe33c8d3a7f131c$var$gvar = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
    axisCount: $6uUbQ$uint16,
    globalCoordCount: $6uUbQ$uint16,
    globalCoords: new $6uUbQ$Pointer($6uUbQ$uint32, new $6uUbQ$Array(new $6uUbQ$Array($dbe33c8d3a7f131c$var$shortFrac, 'axisCount'), 'globalCoordCount')),
    glyphCount: $6uUbQ$uint16,
    flags: $6uUbQ$uint16,
    offsetToData: $6uUbQ$uint32,
    offsets: new $6uUbQ$Array(new $6uUbQ$Pointer($dbe33c8d3a7f131c$var$Offset, 'void', {
        relativeTo: (ctx)=>ctx.offsetToData,
        allowNull: false
    }), (t)=>t.glyphCount + 1)
});
var $dbe33c8d3a7f131c$export$2e2bcd8739ae039 = $dbe33c8d3a7f131c$var$gvar;




let $05b01887df96c4ee$var$ClassTable = new $6uUbQ$Struct({
    length: $6uUbQ$uint16,
    coverage: $6uUbQ$uint16,
    subFeatureFlags: $6uUbQ$uint32,
    stateTable: new (0, $6cb7dd5f47d82580$export$105027425199cc51)
});
let $05b01887df96c4ee$var$WidthDeltaRecord = new $6uUbQ$Struct({
    justClass: $6uUbQ$uint32,
    beforeGrowLimit: $6uUbQ$fixed32,
    beforeShrinkLimit: $6uUbQ$fixed32,
    afterGrowLimit: $6uUbQ$fixed32,
    afterShrinkLimit: $6uUbQ$fixed32,
    growFlags: $6uUbQ$uint16,
    shrinkFlags: $6uUbQ$uint16
});
let $05b01887df96c4ee$var$WidthDeltaCluster = new $6uUbQ$Array($05b01887df96c4ee$var$WidthDeltaRecord, $6uUbQ$uint32);
let $05b01887df96c4ee$var$ActionData = new $6uUbQ$VersionedStruct('actionType', {
    0: {
        lowerLimit: $6uUbQ$fixed32,
        upperLimit: $6uUbQ$fixed32,
        order: $6uUbQ$uint16,
        glyphs: new $6uUbQ$Array($6uUbQ$uint16, $6uUbQ$uint16)
    },
    1: {
        addGlyph: $6uUbQ$uint16
    },
    2: {
        substThreshold: $6uUbQ$fixed32,
        addGlyph: $6uUbQ$uint16,
        substGlyph: $6uUbQ$uint16
    },
    3: {},
    4: {
        variationAxis: $6uUbQ$uint32,
        minimumLimit: $6uUbQ$fixed32,
        noStretchValue: $6uUbQ$fixed32,
        maximumLimit: $6uUbQ$fixed32
    },
    5: {
        flags: $6uUbQ$uint16,
        glyph: $6uUbQ$uint16
    }
});
let $05b01887df96c4ee$var$Action = new $6uUbQ$Struct({
    actionClass: $6uUbQ$uint16,
    actionType: $6uUbQ$uint16,
    actionLength: $6uUbQ$uint32,
    actionData: $05b01887df96c4ee$var$ActionData,
    padding: new $6uUbQ$Reserved($6uUbQ$uint8, (t)=>t.actionLength - t._currentOffset)
});
let $05b01887df96c4ee$var$PostcompensationAction = new $6uUbQ$Array($05b01887df96c4ee$var$Action, $6uUbQ$uint32);
let $05b01887df96c4ee$var$PostCompensationTable = new $6uUbQ$Struct({
    lookupTable: new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)(new $6uUbQ$Pointer($6uUbQ$uint16, $05b01887df96c4ee$var$PostcompensationAction))
});
let $05b01887df96c4ee$var$JustificationTable = new $6uUbQ$Struct({
    classTable: new $6uUbQ$Pointer($6uUbQ$uint16, $05b01887df96c4ee$var$ClassTable, {
        type: 'parent'
    }),
    wdcOffset: $6uUbQ$uint16,
    postCompensationTable: new $6uUbQ$Pointer($6uUbQ$uint16, $05b01887df96c4ee$var$PostCompensationTable, {
        type: 'parent'
    }),
    widthDeltaClusters: new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)(new $6uUbQ$Pointer($6uUbQ$uint16, $05b01887df96c4ee$var$WidthDeltaCluster, {
        type: 'parent',
        relativeTo: (ctx)=>ctx.wdcOffset
    }))
});
var $05b01887df96c4ee$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint32,
    format: $6uUbQ$uint16,
    horizontal: new $6uUbQ$Pointer($6uUbQ$uint16, $05b01887df96c4ee$var$JustificationTable),
    vertical: new $6uUbQ$Pointer($6uUbQ$uint16, $05b01887df96c4ee$var$JustificationTable)
});




let $03ee6ebd54db1053$var$LigatureData = {
    action: $6uUbQ$uint16
};
let $03ee6ebd54db1053$var$ContextualData = {
    markIndex: $6uUbQ$uint16,
    currentIndex: $6uUbQ$uint16
};
let $03ee6ebd54db1053$var$InsertionData = {
    currentInsertIndex: $6uUbQ$uint16,
    markedInsertIndex: $6uUbQ$uint16
};
let $03ee6ebd54db1053$var$SubstitutionTable = new $6uUbQ$Struct({
    items: new (0, $6cb7dd5f47d82580$export$c5af1eebc882e39a)(new $6uUbQ$Pointer($6uUbQ$uint32, new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)))
});
let $03ee6ebd54db1053$var$SubtableData = new $6uUbQ$VersionedStruct('type', {
    0: {
        stateTable: new (0, $6cb7dd5f47d82580$export$79f7d93d790934ba)
    },
    1: {
        stateTable: new (0, $6cb7dd5f47d82580$export$79f7d93d790934ba)($03ee6ebd54db1053$var$ContextualData),
        substitutionTable: new $6uUbQ$Pointer($6uUbQ$uint32, $03ee6ebd54db1053$var$SubstitutionTable)
    },
    2: {
        stateTable: new (0, $6cb7dd5f47d82580$export$79f7d93d790934ba)($03ee6ebd54db1053$var$LigatureData),
        ligatureActions: new $6uUbQ$Pointer($6uUbQ$uint32, new (0, $6cb7dd5f47d82580$export$c5af1eebc882e39a)($6uUbQ$uint32)),
        components: new $6uUbQ$Pointer($6uUbQ$uint32, new (0, $6cb7dd5f47d82580$export$c5af1eebc882e39a)($6uUbQ$uint16)),
        ligatureList: new $6uUbQ$Pointer($6uUbQ$uint32, new (0, $6cb7dd5f47d82580$export$c5af1eebc882e39a)($6uUbQ$uint16))
    },
    4: {
        lookupTable: new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)
    },
    5: {
        stateTable: new (0, $6cb7dd5f47d82580$export$79f7d93d790934ba)($03ee6ebd54db1053$var$InsertionData),
        insertionActions: new $6uUbQ$Pointer($6uUbQ$uint32, new (0, $6cb7dd5f47d82580$export$c5af1eebc882e39a)($6uUbQ$uint16))
    }
});
let $03ee6ebd54db1053$var$Subtable = new $6uUbQ$Struct({
    length: $6uUbQ$uint32,
    coverage: $6uUbQ$uint24,
    type: $6uUbQ$uint8,
    subFeatureFlags: $6uUbQ$uint32,
    table: $03ee6ebd54db1053$var$SubtableData,
    padding: new $6uUbQ$Reserved($6uUbQ$uint8, (t)=>t.length - t._currentOffset)
});
let $03ee6ebd54db1053$var$FeatureEntry = new $6uUbQ$Struct({
    featureType: $6uUbQ$uint16,
    featureSetting: $6uUbQ$uint16,
    enableFlags: $6uUbQ$uint32,
    disableFlags: $6uUbQ$uint32
});
let $03ee6ebd54db1053$var$MorxChain = new $6uUbQ$Struct({
    defaultFlags: $6uUbQ$uint32,
    chainLength: $6uUbQ$uint32,
    nFeatureEntries: $6uUbQ$uint32,
    nSubtables: $6uUbQ$uint32,
    features: new $6uUbQ$Array($03ee6ebd54db1053$var$FeatureEntry, 'nFeatureEntries'),
    subtables: new $6uUbQ$Array($03ee6ebd54db1053$var$Subtable, 'nSubtables')
});
var $03ee6ebd54db1053$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$uint16,
    unused: new $6uUbQ$Reserved($6uUbQ$uint16),
    nChains: $6uUbQ$uint32,
    chains: new $6uUbQ$Array($03ee6ebd54db1053$var$MorxChain, 'nChains')
});




let $b7492a80b0d1a056$var$OpticalBounds = new $6uUbQ$Struct({
    left: $6uUbQ$int16,
    top: $6uUbQ$int16,
    right: $6uUbQ$int16,
    bottom: $6uUbQ$int16
});
var $b7492a80b0d1a056$export$2e2bcd8739ae039 = new $6uUbQ$Struct({
    version: $6uUbQ$fixed32,
    format: $6uUbQ$uint16,
    lookupTable: new (0, $6cb7dd5f47d82580$export$8351f8c2ae2f103c)($b7492a80b0d1a056$var$OpticalBounds)
});


let $c3395722bea751e2$var$tables = {};
var $c3395722bea751e2$export$2e2bcd8739ae039 = $c3395722bea751e2$var$tables;
$c3395722bea751e2$var$tables.cmap = (0, $26a62205ad06574e$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.head = (0, $f2612a29f92ac062$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.hhea = (0, $2c179dd593583073$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.hmtx = (0, $bdc9060542264b85$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.maxp = (0, $dbf51cb3d3fe409d$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.name = (0, $2bcf221753ec8e32$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables['OS/2'] = (0, $84b272aa31b70606$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.post = (0, $32d9e2eb9565d93c$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.fpgm = (0, $5c0f37ca5ffb1850$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.loca = (0, $2b2b260902b1c57e$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.prep = (0, $7afb878c7bea4f66$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables['cvt '] = (0, $5202bd9d9ad8eaac$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.glyf = (0, $6c92b6371bce8bd9$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables['CFF '] = (0, $822ac0d589e4e237$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables['CFF2'] = (0, $822ac0d589e4e237$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.VORG = (0, $2bbf2bc1ce37cd8f$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.EBLC = (0, $9911c4c7201c13de$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.CBLC = $c3395722bea751e2$var$tables.EBLC;
$c3395722bea751e2$var$tables.sbix = (0, $abb847051efd51b1$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.COLR = (0, $eb629188f3dfefdd$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.CPAL = (0, $08734b8e7dc64587$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.BASE = (0, $497cef411d884e34$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.GDEF = (0, $cf5f33c63ef209e6$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.GPOS = (0, $47e0e8ef515d9903$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.GSUB = (0, $d3f442064af66e06$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.JSTF = (0, $71cfb3c4767fbd0c$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.HVAR = (0, $d059a6bd2d3b5b63$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.DSIG = (0, $dceeca3e1977ce30$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.gasp = (0, $8acd740a9435aad0$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.hdmx = (0, $b5f380243c34d6a0$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.kern = (0, $ca2df1256966e313$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.LTSH = (0, $7a9f92b0c46ebe33$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.PCLT = (0, $2b2ccc419d152631$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.VDMX = (0, $ca5b40b9bcda9c9b$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.vhea = (0, $69530a3c40755af0$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.vmtx = (0, $344073dd270f0e62$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.avar = (0, $3793b781918cfced$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.bsln = (0, $6a3746e8c708f5a3$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.feat = (0, $d0c76fac617b308a$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.fvar = (0, $e83fd065f00fcd01$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.gvar = (0, $dbe33c8d3a7f131c$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.just = (0, $05b01887df96c4ee$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.morx = (0, $03ee6ebd54db1053$export$2e2bcd8739ae039);
$c3395722bea751e2$var$tables.opbd = (0, $b7492a80b0d1a056$export$2e2bcd8739ae039);


let $816c07a04b6dba87$var$TableEntry = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    checkSum: $6uUbQ$uint32,
    offset: new $6uUbQ$Pointer($6uUbQ$uint32, 'void', {
        type: 'global'
    }),
    length: $6uUbQ$uint32
});
let $816c07a04b6dba87$var$Directory = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    numTables: $6uUbQ$uint16,
    searchRange: $6uUbQ$uint16,
    entrySelector: $6uUbQ$uint16,
    rangeShift: $6uUbQ$uint16,
    tables: new $6uUbQ$Array($816c07a04b6dba87$var$TableEntry, 'numTables')
});
$816c07a04b6dba87$var$Directory.process = function() {
    let tables = {};
    for (let table of this.tables)tables[table.tag] = table;
    this.tables = tables;
};
$816c07a04b6dba87$var$Directory.preEncode = function() {
    if (!Array.isArray(this.tables)) {
        let tables = [];
        for(let tag in this.tables){
            let table = this.tables[tag];
            if (table) tables.push({
                tag: tag,
                checkSum: 0,
                offset: new $6uUbQ$VoidPointer((0, $c3395722bea751e2$export$2e2bcd8739ae039)[tag], table),
                length: (0, $c3395722bea751e2$export$2e2bcd8739ae039)[tag].size(table)
            });
        }
        this.tables = tables;
    }
    this.tag = 'true';
    this.numTables = this.tables.length;
    let maxExponentFor2 = Math.floor(Math.log(this.numTables) / Math.LN2);
    let maxPowerOf2 = Math.pow(2, maxExponentFor2);
    this.searchRange = maxPowerOf2 * 16;
    this.entrySelector = Math.log(maxPowerOf2) / Math.LN2;
    this.rangeShift = this.numTables * 16 - this.searchRange;
};
var $816c07a04b6dba87$export$2e2bcd8739ae039 = $816c07a04b6dba87$var$Directory;




function $12727730ddfc8bfe$export$2e0ae67339d5f1ac(arr, cmp) {
    let min = 0;
    let max = arr.length - 1;
    while(min <= max){
        let mid = min + max >> 1;
        let res = cmp(arr[mid]);
        if (res < 0) max = mid - 1;
        else if (res > 0) min = mid + 1;
        else return mid;
    }
    return -1;
}
function $12727730ddfc8bfe$export$d02631cccf789723(index, end) {
    let range = [];
    while(index < end)range.push(index++);
    return range;
}
const $12727730ddfc8bfe$export$3d28c1996ced1f14 = new TextDecoder('ascii');
// Based on https://github.com/niklasvh/base64-arraybuffer. MIT license.
const $12727730ddfc8bfe$var$CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const $12727730ddfc8bfe$var$LOOKUP = new Uint8Array(256);
for(let i = 0; i < $12727730ddfc8bfe$var$CHARS.length; i++)$12727730ddfc8bfe$var$LOOKUP[$12727730ddfc8bfe$var$CHARS.charCodeAt(i)] = i;
function $12727730ddfc8bfe$export$94fdf11bafc8de6b(base64) {
    let bufferLength = base64.length * 0.75;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') bufferLength--;
    }
    let bytes = new Uint8Array(bufferLength);
    let p = 0;
    for(let i = 0, len = base64.length; i < len; i += 4){
        let encoded1 = $12727730ddfc8bfe$var$LOOKUP[base64.charCodeAt(i)];
        let encoded2 = $12727730ddfc8bfe$var$LOOKUP[base64.charCodeAt(i + 1)];
        let encoded3 = $12727730ddfc8bfe$var$LOOKUP[base64.charCodeAt(i + 2)];
        let encoded4 = $12727730ddfc8bfe$var$LOOKUP[base64.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return bytes;
}




class $f08dd41ef10b694c$export$2e2bcd8739ae039 {
    findSubtable(cmapTable, pairs) {
        for (let [platformID, encodingID] of pairs)for (let cmap of cmapTable.tables){
            if (cmap.platformID === platformID && cmap.encodingID === encodingID) return cmap.table;
        }
        return null;
    }
    lookup(codepoint, variationSelector) {
        // If there is no Unicode cmap in this font, we need to re-encode
        // the codepoint in the encoding that the cmap supports.
        if (this.encoding) codepoint = this.encoding.get(codepoint) || codepoint;
        else if (variationSelector) {
            let gid = this.getVariationSelector(codepoint, variationSelector);
            if (gid) return gid;
        }
        let cmap = this.cmap;
        switch(cmap.version){
            case 0:
                return cmap.codeMap.get(codepoint) || 0;
            case 4:
                {
                    let min = 0;
                    let max = cmap.segCount - 1;
                    while(min <= max){
                        let mid = min + max >> 1;
                        if (codepoint < cmap.startCode.get(mid)) max = mid - 1;
                        else if (codepoint > cmap.endCode.get(mid)) min = mid + 1;
                        else {
                            let rangeOffset = cmap.idRangeOffset.get(mid);
                            let gid;
                            if (rangeOffset === 0) gid = codepoint + cmap.idDelta.get(mid);
                            else {
                                let index = rangeOffset / 2 + (codepoint - cmap.startCode.get(mid)) - (cmap.segCount - mid);
                                gid = cmap.glyphIndexArray.get(index) || 0;
                                if (gid !== 0) gid += cmap.idDelta.get(mid);
                            }
                            return gid & 0xffff;
                        }
                    }
                    return 0;
                }
            case 8:
                throw new Error('TODO: cmap format 8');
            case 6:
            case 10:
                return cmap.glyphIndices.get(codepoint - cmap.firstCode) || 0;
            case 12:
            case 13:
                {
                    let min = 0;
                    let max = cmap.nGroups - 1;
                    while(min <= max){
                        let mid = min + max >> 1;
                        let group = cmap.groups.get(mid);
                        if (codepoint < group.startCharCode) max = mid - 1;
                        else if (codepoint > group.endCharCode) min = mid + 1;
                        else {
                            if (cmap.version === 12) return group.glyphID + (codepoint - group.startCharCode);
                            else return group.glyphID;
                        }
                    }
                    return 0;
                }
            case 14:
                throw new Error('TODO: cmap format 14');
            default:
                throw new Error(`Unknown cmap format ${cmap.version}`);
        }
    }
    getVariationSelector(codepoint, variationSelector) {
        if (!this.uvs) return 0;
        let selectors = this.uvs.varSelectors.toArray();
        let i = (0, $12727730ddfc8bfe$export$2e0ae67339d5f1ac)(selectors, (x)=>variationSelector - x.varSelector);
        let sel = selectors[i];
        if (i !== -1 && sel.defaultUVS) i = (0, $12727730ddfc8bfe$export$2e0ae67339d5f1ac)(sel.defaultUVS, (x)=>codepoint < x.startUnicodeValue ? -1 : codepoint > x.startUnicodeValue + x.additionalCount ? 1 : 0);
        if (i !== -1 && sel.nonDefaultUVS) {
            i = (0, $12727730ddfc8bfe$export$2e0ae67339d5f1ac)(sel.nonDefaultUVS, (x)=>codepoint - x.unicodeValue);
            if (i !== -1) return sel.nonDefaultUVS[i].glyphID;
        }
        return 0;
    }
    getCharacterSet() {
        let cmap = this.cmap;
        switch(cmap.version){
            case 0:
                return (0, $12727730ddfc8bfe$export$d02631cccf789723)(0, cmap.codeMap.length);
            case 4:
                {
                    let res = [];
                    let endCodes = cmap.endCode.toArray();
                    for(let i = 0; i < endCodes.length; i++){
                        let tail = endCodes[i] + 1;
                        let start = cmap.startCode.get(i);
                        res.push(...(0, $12727730ddfc8bfe$export$d02631cccf789723)(start, tail));
                    }
                    return res;
                }
            case 8:
                throw new Error('TODO: cmap format 8');
            case 6:
            case 10:
                return (0, $12727730ddfc8bfe$export$d02631cccf789723)(cmap.firstCode, cmap.firstCode + cmap.glyphIndices.length);
            case 12:
            case 13:
                {
                    let res = [];
                    for (let group of cmap.groups.toArray())res.push(...(0, $12727730ddfc8bfe$export$d02631cccf789723)(group.startCharCode, group.endCharCode + 1));
                    return res;
                }
            case 14:
                throw new Error('TODO: cmap format 14');
            default:
                throw new Error(`Unknown cmap format ${cmap.version}`);
        }
    }
    codePointsForGlyph(gid) {
        let cmap = this.cmap;
        switch(cmap.version){
            case 0:
                {
                    let res = [];
                    for(let i = 0; i < 256; i++)if (cmap.codeMap.get(i) === gid) res.push(i);
                    return res;
                }
            case 4:
                {
                    let res = [];
                    for(let i = 0; i < cmap.segCount; i++){
                        let end = cmap.endCode.get(i);
                        let start = cmap.startCode.get(i);
                        let rangeOffset = cmap.idRangeOffset.get(i);
                        let delta = cmap.idDelta.get(i);
                        for(var c = start; c <= end; c++){
                            let g = 0;
                            if (rangeOffset === 0) g = c + delta;
                            else {
                                let index = rangeOffset / 2 + (c - start) - (cmap.segCount - i);
                                g = cmap.glyphIndexArray.get(index) || 0;
                                if (g !== 0) g += delta;
                            }
                            if (g === gid) res.push(c);
                        }
                    }
                    return res;
                }
            case 12:
                {
                    let res = [];
                    for (let group of cmap.groups.toArray())if (gid >= group.glyphID && gid <= group.glyphID + (group.endCharCode - group.startCharCode)) res.push(group.startCharCode + (gid - group.glyphID));
                    return res;
                }
            case 13:
                {
                    let res = [];
                    for (let group of cmap.groups.toArray())if (gid === group.glyphID) res.push(...(0, $12727730ddfc8bfe$export$d02631cccf789723)(group.startCharCode, group.endCharCode + 1));
                    return res;
                }
            default:
                throw new Error(`Unknown cmap format ${cmap.version}`);
        }
    }
    constructor(cmapTable){
        // Attempt to find a Unicode cmap first
        this.encoding = null;
        this.cmap = this.findSubtable(cmapTable, [
            // 32-bit subtables
            [
                3,
                10
            ],
            [
                0,
                6
            ],
            [
                0,
                4
            ],
            // 16-bit subtables
            [
                3,
                1
            ],
            [
                0,
                3
            ],
            [
                0,
                2
            ],
            [
                0,
                1
            ],
            [
                0,
                0
            ]
        ]);
        // If not unicode cmap was found, take the first table with a supported encoding.
        if (!this.cmap) for (let cmap of cmapTable.tables){
            let encoding = (0, $e449ad78d50845fe$export$badc544e0651b6b1)(cmap.platformID, cmap.encodingID, cmap.table.language - 1);
            let mapping = (0, $e449ad78d50845fe$export$1dceb3c14ed68bee)(encoding);
            if (mapping) {
                this.cmap = cmap.table;
                this.encoding = mapping;
            }
        }
        if (!this.cmap) throw new Error("Could not find a supported cmap table");
        this.uvs = this.findSubtable(cmapTable, [
            [
                0,
                5
            ]
        ]);
        if (this.uvs && this.uvs.version !== 14) this.uvs = null;
    }
}
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f08dd41ef10b694c$export$2e2bcd8739ae039.prototype, "getCharacterSet", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f08dd41ef10b694c$export$2e2bcd8739ae039.prototype, "codePointsForGlyph", null);



class $0bba3a9db57637f3$export$2e2bcd8739ae039 {
    process(glyphs, positions) {
        for(let glyphIndex = 0; glyphIndex < glyphs.length - 1; glyphIndex++){
            let left = glyphs[glyphIndex].id;
            let right = glyphs[glyphIndex + 1].id;
            positions[glyphIndex].xAdvance += this.getKerning(left, right);
        }
    }
    getKerning(left, right) {
        let res = 0;
        for (let table of this.kern.tables){
            if (table.coverage.crossStream) continue;
            switch(table.version){
                case 0:
                    if (!table.coverage.horizontal) continue;
                    break;
                case 1:
                    if (table.coverage.vertical || table.coverage.variation) continue;
                    break;
                default:
                    throw new Error(`Unsupported kerning table version ${table.version}`);
            }
            let val = 0;
            let s = table.subtable;
            switch(table.format){
                case 0:
                    let pairIdx = (0, $12727730ddfc8bfe$export$2e0ae67339d5f1ac)(s.pairs, function(pair) {
                        return left - pair.left || right - pair.right;
                    });
                    if (pairIdx >= 0) val = s.pairs[pairIdx].value;
                    break;
                case 2:
                    let leftOffset = 0, rightOffset = 0;
                    if (left >= s.leftTable.firstGlyph && left < s.leftTable.firstGlyph + s.leftTable.nGlyphs) leftOffset = s.leftTable.offsets[left - s.leftTable.firstGlyph];
                    else leftOffset = s.array.off;
                    if (right >= s.rightTable.firstGlyph && right < s.rightTable.firstGlyph + s.rightTable.nGlyphs) rightOffset = s.rightTable.offsets[right - s.rightTable.firstGlyph];
                    let index = (leftOffset + rightOffset - s.array.off) / 2;
                    val = s.array.values.get(index);
                    break;
                case 3:
                    if (left >= s.glyphCount || right >= s.glyphCount) return 0;
                    val = s.kernValue[s.kernIndex[s.leftClass[left] * s.rightClassCount + s.rightClass[right]]];
                    break;
                default:
                    throw new Error(`Unsupported kerning sub-table format ${table.format}`);
            }
            // Microsoft supports the override flag, which resets the result
            // Otherwise, the sum of the results from all subtables is returned
            if (table.coverage.override) res = val;
            else res += val;
        }
        return res;
    }
    constructor(font){
        this.kern = font.kern;
    }
}



class $0a4bdfeb6dfd6f5e$export$2e2bcd8739ae039 {
    positionGlyphs(glyphs, positions) {
        // find each base + mark cluster, and position the marks relative to the base
        let clusterStart = 0;
        let clusterEnd = 0;
        for(let index = 0; index < glyphs.length; index++){
            let glyph = glyphs[index];
            if (glyph.isMark) clusterEnd = index;
            else {
                if (clusterStart !== clusterEnd) this.positionCluster(glyphs, positions, clusterStart, clusterEnd);
                clusterStart = clusterEnd = index;
            }
        }
        if (clusterStart !== clusterEnd) this.positionCluster(glyphs, positions, clusterStart, clusterEnd);
        return positions;
    }
    positionCluster(glyphs, positions, clusterStart, clusterEnd) {
        let base = glyphs[clusterStart];
        let baseBox = base.cbox.copy();
        // adjust bounding box for ligature glyphs
        if (base.codePoints.length > 1) // LTR. TODO: RTL support.
        baseBox.minX += (base.codePoints.length - 1) * baseBox.width / base.codePoints.length;
        let xOffset = -positions[clusterStart].xAdvance;
        let yOffset = 0;
        let yGap = this.font.unitsPerEm / 16;
        // position each of the mark glyphs relative to the base glyph
        for(let index = clusterStart + 1; index <= clusterEnd; index++){
            let mark = glyphs[index];
            let markBox = mark.cbox;
            let position = positions[index];
            let combiningClass = this.getCombiningClass(mark.codePoints[0]);
            if (combiningClass !== 'Not_Reordered') {
                position.xOffset = position.yOffset = 0;
                // x positioning
                switch(combiningClass){
                    case 'Double_Above':
                    case 'Double_Below':
                        // LTR. TODO: RTL support.
                        position.xOffset += baseBox.minX - markBox.width / 2 - markBox.minX;
                        break;
                    case 'Attached_Below_Left':
                    case 'Below_Left':
                    case 'Above_Left':
                        // left align
                        position.xOffset += baseBox.minX - markBox.minX;
                        break;
                    case 'Attached_Above_Right':
                    case 'Below_Right':
                    case 'Above_Right':
                        // right align
                        position.xOffset += baseBox.maxX - markBox.width - markBox.minX;
                        break;
                    default:
                        // center align
                        position.xOffset += baseBox.minX + (baseBox.width - markBox.width) / 2 - markBox.minX;
                }
                // y positioning
                switch(combiningClass){
                    case 'Double_Below':
                    case 'Below_Left':
                    case 'Below':
                    case 'Below_Right':
                    case 'Attached_Below_Left':
                    case 'Attached_Below':
                        // add a small gap between the glyphs if they are not attached
                        if (combiningClass === 'Attached_Below_Left' || combiningClass === 'Attached_Below') baseBox.minY += yGap;
                        position.yOffset = -baseBox.minY - markBox.maxY;
                        baseBox.minY += markBox.height;
                        break;
                    case 'Double_Above':
                    case 'Above_Left':
                    case 'Above':
                    case 'Above_Right':
                    case 'Attached_Above':
                    case 'Attached_Above_Right':
                        // add a small gap between the glyphs if they are not attached
                        if (combiningClass === 'Attached_Above' || combiningClass === 'Attached_Above_Right') baseBox.maxY += yGap;
                        position.yOffset = baseBox.maxY - markBox.minY;
                        baseBox.maxY += markBox.height;
                        break;
                }
                position.xAdvance = position.yAdvance = 0;
                position.xOffset += xOffset;
                position.yOffset += yOffset;
            } else {
                xOffset -= position.xAdvance;
                yOffset -= position.yAdvance;
            }
        }
        return;
    }
    getCombiningClass(codePoint) {
        let combiningClass = (0, $6uUbQ$getCombiningClass)(codePoint);
        // Thai / Lao need some per-character work
        if ((codePoint & -256) === 0x0e00) {
            if (combiningClass === 'Not_Reordered') switch(codePoint){
                case 0x0e31:
                case 0x0e34:
                case 0x0e35:
                case 0x0e36:
                case 0x0e37:
                case 0x0e47:
                case 0x0e4c:
                case 0x0e3d:
                case 0x0e4e:
                    return 'Above_Right';
                case 0x0eb1:
                case 0x0eb4:
                case 0x0eb5:
                case 0x0eb6:
                case 0x0eb7:
                case 0x0ebb:
                case 0x0ecc:
                case 0x0ecd:
                    return 'Above';
                case 0x0ebc:
                    return 'Below';
            }
            else if (codePoint === 0x0e3a) return 'Below_Right';
        }
        switch(combiningClass){
            // Hebrew
            case 'CCC10':
            case 'CCC11':
            case 'CCC12':
            case 'CCC13':
            case 'CCC14':
            case 'CCC15':
            case 'CCC16':
            case 'CCC17':
            case 'CCC18':
            case 'CCC20':
            case 'CCC22':
                return 'Below';
            case 'CCC23':
                return 'Attached_Above';
            case 'CCC24':
                return 'Above_Right';
            case 'CCC25':
            case 'CCC19':
                return 'Above_Left';
            case 'CCC26':
                return 'Above';
            case 'CCC21':
                break;
            // Arabic and Syriac
            case 'CCC27':
            case 'CCC28':
            case 'CCC30':
            case 'CCC31':
            case 'CCC33':
            case 'CCC34':
            case 'CCC35':
            case 'CCC36':
                return 'Above';
            case 'CCC29':
            case 'CCC32':
                return 'Below';
            // Thai
            case 'CCC103':
                return 'Below_Right';
            case 'CCC107':
                return 'Above_Right';
            // Lao
            case 'CCC118':
                return 'Below';
            case 'CCC122':
                return 'Above';
            // Tibetan
            case 'CCC129':
            case 'CCC132':
                return 'Below';
            case 'CCC130':
                return 'Above';
        }
        return combiningClass;
    }
    constructor(font){
        this.font = font;
    }
}


/**
 * Represents a glyph bounding box
 */ class $f34600ab9d7f70d8$export$2e2bcd8739ae039 {
    /**
   * The width of the bounding box
   * @type {number}
   */ get width() {
        return this.maxX - this.minX;
    }
    /**
   * The height of the bounding box
   * @type {number}
   */ get height() {
        return this.maxY - this.minY;
    }
    addPoint(x, y) {
        if (Math.abs(x) !== Infinity) {
            if (x < this.minX) this.minX = x;
            if (x > this.maxX) this.maxX = x;
        }
        if (Math.abs(y) !== Infinity) {
            if (y < this.minY) this.minY = y;
            if (y > this.maxY) this.maxY = y;
        }
    }
    copy() {
        return new $f34600ab9d7f70d8$export$2e2bcd8739ae039(this.minX, this.minY, this.maxX, this.maxY);
    }
    constructor(minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity){
        /**
     * The minimum X position in the bounding box
     * @type {number}
     */ this.minX = minX;
        /**
     * The minimum Y position in the bounding box
     * @type {number}
     */ this.minY = minY;
        /**
     * The maxmimum X position in the bounding box
     * @type {number}
     */ this.maxX = maxX;
        /**
     * The maxmimum Y position in the bounding box
     * @type {number}
     */ this.maxY = maxY;
    }
}



// This maps the Unicode Script property to an OpenType script tag
// Data from http://www.microsoft.com/typography/otspec/scripttags.htm
// and http://www.unicode.org/Public/UNIDATA/PropertyValueAliases.txt.
const $130d1a642ebcd2b7$var$UNICODE_SCRIPTS = {
    Caucasian_Albanian: 'aghb',
    Arabic: 'arab',
    Imperial_Aramaic: 'armi',
    Armenian: 'armn',
    Avestan: 'avst',
    Balinese: 'bali',
    Bamum: 'bamu',
    Bassa_Vah: 'bass',
    Batak: 'batk',
    Bengali: [
        'bng2',
        'beng'
    ],
    Bopomofo: 'bopo',
    Brahmi: 'brah',
    Braille: 'brai',
    Buginese: 'bugi',
    Buhid: 'buhd',
    Chakma: 'cakm',
    Canadian_Aboriginal: 'cans',
    Carian: 'cari',
    Cham: 'cham',
    Cherokee: 'cher',
    Coptic: 'copt',
    Cypriot: 'cprt',
    Cyrillic: 'cyrl',
    Devanagari: [
        'dev2',
        'deva'
    ],
    Deseret: 'dsrt',
    Duployan: 'dupl',
    Egyptian_Hieroglyphs: 'egyp',
    Elbasan: 'elba',
    Ethiopic: 'ethi',
    Georgian: 'geor',
    Glagolitic: 'glag',
    Gothic: 'goth',
    Grantha: 'gran',
    Greek: 'grek',
    Gujarati: [
        'gjr2',
        'gujr'
    ],
    Gurmukhi: [
        'gur2',
        'guru'
    ],
    Hangul: 'hang',
    Han: 'hani',
    Hanunoo: 'hano',
    Hebrew: 'hebr',
    Hiragana: 'hira',
    Pahawh_Hmong: 'hmng',
    Katakana_Or_Hiragana: 'hrkt',
    Old_Italic: 'ital',
    Javanese: 'java',
    Kayah_Li: 'kali',
    Katakana: 'kana',
    Kharoshthi: 'khar',
    Khmer: 'khmr',
    Khojki: 'khoj',
    Kannada: [
        'knd2',
        'knda'
    ],
    Kaithi: 'kthi',
    Tai_Tham: 'lana',
    Lao: 'lao ',
    Latin: 'latn',
    Lepcha: 'lepc',
    Limbu: 'limb',
    Linear_A: 'lina',
    Linear_B: 'linb',
    Lisu: 'lisu',
    Lycian: 'lyci',
    Lydian: 'lydi',
    Mahajani: 'mahj',
    Mandaic: 'mand',
    Manichaean: 'mani',
    Mende_Kikakui: 'mend',
    Meroitic_Cursive: 'merc',
    Meroitic_Hieroglyphs: 'mero',
    Malayalam: [
        'mlm2',
        'mlym'
    ],
    Modi: 'modi',
    Mongolian: 'mong',
    Mro: 'mroo',
    Meetei_Mayek: 'mtei',
    Myanmar: [
        'mym2',
        'mymr'
    ],
    Old_North_Arabian: 'narb',
    Nabataean: 'nbat',
    Nko: 'nko ',
    Ogham: 'ogam',
    Ol_Chiki: 'olck',
    Old_Turkic: 'orkh',
    Oriya: [
        'ory2',
        'orya'
    ],
    Osmanya: 'osma',
    Palmyrene: 'palm',
    Pau_Cin_Hau: 'pauc',
    Old_Permic: 'perm',
    Phags_Pa: 'phag',
    Inscriptional_Pahlavi: 'phli',
    Psalter_Pahlavi: 'phlp',
    Phoenician: 'phnx',
    Miao: 'plrd',
    Inscriptional_Parthian: 'prti',
    Rejang: 'rjng',
    Runic: 'runr',
    Samaritan: 'samr',
    Old_South_Arabian: 'sarb',
    Saurashtra: 'saur',
    Shavian: 'shaw',
    Sharada: 'shrd',
    Siddham: 'sidd',
    Khudawadi: 'sind',
    Sinhala: 'sinh',
    Sora_Sompeng: 'sora',
    Sundanese: 'sund',
    Syloti_Nagri: 'sylo',
    Syriac: 'syrc',
    Tagbanwa: 'tagb',
    Takri: 'takr',
    Tai_Le: 'tale',
    New_Tai_Lue: 'talu',
    Tamil: [
        'tml2',
        'taml'
    ],
    Tai_Viet: 'tavt',
    Telugu: [
        'tel2',
        'telu'
    ],
    Tifinagh: 'tfng',
    Tagalog: 'tglg',
    Thaana: 'thaa',
    Thai: 'thai',
    Tibetan: 'tibt',
    Tirhuta: 'tirh',
    Ugaritic: 'ugar',
    Vai: 'vai ',
    Warang_Citi: 'wara',
    Old_Persian: 'xpeo',
    Cuneiform: 'xsux',
    Yi: 'yi  ',
    Inherited: 'zinh',
    Common: 'zyyy',
    Unknown: 'zzzz'
};
const $130d1a642ebcd2b7$var$OPENTYPE_SCRIPTS = {};
for(let script in $130d1a642ebcd2b7$var$UNICODE_SCRIPTS){
    let tag = $130d1a642ebcd2b7$var$UNICODE_SCRIPTS[script];
    if (Array.isArray(tag)) for (let t of tag)$130d1a642ebcd2b7$var$OPENTYPE_SCRIPTS[t] = script;
    else $130d1a642ebcd2b7$var$OPENTYPE_SCRIPTS[tag] = script;
}
function $130d1a642ebcd2b7$export$b32f0b5f69d65e51(script) {
    return $130d1a642ebcd2b7$var$UNICODE_SCRIPTS[script];
}
function $130d1a642ebcd2b7$export$ce50e82f12a827a4(tag) {
    return $130d1a642ebcd2b7$var$OPENTYPE_SCRIPTS[tag];
}
function $130d1a642ebcd2b7$export$e5cb25e204fb8450(string) {
    let len = string.length;
    let idx = 0;
    while(idx < len){
        let code = string.charCodeAt(idx++);
        // Check if this is a high surrogate
        if (0xd800 <= code && code <= 0xdbff && idx < len) {
            let next = string.charCodeAt(idx);
            // Check if this is a low surrogate
            if (0xdc00 <= next && next <= 0xdfff) {
                idx++;
                code = ((code & 0x3FF) << 10) + (next & 0x3FF) + 0x10000;
            }
        }
        let script = (0, $6uUbQ$getScript)(code);
        if (script !== 'Common' && script !== 'Inherited' && script !== 'Unknown') return $130d1a642ebcd2b7$var$UNICODE_SCRIPTS[script];
    }
    return $130d1a642ebcd2b7$var$UNICODE_SCRIPTS.Unknown;
}
function $130d1a642ebcd2b7$export$16fab0757cfc223d(codePoints) {
    for(let i = 0; i < codePoints.length; i++){
        let codePoint = codePoints[i];
        let script = (0, $6uUbQ$getScript)(codePoint);
        if (script !== 'Common' && script !== 'Inherited' && script !== 'Unknown') return $130d1a642ebcd2b7$var$UNICODE_SCRIPTS[script];
    }
    return $130d1a642ebcd2b7$var$UNICODE_SCRIPTS.Unknown;
}
// The scripts in this map are written from right to left
const $130d1a642ebcd2b7$var$RTL = {
    arab: true,
    hebr: true,
    syrc: true,
    thaa: true,
    cprt: true,
    khar: true,
    phnx: true,
    'nko ': true,
    lydi: true,
    avst: true,
    armi: true,
    phli: true,
    prti: true,
    sarb: true,
    orkh: true,
    samr: true,
    mand: true,
    merc: true,
    mero: true,
    // Unicode 7.0 (not listed on http://www.microsoft.com/typography/otspec/scripttags.htm)
    mani: true,
    mend: true,
    nbat: true,
    narb: true,
    palm: true,
    phlp: true // Psalter Pahlavi
};
function $130d1a642ebcd2b7$export$9fddb9d0dd7d8a54(script) {
    if ($130d1a642ebcd2b7$var$RTL[script]) return 'rtl';
    return 'ltr';
}


class $be07b3e97a42687a$export$2e2bcd8739ae039 {
    /**
   * The total advance width of the run.
   * @type {number}
   */ get advanceWidth() {
        let width = 0;
        for (let position of this.positions)width += position.xAdvance;
        return width;
    }
    /**
  * The total advance height of the run.
  * @type {number}
  */ get advanceHeight() {
        let height = 0;
        for (let position of this.positions)height += position.yAdvance;
        return height;
    }
    /**
  * The bounding box containing all glyphs in the run.
  * @type {BBox}
  */ get bbox() {
        let bbox = new (0, $f34600ab9d7f70d8$export$2e2bcd8739ae039);
        let x = 0;
        let y = 0;
        for(let index = 0; index < this.glyphs.length; index++){
            let glyph = this.glyphs[index];
            let p = this.positions[index];
            let b = glyph.bbox;
            bbox.addPoint(b.minX + x + p.xOffset, b.minY + y + p.yOffset);
            bbox.addPoint(b.maxX + x + p.xOffset, b.maxY + y + p.yOffset);
            x += p.xAdvance;
            y += p.yAdvance;
        }
        return bbox;
    }
    constructor(glyphs, features, script, language, direction){
        /**
     * An array of Glyph objects in the run
     * @type {Glyph[]}
     */ this.glyphs = glyphs;
        /**
     * An array of GlyphPosition objects for each glyph in the run
     * @type {GlyphPosition[]}
     */ this.positions = null;
        /**
     * The script that was requested for shaping. This was either passed in or detected automatically.
     * @type {string}
     */ this.script = script;
        /**
     * The language requested for shaping, as passed in. If `null`, the default language for the
     * script was used.
     * @type {string}
     */ this.language = language || null;
        /**
     * The direction requested for shaping, as passed in (either ltr or rtl).
     * If `null`, the default direction of the script is used.
     * @type {string}
     */ this.direction = direction || $130d1a642ebcd2b7$export$9fddb9d0dd7d8a54(script);
        /**
     * The features requested during shaping. This is a combination of user
     * specified features and features chosen by the shaper.
     * @type {object}
     */ this.features = {};
        // Convert features to an object
        if (Array.isArray(features)) for (let tag of features)this.features[tag] = true;
        else if (typeof features === 'object') this.features = features;
    }
}


/**
 * Represents positioning information for a glyph in a GlyphRun.
 */ class $1ac75d9a55b67f01$export$2e2bcd8739ae039 {
    constructor(xAdvance = 0, yAdvance = 0, xOffset = 0, yOffset = 0){
        /**
     * The amount to move the virtual pen in the X direction after rendering this glyph.
     * @type {number}
     */ this.xAdvance = xAdvance;
        /**
     * The amount to move the virtual pen in the Y direction after rendering this glyph.
     * @type {number}
     */ this.yAdvance = yAdvance;
        /**
     * The offset from the pen position in the X direction at which to render this glyph.
     * @type {number}
     */ this.xOffset = xOffset;
        /**
     * The offset from the pen position in the Y direction at which to render this glyph.
     * @type {number}
     */ this.yOffset = yOffset;
    }
}



// see https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html
// and /System/Library/Frameworks/CoreText.framework/Versions/A/Headers/SFNTLayoutTypes.h on a Mac
const $3b6302b64eccc32c$var$features = {
    allTypographicFeatures: {
        code: 0,
        exclusive: false,
        allTypeFeatures: 0
    },
    ligatures: {
        code: 1,
        exclusive: false,
        requiredLigatures: 0,
        commonLigatures: 2,
        rareLigatures: 4,
        // logos: 6
        rebusPictures: 8,
        diphthongLigatures: 10,
        squaredLigatures: 12,
        abbrevSquaredLigatures: 14,
        symbolLigatures: 16,
        contextualLigatures: 18,
        historicalLigatures: 20
    },
    cursiveConnection: {
        code: 2,
        exclusive: true,
        unconnected: 0,
        partiallyConnected: 1,
        cursive: 2
    },
    letterCase: {
        code: 3,
        exclusive: true
    },
    // upperAndLowerCase: 0          # deprecated
    // allCaps: 1                    # deprecated
    // allLowerCase: 2               # deprecated
    // smallCaps: 3                  # deprecated
    // initialCaps: 4                # deprecated
    // initialCapsAndSmallCaps: 5    # deprecated
    verticalSubstitution: {
        code: 4,
        exclusive: false,
        substituteVerticalForms: 0
    },
    linguisticRearrangement: {
        code: 5,
        exclusive: false,
        linguisticRearrangement: 0
    },
    numberSpacing: {
        code: 6,
        exclusive: true,
        monospacedNumbers: 0,
        proportionalNumbers: 1,
        thirdWidthNumbers: 2,
        quarterWidthNumbers: 3
    },
    smartSwash: {
        code: 8,
        exclusive: false,
        wordInitialSwashes: 0,
        wordFinalSwashes: 2,
        // lineInitialSwashes: 4
        // lineFinalSwashes: 6
        nonFinalSwashes: 8
    },
    diacritics: {
        code: 9,
        exclusive: true,
        showDiacritics: 0,
        hideDiacritics: 1,
        decomposeDiacritics: 2
    },
    verticalPosition: {
        code: 10,
        exclusive: true,
        normalPosition: 0,
        superiors: 1,
        inferiors: 2,
        ordinals: 3,
        scientificInferiors: 4
    },
    fractions: {
        code: 11,
        exclusive: true,
        noFractions: 0,
        verticalFractions: 1,
        diagonalFractions: 2
    },
    overlappingCharacters: {
        code: 13,
        exclusive: false,
        preventOverlap: 0
    },
    typographicExtras: {
        code: 14,
        exclusive: false,
        // hyphensToEmDash: 0
        // hyphenToEnDash: 2
        slashedZero: 4
    },
    // formInterrobang: 6
    // smartQuotes: 8
    // periodsToEllipsis: 10
    mathematicalExtras: {
        code: 15,
        exclusive: false,
        // hyphenToMinus: 0
        // asteristoMultiply: 2
        // slashToDivide: 4
        // inequalityLigatures: 6
        // exponents: 8
        mathematicalGreek: 10
    },
    ornamentSets: {
        code: 16,
        exclusive: true,
        noOrnaments: 0,
        dingbats: 1,
        piCharacters: 2,
        fleurons: 3,
        decorativeBorders: 4,
        internationalSymbols: 5,
        mathSymbols: 6
    },
    characterAlternatives: {
        code: 17,
        exclusive: true,
        noAlternates: 0
    },
    // user defined options
    designComplexity: {
        code: 18,
        exclusive: true,
        designLevel1: 0,
        designLevel2: 1,
        designLevel3: 2,
        designLevel4: 3,
        designLevel5: 4
    },
    styleOptions: {
        code: 19,
        exclusive: true,
        noStyleOptions: 0,
        displayText: 1,
        engravedText: 2,
        illuminatedCaps: 3,
        titlingCaps: 4,
        tallCaps: 5
    },
    characterShape: {
        code: 20,
        exclusive: true,
        traditionalCharacters: 0,
        simplifiedCharacters: 1,
        JIS1978Characters: 2,
        JIS1983Characters: 3,
        JIS1990Characters: 4,
        traditionalAltOne: 5,
        traditionalAltTwo: 6,
        traditionalAltThree: 7,
        traditionalAltFour: 8,
        traditionalAltFive: 9,
        expertCharacters: 10,
        JIS2004Characters: 11,
        hojoCharacters: 12,
        NLCCharacters: 13,
        traditionalNamesCharacters: 14
    },
    numberCase: {
        code: 21,
        exclusive: true,
        lowerCaseNumbers: 0,
        upperCaseNumbers: 1
    },
    textSpacing: {
        code: 22,
        exclusive: true,
        proportionalText: 0,
        monospacedText: 1,
        halfWidthText: 2,
        thirdWidthText: 3,
        quarterWidthText: 4,
        altProportionalText: 5,
        altHalfWidthText: 6
    },
    transliteration: {
        code: 23,
        exclusive: true,
        noTransliteration: 0
    },
    // hanjaToHangul: 1
    // hiraganaToKatakana: 2
    // katakanaToHiragana: 3
    // kanaToRomanization: 4
    // romanizationToHiragana: 5
    // romanizationToKatakana: 6
    // hanjaToHangulAltOne: 7
    // hanjaToHangulAltTwo: 8
    // hanjaToHangulAltThree: 9
    annotation: {
        code: 24,
        exclusive: true,
        noAnnotation: 0,
        boxAnnotation: 1,
        roundedBoxAnnotation: 2,
        circleAnnotation: 3,
        invertedCircleAnnotation: 4,
        parenthesisAnnotation: 5,
        periodAnnotation: 6,
        romanNumeralAnnotation: 7,
        diamondAnnotation: 8,
        invertedBoxAnnotation: 9,
        invertedRoundedBoxAnnotation: 10
    },
    kanaSpacing: {
        code: 25,
        exclusive: true,
        fullWidthKana: 0,
        proportionalKana: 1
    },
    ideographicSpacing: {
        code: 26,
        exclusive: true,
        fullWidthIdeographs: 0,
        proportionalIdeographs: 1,
        halfWidthIdeographs: 2
    },
    unicodeDecomposition: {
        code: 27,
        exclusive: false,
        canonicalComposition: 0,
        compatibilityComposition: 2,
        transcodingComposition: 4
    },
    rubyKana: {
        code: 28,
        exclusive: false,
        // noRubyKana: 0     # deprecated - use rubyKanaOff instead
        // rubyKana: 1     # deprecated - use rubyKanaOn instead
        rubyKana: 2
    },
    CJKSymbolAlternatives: {
        code: 29,
        exclusive: true,
        noCJKSymbolAlternatives: 0,
        CJKSymbolAltOne: 1,
        CJKSymbolAltTwo: 2,
        CJKSymbolAltThree: 3,
        CJKSymbolAltFour: 4,
        CJKSymbolAltFive: 5
    },
    ideographicAlternatives: {
        code: 30,
        exclusive: true,
        noIdeographicAlternatives: 0,
        ideographicAltOne: 1,
        ideographicAltTwo: 2,
        ideographicAltThree: 3,
        ideographicAltFour: 4,
        ideographicAltFive: 5
    },
    CJKVerticalRomanPlacement: {
        code: 31,
        exclusive: true,
        CJKVerticalRomanCentered: 0,
        CJKVerticalRomanHBaseline: 1
    },
    italicCJKRoman: {
        code: 32,
        exclusive: false,
        // noCJKItalicRoman: 0     # deprecated - use CJKItalicRomanOff instead
        // CJKItalicRoman: 1     # deprecated - use CJKItalicRomanOn instead
        CJKItalicRoman: 2
    },
    caseSensitiveLayout: {
        code: 33,
        exclusive: false,
        caseSensitiveLayout: 0,
        caseSensitiveSpacing: 2
    },
    alternateKana: {
        code: 34,
        exclusive: false,
        alternateHorizKana: 0,
        alternateVertKana: 2
    },
    stylisticAlternatives: {
        code: 35,
        exclusive: false,
        noStylisticAlternates: 0,
        stylisticAltOne: 2,
        stylisticAltTwo: 4,
        stylisticAltThree: 6,
        stylisticAltFour: 8,
        stylisticAltFive: 10,
        stylisticAltSix: 12,
        stylisticAltSeven: 14,
        stylisticAltEight: 16,
        stylisticAltNine: 18,
        stylisticAltTen: 20,
        stylisticAltEleven: 22,
        stylisticAltTwelve: 24,
        stylisticAltThirteen: 26,
        stylisticAltFourteen: 28,
        stylisticAltFifteen: 30,
        stylisticAltSixteen: 32,
        stylisticAltSeventeen: 34,
        stylisticAltEighteen: 36,
        stylisticAltNineteen: 38,
        stylisticAltTwenty: 40
    },
    contextualAlternates: {
        code: 36,
        exclusive: false,
        contextualAlternates: 0,
        swashAlternates: 2,
        contextualSwashAlternates: 4
    },
    lowerCase: {
        code: 37,
        exclusive: true,
        defaultLowerCase: 0,
        lowerCaseSmallCaps: 1,
        lowerCasePetiteCaps: 2
    },
    upperCase: {
        code: 38,
        exclusive: true,
        defaultUpperCase: 0,
        upperCaseSmallCaps: 1,
        upperCasePetiteCaps: 2
    },
    languageTag: {
        code: 39,
        exclusive: true
    },
    CJKRomanSpacing: {
        code: 103,
        exclusive: true,
        halfWidthCJKRoman: 0,
        proportionalCJKRoman: 1,
        defaultCJKRoman: 2,
        fullWidthCJKRoman: 3
    }
};
const $3b6302b64eccc32c$var$feature = (name, selector)=>[
        $3b6302b64eccc32c$var$features[name].code,
        $3b6302b64eccc32c$var$features[name][selector]
    ];
const $3b6302b64eccc32c$var$OTMapping = {
    rlig: $3b6302b64eccc32c$var$feature('ligatures', 'requiredLigatures'),
    clig: $3b6302b64eccc32c$var$feature('ligatures', 'contextualLigatures'),
    dlig: $3b6302b64eccc32c$var$feature('ligatures', 'rareLigatures'),
    hlig: $3b6302b64eccc32c$var$feature('ligatures', 'historicalLigatures'),
    liga: $3b6302b64eccc32c$var$feature('ligatures', 'commonLigatures'),
    hist: $3b6302b64eccc32c$var$feature('ligatures', 'historicalLigatures'),
    smcp: $3b6302b64eccc32c$var$feature('lowerCase', 'lowerCaseSmallCaps'),
    pcap: $3b6302b64eccc32c$var$feature('lowerCase', 'lowerCasePetiteCaps'),
    frac: $3b6302b64eccc32c$var$feature('fractions', 'diagonalFractions'),
    dnom: $3b6302b64eccc32c$var$feature('fractions', 'diagonalFractions'),
    numr: $3b6302b64eccc32c$var$feature('fractions', 'diagonalFractions'),
    afrc: $3b6302b64eccc32c$var$feature('fractions', 'verticalFractions'),
    // aalt
    // abvf, abvm, abvs, akhn, blwf, blwm, blws, cfar, cjct, cpsp, falt, isol, jalt, ljmo, mset?
    // ltra, ltrm, nukt, pref, pres, pstf, psts, rand, rkrf, rphf, rtla, rtlm, size, tjmo, tnum?
    // unic, vatu, vhal, vjmo, vpal, vrt2
    // dist -> trak table?
    // kern, vkrn -> kern table
    // lfbd + opbd + rtbd -> opbd table?
    // mark, mkmk -> acnt table?
    // locl -> languageTag + ltag table
    case: $3b6302b64eccc32c$var$feature('caseSensitiveLayout', 'caseSensitiveLayout'),
    ccmp: $3b6302b64eccc32c$var$feature('unicodeDecomposition', 'canonicalComposition'),
    cpct: $3b6302b64eccc32c$var$feature('CJKVerticalRomanPlacement', 'CJKVerticalRomanCentered'),
    valt: $3b6302b64eccc32c$var$feature('CJKVerticalRomanPlacement', 'CJKVerticalRomanCentered'),
    swsh: $3b6302b64eccc32c$var$feature('contextualAlternates', 'swashAlternates'),
    cswh: $3b6302b64eccc32c$var$feature('contextualAlternates', 'contextualSwashAlternates'),
    curs: $3b6302b64eccc32c$var$feature('cursiveConnection', 'cursive'),
    c2pc: $3b6302b64eccc32c$var$feature('upperCase', 'upperCasePetiteCaps'),
    c2sc: $3b6302b64eccc32c$var$feature('upperCase', 'upperCaseSmallCaps'),
    init: $3b6302b64eccc32c$var$feature('smartSwash', 'wordInitialSwashes'),
    fin2: $3b6302b64eccc32c$var$feature('smartSwash', 'wordFinalSwashes'),
    medi: $3b6302b64eccc32c$var$feature('smartSwash', 'nonFinalSwashes'),
    med2: $3b6302b64eccc32c$var$feature('smartSwash', 'nonFinalSwashes'),
    fin3: $3b6302b64eccc32c$var$feature('smartSwash', 'wordFinalSwashes'),
    fina: $3b6302b64eccc32c$var$feature('smartSwash', 'wordFinalSwashes'),
    pkna: $3b6302b64eccc32c$var$feature('kanaSpacing', 'proportionalKana'),
    half: $3b6302b64eccc32c$var$feature('textSpacing', 'halfWidthText'),
    halt: $3b6302b64eccc32c$var$feature('textSpacing', 'altHalfWidthText'),
    hkna: $3b6302b64eccc32c$var$feature('alternateKana', 'alternateHorizKana'),
    vkna: $3b6302b64eccc32c$var$feature('alternateKana', 'alternateVertKana'),
    // hngl: feature 'transliteration', 'hanjaToHangulSelector' # deprecated
    ital: $3b6302b64eccc32c$var$feature('italicCJKRoman', 'CJKItalicRoman'),
    lnum: $3b6302b64eccc32c$var$feature('numberCase', 'upperCaseNumbers'),
    onum: $3b6302b64eccc32c$var$feature('numberCase', 'lowerCaseNumbers'),
    mgrk: $3b6302b64eccc32c$var$feature('mathematicalExtras', 'mathematicalGreek'),
    // nalt: not enough info. what type of annotation?
    // ornm: ditto, which ornament style?
    calt: $3b6302b64eccc32c$var$feature('contextualAlternates', 'contextualAlternates'),
    vrt2: $3b6302b64eccc32c$var$feature('verticalSubstitution', 'substituteVerticalForms'),
    vert: $3b6302b64eccc32c$var$feature('verticalSubstitution', 'substituteVerticalForms'),
    tnum: $3b6302b64eccc32c$var$feature('numberSpacing', 'monospacedNumbers'),
    pnum: $3b6302b64eccc32c$var$feature('numberSpacing', 'proportionalNumbers'),
    sups: $3b6302b64eccc32c$var$feature('verticalPosition', 'superiors'),
    subs: $3b6302b64eccc32c$var$feature('verticalPosition', 'inferiors'),
    ordn: $3b6302b64eccc32c$var$feature('verticalPosition', 'ordinals'),
    pwid: $3b6302b64eccc32c$var$feature('textSpacing', 'proportionalText'),
    hwid: $3b6302b64eccc32c$var$feature('textSpacing', 'halfWidthText'),
    qwid: $3b6302b64eccc32c$var$feature('textSpacing', 'quarterWidthText'),
    twid: $3b6302b64eccc32c$var$feature('textSpacing', 'thirdWidthText'),
    fwid: $3b6302b64eccc32c$var$feature('textSpacing', 'proportionalText'),
    palt: $3b6302b64eccc32c$var$feature('textSpacing', 'altProportionalText'),
    trad: $3b6302b64eccc32c$var$feature('characterShape', 'traditionalCharacters'),
    smpl: $3b6302b64eccc32c$var$feature('characterShape', 'simplifiedCharacters'),
    jp78: $3b6302b64eccc32c$var$feature('characterShape', 'JIS1978Characters'),
    jp83: $3b6302b64eccc32c$var$feature('characterShape', 'JIS1983Characters'),
    jp90: $3b6302b64eccc32c$var$feature('characterShape', 'JIS1990Characters'),
    jp04: $3b6302b64eccc32c$var$feature('characterShape', 'JIS2004Characters'),
    expt: $3b6302b64eccc32c$var$feature('characterShape', 'expertCharacters'),
    hojo: $3b6302b64eccc32c$var$feature('characterShape', 'hojoCharacters'),
    nlck: $3b6302b64eccc32c$var$feature('characterShape', 'NLCCharacters'),
    tnam: $3b6302b64eccc32c$var$feature('characterShape', 'traditionalNamesCharacters'),
    ruby: $3b6302b64eccc32c$var$feature('rubyKana', 'rubyKana'),
    titl: $3b6302b64eccc32c$var$feature('styleOptions', 'titlingCaps'),
    zero: $3b6302b64eccc32c$var$feature('typographicExtras', 'slashedZero'),
    ss01: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltOne'),
    ss02: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltTwo'),
    ss03: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltThree'),
    ss04: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltFour'),
    ss05: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltFive'),
    ss06: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltSix'),
    ss07: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltSeven'),
    ss08: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltEight'),
    ss09: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltNine'),
    ss10: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltTen'),
    ss11: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltEleven'),
    ss12: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltTwelve'),
    ss13: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltThirteen'),
    ss14: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltFourteen'),
    ss15: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltFifteen'),
    ss16: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltSixteen'),
    ss17: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltSeventeen'),
    ss18: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltEighteen'),
    ss19: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltNineteen'),
    ss20: $3b6302b64eccc32c$var$feature('stylisticAlternatives', 'stylisticAltTwenty')
};
// salt: feature 'stylisticAlternatives', 'stylisticAltOne' # hmm, which one to choose
// Add cv01-cv99 features
for(let i = 1; i <= 99; i++)$3b6302b64eccc32c$var$OTMapping[`cv${`00${i}`.slice(-2)}`] = [
    $3b6302b64eccc32c$var$features.characterAlternatives.code,
    i
];
// create inverse mapping
let $3b6302b64eccc32c$var$AATMapping = {};
for(let ot in $3b6302b64eccc32c$var$OTMapping){
    let aat = $3b6302b64eccc32c$var$OTMapping[ot];
    if ($3b6302b64eccc32c$var$AATMapping[aat[0]] == null) $3b6302b64eccc32c$var$AATMapping[aat[0]] = {};
    $3b6302b64eccc32c$var$AATMapping[aat[0]][aat[1]] = ot;
}
function $3b6302b64eccc32c$export$b813f7d2a1677c16(features) {
    let res = {};
    for(let k in features){
        let r;
        if (r = $3b6302b64eccc32c$var$OTMapping[k]) {
            if (res[r[0]] == null) res[r[0]] = {};
            res[r[0]][r[1]] = features[k];
        }
    }
    return res;
}
// Maps strings in a [featureType, featureSetting]
// to their equivalent number codes
function $3b6302b64eccc32c$var$mapFeatureStrings(f) {
    let [type, setting] = f;
    if (isNaN(type)) var typeCode = $3b6302b64eccc32c$var$features[type] && $3b6302b64eccc32c$var$features[type].code;
    else var typeCode = type;
    if (isNaN(setting)) var settingCode = $3b6302b64eccc32c$var$features[type] && $3b6302b64eccc32c$var$features[type][setting];
    else var settingCode = setting;
    return [
        typeCode,
        settingCode
    ];
}
function $3b6302b64eccc32c$export$bd6df347a4f391c4(features) {
    let res = {};
    if (Array.isArray(features)) for(let k = 0; k < features.length; k++){
        let r;
        let f = $3b6302b64eccc32c$var$mapFeatureStrings(features[k]);
        if (r = $3b6302b64eccc32c$var$AATMapping[f[0]] && $3b6302b64eccc32c$var$AATMapping[f[0]][f[1]]) res[r] = true;
    }
    else if (typeof features === 'object') for(let type in features){
        let feature = features[type];
        for(let setting in feature){
            let r;
            let f = $3b6302b64eccc32c$var$mapFeatureStrings([
                type,
                setting
            ]);
            if (feature[setting] && (r = $3b6302b64eccc32c$var$AATMapping[f[0]] && $3b6302b64eccc32c$var$AATMapping[f[0]][f[1]])) res[r] = true;
        }
    }
    return Object.keys(res);
}







class $ff5ce077dae0f144$export$2e2bcd8739ae039 {
    lookup(glyph) {
        switch(this.table.version){
            case 0:
                return this.table.values.getItem(glyph);
            case 2:
            case 4:
                {
                    let min = 0;
                    let max = this.table.binarySearchHeader.nUnits - 1;
                    while(min <= max){
                        var mid = min + max >> 1;
                        var seg = this.table.segments[mid];
                        // special end of search value
                        if (seg.firstGlyph === 0xffff) return null;
                        if (glyph < seg.firstGlyph) max = mid - 1;
                        else if (glyph > seg.lastGlyph) min = mid + 1;
                        else {
                            if (this.table.version === 2) return seg.value;
                            else return seg.values[glyph - seg.firstGlyph];
                        }
                    }
                    return null;
                }
            case 6:
                {
                    let min = 0;
                    let max = this.table.binarySearchHeader.nUnits - 1;
                    while(min <= max){
                        var mid = min + max >> 1;
                        var seg = this.table.segments[mid];
                        // special end of search value
                        if (seg.glyph === 0xffff) return null;
                        if (glyph < seg.glyph) max = mid - 1;
                        else if (glyph > seg.glyph) min = mid + 1;
                        else return seg.value;
                    }
                    return null;
                }
            case 8:
                return this.table.values[glyph - this.table.firstGlyph];
            default:
                throw new Error(`Unknown lookup table format: ${this.table.version}`);
        }
    }
    glyphsForValue(classValue) {
        let res = [];
        switch(this.table.version){
            case 2:
            case 4:
                for (let segment of this.table.segments)if (this.table.version === 2 && segment.value === classValue) res.push(...(0, $12727730ddfc8bfe$export$d02631cccf789723)(segment.firstGlyph, segment.lastGlyph + 1));
                else {
                    for(let index = 0; index < segment.values.length; index++)if (segment.values[index] === classValue) res.push(segment.firstGlyph + index);
                }
                break;
            case 6:
                for (let segment of this.table.segments)if (segment.value === classValue) res.push(segment.glyph);
                break;
            case 8:
                for(let i = 0; i < this.table.values.length; i++)if (this.table.values[i] === classValue) res.push(this.table.firstGlyph + i);
                break;
            default:
                throw new Error(`Unknown lookup table format: ${this.table.version}`);
        }
        return res;
    }
    constructor(table){
        this.table = table;
    }
}
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $ff5ce077dae0f144$export$2e2bcd8739ae039.prototype, "glyphsForValue", null);


const $50c7aac9316f2948$var$START_OF_TEXT_STATE = 0;
const $50c7aac9316f2948$var$START_OF_LINE_STATE = 1;
const $50c7aac9316f2948$var$END_OF_TEXT_CLASS = 0;
const $50c7aac9316f2948$var$OUT_OF_BOUNDS_CLASS = 1;
const $50c7aac9316f2948$var$DELETED_GLYPH_CLASS = 2;
const $50c7aac9316f2948$var$END_OF_LINE_CLASS = 3;
const $50c7aac9316f2948$var$DONT_ADVANCE = 0x4000;
class $50c7aac9316f2948$export$2e2bcd8739ae039 {
    process(glyphs, reverse, processEntry) {
        let currentState = $50c7aac9316f2948$var$START_OF_TEXT_STATE; // START_OF_LINE_STATE is used for kashida glyph insertions sometimes I think?
        let index = reverse ? glyphs.length - 1 : 0;
        let dir = reverse ? -1 : 1;
        while(dir === 1 && index <= glyphs.length || dir === -1 && index >= -1){
            let glyph = null;
            let classCode = $50c7aac9316f2948$var$OUT_OF_BOUNDS_CLASS;
            let shouldAdvance = true;
            if (index === glyphs.length || index === -1) classCode = $50c7aac9316f2948$var$END_OF_TEXT_CLASS;
            else {
                glyph = glyphs[index];
                if (glyph.id === 0xffff) classCode = $50c7aac9316f2948$var$DELETED_GLYPH_CLASS;
                else {
                    classCode = this.lookupTable.lookup(glyph.id);
                    if (classCode == null) classCode = $50c7aac9316f2948$var$OUT_OF_BOUNDS_CLASS;
                }
            }
            let row = this.stateTable.stateArray.getItem(currentState);
            let entryIndex = row[classCode];
            let entry = this.stateTable.entryTable.getItem(entryIndex);
            if (classCode !== $50c7aac9316f2948$var$END_OF_TEXT_CLASS && classCode !== $50c7aac9316f2948$var$DELETED_GLYPH_CLASS) {
                processEntry(glyph, entry, index);
                shouldAdvance = !(entry.flags & $50c7aac9316f2948$var$DONT_ADVANCE);
            }
            currentState = entry.newState;
            if (shouldAdvance) index += dir;
        }
        return glyphs;
    }
    /**
   * Performs a depth-first traversal of the glyph strings
   * represented by the state machine.
   */ traverse(opts, state = 0, visited = new Set) {
        if (visited.has(state)) return;
        visited.add(state);
        let { nClasses: nClasses, stateArray: stateArray, entryTable: entryTable } = this.stateTable;
        let row = stateArray.getItem(state);
        // Skip predefined classes
        for(let classCode = 4; classCode < nClasses; classCode++){
            let entryIndex = row[classCode];
            let entry = entryTable.getItem(entryIndex);
            // Try all glyphs in the class
            for (let glyph of this.lookupTable.glyphsForValue(classCode)){
                if (opts.enter) opts.enter(glyph, entry);
                if (entry.newState !== 0) this.traverse(opts, entry.newState, visited);
                if (opts.exit) opts.exit(glyph, entry);
            }
        }
    }
    constructor(stateTable){
        this.stateTable = stateTable;
        this.lookupTable = new (0, $ff5ce077dae0f144$export$2e2bcd8739ae039)(stateTable.classTable);
    }
}




// indic replacement flags
const $55f71433a605c87d$var$MARK_FIRST = 0x8000;
const $55f71433a605c87d$var$MARK_LAST = 0x2000;
const $55f71433a605c87d$var$VERB = 0x000F;
// contextual substitution and glyph insertion flag
const $55f71433a605c87d$var$SET_MARK = 0x8000;
// ligature entry flags
const $55f71433a605c87d$var$SET_COMPONENT = 0x8000;
const $55f71433a605c87d$var$PERFORM_ACTION = 0x2000;
// ligature action masks
const $55f71433a605c87d$var$LAST_MASK = 0x80000000;
const $55f71433a605c87d$var$STORE_MASK = 0x40000000;
const $55f71433a605c87d$var$OFFSET_MASK = 0x3FFFFFFF;
const $55f71433a605c87d$var$VERTICAL_ONLY = 0x800000;
const $55f71433a605c87d$var$REVERSE_DIRECTION = 0x400000;
const $55f71433a605c87d$var$HORIZONTAL_AND_VERTICAL = 0x200000;
// glyph insertion flags
const $55f71433a605c87d$var$CURRENT_IS_KASHIDA_LIKE = 0x2000;
const $55f71433a605c87d$var$MARKED_IS_KASHIDA_LIKE = 0x1000;
const $55f71433a605c87d$var$CURRENT_INSERT_BEFORE = 0x0800;
const $55f71433a605c87d$var$MARKED_INSERT_BEFORE = 0x0400;
const $55f71433a605c87d$var$CURRENT_INSERT_COUNT = 0x03E0;
const $55f71433a605c87d$var$MARKED_INSERT_COUNT = 0x001F;
class $55f71433a605c87d$export$2e2bcd8739ae039 {
    // Processes an array of glyphs and applies the specified features
    // Features should be in the form of {featureType:{featureSetting:boolean}}
    process(glyphs, features = {}) {
        for (let chain of this.morx.chains){
            let flags = chain.defaultFlags;
            // enable/disable the requested features
            for (let feature of chain.features){
                let f;
                if (f = features[feature.featureType]) {
                    if (f[feature.featureSetting]) {
                        flags &= feature.disableFlags;
                        flags |= feature.enableFlags;
                    } else if (f[feature.featureSetting] === false) {
                        flags |= ~feature.disableFlags;
                        flags &= ~feature.enableFlags;
                    }
                }
            }
            for (let subtable of chain.subtables)if (subtable.subFeatureFlags & flags) this.processSubtable(subtable, glyphs);
        }
        // remove deleted glyphs
        let index = glyphs.length - 1;
        while(index >= 0){
            if (glyphs[index].id === 0xffff) glyphs.splice(index, 1);
            index--;
        }
        return glyphs;
    }
    processSubtable(subtable, glyphs) {
        this.subtable = subtable;
        this.glyphs = glyphs;
        if (this.subtable.type === 4) {
            this.processNoncontextualSubstitutions(this.subtable, this.glyphs);
            return;
        }
        this.ligatureStack = [];
        this.markedGlyph = null;
        this.firstGlyph = null;
        this.lastGlyph = null;
        this.markedIndex = null;
        let stateMachine = this.getStateMachine(subtable);
        let process = this.getProcessor();
        let reverse = !!(this.subtable.coverage & $55f71433a605c87d$var$REVERSE_DIRECTION);
        return stateMachine.process(this.glyphs, reverse, process);
    }
    getStateMachine(subtable) {
        return new (0, $50c7aac9316f2948$export$2e2bcd8739ae039)(subtable.table.stateTable);
    }
    getProcessor() {
        switch(this.subtable.type){
            case 0:
                return this.processIndicRearragement;
            case 1:
                return this.processContextualSubstitution;
            case 2:
                return this.processLigature;
            case 4:
                return this.processNoncontextualSubstitutions;
            case 5:
                return this.processGlyphInsertion;
            default:
                throw new Error(`Invalid morx subtable type: ${this.subtable.type}`);
        }
    }
    processIndicRearragement(glyph, entry, index) {
        if (entry.flags & $55f71433a605c87d$var$MARK_FIRST) this.firstGlyph = index;
        if (entry.flags & $55f71433a605c87d$var$MARK_LAST) this.lastGlyph = index;
        $55f71433a605c87d$var$reorderGlyphs(this.glyphs, entry.flags & $55f71433a605c87d$var$VERB, this.firstGlyph, this.lastGlyph);
    }
    processContextualSubstitution(glyph, entry, index) {
        let subsitutions = this.subtable.table.substitutionTable.items;
        if (entry.markIndex !== 0xffff) {
            let lookup = subsitutions.getItem(entry.markIndex);
            let lookupTable = new (0, $ff5ce077dae0f144$export$2e2bcd8739ae039)(lookup);
            glyph = this.glyphs[this.markedGlyph];
            var gid = lookupTable.lookup(glyph.id);
            if (gid) this.glyphs[this.markedGlyph] = this.font.getGlyph(gid, glyph.codePoints);
        }
        if (entry.currentIndex !== 0xffff) {
            let lookup = subsitutions.getItem(entry.currentIndex);
            let lookupTable = new (0, $ff5ce077dae0f144$export$2e2bcd8739ae039)(lookup);
            glyph = this.glyphs[index];
            var gid = lookupTable.lookup(glyph.id);
            if (gid) this.glyphs[index] = this.font.getGlyph(gid, glyph.codePoints);
        }
        if (entry.flags & $55f71433a605c87d$var$SET_MARK) this.markedGlyph = index;
    }
    processLigature(glyph, entry, index) {
        if (entry.flags & $55f71433a605c87d$var$SET_COMPONENT) this.ligatureStack.push(index);
        if (entry.flags & $55f71433a605c87d$var$PERFORM_ACTION) {
            let actions = this.subtable.table.ligatureActions;
            let components = this.subtable.table.components;
            let ligatureList = this.subtable.table.ligatureList;
            let actionIndex = entry.action;
            let last = false;
            let ligatureIndex = 0;
            let codePoints = [];
            let ligatureGlyphs = [];
            while(!last){
                let componentGlyph = this.ligatureStack.pop();
                codePoints.unshift(...this.glyphs[componentGlyph].codePoints);
                let action = actions.getItem(actionIndex++);
                last = !!(action & $55f71433a605c87d$var$LAST_MASK);
                let store = !!(action & $55f71433a605c87d$var$STORE_MASK);
                let offset = (action & $55f71433a605c87d$var$OFFSET_MASK) << 2 >> 2; // sign extend 30 to 32 bits
                offset += this.glyphs[componentGlyph].id;
                let component = components.getItem(offset);
                ligatureIndex += component;
                if (last || store) {
                    let ligatureEntry = ligatureList.getItem(ligatureIndex);
                    this.glyphs[componentGlyph] = this.font.getGlyph(ligatureEntry, codePoints);
                    ligatureGlyphs.push(componentGlyph);
                    ligatureIndex = 0;
                    codePoints = [];
                } else this.glyphs[componentGlyph] = this.font.getGlyph(0xffff);
            }
            // Put ligature glyph indexes back on the stack
            this.ligatureStack.push(...ligatureGlyphs);
        }
    }
    processNoncontextualSubstitutions(subtable, glyphs, index) {
        let lookupTable = new (0, $ff5ce077dae0f144$export$2e2bcd8739ae039)(subtable.table.lookupTable);
        for(index = 0; index < glyphs.length; index++){
            let glyph = glyphs[index];
            if (glyph.id !== 0xffff) {
                let gid = lookupTable.lookup(glyph.id);
                if (gid) glyphs[index] = this.font.getGlyph(gid, glyph.codePoints);
            }
        }
    }
    _insertGlyphs(glyphIndex, insertionActionIndex, count, isBefore) {
        let insertions = [];
        while(count--){
            let gid = this.subtable.table.insertionActions.getItem(insertionActionIndex++);
            insertions.push(this.font.getGlyph(gid));
        }
        if (!isBefore) glyphIndex++;
        this.glyphs.splice(glyphIndex, 0, ...insertions);
    }
    processGlyphInsertion(glyph, entry, index) {
        if (entry.flags & $55f71433a605c87d$var$SET_MARK) this.markedIndex = index;
        if (entry.markedInsertIndex !== 0xffff) {
            let count = (entry.flags & $55f71433a605c87d$var$MARKED_INSERT_COUNT) >>> 5;
            let isBefore = !!(entry.flags & $55f71433a605c87d$var$MARKED_INSERT_BEFORE);
            this._insertGlyphs(this.markedIndex, entry.markedInsertIndex, count, isBefore);
        }
        if (entry.currentInsertIndex !== 0xffff) {
            let count = (entry.flags & $55f71433a605c87d$var$CURRENT_INSERT_COUNT) >>> 5;
            let isBefore = !!(entry.flags & $55f71433a605c87d$var$CURRENT_INSERT_BEFORE);
            this._insertGlyphs(index, entry.currentInsertIndex, count, isBefore);
        }
    }
    getSupportedFeatures() {
        let features = [];
        for (let chain of this.morx.chains)for (let feature of chain.features)features.push([
            feature.featureType,
            feature.featureSetting
        ]);
        return features;
    }
    generateInputs(gid) {
        if (!this.inputCache) this.generateInputCache();
        return this.inputCache[gid] || [];
    }
    generateInputCache() {
        this.inputCache = {};
        for (let chain of this.morx.chains){
            let flags = chain.defaultFlags;
            for (let subtable of chain.subtables)if (subtable.subFeatureFlags & flags) this.generateInputsForSubtable(subtable);
        }
    }
    generateInputsForSubtable(subtable) {
        // Currently, only supporting ligature subtables.
        if (subtable.type !== 2) return;
        let reverse = !!(subtable.coverage & $55f71433a605c87d$var$REVERSE_DIRECTION);
        if (reverse) throw new Error('Reverse subtable, not supported.');
        this.subtable = subtable;
        this.ligatureStack = [];
        let stateMachine = this.getStateMachine(subtable);
        let process = this.getProcessor();
        let input = [];
        let stack = [];
        this.glyphs = [];
        stateMachine.traverse({
            enter: (glyph, entry)=>{
                let glyphs = this.glyphs;
                stack.push({
                    glyphs: glyphs.slice(),
                    ligatureStack: this.ligatureStack.slice()
                });
                // Add glyph to input and glyphs to process.
                let g = this.font.getGlyph(glyph);
                input.push(g);
                glyphs.push(input[input.length - 1]);
                // Process ligature substitution
                process(glyphs[glyphs.length - 1], entry, glyphs.length - 1);
                // Add input to result if only one matching (non-deleted) glyph remains.
                let count = 0;
                let found = 0;
                for(let i = 0; i < glyphs.length && count <= 1; i++)if (glyphs[i].id !== 0xffff) {
                    count++;
                    found = glyphs[i].id;
                }
                if (count === 1) {
                    let result = input.map((g)=>g.id);
                    let cache = this.inputCache[found];
                    if (cache) cache.push(result);
                    else this.inputCache[found] = [
                        result
                    ];
                }
            },
            exit: ()=>{
                ({ glyphs: this.glyphs, ligatureStack: this.ligatureStack } = stack.pop());
                input.pop();
            }
        });
    }
    constructor(font){
        this.processIndicRearragement = this.processIndicRearragement.bind(this);
        this.processContextualSubstitution = this.processContextualSubstitution.bind(this);
        this.processLigature = this.processLigature.bind(this);
        this.processNoncontextualSubstitutions = this.processNoncontextualSubstitutions.bind(this);
        this.processGlyphInsertion = this.processGlyphInsertion.bind(this);
        this.font = font;
        this.morx = font.morx;
        this.inputCache = null;
    }
}
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $55f71433a605c87d$export$2e2bcd8739ae039.prototype, "getStateMachine", null);
// swaps the glyphs in rangeA with those in rangeB
// reverse the glyphs inside those ranges if specified
// ranges are in [offset, length] format
function $55f71433a605c87d$var$swap(glyphs, rangeA, rangeB, reverseA = false, reverseB = false) {
    let end = glyphs.splice(rangeB[0] - (rangeB[1] - 1), rangeB[1]);
    if (reverseB) end.reverse();
    let start = glyphs.splice(rangeA[0], rangeA[1], ...end);
    if (reverseA) start.reverse();
    glyphs.splice(rangeB[0] - (rangeA[1] - 1), 0, ...start);
    return glyphs;
}
function $55f71433a605c87d$var$reorderGlyphs(glyphs, verb, firstGlyph, lastGlyph) {
    let length = lastGlyph - firstGlyph + 1;
    switch(verb){
        case 0:
            return glyphs;
        case 1:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                1
            ], [
                lastGlyph,
                0
            ]);
        case 2:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                0
            ], [
                lastGlyph,
                1
            ]);
        case 3:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                1
            ], [
                lastGlyph,
                1
            ]);
        case 4:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                0
            ]);
        case 5:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                0
            ], true, false);
        case 6:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                0
            ], [
                lastGlyph,
                2
            ]);
        case 7:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                0
            ], [
                lastGlyph,
                2
            ], false, true);
        case 8:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                1
            ], [
                lastGlyph,
                2
            ]);
        case 9:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                1
            ], [
                lastGlyph,
                2
            ], false, true);
        case 10:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                1
            ]);
        case 11:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                1
            ], true, false);
        case 12:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                2
            ]);
        case 13:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                2
            ], true, false);
        case 14:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                2
            ], false, true);
        case 15:
            return $55f71433a605c87d$var$swap(glyphs, [
                firstGlyph,
                2
            ], [
                lastGlyph,
                2
            ], true, true);
        default:
            throw new Error(`Unknown verb: ${verb}`);
    }
}


class $ba6dd74203be8728$export$2e2bcd8739ae039 {
    substitute(glyphRun) {
        // AAT expects the glyphs to be in visual order prior to morx processing,
        // so reverse the glyphs if the script is right-to-left.
        if (glyphRun.direction === 'rtl') glyphRun.glyphs.reverse();
        this.morxProcessor.process(glyphRun.glyphs, $3b6302b64eccc32c$export$b813f7d2a1677c16(glyphRun.features));
    }
    getAvailableFeatures(script, language) {
        return $3b6302b64eccc32c$export$bd6df347a4f391c4(this.morxProcessor.getSupportedFeatures());
    }
    stringsForGlyph(gid) {
        let glyphStrings = this.morxProcessor.generateInputs(gid);
        let result = new Set;
        for (let glyphs of glyphStrings)this._addStrings(glyphs, 0, result, '');
        return result;
    }
    _addStrings(glyphs, index, strings, string) {
        let codePoints = this.font._cmapProcessor.codePointsForGlyph(glyphs[index]);
        for (let codePoint of codePoints){
            let s = string + String.fromCodePoint(codePoint);
            if (index < glyphs.length - 1) this._addStrings(glyphs, index + 1, strings, s);
            else strings.add(s);
        }
    }
    constructor(font){
        this.font = font;
        this.morxProcessor = new (0, $55f71433a605c87d$export$2e2bcd8739ae039)(font);
        this.fallbackPosition = false;
    }
}



class $94d7a73bd2edfc9a$export$2e2bcd8739ae039 {
    /**
   * Adds the given features to the last stage.
   * Ignores features that have already been applied.
   */ _addFeatures(features, global) {
        let stageIndex = this.stages.length - 1;
        let stage = this.stages[stageIndex];
        for (let feature of features)if (this.allFeatures[feature] == null) {
            stage.push(feature);
            this.allFeatures[feature] = stageIndex;
            if (global) this.globalFeatures[feature] = true;
        }
    }
    /**
   * Add features to the last stage
   */ add(arg, global = true) {
        if (this.stages.length === 0) this.stages.push([]);
        if (typeof arg === 'string') arg = [
            arg
        ];
        if (Array.isArray(arg)) this._addFeatures(arg, global);
        else if (typeof arg === 'object') {
            this._addFeatures(arg.global || [], true);
            this._addFeatures(arg.local || [], false);
        } else throw new Error("Unsupported argument to ShapingPlan#add");
    }
    /**
   * Add a new stage
   */ addStage(arg, global) {
        if (typeof arg === 'function') this.stages.push(arg, []);
        else {
            this.stages.push([]);
            this.add(arg, global);
        }
    }
    setFeatureOverrides(features) {
        if (Array.isArray(features)) this.add(features);
        else if (typeof features === 'object') for(let tag in features){
            if (features[tag]) this.add(tag);
            else if (this.allFeatures[tag] != null) {
                let stage = this.stages[this.allFeatures[tag]];
                stage.splice(stage.indexOf(tag), 1);
                delete this.allFeatures[tag];
                delete this.globalFeatures[tag];
            }
        }
    }
    /**
   * Assigns the global features to the given glyphs
   */ assignGlobalFeatures(glyphs) {
        for (let glyph of glyphs)for(let feature in this.globalFeatures)glyph.features[feature] = true;
    }
    /**
   * Executes the planned stages using the given OTProcessor
   */ process(processor, glyphs, positions) {
        for (let stage of this.stages){
            if (typeof stage === 'function') {
                if (!positions) stage(this.font, glyphs, this);
            } else if (stage.length > 0) processor.applyFeatures(stage, glyphs, positions);
        }
    }
    constructor(font, script, direction){
        this.font = font;
        this.script = script;
        this.direction = direction;
        this.stages = [];
        this.globalFeatures = {};
        this.allFeatures = {};
    }
}




const $649970d87335b30f$var$VARIATION_FEATURES = [
    'rvrn'
];
const $649970d87335b30f$var$COMMON_FEATURES = [
    'ccmp',
    'locl',
    'rlig',
    'mark',
    'mkmk'
];
const $649970d87335b30f$var$FRACTIONAL_FEATURES = [
    'frac',
    'numr',
    'dnom'
];
const $649970d87335b30f$var$HORIZONTAL_FEATURES = [
    'calt',
    'clig',
    'liga',
    'rclt',
    'curs',
    'kern'
];
const $649970d87335b30f$var$VERTICAL_FEATURES = [
    'vert'
];
const $649970d87335b30f$var$DIRECTIONAL_FEATURES = {
    ltr: [
        'ltra',
        'ltrm'
    ],
    rtl: [
        'rtla',
        'rtlm'
    ]
};
class $649970d87335b30f$export$2e2bcd8739ae039 {
    static plan(plan, glyphs, features) {
        // Plan the features we want to apply
        this.planPreprocessing(plan);
        this.planFeatures(plan);
        this.planPostprocessing(plan, features);
        // Assign the global features to all the glyphs
        plan.assignGlobalFeatures(glyphs);
        // Assign local features to glyphs
        this.assignFeatures(plan, glyphs);
    }
    static planPreprocessing(plan) {
        plan.add({
            global: [
                ...$649970d87335b30f$var$VARIATION_FEATURES,
                ...$649970d87335b30f$var$DIRECTIONAL_FEATURES[plan.direction]
            ],
            local: $649970d87335b30f$var$FRACTIONAL_FEATURES
        });
    }
    static planFeatures(plan) {
    // Do nothing by default. Let subclasses override this.
    }
    static planPostprocessing(plan, userFeatures) {
        plan.add([
            ...$649970d87335b30f$var$COMMON_FEATURES,
            ...$649970d87335b30f$var$HORIZONTAL_FEATURES
        ]);
        plan.setFeatureOverrides(userFeatures);
    }
    static assignFeatures(plan, glyphs) {
        // Enable contextual fractions
        for(let i = 0; i < glyphs.length; i++){
            let glyph = glyphs[i];
            if (glyph.codePoints[0] === 0x2044) {
                let start = i;
                let end = i + 1;
                // Apply numerator
                while(start > 0 && (0, $6uUbQ$isDigit)(glyphs[start - 1].codePoints[0])){
                    glyphs[start - 1].features.numr = true;
                    glyphs[start - 1].features.frac = true;
                    start--;
                }
                // Apply denominator
                while(end < glyphs.length && (0, $6uUbQ$isDigit)(glyphs[end].codePoints[0])){
                    glyphs[end].features.dnom = true;
                    glyphs[end].features.frac = true;
                    end++;
                }
                // Apply fraction slash
                glyph.features.frac = true;
                i = end - 1;
            }
        }
    }
}
(0, $6uUbQ$_)($649970d87335b30f$export$2e2bcd8739ae039, "zeroMarkWidths", 'AFTER_GPOS');






const $764eb544bbe1ccf0$var$trie = new (0, $6uUbQ$unicodetrie)((0, $12727730ddfc8bfe$export$94fdf11bafc8de6b)("APABAAAAAAAAOAAAAf0BAv7tmi1MxDAUx7vtvjhAgcDgkEgEAnmXEBIMCYaEcygEiqBQ4FAkCE4ikUgMiiBJSAgSiUQSDMn9L9eSl6bddddug9t7yS/trevre+3r27pcNxZiG+yCfdCVv/9LeQxOwRm4AJegD27ALbgD9+ABPJF+z+BN/h7yDj5k/VOWX6SdmU5+wLWknggxDxaS8u0qiiX4uiz9XamQ3wzDMAzDMAzDMAzDVI/h959V/v7BMAzDMAzDMLlyNTNiMSdewVxbiA44B4/guz1qW58VYlMI0WsJ0W+N6kXw0spvPtdwhtkwnGM6uLaV4Xyzg3v3PM9DPfQ/sOg4xPWjipy31P8LTqbU304c/cLCUmWJLNB2Uz2U1KTeRKNmKHVMfbJC+/0loTZRH/W5cvEvBJPMbREkWt3FD1NcqXZBSpuE2Ad0PBehPtNrPtIEdYP+hiRt/V1jIiE69X4NT/uVZI3PUHE9bm5M7ePGdZWy951v7Nn6j8v1WWKP3mt6ttnsigx6VN7Vc0VomSSGqW2mGNP1muZPl7LfjNUaKNFtDGVf2fvE9O7VlBS5j333c5p/eeoOqcs1R/hIqDWLJ7TTlksirVT1SI7l8k4Yp+g3jafGcrU1RM6l9th80XOpnlN97bDNY4i4s61B0Si/ipa0uHMl6zqEjlFfCZm/TM8KmzQDjmuTAQ=="));
const $764eb544bbe1ccf0$var$FEATURES = [
    'isol',
    'fina',
    'fin2',
    'fin3',
    'medi',
    'med2',
    'init'
];
const $764eb544bbe1ccf0$var$ShapingClasses = {
    Non_Joining: 0,
    Left_Joining: 1,
    Right_Joining: 2,
    Dual_Joining: 3,
    Join_Causing: 3,
    ALAPH: 4,
    'DALATH RISH': 5,
    Transparent: 6
};
const $764eb544bbe1ccf0$var$ISOL = 'isol';
const $764eb544bbe1ccf0$var$FINA = 'fina';
const $764eb544bbe1ccf0$var$FIN2 = 'fin2';
const $764eb544bbe1ccf0$var$FIN3 = 'fin3';
const $764eb544bbe1ccf0$var$MEDI = 'medi';
const $764eb544bbe1ccf0$var$MED2 = 'med2';
const $764eb544bbe1ccf0$var$INIT = 'init';
const $764eb544bbe1ccf0$var$NONE = null;
// Each entry is [prevAction, curAction, nextState]
const $764eb544bbe1ccf0$var$STATE_TABLE = [
    //   Non_Joining,        Left_Joining,       Right_Joining,     Dual_Joining,           ALAPH,            DALATH RISH
    // State 0: prev was U,  not willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            1
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            1
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            6
        ]
    ],
    // State 1: prev was R or ISOL/ALAPH,  not willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            1
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$FIN2,
            5
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            6
        ]
    ],
    // State 2: prev was D/L in ISOL form,  willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$INIT,
            $764eb544bbe1ccf0$var$FINA,
            1
        ],
        [
            $764eb544bbe1ccf0$var$INIT,
            $764eb544bbe1ccf0$var$FINA,
            3
        ],
        [
            $764eb544bbe1ccf0$var$INIT,
            $764eb544bbe1ccf0$var$FINA,
            4
        ],
        [
            $764eb544bbe1ccf0$var$INIT,
            $764eb544bbe1ccf0$var$FINA,
            6
        ]
    ],
    // State 3: prev was D in FINA form,  willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$MEDI,
            $764eb544bbe1ccf0$var$FINA,
            1
        ],
        [
            $764eb544bbe1ccf0$var$MEDI,
            $764eb544bbe1ccf0$var$FINA,
            3
        ],
        [
            $764eb544bbe1ccf0$var$MEDI,
            $764eb544bbe1ccf0$var$FINA,
            4
        ],
        [
            $764eb544bbe1ccf0$var$MEDI,
            $764eb544bbe1ccf0$var$FINA,
            6
        ]
    ],
    // State 4: prev was FINA ALAPH,  not willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$MED2,
            $764eb544bbe1ccf0$var$ISOL,
            1
        ],
        [
            $764eb544bbe1ccf0$var$MED2,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$MED2,
            $764eb544bbe1ccf0$var$FIN2,
            5
        ],
        [
            $764eb544bbe1ccf0$var$MED2,
            $764eb544bbe1ccf0$var$ISOL,
            6
        ]
    ],
    // State 5: prev was FIN2/FIN3 ALAPH,  not willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$ISOL,
            $764eb544bbe1ccf0$var$ISOL,
            1
        ],
        [
            $764eb544bbe1ccf0$var$ISOL,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$ISOL,
            $764eb544bbe1ccf0$var$FIN2,
            5
        ],
        [
            $764eb544bbe1ccf0$var$ISOL,
            $764eb544bbe1ccf0$var$ISOL,
            6
        ]
    ],
    // State 6: prev was DALATH/RISH,  not willing to join.
    [
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$NONE,
            0
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            1
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            2
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$FIN3,
            5
        ],
        [
            $764eb544bbe1ccf0$var$NONE,
            $764eb544bbe1ccf0$var$ISOL,
            6
        ]
    ]
];
class $764eb544bbe1ccf0$export$2e2bcd8739ae039 extends (0, $649970d87335b30f$export$2e2bcd8739ae039) {
    static planFeatures(plan) {
        plan.add([
            'ccmp',
            'locl'
        ]);
        for(let i = 0; i < $764eb544bbe1ccf0$var$FEATURES.length; i++){
            let feature = $764eb544bbe1ccf0$var$FEATURES[i];
            plan.addStage(feature, false);
        }
        plan.addStage('mset');
    }
    static assignFeatures(plan, glyphs) {
        super.assignFeatures(plan, glyphs);
        let prev = -1;
        let state = 0;
        let actions = [];
        // Apply the state machine to map glyphs to features
        for(let i = 0; i < glyphs.length; i++){
            let curAction, prevAction;
            var glyph = glyphs[i];
            let type = $764eb544bbe1ccf0$var$getShapingClass(glyph.codePoints[0]);
            if (type === $764eb544bbe1ccf0$var$ShapingClasses.Transparent) {
                actions[i] = $764eb544bbe1ccf0$var$NONE;
                continue;
            }
            [prevAction, curAction, state] = $764eb544bbe1ccf0$var$STATE_TABLE[state][type];
            if (prevAction !== $764eb544bbe1ccf0$var$NONE && prev !== -1) actions[prev] = prevAction;
            actions[i] = curAction;
            prev = i;
        }
        // Apply the chosen features to their respective glyphs
        for(let index = 0; index < glyphs.length; index++){
            let feature;
            var glyph = glyphs[index];
            if (feature = actions[index]) glyph.features[feature] = true;
        }
    }
}
function $764eb544bbe1ccf0$var$getShapingClass(codePoint) {
    let res = $764eb544bbe1ccf0$var$trie.get(codePoint);
    if (res) return res - 1;
    let category = (0, $6uUbQ$getCategory)(codePoint);
    if (category === 'Mn' || category === 'Me' || category === 'Cf') return $764eb544bbe1ccf0$var$ShapingClasses.Transparent;
    return $764eb544bbe1ccf0$var$ShapingClasses.Non_Joining;
}





class $85d408632270248b$export$2e2bcd8739ae039 {
    reset(options = {}, index = 0) {
        this.options = options;
        this.flags = options.flags || {};
        this.markAttachmentType = options.markAttachmentType || 0;
        this.index = index;
    }
    get cur() {
        return this.glyphs[this.index] || null;
    }
    shouldIgnore(glyph) {
        return this.flags.ignoreMarks && glyph.isMark || this.flags.ignoreBaseGlyphs && glyph.isBase || this.flags.ignoreLigatures && glyph.isLigature || this.markAttachmentType && glyph.isMark && glyph.markAttachmentType !== this.markAttachmentType;
    }
    move(dir) {
        this.index += dir;
        while(0 <= this.index && this.index < this.glyphs.length && this.shouldIgnore(this.glyphs[this.index]))this.index += dir;
        if (0 > this.index || this.index >= this.glyphs.length) return null;
        return this.glyphs[this.index];
    }
    next() {
        return this.move(1);
    }
    prev() {
        return this.move(-1);
    }
    peek(count = 1) {
        let idx = this.index;
        let res = this.increment(count);
        this.index = idx;
        return res;
    }
    peekIndex(count = 1) {
        let idx = this.index;
        this.increment(count);
        let res = this.index;
        this.index = idx;
        return res;
    }
    increment(count = 1) {
        let dir = count < 0 ? -1 : 1;
        count = Math.abs(count);
        while(count--)this.move(dir);
        return this.glyphs[this.index];
    }
    constructor(glyphs, options){
        this.glyphs = glyphs;
        this.reset(options);
    }
}



const $a83b9c36aaa94fd3$var$DEFAULT_SCRIPTS = [
    'DFLT',
    'dflt',
    'latn'
];
class $a83b9c36aaa94fd3$export$2e2bcd8739ae039 {
    findScript(script) {
        if (this.table.scriptList == null) return null;
        if (!Array.isArray(script)) script = [
            script
        ];
        for (let s of script)for (let entry of this.table.scriptList){
            if (entry.tag === s) return entry;
        }
        return null;
    }
    selectScript(script, language, direction) {
        let changed = false;
        let entry;
        if (!this.script || script !== this.scriptTag) {
            entry = this.findScript(script);
            if (!entry) entry = this.findScript($a83b9c36aaa94fd3$var$DEFAULT_SCRIPTS);
            if (!entry) return this.scriptTag;
            this.scriptTag = entry.tag;
            this.script = entry.script;
            this.language = null;
            this.languageTag = null;
            changed = true;
        }
        if (!direction || direction !== this.direction) this.direction = direction || $130d1a642ebcd2b7$export$9fddb9d0dd7d8a54(script);
        if (language && language.length < 4) language += ' '.repeat(4 - language.length);
        if (!language || language !== this.languageTag) {
            this.language = null;
            for (let lang of this.script.langSysRecords)if (lang.tag === language) {
                this.language = lang.langSys;
                this.languageTag = lang.tag;
                break;
            }
            if (!this.language) {
                this.language = this.script.defaultLangSys;
                this.languageTag = null;
            }
            changed = true;
        }
        // Build a feature lookup table
        if (changed) {
            this.features = {};
            if (this.language) for (let featureIndex of this.language.featureIndexes){
                let record = this.table.featureList[featureIndex];
                let substituteFeature = this.substituteFeatureForVariations(featureIndex);
                this.features[record.tag] = substituteFeature || record.feature;
            }
        }
        return this.scriptTag;
    }
    lookupsForFeatures(userFeatures = [], exclude) {
        let lookups = [];
        for (let tag of userFeatures){
            let feature = this.features[tag];
            if (!feature) continue;
            for (let lookupIndex of feature.lookupListIndexes){
                if (exclude && exclude.indexOf(lookupIndex) !== -1) continue;
                lookups.push({
                    feature: tag,
                    index: lookupIndex,
                    lookup: this.table.lookupList.get(lookupIndex)
                });
            }
        }
        lookups.sort((a, b)=>a.index - b.index);
        return lookups;
    }
    substituteFeatureForVariations(featureIndex) {
        if (this.variationsIndex === -1) return null;
        let record = this.table.featureVariations.featureVariationRecords[this.variationsIndex];
        let substitutions = record.featureTableSubstitution.substitutions;
        for (let substitution of substitutions){
            if (substitution.featureIndex === featureIndex) return substitution.alternateFeatureTable;
        }
        return null;
    }
    findVariationsIndex(coords) {
        let variations = this.table.featureVariations;
        if (!variations) return -1;
        let records = variations.featureVariationRecords;
        for(let i = 0; i < records.length; i++){
            let conditions = records[i].conditionSet.conditionTable;
            if (this.variationConditionsMatch(conditions, coords)) return i;
        }
        return -1;
    }
    variationConditionsMatch(conditions, coords) {
        return conditions.every((condition)=>{
            let coord = condition.axisIndex < coords.length ? coords[condition.axisIndex] : 0;
            return condition.filterRangeMinValue <= coord && coord <= condition.filterRangeMaxValue;
        });
    }
    applyFeatures(userFeatures, glyphs, advances) {
        let lookups = this.lookupsForFeatures(userFeatures);
        this.applyLookups(lookups, glyphs, advances);
    }
    applyLookups(lookups, glyphs, positions) {
        this.glyphs = glyphs;
        this.positions = positions;
        this.glyphIterator = new (0, $85d408632270248b$export$2e2bcd8739ae039)(glyphs);
        for (let { feature: feature, lookup: lookup } of lookups){
            this.currentFeature = feature;
            this.glyphIterator.reset(lookup.flags);
            while(this.glyphIterator.index < glyphs.length){
                if (!(feature in this.glyphIterator.cur.features)) {
                    this.glyphIterator.next();
                    continue;
                }
                for (let table of lookup.subTables){
                    let res = this.applyLookup(lookup.lookupType, table);
                    if (res) break;
                }
                this.glyphIterator.next();
            }
        }
    }
    applyLookup(lookup, table) {
        throw new Error("applyLookup must be implemented by subclasses");
    }
    applyLookupList(lookupRecords) {
        let options = this.glyphIterator.options;
        let glyphIndex = this.glyphIterator.index;
        for (let lookupRecord of lookupRecords){
            // Reset flags and find glyph index for this lookup record
            this.glyphIterator.reset(options, glyphIndex);
            this.glyphIterator.increment(lookupRecord.sequenceIndex);
            // Get the lookup and setup flags for subtables
            let lookup = this.table.lookupList.get(lookupRecord.lookupListIndex);
            this.glyphIterator.reset(lookup.flags, this.glyphIterator.index);
            // Apply lookup subtables until one matches
            for (let table of lookup.subTables){
                if (this.applyLookup(lookup.lookupType, table)) break;
            }
        }
        this.glyphIterator.reset(options, glyphIndex);
        return true;
    }
    coverageIndex(coverage, glyph) {
        if (glyph == null) glyph = this.glyphIterator.cur.id;
        switch(coverage.version){
            case 1:
                return coverage.glyphs.indexOf(glyph);
            case 2:
                for (let range of coverage.rangeRecords){
                    if (range.start <= glyph && glyph <= range.end) return range.startCoverageIndex + glyph - range.start;
                }
                break;
        }
        return -1;
    }
    match(sequenceIndex, sequence, fn, matched) {
        let pos = this.glyphIterator.index;
        let glyph = this.glyphIterator.increment(sequenceIndex);
        let idx = 0;
        while(idx < sequence.length && glyph && fn(sequence[idx], glyph)){
            if (matched) matched.push(this.glyphIterator.index);
            idx++;
            glyph = this.glyphIterator.next();
        }
        this.glyphIterator.index = pos;
        if (idx < sequence.length) return false;
        return matched || true;
    }
    sequenceMatches(sequenceIndex, sequence) {
        return this.match(sequenceIndex, sequence, (component, glyph)=>component === glyph.id);
    }
    sequenceMatchIndices(sequenceIndex, sequence) {
        return this.match(sequenceIndex, sequence, (component, glyph)=>{
            // If the current feature doesn't apply to this glyph,
            if (!(this.currentFeature in glyph.features)) return false;
            return component === glyph.id;
        }, []);
    }
    coverageSequenceMatches(sequenceIndex, sequence) {
        return this.match(sequenceIndex, sequence, (coverage, glyph)=>this.coverageIndex(coverage, glyph.id) >= 0);
    }
    getClassID(glyph, classDef) {
        switch(classDef.version){
            case 1:
                let i = glyph - classDef.startGlyph;
                if (i >= 0 && i < classDef.classValueArray.length) return classDef.classValueArray[i];
                break;
            case 2:
                for (let range of classDef.classRangeRecord){
                    if (range.start <= glyph && glyph <= range.end) return range.class;
                }
                break;
        }
        return 0;
    }
    classSequenceMatches(sequenceIndex, sequence, classDef) {
        return this.match(sequenceIndex, sequence, (classID, glyph)=>classID === this.getClassID(glyph.id, classDef));
    }
    applyContext(table) {
        let index, set;
        switch(table.version){
            case 1:
                index = this.coverageIndex(table.coverage);
                if (index === -1) return false;
                set = table.ruleSets[index];
                for (let rule of set){
                    if (this.sequenceMatches(1, rule.input)) return this.applyLookupList(rule.lookupRecords);
                }
                break;
            case 2:
                if (this.coverageIndex(table.coverage) === -1) return false;
                index = this.getClassID(this.glyphIterator.cur.id, table.classDef);
                if (index === -1) return false;
                set = table.classSet[index];
                for (let rule of set){
                    if (this.classSequenceMatches(1, rule.classes, table.classDef)) return this.applyLookupList(rule.lookupRecords);
                }
                break;
            case 3:
                if (this.coverageSequenceMatches(0, table.coverages)) return this.applyLookupList(table.lookupRecords);
                break;
        }
        return false;
    }
    applyChainingContext(table) {
        let index;
        switch(table.version){
            case 1:
                index = this.coverageIndex(table.coverage);
                if (index === -1) return false;
                let set = table.chainRuleSets[index];
                for (let rule of set){
                    if (this.sequenceMatches(-rule.backtrack.length, rule.backtrack) && this.sequenceMatches(1, rule.input) && this.sequenceMatches(1 + rule.input.length, rule.lookahead)) return this.applyLookupList(rule.lookupRecords);
                }
                break;
            case 2:
                if (this.coverageIndex(table.coverage) === -1) return false;
                index = this.getClassID(this.glyphIterator.cur.id, table.inputClassDef);
                let rules = table.chainClassSet[index];
                if (!rules) return false;
                for (let rule of rules){
                    if (this.classSequenceMatches(-rule.backtrack.length, rule.backtrack, table.backtrackClassDef) && this.classSequenceMatches(1, rule.input, table.inputClassDef) && this.classSequenceMatches(1 + rule.input.length, rule.lookahead, table.lookaheadClassDef)) return this.applyLookupList(rule.lookupRecords);
                }
                break;
            case 3:
                if (this.coverageSequenceMatches(-table.backtrackGlyphCount, table.backtrackCoverage) && this.coverageSequenceMatches(0, table.inputCoverage) && this.coverageSequenceMatches(table.inputGlyphCount, table.lookaheadCoverage)) return this.applyLookupList(table.lookupRecords);
                break;
        }
        return false;
    }
    constructor(font, table){
        this.font = font;
        this.table = table;
        this.script = null;
        this.scriptTag = null;
        this.language = null;
        this.languageTag = null;
        this.features = {};
        this.lookups = {};
        // Setup variation substitutions
        this.variationsIndex = font._variationProcessor ? this.findVariationsIndex(font._variationProcessor.normalizedCoords) : -1;
        // initialize to default script + language
        this.selectScript();
        // current context (set by applyFeatures)
        this.glyphs = [];
        this.positions = []; // only used by GPOS
        this.ligatureID = 1;
        this.currentFeature = null;
    }
}


class $10e7b257e1a9a756$export$2e2bcd8739ae039 {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
        this.substituted = true;
        let GDEF = this._font.GDEF;
        if (GDEF && GDEF.glyphClassDef) {
            // TODO: clean this up
            let classID = (0, $a83b9c36aaa94fd3$export$2e2bcd8739ae039).prototype.getClassID(id, GDEF.glyphClassDef);
            this.isBase = classID === 1;
            this.isLigature = classID === 2;
            this.isMark = classID === 3;
            this.markAttachmentType = GDEF.markAttachClassDef ? (0, $a83b9c36aaa94fd3$export$2e2bcd8739ae039).prototype.getClassID(id, GDEF.markAttachClassDef) : 0;
        } else {
            this.isMark = this.codePoints.length > 0 && this.codePoints.every((0, $6uUbQ$isMark));
            this.isBase = !this.isMark;
            this.isLigature = this.codePoints.length > 1;
            this.markAttachmentType = 0;
        }
    }
    copy() {
        return new $10e7b257e1a9a756$export$2e2bcd8739ae039(this._font, this.id, this.codePoints, this.features);
    }
    constructor(font, id, codePoints = [], features){
        this._font = font;
        this.codePoints = codePoints;
        this.id = id;
        this.features = {};
        if (Array.isArray(features)) for(let i = 0; i < features.length; i++){
            let feature = features[i];
            this.features[feature] = true;
        }
        else if (typeof features === 'object') Object.assign(this.features, features);
        this.ligatureID = null;
        this.ligatureComponent = null;
        this.isLigated = false;
        this.cursiveAttachment = null;
        this.markAttachment = null;
        this.shaperInfo = null;
        this.substituted = false;
        this.isMultiplied = false;
    }
}


class $e1c6bbc8cb416f8c$export$2e2bcd8739ae039 extends (0, $649970d87335b30f$export$2e2bcd8739ae039) {
    static planFeatures(plan) {
        plan.add([
            'ljmo',
            'vjmo',
            'tjmo'
        ], false);
    }
    static assignFeatures(plan, glyphs) {
        let state = 0;
        let i = 0;
        while(i < glyphs.length){
            let action;
            let glyph = glyphs[i];
            let code = glyph.codePoints[0];
            let type = $e1c6bbc8cb416f8c$var$getType(code);
            [action, state] = $e1c6bbc8cb416f8c$var$STATE_TABLE[state][type];
            switch(action){
                case $e1c6bbc8cb416f8c$var$DECOMPOSE:
                    // Decompose the composed syllable if it is not supported by the font.
                    if (!plan.font.hasGlyphForCodePoint(code)) i = $e1c6bbc8cb416f8c$var$decompose(glyphs, i, plan.font);
                    break;
                case $e1c6bbc8cb416f8c$var$COMPOSE:
                    // Found a decomposed syllable. Try to compose if supported by the font.
                    i = $e1c6bbc8cb416f8c$var$compose(glyphs, i, plan.font);
                    break;
                case $e1c6bbc8cb416f8c$var$TONE_MARK:
                    // Got a valid syllable, followed by a tone mark. Move the tone mark to the beginning of the syllable.
                    $e1c6bbc8cb416f8c$var$reorderToneMark(glyphs, i, plan.font);
                    break;
                case $e1c6bbc8cb416f8c$var$INVALID:
                    // Tone mark has no valid syllable to attach to, so insert a dotted circle
                    i = $e1c6bbc8cb416f8c$var$insertDottedCircle(glyphs, i, plan.font);
                    break;
            }
            i++;
        }
    }
}
(0, $6uUbQ$_)($e1c6bbc8cb416f8c$export$2e2bcd8739ae039, "zeroMarkWidths", 'NONE');
const $e1c6bbc8cb416f8c$var$HANGUL_BASE = 0xac00;
const $e1c6bbc8cb416f8c$var$HANGUL_END = 0xd7a4;
const $e1c6bbc8cb416f8c$var$HANGUL_COUNT = $e1c6bbc8cb416f8c$var$HANGUL_END - $e1c6bbc8cb416f8c$var$HANGUL_BASE + 1;
const $e1c6bbc8cb416f8c$var$L_BASE = 0x1100; // lead
const $e1c6bbc8cb416f8c$var$V_BASE = 0x1161; // vowel
const $e1c6bbc8cb416f8c$var$T_BASE = 0x11a7; // trail
const $e1c6bbc8cb416f8c$var$L_COUNT = 19;
const $e1c6bbc8cb416f8c$var$V_COUNT = 21;
const $e1c6bbc8cb416f8c$var$T_COUNT = 28;
const $e1c6bbc8cb416f8c$var$L_END = $e1c6bbc8cb416f8c$var$L_BASE + $e1c6bbc8cb416f8c$var$L_COUNT - 1;
const $e1c6bbc8cb416f8c$var$V_END = $e1c6bbc8cb416f8c$var$V_BASE + $e1c6bbc8cb416f8c$var$V_COUNT - 1;
const $e1c6bbc8cb416f8c$var$T_END = $e1c6bbc8cb416f8c$var$T_BASE + $e1c6bbc8cb416f8c$var$T_COUNT - 1;
const $e1c6bbc8cb416f8c$var$DOTTED_CIRCLE = 0x25cc;
const $e1c6bbc8cb416f8c$var$isL = (code)=>0x1100 <= code && code <= 0x115f || 0xa960 <= code && code <= 0xa97c;
const $e1c6bbc8cb416f8c$var$isV = (code)=>0x1160 <= code && code <= 0x11a7 || 0xd7b0 <= code && code <= 0xd7c6;
const $e1c6bbc8cb416f8c$var$isT = (code)=>0x11a8 <= code && code <= 0x11ff || 0xd7cb <= code && code <= 0xd7fb;
const $e1c6bbc8cb416f8c$var$isTone = (code)=>0x302e <= code && code <= 0x302f;
const $e1c6bbc8cb416f8c$var$isLVT = (code)=>$e1c6bbc8cb416f8c$var$HANGUL_BASE <= code && code <= $e1c6bbc8cb416f8c$var$HANGUL_END;
const $e1c6bbc8cb416f8c$var$isLV = (code)=>code - $e1c6bbc8cb416f8c$var$HANGUL_BASE < $e1c6bbc8cb416f8c$var$HANGUL_COUNT && (code - $e1c6bbc8cb416f8c$var$HANGUL_BASE) % $e1c6bbc8cb416f8c$var$T_COUNT === 0;
const $e1c6bbc8cb416f8c$var$isCombiningL = (code)=>$e1c6bbc8cb416f8c$var$L_BASE <= code && code <= $e1c6bbc8cb416f8c$var$L_END;
const $e1c6bbc8cb416f8c$var$isCombiningV = (code)=>$e1c6bbc8cb416f8c$var$V_BASE <= code && code <= $e1c6bbc8cb416f8c$var$V_END;
const $e1c6bbc8cb416f8c$var$isCombiningT = (code)=>$e1c6bbc8cb416f8c$var$T_BASE + 1 && 1 <= code && code <= $e1c6bbc8cb416f8c$var$T_END;
// Character categories
const $e1c6bbc8cb416f8c$var$X = 0; // Other character
const $e1c6bbc8cb416f8c$var$L = 1; // Leading consonant
const $e1c6bbc8cb416f8c$var$V = 2; // Medial vowel
const $e1c6bbc8cb416f8c$var$T = 3; // Trailing consonant
const $e1c6bbc8cb416f8c$var$LV = 4; // Composed <LV> syllable
const $e1c6bbc8cb416f8c$var$LVT = 5; // Composed <LVT> syllable
const $e1c6bbc8cb416f8c$var$M = 6; // Tone mark
// This function classifies a character using the above categories.
function $e1c6bbc8cb416f8c$var$getType(code) {
    if ($e1c6bbc8cb416f8c$var$isL(code)) return $e1c6bbc8cb416f8c$var$L;
    if ($e1c6bbc8cb416f8c$var$isV(code)) return $e1c6bbc8cb416f8c$var$V;
    if ($e1c6bbc8cb416f8c$var$isT(code)) return $e1c6bbc8cb416f8c$var$T;
    if ($e1c6bbc8cb416f8c$var$isLV(code)) return $e1c6bbc8cb416f8c$var$LV;
    if ($e1c6bbc8cb416f8c$var$isLVT(code)) return $e1c6bbc8cb416f8c$var$LVT;
    if ($e1c6bbc8cb416f8c$var$isTone(code)) return $e1c6bbc8cb416f8c$var$M;
    return $e1c6bbc8cb416f8c$var$X;
}
// State machine actions
const $e1c6bbc8cb416f8c$var$NO_ACTION = 0;
const $e1c6bbc8cb416f8c$var$DECOMPOSE = 1;
const $e1c6bbc8cb416f8c$var$COMPOSE = 2;
const $e1c6bbc8cb416f8c$var$TONE_MARK = 4;
const $e1c6bbc8cb416f8c$var$INVALID = 5;
// Build a state machine that accepts valid syllables, and applies actions along the way.
// The logic this is implementing is documented at the top of the file.
const $e1c6bbc8cb416f8c$var$STATE_TABLE = [
    //       X                 L                 V                T                  LV                LVT               M
    // State 0: start state
    [
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            1
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            2
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            3
        ],
        [
            $e1c6bbc8cb416f8c$var$INVALID,
            0
        ]
    ],
    // State 1: <L>
    [
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            1
        ],
        [
            $e1c6bbc8cb416f8c$var$COMPOSE,
            2
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            2
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            3
        ],
        [
            $e1c6bbc8cb416f8c$var$INVALID,
            0
        ]
    ],
    // State 2: <L,V> or <LV>
    [
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            1
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$COMPOSE,
            3
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            2
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            3
        ],
        [
            $e1c6bbc8cb416f8c$var$TONE_MARK,
            0
        ]
    ],
    // State 3: <L,V,T> or <LVT>
    [
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            1
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$NO_ACTION,
            0
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            2
        ],
        [
            $e1c6bbc8cb416f8c$var$DECOMPOSE,
            3
        ],
        [
            $e1c6bbc8cb416f8c$var$TONE_MARK,
            0
        ]
    ]
];
function $e1c6bbc8cb416f8c$var$getGlyph(font, code, features) {
    return new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(font, font.glyphForCodePoint(code).id, [
        code
    ], features);
}
function $e1c6bbc8cb416f8c$var$decompose(glyphs, i, font) {
    let glyph = glyphs[i];
    let code = glyph.codePoints[0];
    let s = code - $e1c6bbc8cb416f8c$var$HANGUL_BASE;
    let t = $e1c6bbc8cb416f8c$var$T_BASE + s % $e1c6bbc8cb416f8c$var$T_COUNT;
    s = s / $e1c6bbc8cb416f8c$var$T_COUNT | 0;
    let l = $e1c6bbc8cb416f8c$var$L_BASE + s / $e1c6bbc8cb416f8c$var$V_COUNT | 0;
    let v = $e1c6bbc8cb416f8c$var$V_BASE + s % $e1c6bbc8cb416f8c$var$V_COUNT;
    // Don't decompose if all of the components are not available
    if (!font.hasGlyphForCodePoint(l) || !font.hasGlyphForCodePoint(v) || t !== $e1c6bbc8cb416f8c$var$T_BASE && !font.hasGlyphForCodePoint(t)) return i;
    // Replace the current glyph with decomposed L, V, and T glyphs,
    // and apply the proper OpenType features to each component.
    let ljmo = $e1c6bbc8cb416f8c$var$getGlyph(font, l, glyph.features);
    ljmo.features.ljmo = true;
    let vjmo = $e1c6bbc8cb416f8c$var$getGlyph(font, v, glyph.features);
    vjmo.features.vjmo = true;
    let insert = [
        ljmo,
        vjmo
    ];
    if (t > $e1c6bbc8cb416f8c$var$T_BASE) {
        let tjmo = $e1c6bbc8cb416f8c$var$getGlyph(font, t, glyph.features);
        tjmo.features.tjmo = true;
        insert.push(tjmo);
    }
    glyphs.splice(i, 1, ...insert);
    return i + insert.length - 1;
}
function $e1c6bbc8cb416f8c$var$compose(glyphs, i, font) {
    let glyph = glyphs[i];
    let code = glyphs[i].codePoints[0];
    let type = $e1c6bbc8cb416f8c$var$getType(code);
    let prev = glyphs[i - 1].codePoints[0];
    let prevType = $e1c6bbc8cb416f8c$var$getType(prev);
    // Figure out what type of syllable we're dealing with
    let lv, ljmo, vjmo, tjmo;
    if (prevType === $e1c6bbc8cb416f8c$var$LV && type === $e1c6bbc8cb416f8c$var$T) {
        // <LV,T>
        lv = prev;
        tjmo = glyph;
    } else {
        if (type === $e1c6bbc8cb416f8c$var$V) {
            // <L,V>
            ljmo = glyphs[i - 1];
            vjmo = glyph;
        } else {
            // <L,V,T>
            ljmo = glyphs[i - 2];
            vjmo = glyphs[i - 1];
            tjmo = glyph;
        }
        let l = ljmo.codePoints[0];
        let v = vjmo.codePoints[0];
        // Make sure L and V are combining characters
        if ($e1c6bbc8cb416f8c$var$isCombiningL(l) && $e1c6bbc8cb416f8c$var$isCombiningV(v)) lv = $e1c6bbc8cb416f8c$var$HANGUL_BASE + ((l - $e1c6bbc8cb416f8c$var$L_BASE) * $e1c6bbc8cb416f8c$var$V_COUNT + (v - $e1c6bbc8cb416f8c$var$V_BASE)) * $e1c6bbc8cb416f8c$var$T_COUNT;
    }
    let t = tjmo && tjmo.codePoints[0] || $e1c6bbc8cb416f8c$var$T_BASE;
    if (lv != null && (t === $e1c6bbc8cb416f8c$var$T_BASE || $e1c6bbc8cb416f8c$var$isCombiningT(t))) {
        let s = lv + (t - $e1c6bbc8cb416f8c$var$T_BASE);
        // Replace with a composed glyph if supported by the font,
        // otherwise apply the proper OpenType features to each component.
        if (font.hasGlyphForCodePoint(s)) {
            let del = prevType === $e1c6bbc8cb416f8c$var$V ? 3 : 2;
            glyphs.splice(i - del + 1, del, $e1c6bbc8cb416f8c$var$getGlyph(font, s, glyph.features));
            return i - del + 1;
        }
    }
    // Didn't compose (either a non-combining component or unsupported by font).
    if (ljmo) ljmo.features.ljmo = true;
    if (vjmo) vjmo.features.vjmo = true;
    if (tjmo) tjmo.features.tjmo = true;
    if (prevType === $e1c6bbc8cb416f8c$var$LV) {
        // Sequence was originally <L,V>, which got combined earlier.
        // Either the T was non-combining, or the LVT glyph wasn't supported.
        // Decompose the glyph again and apply OT features.
        $e1c6bbc8cb416f8c$var$decompose(glyphs, i - 1, font);
        return i + 1;
    }
    return i;
}
function $e1c6bbc8cb416f8c$var$getLength(code) {
    switch($e1c6bbc8cb416f8c$var$getType(code)){
        case $e1c6bbc8cb416f8c$var$LV:
        case $e1c6bbc8cb416f8c$var$LVT:
            return 1;
        case $e1c6bbc8cb416f8c$var$V:
            return 2;
        case $e1c6bbc8cb416f8c$var$T:
            return 3;
    }
}
function $e1c6bbc8cb416f8c$var$reorderToneMark(glyphs, i, font) {
    let glyph = glyphs[i];
    let code = glyphs[i].codePoints[0];
    // Move tone mark to the beginning of the previous syllable, unless it is zero width
    if (font.glyphForCodePoint(code).advanceWidth === 0) return;
    let prev = glyphs[i - 1].codePoints[0];
    let len = $e1c6bbc8cb416f8c$var$getLength(prev);
    glyphs.splice(i, 1);
    return glyphs.splice(i - len, 0, glyph);
}
function $e1c6bbc8cb416f8c$var$insertDottedCircle(glyphs, i, font) {
    let glyph = glyphs[i];
    let code = glyphs[i].codePoints[0];
    if (font.hasGlyphForCodePoint($e1c6bbc8cb416f8c$var$DOTTED_CIRCLE)) {
        let dottedCircle = $e1c6bbc8cb416f8c$var$getGlyph(font, $e1c6bbc8cb416f8c$var$DOTTED_CIRCLE, glyph.features);
        // If the tone mark is zero width, insert the dotted circle before, otherwise after
        let idx = font.glyphForCodePoint(code).advanceWidth === 0 ? i : i + 1;
        glyphs.splice(idx, 0, dottedCircle);
        i++;
    }
    return i;
}









var $4b0735ca6c692ea5$exports = {};
$4b0735ca6c692ea5$exports = JSON.parse("{\"stateTable\":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,3,4,5,6,7,8,9,0,10,11,11,12,13,14,15,16,17],[0,0,0,18,19,20,21,22,23,0,24,0,0,25,26,0,0,27,0],[0,0,0,28,29,30,31,32,33,0,34,0,0,35,36,0,0,37,0],[0,0,0,38,5,7,7,8,9,0,10,0,0,0,13,0,0,16,0],[0,39,0,0,0,40,41,0,9,0,10,0,0,0,42,0,39,0,0],[0,0,0,0,43,44,44,8,9,0,0,0,0,12,43,0,0,0,0],[0,0,0,0,43,44,44,8,9,0,0,0,0,0,43,0,0,0,0],[0,0,0,45,46,47,48,49,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,50,0,0,51,0,10,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,52,0,0,0,0,0,0,0,0],[0,0,0,53,54,55,56,57,58,0,59,0,0,60,61,0,0,62,0],[0,0,0,4,5,7,7,8,9,0,10,0,0,0,13,0,0,16,0],[0,63,64,0,0,40,41,0,9,0,10,0,0,0,42,0,63,0,0],[0,2,3,4,5,6,7,8,9,0,10,11,11,12,13,0,2,16,0],[0,0,0,18,65,20,21,22,23,0,24,0,0,25,26,0,0,27,0],[0,0,0,0,66,67,67,8,9,0,10,0,0,0,68,0,0,0,0],[0,0,0,69,0,70,70,0,71,0,72,0,0,0,0,0,0,0,0],[0,0,0,73,19,74,74,22,23,0,24,0,0,0,26,0,0,27,0],[0,75,0,0,0,76,77,0,23,0,24,0,0,0,78,0,75,0,0],[0,0,0,0,79,80,80,22,23,0,0,0,0,25,79,0,0,0,0],[0,0,0,18,19,20,74,22,23,0,24,0,0,25,26,0,0,27,0],[0,0,0,81,82,83,84,85,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,86,0,0,87,0,24,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,88,0,0,0,0,0,0,0,0],[0,0,0,18,19,74,74,22,23,0,24,0,0,0,26,0,0,27,0],[0,89,90,0,0,76,77,0,23,0,24,0,0,0,78,0,89,0,0],[0,0,0,0,91,92,92,22,23,0,24,0,0,0,93,0,0,0,0],[0,0,0,94,29,95,31,32,33,0,34,0,0,0,36,0,0,37,0],[0,96,0,0,0,97,98,0,33,0,34,0,0,0,99,0,96,0,0],[0,0,0,0,100,101,101,32,33,0,0,0,0,35,100,0,0,0,0],[0,0,0,0,100,101,101,32,33,0,0,0,0,0,100,0,0,0,0],[0,0,0,102,103,104,105,106,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,107,0,0,108,0,34,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,109,0,0,0,0,0,0,0,0],[0,0,0,28,29,95,31,32,33,0,34,0,0,0,36,0,0,37,0],[0,110,111,0,0,97,98,0,33,0,34,0,0,0,99,0,110,0,0],[0,0,0,0,112,113,113,32,33,0,34,0,0,0,114,0,0,0,0],[0,0,0,0,5,7,7,8,9,0,10,0,0,0,13,0,0,16,0],[0,0,0,115,116,117,118,8,9,0,10,0,0,119,120,0,0,16,0],[0,0,0,0,0,121,121,0,9,0,10,0,0,0,42,0,0,0,0],[0,39,0,122,0,123,123,8,9,0,10,0,0,0,42,0,39,0,0],[0,124,64,0,0,0,0,0,0,0,0,0,0,0,0,0,124,0,0],[0,39,0,0,0,121,125,0,9,0,10,0,0,0,42,0,39,0,0],[0,0,0,0,0,126,126,8,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,46,47,48,49,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,47,47,49,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,127,127,49,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,128,127,127,49,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,129,130,131,132,133,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0],[0,0,0,0,0,50,0,0,0,0,10,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,134,0,0,0,0,0,0,0,0],[0,0,0,135,54,56,56,57,58,0,59,0,0,0,61,0,0,62,0],[0,136,0,0,0,137,138,0,58,0,59,0,0,0,139,0,136,0,0],[0,0,0,0,140,141,141,57,58,0,0,0,0,60,140,0,0,0,0],[0,0,0,0,140,141,141,57,58,0,0,0,0,0,140,0,0,0,0],[0,0,0,142,143,144,145,146,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,147,0,0,148,0,59,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,149,0,0,0,0,0,0,0,0],[0,0,0,53,54,56,56,57,58,0,59,0,0,0,61,0,0,62,0],[0,150,151,0,0,137,138,0,58,0,59,0,0,0,139,0,150,0,0],[0,0,0,0,152,153,153,57,58,0,59,0,0,0,154,0,0,0,0],[0,0,0,155,116,156,157,8,9,0,10,0,0,158,120,0,0,16,0],[0,0,0,0,0,121,121,0,9,0,10,0,0,0,0,0,0,0,0],[0,75,3,4,5,159,160,8,161,0,162,0,11,12,163,0,75,16,0],[0,0,0,0,0,40,164,0,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,165,44,44,8,9,0,0,0,0,0,165,0,0,0,0],[0,124,64,0,0,40,164,0,9,0,10,0,0,0,42,0,124,0,0],[0,0,0,0,0,70,70,0,71,0,72,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,166,0,0,167,0,72,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,168,0,0,0,0,0,0,0,0],[0,0,0,0,19,74,74,22,23,0,24,0,0,0,26,0,0,27,0],[0,0,0,0,79,80,80,22,23,0,0,0,0,0,79,0,0,0,0],[0,0,0,169,170,171,172,22,23,0,24,0,0,173,174,0,0,27,0],[0,0,0,0,0,175,175,0,23,0,24,0,0,0,78,0,0,0,0],[0,75,0,176,0,177,177,22,23,0,24,0,0,0,78,0,75,0,0],[0,178,90,0,0,0,0,0,0,0,0,0,0,0,0,0,178,0,0],[0,75,0,0,0,175,179,0,23,0,24,0,0,0,78,0,75,0,0],[0,0,0,0,0,180,180,22,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,82,83,84,85,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,83,83,85,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,181,181,85,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,182,181,181,85,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,183,184,185,186,187,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0],[0,0,0,0,0,86,0,0,0,0,24,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,188,0,0,0,0,0,0,0,0],[0,0,0,189,170,190,191,22,23,0,24,0,0,192,174,0,0,27,0],[0,0,0,0,0,175,175,0,23,0,24,0,0,0,0,0,0,0,0],[0,0,0,0,0,76,193,0,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,194,80,80,22,23,0,0,0,0,0,194,0,0,0,0],[0,178,90,0,0,76,193,0,23,0,24,0,0,0,78,0,178,0,0],[0,0,0,0,29,95,31,32,33,0,34,0,0,0,36,0,0,37,0],[0,0,0,0,100,101,101,32,33,0,0,0,0,0,100,0,0,0,0],[0,0,0,195,196,197,198,32,33,0,34,0,0,199,200,0,0,37,0],[0,0,0,0,0,201,201,0,33,0,34,0,0,0,99,0,0,0,0],[0,96,0,202,0,203,203,32,33,0,34,0,0,0,99,0,96,0,0],[0,204,111,0,0,0,0,0,0,0,0,0,0,0,0,0,204,0,0],[0,96,0,0,0,201,205,0,33,0,34,0,0,0,99,0,96,0,0],[0,0,0,0,0,206,206,32,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,103,104,105,106,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,104,104,106,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,207,207,106,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,208,207,207,106,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,209,210,211,212,213,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,34,0,0,0,0,0,0,0,0],[0,0,0,0,0,107,0,0,0,0,34,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,214,0,0,0,0,0,0,0,0],[0,0,0,215,196,216,217,32,33,0,34,0,0,218,200,0,0,37,0],[0,0,0,0,0,201,201,0,33,0,34,0,0,0,0,0,0,0,0],[0,0,0,0,0,97,219,0,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,220,101,101,32,33,0,0,0,0,0,220,0,0,0,0],[0,204,111,0,0,97,219,0,33,0,34,0,0,0,99,0,204,0,0],[0,0,0,221,116,222,222,8,9,0,10,0,0,0,120,0,0,16,0],[0,223,0,0,0,40,224,0,9,0,10,0,0,0,42,0,223,0,0],[0,0,0,0,225,44,44,8,9,0,0,0,0,119,225,0,0,0,0],[0,0,0,115,116,117,222,8,9,0,10,0,0,119,120,0,0,16,0],[0,0,0,115,116,222,222,8,9,0,10,0,0,0,120,0,0,16,0],[0,226,64,0,0,40,224,0,9,0,10,0,0,0,42,0,226,0,0],[0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0],[0,39,0,0,0,121,121,0,9,0,10,0,0,0,42,0,39,0,0],[0,0,0,0,0,44,44,8,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,227,0,228,229,0,9,0,10,0,0,230,0,0,0,0,0],[0,39,0,122,0,121,121,0,9,0,10,0,0,0,42,0,39,0,0],[0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,231,231,49,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,232,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,130,131,132,133,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,131,131,133,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,233,233,133,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,234,233,233,133,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,235,236,237,238,239,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,54,56,56,57,58,0,59,0,0,0,61,0,0,62,0],[0,0,0,240,241,242,243,57,58,0,59,0,0,244,245,0,0,62,0],[0,0,0,0,0,246,246,0,58,0,59,0,0,0,139,0,0,0,0],[0,136,0,247,0,248,248,57,58,0,59,0,0,0,139,0,136,0,0],[0,249,151,0,0,0,0,0,0,0,0,0,0,0,0,0,249,0,0],[0,136,0,0,0,246,250,0,58,0,59,0,0,0,139,0,136,0,0],[0,0,0,0,0,251,251,57,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,143,144,145,146,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,144,144,146,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,252,252,146,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,253,252,252,146,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,254,255,256,257,258,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0,0],[0,0,0,0,0,147,0,0,0,0,59,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,259,0,0,0,0,0,0,0,0],[0,0,0,260,241,261,262,57,58,0,59,0,0,263,245,0,0,62,0],[0,0,0,0,0,246,246,0,58,0,59,0,0,0,0,0,0,0,0],[0,0,0,0,0,137,264,0,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,265,141,141,57,58,0,0,0,0,0,265,0,0,0,0],[0,249,151,0,0,137,264,0,58,0,59,0,0,0,139,0,249,0,0],[0,0,0,221,116,222,222,8,9,0,10,0,0,0,120,0,0,16,0],[0,0,0,0,225,44,44,8,9,0,0,0,0,158,225,0,0,0,0],[0,0,0,155,116,156,222,8,9,0,10,0,0,158,120,0,0,16,0],[0,0,0,155,116,222,222,8,9,0,10,0,0,0,120,0,0,16,0],[0,0,0,0,43,266,266,8,161,0,24,0,0,12,267,0,0,0,0],[0,75,0,176,43,268,268,269,161,0,24,0,0,0,267,0,75,0,0],[0,0,0,0,0,270,0,0,271,0,162,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,272,0,0,0,0,0,0,0,0],[0,273,274,0,0,40,41,0,9,0,10,0,0,0,42,0,273,0,0],[0,0,0,40,0,123,123,8,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,121,275,0,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,72,0,0,0,0,0,0,0,0],[0,0,0,0,0,166,0,0,0,0,72,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,276,0,0,0,0,0,0,0,0],[0,0,0,277,170,278,278,22,23,0,24,0,0,0,174,0,0,27,0],[0,279,0,0,0,76,280,0,23,0,24,0,0,0,78,0,279,0,0],[0,0,0,0,281,80,80,22,23,0,0,0,0,173,281,0,0,0,0],[0,0,0,169,170,171,278,22,23,0,24,0,0,173,174,0,0,27,0],[0,0,0,169,170,278,278,22,23,0,24,0,0,0,174,0,0,27,0],[0,282,90,0,0,76,280,0,23,0,24,0,0,0,78,0,282,0,0],[0,0,0,0,0,0,0,0,23,0,0,0,0,0,0,0,0,0,0],[0,75,0,0,0,175,175,0,23,0,24,0,0,0,78,0,75,0,0],[0,0,0,0,0,80,80,22,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,283,0,284,285,0,23,0,24,0,0,286,0,0,0,0,0],[0,75,0,176,0,175,175,0,23,0,24,0,0,0,78,0,75,0,0],[0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,287,287,85,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,288,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,184,185,186,187,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,185,185,187,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,289,289,187,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,290,289,289,187,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,291,292,293,294,295,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,277,170,278,278,22,23,0,24,0,0,0,174,0,0,27,0],[0,0,0,0,281,80,80,22,23,0,0,0,0,192,281,0,0,0,0],[0,0,0,189,170,190,278,22,23,0,24,0,0,192,174,0,0,27,0],[0,0,0,189,170,278,278,22,23,0,24,0,0,0,174,0,0,27,0],[0,0,0,76,0,177,177,22,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,175,296,0,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,297,196,298,298,32,33,0,34,0,0,0,200,0,0,37,0],[0,299,0,0,0,97,300,0,33,0,34,0,0,0,99,0,299,0,0],[0,0,0,0,301,101,101,32,33,0,0,0,0,199,301,0,0,0,0],[0,0,0,195,196,197,298,32,33,0,34,0,0,199,200,0,0,37,0],[0,0,0,195,196,298,298,32,33,0,34,0,0,0,200,0,0,37,0],[0,302,111,0,0,97,300,0,33,0,34,0,0,0,99,0,302,0,0],[0,0,0,0,0,0,0,0,33,0,0,0,0,0,0,0,0,0,0],[0,96,0,0,0,201,201,0,33,0,34,0,0,0,99,0,96,0,0],[0,0,0,0,0,101,101,32,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,303,0,304,305,0,33,0,34,0,0,306,0,0,0,0,0],[0,96,0,202,0,201,201,0,33,0,34,0,0,0,99,0,96,0,0],[0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,307,307,106,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,308,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,210,211,212,213,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,211,211,213,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,309,309,213,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,310,309,309,213,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,311,312,313,314,315,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,297,196,298,298,32,33,0,34,0,0,0,200,0,0,37,0],[0,0,0,0,301,101,101,32,33,0,0,0,0,218,301,0,0,0,0],[0,0,0,215,196,216,298,32,33,0,34,0,0,218,200,0,0,37,0],[0,0,0,215,196,298,298,32,33,0,34,0,0,0,200,0,0,37,0],[0,0,0,97,0,203,203,32,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,201,316,0,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,116,222,222,8,9,0,10,0,0,0,120,0,0,16,0],[0,0,0,0,225,44,44,8,9,0,0,0,0,0,225,0,0,0,0],[0,0,0,317,318,319,320,8,9,0,10,0,0,321,322,0,0,16,0],[0,223,0,323,0,123,123,8,9,0,10,0,0,0,42,0,223,0,0],[0,223,0,0,0,121,324,0,9,0,10,0,0,0,42,0,223,0,0],[0,0,0,325,318,326,327,8,9,0,10,0,0,328,322,0,0,16,0],[0,0,0,64,0,121,121,0,9,0,10,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,9,0,0,0,0,230,0,0,0,0,0],[0,0,0,227,0,228,121,0,9,0,10,0,0,230,0,0,0,0,0],[0,0,0,227,0,121,121,0,9,0,10,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,49,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,46,0,0],[0,0,0,0,0,329,329,133,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,330,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,236,237,238,239,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,237,237,239,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,331,331,239,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,332,331,331,239,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,333,40,121,334,0,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,335,241,336,336,57,58,0,59,0,0,0,245,0,0,62,0],[0,337,0,0,0,137,338,0,58,0,59,0,0,0,139,0,337,0,0],[0,0,0,0,339,141,141,57,58,0,0,0,0,244,339,0,0,0,0],[0,0,0,240,241,242,336,57,58,0,59,0,0,244,245,0,0,62,0],[0,0,0,240,241,336,336,57,58,0,59,0,0,0,245,0,0,62,0],[0,340,151,0,0,137,338,0,58,0,59,0,0,0,139,0,340,0,0],[0,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,0,0,0],[0,136,0,0,0,246,246,0,58,0,59,0,0,0,139,0,136,0,0],[0,0,0,0,0,141,141,57,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,341,0,342,343,0,58,0,59,0,0,344,0,0,0,0,0],[0,136,0,247,0,246,246,0,58,0,59,0,0,0,139,0,136,0,0],[0,0,0,0,0,0,0,57,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,345,345,146,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,346,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,255,256,257,258,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,256,256,258,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,347,347,258,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,348,347,347,258,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,349,350,351,352,353,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,335,241,336,336,57,58,0,59,0,0,0,245,0,0,62,0],[0,0,0,0,339,141,141,57,58,0,0,0,0,263,339,0,0,0,0],[0,0,0,260,241,261,336,57,58,0,59,0,0,263,245,0,0,62,0],[0,0,0,260,241,336,336,57,58,0,59,0,0,0,245,0,0,62,0],[0,0,0,137,0,248,248,57,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,246,354,0,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,126,126,8,23,0,0,0,0,0,0,0,0,0,0],[0,355,90,0,0,121,125,0,9,0,10,0,0,0,42,0,355,0,0],[0,0,0,0,0,356,356,269,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,357,358,359,360,361,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,162,0,0,0,0,0,0,0,0],[0,0,0,0,0,270,0,0,0,0,162,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,363,0,0,0,0,0,0,0,0],[0,0,0,364,116,365,366,8,161,0,162,0,0,367,120,0,0,16,0],[0,0,0,0,0,368,368,0,161,0,162,0,0,0,0,0,0,0,0],[0,0,0,40,0,121,121,0,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,170,278,278,22,23,0,24,0,0,0,174,0,0,27,0],[0,0,0,0,281,80,80,22,23,0,0,0,0,0,281,0,0,0,0],[0,0,0,369,370,371,372,22,23,0,24,0,0,373,374,0,0,27,0],[0,279,0,375,0,177,177,22,23,0,24,0,0,0,78,0,279,0,0],[0,279,0,0,0,175,376,0,23,0,24,0,0,0,78,0,279,0,0],[0,0,0,377,370,378,379,22,23,0,24,0,0,380,374,0,0,27,0],[0,0,0,90,0,175,175,0,23,0,24,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,23,0,0,0,0,286,0,0,0,0,0],[0,0,0,283,0,284,175,0,23,0,24,0,0,286,0,0,0,0,0],[0,0,0,283,0,175,175,0,23,0,24,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,85,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,82,0,0],[0,0,0,0,0,381,381,187,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,382,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,292,293,294,295,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,293,293,295,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,0,383,383,295,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,384,383,383,295,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,385,76,175,386,0,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,76,0,175,175,0,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,196,298,298,32,33,0,34,0,0,0,200,0,0,37,0],[0,0,0,0,301,101,101,32,33,0,0,0,0,0,301,0,0,0,0],[0,0,0,387,388,389,390,32,33,0,34,0,0,391,392,0,0,37,0],[0,299,0,393,0,203,203,32,33,0,34,0,0,0,99,0,299,0,0],[0,299,0,0,0,201,394,0,33,0,34,0,0,0,99,0,299,0,0],[0,0,0,395,388,396,397,32,33,0,34,0,0,398,392,0,0,37,0],[0,0,0,111,0,201,201,0,33,0,34,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,33,0,0,0,0,306,0,0,0,0,0],[0,0,0,303,0,304,201,0,33,0,34,0,0,306,0,0,0,0,0],[0,0,0,303,0,201,201,0,33,0,34,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,106,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103,0,0],[0,0,0,0,0,399,399,213,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,400,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,312,313,314,315,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,313,313,315,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,0,401,401,315,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,402,401,401,315,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,403,97,201,404,0,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,97,0,201,201,0,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,405,318,406,406,8,9,0,10,0,0,0,322,0,0,16,0],[0,407,0,0,0,40,408,0,9,0,10,0,0,0,42,0,407,0,0],[0,0,0,0,409,44,44,8,9,0,0,0,0,321,409,0,0,0,0],[0,0,0,317,318,319,406,8,9,0,10,0,0,321,322,0,0,16,0],[0,0,0,317,318,406,406,8,9,0,10,0,0,0,322,0,0,16,0],[0,410,64,0,0,40,408,0,9,0,10,0,0,0,42,0,410,0,0],[0,223,0,0,0,121,121,0,9,0,10,0,0,0,42,0,223,0,0],[0,223,0,323,0,121,121,0,9,0,10,0,0,0,42,0,223,0,0],[0,0,0,405,318,406,406,8,9,0,10,0,0,0,322,0,0,16,0],[0,0,0,0,409,44,44,8,9,0,0,0,0,328,409,0,0,0,0],[0,0,0,325,318,326,406,8,9,0,10,0,0,328,322,0,0,16,0],[0,0,0,325,318,406,406,8,9,0,10,0,0,0,322,0,0,16,0],[0,0,0,0,0,0,0,133,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,130,0,0],[0,0,0,0,0,411,411,239,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,412,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,40,121,334,0,9,0,10,0,0,0,42,0,0,0,0],[0,0,0,0,413,0,0,0,9,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,241,336,336,57,58,0,59,0,0,0,245,0,0,62,0],[0,0,0,0,339,141,141,57,58,0,0,0,0,0,339,0,0,0,0],[0,0,0,414,415,416,417,57,58,0,59,0,0,418,419,0,0,62,0],[0,337,0,420,0,248,248,57,58,0,59,0,0,0,139,0,337,0,0],[0,337,0,0,0,246,421,0,58,0,59,0,0,0,139,0,337,0,0],[0,0,0,422,415,423,424,57,58,0,59,0,0,425,419,0,0,62,0],[0,0,0,151,0,246,246,0,58,0,59,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,58,0,0,0,0,344,0,0,0,0,0],[0,0,0,341,0,342,246,0,58,0,59,0,0,344,0,0,0,0,0],[0,0,0,341,0,246,246,0,58,0,59,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,146,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,143,0,0],[0,0,0,0,0,426,426,258,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,427,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,350,351,352,353,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,351,351,353,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,0,428,428,353,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,429,428,428,353,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,430,137,246,431,0,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,137,0,246,246,0,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,432,116,433,434,8,161,0,162,0,0,435,120,0,0,16,0],[0,0,0,0,0,180,180,269,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,358,359,360,361,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,359,359,361,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,436,436,361,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,437,436,436,361,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,438,439,440,441,442,161,0,162,0,0,0,362,0,0,0,0],[0,443,274,0,0,0,0,0,0,0,0,0,0,0,0,0,443,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,444,116,445,445,8,161,0,162,0,0,0,120,0,0,16,0],[0,0,0,0,225,44,44,8,161,0,0,0,0,367,225,0,0,0,0],[0,0,0,364,116,365,445,8,161,0,162,0,0,367,120,0,0,16,0],[0,0,0,364,116,445,445,8,161,0,162,0,0,0,120,0,0,16,0],[0,0,0,0,0,0,0,0,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,446,370,447,447,22,23,0,24,0,0,0,374,0,0,27,0],[0,448,0,0,0,76,449,0,23,0,24,0,0,0,78,0,448,0,0],[0,0,0,0,450,80,80,22,23,0,0,0,0,373,450,0,0,0,0],[0,0,0,369,370,371,447,22,23,0,24,0,0,373,374,0,0,27,0],[0,0,0,369,370,447,447,22,23,0,24,0,0,0,374,0,0,27,0],[0,451,90,0,0,76,449,0,23,0,24,0,0,0,78,0,451,0,0],[0,279,0,0,0,175,175,0,23,0,24,0,0,0,78,0,279,0,0],[0,279,0,375,0,175,175,0,23,0,24,0,0,0,78,0,279,0,0],[0,0,0,446,370,447,447,22,23,0,24,0,0,0,374,0,0,27,0],[0,0,0,0,450,80,80,22,23,0,0,0,0,380,450,0,0,0,0],[0,0,0,377,370,378,447,22,23,0,24,0,0,380,374,0,0,27,0],[0,0,0,377,370,447,447,22,23,0,24,0,0,0,374,0,0,27,0],[0,0,0,0,0,0,0,187,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,0,0],[0,0,0,0,0,452,452,295,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,453,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,76,175,386,0,23,0,24,0,0,0,78,0,0,0,0],[0,0,0,0,454,0,0,0,23,0,0,0,0,0,0,0,0,0,0],[0,0,0,455,388,456,456,32,33,0,34,0,0,0,392,0,0,37,0],[0,457,0,0,0,97,458,0,33,0,34,0,0,0,99,0,457,0,0],[0,0,0,0,459,101,101,32,33,0,0,0,0,391,459,0,0,0,0],[0,0,0,387,388,389,456,32,33,0,34,0,0,391,392,0,0,37,0],[0,0,0,387,388,456,456,32,33,0,34,0,0,0,392,0,0,37,0],[0,460,111,0,0,97,458,0,33,0,34,0,0,0,99,0,460,0,0],[0,299,0,0,0,201,201,0,33,0,34,0,0,0,99,0,299,0,0],[0,299,0,393,0,201,201,0,33,0,34,0,0,0,99,0,299,0,0],[0,0,0,455,388,456,456,32,33,0,34,0,0,0,392,0,0,37,0],[0,0,0,0,459,101,101,32,33,0,0,0,0,398,459,0,0,0,0],[0,0,0,395,388,396,456,32,33,0,34,0,0,398,392,0,0,37,0],[0,0,0,395,388,456,456,32,33,0,34,0,0,0,392,0,0,37,0],[0,0,0,0,0,0,0,213,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,210,0,0],[0,0,0,0,0,461,461,315,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,462,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,97,201,404,0,33,0,34,0,0,0,99,0,0,0,0],[0,0,0,0,463,0,0,0,33,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,318,406,406,8,9,0,10,0,0,0,322,0,0,16,0],[0,0,0,0,409,44,44,8,9,0,0,0,0,0,409,0,0,0,0],[0,0,0,464,465,466,467,8,9,0,10,0,0,468,469,0,0,16,0],[0,407,0,470,0,123,123,8,9,0,10,0,0,0,42,0,407,0,0],[0,407,0,0,0,121,471,0,9,0,10,0,0,0,42,0,407,0,0],[0,0,0,472,465,473,474,8,9,0,10,0,0,475,469,0,0,16,0],[0,0,0,0,0,0,0,239,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,236,0,0],[0,0,0,0,0,0,476,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,477,415,478,478,57,58,0,59,0,0,0,419,0,0,62,0],[0,479,0,0,0,137,480,0,58,0,59,0,0,0,139,0,479,0,0],[0,0,0,0,481,141,141,57,58,0,0,0,0,418,481,0,0,0,0],[0,0,0,414,415,416,478,57,58,0,59,0,0,418,419,0,0,62,0],[0,0,0,414,415,478,478,57,58,0,59,0,0,0,419,0,0,62,0],[0,482,151,0,0,137,480,0,58,0,59,0,0,0,139,0,482,0,0],[0,337,0,0,0,246,246,0,58,0,59,0,0,0,139,0,337,0,0],[0,337,0,420,0,246,246,0,58,0,59,0,0,0,139,0,337,0,0],[0,0,0,477,415,478,478,57,58,0,59,0,0,0,419,0,0,62,0],[0,0,0,0,481,141,141,57,58,0,0,0,0,425,481,0,0,0,0],[0,0,0,422,415,423,478,57,58,0,59,0,0,425,419,0,0,62,0],[0,0,0,422,415,478,478,57,58,0,59,0,0,0,419,0,0,62,0],[0,0,0,0,0,0,0,258,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0],[0,0,0,0,0,483,483,353,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,484,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,137,246,431,0,58,0,59,0,0,0,139,0,0,0,0],[0,0,0,0,485,0,0,0,58,0,0,0,0,0,0,0,0,0,0],[0,0,0,444,116,445,445,8,161,0,162,0,0,0,120,0,0,16,0],[0,0,0,0,225,44,44,8,161,0,0,0,0,435,225,0,0,0,0],[0,0,0,432,116,433,445,8,161,0,162,0,0,435,120,0,0,16,0],[0,0,0,432,116,445,445,8,161,0,162,0,0,0,120,0,0,16,0],[0,0,0,0,0,486,486,361,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,487,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,439,440,441,442,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,440,440,442,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,488,488,442,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,489,488,488,442,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,490,491,492,493,494,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,495,0,496,497,0,161,0,162,0,0,498,0,0,0,0,0],[0,0,0,0,116,445,445,8,161,0,162,0,0,0,120,0,0,16,0],[0,0,0,0,225,44,44,8,161,0,0,0,0,0,225,0,0,0,0],[0,0,0,0,370,447,447,22,23,0,24,0,0,0,374,0,0,27,0],[0,0,0,0,450,80,80,22,23,0,0,0,0,0,450,0,0,0,0],[0,0,0,499,500,501,502,22,23,0,24,0,0,503,504,0,0,27,0],[0,448,0,505,0,177,177,22,23,0,24,0,0,0,78,0,448,0,0],[0,448,0,0,0,175,506,0,23,0,24,0,0,0,78,0,448,0,0],[0,0,0,507,500,508,509,22,23,0,24,0,0,510,504,0,0,27,0],[0,0,0,0,0,0,0,295,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,292,0,0],[0,0,0,0,0,0,511,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,388,456,456,32,33,0,34,0,0,0,392,0,0,37,0],[0,0,0,0,459,101,101,32,33,0,0,0,0,0,459,0,0,0,0],[0,0,0,512,513,514,515,32,33,0,34,0,0,516,517,0,0,37,0],[0,457,0,518,0,203,203,32,33,0,34,0,0,0,99,0,457,0,0],[0,457,0,0,0,201,519,0,33,0,34,0,0,0,99,0,457,0,0],[0,0,0,520,513,521,522,32,33,0,34,0,0,523,517,0,0,37,0],[0,0,0,0,0,0,0,315,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,312,0,0],[0,0,0,0,0,0,524,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,525,465,526,526,8,9,0,10,0,0,0,469,0,0,16,0],[0,527,0,0,0,40,528,0,9,0,10,0,0,0,42,0,527,0,0],[0,0,0,0,529,44,44,8,9,0,0,0,0,468,529,0,0,0,0],[0,0,0,464,465,466,526,8,9,0,10,0,0,468,469,0,0,16,0],[0,0,0,464,465,526,526,8,9,0,10,0,0,0,469,0,0,16,0],[0,530,64,0,0,40,528,0,9,0,10,0,0,0,42,0,530,0,0],[0,407,0,0,0,121,121,0,9,0,10,0,0,0,42,0,407,0,0],[0,407,0,470,0,121,121,0,9,0,10,0,0,0,42,0,407,0,0],[0,0,0,525,465,526,526,8,9,0,10,0,0,0,469,0,0,16,0],[0,0,0,0,529,44,44,8,9,0,0,0,0,475,529,0,0,0,0],[0,0,0,472,465,473,526,8,9,0,10,0,0,475,469,0,0,16,0],[0,0,0,472,465,526,526,8,9,0,10,0,0,0,469,0,0,16,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,0],[0,0,0,0,415,478,478,57,58,0,59,0,0,0,419,0,0,62,0],[0,0,0,0,481,141,141,57,58,0,0,0,0,0,481,0,0,0,0],[0,0,0,531,532,533,534,57,58,0,59,0,0,535,536,0,0,62,0],[0,479,0,537,0,248,248,57,58,0,59,0,0,0,139,0,479,0,0],[0,479,0,0,0,246,538,0,58,0,59,0,0,0,139,0,479,0,0],[0,0,0,539,532,540,541,57,58,0,59,0,0,542,536,0,0,62,0],[0,0,0,0,0,0,0,353,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,350,0,0],[0,0,0,0,0,0,543,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,361,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,358,0,0],[0,0,0,0,0,544,544,442,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,545,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,491,492,493,494,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,492,492,494,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,546,546,494,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,547,546,546,494,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,548,549,368,550,0,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,274,0,368,368,0,161,0,162,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,161,0,0,0,0,498,0,0,0,0,0],[0,0,0,495,0,496,368,0,161,0,162,0,0,498,0,0,0,0,0],[0,0,0,495,0,368,368,0,161,0,162,0,0,0,0,0,0,0,0],[0,0,0,551,500,552,552,22,23,0,24,0,0,0,504,0,0,27,0],[0,553,0,0,0,76,554,0,23,0,24,0,0,0,78,0,553,0,0],[0,0,0,0,555,80,80,22,23,0,0,0,0,503,555,0,0,0,0],[0,0,0,499,500,501,552,22,23,0,24,0,0,503,504,0,0,27,0],[0,0,0,499,500,552,552,22,23,0,24,0,0,0,504,0,0,27,0],[0,556,90,0,0,76,554,0,23,0,24,0,0,0,78,0,556,0,0],[0,448,0,0,0,175,175,0,23,0,24,0,0,0,78,0,448,0,0],[0,448,0,505,0,175,175,0,23,0,24,0,0,0,78,0,448,0,0],[0,0,0,551,500,552,552,22,23,0,24,0,0,0,504,0,0,27,0],[0,0,0,0,555,80,80,22,23,0,0,0,0,510,555,0,0,0,0],[0,0,0,507,500,508,552,22,23,0,24,0,0,510,504,0,0,27,0],[0,0,0,507,500,552,552,22,23,0,24,0,0,0,504,0,0,27,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,76,0,0],[0,0,0,557,513,558,558,32,33,0,34,0,0,0,517,0,0,37,0],[0,559,0,0,0,97,560,0,33,0,34,0,0,0,99,0,559,0,0],[0,0,0,0,561,101,101,32,33,0,0,0,0,516,561,0,0,0,0],[0,0,0,512,513,514,558,32,33,0,34,0,0,516,517,0,0,37,0],[0,0,0,512,513,558,558,32,33,0,34,0,0,0,517,0,0,37,0],[0,562,111,0,0,97,560,0,33,0,34,0,0,0,99,0,562,0,0],[0,457,0,0,0,201,201,0,33,0,34,0,0,0,99,0,457,0,0],[0,457,0,518,0,201,201,0,33,0,34,0,0,0,99,0,457,0,0],[0,0,0,557,513,558,558,32,33,0,34,0,0,0,517,0,0,37,0],[0,0,0,0,561,101,101,32,33,0,0,0,0,523,561,0,0,0,0],[0,0,0,520,513,521,558,32,33,0,34,0,0,523,517,0,0,37,0],[0,0,0,520,513,558,558,32,33,0,34,0,0,0,517,0,0,37,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,0,0],[0,0,0,0,465,526,526,8,9,0,10,0,0,0,469,0,0,16,0],[0,0,0,0,529,44,44,8,9,0,0,0,0,0,529,0,0,0,0],[0,0,0,563,66,564,565,8,9,0,10,0,0,566,68,0,0,16,0],[0,527,0,567,0,123,123,8,9,0,10,0,0,0,42,0,527,0,0],[0,527,0,0,0,121,568,0,9,0,10,0,0,0,42,0,527,0,0],[0,0,0,569,66,570,571,8,9,0,10,0,0,572,68,0,0,16,0],[0,0,0,573,532,574,574,57,58,0,59,0,0,0,536,0,0,62,0],[0,575,0,0,0,137,576,0,58,0,59,0,0,0,139,0,575,0,0],[0,0,0,0,577,141,141,57,58,0,0,0,0,535,577,0,0,0,0],[0,0,0,531,532,533,574,57,58,0,59,0,0,535,536,0,0,62,0],[0,0,0,531,532,574,574,57,58,0,59,0,0,0,536,0,0,62,0],[0,578,151,0,0,137,576,0,58,0,59,0,0,0,139,0,578,0,0],[0,479,0,0,0,246,246,0,58,0,59,0,0,0,139,0,479,0,0],[0,479,0,537,0,246,246,0,58,0,59,0,0,0,139,0,479,0,0],[0,0,0,573,532,574,574,57,58,0,59,0,0,0,536,0,0,62,0],[0,0,0,0,577,141,141,57,58,0,0,0,0,542,577,0,0,0,0],[0,0,0,539,532,540,574,57,58,0,59,0,0,542,536,0,0,62,0],[0,0,0,539,532,574,574,57,58,0,59,0,0,0,536,0,0,62,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,0,0],[0,0,0,0,0,0,0,442,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,439,0,0],[0,0,0,0,0,579,579,494,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,580,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,549,368,550,0,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,0,368,368,0,161,0,162,0,0,0,362,0,0,0,0],[0,0,0,0,581,0,0,0,161,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,500,552,552,22,23,0,24,0,0,0,504,0,0,27,0],[0,0,0,0,555,80,80,22,23,0,0,0,0,0,555,0,0,0,0],[0,0,0,582,91,583,584,22,23,0,24,0,0,585,93,0,0,27,0],[0,553,0,586,0,177,177,22,23,0,24,0,0,0,78,0,553,0,0],[0,553,0,0,0,175,587,0,23,0,24,0,0,0,78,0,553,0,0],[0,0,0,588,91,589,590,22,23,0,24,0,0,591,93,0,0,27,0],[0,0,0,0,513,558,558,32,33,0,34,0,0,0,517,0,0,37,0],[0,0,0,0,561,101,101,32,33,0,0,0,0,0,561,0,0,0,0],[0,0,0,592,112,593,594,32,33,0,34,0,0,595,114,0,0,37,0],[0,559,0,596,0,203,203,32,33,0,34,0,0,0,99,0,559,0,0],[0,559,0,0,0,201,597,0,33,0,34,0,0,0,99,0,559,0,0],[0,0,0,598,112,599,600,32,33,0,34,0,0,601,114,0,0,37,0],[0,0,0,602,66,67,67,8,9,0,10,0,0,0,68,0,0,16,0],[0,0,0,0,165,44,44,8,9,0,0,0,0,566,165,0,0,0,0],[0,0,0,563,66,564,67,8,9,0,10,0,0,566,68,0,0,16,0],[0,0,0,563,66,67,67,8,9,0,10,0,0,0,68,0,0,16,0],[0,527,0,0,0,121,121,0,9,0,10,0,0,0,42,0,527,0,0],[0,527,0,567,0,121,121,0,9,0,10,0,0,0,42,0,527,0,0],[0,0,0,602,66,67,67,8,9,0,10,0,0,0,68,0,0,16,0],[0,0,0,0,165,44,44,8,9,0,0,0,0,572,165,0,0,0,0],[0,0,0,569,66,570,67,8,9,0,10,0,0,572,68,0,0,16,0],[0,0,0,569,66,67,67,8,9,0,10,0,0,0,68,0,0,16,0],[0,0,0,0,532,574,574,57,58,0,59,0,0,0,536,0,0,62,0],[0,0,0,0,577,141,141,57,58,0,0,0,0,0,577,0,0,0,0],[0,0,0,603,152,604,605,57,58,0,59,0,0,606,154,0,0,62,0],[0,575,0,607,0,248,248,57,58,0,59,0,0,0,139,0,575,0,0],[0,575,0,0,0,246,608,0,58,0,59,0,0,0,139,0,575,0,0],[0,0,0,609,152,610,611,57,58,0,59,0,0,612,154,0,0,62,0],[0,0,0,0,0,0,0,494,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,491,0,0],[0,0,0,0,0,0,613,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,614,91,92,92,22,23,0,24,0,0,0,93,0,0,27,0],[0,0,0,0,194,80,80,22,23,0,0,0,0,585,194,0,0,0,0],[0,0,0,582,91,583,92,22,23,0,24,0,0,585,93,0,0,27,0],[0,0,0,582,91,92,92,22,23,0,24,0,0,0,93,0,0,27,0],[0,553,0,0,0,175,175,0,23,0,24,0,0,0,78,0,553,0,0],[0,553,0,586,0,175,175,0,23,0,24,0,0,0,78,0,553,0,0],[0,0,0,614,91,92,92,22,23,0,24,0,0,0,93,0,0,27,0],[0,0,0,0,194,80,80,22,23,0,0,0,0,591,194,0,0,0,0],[0,0,0,588,91,589,92,22,23,0,24,0,0,591,93,0,0,27,0],[0,0,0,588,91,92,92,22,23,0,24,0,0,0,93,0,0,27,0],[0,0,0,615,112,113,113,32,33,0,34,0,0,0,114,0,0,37,0],[0,0,0,0,220,101,101,32,33,0,0,0,0,595,220,0,0,0,0],[0,0,0,592,112,593,113,32,33,0,34,0,0,595,114,0,0,37,0],[0,0,0,592,112,113,113,32,33,0,34,0,0,0,114,0,0,37,0],[0,559,0,0,0,201,201,0,33,0,34,0,0,0,99,0,559,0,0],[0,559,0,596,0,201,201,0,33,0,34,0,0,0,99,0,559,0,0],[0,0,0,615,112,113,113,32,33,0,34,0,0,0,114,0,0,37,0],[0,0,0,0,220,101,101,32,33,0,0,0,0,601,220,0,0,0,0],[0,0,0,598,112,599,113,32,33,0,34,0,0,601,114,0,0,37,0],[0,0,0,598,112,113,113,32,33,0,34,0,0,0,114,0,0,37,0],[0,0,0,0,66,67,67,8,9,0,10,0,0,0,68,0,0,16,0],[0,0,0,616,152,153,153,57,58,0,59,0,0,0,154,0,0,62,0],[0,0,0,0,265,141,141,57,58,0,0,0,0,606,265,0,0,0,0],[0,0,0,603,152,604,153,57,58,0,59,0,0,606,154,0,0,62,0],[0,0,0,603,152,153,153,57,58,0,59,0,0,0,154,0,0,62,0],[0,575,0,0,0,246,246,0,58,0,59,0,0,0,139,0,575,0,0],[0,575,0,607,0,246,246,0,58,0,59,0,0,0,139,0,575,0,0],[0,0,0,616,152,153,153,57,58,0,59,0,0,0,154,0,0,62,0],[0,0,0,0,265,141,141,57,58,0,0,0,0,612,265,0,0,0,0],[0,0,0,609,152,610,153,57,58,0,59,0,0,612,154,0,0,62,0],[0,0,0,609,152,153,153,57,58,0,59,0,0,0,154,0,0,62,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,549,0,0],[0,0,0,0,91,92,92,22,23,0,24,0,0,0,93,0,0,27,0],[0,0,0,0,112,113,113,32,33,0,34,0,0,0,114,0,0,37,0],[0,0,0,0,152,153,153,57,58,0,59,0,0,0,154,0,0,62,0]],\"accepting\":[false,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,false,true,false,true,true,false,false,true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true,true,false,true,true,false,true,true,true,false,true,true,true,false,true,false,true,true,false,false,true,true,true,true,true,true,true,false,true,true,false,true,true,true,false,true,false,true,true,false,false,true,true,true,true,true,true,true,false,true,true,true,false,true,true,true,false,true,false,true,true,false,false,false,true,true,false,false,true,true,true,true,true,true,false,true,false,true,true,false,false,true,true,true,true,true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,false,true,false,true,true,false,false,false,true,true,false,false,true,true,true,false,true,true,true,true,true,true,false,true,true,true,false,true,false,true,true,false,false,false,true,true,false,false,true,true,true,false,true,true,true,true,true,false,true,true,true,true,true,false,true,true,false,false,false,false,true,true,false,false,true,true,true,false,true,true,true,false,true,false,true,true,false,false,false,true,true,false,false,true,true,true,false,true,true,true,true,false,true,false,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,false,true,true,false,false,false,false,true,true,false,false,true,true,true,false,true,true,true,true,true,false,true,true,false,false,false,false,true,true,false,false,true,true,true,true,false,true,true,true,true,true,true,false,true,true,false,false,false,false,true,false,true,false,true,true,true,true,true,false,true,true,false,false,false,false,true,true,false,false,true,true,true,false,true,true,false,false,true,false,true,true,false,true,true,false,true,true,false,true,true,true,true,true,true,false,true,true,false,false,false,false,true,false,true,true,false,true,true,true,true,true,true,false,true,true,false,false,false,false,true,false,true,false,true,true,true,true,false,false,false,true,true,false,true,true,true,true,true,true,false,true,true,false,false,false,false,true,false,true,false,true,true,false,false,true,true,false,false,true,true,true,false,true,false,true,true,true,true,false,false,false,true,false,true,true,true,true,false,false,false,true,true,false,true,true,true,true,true,true,false,true,true,false,true,false,true,true,true,true,false,false,false,false,false,false,false,true,true,false,false,true,true,false,true,true,true,true,false,true,true,true,true,true,true,false,true,true,false,true,true,false,true,true,true,true,true,true,false,true,true,false,true,false,true,true,true,true,true,true,false,true,true,true,true,true,true,false,true,true,false,false,false,false,false,true,true,false,true,false,true,true,true,true,true,false,true,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false,true,true,true,true,false,false,false,true,false,true,true,true,true,true,false,true,true,true,false,true,true,true,true,true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,false,true,true,true],\"tags\":[[],[\"broken_cluster\"],[\"consonant_syllable\"],[\"vowel_syllable\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"standalone_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"consonant_syllable\"],[\"broken_cluster\"],[\"symbol_cluster\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"symbol_cluster\"],[],[\"symbol_cluster\"],[\"symbol_cluster\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"symbol_cluster\"],[\"symbol_cluster\"],[\"symbol_cluster\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[\"broken_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"broken_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"broken_cluster\"],[\"symbol_cluster\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[],[],[\"broken_cluster\"],[],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[],[],[\"consonant_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[],[],[\"vowel_syllable\"],[],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[],[],[\"standalone_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[],[],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[],[],[],[],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[],[],[],[\"consonant_syllable\",\"broken_cluster\"],[\"consonant_syllable\",\"broken_cluster\"],[],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[],[],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"consonant_syllable\"],[],[\"consonant_syllable\"],[\"consonant_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"vowel_syllable\"],[],[\"vowel_syllable\"],[\"vowel_syllable\"],[\"broken_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"standalone_cluster\"],[\"standalone_cluster\"],[],[\"consonant_syllable\"],[\"vowel_syllable\"],[\"standalone_cluster\"]]}");


var $aa333a9607471296$exports = {};
$aa333a9607471296$exports = JSON.parse("{\"categories\":[\"O\",\"IND\",\"S\",\"GB\",\"B\",\"FM\",\"CGJ\",\"VMAbv\",\"VMPst\",\"VAbv\",\"VPst\",\"CMBlw\",\"VPre\",\"VBlw\",\"H\",\"VMBlw\",\"CMAbv\",\"MBlw\",\"CS\",\"R\",\"SUB\",\"MPst\",\"MPre\",\"FAbv\",\"FPst\",\"FBlw\",\"null\",\"SMAbv\",\"SMBlw\",\"VMPre\",\"ZWNJ\",\"ZWJ\",\"WJ\",\"M\",\"VS\",\"N\",\"HN\",\"MAbv\"],\"decompositions\":{\"2507\":[2503,2494],\"2508\":[2503,2519],\"2888\":[2887,2902],\"2891\":[2887,2878],\"2892\":[2887,2903],\"3018\":[3014,3006],\"3019\":[3015,3006],\"3020\":[3014,3031],\"3144\":[3142,3158],\"3264\":[3263,3285],\"3271\":[3270,3285],\"3272\":[3270,3286],\"3274\":[3270,3266],\"3275\":[3270,3266,3285],\"3402\":[3398,3390],\"3403\":[3399,3390],\"3404\":[3398,3415],\"3546\":[3545,3530],\"3548\":[3545,3535],\"3549\":[3545,3535,3530],\"3550\":[3545,3551],\"3635\":[3661,3634],\"3763\":[3789,3762],\"3955\":[3953,3954],\"3957\":[3953,3956],\"3958\":[4018,3968],\"3959\":[4018,3953,3968],\"3960\":[4019,3968],\"3961\":[4019,3953,3968],\"3969\":[3953,3968],\"6971\":[6970,6965],\"6973\":[6972,6965],\"6976\":[6974,6965],\"6977\":[6975,6965],\"6979\":[6978,6965],\"69934\":[69937,69927],\"69935\":[69938,69927],\"70475\":[70471,70462],\"70476\":[70471,70487],\"70843\":[70841,70842],\"70844\":[70841,70832],\"70846\":[70841,70845],\"71098\":[71096,71087],\"71099\":[71097,71087]},\"stateTable\":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[2,2,3,4,4,5,0,6,7,8,9,10,11,12,13,14,15,16,0,17,18,11,19,20,21,22,0,0,0,23,0,0,2,0,0,24,0,25],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,28,0,0,0,0,0,27,0,0,0],[0,0,0,0,0,29,0,30,31,32,33,34,35,36,37,38,39,40,0,0,41,35,42,43,44,45,0,0,0,46,0,0,0,0,39,0,0,47],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,0,0,0,0,0,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,22,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,8,9,0,0,12,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,0,9,0,0,0,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,8,9,10,11,12,13,14,0,16,0,0,18,11,19,20,21,22,0,0,0,23,0,0,0,0,0,0,0,25],[0,0,0,0,0,5,0,6,7,8,9,0,11,12,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,0,9,0,0,12,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,7,0,0,0,0,0,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,8,9,10,11,12,13,14,15,16,0,0,18,11,19,20,21,22,0,0,0,23,0,0,0,0,0,0,0,25],[0,0,0,0,0,5,0,6,7,8,9,0,11,12,0,14,0,0,0,0,0,11,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,4,4,5,0,6,7,8,9,10,11,12,13,14,15,16,0,0,18,11,19,20,21,22,0,0,0,23,0,0,0,0,0,0,0,25],[0,0,0,0,0,5,0,6,7,8,9,48,11,12,13,14,48,16,0,0,18,11,19,20,21,22,0,0,0,23,0,0,0,0,49,0,0,25],[0,0,0,0,0,5,0,6,7,8,9,0,11,12,0,14,0,16,0,0,0,11,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,25],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,22,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,22,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,0,0,0,0,0,0,14,0,0,0,0,0,0,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,0,51,0],[0,0,0,0,0,5,0,6,7,8,9,0,11,12,0,14,0,16,0,0,0,11,0,20,21,22,0,0,0,23,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,28,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,0,0,0,0,0,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,32,33,0,0,36,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,0,33,0,0,0,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,32,33,34,35,36,37,38,0,40,0,0,41,35,42,43,44,45,0,0,0,46,0,0,0,0,0,0,0,47],[0,0,0,0,0,29,0,30,31,32,33,0,35,36,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,0,33,0,0,36,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,41,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,0,31,0,0,0,0,0,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,32,33,34,35,36,37,38,39,40,0,0,41,35,42,43,44,45,0,0,0,46,0,0,0,0,0,0,0,47],[0,0,0,0,0,29,0,30,31,32,33,0,35,36,0,38,0,0,0,0,0,35,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,32,33,52,35,36,37,38,52,40,0,0,41,35,42,43,44,45,0,0,0,46,0,0,0,0,53,0,0,47],[0,0,0,0,0,29,0,30,31,32,33,0,35,36,0,38,0,40,0,0,0,35,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,47],[0,0,0,0,0,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,45,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,0,0,0,0,0,0,38,0,0,0,0,0,0,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,0,29,0,30,31,32,33,0,35,36,0,38,0,40,0,0,0,35,0,43,44,45,0,0,0,46,0,0,0,0,0,0,0,0],[0,0,0,0,0,5,0,6,7,8,9,48,11,12,13,14,0,16,0,0,18,11,19,20,21,22,0,0,0,23,0,0,0,0,0,0,0,25],[0,0,0,0,0,5,0,6,7,8,9,48,11,12,13,14,48,16,0,0,18,11,19,20,21,22,0,0,0,23,0,0,0,0,0,0,0,25],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,54,0,0],[0,0,0,0,0,29,0,30,31,32,33,52,35,36,37,38,0,40,0,0,41,35,42,43,44,45,0,0,0,46,0,0,0,0,0,0,0,47],[0,0,0,0,0,29,0,30,31,32,33,52,35,36,37,38,52,40,0,0,41,35,42,43,44,45,0,0,0,46,0,0,0,0,0,0,0,47],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,0,51,0]],\"accepting\":[false,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],\"tags\":[[],[\"broken_cluster\"],[\"independent_cluster\"],[\"symbol_cluster\"],[\"standard_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"numeral_cluster\"],[\"broken_cluster\"],[\"independent_cluster\"],[\"symbol_cluster\"],[\"symbol_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"virama_terminated_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"broken_cluster\"],[\"broken_cluster\"],[\"numeral_cluster\"],[\"number_joiner_terminated_cluster\"],[\"standard_cluster\"],[\"standard_cluster\"],[\"numeral_cluster\"]]}");


// Cateories used in the OpenType spec:
// https://www.microsoft.com/typography/otfntdev/devanot/shaping.aspx
const $90a9d3398ee54fe5$export$a513ea61a7bee91c = {
    X: 1,
    C: 2,
    V: 4,
    N: 8,
    H: 16,
    ZWNJ: 32,
    ZWJ: 64,
    M: 128,
    SM: 256,
    VD: 512,
    A: 1024,
    Placeholder: 2048,
    Dotted_Circle: 4096,
    RS: 8192,
    Coeng: 16384,
    Repha: 32768,
    Ra: 65536,
    CM: 131072,
    Symbol: 262144 // Avagraha, etc that take marks (SM,A,VD).
};
const $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0 = {
    Start: 1,
    Ra_To_Become_Reph: 2,
    Pre_M: 4,
    Pre_C: 8,
    Base_C: 16,
    After_Main: 32,
    Above_C: 64,
    Before_Sub: 128,
    Below_C: 256,
    After_Sub: 512,
    Before_Post: 1024,
    Post_C: 2048,
    After_Post: 4096,
    Final_C: 8192,
    SMVD: 16384,
    End: 32768
};
const $90a9d3398ee54fe5$export$8519deaa7de2b07 = $90a9d3398ee54fe5$export$a513ea61a7bee91c.C | $90a9d3398ee54fe5$export$a513ea61a7bee91c.Ra | $90a9d3398ee54fe5$export$a513ea61a7bee91c.CM | $90a9d3398ee54fe5$export$a513ea61a7bee91c.V | $90a9d3398ee54fe5$export$a513ea61a7bee91c.Placeholder | $90a9d3398ee54fe5$export$a513ea61a7bee91c.Dotted_Circle;
const $90a9d3398ee54fe5$export$bbcd928767338e0d = $90a9d3398ee54fe5$export$a513ea61a7bee91c.ZWJ | $90a9d3398ee54fe5$export$a513ea61a7bee91c.ZWNJ;
const $90a9d3398ee54fe5$export$ca9599b2a300afc = $90a9d3398ee54fe5$export$a513ea61a7bee91c.H | $90a9d3398ee54fe5$export$a513ea61a7bee91c.Coeng;
const $90a9d3398ee54fe5$export$e99d119da76a0fc5 = {
    Default: {
        hasOldSpec: false,
        virama: 0,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.Before_Post,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Devanagari: {
        hasOldSpec: true,
        virama: 0x094D,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.Before_Post,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Bengali: {
        hasOldSpec: true,
        virama: 0x09CD,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.After_Sub,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Gurmukhi: {
        hasOldSpec: true,
        virama: 0x0A4D,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.Before_Sub,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Gujarati: {
        hasOldSpec: true,
        virama: 0x0ACD,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.Before_Post,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Oriya: {
        hasOldSpec: true,
        virama: 0x0B4D,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.After_Main,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Tamil: {
        hasOldSpec: true,
        virama: 0x0BCD,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.After_Post,
        rephMode: 'Implicit',
        blwfMode: 'Pre_And_Post'
    },
    Telugu: {
        hasOldSpec: true,
        virama: 0x0C4D,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.After_Post,
        rephMode: 'Explicit',
        blwfMode: 'Post_Only'
    },
    Kannada: {
        hasOldSpec: true,
        virama: 0x0CCD,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.After_Post,
        rephMode: 'Implicit',
        blwfMode: 'Post_Only'
    },
    Malayalam: {
        hasOldSpec: true,
        virama: 0x0D4D,
        basePos: 'Last',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.After_Main,
        rephMode: 'Log_Repha',
        blwfMode: 'Pre_And_Post'
    },
    // Handled by UniversalShaper
    // Sinhala: {
    //   hasOldSpec: false,
    //   virama: 0x0DCA,
    //   basePos: 'Last_Sinhala',
    //   rephPos: POSITIONS.After_Main,
    //   rephMode: 'Explicit',
    //   blwfMode: 'Pre_And_Post'
    // },
    Khmer: {
        hasOldSpec: false,
        virama: 0x17D2,
        basePos: 'First',
        rephPos: $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0.Ra_To_Become_Reph,
        rephMode: 'Vis_Repha',
        blwfMode: 'Pre_And_Post'
    }
};
const $90a9d3398ee54fe5$export$f647c9cfdd77d95a = {
    // Khmer
    0x17BE: [
        0x17C1,
        0x17BE
    ],
    0x17BF: [
        0x17C1,
        0x17BF
    ],
    0x17C0: [
        0x17C1,
        0x17C0
    ],
    0x17C4: [
        0x17C1,
        0x17C4
    ],
    0x17C5: [
        0x17C1,
        0x17C5
    ]
};



const { decompositions: $7826f90f6f0cecc9$var$decompositions } = (0, (/*@__PURE__*/$parcel$interopDefault($aa333a9607471296$exports)));
const $7826f90f6f0cecc9$var$trie = new (0, $6uUbQ$unicodetrie)((0, $12727730ddfc8bfe$export$94fdf11bafc8de6b)("AAARAAAAAABg2AAAAWYPmfDtnXuMXFUdx+/uzs7M7szudAtECGJRIMRQbUAithQWkGAKiVhNpFVRRAmIQVCDkDYICGotIA9BTCz8IeUviv7BQ2PBtBIRLBBQIWAUsKg1BKxRAqIgfs/cc+aeOXPej3tnZX7JJ/dxzj3nd36/8753Z5fUsuxgsAwcAU4Gp4BPgM+Cd4P3RjieDs4GXwLrHJ5bDy4DG8A14LvgZrAZbAF3gns0z18ALgY/B78C94NHwBPgabAE/AX8DbwM5sF/QX0yD5vFcU/wVnAgWAoOAyvAceBE8CGwBpwGzgJfAF8BXwXfAFeC68EmsBlsAXeCreA+8CB4DDwF/gh2gd3gFfAGmKxn2QzYC+wHDgRLweFgJTgWrKrnuq/GcQ04jV6fheN54EJwEbgcXAG+Q8O/j+Mt4DZwB9haz8t9Hz3a8iCN/xiOvwRP0evH6fE68AzOH+Ke2eWYhw3PcGnuxvkr4A3QaGRZB7wFLAEHg2XgiEZ/fHKcp/ceBh/A+cngFPCpRm6vM3E8l8a5gN67GMdvgqsbeX2ap9yI601gM7gN3AG20mfuo8cdOP6GpvdUg9oKxz839GV90RDO2/glxN1B790NXsN1rZll7WYRdw+c70uvTwIHNAfTO0RyL5TDmnnbc3lmRQI9UnM0dD5eovfz4FpJ/BNpXNYWV+N6Lfg0hY97JK1vn+Pur9DoQur2F7m436bHDUK8C5t5/8vruo4+97WmXG+GLmzEiBF+PDwEOowYMWLEiBEjRoxYeBw5BDqIPEfXut9yWN+vVNxfrnnmWqR/PdgENoMt4E5wD9gOHgCPgifBs2BXM99b2o3jP8F/wMRUlrXAHNgHvH0q3895J46HguXgWHAGLctmLv9VuL96qnp7jxgxYsSbCbJvuRZ97/tqxT59VVRtixEjRsThBG7OSt5zzoPT0M+cBc4T5noXOs79TqLHeZrHUeCSqeJ96gacXy2kecNU8V6Hh7yXuQlhtw7B/PO1RTkr52Aj8JNFZjYg3gOKuC/g/v6Ls2wNuAY8urg//PcIb+6RZXuDNeCS6SzbBrJWlh0DLiFHco8ed9IjzzvaWfa9sZzTcf6D9mCcnbg3PlNcH4fzS8F2MDaLdQG4dLZIJxbbaZqv4ri8k58f3+mPs66T6/TTzqDeI0aMGDGiHP5dcR8ce/xxYcWi6vOfr725uRzcjnngXVOD61Hync+9uL+Nmyfej/NHpvL56A5Jeuz7uyfo+pqcPz2Vf1NH0ttJ03pekt8SmuY/EPYy9zzbN319ym/9TL6ZIt9MHCXRdxJtoAkWTRdz472n87D9cTwYLJvuz++I6WIePo/zE8AHp4v8WLyP0nufnM6/+zoDx8+DL08P6r9+urheRtO+jD6/cdrsx3mqu8w+xH4PScKIXa5D2jeCm8Et4DbwI/BjcC/4BXgI/Bb8DuwEu8Bu8Ap4A9RaRZptnO8J9gUHgEPAoWA5OLY1qMO90GEV7q+mYWtxPBWcIYnL4p+DsPNbxfVFOP86uAr8DNc34HgTDb8Vx9sVaRFI/LtagzYjnCqpb908EX87eBA8Bh4Hf2jle/9/wvGFVv787rrZZy8h7qtgDOuFOmiBuXYRvg/O9wMHgXeB97SLspk4sq0OI/q9v13+ek+sh3zYSRp9jrYorw9ll1/GRzR+KotYZSHf8laVP2lvpA/8OGdPMk59hqtXZ+L8nHbxvWwqO65ryu+fT3VZz+l4dET7L0R072ljsMyzTpaJqQxsbL8M9WajY789DO85XMp/Dcp3Qztdn+9qf/a97ZWK8PXc3G+TpC/nv8Mncy7ZvICF302P5O+aNiOtLdTXd+D4Q7DVwfcvWvx9zTEJ/o5iG3R8YAjGNFseha5PGuZKz7b7xxXbOrXMcu5eJSo//rXdH/73Enz6L1q/X+fyIu8wZGtNBmkjkzNZNgP2AvuBg2bysKUzduXn/66JtNeN4PCZvO0/x7Ujdn4VnYOvRJzjZ/I+9sQZeftX2Tc1RPcPz/Tf4/si0g+t5Mq+kfZjZL34Mc5ul3PPnE7TOxvHK2qDaZ+L++db2HyYqMo/qVnb/P8uH8/rmnFxR0k6DCu/rjj/RxT7KGUSWgbd+LMQuEgYB1zsk2qtvJD8v5AhdfdttbEunSxbcJD9Zf7chqp1Hlbe7FK1/aPVTfp7FgtC1yGGiSncFK/DhZvi+epZta0WWjlsfDZMyPRdSPrryqSSKnXx1bkq/Ye9TlRpk7Lrjq1UrfdC9X+MtKqwP6+3a/4pJFUZF0pZZpv91MYjMBaRRXbxpho5zQmUY3F+Pt4o7rvQrBXPdm00TaE24uMadaM2meLSI7iu071t3er3b6ZLi8JEde3qw+6zGv+ycF5kaRBh/m1T/7Yl/mMyTuMwadP4xL9ifjJpNwbvDZRJ8G8vnqV/Wf12aa/kyOdl69+BspTsXzGueE6E+JfZnvmXIfNPW+FfXkjb1YmqPNpnLP3b61fHCj/X5tzGANf2y3yqvC7Jv7btV4TVbdammI9l/g0dS5lNxLrk2j9r8xjjxhBQnygg0lgg/bOrfyct+udJi/Yrk0lFnxC7f+5kRbsNmcexfrubt0X/rGvLqrGSnYv3ZPHEe8r7lvMvUfi2LOu/2dg8LrRtQt2yfcv8r5IU70VkIs6nbebUXf0M/o7Znl39Sdoz+X1oEb5N8ffF67qhPfPP6eoUbxf+GRf/6sRnvaSdmw+Bf1VxmbD+2sa//DU7t/Gv2PfKpKdrBP92Ojk+IvqX16ks/2qxbL8EZnc2HqsgYuqPuzZV+I3RbujbDm+T0PmWCVO/5jqftp1zy+wSA6s0JWtp2z5e1oZV+yMsjB3ZXolsv0Ulrv01v3/iKrF94Qtbt9siCnmeb6fjjf59KnLk1xaEbvtvFnFirGvEOqmycQrbm/IMsXd3P28uh4nM3swXRER717OiX8kc7K2qqyn2p3maFGU/aruP5VCv+PraoTYU8yUmmbDwcYo6pusnM486xdoga4dkPCb1pK7Sfc6ebvkd4qeAtQcd/N63bB3lU3dlUnUf38VyvqCqK7JxlNSd7lydrDlm+/uqHiRvl30Nrp/n9zpkZRjoJ3V1diyP05rIYXHYs+w+D5+WMS8b5gZtKcuX0KT5d/WwtB97VnyvY6rjMukI56HI0rFJPwt8PjT/1OXzSbcMeEmdh294qvKK4rNu7j4n3LNZg8TKXwafv025U+XvKjHsT8Q7/7LGaJt9lAh7Asz3uv0XEX6t0duDoWN/93wmh92XpUHmCKb9GALbG+rZP3AfNbQPKKv/jpF/bP0JXfuW1QYk7dhljcyvk5mw+933Hpo1g26PQ2ZP6zVmTJt47P25jncD9vPwGS+q9QS/V6RaY8j8K8LmvUr9HfYCpH5OWL9lZY+Sv6pesHCJHbtrf9k6etZvf0G1L0ja4cAe1UT/s3zdCe3/Q5/n372wMc97/E1Qh0Tbmfwh3m/V9On72tNnrCF1sJkVe1EyXMdBa7+lHMsk44zMF6St9e2djNnbm8ybpHkq+gbbemMaH0UZmD8obKGrk7r+nt+3bE7o83YZp/vqOKdv6PzJNN6mTJsI/51XR7i2ZrGA5B6zFwnjzxmqPjaGfW3tZNrz1eljq29mOOqeCfF/irRt87PNw0uXSVAvrmOMNT569MptsYaV0sic/wbY13e8hPrb9K2ySUJ0j6G/Lu0U4qpTrR23jMp6m5hU+YTaWCeh9aIsm/rqUHV4bFv42kgnZdfH1PUj1D7DVH9d8khRN1zFRl/+/TW//qxL1uH83+mk3H+SvRtS2TDU90nX2TpM6/1xzZpZtoYdK763dqlz0f6uNeFehcs+H/nbGP77MpX06n/ofpzP+tVmTUvRtVuX/cjS67OE5kRBrxyJ+w/dPo7r+9cO1160e3gqu0S2uW7PjN/L6ns/UfMf10Lai87frJ+3KndAfc8yTf1M3T4s6qm4/yh7/2GSkG8UMw//DvRLgbYZSEOxr0LCWvRdjfh9XGzfqN4NivfZd7rsmFp08zmbssrKJEuTfVMZopdpbuwSrhNv3/N2s+0PDG3KNB6RMrFvJHv6B85HXObAoWsd3zm3i+6uZYytv+5+pohbpo6+tpZJFfmGlrcMf4c8b1Pe2OUIsaXJrinCTfaxtZOt+NYnU3hIfQlN20Z/1+dt7JaqLsbIzycNWZmrlNg2Dc2/LJ1T+T6WrrYSml4Ku7ik7yIx2opJD51vU9UfVRmrqL8u/olZj0PyCLV5irxcdKoi/6rKb8qTrHsnhW9jyZH/nSpeWDzxd9769uQ016lgUuf2pAfKPhu2FpfZL2Yb9snLNl/fNIepXaUsj4vNXCXUZ75px8ojNP8UPvAta2g6fb+F1ckZuneshv1vGXXDeyRRrN/bBPS1Jul+l+7zW86R7Wv63WXyDpt/RxraRjvC+TC3O61/Sqj/prag8x372yQivn+XwudrI2X2E2KdtJEov52e0L+uv4FO3p/rvssgsL8F4d/z9PzlWS94m8fqS3361Fi+6qaVYHwi9Yz4iH2fobIj+45cpz/TUaarr/4+z+vaWtVtyAX2d1LG8W9C3f+F1mnf36/k4w3YPrLv+XBVXCJs3cr+n4MKJuLv/fN9GhNdXVP5pJMN9vFi3rpv3/r8Ywg3SYp66zNOsO8QGcxPpnmRS/1mvmJjju3v7absI2xspQrvs1dNbjOj/wP7h1RlZyKGy8occ408UL8En4v6xfC/K3z52XzJd62T8vuZGGsxo/6O46ntmNqqFb/jps2/hHV4rPKH0svT4pstU7t2tZ9u/ZdqbJL1MwP6O86Fyt4jYaIrGz9mjEt8lFL4PtVE6votG2P6fpdf/GZRse7s3bf4BtSl/DIbKMctx++Z+8o6K6z9FPOwKsRmXiaNl7C+6NYRpjlbqG1j72f49qsuY4brd/amb4ZVc8TQ+sSH985LrEe8iPWJnfPrJRbWbb+dwn4x6o+r/aS2S7w3qWt//LnYz2ntE0vH1uDcyKatx1rH+EiMPEN1SZG/iz6+9o01Rob6O7Q+xLZ1jHobK61U+pWVvo2EpuWqzzD6Poa+pvhli0wn8Zq/72Mzm2d90o5VN1x9ZKuzbTgvqWwUIin8FSpl1CXXvFRxU0iozVPYJDRtF3uFphn6XAyJUUdD7SjTJ8v6n9fVbVObkKWp001lc9VRlqdOf5v0ZM+bymdbfp1NfG0bq27Y5JMyfxeJkU6o/inKH8O2Zfgidb6h/g3VJ7QcVbWL0Pxt6rlrPqa4KfQ25a2zl4/E8GdM/4fK/wA="));
const $7826f90f6f0cecc9$var$stateMachine = new (0, $6uUbQ$dfa)((0, (/*@__PURE__*/$parcel$interopDefault($4b0735ca6c692ea5$exports))));
class $7826f90f6f0cecc9$export$2e2bcd8739ae039 extends (0, $649970d87335b30f$export$2e2bcd8739ae039) {
    static planFeatures(plan) {
        plan.addStage($7826f90f6f0cecc9$var$setupSyllables);
        plan.addStage([
            'locl',
            'ccmp'
        ]);
        plan.addStage($7826f90f6f0cecc9$var$initialReordering);
        plan.addStage('nukt');
        plan.addStage('akhn');
        plan.addStage('rphf', false);
        plan.addStage('rkrf');
        plan.addStage('pref', false);
        plan.addStage('blwf', false);
        plan.addStage('abvf', false);
        plan.addStage('half', false);
        plan.addStage('pstf', false);
        plan.addStage('vatu');
        plan.addStage('cjct');
        plan.addStage('cfar', false);
        plan.addStage($7826f90f6f0cecc9$var$finalReordering);
        plan.addStage({
            local: [
                'init'
            ],
            global: [
                'pres',
                'abvs',
                'blws',
                'psts',
                'haln',
                'dist',
                'abvm',
                'blwm',
                'calt',
                'clig'
            ]
        });
        // Setup the indic config for the selected script
        plan.unicodeScript = $130d1a642ebcd2b7$export$ce50e82f12a827a4(plan.script);
        plan.indicConfig = (0, $90a9d3398ee54fe5$export$e99d119da76a0fc5)[plan.unicodeScript] || (0, $90a9d3398ee54fe5$export$e99d119da76a0fc5).Default;
        plan.isOldSpec = plan.indicConfig.hasOldSpec && plan.script[plan.script.length - 1] !== '2';
    // TODO: turn off kern (Khmer) and liga features.
    }
    static assignFeatures(plan, glyphs) {
        // Decompose split matras
        // TODO: do this in a more general unicode normalizer
        for(let i = glyphs.length - 1; i >= 0; i--){
            let codepoint = glyphs[i].codePoints[0];
            let d = (0, $90a9d3398ee54fe5$export$f647c9cfdd77d95a)[codepoint] || $7826f90f6f0cecc9$var$decompositions[codepoint];
            if (d) {
                let decomposed = d.map((c)=>{
                    let g = plan.font.glyphForCodePoint(c);
                    return new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(plan.font, g.id, [
                        c
                    ], glyphs[i].features);
                });
                glyphs.splice(i, 1, ...decomposed);
            }
        }
    }
}
(0, $6uUbQ$_)($7826f90f6f0cecc9$export$2e2bcd8739ae039, "zeroMarkWidths", 'NONE');
function $7826f90f6f0cecc9$var$indicCategory(glyph) {
    return $7826f90f6f0cecc9$var$trie.get(glyph.codePoints[0]) >> 8;
}
function $7826f90f6f0cecc9$var$indicPosition(glyph) {
    return 1 << ($7826f90f6f0cecc9$var$trie.get(glyph.codePoints[0]) & 0xff);
}
class $7826f90f6f0cecc9$var$IndicInfo {
    constructor(category, position, syllableType, syllable){
        this.category = category;
        this.position = position;
        this.syllableType = syllableType;
        this.syllable = syllable;
    }
}
function $7826f90f6f0cecc9$var$setupSyllables(font, glyphs) {
    let syllable = 0;
    let last = 0;
    for (let [start, end, tags] of $7826f90f6f0cecc9$var$stateMachine.match(glyphs.map($7826f90f6f0cecc9$var$indicCategory))){
        if (start > last) {
            ++syllable;
            for(let i = last; i < start; i++)glyphs[i].shaperInfo = new $7826f90f6f0cecc9$var$IndicInfo((0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).X, (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).End, 'non_indic_cluster', syllable);
        }
        ++syllable;
        // Create shaper info
        for(let i = start; i <= end; i++)glyphs[i].shaperInfo = new $7826f90f6f0cecc9$var$IndicInfo(1 << $7826f90f6f0cecc9$var$indicCategory(glyphs[i]), $7826f90f6f0cecc9$var$indicPosition(glyphs[i]), tags[0], syllable);
        last = end + 1;
    }
    if (last < glyphs.length) {
        ++syllable;
        for(let i = last; i < glyphs.length; i++)glyphs[i].shaperInfo = new $7826f90f6f0cecc9$var$IndicInfo((0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).X, (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).End, 'non_indic_cluster', syllable);
    }
}
function $7826f90f6f0cecc9$var$isConsonant(glyph) {
    return glyph.shaperInfo.category & (0, $90a9d3398ee54fe5$export$8519deaa7de2b07);
}
function $7826f90f6f0cecc9$var$isJoiner(glyph) {
    return glyph.shaperInfo.category & (0, $90a9d3398ee54fe5$export$bbcd928767338e0d);
}
function $7826f90f6f0cecc9$var$isHalantOrCoeng(glyph) {
    return glyph.shaperInfo.category & (0, $90a9d3398ee54fe5$export$ca9599b2a300afc);
}
function $7826f90f6f0cecc9$var$wouldSubstitute(glyphs, feature) {
    for (let glyph of glyphs)glyph.features = {
        [feature]: true
    };
    let GSUB = glyphs[0]._font._layoutEngine.engine.GSUBProcessor;
    GSUB.applyFeatures([
        feature
    ], glyphs);
    return glyphs.length === 1;
}
function $7826f90f6f0cecc9$var$consonantPosition(font, consonant, virama) {
    let glyphs = [
        virama,
        consonant,
        virama
    ];
    if ($7826f90f6f0cecc9$var$wouldSubstitute(glyphs.slice(0, 2), 'blwf') || $7826f90f6f0cecc9$var$wouldSubstitute(glyphs.slice(1, 3), 'blwf')) return (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Below_C;
    else if ($7826f90f6f0cecc9$var$wouldSubstitute(glyphs.slice(0, 2), 'pstf') || $7826f90f6f0cecc9$var$wouldSubstitute(glyphs.slice(1, 3), 'pstf')) return (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Post_C;
    else if ($7826f90f6f0cecc9$var$wouldSubstitute(glyphs.slice(0, 2), 'pref') || $7826f90f6f0cecc9$var$wouldSubstitute(glyphs.slice(1, 3), 'pref')) return (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Post_C;
    return (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C;
}
function $7826f90f6f0cecc9$var$initialReordering(font, glyphs, plan) {
    let indicConfig = plan.indicConfig;
    let features = font._layoutEngine.engine.GSUBProcessor.features;
    let dottedCircle = font.glyphForCodePoint(0x25cc).id;
    let virama = font.glyphForCodePoint(indicConfig.virama).id;
    if (virama) {
        let info = new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(font, virama, [
            indicConfig.virama
        ]);
        for(let i = 0; i < glyphs.length; i++)if (glyphs[i].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C) glyphs[i].shaperInfo.position = $7826f90f6f0cecc9$var$consonantPosition(font, glyphs[i].copy(), info);
    }
    for(let start = 0, end = $7826f90f6f0cecc9$var$nextSyllable(glyphs, 0); start < glyphs.length; start = end, end = $7826f90f6f0cecc9$var$nextSyllable(glyphs, start)){
        let { category: category, syllableType: syllableType } = glyphs[start].shaperInfo;
        if (syllableType === 'symbol_cluster' || syllableType === 'non_indic_cluster') continue;
        if (syllableType === 'broken_cluster' && dottedCircle) {
            let g = new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(font, dottedCircle, [
                0x25cc
            ]);
            g.shaperInfo = new $7826f90f6f0cecc9$var$IndicInfo(1 << $7826f90f6f0cecc9$var$indicCategory(g), $7826f90f6f0cecc9$var$indicPosition(g), glyphs[start].shaperInfo.syllableType, glyphs[start].shaperInfo.syllable);
            // Insert after possible Repha.
            let i = start;
            while(i < end && glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).Repha)i++;
            glyphs.splice(i++, 0, g);
            end++;
        }
        // 1. Find base consonant:
        //
        // The shaping engine finds the base consonant of the syllable, using the
        // following algorithm: starting from the end of the syllable, move backwards
        // until a consonant is found that does not have a below-base or post-base
        // form (post-base forms have to follow below-base forms), or that is not a
        // pre-base reordering Ra, or arrive at the first consonant. The consonant
        // stopped at will be the base.
        let base = end;
        let limit = start;
        let hasReph = false;
        // If the syllable starts with Ra + Halant (in a script that has Reph)
        // and has more than one consonant, Ra is excluded from candidates for
        // base consonants.
        if (indicConfig.rephPos !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Ra_To_Become_Reph && features.rphf && start + 3 <= end && (indicConfig.rephMode === 'Implicit' && !$7826f90f6f0cecc9$var$isJoiner(glyphs[start + 2]) || indicConfig.rephMode === 'Explicit' && glyphs[start + 2].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).ZWJ)) {
            // See if it matches the 'rphf' feature.
            let g = [
                glyphs[start].copy(),
                glyphs[start + 1].copy(),
                glyphs[start + 2].copy()
            ];
            if ($7826f90f6f0cecc9$var$wouldSubstitute(g.slice(0, 2), 'rphf') || indicConfig.rephMode === 'Explicit' && $7826f90f6f0cecc9$var$wouldSubstitute(g, 'rphf')) {
                limit += 2;
                while(limit < end && $7826f90f6f0cecc9$var$isJoiner(glyphs[limit]))limit++;
                base = start;
                hasReph = true;
            }
        } else if (indicConfig.rephMode === 'Log_Repha' && glyphs[start].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).Repha) {
            limit++;
            while(limit < end && $7826f90f6f0cecc9$var$isJoiner(glyphs[limit]))limit++;
            base = start;
            hasReph = true;
        }
        switch(indicConfig.basePos){
            case 'Last':
                {
                    // starting from the end of the syllable, move backwards
                    let i = end;
                    let seenBelow = false;
                    do {
                        let info = glyphs[--i].shaperInfo;
                        // until a consonant is found
                        if ($7826f90f6f0cecc9$var$isConsonant(glyphs[i])) {
                            // that does not have a below-base or post-base form
                            // (post-base forms have to follow below-base forms),
                            if (info.position !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Below_C && (info.position !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Post_C || seenBelow)) {
                                base = i;
                                break;
                            }
                            // or that is not a pre-base reordering Ra,
                            //
                            // IMPLEMENTATION NOTES:
                            //
                            // Our pre-base reordering Ra's are marked POS_POST_C, so will be skipped
                            // by the logic above already.
                            //
                            // or arrive at the first consonant. The consonant stopped at will
                            // be the base.
                            if (info.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Below_C) seenBelow = true;
                            base = i;
                        } else if (start < i && info.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).ZWJ && glyphs[i - 1].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).H) break;
                    }while (i > limit);
                    break;
                }
            case 'First':
                // The first consonant is always the base.
                base = start;
                // Mark all subsequent consonants as below.
                for(let i = base + 1; i < end; i++)if ($7826f90f6f0cecc9$var$isConsonant(glyphs[i])) glyphs[i].shaperInfo.position = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Below_C;
        }
        // If the syllable starts with Ra + Halant (in a script that has Reph)
        // and has more than one consonant, Ra is excluded from candidates for
        // base consonants.
        //
        //  Only do this for unforced Reph. (ie. not for Ra,H,ZWJ)
        if (hasReph && base === start && limit - base <= 2) hasReph = false;
        // 2. Decompose and reorder Matras:
        //
        // Each matra and any syllable modifier sign in the cluster are moved to the
        // appropriate position relative to the consonant(s) in the cluster. The
        // shaping engine decomposes two- or three-part matras into their constituent
        // parts before any repositioning. Matra characters are classified by which
        // consonant in a conjunct they have affinity for and are reordered to the
        // following positions:
        //
        //   o Before first half form in the syllable
        //   o After subjoined consonants
        //   o After post-form consonant
        //   o After main consonant (for above marks)
        //
        // IMPLEMENTATION NOTES:
        //
        // The normalize() routine has already decomposed matras for us, so we don't
        // need to worry about that.
        // 3.  Reorder marks to canonical order:
        //
        // Adjacent nukta and halant or nukta and vedic sign are always repositioned
        // if necessary, so that the nukta is first.
        //
        // IMPLEMENTATION NOTES:
        //
        // We don't need to do this: the normalize() routine already did this for us.
        // Reorder characters
        for(let i = start; i < base; i++){
            let info = glyphs[i].shaperInfo;
            info.position = Math.min((0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_C, info.position);
        }
        if (base < end) glyphs[base].shaperInfo.position = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C;
        // Mark final consonants.  A final consonant is one appearing after a matra,
        // like in Khmer.
        for(let i = base + 1; i < end; i++)if (glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M) {
            for(let j = i + 1; j < end; j++)if ($7826f90f6f0cecc9$var$isConsonant(glyphs[j])) {
                glyphs[j].shaperInfo.position = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Final_C;
                break;
            }
            break;
        }
        // Handle beginning Ra
        if (hasReph) glyphs[start].shaperInfo.position = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Ra_To_Become_Reph;
        // For old-style Indic script tags, move the first post-base Halant after
        // last consonant.
        //
        // Reports suggest that in some scripts Uniscribe does this only if there
        // is *not* a Halant after last consonant already (eg. Kannada), while it
        // does it unconditionally in other scripts (eg. Malayalam).  We don't
        // currently know about other scripts, so we single out Malayalam for now.
        //
        // Kannada test case:
        // U+0C9A,U+0CCD,U+0C9A,U+0CCD
        // With some versions of Lohit Kannada.
        // https://bugs.freedesktop.org/show_bug.cgi?id=59118
        //
        // Malayalam test case:
        // U+0D38,U+0D4D,U+0D31,U+0D4D,U+0D31,U+0D4D
        // With lohit-ttf-20121122/Lohit-Malayalam.ttf
        if (plan.isOldSpec) {
            let disallowDoubleHalants = plan.unicodeScript !== 'Malayalam';
            for(let i = base + 1; i < end; i++)if (glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).H) {
                let j;
                for(j = end - 1; j > i; j--){
                    if ($7826f90f6f0cecc9$var$isConsonant(glyphs[j]) || disallowDoubleHalants && glyphs[j].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).H) break;
                }
                if (glyphs[j].shaperInfo.category !== (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).H && j > i) {
                    // Move Halant to after last consonant.
                    let t = glyphs[i];
                    glyphs.splice(i, 0, ...glyphs.splice(i + 1, j - i));
                    glyphs[j] = t;
                }
                break;
            }
        }
        // Attach misc marks to previous char to move with them.
        let lastPos = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Start;
        for(let i = start; i < end; i++){
            let info = glyphs[i].shaperInfo;
            if (info.category & ((0, $90a9d3398ee54fe5$export$bbcd928767338e0d) | (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).N | (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).RS | (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).CM | (0, $90a9d3398ee54fe5$export$ca9599b2a300afc) & info.category)) {
                info.position = lastPos;
                if (info.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).H && info.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_M) {
                    // Uniscribe doesn't move the Halant with Left Matra.
                    // TEST: U+092B,U+093F,U+094DE
                    // We follow.  This is important for the Sinhala
                    // U+0DDA split matra since it decomposes to U+0DD9,U+0DCA
                    // where U+0DD9 is a left matra and U+0DCA is the virama.
                    // We don't want to move the virama with the left matra.
                    // TEST: U+0D9A,U+0DDA
                    for(let j = i; j > start; j--)if (glyphs[j - 1].shaperInfo.position !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_M) {
                        info.position = glyphs[j - 1].shaperInfo.position;
                        break;
                    }
                }
            } else if (info.position !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).SMVD) lastPos = info.position;
        }
        // For post-base consonants let them own anything before them
        // since the last consonant or matra.
        let last = base;
        for(let i = base + 1; i < end; i++){
            if ($7826f90f6f0cecc9$var$isConsonant(glyphs[i])) {
                for(let j = last + 1; j < i; j++)if (glyphs[j].shaperInfo.position < (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).SMVD) glyphs[j].shaperInfo.position = glyphs[i].shaperInfo.position;
                last = i;
            } else if (glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M) last = i;
        }
        let arr = glyphs.slice(start, end);
        arr.sort((a, b)=>a.shaperInfo.position - b.shaperInfo.position);
        glyphs.splice(start, arr.length, ...arr);
        // Find base again
        for(let i = start; i < end; i++)if (glyphs[i].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C) {
            base = i;
            break;
        }
        // Setup features now
        // Reph
        for(let i = start; i < end && glyphs[i].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Ra_To_Become_Reph; i++)glyphs[i].features.rphf = true;
        // Pre-base
        let blwf = !plan.isOldSpec && indicConfig.blwfMode === 'Pre_And_Post';
        for(let i = start; i < base; i++){
            glyphs[i].features.half = true;
            if (blwf) glyphs[i].features.blwf = true;
        }
        // Post-base
        for(let i = base + 1; i < end; i++){
            glyphs[i].features.abvf = true;
            glyphs[i].features.pstf = true;
            glyphs[i].features.blwf = true;
        }
        if (plan.isOldSpec && plan.unicodeScript === 'Devanagari') {
            // Old-spec eye-lash Ra needs special handling.  From the
            // spec:
            //
            // "The feature 'below-base form' is applied to consonants
            // having below-base forms and following the base consonant.
            // The exception is vattu, which may appear below half forms
            // as well as below the base glyph. The feature 'below-base
            // form' will be applied to all such occurrences of Ra as well."
            //
            // Test case: U+0924,U+094D,U+0930,U+094d,U+0915
            // with Sanskrit 2003 font.
            //
            // However, note that Ra,Halant,ZWJ is the correct way to
            // request eyelash form of Ra, so we wouldbn't inhibit it
            // in that sequence.
            //
            // Test case: U+0924,U+094D,U+0930,U+094d,U+200D,U+0915
            for(let i = start; i + 1 < base; i++)if (glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).Ra && glyphs[i + 1].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).H && (i + 1 === base || glyphs[i + 2].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).ZWJ)) {
                glyphs[i].features.blwf = true;
                glyphs[i + 1].features.blwf = true;
            }
        }
        let prefLen = 2;
        if (features.pref && base + prefLen < end) // Find a Halant,Ra sequence and mark it for pre-base reordering processing.
        for(let i = base + 1; i + prefLen - 1 < end; i++){
            let g = [
                glyphs[i].copy(),
                glyphs[i + 1].copy()
            ];
            if ($7826f90f6f0cecc9$var$wouldSubstitute(g, 'pref')) {
                for(let j = 0; j < prefLen; j++)glyphs[i++].features.pref = true;
                // Mark the subsequent stuff with 'cfar'.  Used in Khmer.
                // Read the feature spec.
                // This allows distinguishing the following cases with MS Khmer fonts:
                // U+1784,U+17D2,U+179A,U+17D2,U+1782
                // U+1784,U+17D2,U+1782,U+17D2,U+179A
                if (features.cfar) for(; i < end; i++)glyphs[i].features.cfar = true;
                break;
            }
        }
        // Apply ZWJ/ZWNJ effects
        for(let i = start + 1; i < end; i++)if ($7826f90f6f0cecc9$var$isJoiner(glyphs[i])) {
            let nonJoiner = glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).ZWNJ;
            let j = i;
            do {
                j--;
                // ZWJ/ZWNJ should disable CJCT.  They do that by simply
                // being there, since we don't skip them for the CJCT
                // feature (ie. F_MANUAL_ZWJ)
                // A ZWNJ disables HALF.
                if (nonJoiner) delete glyphs[j].features.half;
            }while (j > start && !$7826f90f6f0cecc9$var$isConsonant(glyphs[j]));
        }
    }
}
function $7826f90f6f0cecc9$var$finalReordering(font, glyphs, plan) {
    let indicConfig = plan.indicConfig;
    let features = font._layoutEngine.engine.GSUBProcessor.features;
    for(let start = 0, end = $7826f90f6f0cecc9$var$nextSyllable(glyphs, 0); start < glyphs.length; start = end, end = $7826f90f6f0cecc9$var$nextSyllable(glyphs, start)){
        // 4. Final reordering:
        //
        // After the localized forms and basic shaping forms GSUB features have been
        // applied (see below), the shaping engine performs some final glyph
        // reordering before applying all the remaining font features to the entire
        // cluster.
        let tryPref = !!features.pref;
        // Find base again
        let base = start;
        for(; base < end; base++)if (glyphs[base].shaperInfo.position >= (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C) {
            if (tryPref && base + 1 < end) {
                for(let i = base + 1; i < end; i++)if (glyphs[i].features.pref) {
                    if (!(glyphs[i].substituted && glyphs[i].isLigated && !glyphs[i].isMultiplied)) {
                        // Ok, this was a 'pref' candidate but didn't form any.
                        // Base is around here...
                        base = i;
                        while(base < end && $7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[base]))base++;
                        glyphs[base].shaperInfo.position = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).BASE_C;
                        tryPref = false;
                    }
                    break;
                }
            }
            // For Malayalam, skip over unformed below- (but NOT post-) forms.
            if (plan.unicodeScript === 'Malayalam') for(let i = base + 1; i < end; i++){
                while(i < end && $7826f90f6f0cecc9$var$isJoiner(glyphs[i]))i++;
                if (i === end || !$7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[i])) break;
                i++; // Skip halant.
                while(i < end && $7826f90f6f0cecc9$var$isJoiner(glyphs[i]))i++;
                if (i < end && $7826f90f6f0cecc9$var$isConsonant(glyphs[i]) && glyphs[i].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Below_C) {
                    base = i;
                    glyphs[base].shaperInfo.position = (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C;
                }
            }
            if (start < base && glyphs[base].shaperInfo.position > (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Base_C) base--;
            break;
        }
        if (base === end && start < base && glyphs[base - 1].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).ZWJ) base--;
        if (base < end) while(start < base && glyphs[base].shaperInfo.category & ((0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).N | (0, $90a9d3398ee54fe5$export$ca9599b2a300afc)))base--;
        // o Reorder matras:
        //
        // If a pre-base matra character had been reordered before applying basic
        // features, the glyph can be moved closer to the main consonant based on
        // whether half-forms had been formed. Actual position for the matra is
        // defined as “after last standalone halant glyph, after initial matra
        // position and before the main consonant”. If ZWJ or ZWNJ follow this
        // halant, position is moved after it.
        //
        if (start + 1 < end && start < base) {
            // If we lost track of base, alas, position before last thingy.
            let newPos = base === end ? base - 2 : base - 1;
            // Malayalam / Tamil do not have "half" forms or explicit virama forms.
            // The glyphs formed by 'half' are Chillus or ligated explicit viramas.
            // We want to position matra after them.
            if (plan.unicodeScript !== 'Malayalam' && plan.unicodeScript !== 'Tamil') {
                while(newPos > start && !(glyphs[newPos].shaperInfo.category & ((0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M | (0, $90a9d3398ee54fe5$export$ca9599b2a300afc))))newPos--;
                // If we found no Halant we are done.
                // Otherwise only proceed if the Halant does
                // not belong to the Matra itself!
                if ($7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newPos]) && glyphs[newPos].shaperInfo.position !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_M) // If ZWJ or ZWNJ follow this halant, position is moved after it.
                {
                    if (newPos + 1 < end && $7826f90f6f0cecc9$var$isJoiner(glyphs[newPos + 1])) newPos++;
                } else newPos = start; // No move.
            }
            if (start < newPos && glyphs[newPos].shaperInfo.position !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_M) {
                // Now go see if there's actually any matras...
                for(let i = newPos; i > start; i--)if (glyphs[i - 1].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_M) {
                    let oldPos = i - 1;
                    if (oldPos < base && base <= newPos) base--;
                    let tmp = glyphs[oldPos];
                    glyphs.splice(oldPos, 0, ...glyphs.splice(oldPos + 1, newPos - oldPos));
                    glyphs[newPos] = tmp;
                    newPos--;
                }
            }
        }
        // o Reorder reph:
        //
        // Reph’s original position is always at the beginning of the syllable,
        // (i.e. it is not reordered at the character reordering stage). However,
        // it will be reordered according to the basic-forms shaping results.
        // Possible positions for reph, depending on the script, are; after main,
        // before post-base consonant forms, and after post-base consonant forms.
        // Two cases:
        //
        // - If repha is encoded as a sequence of characters (Ra,H or Ra,H,ZWJ), then
        //   we should only move it if the sequence ligated to the repha form.
        //
        // - If repha is encoded separately and in the logical position, we should only
        //   move it if it did NOT ligate.  If it ligated, it's probably the font trying
        //   to make it work without the reordering.
        if (start + 1 < end && glyphs[start].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Ra_To_Become_Reph && glyphs[start].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).Repha !== (glyphs[start].isLigated && !glyphs[start].isMultiplied)) {
            let newRephPos;
            let rephPos = indicConfig.rephPos;
            let found = false;
            // 1. If reph should be positioned after post-base consonant forms,
            //    proceed to step 5.
            if (rephPos !== (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).After_Post) {
                //  2. If the reph repositioning class is not after post-base: target
                //     position is after the first explicit halant glyph between the
                //     first post-reph consonant and last main consonant. If ZWJ or ZWNJ
                //     are following this halant, position is moved after it. If such
                //     position is found, this is the target position. Otherwise,
                //     proceed to the next step.
                //
                //     Note: in old-implementation fonts, where classifications were
                //     fixed in shaping engine, there was no case where reph position
                //     will be found on this step.
                newRephPos = start + 1;
                while(newRephPos < base && !$7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newRephPos]))newRephPos++;
                if (newRephPos < base && $7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newRephPos])) {
                    // ->If ZWJ or ZWNJ are following this halant, position is moved after it.
                    if (newRephPos + 1 < base && $7826f90f6f0cecc9$var$isJoiner(glyphs[newRephPos + 1])) newRephPos++;
                    found = true;
                }
                // 3. If reph should be repositioned after the main consonant: find the
                //    first consonant not ligated with main, or find the first
                //    consonant that is not a potential pre-base reordering Ra.
                if (!found && rephPos === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).After_Main) {
                    newRephPos = base;
                    while(newRephPos + 1 < end && glyphs[newRephPos + 1].shaperInfo.position <= (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).After_Main)newRephPos++;
                    found = newRephPos < end;
                }
                // 4. If reph should be positioned before post-base consonant, find
                //    first post-base classified consonant not ligated with main. If no
                //    consonant is found, the target position should be before the
                //    first matra, syllable modifier sign or vedic sign.
                //
                // This is our take on what step 4 is trying to say (and failing, BADLY).
                if (!found && rephPos === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).After_Sub) {
                    newRephPos = base;
                    while(newRephPos + 1 < end && !(glyphs[newRephPos + 1].shaperInfo.position & ((0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Post_C | (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).After_Post | (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).SMVD)))newRephPos++;
                    found = newRephPos < end;
                }
            }
            //  5. If no consonant is found in steps 3 or 4, move reph to a position
            //     immediately before the first post-base matra, syllable modifier
            //     sign or vedic sign that has a reordering class after the intended
            //     reph position. For example, if the reordering position for reph
            //     is post-main, it will skip above-base matras that also have a
            //     post-main position.
            if (!found) {
                // Copied from step 2.
                newRephPos = start + 1;
                while(newRephPos < base && !$7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newRephPos]))newRephPos++;
                if (newRephPos < base && $7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newRephPos])) {
                    // ->If ZWJ or ZWNJ are following this halant, position is moved after it.
                    if (newRephPos + 1 < base && $7826f90f6f0cecc9$var$isJoiner(glyphs[newRephPos + 1])) newRephPos++;
                    found = true;
                }
            }
            // 6. Otherwise, reorder reph to the end of the syllable.
            if (!found) {
                newRephPos = end - 1;
                while(newRephPos > start && glyphs[newRephPos].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).SMVD)newRephPos--;
                // If the Reph is to be ending up after a Matra,Halant sequence,
                // position it before that Halant so it can interact with the Matra.
                // However, if it's a plain Consonant,Halant we shouldn't do that.
                // Uniscribe doesn't do this.
                // TEST: U+0930,U+094D,U+0915,U+094B,U+094D
                if ($7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newRephPos])) {
                    for(let i = base + 1; i < newRephPos; i++)if (glyphs[i].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M) newRephPos--;
                }
            }
            let reph = glyphs[start];
            glyphs.splice(start, 0, ...glyphs.splice(start + 1, newRephPos - start));
            glyphs[newRephPos] = reph;
            if (start < base && base <= newRephPos) base--;
        }
        // o Reorder pre-base reordering consonants:
        //
        // If a pre-base reordering consonant is found, reorder it according to
        // the following rules:
        if (tryPref && base + 1 < end) {
            for(let i = base + 1; i < end; i++)if (glyphs[i].features.pref) {
                // 1. Only reorder a glyph produced by substitution during application
                //    of the <pref> feature. (Note that a font may shape a Ra consonant with
                //    the feature generally but block it in certain contexts.)
                // Note: We just check that something got substituted.  We don't check that
                // the <pref> feature actually did it...
                //
                // Reorder pref only if it ligated.
                if (glyphs[i].isLigated && !glyphs[i].isMultiplied) {
                    // 2. Try to find a target position the same way as for pre-base matra.
                    //    If it is found, reorder pre-base consonant glyph.
                    //
                    // 3. If position is not found, reorder immediately before main
                    //    consonant.
                    let newPos = base;
                    // Malayalam / Tamil do not have "half" forms or explicit virama forms.
                    // The glyphs formed by 'half' are Chillus or ligated explicit viramas.
                    // We want to position matra after them.
                    if (plan.unicodeScript !== 'Malayalam' && plan.unicodeScript !== 'Tamil') {
                        while(newPos > start && !(glyphs[newPos - 1].shaperInfo.category & ((0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M | (0, $90a9d3398ee54fe5$export$ca9599b2a300afc))))newPos--;
                        // In Khmer coeng model, a H,Ra can go *after* matras.  If it goes after a
                        // split matra, it should be reordered to *before* the left part of such matra.
                        if (newPos > start && glyphs[newPos - 1].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M) {
                            let oldPos = i;
                            for(let j = base + 1; j < oldPos; j++)if (glyphs[j].shaperInfo.category === (0, $90a9d3398ee54fe5$export$a513ea61a7bee91c).M) {
                                newPos--;
                                break;
                            }
                        }
                    }
                    if (newPos > start && $7826f90f6f0cecc9$var$isHalantOrCoeng(glyphs[newPos - 1])) // -> If ZWJ or ZWNJ follow this halant, position is moved after it.
                    {
                        if (newPos < end && $7826f90f6f0cecc9$var$isJoiner(glyphs[newPos])) newPos++;
                    }
                    let oldPos = i;
                    let tmp = glyphs[oldPos];
                    glyphs.splice(newPos + 1, 0, ...glyphs.splice(newPos, oldPos - newPos));
                    glyphs[newPos] = tmp;
                    if (newPos <= base && base < oldPos) base++;
                }
                break;
            }
        }
        // Apply 'init' to the Left Matra if it's a word start.
        if (glyphs[start].shaperInfo.position === (0, $90a9d3398ee54fe5$export$1a1f61c9c4dd9df0).Pre_M && (!start || !/Cf|Mn/.test((0, $6uUbQ$getCategory)(glyphs[start - 1].codePoints[0])))) glyphs[start].features.init = true;
    }
}
function $7826f90f6f0cecc9$var$nextSyllable(glyphs, start) {
    if (start >= glyphs.length) return start;
    let syllable = glyphs[start].shaperInfo.syllable;
    while(++start < glyphs.length && glyphs[start].shaperInfo.syllable === syllable);
    return start;
}









const { categories: $7ab494fe977143c6$var$categories, decompositions: $7ab494fe977143c6$var$decompositions } = (0, (/*@__PURE__*/$parcel$interopDefault($aa333a9607471296$exports)));
const $7ab494fe977143c6$var$trie = new (0, $6uUbQ$unicodetrie)((0, $12727730ddfc8bfe$export$94fdf11bafc8de6b)("AAACAAAAAAAQugAAAQUO+vHtnHuMX0UVx2d3u/t7bXe7FlqgvB+mpQhFmhikMRAg0ZQmakMU+cPWBzZisEGNjUpoiIYCEgmGUGOEGqOVNPUZUGNA+QNIBU2KREEFFSMBUYRISMXE+B3vnPzOzp553tcWfif5ZO5jnufMzJ2ZO/eumlDqFLAWnAMuBBvBZnC5uXZeBe4WsA1sBzs8/naCXcL1G8GtYDfYA74NvgfuAfcZHmT+fwEeBb8DTwvxPQWeAavACyZvq8z9VYxXwCGglijVBcvACnA8eCM4E6wHG8BF4BLwbvA+8AHwUbAd7AA7wS5wC9gN7gR7wX5wN7gXPAAeBr8Gvwd/Ac+CF8EhoCaV6oBZsBKcAE4FZ0wWeV8P9zxwoTnfCHczuBxsAdvAx8Gnzf1r4X4B3AxuA1+bHJb9m5PzdVGW/Yjv+xXHyfmxFfd9OH8Q/Ar8Bjw1WZT3GfACeAX8N5CfqSmlZsAKsGqqCH8K3DXgbHCuuXYB3HeAd4HLpgrdarbi+EPgY+CT4HPg8ybMTcb9MtyvghtYut/A+b4pf95+ELgfw08Qx/3gADgInjDl0veehPtX8A/wsrn2KtzxDuogWNoJx38k/BzXKeI8Ee5qcBZYD9aZtDbg+AwT19uMX83F7JizCdcvBZdZ97c6/BMfMWmfzfTm88/95aLj+DDSvApcDXZ04uPfaen3TMHPLvi5BezuFPVtD4t/qUcfe3FvP7gb3Ouwo9T+H+gMy/UIjh8DfwBPm7T08d/M8WMBe1Sh3xEjXo+M2s+IESNGjBgxYsSI1wLrOsM1gRsi/P+TzV3/Zc1jvxgR/j8IM9Et1mEGcJeDFeA4cJq5/ia467uF/w1wzwdvB+80998LdwvYZs63w90Bdnbd6Wp/uzz3R4wYMWJEvZzTMm2Xf8SIEfVQd/v+EsaPt3eL90J3wP2WMJ78Trd4t6+P77Hu37cIxp9/ny6YXqrUJeCR6TA74e/nll81MzxejeMtYA94HBwy91bPYow+O/S3A8d7oIM/gRN7CAP29Iqx/B1ThfuwOecM+vA3NmRjf6Gfm3BtH7v+PI7XDpS6EuwDz4O10+0/f9om1F4ehO4OmHp6EO7jxl56nvhsN/15ut+4Z0b657yYkZ7UJ0jhX0bcr3bn+6P87vekN4762QNzvWHZtL+jcH5srzg/uTf0f3pvfj5i+6tYW7rK9+aefO+tuL4BXAQ2gs3gPeBJc//9OL4CXAWuNvc/A64DN4Jbwe0s7jtxvBfsAz8EPwX3gwPgoJAHPQ9/Atf/bO7p/TTP4fglwS/5/zfujfWH5z0cz4Gj+8X5Sf1ib4m+vwbHZ/fdOtP+z+3LOnPp/QL4vxhsApeCy8BWk/a2ftFmYu22Hf4/Ba4B14Hrwc0sP7fh+Cvg6+Au8F1WthA/8pT7UeTxZ/12njkuXT8UyM9i6iur1EEb6f+yPz/eg0b3v4X7x365fMaW42lPu7PTv6vi8i/G+lWF/cvUk7bLl1r+5/rN5tu3j2qvWTd/qV+4h+AqjDGnBsX59GDo94iBXDa6v6Yjl6vu+h8itJcsZq/ZykHhHg/3tMHhUe9s/Yfuny7YNxTvQ8LYdrER2+/c0GBezhrMv3ZNRv7PmYirh7oOv4W1Y72/cwPOzx8U7X8d2295sfE3MPnbBPfSQbHv9nK4HxTqiK/trI7Yy5mLzvuVg/nX+N7V51A3r+gMy/4J434W7l2dYf5PZWGuNX6uh3uzEPetuLY7sZ20zTETY2oxyBhj3DrnfsidYPeXRGLHpxzX6pbFofGRkFBdGhcgW40L4cYtd9JAElO36q4LEzXHX7VMtZ2BEhJjy9dT25fazOtJxhwsBrHzwfu8w12kMYN9fLhIbp2RxlI59rX1dzjpsKl2Fxt3iu6rbofc9q5+KcRrXVzzDn6/Crvk6p/y1GFgGhs9/6maHjBLgv8/18fTxl1q0bPoW8ywsFTGWaazHosrNn/kP2eeqEroZYLZphsZl7L82eephMIqNT8dyT9JjH1Jpg32ubZvTB/SF665ymSnnaqjUHum+1Qn+NyOtz9f2r6y5OQ51b6hYy0D40r2tYXar30+Y/mbVX6JqY+hMC60XZapoh3S/HdOpT3DYu3rs0lKnquyb277JZvyPlqp+f1zVVK2/dJYNpQGf04uYyh1+PTPqfalZ2tO/xwSu+3bOrDzmWvfcTW/fLmibRx6lkvlcOlc8qsE/y5/rnSk67F1iAu1VT6+4jKt5tufn8e2b+n57JKcckhrsKG1Cd6Wu+Y8tf2l5DenPafqQZ/7xstKLeyr+XnInjSelvRgS9n27JPQM5n6Am7jmLG8VK6m7OvyS2L313XYV2r/tth5LWPfNxhyhI+1Up7HVbe/HMgeZE8brtNQ/7tcyX0cn//H2LTO9kpir5VI6yYp9szJW9W2jI1Tqfl5ic2v1GZ5XaG6RDZbyvxMO/DVh1SdUj5y1vraaHs+2/TYNXvtSRoXk4wrf9w6fEctnFt0zL2y+xFsfSrLza2zOTqMiZv8xOpbn8+xsL5ykdj6VsxNKb/Lvxb7nX8u48y1x6yuMW3V9tNxTlouzXslibVxndjC14xda8g2NIbg5x01XAP2lfeIBFSi/zrQEporTXru8fCueiy1CUnqrhspSM9SzbSS64tep9R1ZsZcOxKsUEUfNZeYtr0vjY5DeXW915hT8/PRV8MxlR1HV4DHZZc9R7dzajgWoXikdLtGr0uEfPigsGS/NvYjSHW87XejoXZehZ74XrcqpQ4d5T5f7Gu8f6g7fQmefoqOqk4/VarQv2o4/VDetPDnhjR2dc3BCBp/9NVw7KGfwStVMf6aZNAajj6224j9HCZbpZa/LvH1gU30i/q5WnUdSNEprxv2eIOwx2pcjjLMsmObo008k0J4u69P3d9QdbspW/dy080Nb8PXqcrmj0vsc7tu6qwD1A5oLYr3U3XWSxqj6/a10nCMkudJMyxvrvbK55jUrqU+Xlr/Iai98jY7mVAml5QNHxq31j2m5TrSdmp6z5p+9kpzQntdQbI1Pafr6I9C60gxrALHGtdF6tyhLTtxeBuW+hhqyzPMX931xl6rJ5f6n5h3blpsW7vKbvdBfL1gpYfjDLrvob1drrRT+mcuMf1OrJSdW/P+RfufdUB+pOtdTzhpL5t0jfKr46P3obQfQdPGt1jS+DEkx4MT2PmEg1j72OthqfZNWX+JuZ4at/2sTAmn5cSIMqZIjk0pnD0+aUI6YS9ekdaspWsp8cWEC62dS66UTkq+ypajyvXSlPz4xhQhm/ns6wpXBVI560jHN9aKkdT46spvWT916rONdHNsGSNtl6Hp8oakTVukpF9n3U3Jx0TNefbp3R4jltVfFfpvQkJpNaH/puyco++qbZPz7sE1L3DFGVovc4XPLUPO3ELyrzLiSpmPhaTJfqeJ+t60PiTh9snNW2656upDQ+Wtyg6ueJquB7HSVPspW9a28lDWJouhb6iyv7XjTfVL67j2vjDpvUfMt1Vl4GvctMaeq/vYcFWXIfV5Ku3XaxK951H6dsWFrhcxa3pU/pz3C1xc71tTcaXjGjtJbYIj7UHm7wxSyx+D/d7SfpfJ3wPpfSQp32tS2dt8V2tD7+Bce3rpPa3eC6Dr8Ulq+K+J3HFvbn312Zv2RdStr9g0pP0P/B04XbP3Q8cIT2dlRF6orkrhY/Rv27FqHfL1DP480ffo/V6V7aTHXLKDbTdXOOrnyG1ScvSv6xqve30lPzdpj36M8Pilb+L5vr0xE3dd30nWIfZ45uSSxK4x+CRmTUK6F/LrSsfnj+aOdYyvpXyMK7/OpHWjlDTsa0rJum5K7Ppnj7F9c+0q0qtr7pQji2X9oMwcVrJfmblwU2V2SV3rEk3YuO46XXf8MfrQz077G2zftyDkj/ZqhcZr9nldkOg5ykAt3GunJbR3NGYsUfWafd3ts853C4dLHppOM6WcfM5C+xSbaC/2HMa1H9v1vXdoXm/LKSVpYh5wqmr/X67SfwHtPc9a97p/k8bt0hpbW0j1Svr2m+7Rd98qIQ1pvSF273dKOjHYNmk6fd8/JX3tWIddblBqoU5p7zrZKnd9TppjVq0DSitWqkwz12b2exb7vwjaRvS/TFd/S+8AYvIo+Suri5TwvvZRdV1IQevQ1/8SA+UeH5eto7n/X1Oe86ptaafl8kPjcF7P7W93eD9d5n+oSvn7fFe7I/G9q1IBfylSR71N6fft94ZU18hOXKR+JqUO8f4+5dvLsmWlMQb/Vov+CUDlpTGUndeQlG3fdZWdRPoPgl3mmDlsLnaey/4X3tVuU+o6L3/Pym+qlLV/jk6rlBRd8394hZ6JdnuqIv2ykOh3pfq96Wkq/E8qu2xl88/tOJ4R3tfmpbGi3c5T859bzqr7MbsN03iI5itUNj5eaEKWqIX/KJCQ/iFWNZMmHXs8ovWk53JzFq5vPul6zDjLV36pX7bzvNzB0YlQOZephWtRS5T7eeSq8030R77/HvC1d7tN83Zt9yltrDdwSR0XxsZd5l+MvvvU1/M9jSnj+Nh6FPJbBld/w6XHXH5MZeXrOfS/65g9RTl1JCa8chzX2RZ9/3lXSh4/VqWfEBNq4b82Ytp6m+9Qqxir1jX+rfPdT1vvsWhM6bPbmON6E1LnPCZW7L0qqXswmtqf0MQelZj4myrzYtzvIYmURlvtqapyx+gzRfd0XPfahVSOquMoG+dibBdl46iyfdbV1qvUW9m8+KTudMvkzZe/pqTJ+pWTflX5zw1fVfox6ZTVc8hvHflOSb+OuG1JsZ0kufXAJf8D"));
const $7ab494fe977143c6$var$stateMachine = new (0, $6uUbQ$dfa)((0, (/*@__PURE__*/$parcel$interopDefault($aa333a9607471296$exports))));
class $7ab494fe977143c6$export$2e2bcd8739ae039 extends (0, $649970d87335b30f$export$2e2bcd8739ae039) {
    static planFeatures(plan) {
        plan.addStage($7ab494fe977143c6$var$setupSyllables);
        // Default glyph pre-processing group
        plan.addStage([
            'locl',
            'ccmp',
            'nukt',
            'akhn'
        ]);
        // Reordering group
        plan.addStage($7ab494fe977143c6$var$clearSubstitutionFlags);
        plan.addStage([
            'rphf'
        ], false);
        plan.addStage($7ab494fe977143c6$var$recordRphf);
        plan.addStage($7ab494fe977143c6$var$clearSubstitutionFlags);
        plan.addStage([
            'pref'
        ]);
        plan.addStage($7ab494fe977143c6$var$recordPref);
        // Orthographic unit shaping group
        plan.addStage([
            'rkrf',
            'abvf',
            'blwf',
            'half',
            'pstf',
            'vatu',
            'cjct'
        ]);
        plan.addStage($7ab494fe977143c6$var$reorder);
        // Topographical features
        // Scripts that need this are handled by the Arabic shaper, not implemented here for now.
        // plan.addStage(['isol', 'init', 'medi', 'fina', 'med2', 'fin2', 'fin3'], false);
        // Standard topographic presentation and positional feature application
        plan.addStage([
            'abvs',
            'blws',
            'pres',
            'psts',
            'dist',
            'abvm',
            'blwm'
        ]);
    }
    static assignFeatures(plan, glyphs) {
        // Decompose split vowels
        // TODO: do this in a more general unicode normalizer
        for(let i = glyphs.length - 1; i >= 0; i--){
            let codepoint = glyphs[i].codePoints[0];
            if ($7ab494fe977143c6$var$decompositions[codepoint]) {
                let decomposed = $7ab494fe977143c6$var$decompositions[codepoint].map((c)=>{
                    let g = plan.font.glyphForCodePoint(c);
                    return new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(plan.font, g.id, [
                        c
                    ], glyphs[i].features);
                });
                glyphs.splice(i, 1, ...decomposed);
            }
        }
    }
}
(0, $6uUbQ$_)($7ab494fe977143c6$export$2e2bcd8739ae039, "zeroMarkWidths", 'BEFORE_GPOS');
function $7ab494fe977143c6$var$useCategory(glyph) {
    return $7ab494fe977143c6$var$trie.get(glyph.codePoints[0]);
}
class $7ab494fe977143c6$var$USEInfo {
    constructor(category, syllableType, syllable){
        this.category = category;
        this.syllableType = syllableType;
        this.syllable = syllable;
    }
}
function $7ab494fe977143c6$var$setupSyllables(font, glyphs) {
    let syllable = 0;
    for (let [start, end, tags] of $7ab494fe977143c6$var$stateMachine.match(glyphs.map($7ab494fe977143c6$var$useCategory))){
        ++syllable;
        // Create shaper info
        for(let i = start; i <= end; i++)glyphs[i].shaperInfo = new $7ab494fe977143c6$var$USEInfo($7ab494fe977143c6$var$categories[$7ab494fe977143c6$var$useCategory(glyphs[i])], tags[0], syllable);
        // Assign rphf feature
        let limit = glyphs[start].shaperInfo.category === 'R' ? 1 : Math.min(3, end - start);
        for(let i = start; i < start + limit; i++)glyphs[i].features.rphf = true;
    }
}
function $7ab494fe977143c6$var$clearSubstitutionFlags(font, glyphs) {
    for (let glyph of glyphs)glyph.substituted = false;
}
function $7ab494fe977143c6$var$recordRphf(font, glyphs) {
    for (let glyph of glyphs)if (glyph.substituted && glyph.features.rphf) // Mark a substituted repha.
    glyph.shaperInfo.category = 'R';
}
function $7ab494fe977143c6$var$recordPref(font, glyphs) {
    for (let glyph of glyphs)if (glyph.substituted) // Mark a substituted pref as VPre, as they behave the same way.
    glyph.shaperInfo.category = 'VPre';
}
function $7ab494fe977143c6$var$reorder(font, glyphs) {
    let dottedCircle = font.glyphForCodePoint(0x25cc).id;
    for(let start = 0, end = $7ab494fe977143c6$var$nextSyllable(glyphs, 0); start < glyphs.length; start = end, end = $7ab494fe977143c6$var$nextSyllable(glyphs, start)){
        let i, j;
        let info = glyphs[start].shaperInfo;
        let type = info.syllableType;
        // Only a few syllable types need reordering.
        if (type !== 'virama_terminated_cluster' && type !== 'standard_cluster' && type !== 'broken_cluster') continue;
        // Insert a dotted circle glyph in broken clusters.
        if (type === 'broken_cluster' && dottedCircle) {
            let g = new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(font, dottedCircle, [
                0x25cc
            ]);
            g.shaperInfo = info;
            // Insert after possible Repha.
            for(i = start; i < end && glyphs[i].shaperInfo.category === 'R'; i++);
            glyphs.splice(++i, 0, g);
            end++;
        }
        // Move things forward.
        if (info.category === 'R' && end - start > 1) // Got a repha. Reorder it to after first base, before first halant.
        for(i = start + 1; i < end; i++){
            info = glyphs[i].shaperInfo;
            if ($7ab494fe977143c6$var$isBase(info) || $7ab494fe977143c6$var$isHalant(glyphs[i])) {
                // If we hit a halant, move before it; otherwise it's a base: move to it's
                // place, and shift things in between backward.
                if ($7ab494fe977143c6$var$isHalant(glyphs[i])) i--;
                glyphs.splice(start, 0, ...glyphs.splice(start + 1, i - start), glyphs[i]);
                break;
            }
        }
        // Move things back.
        for(i = start, j = end; i < end; i++){
            info = glyphs[i].shaperInfo;
            if ($7ab494fe977143c6$var$isBase(info) || $7ab494fe977143c6$var$isHalant(glyphs[i])) // If we hit a halant, move after it; otherwise it's a base: move to it's
            // place, and shift things in between backward.
            j = $7ab494fe977143c6$var$isHalant(glyphs[i]) ? i + 1 : i;
            else if ((info.category === 'VPre' || info.category === 'VMPre') && j < i) glyphs.splice(j, 1, glyphs[i], ...glyphs.splice(j, i - j));
        }
    }
}
function $7ab494fe977143c6$var$nextSyllable(glyphs, start) {
    if (start >= glyphs.length) return start;
    let syllable = glyphs[start].shaperInfo.syllable;
    while(++start < glyphs.length && glyphs[start].shaperInfo.syllable === syllable);
    return start;
}
function $7ab494fe977143c6$var$isHalant(glyph) {
    return glyph.shaperInfo.category === 'H' && !glyph.isLigated;
}
function $7ab494fe977143c6$var$isBase(info) {
    return info.category === 'B' || info.category === 'GB';
}


const $102b6fe50f1d50b4$var$SHAPERS = {
    arab: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    mong: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    syrc: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    'nko ': (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    phag: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    mand: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    mani: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    phlp: (0, $764eb544bbe1ccf0$export$2e2bcd8739ae039),
    hang: (0, $e1c6bbc8cb416f8c$export$2e2bcd8739ae039),
    bng2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    beng: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    dev2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    deva: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    gjr2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    gujr: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    guru: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    gur2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    knda: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    knd2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    mlm2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    mlym: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    ory2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    orya: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    taml: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    tml2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    telu: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    tel2: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    khmr: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    bali: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    batk: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    brah: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    bugi: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    buhd: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    cakm: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    cham: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    dupl: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    egyp: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    gran: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    hano: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    java: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    kthi: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    kali: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    khar: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    khoj: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    sind: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    lepc: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    limb: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    mahj: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    // mand: UniversalShaper, // Mandaic
    // mani: UniversalShaper, // Manichaean
    mtei: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    modi: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    // mong: UniversalShaper, // Mongolian
    // 'nko ': UniversalShaper, // N’Ko
    hmng: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    // phag: UniversalShaper, // Phags-pa
    // phlp: UniversalShaper, // Psalter Pahlavi
    rjng: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    saur: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    shrd: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    sidd: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    sinh: (0, $7826f90f6f0cecc9$export$2e2bcd8739ae039),
    sund: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    sylo: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tglg: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tagb: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tale: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    lana: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tavt: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    takr: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tibt: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tfng: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    tirh: (0, $7ab494fe977143c6$export$2e2bcd8739ae039),
    latn: (0, $649970d87335b30f$export$2e2bcd8739ae039),
    DFLT: (0, $649970d87335b30f$export$2e2bcd8739ae039 // Default
    )
};
function $102b6fe50f1d50b4$export$7877a478dd30fd3d(script) {
    if (!Array.isArray(script)) script = [
        script
    ];
    for (let s of script){
        let shaper = $102b6fe50f1d50b4$var$SHAPERS[s];
        if (shaper) return shaper;
    }
    return 0, $649970d87335b30f$export$2e2bcd8739ae039;
}





class $0a876c45f1f7c41c$export$2e2bcd8739ae039 extends (0, $a83b9c36aaa94fd3$export$2e2bcd8739ae039) {
    applyLookup(lookupType, table) {
        switch(lookupType){
            case 1:
                {
                    let index = this.coverageIndex(table.coverage);
                    if (index === -1) return false;
                    let glyph = this.glyphIterator.cur;
                    switch(table.version){
                        case 1:
                            glyph.id = glyph.id + table.deltaGlyphID & 0xffff;
                            break;
                        case 2:
                            glyph.id = table.substitute.get(index);
                            break;
                    }
                    return true;
                }
            case 2:
                {
                    let index = this.coverageIndex(table.coverage);
                    if (index !== -1) {
                        let sequence = table.sequences.get(index);
                        if (sequence.length === 0) {
                            // If the sequence length is zero, delete the glyph.
                            // The OpenType spec disallows this, but seems like Harfbuzz and Uniscribe allow it.
                            this.glyphs.splice(this.glyphIterator.index, 1);
                            return true;
                        }
                        this.glyphIterator.cur.id = sequence[0];
                        this.glyphIterator.cur.ligatureComponent = 0;
                        let features = this.glyphIterator.cur.features;
                        let curGlyph = this.glyphIterator.cur;
                        let replacement = sequence.slice(1).map((gid, i)=>{
                            let glyph = new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(this.font, gid, undefined, features);
                            glyph.shaperInfo = curGlyph.shaperInfo;
                            glyph.isLigated = curGlyph.isLigated;
                            glyph.ligatureComponent = i + 1;
                            glyph.substituted = true;
                            glyph.isMultiplied = true;
                            return glyph;
                        });
                        this.glyphs.splice(this.glyphIterator.index + 1, 0, ...replacement);
                        return true;
                    }
                    return false;
                }
            case 3:
                {
                    let index = this.coverageIndex(table.coverage);
                    if (index !== -1) {
                        let USER_INDEX = 0; // TODO
                        this.glyphIterator.cur.id = table.alternateSet.get(index)[USER_INDEX];
                        return true;
                    }
                    return false;
                }
            case 4:
                {
                    let index = this.coverageIndex(table.coverage);
                    if (index === -1) return false;
                    for (let ligature of table.ligatureSets.get(index)){
                        let matched = this.sequenceMatchIndices(1, ligature.components);
                        if (!matched) continue;
                        let curGlyph = this.glyphIterator.cur;
                        // Concatenate all of the characters the new ligature will represent
                        let characters = curGlyph.codePoints.slice();
                        for (let index of matched)characters.push(...this.glyphs[index].codePoints);
                        // Create the replacement ligature glyph
                        let ligatureGlyph = new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(this.font, ligature.glyph, characters, curGlyph.features);
                        ligatureGlyph.shaperInfo = curGlyph.shaperInfo;
                        ligatureGlyph.isLigated = true;
                        ligatureGlyph.substituted = true;
                        // From Harfbuzz:
                        // - If it *is* a mark ligature, we don't allocate a new ligature id, and leave
                        //   the ligature to keep its old ligature id.  This will allow it to attach to
                        //   a base ligature in GPOS.  Eg. if the sequence is: LAM,LAM,SHADDA,FATHA,HEH,
                        //   and LAM,LAM,HEH for a ligature, they will leave SHADDA and FATHA with a
                        //   ligature id and component value of 2.  Then if SHADDA,FATHA form a ligature
                        //   later, we don't want them to lose their ligature id/component, otherwise
                        //   GPOS will fail to correctly position the mark ligature on top of the
                        //   LAM,LAM,HEH ligature. See https://bugzilla.gnome.org/show_bug.cgi?id=676343
                        //
                        // - If a ligature is formed of components that some of which are also ligatures
                        //   themselves, and those ligature components had marks attached to *their*
                        //   components, we have to attach the marks to the new ligature component
                        //   positions!  Now *that*'s tricky!  And these marks may be following the
                        //   last component of the whole sequence, so we should loop forward looking
                        //   for them and update them.
                        //
                        //   Eg. the sequence is LAM,LAM,SHADDA,FATHA,HEH, and the font first forms a
                        //   'calt' ligature of LAM,HEH, leaving the SHADDA and FATHA with a ligature
                        //   id and component == 1.  Now, during 'liga', the LAM and the LAM-HEH ligature
                        //   form a LAM-LAM-HEH ligature.  We need to reassign the SHADDA and FATHA to
                        //   the new ligature with a component value of 2.
                        //
                        //   This in fact happened to a font...  See https://bugzilla.gnome.org/show_bug.cgi?id=437633
                        let isMarkLigature = curGlyph.isMark;
                        for(let i = 0; i < matched.length && isMarkLigature; i++)isMarkLigature = this.glyphs[matched[i]].isMark;
                        ligatureGlyph.ligatureID = isMarkLigature ? null : this.ligatureID++;
                        let lastLigID = curGlyph.ligatureID;
                        let lastNumComps = curGlyph.codePoints.length;
                        let curComps = lastNumComps;
                        let idx = this.glyphIterator.index + 1;
                        // Set ligatureID and ligatureComponent on glyphs that were skipped in the matched sequence.
                        // This allows GPOS to attach marks to the correct ligature components.
                        for (let matchIndex of matched){
                            // Don't assign new ligature components for mark ligatures (see above)
                            if (isMarkLigature) idx = matchIndex;
                            else while(idx < matchIndex){
                                var ligatureComponent = curComps - lastNumComps + Math.min(this.glyphs[idx].ligatureComponent || 1, lastNumComps);
                                this.glyphs[idx].ligatureID = ligatureGlyph.ligatureID;
                                this.glyphs[idx].ligatureComponent = ligatureComponent;
                                idx++;
                            }
                            lastLigID = this.glyphs[idx].ligatureID;
                            lastNumComps = this.glyphs[idx].codePoints.length;
                            curComps += lastNumComps;
                            idx++; // skip base glyph
                        }
                        // Adjust ligature components for any marks following
                        if (lastLigID && !isMarkLigature) for(let i = idx; i < this.glyphs.length; i++){
                            if (this.glyphs[i].ligatureID === lastLigID) {
                                var ligatureComponent = curComps - lastNumComps + Math.min(this.glyphs[i].ligatureComponent || 1, lastNumComps);
                                this.glyphs[i].ligatureComponent = ligatureComponent;
                            } else break;
                        }
                        // Delete the matched glyphs, and replace the current glyph with the ligature glyph
                        for(let i = matched.length - 1; i >= 0; i--)this.glyphs.splice(matched[i], 1);
                        this.glyphs[this.glyphIterator.index] = ligatureGlyph;
                        return true;
                    }
                    return false;
                }
            case 5:
                return this.applyContext(table);
            case 6:
                return this.applyChainingContext(table);
            case 7:
                return this.applyLookup(table.lookupType, table.extension);
            default:
                throw new Error(`GSUB lookupType ${lookupType} is not supported`);
        }
    }
}



class $c96c93587d49c14d$export$2e2bcd8739ae039 extends (0, $a83b9c36aaa94fd3$export$2e2bcd8739ae039) {
    applyPositionValue(sequenceIndex, value) {
        let position = this.positions[this.glyphIterator.peekIndex(sequenceIndex)];
        if (value.xAdvance != null) position.xAdvance += value.xAdvance;
        if (value.yAdvance != null) position.yAdvance += value.yAdvance;
        if (value.xPlacement != null) position.xOffset += value.xPlacement;
        if (value.yPlacement != null) position.yOffset += value.yPlacement;
        // Adjustments for font variations
        let variationProcessor = this.font._variationProcessor;
        let variationStore = this.font.GDEF && this.font.GDEF.itemVariationStore;
        if (variationProcessor && variationStore) {
            if (value.xPlaDevice) position.xOffset += variationProcessor.getDelta(variationStore, value.xPlaDevice.a, value.xPlaDevice.b);
            if (value.yPlaDevice) position.yOffset += variationProcessor.getDelta(variationStore, value.yPlaDevice.a, value.yPlaDevice.b);
            if (value.xAdvDevice) position.xAdvance += variationProcessor.getDelta(variationStore, value.xAdvDevice.a, value.xAdvDevice.b);
            if (value.yAdvDevice) position.yAdvance += variationProcessor.getDelta(variationStore, value.yAdvDevice.a, value.yAdvDevice.b);
        }
    // TODO: device tables
    }
    applyLookup(lookupType, table) {
        switch(lookupType){
            case 1:
                {
                    let index = this.coverageIndex(table.coverage);
                    if (index === -1) return false;
                    switch(table.version){
                        case 1:
                            this.applyPositionValue(0, table.value);
                            break;
                        case 2:
                            this.applyPositionValue(0, table.values.get(index));
                            break;
                    }
                    return true;
                }
            case 2:
                {
                    let nextGlyph = this.glyphIterator.peek();
                    if (!nextGlyph) return false;
                    let index = this.coverageIndex(table.coverage);
                    if (index === -1) return false;
                    switch(table.version){
                        case 1:
                            let set = table.pairSets.get(index);
                            for (let pair of set)if (pair.secondGlyph === nextGlyph.id) {
                                this.applyPositionValue(0, pair.value1);
                                this.applyPositionValue(1, pair.value2);
                                return true;
                            }
                            return false;
                        case 2:
                            let class1 = this.getClassID(this.glyphIterator.cur.id, table.classDef1);
                            let class2 = this.getClassID(nextGlyph.id, table.classDef2);
                            if (class1 === -1 || class2 === -1) return false;
                            var pair = table.classRecords.get(class1).get(class2);
                            this.applyPositionValue(0, pair.value1);
                            this.applyPositionValue(1, pair.value2);
                            return true;
                    }
                }
            case 3:
                {
                    let nextIndex = this.glyphIterator.peekIndex();
                    let nextGlyph = this.glyphs[nextIndex];
                    if (!nextGlyph) return false;
                    let curRecord = table.entryExitRecords[this.coverageIndex(table.coverage)];
                    if (!curRecord || !curRecord.exitAnchor) return false;
                    let nextRecord = table.entryExitRecords[this.coverageIndex(table.coverage, nextGlyph.id)];
                    if (!nextRecord || !nextRecord.entryAnchor) return false;
                    let entry = this.getAnchor(nextRecord.entryAnchor);
                    let exit = this.getAnchor(curRecord.exitAnchor);
                    let cur = this.positions[this.glyphIterator.index];
                    let next = this.positions[nextIndex];
                    let d;
                    switch(this.direction){
                        case 'ltr':
                            cur.xAdvance = exit.x + cur.xOffset;
                            d = entry.x + next.xOffset;
                            next.xAdvance -= d;
                            next.xOffset -= d;
                            break;
                        case 'rtl':
                            d = exit.x + cur.xOffset;
                            cur.xAdvance -= d;
                            cur.xOffset -= d;
                            next.xAdvance = entry.x + next.xOffset;
                            break;
                    }
                    if (this.glyphIterator.flags.rightToLeft) {
                        this.glyphIterator.cur.cursiveAttachment = nextIndex;
                        cur.yOffset = entry.y - exit.y;
                    } else {
                        nextGlyph.cursiveAttachment = this.glyphIterator.index;
                        cur.yOffset = exit.y - entry.y;
                    }
                    return true;
                }
            case 4:
                {
                    let markIndex = this.coverageIndex(table.markCoverage);
                    if (markIndex === -1) return false;
                    // search backward for a base glyph
                    let baseGlyphIndex = this.glyphIterator.index;
                    while(--baseGlyphIndex >= 0 && (this.glyphs[baseGlyphIndex].isMark || this.glyphs[baseGlyphIndex].ligatureComponent > 0));
                    if (baseGlyphIndex < 0) return false;
                    let baseIndex = this.coverageIndex(table.baseCoverage, this.glyphs[baseGlyphIndex].id);
                    if (baseIndex === -1) return false;
                    let markRecord = table.markArray[markIndex];
                    let baseAnchor = table.baseArray[baseIndex][markRecord.class];
                    this.applyAnchor(markRecord, baseAnchor, baseGlyphIndex);
                    return true;
                }
            case 5:
                {
                    let markIndex = this.coverageIndex(table.markCoverage);
                    if (markIndex === -1) return false;
                    // search backward for a base glyph
                    let baseGlyphIndex = this.glyphIterator.index;
                    while(--baseGlyphIndex >= 0 && this.glyphs[baseGlyphIndex].isMark);
                    if (baseGlyphIndex < 0) return false;
                    let ligIndex = this.coverageIndex(table.ligatureCoverage, this.glyphs[baseGlyphIndex].id);
                    if (ligIndex === -1) return false;
                    let ligAttach = table.ligatureArray[ligIndex];
                    let markGlyph = this.glyphIterator.cur;
                    let ligGlyph = this.glyphs[baseGlyphIndex];
                    let compIndex = ligGlyph.ligatureID && ligGlyph.ligatureID === markGlyph.ligatureID && markGlyph.ligatureComponent > 0 ? Math.min(markGlyph.ligatureComponent, ligGlyph.codePoints.length) - 1 : ligGlyph.codePoints.length - 1;
                    let markRecord = table.markArray[markIndex];
                    let baseAnchor = ligAttach[compIndex][markRecord.class];
                    this.applyAnchor(markRecord, baseAnchor, baseGlyphIndex);
                    return true;
                }
            case 6:
                {
                    let mark1Index = this.coverageIndex(table.mark1Coverage);
                    if (mark1Index === -1) return false;
                    // get the previous mark to attach to
                    let prevIndex = this.glyphIterator.peekIndex(-1);
                    let prev = this.glyphs[prevIndex];
                    if (!prev || !prev.isMark) return false;
                    let cur = this.glyphIterator.cur;
                    // The following logic was borrowed from Harfbuzz
                    let good = false;
                    if (cur.ligatureID === prev.ligatureID) {
                        if (!cur.ligatureID) good = true;
                        else if (cur.ligatureComponent === prev.ligatureComponent) good = true;
                    } else // If ligature ids don't match, it may be the case that one of the marks
                    // itself is a ligature, in which case match.
                    if (cur.ligatureID && !cur.ligatureComponent || prev.ligatureID && !prev.ligatureComponent) good = true;
                    if (!good) return false;
                    let mark2Index = this.coverageIndex(table.mark2Coverage, prev.id);
                    if (mark2Index === -1) return false;
                    let markRecord = table.mark1Array[mark1Index];
                    let baseAnchor = table.mark2Array[mark2Index][markRecord.class];
                    this.applyAnchor(markRecord, baseAnchor, prevIndex);
                    return true;
                }
            case 7:
                return this.applyContext(table);
            case 8:
                return this.applyChainingContext(table);
            case 9:
                return this.applyLookup(table.lookupType, table.extension);
            default:
                throw new Error(`Unsupported GPOS table: ${lookupType}`);
        }
    }
    applyAnchor(markRecord, baseAnchor, baseGlyphIndex) {
        let baseCoords = this.getAnchor(baseAnchor);
        let markCoords = this.getAnchor(markRecord.markAnchor);
        let basePos = this.positions[baseGlyphIndex];
        let markPos = this.positions[this.glyphIterator.index];
        markPos.xOffset = baseCoords.x - markCoords.x;
        markPos.yOffset = baseCoords.y - markCoords.y;
        this.glyphIterator.cur.markAttachment = baseGlyphIndex;
    }
    getAnchor(anchor) {
        // TODO: contour point, device tables
        let x = anchor.xCoordinate;
        let y = anchor.yCoordinate;
        // Adjustments for font variations
        let variationProcessor = this.font._variationProcessor;
        let variationStore = this.font.GDEF && this.font.GDEF.itemVariationStore;
        if (variationProcessor && variationStore) {
            if (anchor.xDeviceTable) x += variationProcessor.getDelta(variationStore, anchor.xDeviceTable.a, anchor.xDeviceTable.b);
            if (anchor.yDeviceTable) y += variationProcessor.getDelta(variationStore, anchor.yDeviceTable.a, anchor.yDeviceTable.b);
        }
        return {
            x: x,
            y: y
        };
    }
    applyFeatures(userFeatures, glyphs, advances) {
        super.applyFeatures(userFeatures, glyphs, advances);
        for(var i = 0; i < this.glyphs.length; i++)this.fixCursiveAttachment(i);
        this.fixMarkAttachment();
    }
    fixCursiveAttachment(i) {
        let glyph = this.glyphs[i];
        if (glyph.cursiveAttachment != null) {
            let j = glyph.cursiveAttachment;
            glyph.cursiveAttachment = null;
            this.fixCursiveAttachment(j);
            this.positions[i].yOffset += this.positions[j].yOffset;
        }
    }
    fixMarkAttachment() {
        for(let i = 0; i < this.glyphs.length; i++){
            let glyph = this.glyphs[i];
            if (glyph.markAttachment != null) {
                let j = glyph.markAttachment;
                this.positions[i].xOffset += this.positions[j].xOffset;
                this.positions[i].yOffset += this.positions[j].yOffset;
                if (this.direction === 'ltr') for(let k = j; k < i; k++){
                    this.positions[i].xOffset -= this.positions[k].xAdvance;
                    this.positions[i].yOffset -= this.positions[k].yAdvance;
                }
                else for(let k = j + 1; k < i + 1; k++){
                    this.positions[i].xOffset += this.positions[k].xAdvance;
                    this.positions[i].yOffset += this.positions[k].yAdvance;
                }
            }
        }
    }
}


class $a62492810de27e3d$export$2e2bcd8739ae039 {
    setup(glyphRun) {
        // Map glyphs to GlyphInfo objects so data can be passed between
        // GSUB and GPOS without mutating the real (shared) Glyph objects.
        this.glyphInfos = glyphRun.glyphs.map((glyph)=>new (0, $10e7b257e1a9a756$export$2e2bcd8739ae039)(this.font, glyph.id, [
                ...glyph.codePoints
            ]));
        // Select a script based on what is available in GSUB/GPOS.
        let script = null;
        if (this.GPOSProcessor) script = this.GPOSProcessor.selectScript(glyphRun.script, glyphRun.language, glyphRun.direction);
        if (this.GSUBProcessor) script = this.GSUBProcessor.selectScript(glyphRun.script, glyphRun.language, glyphRun.direction);
        // Choose a shaper based on the script, and setup a shaping plan.
        // This determines which features to apply to which glyphs.
        this.shaper = $102b6fe50f1d50b4$export$7877a478dd30fd3d(script);
        this.plan = new (0, $94d7a73bd2edfc9a$export$2e2bcd8739ae039)(this.font, script, glyphRun.direction);
        this.shaper.plan(this.plan, this.glyphInfos, glyphRun.features);
        // Assign chosen features to output glyph run
        for(let key in this.plan.allFeatures)glyphRun.features[key] = true;
    }
    substitute(glyphRun) {
        if (this.GSUBProcessor) {
            this.plan.process(this.GSUBProcessor, this.glyphInfos);
            // Map glyph infos back to normal Glyph objects
            glyphRun.glyphs = this.glyphInfos.map((glyphInfo)=>this.font.getGlyph(glyphInfo.id, glyphInfo.codePoints));
        }
    }
    position(glyphRun) {
        if (this.shaper.zeroMarkWidths === 'BEFORE_GPOS') this.zeroMarkAdvances(glyphRun.positions);
        if (this.GPOSProcessor) this.plan.process(this.GPOSProcessor, this.glyphInfos, glyphRun.positions);
        if (this.shaper.zeroMarkWidths === 'AFTER_GPOS') this.zeroMarkAdvances(glyphRun.positions);
        // Reverse the glyphs and positions if the script is right-to-left
        if (glyphRun.direction === 'rtl') {
            glyphRun.glyphs.reverse();
            glyphRun.positions.reverse();
        }
        return this.GPOSProcessor && this.GPOSProcessor.features;
    }
    zeroMarkAdvances(positions) {
        for(let i = 0; i < this.glyphInfos.length; i++)if (this.glyphInfos[i].isMark) {
            positions[i].xAdvance = 0;
            positions[i].yAdvance = 0;
        }
    }
    cleanup() {
        this.glyphInfos = null;
        this.plan = null;
        this.shaper = null;
    }
    getAvailableFeatures(script, language) {
        let features = [];
        if (this.GSUBProcessor) {
            this.GSUBProcessor.selectScript(script, language);
            features.push(...Object.keys(this.GSUBProcessor.features));
        }
        if (this.GPOSProcessor) {
            this.GPOSProcessor.selectScript(script, language);
            features.push(...Object.keys(this.GPOSProcessor.features));
        }
        return features;
    }
    constructor(font){
        this.font = font;
        this.glyphInfos = null;
        this.plan = null;
        this.GSUBProcessor = null;
        this.GPOSProcessor = null;
        this.fallbackPosition = true;
        if (font.GSUB) this.GSUBProcessor = new (0, $0a876c45f1f7c41c$export$2e2bcd8739ae039)(font, font.GSUB);
        if (font.GPOS) this.GPOSProcessor = new (0, $c96c93587d49c14d$export$2e2bcd8739ae039)(font, font.GPOS);
    }
}


class $4c0a7fa5df7a9ab1$export$2e2bcd8739ae039 {
    layout(string, features, script, language, direction) {
        // Make the features parameter optional
        if (typeof features === 'string') {
            direction = language;
            language = script;
            script = features;
            features = [];
        }
        // Map string to glyphs if needed
        if (typeof string === 'string') {
            // Attempt to detect the script from the string if not provided.
            if (script == null) script = $130d1a642ebcd2b7$export$e5cb25e204fb8450(string);
            var glyphs = this.font.glyphsForString(string);
        } else {
            // Attempt to detect the script from the glyph code points if not provided.
            if (script == null) {
                let codePoints = [];
                for (let glyph of string)codePoints.push(...glyph.codePoints);
                script = $130d1a642ebcd2b7$export$16fab0757cfc223d(codePoints);
            }
            var glyphs = string;
        }
        let glyphRun = new (0, $be07b3e97a42687a$export$2e2bcd8739ae039)(glyphs, features, script, language, direction);
        // Return early if there are no glyphs
        if (glyphs.length === 0) {
            glyphRun.positions = [];
            return glyphRun;
        }
        // Setup the advanced layout engine
        if (this.engine && this.engine.setup) this.engine.setup(glyphRun);
        // Substitute and position the glyphs
        this.substitute(glyphRun);
        this.position(glyphRun);
        this.hideDefaultIgnorables(glyphRun.glyphs, glyphRun.positions);
        // Let the layout engine clean up any state it might have
        if (this.engine && this.engine.cleanup) this.engine.cleanup();
        return glyphRun;
    }
    substitute(glyphRun) {
        // Call the advanced layout engine to make substitutions
        if (this.engine && this.engine.substitute) this.engine.substitute(glyphRun);
    }
    position(glyphRun) {
        // Get initial glyph positions
        glyphRun.positions = glyphRun.glyphs.map((glyph)=>new (0, $1ac75d9a55b67f01$export$2e2bcd8739ae039)(glyph.advanceWidth));
        let positioned = null;
        // Call the advanced layout engine. Returns the features applied.
        if (this.engine && this.engine.position) positioned = this.engine.position(glyphRun);
        // if there is no GPOS table, use unicode properties to position marks.
        if (!positioned && (!this.engine || this.engine.fallbackPosition)) {
            if (!this.unicodeLayoutEngine) this.unicodeLayoutEngine = new (0, $0a4bdfeb6dfd6f5e$export$2e2bcd8739ae039)(this.font);
            this.unicodeLayoutEngine.positionGlyphs(glyphRun.glyphs, glyphRun.positions);
        }
        // if kerning is not supported by GPOS, do kerning with the TrueType/AAT kern table
        if ((!positioned || !positioned.kern) && glyphRun.features.kern !== false && this.font.kern) {
            if (!this.kernProcessor) this.kernProcessor = new (0, $0bba3a9db57637f3$export$2e2bcd8739ae039)(this.font);
            this.kernProcessor.process(glyphRun.glyphs, glyphRun.positions);
            glyphRun.features.kern = true;
        }
    }
    hideDefaultIgnorables(glyphs, positions) {
        let space = this.font.glyphForCodePoint(0x20);
        for(let i = 0; i < glyphs.length; i++)if (this.isDefaultIgnorable(glyphs[i].codePoints[0])) {
            glyphs[i] = space;
            positions[i].xAdvance = 0;
            positions[i].yAdvance = 0;
        }
    }
    isDefaultIgnorable(ch) {
        // From DerivedCoreProperties.txt in the Unicode database,
        // minus U+115F, U+1160, U+3164 and U+FFA0, which is what
        // Harfbuzz and Uniscribe do.
        let plane = ch >> 16;
        if (plane === 0) // BMP
        switch(ch >> 8){
            case 0x00:
                return ch === 0x00AD;
            case 0x03:
                return ch === 0x034F;
            case 0x06:
                return ch === 0x061C;
            case 0x17:
                return 0x17B4 <= ch && ch <= 0x17B5;
            case 0x18:
                return 0x180B <= ch && ch <= 0x180E;
            case 0x20:
                return 0x200B <= ch && ch <= 0x200F || 0x202A <= ch && ch <= 0x202E || 0x2060 <= ch && ch <= 0x206F;
            case 0xFE:
                return 0xFE00 <= ch && ch <= 0xFE0F || ch === 0xFEFF;
            case 0xFF:
                return 0xFFF0 <= ch && ch <= 0xFFF8;
            default:
                return false;
        }
        else // Other planes
        switch(plane){
            case 0x01:
                return 0x1BCA0 <= ch && ch <= 0x1BCA3 || 0x1D173 <= ch && ch <= 0x1D17A;
            case 0x0E:
                return 0xE0000 <= ch && ch <= 0xE0FFF;
            default:
                return false;
        }
    }
    getAvailableFeatures(script, language) {
        let features = [];
        if (this.engine) features.push(...this.engine.getAvailableFeatures(script, language));
        if (this.font.kern && features.indexOf('kern') === -1) features.push('kern');
        return features;
    }
    stringsForGlyph(gid) {
        let result = new Set;
        let codePoints = this.font._cmapProcessor.codePointsForGlyph(gid);
        for (let codePoint of codePoints)result.add(String.fromCodePoint(codePoint));
        if (this.engine && this.engine.stringsForGlyph) for (let string of this.engine.stringsForGlyph(gid))result.add(string);
        return Array.from(result);
    }
    constructor(font){
        this.font = font;
        this.unicodeLayoutEngine = null;
        this.kernProcessor = null;
        // Choose an advanced layout engine. We try the AAT morx table first since more
        // scripts are currently supported because the shaping logic is built into the font.
        if (this.font.morx) this.engine = new (0, $ba6dd74203be8728$export$2e2bcd8739ae039)(this.font);
        else if (this.font.GSUB || this.font.GPOS) this.engine = new (0, $a62492810de27e3d$export$2e2bcd8739ae039)(this.font);
    }
}






const $f43aec954cdfdf21$var$SVG_COMMANDS = {
    moveTo: 'M',
    lineTo: 'L',
    quadraticCurveTo: 'Q',
    bezierCurveTo: 'C',
    closePath: 'Z'
};
class $f43aec954cdfdf21$export$2e2bcd8739ae039 {
    /**
   * Compiles the path to a JavaScript function that can be applied with
   * a graphics context in order to render the path.
   * @return {string}
   */ toFunction() {
        return (ctx)=>{
            this.commands.forEach((c)=>{
                return ctx[c.command].apply(ctx, c.args);
            });
        };
    }
    /**
   * Converts the path to an SVG path data string
   * @return {string}
   */ toSVG() {
        let cmds = this.commands.map((c)=>{
            let args = c.args.map((arg)=>Math.round(arg * 100) / 100);
            return `${$f43aec954cdfdf21$var$SVG_COMMANDS[c.command]}${args.join(' ')}`;
        });
        return cmds.join('');
    }
    /**
   * Gets the "control box" of a path.
   * This is like the bounding box, but it includes all points including
   * control points of bezier segments and is much faster to compute than
   * the real bounding box.
   * @type {BBox}
   */ get cbox() {
        if (!this._cbox) {
            let cbox = new (0, $f34600ab9d7f70d8$export$2e2bcd8739ae039);
            for (let command of this.commands)for(let i = 0; i < command.args.length; i += 2)cbox.addPoint(command.args[i], command.args[i + 1]);
            this._cbox = Object.freeze(cbox);
        }
        return this._cbox;
    }
    /**
   * Gets the exact bounding box of the path by evaluating curve segments.
   * Slower to compute than the control box, but more accurate.
   * @type {BBox}
   */ get bbox() {
        if (this._bbox) return this._bbox;
        let bbox = new (0, $f34600ab9d7f70d8$export$2e2bcd8739ae039);
        let cx = 0, cy = 0;
        let f = (t)=>Math.pow(1 - t, 3) * p0[i] + 3 * Math.pow(1 - t, 2) * t * p1[i] + 3 * (1 - t) * Math.pow(t, 2) * p2[i] + Math.pow(t, 3) * p3[i];
        for (let c of this.commands)switch(c.command){
            case 'moveTo':
            case 'lineTo':
                let [x, y] = c.args;
                bbox.addPoint(x, y);
                cx = x;
                cy = y;
                break;
            case 'quadraticCurveTo':
            case 'bezierCurveTo':
                if (c.command === 'quadraticCurveTo') {
                    // http://fontforge.org/bezier.html
                    var [qp1x, qp1y, p3x, p3y] = c.args;
                    var cp1x = cx + 2 / 3 * (qp1x - cx); // CP1 = QP0 + 2/3 * (QP1-QP0)
                    var cp1y = cy + 2 / 3 * (qp1y - cy);
                    var cp2x = p3x + 2 / 3 * (qp1x - p3x); // CP2 = QP2 + 2/3 * (QP1-QP2)
                    var cp2y = p3y + 2 / 3 * (qp1y - p3y);
                } else var [cp1x, cp1y, cp2x, cp2y, p3x, p3y] = c.args;
                // http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
                bbox.addPoint(p3x, p3y);
                var p0 = [
                    cx,
                    cy
                ];
                var p1 = [
                    cp1x,
                    cp1y
                ];
                var p2 = [
                    cp2x,
                    cp2y
                ];
                var p3 = [
                    p3x,
                    p3y
                ];
                for(var i = 0; i <= 1; i++){
                    let b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
                    let a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
                    c = 3 * p1[i] - 3 * p0[i];
                    if (a === 0) {
                        if (b === 0) continue;
                        let t = -c / b;
                        if (0 < t && t < 1) {
                            if (i === 0) bbox.addPoint(f(t), bbox.maxY);
                            else if (i === 1) bbox.addPoint(bbox.maxX, f(t));
                        }
                        continue;
                    }
                    let b2ac = Math.pow(b, 2) - 4 * c * a;
                    if (b2ac < 0) continue;
                    let t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
                    if (0 < t1 && t1 < 1) {
                        if (i === 0) bbox.addPoint(f(t1), bbox.maxY);
                        else if (i === 1) bbox.addPoint(bbox.maxX, f(t1));
                    }
                    let t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
                    if (0 < t2 && t2 < 1) {
                        if (i === 0) bbox.addPoint(f(t2), bbox.maxY);
                        else if (i === 1) bbox.addPoint(bbox.maxX, f(t2));
                    }
                }
                cx = p3x;
                cy = p3y;
                break;
        }
        return this._bbox = Object.freeze(bbox);
    }
    /**
   * Applies a mapping function to each point in the path.
   * @param {function} fn
   * @return {Path}
   */ mapPoints(fn) {
        let path = new $f43aec954cdfdf21$export$2e2bcd8739ae039;
        for (let c of this.commands){
            let args = [];
            for(let i = 0; i < c.args.length; i += 2){
                let [x, y] = fn(c.args[i], c.args[i + 1]);
                args.push(x, y);
            }
            path[c.command](...args);
        }
        return path;
    }
    /**
   * Transforms the path by the given matrix.
   */ transform(m0, m1, m2, m3, m4, m5) {
        return this.mapPoints((x, y)=>{
            const tx = m0 * x + m2 * y + m4;
            const ty = m1 * x + m3 * y + m5;
            return [
                tx,
                ty
            ];
        });
    }
    /**
   * Translates the path by the given offset.
   */ translate(x, y) {
        return this.transform(1, 0, 0, 1, x, y);
    }
    /**
   * Rotates the path by the given angle (in radians).
   */ rotate(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return this.transform(cos, sin, -sin, cos, 0, 0);
    }
    /**
   * Scales the path.
   */ scale(scaleX, scaleY = scaleX) {
        return this.transform(scaleX, 0, 0, scaleY, 0, 0);
    }
    constructor(){
        this.commands = [];
        this._bbox = null;
        this._cbox = null;
    }
}
for (let command of [
    'moveTo',
    'lineTo',
    'quadraticCurveTo',
    'bezierCurveTo',
    'closePath'
])$f43aec954cdfdf21$export$2e2bcd8739ae039.prototype[command] = function(...args) {
    this._bbox = this._cbox = null;
    this.commands.push({
        command: command,
        args: args
    });
    return this;
};



var $7713b9b7b438dff8$export$2e2bcd8739ae039 = [
    '.notdef',
    '.null',
    'nonmarkingreturn',
    'space',
    'exclam',
    'quotedbl',
    'numbersign',
    'dollar',
    'percent',
    'ampersand',
    'quotesingle',
    'parenleft',
    'parenright',
    'asterisk',
    'plus',
    'comma',
    'hyphen',
    'period',
    'slash',
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'colon',
    'semicolon',
    'less',
    'equal',
    'greater',
    'question',
    'at',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'bracketleft',
    'backslash',
    'bracketright',
    'asciicircum',
    'underscore',
    'grave',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'braceleft',
    'bar',
    'braceright',
    'asciitilde',
    'Adieresis',
    'Aring',
    'Ccedilla',
    'Eacute',
    'Ntilde',
    'Odieresis',
    'Udieresis',
    'aacute',
    'agrave',
    'acircumflex',
    'adieresis',
    'atilde',
    'aring',
    'ccedilla',
    'eacute',
    'egrave',
    'ecircumflex',
    'edieresis',
    'iacute',
    'igrave',
    'icircumflex',
    'idieresis',
    'ntilde',
    'oacute',
    'ograve',
    'ocircumflex',
    'odieresis',
    'otilde',
    'uacute',
    'ugrave',
    'ucircumflex',
    'udieresis',
    'dagger',
    'degree',
    'cent',
    'sterling',
    'section',
    'bullet',
    'paragraph',
    'germandbls',
    'registered',
    'copyright',
    'trademark',
    'acute',
    'dieresis',
    'notequal',
    'AE',
    'Oslash',
    'infinity',
    'plusminus',
    'lessequal',
    'greaterequal',
    'yen',
    'mu',
    'partialdiff',
    'summation',
    'product',
    'pi',
    'integral',
    'ordfeminine',
    'ordmasculine',
    'Omega',
    'ae',
    'oslash',
    'questiondown',
    'exclamdown',
    'logicalnot',
    'radical',
    'florin',
    'approxequal',
    'Delta',
    'guillemotleft',
    'guillemotright',
    'ellipsis',
    'nonbreakingspace',
    'Agrave',
    'Atilde',
    'Otilde',
    'OE',
    'oe',
    'endash',
    'emdash',
    'quotedblleft',
    'quotedblright',
    'quoteleft',
    'quoteright',
    'divide',
    'lozenge',
    'ydieresis',
    'Ydieresis',
    'fraction',
    'currency',
    'guilsinglleft',
    'guilsinglright',
    'fi',
    'fl',
    'daggerdbl',
    'periodcentered',
    'quotesinglbase',
    'quotedblbase',
    'perthousand',
    'Acircumflex',
    'Ecircumflex',
    'Aacute',
    'Edieresis',
    'Egrave',
    'Iacute',
    'Icircumflex',
    'Idieresis',
    'Igrave',
    'Oacute',
    'Ocircumflex',
    'apple',
    'Ograve',
    'Uacute',
    'Ucircumflex',
    'Ugrave',
    'dotlessi',
    'circumflex',
    'tilde',
    'macron',
    'breve',
    'dotaccent',
    'ring',
    'cedilla',
    'hungarumlaut',
    'ogonek',
    'caron',
    'Lslash',
    'lslash',
    'Scaron',
    'scaron',
    'Zcaron',
    'zcaron',
    'brokenbar',
    'Eth',
    'eth',
    'Yacute',
    'yacute',
    'Thorn',
    'thorn',
    'minus',
    'multiply',
    'onesuperior',
    'twosuperior',
    'threesuperior',
    'onehalf',
    'onequarter',
    'threequarters',
    'franc',
    'Gbreve',
    'gbreve',
    'Idotaccent',
    'Scedilla',
    'scedilla',
    'Cacute',
    'cacute',
    'Ccaron',
    'ccaron',
    'dcroat'
];


class $f92906be28e61769$export$2e2bcd8739ae039 {
    _getPath() {
        return new (0, $f43aec954cdfdf21$export$2e2bcd8739ae039)();
    }
    _getCBox() {
        return this.path.cbox;
    }
    _getBBox() {
        return this.path.bbox;
    }
    _getTableMetrics(table) {
        if (this.id < table.metrics.length) return table.metrics.get(this.id);
        let metric = table.metrics.get(table.metrics.length - 1);
        let res = {
            advance: metric ? metric.advance : 0,
            bearing: table.bearings.get(this.id - table.metrics.length) || 0
        };
        return res;
    }
    _getMetrics(cbox) {
        if (this._metrics) return this._metrics;
        let { advance: advanceWidth, bearing: leftBearing } = this._getTableMetrics(this._font.hmtx);
        // For vertical metrics, use vmtx if available, or fall back to global data from OS/2 or hhea
        if (this._font.vmtx) var { advance: advanceHeight, bearing: topBearing } = this._getTableMetrics(this._font.vmtx);
        else {
            let os2;
            if (typeof cbox === 'undefined' || cbox === null) ({ cbox: cbox } = this);
            if ((os2 = this._font['OS/2']) && os2.version > 0) {
                var advanceHeight = Math.abs(os2.typoAscender - os2.typoDescender);
                var topBearing = os2.typoAscender - cbox.maxY;
            } else {
                let { hhea: hhea } = this._font;
                var advanceHeight = Math.abs(hhea.ascent - hhea.descent);
                var topBearing = hhea.ascent - cbox.maxY;
            }
        }
        if (this._font._variationProcessor && this._font.HVAR) advanceWidth += this._font._variationProcessor.getAdvanceAdjustment(this.id, this._font.HVAR);
        return this._metrics = {
            advanceWidth: advanceWidth,
            advanceHeight: advanceHeight,
            leftBearing: leftBearing,
            topBearing: topBearing
        };
    }
    /**
   * The glyph’s control box.
   * This is often the same as the bounding box, but is faster to compute.
   * Because of the way bezier curves are defined, some of the control points
   * can be outside of the bounding box. Where `bbox` takes this into account,
   * `cbox` does not. Thus, cbox is less accurate, but faster to compute.
   * See [here](http://www.freetype.org/freetype2/docs/glyphs/glyphs-6.html#section-2)
   * for a more detailed description.
   *
   * @type {BBox}
   */ get cbox() {
        return this._getCBox();
    }
    /**
   * The glyph’s bounding box, i.e. the rectangle that encloses the
   * glyph outline as tightly as possible.
   * @type {BBox}
   */ get bbox() {
        return this._getBBox();
    }
    /**
   * A vector Path object representing the glyph outline.
   * @type {Path}
   */ get path() {
        // Cache the path so we only decode it once
        // Decoding is actually performed by subclasses
        return this._getPath();
    }
    /**
   * Returns a path scaled to the given font size.
   * @param {number} size
   * @return {Path}
   */ getScaledPath(size) {
        let scale = 1 / this._font.unitsPerEm * size;
        return this.path.scale(scale);
    }
    /**
   * The glyph's advance width.
   * @type {number}
   */ get advanceWidth() {
        return this._getMetrics().advanceWidth;
    }
    /**
   * The glyph's advance height.
   * @type {number}
   */ get advanceHeight() {
        return this._getMetrics().advanceHeight;
    }
    get ligatureCaretPositions() {}
    _getName() {
        let { post: post } = this._font;
        if (!post) return null;
        switch(post.version){
            case 1:
                return (0, $7713b9b7b438dff8$export$2e2bcd8739ae039)[this.id];
            case 2:
                let id = post.glyphNameIndex[this.id];
                if (id < (0, $7713b9b7b438dff8$export$2e2bcd8739ae039).length) return (0, $7713b9b7b438dff8$export$2e2bcd8739ae039)[id];
                return post.names[id - (0, $7713b9b7b438dff8$export$2e2bcd8739ae039).length];
            case 2.5:
                return (0, $7713b9b7b438dff8$export$2e2bcd8739ae039)[this.id + post.offsets[this.id]];
            case 4:
                return String.fromCharCode(post.map[this.id]);
        }
    }
    /**
   * The glyph's name
   * @type {string}
   */ get name() {
        return this._getName();
    }
    /**
   * Renders the glyph to the given graphics context, at the specified font size.
   * @param {CanvasRenderingContext2d} ctx
   * @param {number} size
   */ render(ctx, size) {
        ctx.save();
        let scale = 1 / this._font.head.unitsPerEm * size;
        ctx.scale(scale, scale);
        let fn = this.path.toFunction();
        fn(ctx);
        ctx.fill();
        ctx.restore();
    }
    constructor(id, codePoints, font){
        /**
     * The glyph id in the font
     * @type {number}
     */ this.id = id;
        /**
     * An array of unicode code points that are represented by this glyph.
     * There can be multiple code points in the case of ligatures and other glyphs
     * that represent multiple visual characters.
     * @type {number[]}
     */ this.codePoints = codePoints;
        this._font = font;
        // TODO: get this info from GDEF if available
        this.isMark = this.codePoints.length > 0 && this.codePoints.every((0, $6uUbQ$isMark));
        this.isLigature = this.codePoints.length > 1;
    }
}
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f92906be28e61769$export$2e2bcd8739ae039.prototype, "cbox", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f92906be28e61769$export$2e2bcd8739ae039.prototype, "bbox", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f92906be28e61769$export$2e2bcd8739ae039.prototype, "path", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f92906be28e61769$export$2e2bcd8739ae039.prototype, "advanceWidth", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f92906be28e61769$export$2e2bcd8739ae039.prototype, "advanceHeight", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $f92906be28e61769$export$2e2bcd8739ae039.prototype, "name", null);





// The header for both simple and composite glyphs
let $69aac16029968692$var$GlyfHeader = new $6uUbQ$Struct({
    numberOfContours: $6uUbQ$int16,
    xMin: $6uUbQ$int16,
    yMin: $6uUbQ$int16,
    xMax: $6uUbQ$int16,
    yMax: $6uUbQ$int16
});
// Flags for simple glyphs
const $69aac16029968692$var$ON_CURVE = 1;
const $69aac16029968692$var$X_SHORT_VECTOR = 2;
const $69aac16029968692$var$Y_SHORT_VECTOR = 4;
const $69aac16029968692$var$REPEAT = 8;
const $69aac16029968692$var$SAME_X = 16;
const $69aac16029968692$var$SAME_Y = 32;
// Flags for composite glyphs
const $69aac16029968692$var$ARG_1_AND_2_ARE_WORDS = 1;
const $69aac16029968692$var$ARGS_ARE_XY_VALUES = 2;
const $69aac16029968692$var$ROUND_XY_TO_GRID = 4;
const $69aac16029968692$var$WE_HAVE_A_SCALE = 8;
const $69aac16029968692$var$MORE_COMPONENTS = 32;
const $69aac16029968692$var$WE_HAVE_AN_X_AND_Y_SCALE = 64;
const $69aac16029968692$var$WE_HAVE_A_TWO_BY_TWO = 128;
const $69aac16029968692$var$WE_HAVE_INSTRUCTIONS = 256;
const $69aac16029968692$var$USE_MY_METRICS = 512;
const $69aac16029968692$var$OVERLAP_COMPOUND = 1024;
const $69aac16029968692$var$SCALED_COMPONENT_OFFSET = 2048;
const $69aac16029968692$var$UNSCALED_COMPONENT_OFFSET = 4096;
class $69aac16029968692$export$baf26146a414f24a {
    copy() {
        return new $69aac16029968692$export$baf26146a414f24a(this.onCurve, this.endContour, this.x, this.y);
    }
    constructor(onCurve, endContour, x = 0, y = 0){
        this.onCurve = onCurve;
        this.endContour = endContour;
        this.x = x;
        this.y = y;
    }
}
// Represents a component in a composite glyph
class $69aac16029968692$var$Component {
    constructor(glyphID, dx, dy){
        this.glyphID = glyphID;
        this.dx = dx;
        this.dy = dy;
        this.pos = 0;
        this.scaleX = this.scaleY = 1;
        this.scale01 = this.scale10 = 0;
    }
}
class $69aac16029968692$export$2e2bcd8739ae039 extends (0, $f92906be28e61769$export$2e2bcd8739ae039) {
    // Parses just the glyph header and returns the bounding box
    _getCBox(internal) {
        // We need to decode the glyph if variation processing is requested,
        // so it's easier just to recompute the path's cbox after decoding.
        if (this._font._variationProcessor && !internal) return this.path.cbox;
        let stream = this._font._getTableStream('glyf');
        stream.pos += this._font.loca.offsets[this.id];
        let glyph = $69aac16029968692$var$GlyfHeader.decode(stream);
        let cbox = new (0, $f34600ab9d7f70d8$export$2e2bcd8739ae039)(glyph.xMin, glyph.yMin, glyph.xMax, glyph.yMax);
        return Object.freeze(cbox);
    }
    // Parses a single glyph coordinate
    _parseGlyphCoord(stream, prev, short, same) {
        if (short) {
            var val = stream.readUInt8();
            if (!same) val = -val;
            val += prev;
        } else if (same) var val = prev;
        else var val = prev + stream.readInt16BE();
        return val;
    }
    // Decodes the glyph data into points for simple glyphs,
    // or components for composite glyphs
    _decode() {
        let glyfPos = this._font.loca.offsets[this.id];
        let nextPos = this._font.loca.offsets[this.id + 1];
        // Nothing to do if there is no data for this glyph
        if (glyfPos === nextPos) return null;
        let stream = this._font._getTableStream('glyf');
        stream.pos += glyfPos;
        let startPos = stream.pos;
        let glyph = $69aac16029968692$var$GlyfHeader.decode(stream);
        if (glyph.numberOfContours > 0) this._decodeSimple(glyph, stream);
        else if (glyph.numberOfContours < 0) this._decodeComposite(glyph, stream, startPos);
        return glyph;
    }
    _decodeSimple(glyph, stream) {
        // this is a simple glyph
        glyph.points = [];
        let endPtsOfContours = new $6uUbQ$Array($6uUbQ$uint16, glyph.numberOfContours).decode(stream);
        glyph.instructions = new $6uUbQ$Array($6uUbQ$uint8, $6uUbQ$uint16).decode(stream);
        let flags = [];
        let numCoords = endPtsOfContours[endPtsOfContours.length - 1] + 1;
        while(flags.length < numCoords){
            var flag = stream.readUInt8();
            flags.push(flag);
            // check for repeat flag
            if (flag & $69aac16029968692$var$REPEAT) {
                let count = stream.readUInt8();
                for(let j = 0; j < count; j++)flags.push(flag);
            }
        }
        for(var i = 0; i < flags.length; i++){
            var flag = flags[i];
            let point = new $69aac16029968692$export$baf26146a414f24a(!!(flag & $69aac16029968692$var$ON_CURVE), endPtsOfContours.indexOf(i) >= 0, 0, 0);
            glyph.points.push(point);
        }
        let px = 0;
        for(var i = 0; i < flags.length; i++){
            var flag = flags[i];
            glyph.points[i].x = px = this._parseGlyphCoord(stream, px, flag & $69aac16029968692$var$X_SHORT_VECTOR, flag & $69aac16029968692$var$SAME_X);
        }
        let py = 0;
        for(var i = 0; i < flags.length; i++){
            var flag = flags[i];
            glyph.points[i].y = py = this._parseGlyphCoord(stream, py, flag & $69aac16029968692$var$Y_SHORT_VECTOR, flag & $69aac16029968692$var$SAME_Y);
        }
        if (this._font._variationProcessor) {
            let points = glyph.points.slice();
            points.push(...this._getPhantomPoints(glyph));
            this._font._variationProcessor.transformPoints(this.id, points);
            glyph.phantomPoints = points.slice(-4);
        }
        return;
    }
    _decodeComposite(glyph, stream, offset = 0) {
        // this is a composite glyph
        glyph.components = [];
        let haveInstructions = false;
        let flags = $69aac16029968692$var$MORE_COMPONENTS;
        while(flags & $69aac16029968692$var$MORE_COMPONENTS){
            flags = stream.readUInt16BE();
            let gPos = stream.pos - offset;
            let glyphID = stream.readUInt16BE();
            if (!haveInstructions) haveInstructions = (flags & $69aac16029968692$var$WE_HAVE_INSTRUCTIONS) !== 0;
            if (flags & $69aac16029968692$var$ARG_1_AND_2_ARE_WORDS) {
                var dx = stream.readInt16BE();
                var dy = stream.readInt16BE();
            } else {
                var dx = stream.readInt8();
                var dy = stream.readInt8();
            }
            var component = new $69aac16029968692$var$Component(glyphID, dx, dy);
            component.pos = gPos;
            if (flags & $69aac16029968692$var$WE_HAVE_A_SCALE) // fixed number with 14 bits of fraction
            component.scaleX = component.scaleY = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
            else if (flags & $69aac16029968692$var$WE_HAVE_AN_X_AND_Y_SCALE) {
                component.scaleX = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
                component.scaleY = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
            } else if (flags & $69aac16029968692$var$WE_HAVE_A_TWO_BY_TWO) {
                component.scaleX = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
                component.scale01 = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
                component.scale10 = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
                component.scaleY = (stream.readUInt8() << 24 | stream.readUInt8() << 16) / 1073741824;
            }
            glyph.components.push(component);
        }
        if (this._font._variationProcessor) {
            let points = [];
            for(let j = 0; j < glyph.components.length; j++){
                var component = glyph.components[j];
                points.push(new $69aac16029968692$export$baf26146a414f24a(true, true, component.dx, component.dy));
            }
            points.push(...this._getPhantomPoints(glyph));
            this._font._variationProcessor.transformPoints(this.id, points);
            glyph.phantomPoints = points.splice(-4, 4);
            for(let i = 0; i < points.length; i++){
                let point = points[i];
                glyph.components[i].dx = point.x;
                glyph.components[i].dy = point.y;
            }
        }
        return haveInstructions;
    }
    _getPhantomPoints(glyph) {
        let cbox = this._getCBox(true);
        if (this._metrics == null) this._metrics = (0, $f92906be28e61769$export$2e2bcd8739ae039).prototype._getMetrics.call(this, cbox);
        let { advanceWidth: advanceWidth, advanceHeight: advanceHeight, leftBearing: leftBearing, topBearing: topBearing } = this._metrics;
        return [
            new $69aac16029968692$export$baf26146a414f24a(false, true, glyph.xMin - leftBearing, 0),
            new $69aac16029968692$export$baf26146a414f24a(false, true, glyph.xMin - leftBearing + advanceWidth, 0),
            new $69aac16029968692$export$baf26146a414f24a(false, true, 0, glyph.yMax + topBearing),
            new $69aac16029968692$export$baf26146a414f24a(false, true, 0, glyph.yMax + topBearing + advanceHeight)
        ];
    }
    // Decodes font data, resolves composite glyphs, and returns an array of contours
    _getContours() {
        let glyph = this._decode();
        if (!glyph) return [];
        let points = [];
        if (glyph.numberOfContours < 0) // resolve composite glyphs
        for (let component of glyph.components){
            let contours = this._font.getGlyph(component.glyphID)._getContours();
            for(let i = 0; i < contours.length; i++){
                let contour = contours[i];
                for(let j = 0; j < contour.length; j++){
                    let point = contour[j];
                    let x = point.x * component.scaleX + point.y * component.scale01 + component.dx;
                    let y = point.y * component.scaleY + point.x * component.scale10 + component.dy;
                    points.push(new $69aac16029968692$export$baf26146a414f24a(point.onCurve, point.endContour, x, y));
                }
            }
        }
        else points = glyph.points || [];
        // Recompute and cache metrics if we performed variation processing, and don't have an HVAR table
        if (glyph.phantomPoints && !this._font.directory.tables.HVAR) {
            this._metrics.advanceWidth = glyph.phantomPoints[1].x - glyph.phantomPoints[0].x;
            this._metrics.advanceHeight = glyph.phantomPoints[3].y - glyph.phantomPoints[2].y;
            this._metrics.leftBearing = glyph.xMin - glyph.phantomPoints[0].x;
            this._metrics.topBearing = glyph.phantomPoints[2].y - glyph.yMax;
        }
        let contours = [];
        let cur = [];
        for(let k = 0; k < points.length; k++){
            var point = points[k];
            cur.push(point);
            if (point.endContour) {
                contours.push(cur);
                cur = [];
            }
        }
        return contours;
    }
    _getMetrics() {
        if (this._metrics) return this._metrics;
        let cbox = this._getCBox(true);
        super._getMetrics(cbox);
        if (this._font._variationProcessor && !this._font.HVAR) // No HVAR table, decode the glyph. This triggers recomputation of metrics.
        this.path;
        return this._metrics;
    }
    // Converts contours to a Path object that can be rendered
    _getPath() {
        let contours = this._getContours();
        let path = new (0, $f43aec954cdfdf21$export$2e2bcd8739ae039);
        for(let i = 0; i < contours.length; i++){
            let contour = contours[i];
            let firstPt = contour[0];
            let lastPt = contour[contour.length - 1];
            let start = 0;
            if (firstPt.onCurve) {
                // The first point will be consumed by the moveTo command, so skip in the loop
                var curvePt = null;
                start = 1;
            } else {
                if (lastPt.onCurve) // Start at the last point if the first point is off curve and the last point is on curve
                firstPt = lastPt;
                else // Start at the middle if both the first and last points are off curve
                firstPt = new $69aac16029968692$export$baf26146a414f24a(false, false, (firstPt.x + lastPt.x) / 2, (firstPt.y + lastPt.y) / 2);
                var curvePt = firstPt;
            }
            path.moveTo(firstPt.x, firstPt.y);
            for(let j = start; j < contour.length; j++){
                let pt = contour[j];
                let prevPt = j === 0 ? firstPt : contour[j - 1];
                if (prevPt.onCurve && pt.onCurve) path.lineTo(pt.x, pt.y);
                else if (prevPt.onCurve && !pt.onCurve) var curvePt = pt;
                else if (!prevPt.onCurve && !pt.onCurve) {
                    let midX = (prevPt.x + pt.x) / 2;
                    let midY = (prevPt.y + pt.y) / 2;
                    path.quadraticCurveTo(prevPt.x, prevPt.y, midX, midY);
                    var curvePt = pt;
                } else if (!prevPt.onCurve && pt.onCurve) {
                    path.quadraticCurveTo(curvePt.x, curvePt.y, pt.x, pt.y);
                    var curvePt = null;
                } else throw new Error("Unknown TTF path state");
            }
            // Connect the first and last points
            if (curvePt) path.quadraticCurveTo(curvePt.x, curvePt.y, firstPt.x, firstPt.y);
            path.closePath();
        }
        return path;
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'TTF');
    }
}





class $62cc5109c6101893$export$2e2bcd8739ae039 extends (0, $f92906be28e61769$export$2e2bcd8739ae039) {
    _getName() {
        if (this._font.CFF2) return super._getName();
        return this._font['CFF '].getGlyphName(this.id);
    }
    bias(s) {
        if (s.length < 1240) return 107;
        else if (s.length < 33900) return 1131;
        else return 32768;
    }
    _getPath() {
        let cff = this._font.CFF2 || this._font['CFF '];
        let { stream: stream } = cff;
        let str = cff.topDict.CharStrings[this.id];
        let end = str.offset + str.length;
        stream.pos = str.offset;
        let path = new (0, $f43aec954cdfdf21$export$2e2bcd8739ae039);
        let stack = [];
        let trans = [];
        let width = null;
        let nStems = 0;
        let x = 0, y = 0;
        let usedGsubrs;
        let usedSubrs;
        let open = false;
        this._usedGsubrs = usedGsubrs = {};
        this._usedSubrs = usedSubrs = {};
        let gsubrs = cff.globalSubrIndex || [];
        let gsubrsBias = this.bias(gsubrs);
        let privateDict = cff.privateDictForGlyph(this.id) || {};
        let subrs = privateDict.Subrs || [];
        let subrsBias = this.bias(subrs);
        let vstore = cff.topDict.vstore && cff.topDict.vstore.itemVariationStore;
        let vsindex = privateDict.vsindex;
        let variationProcessor = this._font._variationProcessor;
        function checkWidth() {
            if (width == null) width = stack.shift() + privateDict.nominalWidthX;
        }
        function parseStems() {
            if (stack.length % 2 !== 0) checkWidth();
            nStems += stack.length >> 1;
            return stack.length = 0;
        }
        function moveTo(x, y) {
            if (open) path.closePath();
            path.moveTo(x, y);
            open = true;
        }
        let parse = function() {
            while(stream.pos < end){
                let op = stream.readUInt8();
                if (op < 32) {
                    let index, subr, phase;
                    let c1x, c1y, c2x, c2y, c3x, c3y;
                    let c4x, c4y, c5x, c5y, c6x, c6y;
                    let pts;
                    switch(op){
                        case 1:
                        case 3:
                        case 18:
                        case 23:
                            parseStems();
                            break;
                        case 4:
                            if (stack.length > 1) checkWidth();
                            y += stack.shift();
                            moveTo(x, y);
                            break;
                        case 5:
                            while(stack.length >= 2){
                                x += stack.shift();
                                y += stack.shift();
                                path.lineTo(x, y);
                            }
                            break;
                        case 6:
                        case 7:
                            phase = op === 6;
                            while(stack.length >= 1){
                                if (phase) x += stack.shift();
                                else y += stack.shift();
                                path.lineTo(x, y);
                                phase = !phase;
                            }
                            break;
                        case 8:
                            while(stack.length > 0){
                                c1x = x + stack.shift();
                                c1y = y + stack.shift();
                                c2x = c1x + stack.shift();
                                c2y = c1y + stack.shift();
                                x = c2x + stack.shift();
                                y = c2y + stack.shift();
                                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                            }
                            break;
                        case 10:
                            index = stack.pop() + subrsBias;
                            subr = subrs[index];
                            if (subr) {
                                usedSubrs[index] = true;
                                let p = stream.pos;
                                let e = end;
                                stream.pos = subr.offset;
                                end = subr.offset + subr.length;
                                parse();
                                stream.pos = p;
                                end = e;
                            }
                            break;
                        case 11:
                            if (cff.version >= 2) break;
                            return;
                        case 14:
                            if (cff.version >= 2) break;
                            if (stack.length > 0) checkWidth();
                            if (open) {
                                path.closePath();
                                open = false;
                            }
                            break;
                        case 15:
                            if (cff.version < 2) throw new Error('vsindex operator not supported in CFF v1');
                            vsindex = stack.pop();
                            break;
                        case 16:
                            {
                                if (cff.version < 2) throw new Error('blend operator not supported in CFF v1');
                                if (!variationProcessor) throw new Error('blend operator in non-variation font');
                                let blendVector = variationProcessor.getBlendVector(vstore, vsindex);
                                let numBlends = stack.pop();
                                let numOperands = numBlends * blendVector.length;
                                let delta = stack.length - numOperands;
                                let base = delta - numBlends;
                                for(let i = 0; i < numBlends; i++){
                                    let sum = stack[base + i];
                                    for(let j = 0; j < blendVector.length; j++)sum += blendVector[j] * stack[delta++];
                                    stack[base + i] = sum;
                                }
                                while(numOperands--)stack.pop();
                                break;
                            }
                        case 19:
                        case 20:
                            parseStems();
                            stream.pos += nStems + 7 >> 3;
                            break;
                        case 21:
                            if (stack.length > 2) checkWidth();
                            x += stack.shift();
                            y += stack.shift();
                            moveTo(x, y);
                            break;
                        case 22:
                            if (stack.length > 1) checkWidth();
                            x += stack.shift();
                            moveTo(x, y);
                            break;
                        case 24:
                            while(stack.length >= 8){
                                c1x = x + stack.shift();
                                c1y = y + stack.shift();
                                c2x = c1x + stack.shift();
                                c2y = c1y + stack.shift();
                                x = c2x + stack.shift();
                                y = c2y + stack.shift();
                                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                            }
                            x += stack.shift();
                            y += stack.shift();
                            path.lineTo(x, y);
                            break;
                        case 25:
                            while(stack.length >= 8){
                                x += stack.shift();
                                y += stack.shift();
                                path.lineTo(x, y);
                            }
                            c1x = x + stack.shift();
                            c1y = y + stack.shift();
                            c2x = c1x + stack.shift();
                            c2y = c1y + stack.shift();
                            x = c2x + stack.shift();
                            y = c2y + stack.shift();
                            path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                            break;
                        case 26:
                            if (stack.length % 2) x += stack.shift();
                            while(stack.length >= 4){
                                c1x = x;
                                c1y = y + stack.shift();
                                c2x = c1x + stack.shift();
                                c2y = c1y + stack.shift();
                                x = c2x;
                                y = c2y + stack.shift();
                                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                            }
                            break;
                        case 27:
                            if (stack.length % 2) y += stack.shift();
                            while(stack.length >= 4){
                                c1x = x + stack.shift();
                                c1y = y;
                                c2x = c1x + stack.shift();
                                c2y = c1y + stack.shift();
                                x = c2x + stack.shift();
                                y = c2y;
                                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                            }
                            break;
                        case 28:
                            stack.push(stream.readInt16BE());
                            break;
                        case 29:
                            index = stack.pop() + gsubrsBias;
                            subr = gsubrs[index];
                            if (subr) {
                                usedGsubrs[index] = true;
                                let p = stream.pos;
                                let e = end;
                                stream.pos = subr.offset;
                                end = subr.offset + subr.length;
                                parse();
                                stream.pos = p;
                                end = e;
                            }
                            break;
                        case 30:
                        case 31:
                            phase = op === 31;
                            while(stack.length >= 4){
                                if (phase) {
                                    c1x = x + stack.shift();
                                    c1y = y;
                                    c2x = c1x + stack.shift();
                                    c2y = c1y + stack.shift();
                                    y = c2y + stack.shift();
                                    x = c2x + (stack.length === 1 ? stack.shift() : 0);
                                } else {
                                    c1x = x;
                                    c1y = y + stack.shift();
                                    c2x = c1x + stack.shift();
                                    c2y = c1y + stack.shift();
                                    x = c2x + stack.shift();
                                    y = c2y + (stack.length === 1 ? stack.shift() : 0);
                                }
                                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                                phase = !phase;
                            }
                            break;
                        case 12:
                            op = stream.readUInt8();
                            switch(op){
                                case 3:
                                    let a = stack.pop();
                                    let b = stack.pop();
                                    stack.push(a && b ? 1 : 0);
                                    break;
                                case 4:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(a || b ? 1 : 0);
                                    break;
                                case 5:
                                    a = stack.pop();
                                    stack.push(a ? 0 : 1);
                                    break;
                                case 9:
                                    a = stack.pop();
                                    stack.push(Math.abs(a));
                                    break;
                                case 10:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(a + b);
                                    break;
                                case 11:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(a - b);
                                    break;
                                case 12:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(a / b);
                                    break;
                                case 14:
                                    a = stack.pop();
                                    stack.push(-a);
                                    break;
                                case 15:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(a === b ? 1 : 0);
                                    break;
                                case 18:
                                    stack.pop();
                                    break;
                                case 20:
                                    let val = stack.pop();
                                    let idx = stack.pop();
                                    trans[idx] = val;
                                    break;
                                case 21:
                                    idx = stack.pop();
                                    stack.push(trans[idx] || 0);
                                    break;
                                case 22:
                                    let s1 = stack.pop();
                                    let s2 = stack.pop();
                                    let v1 = stack.pop();
                                    let v2 = stack.pop();
                                    stack.push(v1 <= v2 ? s1 : s2);
                                    break;
                                case 23:
                                    stack.push(Math.random());
                                    break;
                                case 24:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(a * b);
                                    break;
                                case 26:
                                    a = stack.pop();
                                    stack.push(Math.sqrt(a));
                                    break;
                                case 27:
                                    a = stack.pop();
                                    stack.push(a, a);
                                    break;
                                case 28:
                                    a = stack.pop();
                                    b = stack.pop();
                                    stack.push(b, a);
                                    break;
                                case 29:
                                    idx = stack.pop();
                                    if (idx < 0) idx = 0;
                                    else if (idx > stack.length - 1) idx = stack.length - 1;
                                    stack.push(stack[idx]);
                                    break;
                                case 30:
                                    let n = stack.pop();
                                    let j = stack.pop();
                                    if (j >= 0) while(j > 0){
                                        var t = stack[n - 1];
                                        for(let i = n - 2; i >= 0; i--)stack[i + 1] = stack[i];
                                        stack[0] = t;
                                        j--;
                                    }
                                    else while(j < 0){
                                        var t = stack[0];
                                        for(let i = 0; i <= n; i++)stack[i] = stack[i + 1];
                                        stack[n - 1] = t;
                                        j++;
                                    }
                                    break;
                                case 34:
                                    c1x = x + stack.shift();
                                    c1y = y;
                                    c2x = c1x + stack.shift();
                                    c2y = c1y + stack.shift();
                                    c3x = c2x + stack.shift();
                                    c3y = c2y;
                                    c4x = c3x + stack.shift();
                                    c4y = c3y;
                                    c5x = c4x + stack.shift();
                                    c5y = c4y;
                                    c6x = c5x + stack.shift();
                                    c6y = c5y;
                                    x = c6x;
                                    y = c6y;
                                    path.bezierCurveTo(c1x, c1y, c2x, c2y, c3x, c3y);
                                    path.bezierCurveTo(c4x, c4y, c5x, c5y, c6x, c6y);
                                    break;
                                case 35:
                                    pts = [];
                                    for(let i = 0; i <= 5; i++){
                                        x += stack.shift();
                                        y += stack.shift();
                                        pts.push(x, y);
                                    }
                                    path.bezierCurveTo(...pts.slice(0, 6));
                                    path.bezierCurveTo(...pts.slice(6));
                                    stack.shift(); // fd
                                    break;
                                case 36:
                                    c1x = x + stack.shift();
                                    c1y = y + stack.shift();
                                    c2x = c1x + stack.shift();
                                    c2y = c1y + stack.shift();
                                    c3x = c2x + stack.shift();
                                    c3y = c2y;
                                    c4x = c3x + stack.shift();
                                    c4y = c3y;
                                    c5x = c4x + stack.shift();
                                    c5y = c4y + stack.shift();
                                    c6x = c5x + stack.shift();
                                    c6y = c5y;
                                    x = c6x;
                                    y = c6y;
                                    path.bezierCurveTo(c1x, c1y, c2x, c2y, c3x, c3y);
                                    path.bezierCurveTo(c4x, c4y, c5x, c5y, c6x, c6y);
                                    break;
                                case 37:
                                    let startx = x;
                                    let starty = y;
                                    pts = [];
                                    for(let i = 0; i <= 4; i++){
                                        x += stack.shift();
                                        y += stack.shift();
                                        pts.push(x, y);
                                    }
                                    if (Math.abs(x - startx) > Math.abs(y - starty)) {
                                        x += stack.shift();
                                        y = starty;
                                    } else {
                                        x = startx;
                                        y += stack.shift();
                                    }
                                    pts.push(x, y);
                                    path.bezierCurveTo(...pts.slice(0, 6));
                                    path.bezierCurveTo(...pts.slice(6));
                                    break;
                                default:
                                    throw new Error(`Unknown op: 12 ${op}`);
                            }
                            break;
                        default:
                            throw new Error(`Unknown op: ${op}`);
                    }
                } else if (op < 247) stack.push(op - 139);
                else if (op < 251) {
                    var b1 = stream.readUInt8();
                    stack.push((op - 247) * 256 + b1 + 108);
                } else if (op < 255) {
                    var b1 = stream.readUInt8();
                    stack.push(-(op - 251) * 256 - b1 - 108);
                } else stack.push(stream.readInt32BE() / 65536);
            }
        };
        parse();
        if (open) path.closePath();
        return path;
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'CFF');
    }
}





let $25d8f049c222084c$var$SBIXImage = new $6uUbQ$Struct({
    originX: $6uUbQ$uint16,
    originY: $6uUbQ$uint16,
    type: new $6uUbQ$String(4),
    data: new $6uUbQ$Buffer((t)=>t.parent.buflen - t._currentOffset)
});
class $25d8f049c222084c$export$2e2bcd8739ae039 extends (0, $69aac16029968692$export$2e2bcd8739ae039) {
    /**
   * Returns an object representing a glyph image at the given point size.
   * The object has a data property with a Buffer containing the actual image data,
   * along with the image type, and origin.
   *
   * @param {number} size
   * @return {object}
   */ getImageForSize(size) {
        for(let i = 0; i < this._font.sbix.imageTables.length; i++){
            var table = this._font.sbix.imageTables[i];
            if (table.ppem >= size) break;
        }
        let offsets = table.imageOffsets;
        let start = offsets[this.id];
        let end = offsets[this.id + 1];
        if (start === end) return null;
        this._font.stream.pos = start;
        return $25d8f049c222084c$var$SBIXImage.decode(this._font.stream, {
            buflen: end - start
        });
    }
    render(ctx, size) {
        let img = this.getImageForSize(size);
        if (img != null) {
            let scale = size / this._font.unitsPerEm;
            ctx.image(img.data, {
                height: size,
                x: img.originX,
                y: (this.bbox.minY - img.originY) * scale
            });
        }
        if (this._font.sbix.flags.renderOutlines) super.render(ctx, size);
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'SBIX');
    }
}





class $0d411f0165859681$var$COLRLayer {
    constructor(glyph, color){
        this.glyph = glyph;
        this.color = color;
    }
}
class $0d411f0165859681$export$2e2bcd8739ae039 extends (0, $f92906be28e61769$export$2e2bcd8739ae039) {
    _getBBox() {
        let bbox = new (0, $f34600ab9d7f70d8$export$2e2bcd8739ae039);
        for(let i = 0; i < this.layers.length; i++){
            let layer = this.layers[i];
            let b = layer.glyph.bbox;
            bbox.addPoint(b.minX, b.minY);
            bbox.addPoint(b.maxX, b.maxY);
        }
        return bbox;
    }
    /**
   * Returns an array of objects containing the glyph and color for
   * each layer in the composite color glyph.
   * @type {object[]}
   */ get layers() {
        let cpal = this._font.CPAL;
        let colr = this._font.COLR;
        let low = 0;
        let high = colr.baseGlyphRecord.length - 1;
        while(low <= high){
            let mid = low + high >> 1;
            var rec = colr.baseGlyphRecord[mid];
            if (this.id < rec.gid) high = mid - 1;
            else if (this.id > rec.gid) low = mid + 1;
            else {
                var baseLayer = rec;
                break;
            }
        }
        // if base glyph not found in COLR table,
        // default to normal glyph from glyf or CFF
        if (baseLayer == null) {
            var g = this._font._getBaseGlyph(this.id);
            var color = {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 255
            };
            return [
                new $0d411f0165859681$var$COLRLayer(g, color)
            ];
        }
        // otherwise, return an array of all the layers
        let layers = [];
        for(let i = baseLayer.firstLayerIndex; i < baseLayer.firstLayerIndex + baseLayer.numLayers; i++){
            var rec = colr.layerRecords[i];
            var color = cpal.colorRecords[rec.paletteIndex];
            var g = this._font._getBaseGlyph(rec.gid);
            layers.push(new $0d411f0165859681$var$COLRLayer(g, color));
        }
        return layers;
    }
    render(ctx, size) {
        for (let { glyph: glyph, color: color } of this.layers){
            ctx.fillColor([
                color.red,
                color.green,
                color.blue
            ], color.alpha / 255 * 100);
            glyph.render(ctx, size);
        }
        return;
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'COLR');
    }
}


const $0bb840cac04e911b$var$TUPLES_SHARE_POINT_NUMBERS = 0x8000;
const $0bb840cac04e911b$var$TUPLE_COUNT_MASK = 0x0fff;
const $0bb840cac04e911b$var$EMBEDDED_TUPLE_COORD = 0x8000;
const $0bb840cac04e911b$var$INTERMEDIATE_TUPLE = 0x4000;
const $0bb840cac04e911b$var$PRIVATE_POINT_NUMBERS = 0x2000;
const $0bb840cac04e911b$var$TUPLE_INDEX_MASK = 0x0fff;
const $0bb840cac04e911b$var$POINTS_ARE_WORDS = 0x80;
const $0bb840cac04e911b$var$POINT_RUN_COUNT_MASK = 0x7f;
const $0bb840cac04e911b$var$DELTAS_ARE_ZERO = 0x80;
const $0bb840cac04e911b$var$DELTAS_ARE_WORDS = 0x40;
const $0bb840cac04e911b$var$DELTA_RUN_COUNT_MASK = 0x3f;
class $0bb840cac04e911b$export$2e2bcd8739ae039 {
    normalizeCoords(coords) {
        // the default mapping is linear along each axis, in two segments:
        // from the minValue to defaultValue, and from defaultValue to maxValue.
        let normalized = [];
        for(var i = 0; i < this.font.fvar.axis.length; i++){
            let axis = this.font.fvar.axis[i];
            if (coords[i] < axis.defaultValue) normalized.push((coords[i] - axis.defaultValue + Number.EPSILON) / (axis.defaultValue - axis.minValue + Number.EPSILON));
            else normalized.push((coords[i] - axis.defaultValue + Number.EPSILON) / (axis.maxValue - axis.defaultValue + Number.EPSILON));
        }
        // if there is an avar table, the normalized value is calculated
        // by interpolating between the two nearest mapped values.
        if (this.font.avar) for(var i = 0; i < this.font.avar.segment.length; i++){
            let segment = this.font.avar.segment[i];
            for(let j = 0; j < segment.correspondence.length; j++){
                let pair = segment.correspondence[j];
                if (j >= 1 && normalized[i] < pair.fromCoord) {
                    let prev = segment.correspondence[j - 1];
                    normalized[i] = ((normalized[i] - prev.fromCoord) * (pair.toCoord - prev.toCoord) + Number.EPSILON) / (pair.fromCoord - prev.fromCoord + Number.EPSILON) + prev.toCoord;
                    break;
                }
            }
        }
        return normalized;
    }
    transformPoints(gid, glyphPoints) {
        if (!this.font.fvar || !this.font.gvar) return;
        let { gvar: gvar } = this.font;
        if (gid >= gvar.glyphCount) return;
        let offset = gvar.offsets[gid];
        if (offset === gvar.offsets[gid + 1]) return;
        // Read the gvar data for this glyph
        let { stream: stream } = this.font;
        stream.pos = offset;
        if (stream.pos >= stream.length) return;
        let tupleCount = stream.readUInt16BE();
        let offsetToData = offset + stream.readUInt16BE();
        if (tupleCount & $0bb840cac04e911b$var$TUPLES_SHARE_POINT_NUMBERS) {
            var here = stream.pos;
            stream.pos = offsetToData;
            var sharedPoints = this.decodePoints();
            offsetToData = stream.pos;
            stream.pos = here;
        }
        let origPoints = glyphPoints.map((pt)=>pt.copy());
        tupleCount &= $0bb840cac04e911b$var$TUPLE_COUNT_MASK;
        for(let i = 0; i < tupleCount; i++){
            let tupleDataSize = stream.readUInt16BE();
            let tupleIndex = stream.readUInt16BE();
            if (tupleIndex & $0bb840cac04e911b$var$EMBEDDED_TUPLE_COORD) {
                var tupleCoords = [];
                for(let a = 0; a < gvar.axisCount; a++)tupleCoords.push(stream.readInt16BE() / 16384);
            } else {
                if ((tupleIndex & $0bb840cac04e911b$var$TUPLE_INDEX_MASK) >= gvar.globalCoordCount) throw new Error('Invalid gvar table');
                var tupleCoords = gvar.globalCoords[tupleIndex & $0bb840cac04e911b$var$TUPLE_INDEX_MASK];
            }
            if (tupleIndex & $0bb840cac04e911b$var$INTERMEDIATE_TUPLE) {
                var startCoords = [];
                for(let a = 0; a < gvar.axisCount; a++)startCoords.push(stream.readInt16BE() / 16384);
                var endCoords = [];
                for(let a = 0; a < gvar.axisCount; a++)endCoords.push(stream.readInt16BE() / 16384);
            }
            // Get the factor at which to apply this tuple
            let factor = this.tupleFactor(tupleIndex, tupleCoords, startCoords, endCoords);
            if (factor === 0) {
                offsetToData += tupleDataSize;
                continue;
            }
            var here = stream.pos;
            stream.pos = offsetToData;
            if (tupleIndex & $0bb840cac04e911b$var$PRIVATE_POINT_NUMBERS) var points = this.decodePoints();
            else var points = sharedPoints;
            // points.length = 0 means there are deltas for all points
            let nPoints = points.length === 0 ? glyphPoints.length : points.length;
            let xDeltas = this.decodeDeltas(nPoints);
            let yDeltas = this.decodeDeltas(nPoints);
            if (points.length === 0) for(let i = 0; i < glyphPoints.length; i++){
                var point = glyphPoints[i];
                point.x += Math.round(xDeltas[i] * factor);
                point.y += Math.round(yDeltas[i] * factor);
            }
            else {
                let outPoints = origPoints.map((pt)=>pt.copy());
                let hasDelta = glyphPoints.map(()=>false);
                for(let i = 0; i < points.length; i++){
                    let idx = points[i];
                    if (idx < glyphPoints.length) {
                        let point = outPoints[idx];
                        hasDelta[idx] = true;
                        point.x += xDeltas[i] * factor;
                        point.y += yDeltas[i] * factor;
                    }
                }
                this.interpolateMissingDeltas(outPoints, origPoints, hasDelta);
                for(let i = 0; i < glyphPoints.length; i++){
                    let deltaX = outPoints[i].x - origPoints[i].x;
                    let deltaY = outPoints[i].y - origPoints[i].y;
                    glyphPoints[i].x = Math.round(glyphPoints[i].x + deltaX);
                    glyphPoints[i].y = Math.round(glyphPoints[i].y + deltaY);
                }
            }
            offsetToData += tupleDataSize;
            stream.pos = here;
        }
    }
    decodePoints() {
        let stream = this.font.stream;
        let count = stream.readUInt8();
        if (count & $0bb840cac04e911b$var$POINTS_ARE_WORDS) count = (count & $0bb840cac04e911b$var$POINT_RUN_COUNT_MASK) << 8 | stream.readUInt8();
        let points = new Uint16Array(count);
        let i = 0;
        let point = 0;
        while(i < count){
            let run = stream.readUInt8();
            let runCount = (run & $0bb840cac04e911b$var$POINT_RUN_COUNT_MASK) + 1;
            let fn = run & $0bb840cac04e911b$var$POINTS_ARE_WORDS ? stream.readUInt16 : stream.readUInt8;
            for(let j = 0; j < runCount && i < count; j++){
                point += fn.call(stream);
                points[i++] = point;
            }
        }
        return points;
    }
    decodeDeltas(count) {
        let stream = this.font.stream;
        let i = 0;
        let deltas = new Int16Array(count);
        while(i < count){
            let run = stream.readUInt8();
            let runCount = (run & $0bb840cac04e911b$var$DELTA_RUN_COUNT_MASK) + 1;
            if (run & $0bb840cac04e911b$var$DELTAS_ARE_ZERO) i += runCount;
            else {
                let fn = run & $0bb840cac04e911b$var$DELTAS_ARE_WORDS ? stream.readInt16BE : stream.readInt8;
                for(let j = 0; j < runCount && i < count; j++)deltas[i++] = fn.call(stream);
            }
        }
        return deltas;
    }
    tupleFactor(tupleIndex, tupleCoords, startCoords, endCoords) {
        let normalized = this.normalizedCoords;
        let { gvar: gvar } = this.font;
        let factor = 1;
        for(let i = 0; i < gvar.axisCount; i++){
            if (tupleCoords[i] === 0) continue;
            if (normalized[i] === 0) return 0;
            if ((tupleIndex & $0bb840cac04e911b$var$INTERMEDIATE_TUPLE) === 0) {
                if (normalized[i] < Math.min(0, tupleCoords[i]) || normalized[i] > Math.max(0, tupleCoords[i])) return 0;
                factor = (factor * normalized[i] + Number.EPSILON) / (tupleCoords[i] + Number.EPSILON);
            } else {
                if (normalized[i] < startCoords[i] || normalized[i] > endCoords[i]) return 0;
                else if (normalized[i] < tupleCoords[i]) factor = factor * (normalized[i] - startCoords[i] + Number.EPSILON) / (tupleCoords[i] - startCoords[i] + Number.EPSILON);
                else factor = factor * (endCoords[i] - normalized[i] + Number.EPSILON) / (endCoords[i] - tupleCoords[i] + Number.EPSILON);
            }
        }
        return factor;
    }
    // Interpolates points without delta values.
    // Needed for the Ø and Q glyphs in Skia.
    // Algorithm from Freetype.
    interpolateMissingDeltas(points, inPoints, hasDelta) {
        if (points.length === 0) return;
        let point = 0;
        while(point < points.length){
            let firstPoint = point;
            // find the end point of the contour
            let endPoint = point;
            let pt = points[endPoint];
            while(!pt.endContour)pt = points[++endPoint];
            // find the first point that has a delta
            while(point <= endPoint && !hasDelta[point])point++;
            if (point > endPoint) continue;
            let firstDelta = point;
            let curDelta = point;
            point++;
            while(point <= endPoint){
                // find the next point with a delta, and interpolate intermediate points
                if (hasDelta[point]) {
                    this.deltaInterpolate(curDelta + 1, point - 1, curDelta, point, inPoints, points);
                    curDelta = point;
                }
                point++;
            }
            // shift contour if we only have a single delta
            if (curDelta === firstDelta) this.deltaShift(firstPoint, endPoint, curDelta, inPoints, points);
            else {
                // otherwise, handle the remaining points at the end and beginning of the contour
                this.deltaInterpolate(curDelta + 1, endPoint, curDelta, firstDelta, inPoints, points);
                if (firstDelta > 0) this.deltaInterpolate(firstPoint, firstDelta - 1, curDelta, firstDelta, inPoints, points);
            }
            point = endPoint + 1;
        }
    }
    deltaInterpolate(p1, p2, ref1, ref2, inPoints, outPoints) {
        if (p1 > p2) return;
        let iterable = [
            'x',
            'y'
        ];
        for(let i = 0; i < iterable.length; i++){
            let k = iterable[i];
            if (inPoints[ref1][k] > inPoints[ref2][k]) {
                var p = ref1;
                ref1 = ref2;
                ref2 = p;
            }
            let in1 = inPoints[ref1][k];
            let in2 = inPoints[ref2][k];
            let out1 = outPoints[ref1][k];
            let out2 = outPoints[ref2][k];
            // If the reference points have the same coordinate but different
            // delta, inferred delta is zero.  Otherwise interpolate.
            if (in1 !== in2 || out1 === out2) {
                let scale = in1 === in2 ? 0 : (out2 - out1) / (in2 - in1);
                for(let p = p1; p <= p2; p++){
                    let out = inPoints[p][k];
                    if (out <= in1) out += out1 - in1;
                    else if (out >= in2) out += out2 - in2;
                    else out = out1 + (out - in1) * scale;
                    outPoints[p][k] = out;
                }
            }
        }
    }
    deltaShift(p1, p2, ref, inPoints, outPoints) {
        let deltaX = outPoints[ref].x - inPoints[ref].x;
        let deltaY = outPoints[ref].y - inPoints[ref].y;
        if (deltaX === 0 && deltaY === 0) return;
        for(let p = p1; p <= p2; p++)if (p !== ref) {
            outPoints[p].x += deltaX;
            outPoints[p].y += deltaY;
        }
    }
    getAdvanceAdjustment(gid, table) {
        let outerIndex, innerIndex;
        if (table.advanceWidthMapping) {
            let idx = gid;
            if (idx >= table.advanceWidthMapping.mapCount) idx = table.advanceWidthMapping.mapCount - 1;
            let entryFormat = table.advanceWidthMapping.entryFormat;
            ({ outerIndex: outerIndex, innerIndex: innerIndex } = table.advanceWidthMapping.mapData[idx]);
        } else {
            outerIndex = 0;
            innerIndex = gid;
        }
        return this.getDelta(table.itemVariationStore, outerIndex, innerIndex);
    }
    // See pseudo code from `Font Variations Overview'
    // in the OpenType specification.
    getDelta(itemStore, outerIndex, innerIndex) {
        if (outerIndex >= itemStore.itemVariationData.length) return 0;
        let varData = itemStore.itemVariationData[outerIndex];
        if (innerIndex >= varData.deltaSets.length) return 0;
        let deltaSet = varData.deltaSets[innerIndex];
        let blendVector = this.getBlendVector(itemStore, outerIndex);
        let netAdjustment = 0;
        for(let master = 0; master < varData.regionIndexCount; master++)netAdjustment += deltaSet.deltas[master] * blendVector[master];
        return netAdjustment;
    }
    getBlendVector(itemStore, outerIndex) {
        let varData = itemStore.itemVariationData[outerIndex];
        if (this.blendVectors.has(varData)) return this.blendVectors.get(varData);
        let normalizedCoords = this.normalizedCoords;
        let blendVector = [];
        // outer loop steps through master designs to be blended
        for(let master = 0; master < varData.regionIndexCount; master++){
            let scalar = 1;
            let regionIndex = varData.regionIndexes[master];
            let axes = itemStore.variationRegionList.variationRegions[regionIndex];
            // inner loop steps through axes in this region
            for(let j = 0; j < axes.length; j++){
                let axis = axes[j];
                let axisScalar;
                // compute the scalar contribution of this axis
                // ignore invalid ranges
                if (axis.startCoord > axis.peakCoord || axis.peakCoord > axis.endCoord) axisScalar = 1;
                else if (axis.startCoord < 0 && axis.endCoord > 0 && axis.peakCoord !== 0) axisScalar = 1;
                else if (axis.peakCoord === 0) axisScalar = 1;
                else if (normalizedCoords[j] < axis.startCoord || normalizedCoords[j] > axis.endCoord) axisScalar = 0;
                else {
                    if (normalizedCoords[j] === axis.peakCoord) axisScalar = 1;
                    else if (normalizedCoords[j] < axis.peakCoord) axisScalar = (normalizedCoords[j] - axis.startCoord + Number.EPSILON) / (axis.peakCoord - axis.startCoord + Number.EPSILON);
                    else axisScalar = (axis.endCoord - normalizedCoords[j] + Number.EPSILON) / (axis.endCoord - axis.peakCoord + Number.EPSILON);
                }
                // take product of all the axis scalars
                scalar *= axisScalar;
            }
            blendVector[master] = scalar;
        }
        this.blendVectors.set(varData, blendVector);
        return blendVector;
    }
    constructor(font, coords){
        this.font = font;
        this.normalizedCoords = this.normalizeCoords(coords);
        this.blendVectors = new Map;
    }
}




const $5cc7476da92df375$var$resolved = Promise.resolve();
class $5cc7476da92df375$export$2e2bcd8739ae039 {
    includeGlyph(glyph) {
        if (typeof glyph === 'object') glyph = glyph.id;
        if (this.mapping[glyph] == null) {
            this.glyphs.push(glyph);
            this.mapping[glyph] = this.glyphs.length - 1;
        }
        return this.mapping[glyph];
    }
    constructor(font){
        this.font = font;
        this.glyphs = [];
        this.mapping = {};
        // always include the missing glyph
        this.includeGlyph(0);
    }
}





// Flags for simple glyphs
const $807e58506be70005$var$ON_CURVE = 1;
const $807e58506be70005$var$X_SHORT_VECTOR = 2;
const $807e58506be70005$var$Y_SHORT_VECTOR = 4;
const $807e58506be70005$var$REPEAT = 8;
const $807e58506be70005$var$SAME_X = 16;
const $807e58506be70005$var$SAME_Y = 32;
class $807e58506be70005$var$Point {
    static size(val) {
        return val >= 0 && val <= 255 ? 1 : 2;
    }
    static encode(stream, value) {
        if (value >= 0 && value <= 255) stream.writeUInt8(value);
        else stream.writeInt16BE(value);
    }
}
let $807e58506be70005$var$Glyf = new $6uUbQ$Struct({
    numberOfContours: $6uUbQ$int16,
    xMin: $6uUbQ$int16,
    yMin: $6uUbQ$int16,
    xMax: $6uUbQ$int16,
    yMax: $6uUbQ$int16,
    endPtsOfContours: new $6uUbQ$Array($6uUbQ$uint16, 'numberOfContours'),
    instructions: new $6uUbQ$Array($6uUbQ$uint8, $6uUbQ$uint16),
    flags: new $6uUbQ$Array($6uUbQ$uint8, 0),
    xPoints: new $6uUbQ$Array($807e58506be70005$var$Point, 0),
    yPoints: new $6uUbQ$Array($807e58506be70005$var$Point, 0)
});
class $807e58506be70005$export$2e2bcd8739ae039 {
    encodeSimple(path, instructions = []) {
        let endPtsOfContours = [];
        let xPoints = [];
        let yPoints = [];
        let flags = [];
        let same = 0;
        let lastX = 0, lastY = 0, lastFlag = 0;
        let pointCount = 0;
        for(let i = 0; i < path.commands.length; i++){
            let c = path.commands[i];
            for(let j = 0; j < c.args.length; j += 2){
                let x = c.args[j];
                let y = c.args[j + 1];
                let flag = 0;
                // If the ending point of a quadratic curve is the midpoint
                // between the control point and the control point of the next
                // quadratic curve, we can omit the ending point.
                if (c.command === 'quadraticCurveTo' && j === 2) {
                    let next = path.commands[i + 1];
                    if (next && next.command === 'quadraticCurveTo') {
                        let midX = (lastX + next.args[0]) / 2;
                        let midY = (lastY + next.args[1]) / 2;
                        if (x === midX && y === midY) continue;
                    }
                }
                // All points except control points are on curve.
                if (!(c.command === 'quadraticCurveTo' && j === 0)) flag |= $807e58506be70005$var$ON_CURVE;
                flag = this._encodePoint(x, lastX, xPoints, flag, $807e58506be70005$var$X_SHORT_VECTOR, $807e58506be70005$var$SAME_X);
                flag = this._encodePoint(y, lastY, yPoints, flag, $807e58506be70005$var$Y_SHORT_VECTOR, $807e58506be70005$var$SAME_Y);
                if (flag === lastFlag && same < 255) {
                    flags[flags.length - 1] |= $807e58506be70005$var$REPEAT;
                    same++;
                } else {
                    if (same > 0) {
                        flags.push(same);
                        same = 0;
                    }
                    flags.push(flag);
                    lastFlag = flag;
                }
                lastX = x;
                lastY = y;
                pointCount++;
            }
            if (c.command === 'closePath') endPtsOfContours.push(pointCount - 1);
        }
        // Close the path if the last command didn't already
        if (path.commands.length > 1 && path.commands[path.commands.length - 1].command !== 'closePath') endPtsOfContours.push(pointCount - 1);
        let bbox = path.bbox;
        let glyf = {
            numberOfContours: endPtsOfContours.length,
            xMin: bbox.minX,
            yMin: bbox.minY,
            xMax: bbox.maxX,
            yMax: bbox.maxY,
            endPtsOfContours: endPtsOfContours,
            instructions: instructions,
            flags: flags,
            xPoints: xPoints,
            yPoints: yPoints
        };
        let size = $807e58506be70005$var$Glyf.size(glyf);
        let tail = 4 - size % 4;
        let stream = new $6uUbQ$EncodeStream(size + tail);
        $807e58506be70005$var$Glyf.encode(stream, glyf);
        // Align to 4-byte length
        if (tail !== 0) stream.fill(0, tail);
        return stream.buffer;
    }
    _encodePoint(value, last, points, flag, shortFlag, sameFlag) {
        let diff = value - last;
        if (value === last) flag |= sameFlag;
        else {
            if (-255 <= diff && diff <= 255) {
                flag |= shortFlag;
                if (diff < 0) diff = -diff;
                else flag |= sameFlag;
            }
            points.push(diff);
        }
        return flag;
    }
}


class $4abbb6a5dbdc441a$export$2e2bcd8739ae039 extends (0, $5cc7476da92df375$export$2e2bcd8739ae039) {
    _addGlyph(gid) {
        let glyph = this.font.getGlyph(gid);
        let glyf = glyph._decode();
        // get the offset to the glyph from the loca table
        let curOffset = this.font.loca.offsets[gid];
        let nextOffset = this.font.loca.offsets[gid + 1];
        let stream = this.font._getTableStream('glyf');
        stream.pos += curOffset;
        let buffer = stream.readBuffer(nextOffset - curOffset);
        // if it is a compound glyph, include its components
        if (glyf && glyf.numberOfContours < 0) {
            buffer = new Uint8Array(buffer);
            let view = new DataView(buffer.buffer);
            for (let component of glyf.components){
                gid = this.includeGlyph(component.glyphID);
                view.setUint16(component.pos, gid);
            }
        } else if (glyf && this.font._variationProcessor) // If this is a TrueType variation glyph, re-encode the path
        buffer = this.glyphEncoder.encodeSimple(glyph.path, glyf.instructions);
        this.glyf.push(buffer);
        this.loca.offsets.push(this.offset);
        this.hmtx.metrics.push({
            advance: glyph.advanceWidth,
            bearing: glyph._getMetrics().leftBearing
        });
        this.offset += buffer.length;
        return this.glyf.length - 1;
    }
    encode() {
        // tables required by PDF spec:
        //   head, hhea, loca, maxp, cvt , prep, glyf, hmtx, fpgm
        //
        // additional tables required for standalone fonts:
        //   name, cmap, OS/2, post
        this.glyf = [];
        this.offset = 0;
        this.loca = {
            offsets: [],
            version: this.font.loca.version
        };
        this.hmtx = {
            metrics: [],
            bearings: []
        };
        // include all the glyphs
        // not using a for loop because we need to support adding more
        // glyphs to the array as we go, and CoffeeScript caches the length.
        let i = 0;
        while(i < this.glyphs.length)this._addGlyph(this.glyphs[i++]);
        let maxp = (0, $6uUbQ$clone)(this.font.maxp);
        maxp.numGlyphs = this.glyf.length;
        this.loca.offsets.push(this.offset);
        let head = (0, $6uUbQ$clone)(this.font.head);
        head.indexToLocFormat = this.loca.version;
        let hhea = (0, $6uUbQ$clone)(this.font.hhea);
        hhea.numberOfMetrics = this.hmtx.metrics.length;
        // map = []
        // for index in [0...256]
        //     if index < @numGlyphs
        //         map[index] = index
        //     else
        //         map[index] = 0
        //
        // cmapTable =
        //     version: 0
        //     length: 262
        //     language: 0
        //     codeMap: map
        //
        // cmap =
        //     version: 0
        //     numSubtables: 1
        //     tables: [
        //         platformID: 1
        //         encodingID: 0
        //         table: cmapTable
        //     ]
        // TODO: subset prep, cvt, fpgm?
        return (0, $816c07a04b6dba87$export$2e2bcd8739ae039).toBuffer({
            tables: {
                head: head,
                hhea: hhea,
                loca: this.loca,
                maxp: maxp,
                'cvt ': this.font['cvt '],
                prep: this.font.prep,
                glyf: this.glyf,
                hmtx: this.hmtx,
                fpgm: this.font.fpgm
            }
        });
    }
    constructor(font){
        super(font);
        this.glyphEncoder = new (0, $807e58506be70005$export$2e2bcd8739ae039);
    }
}






class $001d739428a71d5a$export$2e2bcd8739ae039 extends (0, $5cc7476da92df375$export$2e2bcd8739ae039) {
    subsetCharstrings() {
        this.charstrings = [];
        let gsubrs = {};
        for (let gid of this.glyphs){
            this.charstrings.push(this.cff.getCharString(gid));
            let glyph = this.font.getGlyph(gid);
            let path = glyph.path; // this causes the glyph to be parsed
            for(let subr in glyph._usedGsubrs)gsubrs[subr] = true;
        }
        this.gsubrs = this.subsetSubrs(this.cff.globalSubrIndex, gsubrs);
    }
    subsetSubrs(subrs, used) {
        let res = [];
        for(let i = 0; i < subrs.length; i++){
            let subr = subrs[i];
            if (used[i]) {
                this.cff.stream.pos = subr.offset;
                res.push(this.cff.stream.readBuffer(subr.length));
            } else res.push(new Uint8Array([
                11
            ])); // return
        }
        return res;
    }
    subsetFontdict(topDict) {
        topDict.FDArray = [];
        topDict.FDSelect = {
            version: 0,
            fds: []
        };
        let used_fds = {};
        let used_subrs = [];
        let fd_select = {};
        for (let gid of this.glyphs){
            let fd = this.cff.fdForGlyph(gid);
            if (fd == null) continue;
            if (!used_fds[fd]) {
                topDict.FDArray.push(Object.assign({}, this.cff.topDict.FDArray[fd]));
                used_subrs.push({});
                fd_select[fd] = topDict.FDArray.length - 1;
            }
            used_fds[fd] = true;
            topDict.FDSelect.fds.push(fd_select[fd]);
            let glyph = this.font.getGlyph(gid);
            let path = glyph.path; // this causes the glyph to be parsed
            for(let subr in glyph._usedSubrs)used_subrs[fd_select[fd]][subr] = true;
        }
        for(let i = 0; i < topDict.FDArray.length; i++){
            let dict = topDict.FDArray[i];
            delete dict.FontName;
            if (dict.Private && dict.Private.Subrs) {
                dict.Private = Object.assign({}, dict.Private);
                dict.Private.Subrs = this.subsetSubrs(dict.Private.Subrs, used_subrs[i]);
            }
        }
        return;
    }
    createCIDFontdict(topDict) {
        let used_subrs = {};
        for (let gid of this.glyphs){
            let glyph = this.font.getGlyph(gid);
            let path = glyph.path; // this causes the glyph to be parsed
            for(let subr in glyph._usedSubrs)used_subrs[subr] = true;
        }
        let privateDict = Object.assign({}, this.cff.topDict.Private);
        if (this.cff.topDict.Private && this.cff.topDict.Private.Subrs) privateDict.Subrs = this.subsetSubrs(this.cff.topDict.Private.Subrs, used_subrs);
        topDict.FDArray = [
            {
                Private: privateDict
            }
        ];
        return topDict.FDSelect = {
            version: 3,
            nRanges: 1,
            ranges: [
                {
                    first: 0,
                    fd: 0
                }
            ],
            sentinel: this.charstrings.length
        };
    }
    addString(string) {
        if (!string) return null;
        if (!this.strings) this.strings = [];
        this.strings.push(string);
        return (0, $229224aec43783c5$export$2e2bcd8739ae039).length + this.strings.length - 1;
    }
    encode() {
        this.subsetCharstrings();
        let charset = {
            version: this.charstrings.length > 255 ? 2 : 1,
            ranges: [
                {
                    first: 1,
                    nLeft: this.charstrings.length - 2
                }
            ]
        };
        let topDict = Object.assign({}, this.cff.topDict);
        topDict.Private = null;
        topDict.charset = charset;
        topDict.Encoding = null;
        topDict.CharStrings = this.charstrings;
        for (let key of [
            'version',
            'Notice',
            'Copyright',
            'FullName',
            'FamilyName',
            'Weight',
            'PostScript',
            'BaseFontName',
            'FontName'
        ])topDict[key] = this.addString(this.cff.string(topDict[key]));
        topDict.ROS = [
            this.addString('Adobe'),
            this.addString('Identity'),
            0
        ];
        topDict.CIDCount = this.charstrings.length;
        if (this.cff.isCIDFont) this.subsetFontdict(topDict);
        else this.createCIDFontdict(topDict);
        let top = {
            version: 1,
            hdrSize: this.cff.hdrSize,
            offSize: 4,
            header: this.cff.header,
            nameIndex: [
                this.cff.postscriptName
            ],
            topDictIndex: [
                topDict
            ],
            stringIndex: this.strings,
            globalSubrIndex: this.gsubrs
        };
        return (0, $b84fd3dd9d8eddb2$export$2e2bcd8739ae039).toBuffer(top);
    }
    constructor(font){
        super(font);
        this.cff = this.font['CFF '];
        if (!this.cff) throw new Error('Not a CFF Font');
    }
}




class $4c1709dee528ea76$export$2e2bcd8739ae039 {
    static probe(buffer) {
        let format = (0, $12727730ddfc8bfe$export$3d28c1996ced1f14).decode(buffer.slice(0, 4));
        return format === 'true' || format === 'OTTO' || format === String.fromCharCode(0, 1, 0, 0);
    }
    setDefaultLanguage(lang = null) {
        this.defaultLanguage = lang;
    }
    _getTable(table) {
        if (!(table.tag in this._tables)) try {
            this._tables[table.tag] = this._decodeTable(table);
        } catch (e) {
            if ($d636bc798e7178db$export$bd5c5d8b8dcafd78) {
                console.error(`Error decoding table ${table.tag}`);
                console.error(e.stack);
            }
        }
        return this._tables[table.tag];
    }
    _getTableStream(tag) {
        let table = this.directory.tables[tag];
        if (table) {
            this.stream.pos = table.offset;
            return this.stream;
        }
        return null;
    }
    _decodeDirectory() {
        return this.directory = (0, $816c07a04b6dba87$export$2e2bcd8739ae039).decode(this.stream, {
            _startOffset: 0
        });
    }
    _decodeTable(table) {
        let pos = this.stream.pos;
        let stream = this._getTableStream(table.tag);
        let result = (0, $c3395722bea751e2$export$2e2bcd8739ae039)[table.tag].decode(stream, this, table.length);
        this.stream.pos = pos;
        return result;
    }
    /**
   * Gets a string from the font's `name` table
   * `lang` is a BCP-47 language code.
   * @return {string}
   */ getName(key, lang = this.defaultLanguage || $d636bc798e7178db$export$42940898df819940) {
        let record = this.name && this.name.records[key];
        if (record) // Attempt to retrieve the entry, depending on which translation is available:
        return record[lang] || record[this.defaultLanguage] || record[$d636bc798e7178db$export$42940898df819940] || record['en'] || record[Object.keys(record)[0]] // Seriously, ANY language would be fine
         || null;
        return null;
    }
    /**
   * The unique PostScript name for this font, e.g. "Helvetica-Bold"
   * @type {string}
   */ get postscriptName() {
        return this.getName('postscriptName');
    }
    /**
   * The font's full name, e.g. "Helvetica Bold"
   * @type {string}
   */ get fullName() {
        return this.getName('fullName');
    }
    /**
   * The font's family name, e.g. "Helvetica"
   * @type {string}
   */ get familyName() {
        return this.getName('fontFamily');
    }
    /**
   * The font's sub-family, e.g. "Bold".
   * @type {string}
   */ get subfamilyName() {
        return this.getName('fontSubfamily');
    }
    /**
   * The font's copyright information
   * @type {string}
   */ get copyright() {
        return this.getName('copyright');
    }
    /**
   * The font's version number
   * @type {string}
   */ get version() {
        return this.getName('version');
    }
    /**
   * The font’s [ascender](https://en.wikipedia.org/wiki/Ascender_(typography))
   * @type {number}
   */ get ascent() {
        return this.hhea.ascent;
    }
    /**
   * The font’s [descender](https://en.wikipedia.org/wiki/Descender)
   * @type {number}
   */ get descent() {
        return this.hhea.descent;
    }
    /**
   * The amount of space that should be included between lines
   * @type {number}
   */ get lineGap() {
        return this.hhea.lineGap;
    }
    /**
   * The offset from the normal underline position that should be used
   * @type {number}
   */ get underlinePosition() {
        return this.post.underlinePosition;
    }
    /**
   * The weight of the underline that should be used
   * @type {number}
   */ get underlineThickness() {
        return this.post.underlineThickness;
    }
    /**
   * If this is an italic font, the angle the cursor should be drawn at to match the font design
   * @type {number}
   */ get italicAngle() {
        return this.post.italicAngle;
    }
    /**
   * The height of capital letters above the baseline.
   * See [here](https://en.wikipedia.org/wiki/Cap_height) for more details.
   * @type {number}
   */ get capHeight() {
        let os2 = this['OS/2'];
        return os2 ? os2.capHeight : this.ascent;
    }
    /**
   * The height of lower case letters in the font.
   * See [here](https://en.wikipedia.org/wiki/X-height) for more details.
   * @type {number}
   */ get xHeight() {
        let os2 = this['OS/2'];
        return os2 ? os2.xHeight : 0;
    }
    /**
   * The number of glyphs in the font.
   * @type {number}
   */ get numGlyphs() {
        return this.maxp.numGlyphs;
    }
    /**
   * The size of the font’s internal coordinate grid
   * @type {number}
   */ get unitsPerEm() {
        return this.head.unitsPerEm;
    }
    /**
   * The font’s bounding box, i.e. the box that encloses all glyphs in the font.
   * @type {BBox}
   */ get bbox() {
        return Object.freeze(new (0, $f34600ab9d7f70d8$export$2e2bcd8739ae039)(this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax));
    }
    get _cmapProcessor() {
        return new (0, $f08dd41ef10b694c$export$2e2bcd8739ae039)(this.cmap);
    }
    /**
   * An array of all of the unicode code points supported by the font.
   * @type {number[]}
   */ get characterSet() {
        return this._cmapProcessor.getCharacterSet();
    }
    /**
   * Returns whether there is glyph in the font for the given unicode code point.
   *
   * @param {number} codePoint
   * @return {boolean}
   */ hasGlyphForCodePoint(codePoint) {
        return !!this._cmapProcessor.lookup(codePoint);
    }
    /**
   * Maps a single unicode code point to a Glyph object.
   * Does not perform any advanced substitutions (there is no context to do so).
   *
   * @param {number} codePoint
   * @return {Glyph}
   */ glyphForCodePoint(codePoint) {
        return this.getGlyph(this._cmapProcessor.lookup(codePoint), [
            codePoint
        ]);
    }
    /**
   * Returns an array of Glyph objects for the given string.
   * This is only a one-to-one mapping from characters to glyphs.
   * For most uses, you should use font.layout (described below), which
   * provides a much more advanced mapping supporting AAT and OpenType shaping.
   *
   * @param {string} string
   * @return {Glyph[]}
   */ glyphsForString(string) {
        let glyphs = [];
        let len = string.length;
        let idx = 0;
        let last = -1;
        let state = -1;
        while(idx <= len){
            let code = 0;
            let nextState = 0;
            if (idx < len) {
                // Decode the next codepoint from UTF 16
                code = string.charCodeAt(idx++);
                if (0xd800 <= code && code <= 0xdbff && idx < len) {
                    let next = string.charCodeAt(idx);
                    if (0xdc00 <= next && next <= 0xdfff) {
                        idx++;
                        code = ((code & 0x3ff) << 10) + (next & 0x3ff) + 0x10000;
                    }
                }
                // Compute the next state: 1 if the next codepoint is a variation selector, 0 otherwise.
                nextState = 0xfe00 <= code && code <= 0xfe0f || 0xe0100 <= code && code <= 0xe01ef ? 1 : 0;
            } else idx++;
            if (state === 0 && nextState === 1) // Variation selector following normal codepoint.
            glyphs.push(this.getGlyph(this._cmapProcessor.lookup(last, code), [
                last,
                code
            ]));
            else if (state === 0 && nextState === 0) // Normal codepoint following normal codepoint.
            glyphs.push(this.glyphForCodePoint(last));
            last = code;
            state = nextState;
        }
        return glyphs;
    }
    get _layoutEngine() {
        return new (0, $4c0a7fa5df7a9ab1$export$2e2bcd8739ae039)(this);
    }
    /**
   * Returns a GlyphRun object, which includes an array of Glyphs and GlyphPositions for the given string.
   *
   * @param {string} string
   * @param {string[]} [userFeatures]
   * @param {string} [script]
   * @param {string} [language]
   * @param {string} [direction]
   * @return {GlyphRun}
   */ layout(string, userFeatures, script, language, direction) {
        return this._layoutEngine.layout(string, userFeatures, script, language, direction);
    }
    /**
   * Returns an array of strings that map to the given glyph id.
   * @param {number} gid - glyph id
   */ stringsForGlyph(gid) {
        return this._layoutEngine.stringsForGlyph(gid);
    }
    /**
   * An array of all [OpenType feature tags](https://www.microsoft.com/typography/otspec/featuretags.htm)
   * (or mapped AAT tags) supported by the font.
   * The features parameter is an array of OpenType feature tags to be applied in addition to the default set.
   * If this is an AAT font, the OpenType feature tags are mapped to AAT features.
   *
   * @type {string[]}
   */ get availableFeatures() {
        return this._layoutEngine.getAvailableFeatures();
    }
    getAvailableFeatures(script, language) {
        return this._layoutEngine.getAvailableFeatures(script, language);
    }
    _getBaseGlyph(glyph, characters = []) {
        if (!this._glyphs[glyph]) {
            if (this.directory.tables.glyf) this._glyphs[glyph] = new (0, $69aac16029968692$export$2e2bcd8739ae039)(glyph, characters, this);
            else if (this.directory.tables['CFF '] || this.directory.tables.CFF2) this._glyphs[glyph] = new (0, $62cc5109c6101893$export$2e2bcd8739ae039)(glyph, characters, this);
        }
        return this._glyphs[glyph] || null;
    }
    /**
   * Returns a glyph object for the given glyph id.
   * You can pass the array of code points this glyph represents for
   * your use later, and it will be stored in the glyph object.
   *
   * @param {number} glyph
   * @param {number[]} characters
   * @return {Glyph}
   */ getGlyph(glyph, characters = []) {
        if (!this._glyphs[glyph]) {
            if (this.directory.tables.sbix) this._glyphs[glyph] = new (0, $25d8f049c222084c$export$2e2bcd8739ae039)(glyph, characters, this);
            else if (this.directory.tables.COLR && this.directory.tables.CPAL) this._glyphs[glyph] = new (0, $0d411f0165859681$export$2e2bcd8739ae039)(glyph, characters, this);
            else this._getBaseGlyph(glyph, characters);
        }
        return this._glyphs[glyph] || null;
    }
    /**
   * Returns a Subset for this font.
   * @return {Subset}
   */ createSubset() {
        if (this.directory.tables['CFF ']) return new (0, $001d739428a71d5a$export$2e2bcd8739ae039)(this);
        return new (0, $4abbb6a5dbdc441a$export$2e2bcd8739ae039)(this);
    }
    /**
   * Returns an object describing the available variation axes
   * that this font supports. Keys are setting tags, and values
   * contain the axis name, range, and default value.
   *
   * @type {object}
   */ get variationAxes() {
        let res = {};
        if (!this.fvar) return res;
        for (let axis of this.fvar.axis)res[axis.axisTag.trim()] = {
            name: axis.name.en,
            min: axis.minValue,
            default: axis.defaultValue,
            max: axis.maxValue
        };
        return res;
    }
    /**
   * Returns an object describing the named variation instances
   * that the font designer has specified. Keys are variation names
   * and values are the variation settings for this instance.
   *
   * @type {object}
   */ get namedVariations() {
        let res = {};
        if (!this.fvar) return res;
        for (let instance of this.fvar.instance){
            let settings = {};
            for(let i = 0; i < this.fvar.axis.length; i++){
                let axis = this.fvar.axis[i];
                settings[axis.axisTag.trim()] = instance.coord[i];
            }
            res[instance.name.en] = settings;
        }
        return res;
    }
    /**
   * Returns a new font with the given variation settings applied.
   * Settings can either be an instance name, or an object containing
   * variation tags as specified by the `variationAxes` property.
   *
   * @param {object} settings
   * @return {TTFFont}
   */ getVariation(settings) {
        if (!(this.directory.tables.fvar && (this.directory.tables.gvar && this.directory.tables.glyf || this.directory.tables.CFF2))) throw new Error('Variations require a font with the fvar, gvar and glyf, or CFF2 tables.');
        if (typeof settings === 'string') settings = this.namedVariations[settings];
        if (typeof settings !== 'object') throw new Error('Variation settings must be either a variation name or settings object.');
        // normalize the coordinates
        let coords = this.fvar.axis.map((axis, i)=>{
            let axisTag = axis.axisTag.trim();
            if (axisTag in settings) return Math.max(axis.minValue, Math.min(axis.maxValue, settings[axisTag]));
            else return axis.defaultValue;
        });
        let stream = new $6uUbQ$DecodeStream(this.stream.buffer);
        stream.pos = this._directoryPos;
        let font = new $4c1709dee528ea76$export$2e2bcd8739ae039(stream, coords);
        font._tables = this._tables;
        return font;
    }
    get _variationProcessor() {
        if (!this.fvar) return null;
        let variationCoords = this.variationCoords;
        // Ignore if no variation coords and not CFF2
        if (!variationCoords && !this.CFF2) return null;
        if (!variationCoords) variationCoords = this.fvar.axis.map((axis)=>axis.defaultValue);
        return new (0, $0bb840cac04e911b$export$2e2bcd8739ae039)(this, variationCoords);
    }
    // Standardized format plugin API
    getFont(name) {
        return this.getVariation(name);
    }
    constructor(stream, variationCoords = null){
        (0, $6uUbQ$_)(this, "type", 'TTF');
        this.defaultLanguage = null;
        this.stream = stream;
        this.variationCoords = variationCoords;
        this._directoryPos = this.stream.pos;
        this._tables = {};
        this._glyphs = {};
        this._decodeDirectory();
        // define properties for each table to lazily parse
        for(let tag in this.directory.tables){
            let table = this.directory.tables[tag];
            if ((0, $c3395722bea751e2$export$2e2bcd8739ae039)[tag] && table.length > 0) Object.defineProperty(this, tag, {
                get: this._getTable.bind(this, table)
            });
        }
    }
}
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "bbox", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "_cmapProcessor", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "characterSet", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "_layoutEngine", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "variationAxes", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "namedVariations", null);
(0, $6uUbQ$_1)([
    (0, $e71565f2ce09cb6b$export$69a3209f1a06c04d)
], $4c1709dee528ea76$export$2e2bcd8739ae039.prototype, "_variationProcessor", null);






let $c1726355ecc5b889$var$WOFFDirectoryEntry = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    offset: new $6uUbQ$Pointer($6uUbQ$uint32, 'void', {
        type: 'global'
    }),
    compLength: $6uUbQ$uint32,
    length: $6uUbQ$uint32,
    origChecksum: $6uUbQ$uint32
});
let $c1726355ecc5b889$var$WOFFDirectory = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    flavor: $6uUbQ$uint32,
    length: $6uUbQ$uint32,
    numTables: $6uUbQ$uint16,
    reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
    totalSfntSize: $6uUbQ$uint32,
    majorVersion: $6uUbQ$uint16,
    minorVersion: $6uUbQ$uint16,
    metaOffset: $6uUbQ$uint32,
    metaLength: $6uUbQ$uint32,
    metaOrigLength: $6uUbQ$uint32,
    privOffset: $6uUbQ$uint32,
    privLength: $6uUbQ$uint32,
    tables: new $6uUbQ$Array($c1726355ecc5b889$var$WOFFDirectoryEntry, 'numTables')
});
$c1726355ecc5b889$var$WOFFDirectory.process = function() {
    let tables = {};
    for (let table of this.tables)tables[table.tag] = table;
    this.tables = tables;
};
var $c1726355ecc5b889$export$2e2bcd8739ae039 = $c1726355ecc5b889$var$WOFFDirectory;






class $760785214b9fc52c$export$2e2bcd8739ae039 extends (0, $4c1709dee528ea76$export$2e2bcd8739ae039) {
    static probe(buffer) {
        return (0, $12727730ddfc8bfe$export$3d28c1996ced1f14).decode(buffer.slice(0, 4)) === 'wOFF';
    }
    _decodeDirectory() {
        this.directory = (0, $c1726355ecc5b889$export$2e2bcd8739ae039).decode(this.stream, {
            _startOffset: 0
        });
    }
    _getTableStream(tag) {
        let table = this.directory.tables[tag];
        if (table) {
            this.stream.pos = table.offset;
            if (table.compLength < table.length) {
                this.stream.pos += 2; // skip deflate header
                let outBuffer = new Uint8Array(table.length);
                let buf = (0, $6uUbQ$tinyinflate)(this.stream.readBuffer(table.compLength - 2), outBuffer);
                return new $6uUbQ$DecodeStream(buf);
            } else return this.stream;
        }
        return null;
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'WOFF');
    }
}









class $8046190c9f1ad19e$export$2e2bcd8739ae039 extends (0, $69aac16029968692$export$2e2bcd8739ae039) {
    _decode() {
        // We have to decode in advance (in WOFF2Font), so just return the pre-decoded data.
        return this._font._transformedGlyphs[this.id];
    }
    _getCBox() {
        return this.path.bbox;
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'WOFF2');
    }
}



const $c28ec7bbb3b8de3a$var$Base128 = {
    decode (stream) {
        let result = 0;
        let iterable = [
            0,
            1,
            2,
            3,
            4
        ];
        for(let j = 0; j < iterable.length; j++){
            let i = iterable[j];
            let code = stream.readUInt8();
            // If any of the top seven bits are set then we're about to overflow.
            if (result & 0xe0000000) throw new Error('Overflow');
            result = result << 7 | code & 0x7f;
            if ((code & 0x80) === 0) return result;
        }
        throw new Error('Bad base 128 number');
    }
};
let $c28ec7bbb3b8de3a$var$knownTags = [
    'cmap',
    'head',
    'hhea',
    'hmtx',
    'maxp',
    'name',
    'OS/2',
    'post',
    'cvt ',
    'fpgm',
    'glyf',
    'loca',
    'prep',
    'CFF ',
    'VORG',
    'EBDT',
    'EBLC',
    'gasp',
    'hdmx',
    'kern',
    'LTSH',
    'PCLT',
    'VDMX',
    'vhea',
    'vmtx',
    'BASE',
    'GDEF',
    'GPOS',
    'GSUB',
    'EBSC',
    'JSTF',
    'MATH',
    'CBDT',
    'CBLC',
    'COLR',
    'CPAL',
    'SVG ',
    'sbix',
    'acnt',
    'avar',
    'bdat',
    'bloc',
    'bsln',
    'cvar',
    'fdsc',
    'feat',
    'fmtx',
    'fvar',
    'gvar',
    'hsty',
    'just',
    'lcar',
    'mort',
    'morx',
    'opbd',
    'prop',
    'trak',
    'Zapf',
    'Silf',
    'Glat',
    'Gloc',
    'Feat',
    'Sill'
];
let $c28ec7bbb3b8de3a$var$WOFF2DirectoryEntry = new $6uUbQ$Struct({
    flags: $6uUbQ$uint8,
    customTag: new $6uUbQ$Optional(new $6uUbQ$String(4), (t)=>(t.flags & 0x3f) === 0x3f),
    tag: (t)=>t.customTag || $c28ec7bbb3b8de3a$var$knownTags[t.flags & 0x3f],
    length: $c28ec7bbb3b8de3a$var$Base128,
    transformVersion: (t)=>t.flags >>> 6 & 0x03,
    transformed: (t)=>t.tag === 'glyf' || t.tag === 'loca' ? t.transformVersion === 0 : t.transformVersion !== 0,
    transformLength: new $6uUbQ$Optional($c28ec7bbb3b8de3a$var$Base128, (t)=>t.transformed)
});
let $c28ec7bbb3b8de3a$var$WOFF2Directory = new $6uUbQ$Struct({
    tag: new $6uUbQ$String(4),
    flavor: $6uUbQ$uint32,
    length: $6uUbQ$uint32,
    numTables: $6uUbQ$uint16,
    reserved: new $6uUbQ$Reserved($6uUbQ$uint16),
    totalSfntSize: $6uUbQ$uint32,
    totalCompressedSize: $6uUbQ$uint32,
    majorVersion: $6uUbQ$uint16,
    minorVersion: $6uUbQ$uint16,
    metaOffset: $6uUbQ$uint32,
    metaLength: $6uUbQ$uint32,
    metaOrigLength: $6uUbQ$uint32,
    privOffset: $6uUbQ$uint32,
    privLength: $6uUbQ$uint32,
    tables: new $6uUbQ$Array($c28ec7bbb3b8de3a$var$WOFF2DirectoryEntry, 'numTables')
});
$c28ec7bbb3b8de3a$var$WOFF2Directory.process = function() {
    let tables = {};
    for(let i = 0; i < this.tables.length; i++){
        let table = this.tables[i];
        tables[table.tag] = table;
    }
    return this.tables = tables;
};
var $c28ec7bbb3b8de3a$export$2e2bcd8739ae039 = $c28ec7bbb3b8de3a$var$WOFF2Directory;



class $21ee218f84ac7f32$export$2e2bcd8739ae039 extends (0, $4c1709dee528ea76$export$2e2bcd8739ae039) {
    static probe(buffer) {
        return (0, $12727730ddfc8bfe$export$3d28c1996ced1f14).decode(buffer.slice(0, 4)) === 'wOF2';
    }
    _decodeDirectory() {
        this.directory = (0, $c28ec7bbb3b8de3a$export$2e2bcd8739ae039).decode(this.stream);
        this._dataPos = this.stream.pos;
    }
    _decompress() {
        // decompress data and setup table offsets if we haven't already
        if (!this._decompressed) {
            this.stream.pos = this._dataPos;
            let buffer = this.stream.readBuffer(this.directory.totalCompressedSize);
            let decompressedSize = 0;
            for(let tag in this.directory.tables){
                let entry = this.directory.tables[tag];
                entry.offset = decompressedSize;
                decompressedSize += entry.transformLength != null ? entry.transformLength : entry.length;
            }
            let decompressed = (0, $6uUbQ$brotlidecompressjs)(buffer, decompressedSize);
            if (!decompressed) throw new Error('Error decoding compressed data in WOFF2');
            this.stream = new $6uUbQ$DecodeStream(decompressed);
            this._decompressed = true;
        }
    }
    _decodeTable(table) {
        this._decompress();
        return super._decodeTable(table);
    }
    // Override this method to get a glyph and return our
    // custom subclass if there is a glyf table.
    _getBaseGlyph(glyph, characters = []) {
        if (!this._glyphs[glyph]) {
            if (this.directory.tables.glyf && this.directory.tables.glyf.transformed) {
                if (!this._transformedGlyphs) this._transformGlyfTable();
                return this._glyphs[glyph] = new (0, $8046190c9f1ad19e$export$2e2bcd8739ae039)(glyph, characters, this);
            } else return super._getBaseGlyph(glyph, characters);
        }
    }
    _transformGlyfTable() {
        this._decompress();
        this.stream.pos = this.directory.tables.glyf.offset;
        let table = $21ee218f84ac7f32$var$GlyfTable.decode(this.stream);
        let glyphs = [];
        for(let index = 0; index < table.numGlyphs; index++){
            let glyph = {};
            let nContours = table.nContours.readInt16BE();
            glyph.numberOfContours = nContours;
            if (nContours > 0) {
                let nPoints = [];
                let totalPoints = 0;
                for(let i = 0; i < nContours; i++){
                    let r = $21ee218f84ac7f32$var$read255UInt16(table.nPoints);
                    totalPoints += r;
                    nPoints.push(totalPoints);
                }
                glyph.points = $21ee218f84ac7f32$var$decodeTriplet(table.flags, table.glyphs, totalPoints);
                for(let i = 0; i < nContours; i++)glyph.points[nPoints[i] - 1].endContour = true;
                var instructionSize = $21ee218f84ac7f32$var$read255UInt16(table.glyphs);
            } else if (nContours < 0) {
                let haveInstructions = (0, $69aac16029968692$export$2e2bcd8739ae039).prototype._decodeComposite.call({
                    _font: this
                }, glyph, table.composites);
                if (haveInstructions) var instructionSize = $21ee218f84ac7f32$var$read255UInt16(table.glyphs);
            }
            glyphs.push(glyph);
        }
        this._transformedGlyphs = glyphs;
    }
    constructor(...args){
        super(...args);
        (0, $6uUbQ$_)(this, "type", 'WOFF2');
    }
}
// Special class that accepts a length and returns a sub-stream for that data
class $21ee218f84ac7f32$var$Substream {
    decode(stream, parent) {
        return new $6uUbQ$DecodeStream(this._buf.decode(stream, parent));
    }
    constructor(length){
        this.length = length;
        this._buf = new $6uUbQ$Buffer(length);
    }
}
// This struct represents the entire glyf table
let $21ee218f84ac7f32$var$GlyfTable = new $6uUbQ$Struct({
    version: $6uUbQ$uint32,
    numGlyphs: $6uUbQ$uint16,
    indexFormat: $6uUbQ$uint16,
    nContourStreamSize: $6uUbQ$uint32,
    nPointsStreamSize: $6uUbQ$uint32,
    flagStreamSize: $6uUbQ$uint32,
    glyphStreamSize: $6uUbQ$uint32,
    compositeStreamSize: $6uUbQ$uint32,
    bboxStreamSize: $6uUbQ$uint32,
    instructionStreamSize: $6uUbQ$uint32,
    nContours: new $21ee218f84ac7f32$var$Substream('nContourStreamSize'),
    nPoints: new $21ee218f84ac7f32$var$Substream('nPointsStreamSize'),
    flags: new $21ee218f84ac7f32$var$Substream('flagStreamSize'),
    glyphs: new $21ee218f84ac7f32$var$Substream('glyphStreamSize'),
    composites: new $21ee218f84ac7f32$var$Substream('compositeStreamSize'),
    bboxes: new $21ee218f84ac7f32$var$Substream('bboxStreamSize'),
    instructions: new $21ee218f84ac7f32$var$Substream('instructionStreamSize')
});
const $21ee218f84ac7f32$var$WORD_CODE = 253;
const $21ee218f84ac7f32$var$ONE_MORE_BYTE_CODE2 = 254;
const $21ee218f84ac7f32$var$ONE_MORE_BYTE_CODE1 = 255;
const $21ee218f84ac7f32$var$LOWEST_U_CODE = 253;
function $21ee218f84ac7f32$var$read255UInt16(stream) {
    let code = stream.readUInt8();
    if (code === $21ee218f84ac7f32$var$WORD_CODE) return stream.readUInt16BE();
    if (code === $21ee218f84ac7f32$var$ONE_MORE_BYTE_CODE1) return stream.readUInt8() + $21ee218f84ac7f32$var$LOWEST_U_CODE;
    if (code === $21ee218f84ac7f32$var$ONE_MORE_BYTE_CODE2) return stream.readUInt8() + $21ee218f84ac7f32$var$LOWEST_U_CODE * 2;
    return code;
}
function $21ee218f84ac7f32$var$withSign(flag, baseval) {
    return flag & 1 ? baseval : -baseval;
}
function $21ee218f84ac7f32$var$decodeTriplet(flags, glyphs, nPoints) {
    let y;
    let x = y = 0;
    let res = [];
    for(let i = 0; i < nPoints; i++){
        let dx = 0, dy = 0;
        let flag = flags.readUInt8();
        let onCurve = !(flag >> 7);
        flag &= 0x7f;
        if (flag < 10) {
            dx = 0;
            dy = $21ee218f84ac7f32$var$withSign(flag, ((flag & 14) << 7) + glyphs.readUInt8());
        } else if (flag < 20) {
            dx = $21ee218f84ac7f32$var$withSign(flag, ((flag - 10 & 14) << 7) + glyphs.readUInt8());
            dy = 0;
        } else if (flag < 84) {
            var b0 = flag - 20;
            var b1 = glyphs.readUInt8();
            dx = $21ee218f84ac7f32$var$withSign(flag, 1 + (b0 & 0x30) + (b1 >> 4));
            dy = $21ee218f84ac7f32$var$withSign(flag >> 1, 1 + ((b0 & 0x0c) << 2) + (b1 & 0x0f));
        } else if (flag < 120) {
            var b0 = flag - 84;
            dx = $21ee218f84ac7f32$var$withSign(flag, 1 + (b0 / 12 << 8) + glyphs.readUInt8());
            dy = $21ee218f84ac7f32$var$withSign(flag >> 1, 1 + (b0 % 12 >> 2 << 8) + glyphs.readUInt8());
        } else if (flag < 124) {
            var b1 = glyphs.readUInt8();
            let b2 = glyphs.readUInt8();
            dx = $21ee218f84ac7f32$var$withSign(flag, (b1 << 4) + (b2 >> 4));
            dy = $21ee218f84ac7f32$var$withSign(flag >> 1, ((b2 & 0x0f) << 8) + glyphs.readUInt8());
        } else {
            dx = $21ee218f84ac7f32$var$withSign(flag, glyphs.readUInt16BE());
            dy = $21ee218f84ac7f32$var$withSign(flag >> 1, glyphs.readUInt16BE());
        }
        x += dx;
        y += dy;
        res.push(new (0, $69aac16029968692$export$baf26146a414f24a)(onCurve, false, x, y));
    }
    return res;
}








let $cd5853a56c68fec7$var$TTCHeader = new $6uUbQ$VersionedStruct($6uUbQ$uint32, {
    0x00010000: {
        numFonts: $6uUbQ$uint32,
        offsets: new $6uUbQ$Array($6uUbQ$uint32, 'numFonts')
    },
    0x00020000: {
        numFonts: $6uUbQ$uint32,
        offsets: new $6uUbQ$Array($6uUbQ$uint32, 'numFonts'),
        dsigTag: $6uUbQ$uint32,
        dsigLength: $6uUbQ$uint32,
        dsigOffset: $6uUbQ$uint32
    }
});
class $cd5853a56c68fec7$export$2e2bcd8739ae039 {
    static probe(buffer) {
        return (0, $12727730ddfc8bfe$export$3d28c1996ced1f14).decode(buffer.slice(0, 4)) === 'ttcf';
    }
    getFont(name) {
        for (let offset of this.header.offsets){
            let stream = new $6uUbQ$DecodeStream(this.stream.buffer);
            stream.pos = offset;
            let font = new (0, $4c1709dee528ea76$export$2e2bcd8739ae039)(stream);
            if (font.postscriptName === name || font.postscriptName instanceof Uint8Array && name instanceof Uint8Array && font.postscriptName.every((v, i)=>name[i] === v)) return font;
        }
        return null;
    }
    get fonts() {
        let fonts = [];
        for (let offset of this.header.offsets){
            let stream = new $6uUbQ$DecodeStream(this.stream.buffer);
            stream.pos = offset;
            fonts.push(new (0, $4c1709dee528ea76$export$2e2bcd8739ae039)(stream));
        }
        return fonts;
    }
    constructor(stream){
        (0, $6uUbQ$_)(this, "type", 'TTC');
        this.stream = stream;
        if (stream.readString(4) !== 'ttcf') throw new Error('Not a TrueType collection');
        this.header = $cd5853a56c68fec7$var$TTCHeader.decode(stream);
    }
}





let $05f49f930186144e$var$DFontName = new $6uUbQ$String($6uUbQ$uint8);
let $05f49f930186144e$var$DFontData = new $6uUbQ$Struct({
    len: $6uUbQ$uint32,
    buf: new $6uUbQ$Buffer('len')
});
let $05f49f930186144e$var$Ref = new $6uUbQ$Struct({
    id: $6uUbQ$uint16,
    nameOffset: $6uUbQ$int16,
    attr: $6uUbQ$uint8,
    dataOffset: $6uUbQ$uint24,
    handle: $6uUbQ$uint32
});
let $05f49f930186144e$var$Type = new $6uUbQ$Struct({
    name: new $6uUbQ$String(4),
    maxTypeIndex: $6uUbQ$uint16,
    refList: new $6uUbQ$Pointer($6uUbQ$uint16, new $6uUbQ$Array($05f49f930186144e$var$Ref, (t)=>t.maxTypeIndex + 1), {
        type: 'parent'
    })
});
let $05f49f930186144e$var$TypeList = new $6uUbQ$Struct({
    length: $6uUbQ$uint16,
    types: new $6uUbQ$Array($05f49f930186144e$var$Type, (t)=>t.length + 1)
});
let $05f49f930186144e$var$DFontMap = new $6uUbQ$Struct({
    reserved: new $6uUbQ$Reserved($6uUbQ$uint8, 24),
    typeList: new $6uUbQ$Pointer($6uUbQ$uint16, $05f49f930186144e$var$TypeList),
    nameListOffset: new $6uUbQ$Pointer($6uUbQ$uint16, 'void')
});
let $05f49f930186144e$var$DFontHeader = new $6uUbQ$Struct({
    dataOffset: $6uUbQ$uint32,
    map: new $6uUbQ$Pointer($6uUbQ$uint32, $05f49f930186144e$var$DFontMap),
    dataLength: $6uUbQ$uint32,
    mapLength: $6uUbQ$uint32
});
class $05f49f930186144e$export$2e2bcd8739ae039 {
    static probe(buffer) {
        let stream = new $6uUbQ$DecodeStream(buffer);
        try {
            var header = $05f49f930186144e$var$DFontHeader.decode(stream);
        } catch (e) {
            return false;
        }
        for (let type of header.map.typeList.types){
            if (type.name === 'sfnt') return true;
        }
        return false;
    }
    getFont(name) {
        if (!this.sfnt) return null;
        for (let ref of this.sfnt.refList){
            let pos = this.header.dataOffset + ref.dataOffset + 4;
            let stream = new $6uUbQ$DecodeStream(this.stream.buffer.slice(pos));
            let font = new (0, $4c1709dee528ea76$export$2e2bcd8739ae039)(stream);
            if (font.postscriptName === name || font.postscriptName instanceof Uint8Array && name instanceof Uint8Array && font.postscriptName.every((v, i)=>name[i] === v)) return font;
        }
        return null;
    }
    get fonts() {
        let fonts = [];
        for (let ref of this.sfnt.refList){
            let pos = this.header.dataOffset + ref.dataOffset + 4;
            let stream = new $6uUbQ$DecodeStream(this.stream.buffer.slice(pos));
            fonts.push(new (0, $4c1709dee528ea76$export$2e2bcd8739ae039)(stream));
        }
        return fonts;
    }
    constructor(stream){
        (0, $6uUbQ$_)(this, "type", 'DFont');
        this.stream = stream;
        this.header = $05f49f930186144e$var$DFontHeader.decode(this.stream);
        for (let type of this.header.map.typeList.types){
            for (let ref of type.refList)if (ref.nameOffset >= 0) {
                this.stream.pos = ref.nameOffset + this.header.map.nameListOffset;
                ref.name = $05f49f930186144e$var$DFontName.decode(this.stream);
            } else ref.name = null;
            if (type.name === 'sfnt') this.sfnt = type;
        }
    }
}


// Register font formats
(0, $d636bc798e7178db$export$36b2f24e97d43be)((0, $4c1709dee528ea76$export$2e2bcd8739ae039));
(0, $d636bc798e7178db$export$36b2f24e97d43be)((0, $760785214b9fc52c$export$2e2bcd8739ae039));
(0, $d636bc798e7178db$export$36b2f24e97d43be)((0, $21ee218f84ac7f32$export$2e2bcd8739ae039));
(0, $d636bc798e7178db$export$36b2f24e97d43be)((0, $cd5853a56c68fec7$export$2e2bcd8739ae039));
(0, $d636bc798e7178db$export$36b2f24e97d43be)((0, $05f49f930186144e$export$2e2bcd8739ae039));


export {$d636bc798e7178db$export$bd5c5d8b8dcafd78 as logErrors, $d636bc798e7178db$export$36b2f24e97d43be as registerFormat, $d636bc798e7178db$export$185802fd694ee1f5 as create, $d636bc798e7178db$export$42940898df819940 as defaultLanguage, $d636bc798e7178db$export$5157e7780d44cc36 as setDefaultLanguage};
//# sourceMappingURL=browser-module.mjs.map
