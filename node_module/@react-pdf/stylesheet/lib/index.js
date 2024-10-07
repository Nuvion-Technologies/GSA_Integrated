import { compose, castArray } from '@react-pdf/fns';
import parse$1 from 'postcss-value-parser/lib/parse.js';
import parseUnit from 'postcss-value-parser/lib/unit.js';
import hlsToHex from 'hsl-to-hex';
import colorString from 'color-string';
import matchMedia from 'media-engine';

// https://developer.mozilla.org/en-US/docs/Web/CSS/flex#values

// TODO: change flex defaults to [0, 1, 'auto'] as in spec in next major release
const flexDefaults = [1, 1, 0];
/**
 * @type {(number | 'auto')[]}
 */
const flexAuto = [1, 1, 'auto'];
const expandFlex = (key, value) => {
  /**
   * @type {(number | 'auto')[]}
   */
  let defaults = flexDefaults;
  let matches = [];
  if (value === 'auto') {
    defaults = flexAuto;
  } else {
    matches = `${value}`.split(' ');
  }
  const flexGrow = matches[0] || defaults[0];
  const flexShrink = matches[1] || defaults[1];
  const flexBasis = matches[2] || defaults[2];
  return {
    flexGrow,
    flexShrink,
    flexBasis
  };
};

/* eslint-disable no-plusplus */
// This file is ran directly with Node - needs to have .js extension
// eslint-disable-next-line import/extensions
const BOX_MODEL_UNITS = 'px,in,mm,cm,pt,%,vw,vh';
const logError = (style, value) => {
  console.error(`
    @react-pdf/stylesheet parsing error:

    ${style}: ${value},
    ${' '.repeat(style.length + 2)}^
    Unsupported ${style} value format
  `);
};

/**
 * @param {Object} options
 * @param {Function} [options.expandsTo]
 * @param {number} [options.maxValues]
 * @param {boolean} [options.autoSupported]
 */
const expandBoxModel = function (_temp) {
  let {
    expandsTo,
    maxValues = 1,
    autoSupported = false
  } = _temp === void 0 ? {} : _temp;
  return (model, value) => {
    const nodes = parse$1(`${value}`);
    const parts = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // value contains `calc`, `url` or other css function
      // `,`, `/` or strings that unsupported by margin and padding
      if (node.type === 'function' || node.type === 'string' || node.type === 'div') {
        logError(model, value);
        return {};
      }
      if (node.type === 'word') {
        if (node.value === 'auto' && autoSupported) {
          parts.push(node.value);
        } else {
          const result = parseUnit(node.value);

          // when unit isn't specified this condition is true
          if (result && BOX_MODEL_UNITS.includes(result.unit)) {
            parts.push(node.value);
          } else {
            logError(model, value);
            return {};
          }
        }
      }
    }

    // checks that we have enough parsed values
    if (parts.length > maxValues) {
      logError(model, value);
      return {};
    }
    const first = parts[0];
    if (expandsTo) {
      const second = parts[1] || parts[0];
      const third = parts[2] || parts[0];
      const fourth = parts[3] || parts[1] || parts[0];
      return expandsTo({
        first,
        second,
        third,
        fourth
      });
    }
    return {
      [model]: first
    };
  };
};

const processMargin = expandBoxModel({
  expandsTo: _ref => {
    let {
      first,
      second,
      third,
      fourth
    } = _ref;
    return {
      marginTop: first,
      marginRight: second,
      marginBottom: third,
      marginLeft: fourth
    };
  },
  maxValues: 4,
  autoSupported: true
});
const processMarginVertical = expandBoxModel({
  expandsTo: _ref2 => {
    let {
      first,
      second
    } = _ref2;
    return {
      marginTop: first,
      marginBottom: second
    };
  },
  maxValues: 2,
  autoSupported: true
});
const processMarginHorizontal = expandBoxModel({
  expandsTo: _ref3 => {
    let {
      first,
      second
    } = _ref3;
    return {
      marginRight: first,
      marginLeft: second
    };
  },
  maxValues: 2,
  autoSupported: true
});
const processMarginSingle = expandBoxModel({
  autoSupported: true
});

