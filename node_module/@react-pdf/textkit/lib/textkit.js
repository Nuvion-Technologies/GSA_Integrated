import { isNil, last, repeat, dropLast as dropLast$2, adjust, compose } from '@react-pdf/fns';
import bidiFactory from 'bidi-js';
import unicode from 'unicode-properties';
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/en-us.js';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Fragment} Fragment
 */

/**
 * Create attributed string from text fragments
 *
 * @param {Fragment[]} fragments fragments
 * @returns {AttributedString} attributed string
 */
const fromFragments = fragments => {
  let offset = 0;
  let string = '';
  const runs = [];
  fragments.forEach(fragment => {
    string += fragment.string;
    runs.push({
      ...fragment,
      start: offset,
      end: offset + fragment.string.length,
      attributes: fragment.attributes || {}
    });
    offset += fragment.string.length;
  });
  return {
    string,
    runs
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param {string} word
 * @returns {[string]} same word
 */
const defaultHyphenationEngine = word => [word];

/**
 * Wrap words of attribute string
 *
 * @param {Object} engines layout engines
 * @param {Object} options layout options
 */
const wrapWords = function (engines, options) {
  if (engines === void 0) {
    engines = {};
  }
  if (options === void 0) {
    options = {};
  }
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string including syllables
   */
  return attributedString => {
    var _engines$wordHyphenat, _engines;
    const syllables = [];
    const fragments = [];
    const hyphenateWord = options.hyphenationCallback || ((_engines$wordHyphenat = (_engines = engines).wordHyphenation) === null || _engines$wordHyphenat === void 0 ? void 0 : _engines$wordHyphenat.call(_engines, options)) || defaultHyphenationEngine;
    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = '';
      const run = attributedString.runs[i];
      const words = attributedString.string.slice(run.start, run.end).split(/([ ]+)/g).filter(Boolean);
      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        const parts = hyphenateWord(word);
        syllables.push(...parts);
        string += parts.join('');
      }
      fragments.push({
        ...run,
        string
      });
    }
    return {
      ...fromFragments(fragments),
      syllables
    };
  };
};

/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Clone rect
 *
 * @param {Rect} rect rect
 * @returns {Rect} cloned rect
 */
const copy = rect => {
  return Object.assign({}, rect);
};

/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 *
 * @param {Rect} rect rect
 * @param {number} height height
 * @returns {[Rect, Rect]} partitioned rects
 */
const partition = (rect, height) => {
  const a = Object.assign({}, rect, {
    height
  });
  const b = Object.assign({}, rect, {
    y: rect.y + height,
    height: rect.height - height
  });
  return [a, b];
};

/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Crop upper section of rect
 *
 * @param {number} height height
 * @param {Rect} rect rect
 * @returns {Rect} cropped rect
 */
const crop = (height, rect) => {
  const [, result] = partition(rect, height);
  return result;
};

/**
 * Get paragraph block height
 *
 * @param {Object}  paragraph block
 * @returns {number} paragraph block height
 */
const height$2 = paragraph => {
  return paragraph.reduce((acc, block) => acc + block.box.height, 0);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Calculate run scale
 *
 * @param {Run} run run
 * @returns {number} scale
 */
const calculateScale = run => {
  var _attributes$font;
  const attributes = run.attributes || {};
  const fontSize = attributes.fontSize || 12;
  const unitsPerEm = (_attributes$font = attributes.font) === null || _attributes$font === void 0 ? void 0 : _attributes$font.unitsPerEm;
  return unitsPerEm ? fontSize / unitsPerEm : 0;
};

/**
 * Get run scale
 *
 * @param {Object}  run
 * @returns {number} scale
 */
const scale = run => {
  var _run$attributes;
  return ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : _run$attributes.scale) || calculateScale(run);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get ligature offset by index
 *
 * Ex. ffi ligature
 *
 *   glyphs:         l  o  f  f  i  m
 *   glyphIndices:   0  1  2  2  2  3
 *   offset:         0  0  0  1  2  0
 *
 * @param {number} index
 * @param {Run} run run
 * @returns {number} ligature offset
 */
const offset = (index, run) => {
  if (!run) return 0;
  const glyphIndices = run.glyphIndices || [];
  const value = glyphIndices[index];
  return glyphIndices.slice(0, index).filter(i => i === value).length;
};

/**
 * @typedef {import('../types.js').Font} Font
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run font
 *
 * @param {Run} run run
 * @returns {Font | null} font
 */
const getFont = run => {
  var _run$attributes;
  return ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : _run$attributes.font) || null;
};

/**
 * @typedef {import('../types.js').Font} Font
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Slice glyph between codePoints range
 * Util for breaking ligatures
 *
 * @param {number} start start code point index
 * @param {number} end end code point index
 * @param {Font} font font to generate new glyph
 * @param {Glyph} glyph glyph to be sliced
 * @returns {Glyph[]} sliced glyph parts
 */
