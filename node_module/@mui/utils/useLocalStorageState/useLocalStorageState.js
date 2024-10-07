"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
// storage events only work across tabs, we'll use an event emitter to announce within the current tab
const currentTabChangeListeners = new Map();
function onCurrentTabStorageChange(key, handler) {
  let listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    listeners = new Set();
    currentTabChangeListeners.set(key, listeners);
  }
  listeners.add(handler);
}
function offCurrentTabStorageChange(key, handler) {
  const listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    return;
  }
  listeners.delete(handler);
  if (listeners.size === 0) {
    currentTabChangeListeners.delete(key);
  }
}
function emitCurrentTabStorageChange(key) {
  const listeners = currentTabChangeListeners.get(key);
  if (listeners) {
    listeners.forEach(listener => listener());
  }
}
function subscribe(area, key, callbark) {
  if (!key) {
    return () => {};
  }
  const storageHandler = event => {
    if (event.storageArea === area && event.key === key) {
      callbark();
    }
  };
  window.addEventListener('storage', storageHandler);
  onCurrentTabStorageChange(key, callbark);
  return () => {
    window.removeEventListener('storage', storageHandler);
    offCurrentTabStorageChange(key, callbark);
  };
}
function getSnapshot(area, key) {
  if (!key) {
    return null;
  }
  try {
    return area.getItem(key);
  } catch {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return null;
  }
}
function setValue(area, key, value) {
  if (!key) {
    return;
  }
  try {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, String(value));
    }
  } catch {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return;
  }
  emitCurrentTabStorageChange(key);
}
const serverValue = [null, () => {}];
function useLocalStorageStateServer() {
  return serverValue;
}

/**
 * Sync state to local storage so that it persists through a page refresh. Usage is
 * similar to useState except we pass in a storage key so that we can default
 * to that value on page load instead of the specified initial value.
 *
 * Since the storage API isn't available in server-rendering environments, we
 * return null during SSR and hydration.
 */
function useLocalStorageStateBrowser(key, initializer = null) {
  const [initialValue] = React.useState(initializer);
  const area = window.localStorage;
  const subscribeKey = React.useCallback(callbark => subscribe(area, key, callbark), [area, key]);
  const getKeySnapshot = React.useCallback(() => getSnapshot(area, key) ?? initialValue, [area, initialValue, key]);

  // Start with null for the hydration, and then switch to the actual value.
  const getKeyServerSnapshot = () => null;
  const storedValue = React.useSyncExternalStore(subscribeKey, getKeySnapshot, getKeyServerSnapshot);
  const setStoredValue = React.useCallback(value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setValue(area, key, valueToStore);
  }, [area, key, storedValue]);
  const [nonStoredValue, setNonStoredValue] = React.useState(initialValue);
  if (!key) {
    return [nonStoredValue, setNonStoredValue];
  }
  return [storedValue, setStoredValue];
}
var _default = exports.default = typeof window === 'undefined' ? useLocalStorageStateServer : useLocalStorageStateBrowser;