import * as React from 'react';
import { useContext, forwardRef } from 'react';
import createCache from '@emotion/cache';
import _extends from '@babel/runtime/helpers/esm/extends';
import weakMemoize from '@emotion/weak-memoize';
import hoistNonReactStatics from '../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js';
import { getRegisteredStyles, registerStyles, insertStyles } from '@emotion/utils';
import { serializeStyles } from '@emotion/serialize';
import { useInsertionEffectAlwaysWithSyncFallback } from '@emotion/use-insertion-effect-with-fallbacks';

/* import { type EmotionCache } from '@emotion/utils' */
var EmotionCacheContext
/*: React.Context<EmotionCache | null> */
= /* #__PURE__ */React.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

{
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache()
/*: EmotionCache | null*/
{
  return useContext(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache
/* <Props, Ref: React.Ref<*>> */
(func
/*: (props: Props, cache: EmotionCache, ref: Ref) => React.Node */
)
/*: React.AbstractComponent<Props> */
{
  return /*#__PURE__*/forwardRef(function (props
  /*: Props */
  , ref
  /*: Ref */
  ) {
    // the cache will never be null in the browser
    var cache = useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */React.createContext({});

{
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return React.useContext(ThemeContext);
};

var getTheme = function getTheme(outerTheme
/*: Object */
, theme
/*: Object | (Object => Object) */
) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ((mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ((theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
/*
type ThemeProviderProps = {
  theme: Object | (Object => Object),
  children: React.Node
}
*/

var ThemeProvider = function ThemeProvider(props
/*: ThemeProviderProps */
) {
  var theme = React.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme
/* <Config: {}> */
(Component
/*: React.AbstractComponent<Config> */
)
/*: React.AbstractComponent<$Diff<Config, { theme: Object }>> */
{
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = React.useContext(ThemeContext);
    return /*#__PURE__*/React.createElement(Component, _extends({
      theme: theme,
      ref: ref
    }, props));
  };

  var WithTheme = /*#__PURE__*/React.forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoistNonReactStatics(WithTheme, Component);
}

var hasOwn = {}.hasOwnProperty;

var getLastPart = function
  /* : string */
getLastPart(functionName
/* : string */
) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function
  /*: ?string*/
getFunctionNameFromStackTraceLine(line
/*: string*/
) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type
/*: React.ElementType */
, props
/*: Object */
) {
  if (typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps
  /*: any */
  = {};

  for (var key in props) {
    if (hasOwn.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // Runtime labeling is an opt-in feature because:
  // - It causes hydration warnings when using Safari and SSR
  // - It can degrade performance if there are a huge number of elements
  //
  // Even if the flag is set, we still don't compute the label if it has already
  // been determined by the Babel plugin.

  if (typeof globalThis !== 'undefined' && !!globalThis.EMOTION_RUNTIME_AUTO_LABEL && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function () {
    return insertStyles(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(
/* <any, any> */
function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles, undefined, React.useContext(ThemeContext));

  if (serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwn.call(props, key) && key !== 'css' && key !== typePropName && (key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.className = className;

  if (ref) {
    newProps.ref = ref;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/React.createElement(WrappedComponent, newProps));
});

{
  Emotion.displayName = 'EmotionCssPropInternal';
}

var Emotion$1 = Emotion;

export { CacheProvider as C, Emotion$1 as E, ThemeContext as T, __unsafe_useEmotionCache as _, ThemeProvider as a, withTheme as b, createEmotionProps as c, hasOwn as h, useTheme as u, withEmotionCache as w };