const slice$2 = (start, end, font, glyph) => {
  if (!glyph) return [];
  if (start === end) return [];
  if (start === 0 && end === glyph.codePoints.length) return [glyph];
  const codePoints = glyph.codePoints.slice(start, end);
  const string = String.fromCodePoint(...codePoints);

  // passing LTR To force fontkit to not reverse the string
  return font ? font.layout(string, undefined, undefined, undefined, 'ltr').glyphs : [glyph];
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Return glyph index at string index, if glyph indices present.
 * Otherwise return string index
 *
 * @param {number} index index
 * @param {Run} run run
 * @returns {number} glyph index
 */
const glyphIndexAt = (index, run) => {
  var _run$glyphIndices;
  const result = run === null || run === void 0 ? void 0 : (_run$glyphIndices = run.glyphIndices) === null || _run$glyphIndices === void 0 ? void 0 : _run$glyphIndices[index];
  return isNil(result) ? index : result;
};

/**
 * Returns new array starting with zero, and keeping same relation between consecutive values
 *
 * @param {number[]} array list
 * @returns {number[]} normalized array
 */
const normalize = array => {
  const head = array[0];
  return array.map(value => value - head);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Slice run between glyph indices range
 *
 * @param {number} start glyph index
 * @param {number} end glyph index
 * @param {Run} run run
 * @returns {Run} sliced run
 */
const slice$1 = (start, end, run) => {
  var _run$glyphs, _run$glyphs2;
  const runScale = scale(run);
  const font = getFont(run);

  // Get glyph start and end indices
  const startIndex = glyphIndexAt(start, run);
  const endIndex = glyphIndexAt(end, run);

  // Get start and end glyph
  const startGlyph = (_run$glyphs = run.glyphs) === null || _run$glyphs === void 0 ? void 0 : _run$glyphs[startIndex];
  const endGlyph = (_run$glyphs2 = run.glyphs) === null || _run$glyphs2 === void 0 ? void 0 : _run$glyphs2[endIndex];

  // Get start ligature chunks (if any)
  const startOffset = offset(start, run);
  const startGlyphs = startOffset > 0 ? slice$2(startOffset, Infinity, font, startGlyph) : [];

  // Get end ligature chunks (if any)
  const endOffset = offset(end, run);
  const endGlyphs = slice$2(0, endOffset, font, endGlyph);

  // Compute new glyphs
  const sliceStart = startIndex + Math.min(1, startOffset);
  const glyphs = (run.glyphs || []).slice(sliceStart, endIndex);

  // Compute new positions
  const glyphPosition = g => ({
    xAdvance: g.advanceWidth * runScale
  });
  const startPositions = startGlyphs.map(glyphPosition);
  const positions = (run.positions || []).slice(sliceStart, endIndex);
  const endPositions = endGlyphs.map(glyphPosition);
  return Object.assign({}, run, {
    start: run.start + start,
    end: Math.min(run.end, run.start + end),
    glyphIndices: normalize((run.glyphIndices || []).slice(start, end)),
    glyphs: [startGlyphs, glyphs, endGlyphs].flat(),
    positions: [startPositions, positions, endPositions].flat()
  });
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run index that contains passed index
 *
 * @param {number} n index
 * @param {Run[]} runs runs
 * @returns {number} run index
 */
const runIndexAt$1 = (n, runs) => {
  if (!runs) return -1;
  return runs.findIndex(run => run.start <= n && n < run.end);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Filter runs contained between start and end
 *
 * @param {number} start
 * @param {number} end
 * @param {Run[]} runs
 * @returns {Run[]} filtered runs
 */
const filter = (start, end, runs) => {
  const startIndex = runIndexAt$1(start, runs);
  const endIndex = Math.max(runIndexAt$1(end - 1, runs), startIndex);
  return runs.slice(startIndex, endIndex + 1);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Subtract scalar to run
 *
 * @param {number} n scalar
 * @param {Run} run run
 * @returns {Object} subtracted run
 */
const subtract = (n, run) => {
  const start = run.start - n;
  const end = run.end - n;
  return Object.assign({}, run, {
    start,
    end
  });
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Slice array of runs
 *
 * @param {number} start offset
 * @param {number} end offset
 * @param {Run[]} runs
 * @returns {Run[]} sliced runs
 */
const sliceRuns = (start, end, runs) => {
  const sliceFirstRun = a => slice$1(start - a.start, end - a.start, a);
  const sliceLastRun = a => slice$1(0, end - a.start, a);
  return runs.map((run, i) => {
    let result = run;
    const isFirst = i === 0;
    const isLast = !isFirst && i === runs.length - 1;
    if (isFirst) result = sliceFirstRun(run);
    if (isLast) result = sliceLastRun(run);
    return subtract(start, result);
  });
};

/**
 * Slice attributed string between two indices
 *
 * @param {number} start offset
 * @param {number} end offset
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string
 */
const slice = (start, end, attributedString) => {
  if (attributedString.string.length === 0) return attributedString;
  const string = attributedString.string.slice(start, end);
  const filteredRuns = filter(start, end, attributedString.runs);
  const slicedRuns = sliceRuns(start, end, filteredRuns);
  return Object.assign({}, attributedString, {
    string,
    runs: slicedRuns
  });
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * @param {string} string
 * @returns {number} index
 */
const findCharIndex = string => {
  return string.search(/\S/g);
};

/**
 * @param {string} string
 * @returns {number} index
 */
const findLastCharIndex = string => {
  const match = string.match(/\S/g);
  return match ? string.lastIndexOf(match[match.length - 1]) : -1;
};

/**
 * Removes (strips) whitespace from both ends of the attributted string.
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string
 */
const trim = attributedString => {
  const start = findCharIndex(attributedString.string);
  const end = findLastCharIndex(attributedString.string);
  return slice(start, end + 1, attributedString);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Returns empty run
 *
 * @returns {Run} empty run
 */
const empty$1 = () => {
  return {
    start: 0,
    end: 0,
    glyphIndices: [],
    glyphs: [],
    positions: [],
    attributes: {}
  };
};

/**
 * Check if value is a number
 *
 * @template {unknown} T
 * @param {T} value Value to check
 * @returns {value is number} Whether value is a number
 */
const isNumber = value => {
  return typeof value === 'number';
};

/**
 * Append glyph indices with given length
 *
 * Ex. appendIndices(3, [0, 1, 2, 2]) => [0, 1, 2, 2, 3, 3, 3]
 *
 * @param {number} length length
 * @param {number[]} indices glyph indices
 * @returns {number[]} extended glyph indices
 */
const appendIndices = (length, indices) => {
  const lastIndex = last(indices);
  const value = isNil(lastIndex) ? 0 : lastIndex + 1;
  const newIndices = Array(length).fill(value);
  return indices.concat(newIndices);
};

/**
 * @typedef {import('../types.js').Font} Font
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Get glyph for a given code point
 *
 * @param {number} [value] codePoint
 * @param {Font} [font] font
 * @returns {Glyph} glyph
 * */
const fromCodePoint = (value, font) => {
  return font && value ? font.glyphForCodePoint(value) : null;
};

/**
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Append glyph to run
 *
 * @param {Glyph} glyph glyph
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
const appendGlyph = (glyph, run) => {
  var _glyph$codePoints;
  const glyphLength = ((_glyph$codePoints = glyph.codePoints) === null || _glyph$codePoints === void 0 ? void 0 : _glyph$codePoints.length) || 0;
  const end = run.end + glyphLength;
  const glyphs = run.glyphs.concat(glyph);
  const glyphIndices = appendIndices(glyphLength, run.glyphIndices);
  if (!run.positions) return Object.assign({}, run, {
    end,
    glyphs,
    glyphIndices
  });
  const positions = run.positions.concat({
    xAdvance: glyph.advanceWidth * scale(run)
  });
  return Object.assign({}, run, {
    end,
    glyphs,
    glyphIndices,
    positions
  });
};

/**
 * Append glyph or code point to run
 *
 * @param {Glyph | number | undefined} value glyph or codePoint
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
const append$1 = (value, run) => {
  if (!value) return run;
  const font = getFont(run);
  const glyph = isNumber(value) ? fromCodePoint(value, font) : value;
  return appendGlyph(glyph, run);
};

/**
 * Get string from array of code points
 *
 * @param {number[]} codePoints points
 * @returns {string} string
 */
const stringFromCodePoints = codePoints => {
  return String.fromCodePoint(...(codePoints || []));
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Append glyph into last run of attributed string
 *
 * @param {Glyph} glyph glyph
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
const append = (glyph, attributedString) => {
  const codePoints = (glyph === null || glyph === void 0 ? void 0 : glyph.codePoints) || [];
  const codePointsString = stringFromCodePoints(codePoints);
  const string = attributedString.string + codePointsString;
  const firstRuns = attributedString.runs.slice(0, -1);
  const lastRun = last(attributedString.runs) || empty$1();
  const runs = firstRuns.concat(append$1(glyph, lastRun));
  return Object.assign({}, attributedString, {
    string,
    runs
  });
};

const ELLIPSIS_UNICODE = 8230;
const ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);

/**
 * Get ellipsis codepoint. This may be different in standard and embedded fonts
 *
 * @param {Object} font
 * @returns {Object} ellipsis codepoint
 */
const getEllipsisCodePoint = font => {
  if (!font.encode) return ELLIPSIS_UNICODE;
  const [codePoints] = font.encode(ELLIPSIS_STRING);
  return parseInt(codePoints[0], 16);
};

/**
 * Trucante block with ellipsis
 *
 * @param {Object} block paragraph block
 * @returns {Object} sliced paragraph block
 */
const truncate = block => {
  var _last, _last2, _last2$attributes;
  const runs = ((_last = last(block)) === null || _last === void 0 ? void 0 : _last.runs) || [];
  const font = (_last2 = last(runs)) === null || _last2 === void 0 ? void 0 : (_last2$attributes = _last2.attributes) === null || _last2$attributes === void 0 ? void 0 : _last2$attributes.font;
  if (font) {
    const index = block.length - 1;
    const codePoint = getEllipsisCodePoint(font);
    const glyph = font.glyphForCodePoint(codePoint);
    const lastBlock = append(glyph, trim(block[index]));
    return Object.assign([], block, {
      [index]: lastBlock
    });
  }
  return block;
};

/**
 * @typedef {import('../types.js').Attributes} Attributes
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Omit attribute from run
 *
 * @param {keyof Attributes} value attribute value
 * @param {Run} run run
 * @returns {Run} run without ommited attribute
 */
const omit = (value, run) => {
  const attributes = Object.assign({}, run.attributes);
  delete attributes[value];
  return Object.assign({}, run, {
    attributes
  });
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run ascent
 *
 * @param {Run} run run
 * @returns {number} ascent
 */
const ascent$1 = run => {
  var _run$attributes, _run$attributes$attac, _run$attributes2, _run$attributes2$font;
  const attachmentHeight = ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : (_run$attributes$attac = _run$attributes.attachment) === null || _run$attributes$attac === void 0 ? void 0 : _run$attributes$attac.height) || 0;
  const fontAscent = ((_run$attributes2 = run.attributes) === null || _run$attributes2 === void 0 ? void 0 : (_run$attributes2$font = _run$attributes2.font) === null || _run$attributes2$font === void 0 ? void 0 : _run$attributes2$font.ascent) || 0;
  return Math.max(attachmentHeight, fontAscent * scale(run));
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run descent
 *
 * @param {Run} run run
 * @returns {number} descent
 */
const descent = run => {
  var _run$attributes, _run$attributes$font;
  const fontDescent = ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : (_run$attributes$font = _run$attributes.font) === null || _run$attributes$font === void 0 ? void 0 : _run$attributes$font.descent) || 0;
  return scale(run) * fontDescent;
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run lineGap
 *
 * @param {Object} run run
 * @returns {number} lineGap
 */
const lineGap = run => {
  var _run$attributes, _run$attributes$font;
  return (((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : (_run$attributes$font = _run$attributes.font) === null || _run$attributes$font === void 0 ? void 0 : _run$attributes$font.lineGap) || 0) * scale(run);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run height
 *
 * @param {Run} run run
 * @returns {number} height
 */
const height$1 = run => {
  var _run$attributes;
  const lineHeight = (_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : _run$attributes.lineHeight;
  return lineHeight || lineGap(run) + ascent$1(run) - descent(run);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Returns attributed string height
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} height
 */
const height = attributedString => {
  const reducer = (acc, run) => Math.max(acc, height$1(run));
  return attributedString.runs.reduce(reducer, 0);
};

/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Checks if two rects intersect each other
 *
 * @param {Rect} a rect A
 * @param {Rect} b rect B
 * @returns {boolean} whether rects intersect
 */
const intersects = (a, b) => {
  const x = Math.max(a.x, b.x);
  const num1 = Math.min(a.x + a.width, b.x + b.width);
  const y = Math.max(a.y, b.y);
  const num2 = Math.min(a.y + a.height, b.y + b.height);
  return num1 >= x && num2 >= y;
};

const getLineFragment = (lineRect, excludeRect) => {
  if (!intersects(excludeRect, lineRect)) return [lineRect];
  const eStart = excludeRect.x;
  const eEnd = excludeRect.x + excludeRect.width;
  const lStart = lineRect.x;
  const lEnd = lineRect.x + lineRect.width;
  const a = Object.assign({}, lineRect, {
    width: eStart - lStart
  });
  const b = Object.assign({}, lineRect, {
    x: eEnd,
    width: lEnd - eEnd
  });
  return [a, b].filter(r => r.width > 0);
};
const getLineFragments = (rect, excludeRects) => {
  let fragments = [rect];
  for (let i = 0; i < excludeRects.length; i += 1) {
    const excludeRect = excludeRects[i];
    fragments = fragments.reduce((acc, fragment) => {
      const pieces = getLineFragment(fragment, excludeRect);
      return acc.concat(pieces);
    }, []);
  }
  return fragments;
};
const generateLineRects = (container, height) => {
  const {
    excludeRects,
    ...rect
  } = container;
  if (!excludeRects) return [rect];
  const lineRects = [];
  const maxY = Math.max(...excludeRects.map(r => r.y + r.height));
  let currentRect = rect;
  while (currentRect.y < maxY) {
    const [lineRect, rest] = partition(currentRect, height);
    const lineRectFragments = getLineFragments(lineRect, excludeRects);
    currentRect = rest;
    lineRects.push(...lineRectFragments);
  }
  return [...lineRects, currentRect];
};

const ATTACHMENT_CODE$1 = '\ufffc'; // 65532

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Remove attachment attribute if no char present
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string
 */
const purgeAttachments = attributedString => {
  const shouldPurge = !attributedString.string.includes(ATTACHMENT_CODE$1);
  if (!shouldPurge) return attributedString;
  const runs = attributedString.runs.map(run => omit('attachment', run));
  return Object.assign({}, attributedString, {
    runs
  });
};

/**
 * Layout paragraphs inside rectangle
 *
 * @param {Object} rects rect
 * @param {Object[]} lines attributed strings
 * @param {number} indent
 * @returns {Object} layout blocks
 */
const layoutLines = (rects, lines, indent) => {
  let rect = rects.shift();
  let currentY = rect.y;
  return lines.map((line, i) => {
    var _line$runs, _line$runs$;
    const lineIndent = i === 0 ? indent : 0;
    const style = ((_line$runs = line.runs) === null || _line$runs === void 0 ? void 0 : (_line$runs$ = _line$runs[0]) === null || _line$runs$ === void 0 ? void 0 : _line$runs$.attributes) || {};
    const height$1 = Math.max(height(line), style.lineHeight);
    if (currentY + height$1 > rect.y + rect.height && rects.length > 0) {
      rect = rects.shift();
      currentY = rect.y;
    }
    const newLine = Object.assign({}, line);
    delete newLine.syllables;
    newLine.box = {
      x: rect.x + lineIndent,
      y: currentY,
      width: rect.width - lineIndent,
      height: height$1
    };
    currentY += height$1;
    return purgeAttachments(newLine);
  });
};

/**
 * Performs line breaking and layout
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 */
const layoutParagraph = (engines, options) => {
  /**
   * @param {Rect} container rect
   * @param {Object} paragraph attributed string
   * @returns {Object} layout block
   */
  return (container, paragraph) => {
    var _paragraph$runs, _paragraph$runs$, _paragraph$runs$$attr;
    const height$1 = height(paragraph);
    const indent = ((_paragraph$runs = paragraph.runs) === null || _paragraph$runs === void 0 ? void 0 : (_paragraph$runs$ = _paragraph$runs[0]) === null || _paragraph$runs$ === void 0 ? void 0 : (_paragraph$runs$$attr = _paragraph$runs$.attributes) === null || _paragraph$runs$$attr === void 0 ? void 0 : _paragraph$runs$$attr.indent) || 0;
    const rects = generateLineRects(container, height$1);
    const availableWidths = rects.map(r => r.width);
    availableWidths[0] -= indent;
    const lines = engines.linebreaker(options)(paragraph, availableWidths);
    return layoutLines(rects, lines, indent);
  };
};

/**
 * Slice block at given height
 *
 * @param {number} height height
 * @param {Object} block paragraph block
 * @returns {number[]} sliced paragraph block
 */
const sliceAtHeight = (height, block) => {
  const newBlock = [];
  let counter = 0;
  for (let i = 0; i < block.length; i += 1) {
    const line = block[i];
    counter += line.box.height;
    if (counter < height) {
      newBlock.push(line);
    } else {
      break;
    }
  }
  return newBlock;
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Layout paragraphs inside container until it does not
 * fit anymore, performing line wrapping in the process.
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @param {Rect} container container rect
 */
const typesetter = (engines, options, container) => {
  /**
   * @param {AttributedString} attributedStrings attributed strings (paragraphs)
   * @returns {Object[]} paragraph blocks
   */
  return attributedStrings => {
    const blocks = [];
    const paragraphs = [...attributedStrings];
    const layoutBlock = layoutParagraph(engines, options);
    const maxLines = isNil(container.maxLines) ? Infinity : container.maxLines;
    const truncateEllipsis = container.truncateMode === 'ellipsis';
    let linesCount = maxLines;
    let paragraphRect = copy(container);
    let nextParagraph = paragraphs.shift();
    while (linesCount > 0 && nextParagraph) {
      const block = layoutBlock(paragraphRect, nextParagraph);
      const slicedBlock = block.slice(0, linesCount);
      const linesHeight = height$2(slicedBlock);
      const shouldTruncate = truncateEllipsis && block.length !== slicedBlock.length;
      linesCount -= slicedBlock.length;
      if (paragraphRect.height >= linesHeight) {
        blocks.push(shouldTruncate ? truncate(slicedBlock) : slicedBlock);
        paragraphRect = crop(linesHeight, paragraphRect);
        nextParagraph = paragraphs.shift();
      } else {
        blocks.push(truncate(sliceAtHeight(paragraphRect.height, slicedBlock)));
        break;
      }
    }
    return blocks;
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string start value
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} start
 */
const start = attributedString => {
  const {
    runs
  } = attributedString;
  return runs.length === 0 ? 0 : runs[0].start;
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string end value
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} end
 */
const end = attributedString => {
  const {
    runs
  } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string length
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} end
 */
const length$1 = attributedString => {
  return end(attributedString) - start(attributedString);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

const bidi$2 = bidiFactory();

/**
 * @param {Run[]} runs
 * @returns {number[]} bidi levels
 */
const getBidiLevels$1 = runs => {
  return runs.reduce((acc, run) => {
    const length = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length);
    return acc.concat(levels);
  }, []);
};
const getReorderedIndices = (string, segments) => {
  // Fill an array with indices
  const indices = [];
  for (let i = 0; i < string.length; i += 1) {
    indices[i] = i;
  }
  // Reverse each segment in order
  segments.forEach(_ref => {
    let [start, end] = _ref;
    const slice = indices.slice(start, end + 1);
    for (let i = slice.length - 1; i >= 0; i -= 1) {
      indices[end - i] = slice[i];
    }
  });
  return indices;
};

/**
 * @template {'glyphs'|'positions'} T
 * @param {Run[]} runs
 * @param {T} objectName
 * @param {number} index
 * @returns {T extends 'glyphs' ? Glyph|undefined : Position|undefined}
 */
const getItemAtIndex = (runs, objectName, index) => {
  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    const updatedIndex = run.glyphIndices[index - run.start];
    if (index >= run.start && index < run.end) {
      return run[objectName][updatedIndex];
    }
  }
  throw new Error(`index ${index} out of range`);
};

/**
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} reordered attributed string
 */
const reorderLine = attributedString => {
  var _attributedString$run;
  const levels = getBidiLevels$1(attributedString.runs);
  const direction = (_attributedString$run = attributedString.runs[0]) === null || _attributedString$run === void 0 ? void 0 : _attributedString$run.attributes.direction;
  const level = direction === 'rtl' ? 1 : 0;
  const end = length$1(attributedString) - 1;
  const paragraphs = [{
    start: 0,
    end,
    level
  }];
  const embeddingLevels = {
    paragraphs,
    levels
  };
  const segments = bidi$2.getReorderSegments(attributedString.string, embeddingLevels);

  // No need for bidi reordering
  if (segments.length === 0) return attributedString;
  const indices = getReorderedIndices(attributedString.string, segments);
  const updatedString = bidi$2.getReorderedString(attributedString.string, embeddingLevels);
  const updatedRuns = attributedString.runs.map(run => {
    const selectedIndices = indices.slice(run.start, run.end);
    const updatedGlyphs = [];
    const updatedPositions = [];
    const addedGlyphs = new Set();
    for (let i = 0; i < selectedIndices.length; i += 1) {
      const index = selectedIndices[i];
      const glyph = getItemAtIndex(attributedString.runs, 'glyphs', index);
      if (addedGlyphs.has(glyph.id)) continue;
      updatedGlyphs.push(glyph);
      updatedPositions.push(getItemAtIndex(attributedString.runs, 'positions', index));
      if (glyph.isLigature) {
        addedGlyphs.add(glyph.id);
      }
    }
    return {
      ...run,
      glyphs: updatedGlyphs,
      positions: updatedPositions
    };
  });
  return {
    ...attributedString,
    runs: updatedRuns,
    string: updatedString
  };
};

/**
 * Reorder a paragraph
 *
 * @param {AttributedString[]} lines
 * @returns {AttributedString[]} reordered lines
 */
const reorderParagraph = lines => lines.map(reorderLine);

/**
 * Perform bidi reordering
 *
 * @returns {(paragraphs: AttributedString[][]) => AttributedString[][]} reordered paragraphs
 */
const bidiReordering = () => {
  /**
   * @param {AttributedString[][]} paragraphs line blocks
   * @returns {AttributedString[][]} reordered line blocks
   */
  return paragraphs => paragraphs.map(reorderParagraph);
};

/**
 * @typedef {import('../types.js').Glyph} Glyph
 */

const DUMMY_CODEPOINT = 123;

/**
 * Resolve string indices based on glyphs code points
 *
 * @param {Glyph[]} glyphs
 * @returns {number[]} glyph indices
 */
const resolve = function (glyphs) {
  if (glyphs === void 0) {
    glyphs = [];
  }
  return glyphs.reduce((acc, glyph) => {
    const codePoints = (glyph === null || glyph === void 0 ? void 0 : glyph.codePoints) || [DUMMY_CODEPOINT];
    if (acc.length === 0) return codePoints.map(() => 0);
    const last = acc[acc.length - 1];
    const next = codePoints.map(() => last + 1);
    return [...acc, ...next];
  }, []);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * @param {Run} run
 * @returns {number}
 */
const getCharacterSpacing = run => {
  var _run$attributes;
  return ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : _run$attributes.characterSpacing) || 0;
};

/**
 * Scale run positions
 *
 * @param {Run} run
 * @param {Position[]} positions
 * @returns {Position[]} scaled positions
 */
const scalePositions = (run, positions) => {
  const runScale = scale(run);
  const characterSpacing = getCharacterSpacing(run);
  return positions.map((position, i) => {
    const isLast = i === positions.length;
    const xSpacing = isLast ? 0 : characterSpacing;
    return Object.assign({}, position, {
      xAdvance: position.xAdvance * runScale + xSpacing,
      yAdvance: position.yAdvance * runScale,
      xOffset: position.xOffset * runScale,
      yOffset: position.yOffset * runScale
    });
  });
};

/**
 * Create glyph run
 *
 * @param {string} string string
 */
const layoutRun = string => {
  /**
   * @param {Run} run run
   * @returns {Run} glyph run
   */
  return run => {
    const {
      start,
      end,
      attributes = {}
    } = run;
    const {
      font
    } = attributes;
    if (!font) return {
      ...run,
      glyphs: [],
      glyphIndices: [],
      positions: []
    };
    const runString = string.slice(start, end);

    // passing LTR To force fontkit to not reverse the string
    const glyphRun = font.layout(runString, undefined, undefined, undefined, 'ltr');
    const positions = scalePositions(run, glyphRun.positions);
    const glyphIndices = resolve(glyphRun.glyphs);
    return {
      ...run,
      positions,
      glyphIndices,
      glyphs: glyphRun.glyphs
    };
  };
};

/**
 * Generate glyphs for single attributed string
 */
const generateGlyphs = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string with glyphs
   */
  return attributedString => {
    const runs = attributedString.runs.map(layoutRun(attributedString.string));
    return Object.assign({}, attributedString, {
      runs
    });
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Resolves yOffset for run
 *
 * @param {Run} run run
 * @returns {Run} run
 */
const resolveRunYOffset = run => {
  var _run$attributes, _run$attributes$font, _run$attributes2;
  if (!run.positions) return run;
  const unitsPerEm = ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : (_run$attributes$font = _run$attributes.font) === null || _run$attributes$font === void 0 ? void 0 : _run$attributes$font.unitsPerEm) || 0;
  const yOffset = (((_run$attributes2 = run.attributes) === null || _run$attributes2 === void 0 ? void 0 : _run$attributes2.yOffset) || 0) * unitsPerEm;
  const positions = run.positions.map(p => Object.assign({}, p, {
    yOffset
  }));
  return Object.assign({}, run, {
    positions
  });
};

/**
 * Resolves yOffset for multiple paragraphs
 */
const resolveYOffset = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    const runs = attributedString.runs.map(resolveRunYOffset);
    return Object.assign({}, attributedString, {
      runs
    });
  };
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Sort runs in ascending order
 *
 * @param {Run[]} runs
 * @returns {Run[]} sorted runs
 */
const sort = runs => {
  return runs.sort((a, b) => a.start - b.start || a.end - b.end);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Is run empty (start === end)
 *
 * @param {Run} run run
 * @returns {boolean} is run empty
 */
const isEmpty = run => {
  return run.start === run.end;
};

/**
 * @typedef {import('../types.js').Point} Point
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Sort points in ascending order
 * @param {Point} a first point
 * @param {Point} b second point
 * @returns {number} sort order
 */
const sortPoints = (a, b) => {
  return a[1] - b[1] || a[3] - b[3];
};

/**
 * @param {Run[]} runs
 * @returns {Point[]} points
 */
const generatePoints = runs => {
  const result = runs.reduce((acc, run, i) => {
    return acc.concat([['start', run.start, run.attributes, i], ['end', run.end, run.attributes, i]]);
  }, []);
  return result.sort(sortPoints);
};

/**
 * @param {Run[]} runs
 * @returns {Run} merged runs
 */
const mergeRuns = runs => {
  return runs.reduce((acc, run) => {
    const attributes = Object.assign({}, acc.attributes, run.attributes);
    return Object.assign({}, run, {
      attributes
    });
  }, {});
};

/**
 * @param {Run[]} runs
 * @returns {Run[][]} grouped runs
 */
const groupEmptyRuns = runs => {
  const groups = runs.reduce((acc, run) => {
    if (!acc[run.start]) acc[run.start] = [];
    acc[run.start].push(run);
    return acc;
  }, []);
  return Object.values(groups);
};

/**
 * @param {Run[]} runs
 * @returns {Run[]} flattened runs
 */
const flattenEmptyRuns = runs => {
  return groupEmptyRuns(runs).map(mergeRuns);
};

/**
 * @param {Run[]} runs
 * @returns {Run[]} flattened runs
 */
const flattenRegularRuns = runs => {
  const res = [];
  const points = generatePoints(runs);
  let start = -1;
  let attrs = {};
  const stack = [];
  for (let i = 0; i < points.length; i += 1) {
    const [type, offset, attributes] = points[i];
    if (start !== -1 && start < offset) {
      res.push({
        start,
        end: offset,
        attributes: attrs
      });
    }
    if (type === 'start') {
      stack.push(attributes);
      attrs = Object.assign({}, attrs, attributes);
    } else {
      attrs = {};
      for (let j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          // eslint-disable-next-line no-plusplus
          stack.splice(j--, 1);
        } else {
          attrs = Object.assign({}, attrs, stack[j]);
        }
      }
    }
    start = offset;
  }
  return res;
};

/**
 * Flatten many runs
 *
 * @param {Run[]} runs
 * @returns {Run[]} flattened runs
 */
const flatten = function (runs) {
  if (runs === void 0) {
    runs = [];
  }
  const emptyRuns = flattenEmptyRuns(runs.filter(run => isEmpty(run)));
  const regularRuns = flattenRegularRuns(runs.filter(run => !isEmpty(run)));
  return sort(emptyRuns.concat(regularRuns));
};

/**
 * Returns empty attributed string
 *
 * @returns {Object} empty attributed string
 */
const empty = () => ({
  string: '',
  runs: []
});

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 *
 * @param {AttributedString} attributedString
 * @returns {AttributedString} attributed string without font
 */
const omitFont = attributedString => {
  const runs = attributedString.runs.map(run => omit('font', run));
  return Object.assign({}, attributedString, {
    runs
  });
};

/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 */
const preprocessRuns = (engines, options) => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} processed attributed string
   */
  return attributedString => {
    if (isNil(attributedString)) return empty();
    const {
      string
    } = attributedString;
    const {
      fontSubstitution,
      scriptItemizer,
      bidi
    } = engines;
    const {
      runs: omittedFontRuns
    } = omitFont(attributedString);
    const {
      runs: itemizationRuns
    } = scriptItemizer(options)(attributedString);
    const {
      runs: substitutedRuns
    } = fontSubstitution(options)(attributedString);
    const {
      runs: bidiRuns
    } = bidi(options)(attributedString);
    const runs = bidiRuns.concat(substitutedRuns).concat(itemizationRuns).concat(omittedFontRuns);
    return {
      string,
      runs: flatten(runs)
    };
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Breaks attributed string into paragraphs
 */
const splitParagraphs = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString[]} attributed string array
   */
  return attributedString => {
    const res = [];
    let start = 0;
    let breakPoint = attributedString.string.indexOf('\n') + 1;
    while (breakPoint > 0) {
      res.push(slice(start, breakPoint, attributedString));
      start = breakPoint;
      breakPoint = attributedString.string.indexOf('\n', breakPoint) + 1;
    }
    if (start === 0) {
      res.push(attributedString);
    } else if (start < attributedString.string.length) {
      res.push(slice(start, length$1(attributedString), attributedString));
    }
    return res;
  };
};

/**
 * @typedef {import('../types.js').Position} Position
 */

/**
 * Return positions advance width
 *
 * @param {Position[]} positions positions
 * @returns {number} advance width
 */
const advanceWidth$2 = positions => {
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Return run advance width
 *
 * @param {Run} run run
 * @returns {number} advance width
 */
const advanceWidth$1 = run => {
  return advanceWidth$2(run.positions || []);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Returns attributed string advancewidth
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} advance width
 */
const advanceWidth = attributedString => {
  const reducer = (acc, run) => acc + advanceWidth$1(run);
  return attributedString.runs.reduce(reducer, 0);
};

/**
 * @typedef {import('../types.js').Glyph} Glyph
 */

const WHITE_SPACES_CODE = 32;

/**
 * Check if glyph is white space
 *
 * @param {Glyph} [glyph] glyph
 * @returns {boolean} whether glyph is white space
 * */
const isWhiteSpace = glyph => {
  const codePoints = (glyph === null || glyph === void 0 ? void 0 : glyph.codePoints) || [];
  return codePoints.includes(WHITE_SPACES_CODE);
};

/**
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get white space leading positions
 *
 * @param {Run} run run
 * @returns {Position[]} white space leading positions
 */
const leadingPositions = run => {
  const glyphs = run.glyphs || [];
  const positions = run.positions || [];
  const leadingWhitespaces = glyphs.findIndex(g => !isWhiteSpace(g));
  return positions.slice(0, leadingWhitespaces);
};

/**
 * Get run leading white space offset
 *
 * @param {Run} run run
 * @returns {number} leading white space offset
 */
const leadingOffset$1 = run => {
  const positions = leadingPositions(run);
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string leading white space offset
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} leading white space offset
 */
const leadingOffset = attributedString => {
  const runs = attributedString.runs || [];
  return leadingOffset$1(runs[0]);
};

/**
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]} reversed array
 */
const reverse = array => {
  return [...array].reverse();
};

/**
 * Get white space trailing positions
 *
 * @param {Run} run run
 * @returns {Position[]} white space trailing positions
 */
const trailingPositions = run => {
  const glyphs = reverse(run.glyphs || []);
  const positions = reverse(run.positions || []);
  const leadingWhitespaces = glyphs.findIndex(g => !isWhiteSpace(g));
  return positions.slice(0, leadingWhitespaces);
};

/**
 * Get run trailing white space offset
 *
 * @param {Run} run run
 * @returns {number} trailing white space offset
 */
const trailingOffset$1 = run => {
  const positions = trailingPositions(run);
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string trailing white space offset
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} trailing white space offset
 */
const trailingOffset = attributedString => {
  const runs = attributedString.runs || [];
  return trailingOffset$1(last(runs));
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Drop last char of run
 *
 * @param {Run} run run
 * @returns {Run} run without last char
 */
const dropLast$1 = run => {
  return slice$1(0, run.end - run.start - 1, run);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Drop last glyph
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
const dropLast = attributedString => {
  const string = dropLast$2(attributedString.string);
  const runs = adjust(-1, dropLast$1, attributedString.runs);
  return Object.assign({}, attributedString, {
    string,
    runs
  });
};

const ALIGNMENT_FACTORS = {
  center: 0.5,
  right: 1
};

/**
 * Remove new line char at the end of line if present
 *
 * @param {Object}  line
 * @returns {Object} line
 */
const removeNewLine = line => {
  return last(line.string) === '\n' ? dropLast(line) : line;
};
const getOverflowLeft = line => {
  return leadingOffset(line) + (line.overflowLeft || 0);
};
const getOverflowRight = line => {
  return trailingOffset(line) + (line.overflowRight || 0);
};

/**
 * Ignore whitespace at the start and end of a line for alignment
 *
 * @param {Object}  line
 * @returns {Object} line
 */
const adjustOverflow = line => {
  const overflowLeft = getOverflowLeft(line);
  const overflowRight = getOverflowRight(line);
  const x = line.box.x - overflowLeft;
  const width = line.box.width + overflowLeft + overflowRight;
  const box = Object.assign({}, line.box, {
    x,
    width
  });
  return Object.assign({}, line, {
    box,
    overflowLeft,
    overflowRight
  });
};

/**
 * Performs line justification by calling appropiate engine
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @param {string} align text align
 */
const justifyLine$1 = (engines, options, align) => {
  /**
   * @param {Object} line lint
   * @returns {Object} line
   */
  return line => {
    const lineWidth = advanceWidth(line);
    const alignFactor = ALIGNMENT_FACTORS[align] || 0;
    const remainingWidth = Math.max(0, line.box.width - lineWidth);
    const shouldJustify = align === 'justify' || lineWidth > line.box.width;
    const x = line.box.x + remainingWidth * alignFactor;
    const box = Object.assign({}, line.box, {
      x
    });
    const newLine = Object.assign({}, line, {
      box
    });
    return shouldJustify ? engines.justification(options)(newLine) : newLine;
  };
};
const finalizeLine = line => {
  let lineAscent = 0;
  let lineDescent = 0;
  let lineHeight = 0;
  let lineXAdvance = 0;
  const runs = line.runs.map(run => {
    const height = height$1(run);
    const ascent = ascent$1(run);
    const descent$1 = descent(run);
    const xAdvance = advanceWidth$1(run);
    lineHeight = Math.max(lineHeight, height);
    lineAscent = Math.max(lineAscent, ascent);
    lineDescent = Math.max(lineDescent, descent$1);
    lineXAdvance += xAdvance;
    return Object.assign({}, run, {
      height,
      ascent,
      descent: descent$1,
      xAdvance
    });
  });
  return Object.assign({}, line, {
    runs,
    height: lineHeight,
    ascent: lineAscent,
    descent: lineDescent,
    xAdvance: lineXAdvance
  });
};

/**
 * Finalize line by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 */
const finalizeBlock = function (engines, options) {
  if (engines === void 0) {
    engines = {};
  }
  /**
   * @param {Object} line lint
   * @param {number} i line index
   * @param {Object[]} lines total lines
   * @returns {Object} line
   */
  return (line, i, lines) => {
    var _line$runs, _line$runs$;
    const isLastFragment = i === lines.length - 1;
    const style = ((_line$runs = line.runs) === null || _line$runs === void 0 ? void 0 : (_line$runs$ = _line$runs[0]) === null || _line$runs$ === void 0 ? void 0 : _line$runs$.attributes) || {};
    const align = isLastFragment ? style.alignLastLine : style.align;
    return compose(finalizeLine, engines.textDecoration(options), justifyLine$1(engines, options, align), adjustOverflow, removeNewLine)(line);
  };
};

/**
 * Finalize line block by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 */
const finalizeFragments = (engines, options) => {
  /**
   * @param {Object[]} blocks line blocks
   * @returns {Object[]} blocks
   */
  return blocks => {
    const blockFinalizer = finalizeBlock(engines, options);
    return blocks.map(block => block.map(blockFinalizer));
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

const ATTACHMENT_CODE = 0xfffc; // 65532

const isReplaceGlyph = glyph => glyph.codePoints.includes(ATTACHMENT_CODE);

/**
 * Resolve attachments of run
 *
 * @param {Object}  run
 * @returns {Object} run
 */
const resolveRunAttachments = run => {
  var _run$attributes;
  if (!run.positions) return run;
  const glyphs = run.glyphs || [];
  const attachment = ((_run$attributes = run.attributes) === null || _run$attributes === void 0 ? void 0 : _run$attributes.attachment) || {};
  const positions = run.positions.map((position, i) => {
    const glyph = glyphs[i];
    if (attachment && attachment.width && isReplaceGlyph(glyph)) {
      return Object.assign({}, position, {
        xAdvance: attachment.width
      });
    }
    return Object.assign({}, position);
  });
  return Object.assign({}, run, {
    positions
  });
};

/**
 * Resolve attachments for multiple paragraphs
 */
const resolveAttachments = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    const runs = attributedString.runs.map(resolveRunAttachments);
    return Object.assign({}, attributedString, {
      runs
    });
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Attributes} Attributes
 * @typedef {import('../types.js').Run} Run
 */

/**
 * @param {Attributes} a attributes
 * @returns {Attributes} attributes with defaults
 */
const applyAttributes = a => {
  return {
    align: a.align || (a.direction === 'rtl' ? 'right' : 'left'),
    alignLastLine: a.alignLastLine || (a.align === 'justify' ? 'left' : a.align || 'left'),
    attachment: a.attachment || null,
    backgroundColor: a.backgroundColor || null,
    bullet: a.bullet || null,
    characterSpacing: a.characterSpacing || 0,
    color: a.color || 'black',
    direction: a.direction || 'ltr',
    features: a.features || [],
    fill: a.fill !== false,
    font: a.font || null,
    fontSize: a.fontSize || 12,
    hangingPunctuation: a.hangingPunctuation || false,
    hyphenationFactor: a.hyphenationFactor || 0,
    indent: a.indent || 0,
    justificationFactor: a.justificationFactor || 1,
    lineHeight: a.lineHeight || null,
    lineSpacing: a.lineSpacing || 0,
    link: a.link || null,
    marginLeft: a.marginLeft || a.margin || 0,
    marginRight: a.marginRight || a.margin || 0,
    opacity: a.opacity,
    paddingTop: a.paddingTop || a.padding || 0,
    paragraphSpacing: a.paragraphSpacing || 0,
    script: a.script || null,
    shrinkFactor: a.shrinkFactor || 0,
    strike: a.strike || false,
    strikeColor: a.strikeColor || a.color || 'black',
    strikeStyle: a.strikeStyle || 'solid',
    stroke: a.stroke || false,
    underline: a.underline || false,
    underlineColor: a.underlineColor || a.color || 'black',
    underlineStyle: a.underlineStyle || 'solid',
    verticalAlign: a.verticalAlign || null,
    wordSpacing: a.wordSpacing || 0,
    yOffset: a.yOffset || 0
  };
};

/**
 * Apply default style to run
 *
 * @param {Run} run run
 * @returns {Run} run with styles
 */
const applyRunStyles = run => {
  const attributes = applyAttributes(run.attributes);
  return Object.assign({}, run, {
    attributes
  });
};

/**
 * Apply default attributes for an attributed string
 */
const applyDefaultStyles = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    const string = attributedString.string || '';
    const runs = (attributedString.runs || []).map(applyRunStyles);
    return {
      string,
      runs
    };
  };
};

/* eslint-disable no-restricted-syntax */

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Apply scaling and yOffset for verticalAlign 'sub' and 'super'.
 */
const verticalAlignment = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    attributedString.runs.forEach(run => {
      const {
        attributes
      } = run;
      const {
        verticalAlign
      } = attributes;
      if (verticalAlign === 'sub') {
        attributes.yOffset = -0.2;
      } else if (verticalAlign === 'super') {
        attributes.yOffset = 0.4;
      }
    });
    return attributedString;
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

const bidi$1 = bidiFactory();

/**
 * @param {Run[]} runs
 * @returns {number[]} bidi levels
 */
const getBidiLevels = runs => {
  return runs.reduce((acc, run) => {
    const length = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length);
    return acc.concat(levels);
  }, []);
};

/**
 * Perform bidi mirroring
 */
const mirrorString = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    const levels = getBidiLevels(attributedString.runs);
    let updatedString = '';
    attributedString.string.split('').forEach((char, index) => {
      const isRTL = levels[index] % 2 === 1;
      const mirroredChar = isRTL ? bidi$1.getMirroredCharacter(attributedString.string.charAt(index)) : null;
      updatedString += mirroredChar || char;
    });
    return {
      ...attributedString,
      string: updatedString,
      levels
    };
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * A LayoutEngine is the main object that performs text layout.
 * It accepts an AttributedString and a Container object
 * to layout text into, and uses several helper objects to perform
 * various layout tasks. These objects can be overridden to customize
 * layout behavior.
 *
 * @param {Object} engines engines
 */
const layoutEngine = engines => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @param {Rect} container container rect
   * @param {Object} options layout options
   * @returns {Object[]} paragraph blocks
   */
  return function (attributedString, container, options) {
    if (options === void 0) {
      options = {};
    }
    const processParagraph = compose(resolveYOffset(), resolveAttachments(), verticalAlignment(), wrapWords(engines, options), generateGlyphs(), mirrorString(), preprocessRuns(engines, options));
    const processParagraphs = paragraphs => paragraphs.map(processParagraph);
    return compose(finalizeFragments(engines, options), bidiReordering(), typesetter(engines, options, container), processParagraphs, splitParagraphs(), applyDefaultStyles())(attributedString);
  };
};

const bidi = bidiFactory();

/**
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */
const bidiEngine = () => attributedString => {
  var _attributedString$run;
  const {
    string
  } = attributedString;
  const direction = (_attributedString$run = attributedString.runs[0]) === null || _attributedString$run === void 0 ? void 0 : _attributedString$run.attributes.direction;
  const {
    levels
  } = bidi.getEmbeddingLevels(string, direction);
  let lastLevel = null;
  let lastIndex = 0;
  let index = 0;
  const res = [];
  for (let i = 0; i < levels.length; i += 1) {
    const level = levels[i];
    if (level !== lastLevel) {
      if (lastLevel !== null) {
        res.push({
          start: lastIndex,
          end: index,
          attributes: {
            bidiLevel: lastLevel
          }
        });
      }
      lastIndex = index;
      lastLevel = level;
    }
    index += 1;
  }
  if (lastIndex < string.length) {
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        bidiLevel: lastLevel
      }
    });
  }
  return {
    string,
    runs: res
  };
};

/* eslint-disable no-plusplus */
const INFINITY = 10000;

/**
 * @param {Object[]} subnodes
 * @param {number[]} widths
 * @param {number} lineNumber
 * @returns {number}
 */
const getNextBreakpoint = (subnodes, widths, lineNumber) => {
  let position = null;
  let minimumBadness = Infinity;
  const sum = {
    width: 0,
    stretch: 0,
    shrink: 0
  };
  const lineLength = widths[Math.min(lineNumber, widths.length - 1)];
  const calculateRatio = node => {
    if (sum.width < lineLength) {
      return sum.stretch - node.stretch > 0 ? (lineLength - sum.width) / sum.stretch : INFINITY;
    }
    if (sum.width > lineLength) {
      return sum.shrink - node.shrink > 0 ? (lineLength - sum.width) / sum.shrink : INFINITY;
    }
    return 0;
  };
  for (let i = 0; i < subnodes.length; i += 1) {
    const node = subnodes[i];
    if (node.type === 'box') {
      sum.width += node.width;
    } else if (node.type === 'glue') {
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    }
    if (sum.width - sum.shrink > lineLength) {
      if (position === null) {
        let j = i === 0 ? i + 1 : i;
        while (j < subnodes.length && (subnodes[j].type === 'glue' || subnodes[j].type === 'penalty')) {
          j++;
        }
        position = j - 1;
      }
      break;
    }
    if (node.type === 'penalty' || node.type === 'glue') {
      const ratio = calculateRatio(node);
      const penalty = node.type === 'penalty' ? node.penalty : 0;
      const badness = 100 * Math.abs(ratio) ** 3 + penalty;
      if (minimumBadness >= badness) {
        position = i;
        minimumBadness = badness;
      }
    }
  }
  return sum.width - sum.shrink > lineLength ? position : null;
};

/**
 * @param {Object[]} nodes
 * @param {number[]} widths
 */
const applyBestFit = (nodes, widths) => {
  let count = 0;
  let lineNumber = 0;
  let subnodes = nodes;
  const breakpoints = [{
    position: 0
  }];
  while (subnodes.length > 0) {
    const breakpoint = getNextBreakpoint(subnodes, widths, lineNumber);
    if (breakpoint !== null) {
      count += breakpoint;
      breakpoints.push({
        position: count
      });
      subnodes = subnodes.slice(breakpoint + 1, subnodes.length);
      count++;
      lineNumber++;
    } else {
      subnodes = [];
    }
  }
  return breakpoints;
};

/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
class Node {
  constructor(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
  toString() {
    return this.data.toString();
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.listSize = 0;
    this.listLength = 0;
  }
  isLinked(node) {
    return !(node && node.prev === null && node.next === null && this.tail !== node && this.head !== node || this.isEmpty());
  }
  size() {
    return this.listSize;
  }
  isEmpty() {
    return this.listSize === 0;
  }
  first() {
    return this.head;
  }
  last() {
    return this.last;
  }
  toString() {
    return this.toArray().toString();
  }
  toArray() {
    let node = this.head;
    const result = [];
    while (node !== null) {
      result.push(node);
      node = node.next;
    }
    return result;
  }
  forEach(fun) {
    let node = this.head;
    while (node !== null) {
      fun(node);
      node = node.next;
    }
  }
  contains(n) {
    let node = this.head;
    if (!this.isLinked(n)) {
      return false;
    }
    while (node !== null) {
      if (node === n) {
        return true;
      }
      node = node.next;
    }
    return false;
  }
  at(i) {
    let node = this.head;
    let index = 0;
    if (i >= this.listLength || i < 0) {
      return null;
    }
    while (node !== null) {
      if (i === index) {
        return node;
      }
      node = node.next;
      index += 1;
    }
    return null;
  }
  insertAfter(node, newNode) {
    if (!this.isLinked(node)) {
      return this;
    }
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next === null) {
      this.tail = newNode;
    } else {
      node.next.prev = newNode;
    }
    node.next = newNode;
    this.listSize += 1;
    return this;
  }
  insertBefore(node, newNode) {
    if (!this.isLinked(node)) {
      return this;
    }
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev === null) {
      this.head = newNode;
    } else {
      node.prev.next = newNode;
    }
    node.prev = newNode;
    this.listSize += 1;
    return this;
  }
  push(node) {
    if (this.head === null) {
      this.unshift(node);
    } else {
      this.insertAfter(this.tail, node);
    }
    return this;
  }
  unshift(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      node.prev = null;
      node.next = null;
      this.listSize += 1;
    } else {
      this.insertBefore(this.head, node);
    }
    return this;
  }
  remove(node) {
    if (!this.isLinked(node)) {
      return this;
    }
    if (node.prev === null) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }
    if (node.next === null) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }
    this.listSize -= 1;
    return this;
  }
  pop() {
    const node = this.tail;
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.listSize -= 1;
    node.prev = null;
    node.next = null;
    return node;
  }
  shift() {
    const node = this.head;
    this.head.next.prev = null;
    this.head = this.head.next;
    this.listSize -= 1;
    node.prev = null;
    node.next = null;
    return node;
  }
}
LinkedList.Node = Node;

/* eslint-disable no-restricted-properties */

/**
 * @param {Object[]} nodes
 * @param {number[]} lines
 * @param {Object} settings
 * @preserve Knuth and Plass line breaking algorithm in JavaScript
 *
 * Licensed under the new BSD License.
 * Copyright 2009-2010, Bram Stein
 * All rights reserved.
 */
const linebreak = (nodes, lines, settings) => {
  const options = {
    demerits: {
      line: settings && settings.demerits && settings.demerits.line || 10,
      flagged: settings && settings.demerits && settings.demerits.flagged || 100,
      fitness: settings && settings.demerits && settings.demerits.fitness || 3000
    },
    tolerance: settings && settings.tolerance || 3
  };
  const activeNodes = new LinkedList();
  const sum = {
    width: 0,
    stretch: 0,
    shrink: 0
  };
  const lineLengths = lines;
  const breaks = [];
  let tmp = {
    data: {
      demerits: Infinity
    }
  };
  function breakpoint(position, demerits, ratio, line, fitnessClass, totals, previous) {
    return {
      position,
      demerits,
      ratio,
      line,
      fitnessClass,
      totals: totals || {
        width: 0,
        stretch: 0,
        shrink: 0
      },
      previous
    };
  }
  function computeCost(start, end, active, currentLine) {
    let width = sum.width - active.totals.width;
    let stretch = 0;
    let shrink = 0;
    // If the current line index is within the list of linelengths, use it, otherwise use
    // the last line length of the list.
    const lineLength = currentLine < lineLengths.length ? lineLengths[currentLine - 1] : lineLengths[lineLengths.length - 1];
    if (nodes[end].type === 'penalty') {
      width += nodes[end].width;
    }
    if (width < lineLength) {
      // Calculate the stretch ratio
      stretch = sum.stretch - active.totals.stretch;
      if (stretch > 0) {
        return (lineLength - width) / stretch;
      }
      return linebreak.infinity;
    }
    if (width > lineLength) {
      // Calculate the shrink ratio
      shrink = sum.shrink - active.totals.shrink;
      if (shrink > 0) {
        return (lineLength - width) / shrink;
      }
      return linebreak.infinity;
    }

    // perfect match
    return 0;
  }

  // Add width, stretch and shrink values from the current
  // break point up to the next box or forced penalty.
  function computeSum(breakPointIndex) {
    const result = {
      width: sum.width,
      stretch: sum.stretch,
      shrink: sum.shrink
    };
    for (let i = breakPointIndex; i < nodes.length; i += 1) {
      if (nodes[i].type === 'glue') {
        result.width += nodes[i].width;
        result.stretch += nodes[i].stretch;
        result.shrink += nodes[i].shrink;
      } else if (nodes[i].type === 'box' || nodes[i].type === 'penalty' && nodes[i].penalty === -linebreak.infinity && i > breakPointIndex) {
        break;
      }
    }
    return result;
  }

  // The main loop of the algorithm
  // eslint-disable-next-line no-shadow
  function mainLoop(node, index, nodes) {
    let active = activeNodes.first();
    let next = null;
    let ratio = 0;
    let demerits = 0;
    /**
     * @type {Object[]}
     */
    let candidates = [];
    let badness;
    let currentLine = 0;
    let tmpSum;
    let currentClass = 0;
    let fitnessClass;
    /**
     * @type {Object}
     */
    let candidate;
    let newNode;

    // The inner loop iterates through all the active nodes with line < currentLine and then
    // breaks out to insert the new active node candidates before looking at the next active
    // nodes for the next lines. The result of this is that the active node list is always
    // sorted by line number.
    while (active !== null) {
      candidates = [{
        demerits: Infinity
      }, {
        demerits: Infinity
      }, {
        demerits: Infinity
      }, {
        demerits: Infinity
      }];

      // Iterate through the linked list of active nodes to find new potential active nodes
      // and deactivate current active nodes.
      while (active !== null) {
        next = active.next;
        currentLine = active.data.line + 1;
        ratio = computeCost(active.data.position, index, active.data, currentLine);

        // Deactive nodes when the distance between the current active node and the
        // current node becomes too large (i.e. it exceeds the stretch limit and the stretch
        // ratio becomes negative) or when the current node is a forced break (i.e. the end
        // of the paragraph when we want to remove all active nodes, but possibly have a final
        // candidate active node---if the paragraph can be set using the given tolerance value.)
        if (ratio < -1 || node.type === 'penalty' && node.penalty === -linebreak.infinity) {
          activeNodes.remove(active);
        }

        // If the ratio is within the valid range of -1 <= ratio <= tolerance calculate the
        // total demerits and record a candidate active node.
        if (ratio >= -1 && ratio <= options.tolerance) {
          badness = 100 * Math.pow(Math.abs(ratio), 3);

          // Positive penalty
          if (node.type === 'penalty' && node.penalty >= 0) {
            demerits = Math.pow(options.demerits.line + badness, 2) + Math.pow(node.penalty, 2);
            // Negative penalty but not a forced break
          } else if (node.type === 'penalty' && node.penalty !== -linebreak.infinity) {
            demerits = Math.pow(options.demerits.line + badness, 2) - Math.pow(node.penalty, 2);
            // All other cases
          } else {
            demerits = Math.pow(options.demerits.line + badness, 2);
          }
          if (node.type === 'penalty' && nodes[active.data.position].type === 'penalty') {
            demerits += options.demerits.flagged * node.flagged * nodes[active.data.position].flagged;
          }

          // Calculate the fitness class for this candidate active node.
          if (ratio < -0.5) {
            currentClass = 0;
          } else if (ratio <= 0.5) {
            currentClass = 1;
          } else if (ratio <= 1) {
            currentClass = 2;
          } else {
            currentClass = 3;
          }

          // Add a fitness penalty to the demerits if the fitness classes of two adjacent lines
          // differ too much.
          if (Math.abs(currentClass - active.data.fitnessClass) > 1) {
            demerits += options.demerits.fitness;
          }

          // Add the total demerits of the active node to get the total demerits of this candidate node.
          demerits += active.data.demerits;

          // Only store the best candidate for each fitness class
          if (demerits < candidates[currentClass].demerits) {
            candidates[currentClass] = {
              active,
              demerits,
              ratio
            };
          }
        }
        active = next;

        // Stop iterating through active nodes to insert new candidate active nodes in the active list
        // before moving on to the active nodes for the next line.
        // TODO: The Knuth and Plass paper suggests a conditional for currentLine < j0. This means paragraphs
        // with identical line lengths will not be sorted by line number. Find out if that is a desirable outcome.
        // For now I left this out, as it only adds minimal overhead to the algorithm and keeping the active node
        // list sorted has a higher priority.
        if (active !== null && active.data.line >= currentLine) {
          break;
        }
      }
      tmpSum = computeSum(index);
      for (fitnessClass = 0; fitnessClass < candidates.length; fitnessClass += 1) {
        candidate = candidates[fitnessClass];
        if (candidate.demerits < Infinity) {
          newNode = new LinkedList.Node(breakpoint(index, candidate.demerits, candidate.ratio, candidate.active.data.line + 1, fitnessClass, tmpSum, candidate.active));
          if (active !== null) {
            activeNodes.insertBefore(active, newNode);
          } else {
            activeNodes.push(newNode);
          }
        }
      }
    }
  }

  // Add an active node for the start of the paragraph.
  activeNodes.push(new LinkedList.Node(breakpoint(0, 0, 0, 0, 0, undefined, null)));

  // eslint-disable-next-line no-shadow
  nodes.forEach((node, index, nodes) => {
    if (node.type === 'box') {
      sum.width += node.width;
    } else if (node.type === 'glue') {
      if (index > 0 && nodes[index - 1].type === 'box') {
        mainLoop(node, index, nodes);
      }
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    } else if (node.type === 'penalty' && node.penalty !== linebreak.infinity) {
      mainLoop(node, index, nodes);
    }
  });
  if (activeNodes.size() !== 0) {
    // Find the best active node (the one with the least total demerits.)
    activeNodes.forEach(node => {
      if (node.data.demerits < tmp.data.demerits) {
        tmp = node;
      }
    });
    while (tmp !== null) {
      breaks.push({
        position: tmp.data.position,
        ratio: tmp.data.ratio
      });
      tmp = tmp.data.previous;
    }
    return breaks.reverse();
  }
  return [];
};
linebreak.infinity = 10000;
linebreak.glue = (width, value, stretch, shrink) => ({
  type: 'glue',
  value,
  width,
  stretch,
  shrink
});
linebreak.box = function (width, value, hyphenated) {
  if (hyphenated === void 0) {
    hyphenated = false;
  }
  return {
    type: 'box',
    width,
    value,
    hyphenated
  };
};
linebreak.penalty = (width, penalty, flagged) => ({
  type: 'penalty',
  width,
  penalty,
  flagged
});

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Add scalar to run
 *
 * @param {number} n scalar
 * @param {Run} run run
 * @returns {Run} added run
 */
const add = (n, run) => {
  const start = run.start + n;
  const end = run.end + n;
  return Object.assign({}, run, {
    start,
    end
  });
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run length
 *
 * @param {Run} run run
 * @returns {number} length
 */
const length = run => {
  return run.end - run.start;
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Concats two runs into one
 *
 * @param {Run} runA first run
 * @param {Run} runB second run
 * @returns {Run} concatenated run
 */
const concat = (runA, runB) => {
  const end = runA.end + length(runB);
  const glyphs = (runA.glyphs || []).concat(runB.glyphs || []);
  const positions = (runA.positions || []).concat(runB.positions || []);
  const attributes = Object.assign({}, runA.attributes, runB.attributes);
  const runAIndices = runA.glyphIndices || [];
  const runALastIndex = last(runAIndices) || 0;
  const runBIndices = (runB.glyphIndices || []).map(i => i + runALastIndex + 1);
  const glyphIndices = normalize(runAIndices.concat(runBIndices));
  return Object.assign({}, runA, {
    end,
    glyphs,
    positions,
    attributes,
    glyphIndices
  });
};

/**
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Insert glyph to run in the given index
 *
 * @param {number} index index
 * @param {Glyph} glyph glyph
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
const insertGlyph$1 = (index, glyph, run) => {
  if (!glyph) return run;

  // Split resolves ligature splitting in case new glyph breaks some
  const leadingRun = slice$1(0, index, run);
  const trailingRun = slice$1(index, Infinity, run);
  return concat(append$1(glyph, leadingRun), trailingRun);
};

/**
 * Insert either glyph or code point to run in the given index
 *
 * @param {number} index index
 * @param {Glyph | number} value glyph or codePoint
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
const insert = (index, value, run) => {
  const font = getFont(run);
  const glyph = isNumber(value) ? fromCodePoint(value, font) : value;
  return insertGlyph$1(index, glyph, run);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get run index at char index
 *
 * @param {number} n char index
 * @param {AttributedString} string attributed string
 * @returns {number} run index
 */
const runIndexAt = (n, string) => {
  return runIndexAt$1(n, string.runs);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Insert glyph into attributed string
 *
 * @param {number} index index
 * @param {Glyph} glyph glyph
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
const insertGlyph = (index, glyph, attributedString) => {
  const runIndex = runIndexAt(index, attributedString);

  // Add glyph to the end if run index invalid
  if (runIndex === -1) return append(glyph, attributedString);
  const codePoints = (glyph === null || glyph === void 0 ? void 0 : glyph.codePoints) || [];
  const string = attributedString.string.slice(0, index) + stringFromCodePoints(codePoints) + attributedString.string.slice(index);
  const runs = attributedString.runs.map((run, i) => {
    if (i === runIndex) return insert(index - run.start, glyph, run);
    if (i > runIndex) return add(codePoints.length, run);
    return run;
  });
  return Object.assign({}, attributedString, {
    string,
    runs
  });
};

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Advance width between two string indices
 *
 * @param {number} start glyph index
 * @param {number} end glyph index
 * @param {Run} run run
 * @returns {number} advanced width run
 */
const advanceWidthBetween$1 = (start, end, run) => {
  const runStart = run.start || 0;
  const glyphStartIndex = Math.max(0, glyphIndexAt(start - runStart, run));
  const glyphEndIndex = Math.max(0, glyphIndexAt(end - runStart, run));
  const positions = (run.positions || []).slice(glyphStartIndex, glyphEndIndex);
  return advanceWidth$2(positions);
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Advance width between start and end
 * Does not consider ligature splitting for the moment.
 * Check performance impact on supporting this
 *
 * @param {number} start offset
 * @param {number} end offset
 * @param {AttributedString} attributedString
 * @returns {number} advance width
 */
const advanceWidthBetween = (start, end, attributedString) => {
  const runs = filter(start, end, attributedString.runs);
  return runs.reduce((acc, run) => acc + advanceWidthBetween$1(start, end, run), 0);
};

/**
 * @typedef {import('../../types.js').AttributedString} AttributedString
 * @typedef {import('../../types.js').Attributes} Attributes
 */

const HYPHEN = 0x002d;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 50;
const opts = {
  width: 3,
  stretch: 6,
  shrink: 9
};

/**
 * Slice attributed string to many lines
 *
 * @param {AttributedString} string attributed string
 * @param {Object[]} nodes
 * @param {Object[]} breaks
 * @returns {AttributedString[]} attributed strings
 */
const breakLines = (string, nodes, breaks) => {
  let start = 0;
  let end = null;
  const lines = breaks.reduce((acc, breakPoint) => {
    const node = nodes[breakPoint.position];
    const prevNode = nodes[breakPoint.position - 1];

    // Last breakpoint corresponds to K&P mandatory final glue
    if (breakPoint.position === nodes.length - 1) return acc;
    let line;
    if (node.type === 'penalty') {
      end = prevNode.value.end;
      line = slice(start, end, string);
      line = insertGlyph(line.length, HYPHEN, line);
    } else {
      end = node.value.end;
      line = slice(start, end, string);
    }
    start = end;
    return [...acc, line];
  }, []);

  // Last line
  lines.push(slice(start, string.string.length, string));
  return lines;
};

/**
 * Return Knuth & Plass nodes based on line and previously calculated syllables
 *
 * @param {AttributedString} attributedString attributed string
 * @param {Object} args attributed string args
 * @param {Object} options layout options
 * @returns {Object[]} attributed strings
 */
const getNodes = (attributedString, _ref, options) => {
  let {
    align
  } = _ref;
  let start = 0;
  const hyphenWidth = 5;
  const {
    syllables
  } = attributedString;
  const hyphenPenalty = options.hyphenationPenalty || (align === 'justify' ? 100 : 600);
  const result = syllables.reduce((acc, s, index) => {
    const width = advanceWidthBetween(start, start + s.length, attributedString);
    if (s.trim() === '') {
      const stretch = width * opts.width / opts.stretch;
      const shrink = width * opts.width / opts.shrink;
      const value = {
        start,
        end: start + s.length
      };
      acc.push(linebreak.glue(width, value, stretch, shrink));
    } else {
      const hyphenated = syllables[index + 1] !== ' ';
      const value = {
        start,
        end: start + s.length
      };
      acc.push(linebreak.box(width, value, hyphenated));
      if (syllables[index + 1] && hyphenated) {
        acc.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
      }
    }
    start += s.length;
    return acc;
  }, []);
  result.push(linebreak.glue(0, null, linebreak.infinity, 0));
  result.push(linebreak.penalty(0, -linebreak.infinity, 1));
  return result;
};

/**
 * @param {AttributedString} attributedString attributed string
 * @returns {Attributes} styles
 */
const getStyles = attributedString => {
  var _attributedString$run, _attributedString$run2;
  return ((_attributedString$run = attributedString.runs) === null || _attributedString$run === void 0 ? void 0 : (_attributedString$run2 = _attributedString$run[0]) === null || _attributedString$run2 === void 0 ? void 0 : _attributedString$run2.attributes) || {};
};

/**
 * Performs Knuth & Plass line breaking algorithm
 * Fallbacks to best fit algorithm if latter not successful
 *
 * @param {Object} options layout options
 */
const linebreaker = options => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @param {number[]} availableWidths available widths
   * @returns {AttributedString[]} attributed strings
   */
  return (attributedString, availableWidths) => {
    let tolerance = options.tolerance || 4;
    const style = getStyles(attributedString);
    const nodes = getNodes(attributedString, style, options);

    /** @type {Object[]} */
    let breaks = linebreak(nodes, availableWidths, {
      tolerance
    });

    // Try again with a higher tolerance if the line breaking failed.
    while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
      tolerance += TOLERANCE_STEPS;
      breaks = linebreak(nodes, availableWidths, {
        tolerance
      });
    }
    if (breaks.length === 0 || breaks.length === 1 && breaks[0].position === 0) {
      breaks = applyBestFit(nodes, availableWidths);
    }
    return breakLines(attributedString, nodes, breaks.slice(1));
  };
};

const WHITESPACE_PRIORITY = 1;
const LETTER_PRIORITY = 2;
const EXPAND_WHITESPACE_FACTOR = {
  before: 0.5,
  after: 0.5,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false
};
const EXPAND_CHAR_FACTOR = {
  before: 0.14453125,
  // 37/256
  after: 0.14453125,
  priority: LETTER_PRIORITY,
  unconstrained: false
};
const SHRINK_WHITESPACE_FACTOR = {
  before: -0.04296875,
  // -11/256
  after: -0.04296875,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false
};
const SHRINK_CHAR_FACTOR = {
  before: -0.04296875,
  after: -0.04296875,
  priority: LETTER_PRIORITY,
  unconstrained: false
};
const getCharFactor = (direction, options) => {
  const expandCharFactor = options.expandCharFactor || {};
  const shrinkCharFactor = options.shrinkCharFactor || {};
  return direction === 'GROW' ? Object.assign({}, EXPAND_CHAR_FACTOR, expandCharFactor) : Object.assign({}, SHRINK_CHAR_FACTOR, shrinkCharFactor);
};
const getWhitespaceFactor = (direction, options) => {
  const expandWhitespaceFactor = options.expandWhitespaceFactor || {};
  const shrinkWhitespaceFactor = options.shrinkWhitespaceFactor || {};
  return direction === 'GROW' ? Object.assign({}, EXPAND_WHITESPACE_FACTOR, expandWhitespaceFactor) : Object.assign({}, SHRINK_WHITESPACE_FACTOR, shrinkWhitespaceFactor);
};
const factor = (direction, options) => glyphs => {
  const charFactor = getCharFactor(direction, options);
  const whitespaceFactor = getWhitespaceFactor(direction, options);
  const factors = [];
  for (let index = 0; index < glyphs.length; index += 1) {
    let f;
    const glyph = glyphs[index];
    if (isWhiteSpace(glyph)) {
      f = Object.assign({}, whitespaceFactor);
      if (index === glyphs.length - 1) {
        f.before = 0;
        if (index > 0) {
          factors[index - 1].after = 0;
        }
      }
    } else if (glyph.isMark && index > 0) {
      f = Object.assign({}, factors[index - 1]);
      f.before = 0;
      factors[index - 1].after = 0;
    } else {
      f = Object.assign({}, charFactor);
    }
    factors.push(f);
  }
  return factors;
};
const getFactors = (gap, line, options) => {
  const direction = gap > 0 ? 'GROW' : 'SHRINK';
  const getFactor = factor(direction, options);
  const factors = line.runs.reduce((acc, run) => {
    return acc.concat(getFactor(run.glyphs));
  }, []);
  factors[0].before = 0;
  factors[factors.length - 1].after = 0;
  return factors;
};

/* eslint-disable no-multi-assign */
const KASHIDA_PRIORITY = 0;
const NULL_PRIORITY = 3;
const getDistances = (gap, factors) => {
  let total = 0;
  const priorities = [];
  const unconstrained = [];
  for (let priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) {
    priorities[priority] = unconstrained[priority] = 0;
  }

  // sum the factors at each priority
  for (let j = 0; j < factors.length; j += 1) {
    const f = factors[j];
    const sum = f.before + f.after;
    total += sum;
    priorities[f.priority] += sum;
    if (f.unconstrained) {
      unconstrained[f.priority] += sum;
    }
  }

  // choose the priorities that need to be applied
  let highestPriority = -1;
  let highestPrioritySum = 0;
  let remainingGap = gap;
  let priority;
  for (priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) {
    const prioritySum = priorities[priority];
    if (prioritySum !== 0) {
      if (highestPriority === -1) {
        highestPriority = priority;
        highestPrioritySum = prioritySum;
      }

      // if this priority covers the remaining gap, we're done
      if (Math.abs(remainingGap) <= Math.abs(prioritySum)) {
        priorities[priority] = remainingGap / prioritySum;
        unconstrained[priority] = 0;
        remainingGap = 0;
        break;
      }

      // mark that we need to use 100% of the adjustment from
      // this priority, and subtract the space that it consumes
      priorities[priority] = 1;
      remainingGap -= prioritySum;

      // if this priority has unconstrained glyphs, let them consume the remaining space
      if (unconstrained[priority] !== 0) {
        unconstrained[priority] = remainingGap / unconstrained[priority];
        remainingGap = 0;
        break;
      }
    }
  }

  // zero out remaining priorities (if any)
  for (let p = priority + 1; p <= NULL_PRIORITY; p += 1) {
    priorities[p] = 0;
    unconstrained[p] = 0;
  }

  // if there is still space left over, assign it to the highest priority that we saw.
  // this violates their factors, but it only happens in extreme cases
  if (remainingGap > 0 && highestPriority > -1) {
    priorities[highestPriority] = (highestPrioritySum + (gap - total)) / highestPrioritySum;
  }

  // create and return an array of distances to add to each glyph's advance
  const distances = [];
  for (let index = 0; index < factors.length; index += 1) {
    // the distance to add to this glyph is the sum of the space to add
    // after this glyph, and the space to add before the next glyph
    const f = factors[index];
    const next = factors[index + 1];
    let dist = f.after * priorities[f.priority];
    if (next) {
      dist += next.before * priorities[next.priority];
    }

    // if this glyph is unconstrained, add the unconstrained distance as well
    if (f.unconstrained) {
      dist += f.after * unconstrained[f.priority];
      if (next) {
        dist += next.before * unconstrained[next.priority];
      }
    }
    distances.push(dist);
  }
  return distances;
};

/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */


/**
 * Adjust run positions by given distances
 *
 * @param {number[]} distances
 * @param {Object} line
 * @returns {Object} line
 */
const justifyLine = (distances, line) => {
  let index = 0;
  for (const run of line.runs) {
    for (const position of run.positions) {
      position.xAdvance += distances[index++];
    }
  }
  return line;
};

/**
 * A JustificationEngine is used by a Typesetter to perform line fragment
 * justification. This implementation is based on a description of Apple's
 * justification algorithm from a PDF in the Apple Font Tools package.
 *
 * // TODO: Make it immutable
 *
 * @param {Object} options layout options
 */
const justification = options => {
  /**
   * @param {Object} line
   * @returns {Object} line
   */
  return line => {
    const gap = line.box.width - advanceWidth(line);
    if (gap === 0) return; // Exact fit

    const factors = getFactors(gap, line, options);
    const distances = getDistances(gap, factors);
    return justifyLine(distances, line);
  };
};

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Returns attributed string ascent
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} ascent
 */
const ascent = attributedString => {
  const reducer = (acc, run) => Math.max(acc, ascent$1(run));
  return attributedString.runs.reduce(reducer, 0);
};

/* eslint-disable no-param-reassign */


// The base font size used for calculating underline thickness.
const BASE_FONT_SIZE = 12;

/**
 * A TextDecorationEngine is used by a Typesetter to generate
 * DecorationLines for a line fragment, including underlines
 * and strikes.
 */
const textDecoration = () => lineFragment => {
  let x = lineFragment.overflowLeft || 0;
  const overflowRight = lineFragment.overflowRight || 0;
  const maxX = advanceWidth(lineFragment) - overflowRight;
  lineFragment.decorationLines = [];
  for (let i = 0; i < lineFragment.runs.length; i += 1) {
    const run = lineFragment.runs[i];
    const width = Math.min(maxX - x, advanceWidth$1(run));
    const thickness = Math.max(0.5, Math.floor(run.attributes.fontSize / BASE_FONT_SIZE));
    if (run.attributes.underline) {
      const rect = {
        x,
        y: ascent(lineFragment) + thickness * 2,
        width,
        height: thickness
      };
      const line = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.underlineColor || 'black',
        style: run.attributes.underlineStyle || 'solid'
      };
      lineFragment.decorationLines.push(line);
    }
    if (run.attributes.strike) {
      const y = ascent(lineFragment) - ascent$1(run) / 3;
      const rect = {
        x,
        y,
        width,
        height: thickness
      };
      const line = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.strikeColor || 'black',
        style: run.attributes.strikeStyle || 'solid'
      };
      lineFragment.decorationLines.push(line);
    }
    x += width;
  }
  return lineFragment;
};

const ignoredScripts = ['Common', 'Inherited', 'Unknown'];

/**
 * @typedef {import('../../types.js').AttributedString} AttributedString
 */

/**
 * Resolves unicode script in runs, grouping equal runs together
 */
const scriptItemizer = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    const {
      string
    } = attributedString;
    let lastScript = 'Unknown';
    let lastIndex = 0;
    let index = 0;
    const res = [];
    if (!string) return empty();
    for (let i = 0; i < string.length; i += 1) {
      const char = string[i];
      const codePoint = char.codePointAt();
      const script = unicode.getScript(codePoint);
      if (script !== lastScript && !ignoredScripts.includes(script)) {
        if (lastScript !== 'Unknown') {
          res.push({
            start: lastIndex,
            end: index,
            attributes: {
              script: lastScript
            }
          });
        }
        lastIndex = index;
        lastScript = script;
      }
      index += char.length;
    }
    if (lastIndex < string.length) {
      res.push({
        start: lastIndex,
        end: string.length,
        attributes: {
          script: lastScript
        }
      });
    }
    return {
      string,
      runs: res
    };
  };
};