const BORDER_SHORTHAND_REGEX = /(-?\d+(\.\d+)?(px|in|mm|cm|pt|vw|vh|px)?)\s(\S+)\s(.+)/;
const matchBorderShorthand = value => value.match(BORDER_SHORTHAND_REGEX) || [];
const expandBorders = (key, value) => {
  const match = matchBorderShorthand(`${value}`);
  if (match) {
    const color = match[5] || value;
    const style = match[4] || value;
    const width = match[1] || value;
    if (key.match(/(Top|Right|Bottom|Left)$/)) {
      return {
        [`${key}Color`]: color,
        [`${key}Style`]: style,
        [`${key}Width`]: width
      };
    }
    if (key.match(/Color$/)) {
      return {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color
      };
    }
    if (key.match(/Style$/)) {
      return {
        borderTopStyle: style,
        borderRightStyle: style,
        borderBottomStyle: style,
        borderLeftStyle: style
      };
    }
    if (key.match(/Width$/)) {
      return {
        borderTopWidth: width,
        borderRightWidth: width,
        borderBottomWidth: width,
        borderLeftWidth: width
      };
    }
    if (key.match(/Radius$/)) {
      return {
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
        borderBottomLeftRadius: value
      };
    }
    return {
      borderTopColor: color,
      borderTopStyle: style,
      borderTopWidth: width,
      borderRightColor: color,
      borderRightStyle: style,
      borderRightWidth: width,
      borderBottomColor: color,
      borderBottomStyle: style,
      borderBottomWidth: width,
      borderLeftColor: color,
      borderLeftStyle: style,
      borderLeftWidth: width
    };
  }
  return value;
};

const processPadding = expandBoxModel({
  expandsTo: _ref => {
    let {
      first,
      second,
      third,
      fourth
    } = _ref;
    return {
      paddingTop: first,
      paddingRight: second,
      paddingBottom: third,
      paddingLeft: fourth
    };
  },
  maxValues: 4
});
const processPaddingVertical = expandBoxModel({
  expandsTo: _ref2 => {
    let {
      first,
      second
    } = _ref2;
    return {
      paddingTop: first,
      paddingBottom: second
    };
  },
  maxValues: 2
});
const processPaddingHorizontal = expandBoxModel({
  expandsTo: _ref3 => {
    let {
      first,
      second
    } = _ref3;
    return {
      paddingRight: first,
      paddingLeft: second
    };
  },
  maxValues: 2
});
const processPaddingSingle = expandBoxModel();

const expandObjectPosition = (key, value) => {
  const match = `${value}`.split(' ');
  return {
    objectPositionX: (match === null || match === void 0 ? void 0 : match[0]) || value,
    objectPositionY: (match === null || match === void 0 ? void 0 : match[1]) || value
  };
};

const Y_AXIS_SHORTHANDS = {
  top: true,
  bottom: true
};
const sortTransformOriginPair = (a, b) => {
  if (Y_AXIS_SHORTHANDS[a]) return 1;
  if (Y_AXIS_SHORTHANDS[b]) return -1;
  return 0;
};
const getTransformOriginPair = values => {
  if (!values || values.length === 0) return ['center', 'center'];
  const pair = values.length === 1 ? [values[0], 'center'] : values;
  return pair.sort(sortTransformOriginPair);
};

// Transforms shorthand transformOrigin values
const expandTransformOrigin = (key, value) => {
  const match = `${value}`.split(' ');
  const pair = getTransformOriginPair(match);
  return {
    transformOriginX: pair[0],
    transformOriginY: pair[1]
  };
};

const expandGap = (key, value) => {
  const match = `${value}`.split(' ');
  return {
    rowGap: (match === null || match === void 0 ? void 0 : match[0]) || value,
    columnGap: (match === null || match === void 0 ? void 0 : match[1]) || value
  };
};

const shorthands = {
  flex: expandFlex,
  gap: expandGap,
  margin: processMargin,
  marginHorizontal: processMarginHorizontal,
  marginVertical: processMarginVertical,
  marginTop: processMarginSingle,
  marginRight: processMarginSingle,
  marginBottom: processMarginSingle,
  marginLeft: processMarginSingle,
  padding: processPadding,
  paddingHorizontal: processPaddingHorizontal,
  paddingVertical: processPaddingVertical,
  paddingTop: processPaddingSingle,
  paddingRight: processPaddingSingle,
  paddingBottom: processPaddingSingle,
  paddingLeft: processPaddingSingle,
  border: expandBorders,
  borderTop: expandBorders,
  borderRight: expandBorders,
  borderBottom: expandBorders,
  borderLeft: expandBorders,
  borderColor: expandBorders,
  borderRadius: expandBorders,
  borderStyle: expandBorders,
  borderWidth: expandBorders,
  objectPosition: expandObjectPosition,
  transformOrigin: expandTransformOrigin
};