const SOFT_HYPHEN = '\u00ad';
const hyphenator = hyphen(pattern);

/**
 * @param {string} word
 * @returns {string[]} word parts
 */
const splitHyphen = word => {
  return word.split(SOFT_HYPHEN);
};
const cache = {};

/**
 * @param {string} word
 * @returns {string[]} word parts
 */
const getParts = word => {
  const base = word.includes(SOFT_HYPHEN) ? word : hyphenator(word);
  return splitHyphen(base);
};
const wordHyphenation = () => {
  /**
   * @param {string} word word
   * @returns {string[]} word parts
   */
  return word => {
    const cacheKey = `_${word}`;
    if (isNil(word)) return [];
    if (cache[cacheKey]) return cache[cacheKey];
    cache[cacheKey] = getParts(word);
    return cache[cacheKey];
  };
};

/* eslint-disable no-restricted-syntax */


/**
 * @typedef {import('../../types.js').AttributedString} AttributedString
 * @typedef {import('../../types.js').Run} Run
 */

/**
 * @param {Run} run run
 * @returns {number}
 */
const getFontSize = run => {
  return run.attributes.fontSize || 12;
};

/**
 * Resolve font runs in an AttributedString, grouping equal
 * runs and performing font substitution where necessary.
 */
const fontSubstitution = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return attributedString => {
    const {
      string,
      runs
    } = attributedString;
    let lastFont = null;
    let lastIndex = 0;
    let index = 0;
    const res = [];
    if (!string) return empty();
    for (const run of runs) {
      const fontSize = getFontSize(run);
      const defaultFont = run.attributes.font;
      if (string.length === 0) {
        res.push({
          start: 0,
          end: 0,
          attributes: {
            font: defaultFont
          }
        });
        break;
      }
      for (const char of string.slice(run.start, run.end)) {
        const font = defaultFont;
        if (font !== lastFont) {
          if (lastFont) {
            res.push({
              start: lastIndex,
              end: index,
              attributes: {
                font: lastFont,
                scale: lastFont ? fontSize / lastFont.unitsPerEm : 0
              }
            });
          }
          lastFont = font;
          lastIndex = index;
        }
        index += char.length;
      }
    }
    if (lastIndex < string.length) {
      const fontSize = getFontSize(last(runs));
      res.push({
        start: lastIndex,
        end: string.length,
        attributes: {
          font: lastFont,
          scale: lastFont ? fontSize / lastFont.unitsPerEm : 0
        }
      });
    }
    return {
      string,
      runs: res
    };
  };
};

export { bidiEngine as bidi, layoutEngine as default, fontSubstitution, justification, linebreaker, scriptItemizer, textDecoration, wordHyphenation };