/**
 * Transforms style key-value
 *
 * @param {string} key style key
 * @param {string} value style value
 * @returns {string | Number} transformed style values
 */
const expandStyle = (key, value) => {
  return shorthands[key] ? shorthands[key](key, value) : {
    [key]: value
  };
};

/**
 * Expand the shorthand properties.
 *
 * @param {Object} style object
 * @returns {Object} expanded style object
 */
const expand = style => {
  if (!style) return style;
  const propsArray = Object.keys(style);
  const resolvedStyle = {};
  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = style[key];
    const extended = expandStyle(key, value);
    const keys = Object.keys(extended);
    for (let j = 0; j < keys.length; j += 1) {
      const propName = keys[j];
      const propValue = extended[propName];
      resolvedStyle[propName] = propValue;
    }
  }
  return resolvedStyle;
};

/**
 * Remove nil values from array
 *
 * @template T
 * @param {(T | null | undefined)[]} array
 * @returns {T[]} array without nils
 */
const compact = array => array.filter(Boolean);

/**
 * Merges style objects array
 *
 * @param {Object[]} styles style objects array
 * @returns {Object} merged style object
 */
const mergeStyles = styles => styles.reduce((acc, style) => {
  const s = Array.isArray(style) ? flatten(style) : style;
  Object.keys(s).forEach(key => {
    if (s[key] !== null && s[key] !== undefined) {
      acc[key] = s[key];
    }
  });
  return acc;
}, {});

/**
 * Flattens an array of style objects, into one aggregated style object.
 *
 * @param {Object[]} styles style objects array
 * @returns {Object} flattened style object
 */
const flatten = compose(mergeStyles, compact, castArray);

/**
 * Parses scalar value in value and unit pairs
 *
 * @param {string} value scalar value
 * @returns {Object} parsed value
 */
const parseValue = value => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px)?$/g.exec(value);
  return match ? {
    value: parseFloat(match[1]),
    unit: match[2] || 'pt'
  } : {
    value,
    unit: undefined
  };
};

/**
 * Transform given scalar value
 *
 * @param {Object} container
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const transformUnit = (container, value) => {
  const scalar = parseValue(value);
  const dpi = 72; // Removed: container.dpi || 72
  const mmFactor = 1 / 25.4 * dpi;
  const cmFactor = 1 / 2.54 * dpi;
  switch (scalar.unit) {
    case 'in':
      return scalar.value * dpi;
    case 'mm':
      return scalar.value * mmFactor;
    case 'cm':
      return scalar.value * cmFactor;
    case 'vh':
      return scalar.value * (container.height / 100);
    case 'vw':
      return scalar.value * (container.width / 100);
    default:
      return scalar.value;
  }
};

const isRgb = value => /rgba?/g.test(value);
const isHsl = value => /hsla?/g.test(value);

/**
 * Transform rgb color to hexa
 *
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const parseRgb = value => {
  const rgb = colorString.get.rgb(value);
  return colorString.to.hex(rgb);
};

/**
 * Transform Hsl color to hexa
 *
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const parseHsl = value => {
  const hsl = colorString.get.hsl(value).map(Math.round);
  const hex = hlsToHex(...hsl);
  return hex.toUpperCase();
};

/**
 * Transform given color to hexa
 *
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const transformColor = value => {
  if (isRgb(value)) return parseRgb(value);
  if (isHsl(value)) return parseHsl(value);
  return value;
};

const parse = transformString => {
  const transforms = transformString.trim().split(/\) |\)/);

  // Handle "initial", "inherit", "unset".
  if (transforms.length === 1) {
    return [[transforms[0], true]];
  }
  const parsed = [];
  for (let i = 0; i < transforms.length; i += 1) {
    const transform = transforms[i];
    if (transform) {
      const [name, rawValue] = transform.split('(');
      const splitChar = rawValue.indexOf(',') >= 0 ? ',' : ' ';
      const value = rawValue.split(splitChar).map(val => val.trim());
      parsed.push({
        operation: name,
        value
      });
    }
  }
  return parsed;
};
const parseAngle = value => {
  const unitsRegexp = /(-?\d*\.?\d*)(\w*)?/i;
  const [, angle, unit] = unitsRegexp.exec(value);
  const number = Number.parseFloat(angle);
  return unit === 'rad' ? number * 180 / Math.PI : number;
};
const normalizeTransformOperation = _ref => {
  let {
    operation,
    value
  } = _ref;
  switch (operation) {
    case 'scale':
      {
        const [scaleX, scaleY = scaleX] = value.map(num => Number.parseFloat(num));
        return {
          operation: 'scale',
          value: [scaleX, scaleY]
        };
      }
    case 'scaleX':
      {
        return {
          operation: 'scale',
          value: [Number.parseFloat(value), 1]
        };
      }
    case 'scaleY':
      {
        return {
          operation: 'scale',
          value: [1, Number.parseFloat(value)]
        };
      }
    case 'rotate':
      {
        return {
          operation: 'rotate',
          value: [parseAngle(value)]
        };
      }
    case 'translate':
      {
        return {
          operation: 'translate',
          value: value.map(num => Number.parseFloat(num))
        };
      }
    case 'translateX':
      {
        return {
          operation: 'translate',
          value: [Number.parseFloat(value), 0]
        };
      }
    case 'translateY':
      {
        return {
          operation: 'translate',
          value: [0, Number.parseFloat(value)]
        };
      }
    case 'skew':
      {
        return {
          operation: 'skew',
          value: value.map(parseAngle)
        };
      }
    case 'skewX':
      {
        return {
          operation: 'skew',
          value: [parseAngle(value), 0]
        };
      }
    case 'skewY':
      {
        return {
          operation: 'skew',
          value: [0, parseAngle(value)]
        };
      }
    default:
      {
        return {
          operation,
          value: value.map(num => Number.parseFloat(num))
        };
      }
  }
};
const normalize = operations => {
  return operations.map(operation => normalizeTransformOperation(operation));
};
const processTransform = value => {
  if (typeof value !== 'string') return value;
  return normalize(parse(value));
};

const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900
};
const processFontWeight = value => {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;
  const lv = value.toLowerCase();
  if (FONT_WEIGHTS[lv]) return FONT_WEIGHTS[lv];
  return value;
};

const matchNumber = value => typeof value === 'string' && /^-?\d*\.?\d*$/.test(value);
const castFloat = value => {
  if (typeof value !== 'string') return value;
  if (matchNumber(value)) return parseFloat(value);
  return value;
};

const offsetKeyword = value => {
  switch (value) {
    case 'top':
    case 'left':
      return '0%';
    case 'right':
    case 'bottom':
      return '100%';
    case 'center':
      return '50%';
    default:
      return null;
  }
};

const transformObjectPosition = value => offsetKeyword(value) || castFloat(value);

const transformTransformOrigin = value => offsetKeyword(value) || castFloat(value);

const handlers = {
  transform: processTransform,
  fontWeight: processFontWeight,
  objectPositionX: transformObjectPosition,
  objectPositionY: transformObjectPosition,
  transformOriginX: transformTransformOrigin,
  transformOriginY: transformTransformOrigin
};
const transformStyle = (key, value, container) => {
  const result = handlers[key] ? handlers[key](value) : value;
  return transformColor(transformUnit(container, castFloat(result)));
};

/**
 * @typedef {Function} Transform
 * @param {Object} style styles object
 * @returns {Object} transformed styles
 */

/**
 * Transform styles values
 *
 * @param {Object} container
 * @returns {Transform} transform function
 */
const transform = container => style => {
  if (!style) return style;
  const propsArray = Object.keys(style);
  const resolvedStyle = {};
  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = style[key];
    const transformed = transformStyle(key, value, container);
    resolvedStyle[key] = transformed;
  }
  return resolvedStyle;
};

/**
 * Resolves media queries in styles object
 *
 * @param {Object} container
 * @param {Object} styles object
 */
const resolveMediaQueries = (container, styles) => {
  return Object.keys(styles).reduce((acc, key) => {
    if (/@media/.test(key)) {
      return {
        ...acc,
        ...matchMedia({
          [key]: styles[key]
        }, container)
      };
    }
    return {
      ...acc,
      [key]: styles[key]
    };
  }, {});
};

/**
 * Resolves styles
 *
 * @param {Object} container
 * @param {Object} style object
 * @returns {Object} resolved style object
 */
const resolveStyles = (container, style) => {
  const computeMediaQueries = value => resolveMediaQueries(container, value);
  return compose(transform(container), expand, computeMediaQueries, flatten)(style);
};

export { resolveStyles as default, flatten, processTransform, transformColor };
