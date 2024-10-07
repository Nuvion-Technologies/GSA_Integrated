import {
  require_react
} from "./chunk-I773Y2XN.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}

// node_modules/@hcaptcha/react-hcaptcha/dist/esm/index.js
var React = __toESM(require_react());

// node_modules/@hcaptcha/loader/dist/index.mjs
var ir = Object.defineProperty;
var Ki = Object.defineProperties;
var Ji = Object.getOwnPropertyDescriptors;
var ht = Object.getOwnPropertySymbols;
var or = Object.prototype.hasOwnProperty;
var sr = Object.prototype.propertyIsEnumerable;
var rr = (t, e, n) => e in t ? ir(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n;
var u = (t, e) => {
  for (var n in e || (e = {})) or.call(e, n) && rr(t, n, e[n]);
  if (ht) for (var n of ht(e)) sr.call(e, n) && rr(t, n, e[n]);
  return t;
};
var h = (t, e) => Ki(t, Ji(e));
var ar = (t, e) => {
  var n = {};
  for (var r in t) or.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && ht) for (var r of ht(t)) e.indexOf(r) < 0 && sr.call(t, r) && (n[r] = t[r]);
  return n;
};
var cr = (t, e) => {
  for (var n in e) ir(t, n, { get: e[n], enumerable: true });
};
var ze = (t, e, n) => new Promise((r, i) => {
  var o = (c) => {
    try {
      a(n.next(c));
    } catch (d) {
      i(d);
    }
  }, s = (c) => {
    try {
      a(n.throw(c));
    } catch (d) {
      i(d);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(o, s);
  a((n = n.apply(t, e)).next());
});
function ur(t) {
  return Object.entries(t).filter(([, e]) => e || e === false).map(([e, n]) => `${encodeURIComponent(e)}=${encodeURIComponent(String(n))}`).join("&");
}
function gt(t) {
  let e = t && t.ownerDocument || document, n = e.defaultView || e.parentWindow || window;
  return { document: e, window: n };
}
function Et(t) {
  return t || document.head;
}
var dr = "hCaptcha-script";
var xe = "hCaptchaOnLoad";
var Ve = "script-error";
var he = "@hCaptcha/loader";
var fr = Object.prototype.toString;
function Xe(t) {
  switch (fr.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
      return true;
    default:
      return U(t, Error);
  }
}
function Ne(t, e) {
  return fr.call(t) === `[object ${e}]`;
}
function De(t) {
  return Ne(t, "ErrorEvent");
}
function St(t) {
  return Ne(t, "DOMError");
}
function rn(t) {
  return Ne(t, "DOMException");
}
function w(t) {
  return Ne(t, "String");
}
function Ie(t) {
  return t === null || typeof t != "object" && typeof t != "function";
}
function L(t) {
  return Ne(t, "Object");
}
function ge(t) {
  return typeof Event != "undefined" && U(t, Event);
}
function on(t) {
  return typeof Element != "undefined" && U(t, Element);
}
function sn(t) {
  return Ne(t, "RegExp");
}
function Ee(t) {
  return !!(t && t.then && typeof t.then == "function");
}
function an(t) {
  return L(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t;
}
function Ke(t) {
  return typeof t == "number" && t !== t;
}
function U(t, e) {
  try {
    return t instanceof e;
  } catch (n) {
    return false;
  }
}
function Je(t) {
  return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue));
}
function z(t, e = 0) {
  return typeof t != "string" || e === 0 || t.length <= e ? t : `${t.slice(0, e)}...`;
}
function yt(t, e) {
  if (!Array.isArray(t)) return "";
  let n = [];
  for (let r = 0; r < t.length; r++) {
    let i = t[r];
    try {
      Je(i) ? n.push("[VueViewModel]") : n.push(String(i));
    } catch (o) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function pr(t, e, n = false) {
  return w(t) ? sn(e) ? e.test(t) : w(e) ? n ? t === e : t.includes(e) : false : false;
}
function ue(t, e = [], n = false) {
  return e.some((r) => pr(t, r, n));
}
function un(t, e, n = 250, r, i, o, s) {
  if (!o.exception || !o.exception.values || !s || !U(s.originalException, Error)) return;
  let a = o.exception.values.length > 0 ? o.exception.values[o.exception.values.length - 1] : void 0;
  a && (o.exception.values = Qi(cn(t, e, i, s.originalException, r, o.exception.values, a, 0), n));
}
function cn(t, e, n, r, i, o, s, a) {
  if (o.length >= n + 1) return o;
  let c = [...o];
  if (U(r[i], Error)) {
    lr(s, a);
    let d = t(e, r[i]), l = c.length;
    _r(d, i, l, a), c = cn(t, e, n, r[i], i, [d, ...c], d, l);
  }
  return Array.isArray(r.errors) && r.errors.forEach((d, l) => {
    if (U(d, Error)) {
      lr(s, a);
      let p = t(e, d), _ = c.length;
      _r(p, `errors[${l}]`, _, a), c = cn(t, e, n, d, i, [p, ...c], p, _);
    }
  }), c;
}
function lr(t, e) {
  t.mechanism = t.mechanism || { type: "generic", handled: true }, t.mechanism = h(u({}, t.mechanism), { is_exception_group: true, exception_id: e });
}
function _r(t, e, n, r) {
  t.mechanism = t.mechanism || { type: "generic", handled: true }, t.mechanism = h(u({}, t.mechanism), { type: "chained", source: e, exception_id: n, parent_id: r });
}
function Qi(t, e) {
  return t.map((n) => (n.value && (n.value = z(n.value, e)), n));
}
function Tt(t) {
  return t && t.Math == Math ? t : void 0;
}
var b = typeof globalThis == "object" && Tt(globalThis) || typeof window == "object" && Tt(window) || typeof self == "object" && Tt(self) || typeof global == "object" && Tt(global) || /* @__PURE__ */ function() {
  return this;
}() || {};
function F() {
  return b;
}
function Qe(t, e, n) {
  let r = n || b, i = r.__SENTRY__ = r.__SENTRY__ || {};
  return i[t] || (i[t] = e());
}
var bt = F();
var Zi = 80;
function V(t, e = {}) {
  try {
    let n = t, r = 5, i = [], o = 0, s = 0, a = " > ", c = a.length, d, l = Array.isArray(e) ? e : e.keyAttrs, p = !Array.isArray(e) && e.maxStringLength || Zi;
    for (; n && o++ < r && (d = eo(n, l), !(d === "html" || o > 1 && s + i.length * c + d.length >= p)); ) i.push(d), s += d.length, n = n.parentNode;
    return i.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function eo(t, e) {
  let n = t, r = [], i, o, s, a, c;
  if (!n || !n.tagName) return "";
  r.push(n.tagName.toLowerCase());
  let d = e && e.length ? e.filter((p) => n.getAttribute(p)).map((p) => [p, n.getAttribute(p)]) : null;
  if (d && d.length) d.forEach((p) => {
    r.push(`[${p[0]}="${p[1]}"]`);
  });
  else if (n.id && r.push(`#${n.id}`), i = n.className, i && w(i)) for (o = i.split(/\s+/), c = 0; c < o.length; c++) r.push(`.${o[c]}`);
  let l = ["aria-label", "type", "name", "title", "alt"];
  for (c = 0; c < l.length; c++) s = l[c], a = n.getAttribute(s), a && r.push(`[${s}="${a}"]`);
  return r.join("");
}
function dn() {
  try {
    return bt.document.location.href;
  } catch (t) {
    return "";
  }
}
function fn(t) {
  return bt.document && bt.document.querySelector ? bt.document.querySelector(t) : null;
}
var to = "Sentry Logger ";
var Ze = ["debug", "info", "warn", "error", "log", "assert", "trace"];
var Oe = {};
function Rt(t) {
  if (!("console" in b)) return t();
  let e = b.console, n = {}, r = Object.keys(Oe);
  r.forEach((i) => {
    let o = Oe[i];
    n[i] = e[i], e[i] = o;
  });
  try {
    return t();
  } finally {
    r.forEach((i) => {
      e[i] = n[i];
    });
  }
}
function no() {
  let t = false, e = { enable: () => {
    t = true;
  }, disable: () => {
    t = false;
  } };
  return typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__ ? Ze.forEach((n) => {
    e[n] = (...r) => {
      t && Rt(() => {
        b.console[n](`${to}[${n}]:`, ...r);
      });
    };
  }) : Ze.forEach((n) => {
    e[n] = () => {
    };
  }), e;
}
var f = no();
var ro = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function io(t) {
  return t === "http" || t === "https";
}
function X(t, e = false) {
  let { host: n, path: r, pass: i, port: o, projectId: s, protocol: a, publicKey: c } = t;
  return `${a}://${c}${e && i ? `:${i}` : ""}@${n}${o ? `:${o}` : ""}/${r && `${r}/`}${s}`;
}
function mr(t) {
  let e = ro.exec(t);
  if (!e) {
    console.error(`Invalid Sentry Dsn: ${t}`);
    return;
  }
  let [n, r, i = "", o, s = "", a] = e.slice(1), c = "", d = a, l = d.split("/");
  if (l.length > 1 && (c = l.slice(0, -1).join("/"), d = l.pop()), d) {
    let p = d.match(/^\d+/);
    p && (d = p[0]);
  }
  return hr({ host: o, pass: i, path: c, projectId: d, port: s, protocol: n, publicKey: r });
}
function hr(t) {
  return { protocol: t.protocol, publicKey: t.publicKey || "", pass: t.pass || "", host: t.host, port: t.port || "", path: t.path || "", projectId: t.projectId };
}
function oo(t) {
  if (!(typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__)) return true;
  let { port: e, projectId: n, protocol: r } = t;
  return ["protocol", "publicKey", "host", "projectId"].find((s) => t[s] ? false : (f.error(`Invalid Sentry Dsn: ${s} missing`), true)) ? false : n.match(/^\d+$/) ? io(r) ? e && isNaN(parseInt(e, 10)) ? (f.error(`Invalid Sentry Dsn: Invalid port ${e}`), false) : true : (f.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), false) : (f.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), false);
}
function vt(t) {
  let e = typeof t == "string" ? mr(t) : hr(t);
  if (!(!e || !oo(e))) return e;
}
var k = class extends Error {
  constructor(e, n = "warn") {
    super(e), this.message = e, this.name = new.target.prototype.constructor.name, Object.setPrototypeOf(this, new.target.prototype), this.logLevel = n;
  }
};
function x(t, e, n) {
  if (!(e in t)) return;
  let r = t[e], i = n(r);
  typeof i == "function" && xt(i, r), t[e] = i;
}
function ke(t, e, n) {
  try {
    Object.defineProperty(t, e, { value: n, writable: true, configurable: true });
  } catch (r) {
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`Failed to add non-enumerable property "${e}" to object`, t);
  }
}
function xt(t, e) {
  try {
    let n = e.prototype || {};
    t.prototype = e.prototype = n, ke(t, "__sentry_original__", e);
  } catch (n) {
  }
}
function Se(t) {
  return t.__sentry_original__;
}
function ln(t) {
  return Object.keys(t).map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`).join("&");
}
function Nt(t) {
  if (Xe(t)) return u({ message: t.message, name: t.name, stack: t.stack }, Er(t));
  if (ge(t)) {
    let e = u({ type: t.type, target: gr(t.target), currentTarget: gr(t.currentTarget) }, Er(t));
    return typeof CustomEvent != "undefined" && U(t, CustomEvent) && (e.detail = t.detail), e;
  } else return t;
}
function gr(t) {
  try {
    return on(t) ? V(t) : Object.prototype.toString.call(t);
  } catch (e) {
    return "<unknown>";
  }
}
function Er(t) {
  if (typeof t == "object" && t !== null) {
    let e = {};
    for (let n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  } else return {};
}
function _n(t, e = 40) {
  let n = Object.keys(Nt(t));
  if (n.sort(), !n.length) return "[object has no keys]";
  if (n[0].length >= e) return z(n[0], e);
  for (let r = n.length; r > 0; r--) {
    let i = n.slice(0, r).join(", ");
    if (!(i.length > e)) return r === n.length ? i : z(i, e);
  }
  return "";
}
function B(t) {
  return pn(t, /* @__PURE__ */ new Map());
}
function pn(t, e) {
  if (L(t)) {
    let n = e.get(t);
    if (n !== void 0) return n;
    let r = {};
    e.set(t, r);
    for (let i of Object.keys(t)) typeof t[i] != "undefined" && (r[i] = pn(t[i], e));
    return r;
  }
  if (Array.isArray(t)) {
    let n = e.get(t);
    if (n !== void 0) return n;
    let r = [];
    return e.set(t, r), t.forEach((i) => {
      r.push(pn(i, e));
    }), r;
  }
  return t;
}
var Tr = 50;
var Sr = /\(error: (.*)\)/;
var yr = /captureMessage|captureException/;
function hn(...t) {
  let e = t.sort((n, r) => n[0] - r[0]).map((n) => n[1]);
  return (n, r = 0) => {
    let i = [], o = n.split(`
`);
    for (let s = r; s < o.length; s++) {
      let a = o[s];
      if (a.length > 1024) continue;
      let c = Sr.test(a) ? a.replace(Sr, "$1") : a;
      if (!c.match(/\S*Error: /)) {
        for (let d of e) {
          let l = d(c);
          if (l) {
            i.push(l);
            break;
          }
        }
        if (i.length >= Tr) break;
      }
    }
    return br(i);
  };
}
function br(t) {
  if (!t.length) return [];
  let e = Array.from(t);
  return /sentryWrapped/.test(e[e.length - 1].function || "") && e.pop(), e.reverse(), yr.test(e[e.length - 1].function || "") && (e.pop(), yr.test(e[e.length - 1].function || "") && e.pop()), e.slice(0, Tr).map((n) => h(u({}, n), { filename: n.filename || e[e.length - 1].filename, function: n.function || "?" }));
}
var mn = "<anonymous>";
function G(t) {
  try {
    return !t || typeof t != "function" ? mn : t.name || mn;
  } catch (e) {
    return mn;
  }
}
var gn = F();
function Rr() {
  if (!("fetch" in gn)) return false;
  try {
    return new Headers(), new Request("http://www.example.com"), new Response(), true;
  } catch (t) {
    return false;
  }
}
function et(t) {
  return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString());
}
function En() {
  if (!Rr()) return false;
  if (et(gn.fetch)) return true;
  let t = false, e = gn.document;
  if (e && typeof e.createElement == "function") try {
    let n = e.createElement("iframe");
    n.hidden = true, e.head.appendChild(n), n.contentWindow && n.contentWindow.fetch && (t = et(n.contentWindow.fetch)), e.head.removeChild(n);
  } catch (n) {
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n);
  }
  return t;
}
var Dt = F();
function vr() {
  let t = Dt.chrome, e = t && t.app && t.app.runtime, n = "history" in Dt && !!Dt.history.pushState && !!Dt.history.replaceState;
  return !e && n;
}
var I = F();
var re = "__sentry_xhr_v2__";
var tt = {};
var xr = {};
function so(t) {
  if (!xr[t]) switch (xr[t] = true, t) {
    case "console":
      ao();
      break;
    case "dom":
      kr();
      break;
    case "xhr":
      Or();
      break;
    case "fetch":
      co();
      break;
    case "history":
      uo();
      break;
    case "error":
      _o();
      break;
    case "unhandledrejection":
      mo();
      break;
    default:
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("unknown instrumentation type:", t);
      return;
  }
}
function O(t, e) {
  tt[t] = tt[t] || [], tt[t].push(e), so(t);
}
function H(t, e) {
  if (!(!t || !tt[t])) for (let n of tt[t] || []) try {
    n(e);
  } catch (r) {
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${G(n)}
Error:`, r);
  }
}
function ao() {
  "console" in b && Ze.forEach(function(t) {
    t in b.console && x(b.console, t, function(e) {
      return Oe[t] = e, function(...n) {
        H("console", { args: n, level: t });
        let r = Oe[t];
        r && r.apply(b.console, n);
      };
    });
  });
}
function co() {
  En() && x(b, "fetch", function(t) {
    return function(...e) {
      let { method: n, url: r } = Ir(e), i = { args: e, fetchData: { method: n, url: r }, startTimestamp: Date.now() };
      return H("fetch", u({}, i)), t.apply(b, e).then((o) => (H("fetch", h(u({}, i), { endTimestamp: Date.now(), response: o })), o), (o) => {
        throw H("fetch", h(u({}, i), { endTimestamp: Date.now(), error: o })), o;
      });
    };
  });
}
function Sn(t, e) {
  return !!t && typeof t == "object" && !!t[e];
}
function Nr(t) {
  return typeof t == "string" ? t : t ? Sn(t, "url") ? t.url : t.toString ? t.toString() : "" : "";
}
function Ir(t) {
  if (t.length === 0) return { method: "GET", url: "" };
  if (t.length === 2) {
    let [n, r] = t;
    return { url: Nr(n), method: Sn(r, "method") ? String(r.method).toUpperCase() : "GET" };
  }
  let e = t[0];
  return { url: Nr(e), method: Sn(e, "method") ? String(e.method).toUpperCase() : "GET" };
}
function Or() {
  if (!I.XMLHttpRequest) return;
  let t = XMLHttpRequest.prototype;
  x(t, "open", function(e) {
    return function(...n) {
      let r = n[1], i = this[re] = { method: w(n[0]) ? n[0].toUpperCase() : n[0], url: n[1], request_headers: {} };
      w(r) && i.method === "POST" && r.match(/sentry_key/) && (this.__sentry_own_request__ = true);
      let o = () => {
        let s = this[re];
        if (s && this.readyState === 4) {
          try {
            s.status_code = this.status;
          } catch (a) {
          }
          H("xhr", { args: n, endTimestamp: Date.now(), startTimestamp: Date.now(), xhr: this });
        }
      };
      return "onreadystatechange" in this && typeof this.onreadystatechange == "function" ? x(this, "onreadystatechange", function(s) {
        return function(...a) {
          return o(), s.apply(this, a);
        };
      }) : this.addEventListener("readystatechange", o), x(this, "setRequestHeader", function(s) {
        return function(...a) {
          let [c, d] = a, l = this[re];
          return l && (l.request_headers[c.toLowerCase()] = d), s.apply(this, a);
        };
      }), e.apply(this, n);
    };
  }), x(t, "send", function(e) {
    return function(...n) {
      let r = this[re];
      return r && n[0] !== void 0 && (r.body = n[0]), H("xhr", { args: n, startTimestamp: Date.now(), xhr: this }), e.apply(this, n);
    };
  });
}
var It;
function uo() {
  if (!vr()) return;
  let t = I.onpopstate;
  I.onpopstate = function(...n) {
    let r = I.location.href, i = It;
    if (It = r, H("history", { from: i, to: r }), t) try {
      return t.apply(this, n);
    } catch (o) {
    }
  };
  function e(n) {
    return function(...r) {
      let i = r.length > 2 ? r[2] : void 0;
      if (i) {
        let o = It, s = String(i);
        It = s, H("history", { from: o, to: s });
      }
      return n.apply(this, r);
    };
  }
  x(I.history, "pushState", e), x(I.history, "replaceState", e);
}
var fo = 1e3;
var Ot;
var kt;
function po(t, e) {
  if (!t || t.type !== e.type) return true;
  try {
    if (t.target !== e.target) return true;
  } catch (n) {
  }
  return false;
}
function lo(t) {
  if (t.type !== "keypress") return false;
  try {
    let e = t.target;
    if (!e || !e.tagName) return true;
    if (e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.isContentEditable) return false;
  } catch (e) {
  }
  return true;
}
function Dr(t, e = false) {
  return (n) => {
    if (!n || kt === n || lo(n)) return;
    let r = n.type === "keypress" ? "input" : n.type;
    Ot === void 0 ? (t({ event: n, name: r, global: e }), kt = n) : po(kt, n) && (t({ event: n, name: r, global: e }), kt = n), clearTimeout(Ot), Ot = I.setTimeout(() => {
      Ot = void 0;
    }, fo);
  };
}
function kr() {
  if (!I.document) return;
  let t = H.bind(null, "dom"), e = Dr(t, true);
  I.document.addEventListener("click", e, false), I.document.addEventListener("keypress", e, false), ["EventTarget", "Node"].forEach((n) => {
    let r = I[n] && I[n].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (x(r, "addEventListener", function(i) {
      return function(o, s, a) {
        if (o === "click" || o == "keypress") try {
          let c = this, d = c.__sentry_instrumentation_handlers__ = c.__sentry_instrumentation_handlers__ || {}, l = d[o] = d[o] || { refCount: 0 };
          if (!l.handler) {
            let p = Dr(t);
            l.handler = p, i.call(this, o, p, a);
          }
          l.refCount++;
        } catch (c) {
        }
        return i.call(this, o, s, a);
      };
    }), x(r, "removeEventListener", function(i) {
      return function(o, s, a) {
        if (o === "click" || o == "keypress") try {
          let c = this, d = c.__sentry_instrumentation_handlers__ || {}, l = d[o];
          l && (l.refCount--, l.refCount <= 0 && (i.call(this, o, l.handler, a), l.handler = void 0, delete d[o]), Object.keys(d).length === 0 && delete c.__sentry_instrumentation_handlers__);
        } catch (c) {
        }
        return i.call(this, o, s, a);
      };
    }));
  });
}
var wt = null;
function _o() {
  wt = I.onerror, I.onerror = function(t, e, n, r, i) {
    return H("error", { column: r, error: i, line: n, msg: t, url: e }), wt && !wt.__SENTRY_LOADER__ ? wt.apply(this, arguments) : false;
  }, I.onerror.__SENTRY_INSTRUMENTED__ = true;
}
var Bt = null;
function mo() {
  Bt = I.onunhandledrejection, I.onunhandledrejection = function(t) {
    return H("unhandledrejection", t), Bt && !Bt.__SENTRY_LOADER__ ? Bt.apply(this, arguments) : true;
  }, I.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}
function wr() {
  let t = typeof WeakSet == "function", e = t ? /* @__PURE__ */ new WeakSet() : [];
  function n(i) {
    if (t) return e.has(i) ? true : (e.add(i), false);
    for (let o = 0; o < e.length; o++) if (e[o] === i) return true;
    return e.push(i), false;
  }
  function r(i) {
    if (t) e.delete(i);
    else for (let o = 0; o < e.length; o++) if (e[o] === i) {
      e.splice(o, 1);
      break;
    }
  }
  return [n, r];
}
function v() {
  let t = b, e = t.crypto || t.msCrypto, n = () => Math.random() * 16;
  try {
    if (e && e.randomUUID) return e.randomUUID().replace(/-/g, "");
    e && e.getRandomValues && (n = () => e.getRandomValues(new Uint8Array(1))[0]);
  } catch (r) {
  }
  return ("10000000100040008000" + 1e11).replace(/[018]/g, (r) => (r ^ (n() & 15) >> r / 4).toString(16));
}
function Br(t) {
  return t.exception && t.exception.values ? t.exception.values[0] : void 0;
}
function $(t) {
  let { message: e, event_id: n } = t;
  if (e) return e;
  let r = Br(t);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function we(t, e, n) {
  let r = t.exception = t.exception || {}, i = r.values = r.values || [], o = i[0] = i[0] || {};
  o.value || (o.value = e || ""), o.type || (o.type = n || "Error");
}
function ie(t, e) {
  let n = Br(t);
  if (!n) return;
  let r = { type: "generic", handled: true }, i = n.mechanism;
  if (n.mechanism = u(u(u({}, r), i), e), e && "data" in e) {
    let o = u(u({}, i && i.data), e.data);
    n.mechanism.data = o;
  }
}
function At(t) {
  if (t && t.__sentry_captured__) return true;
  try {
    ke(t, "__sentry_captured__", true);
  } catch (e) {
  }
  return false;
}
function Ut(t) {
  return Array.isArray(t) ? t : [t];
}
function yn() {
  return typeof __SENTRY_BROWSER_BUNDLE__ != "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
function Tn() {
  return "npm";
}
function Ar() {
  return !yn() && Object.prototype.toString.call(typeof process != "undefined" ? process : 0) === "[object process]";
}
function Ur(t, e) {
  return t.require(e);
}
function j(t, e = 100, n = 1 / 0) {
  try {
    return Ct("", t, e, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function Gt(t, e = 3, n = 100 * 1024) {
  let r = j(t, e);
  return So(r) > n ? Gt(t, e - 1, n) : r;
}
function Ct(t, e, n = 1 / 0, r = 1 / 0, i = wr()) {
  let [o, s] = i;
  if (e == null || ["number", "boolean", "string"].includes(typeof e) && !Ke(e)) return e;
  let a = ho(t, e);
  if (!a.startsWith("[object ")) return a;
  if (e.__sentry_skip_normalization__) return e;
  let c = typeof e.__sentry_override_normalization_depth__ == "number" ? e.__sentry_override_normalization_depth__ : n;
  if (c === 0) return a.replace("object ", "");
  if (o(e)) return "[Circular ~]";
  let d = e;
  if (d && typeof d.toJSON == "function") try {
    let m = d.toJSON();
    return Ct("", m, c - 1, r, i);
  } catch (m) {
  }
  let l = Array.isArray(e) ? [] : {}, p = 0, _ = Nt(e);
  for (let m in _) {
    if (!Object.prototype.hasOwnProperty.call(_, m)) continue;
    if (p >= r) {
      l[m] = "[MaxProperties ~]";
      break;
    }
    let E = _[m];
    l[m] = Ct(m, E, c - 1, r, i), p++;
  }
  return s(e), l;
}
function ho(t, e) {
  try {
    if (t === "domain" && e && typeof e == "object" && e._events) return "[Domain]";
    if (t === "domainEmitter") return "[DomainEmitter]";
    if (typeof global != "undefined" && e === global) return "[Global]";
    if (typeof window != "undefined" && e === window) return "[Window]";
    if (typeof document != "undefined" && e === document) return "[Document]";
    if (Je(e)) return "[VueViewModel]";
    if (an(e)) return "[SyntheticEvent]";
    if (typeof e == "number" && e !== e) return "[NaN]";
    if (typeof e == "function") return `[Function: ${G(e)}]`;
    if (typeof e == "symbol") return `[${String(e)}]`;
    if (typeof e == "bigint") return `[BigInt: ${String(e)}]`;
    let n = go(e);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function go(t) {
  let e = Object.getPrototypeOf(t);
  return e ? e.constructor.name : "null prototype";
}
function Eo(t) {
  return ~-encodeURI(t).split(/%..|./).length;
}
function So(t) {
  return Eo(JSON.stringify(t));
}
var oe;
(function(t) {
  t[t.PENDING = 0] = "PENDING";
  let n = 1;
  t[t.RESOLVED = n] = "RESOLVED";
  let r = 2;
  t[t.REJECTED = r] = "REJECTED";
})(oe || (oe = {}));
function C(t) {
  return new N((e) => {
    e(t);
  });
}
function ye(t) {
  return new N((e, n) => {
    n(t);
  });
}
var N = class {
  constructor(e) {
    N.prototype.__init.call(this), N.prototype.__init2.call(this), N.prototype.__init3.call(this), N.prototype.__init4.call(this), this._state = oe.PENDING, this._handlers = [];
    try {
      e(this._resolve, this._reject);
    } catch (n) {
      this._reject(n);
    }
  }
  then(e, n) {
    return new N((r, i) => {
      this._handlers.push([false, (o) => {
        if (!e) r(o);
        else try {
          r(e(o));
        } catch (s) {
          i(s);
        }
      }, (o) => {
        if (!n) i(o);
        else try {
          r(n(o));
        } catch (s) {
          i(s);
        }
      }]), this._executeHandlers();
    });
  }
  catch(e) {
    return this.then((n) => n, e);
  }
  finally(e) {
    return new N((n, r) => {
      let i, o;
      return this.then((s) => {
        o = false, i = s, e && e();
      }, (s) => {
        o = true, i = s, e && e();
      }).then(() => {
        if (o) {
          r(i);
          return;
        }
        n(i);
      });
    });
  }
  __init() {
    this._resolve = (e) => {
      this._setResult(oe.RESOLVED, e);
    };
  }
  __init2() {
    this._reject = (e) => {
      this._setResult(oe.REJECTED, e);
    };
  }
  __init3() {
    this._setResult = (e, n) => {
      if (this._state === oe.PENDING) {
        if (Ee(n)) {
          n.then(this._resolve, this._reject);
          return;
        }
        this._state = e, this._value = n, this._executeHandlers();
      }
    };
  }
  __init4() {
    this._executeHandlers = () => {
      if (this._state === oe.PENDING) return;
      let e = this._handlers.slice();
      this._handlers = [], e.forEach((n) => {
        n[0] || (this._state === oe.RESOLVED && n[1](this._value), this._state === oe.REJECTED && n[2](this._value), n[0] = true);
      });
    };
  }
};
function bn(t) {
  let e = [];
  function n() {
    return t === void 0 || e.length < t;
  }
  function r(s) {
    return e.splice(e.indexOf(s), 1)[0];
  }
  function i(s) {
    if (!n()) return ye(new k("Not adding Promise because buffer limit was reached."));
    let a = s();
    return e.indexOf(a) === -1 && e.push(a), a.then(() => r(a)).then(null, () => r(a).then(null, () => {
    })), a;
  }
  function o(s) {
    return new N((a, c) => {
      let d = e.length;
      if (!d) return a(true);
      let l = setTimeout(() => {
        s && s > 0 && a(false);
      }, s);
      e.forEach((p) => {
        C(p).then(() => {
          --d || (clearTimeout(l), a(true));
        }, c);
      });
    });
  }
  return { $: e, add: i, drain: o };
}
function nt(t) {
  if (!t) return {};
  let e = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!e) return {};
  let n = e[6] || "", r = e[8] || "";
  return { host: e[4], path: e[5], protocol: e[2], search: n, hash: r, relative: e[5] + n + r };
}
var Cr = ["fatal", "error", "warning", "log", "info", "debug"];
function Rn(t) {
  return t === "warn" ? "warning" : Cr.includes(t) ? t : "log";
}
var Pr = F();
var xn = { nowSeconds: () => Date.now() / 1e3 };
function yo() {
  let { performance: t } = Pr;
  if (!t || !t.now) return;
  let e = Date.now() - t.now();
  return { now: () => t.now(), timeOrigin: e };
}
function To() {
  try {
    return Ur(module, "perf_hooks").performance;
  } catch (t) {
    return;
  }
}
var vn = Ar() ? To() : yo();
var Gr = vn === void 0 ? xn : { nowSeconds: () => (vn.timeOrigin + vn.now()) / 1e3 };
var se = xn.nowSeconds.bind(xn);
var W = Gr.nowSeconds.bind(Gr);
var rt;
var A = (() => {
  let { performance: t } = Pr;
  if (!t || !t.now) {
    rt = "none";
    return;
  }
  let e = 3600 * 1e3, n = t.now(), r = Date.now(), i = t.timeOrigin ? Math.abs(t.timeOrigin + n - r) : e, o = i < e, s = t.timing && t.timing.navigationStart, c = typeof s == "number" ? Math.abs(s + n - r) : e, d = c < e;
  return o || d ? i <= c ? (rt = "timeOrigin", t.timeOrigin) : (rt = "navigationStart", s) : (rt = "dateNow", r);
})();
var it = "baggage";
var Nn = "sentry-";
var Mr = /^sentry-/;
var Lr = 8192;
function Dn(t) {
  if (!w(t) && !Array.isArray(t)) return;
  let e = {};
  if (Array.isArray(t)) e = t.reduce((r, i) => {
    let o = Yr(i);
    return u(u({}, r), o);
  }, {});
  else {
    if (!t) return;
    e = Yr(t);
  }
  let n = Object.entries(e).reduce((r, [i, o]) => {
    if (i.match(Mr)) {
      let s = i.slice(Nn.length);
      r[s] = o;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0) return n;
}
function ot(t) {
  if (!t) return;
  let e = Object.entries(t).reduce((n, [r, i]) => (i && (n[`${Nn}${r}`] = i), n), {});
  return bo(e);
}
function Yr(t) {
  return t.split(",").map((e) => e.split("=").map((n) => decodeURIComponent(n.trim()))).reduce((e, [n, r]) => (e[n] = r, e), {});
}
function bo(t) {
  if (Object.keys(t).length !== 0) return Object.entries(t).reduce((e, [n, r], i) => {
    let o = `${encodeURIComponent(n)}=${encodeURIComponent(r)}`, s = i === 0 ? o : `${e},${o}`;
    return s.length > Lr ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Not adding key: ${n} with val: ${r} to baggage header due to exceeding baggage size limits.`), e) : s;
  }, "");
}
var Fr = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
function In(t) {
  if (!t) return;
  let e = t.match(Fr);
  if (!e) return;
  let n;
  return e[3] === "1" ? n = true : e[3] === "0" && (n = false), { traceId: e[1], parentSampled: n, parentSpanId: e[2] };
}
function On(t, e) {
  let n = In(t), r = Dn(e), { traceId: i, parentSpanId: o, parentSampled: s } = n || {}, a = { traceId: i || v(), spanId: v().substring(16), sampled: s };
  return o && (a.parentSpanId = o), r && (a.dsc = r), { traceparentData: n, dynamicSamplingContext: r, propagationContext: a };
}
function Be(t = v(), e = v().substring(16), n) {
  let r = "";
  return n !== void 0 && (r = n ? "-1" : "-0"), `${t}-${e}${r}`;
}
function K(t, e = []) {
  return [t, e];
}
function wn(t, e) {
  let [n, r] = t;
  return [n, [...r, e]];
}
function Pt(t, e) {
  let n = t[1];
  for (let r of n) {
    let i = r[0].type;
    if (e(r, i)) return true;
  }
  return false;
}
function kn(t, e) {
  return (e || new TextEncoder()).encode(t);
}
function Bn(t, e) {
  let [n, r] = t, i = JSON.stringify(n);
  function o(s) {
    typeof i == "string" ? i = typeof s == "string" ? i + s : [kn(i, e), s] : i.push(typeof s == "string" ? kn(s, e) : s);
  }
  for (let s of r) {
    let [a, c] = s;
    if (o(`
${JSON.stringify(a)}
`), typeof c == "string" || c instanceof Uint8Array) o(c);
    else {
      let d;
      try {
        d = JSON.stringify(c);
      } catch (l) {
        d = JSON.stringify(j(c));
      }
      o(d);
    }
  }
  return typeof i == "string" ? i : Ro(i);
}
function Ro(t) {
  let e = t.reduce((i, o) => i + o.length, 0), n = new Uint8Array(e), r = 0;
  for (let i of t) n.set(i, r), r += i.length;
  return n;
}
function An(t, e) {
  let n = typeof t.data == "string" ? kn(t.data, e) : t.data;
  return [B({ type: "attachment", length: n.length, filename: t.filename, content_type: t.contentType, attachment_type: t.attachmentType }), n];
}
var vo = { session: "session", sessions: "session", attachment: "attachment", transaction: "transaction", event: "error", client_report: "internal", user_report: "default", profile: "profile", replay_event: "replay", replay_recording: "replay", check_in: "monitor" };
function Yt(t) {
  return vo[t];
}
function Mt(t) {
  if (!t || !t.sdk) return;
  let { name: e, version: n } = t.sdk;
  return { name: e, version: n };
}
function Un(t, e, n, r) {
  let i = t.sdkProcessingMetadata && t.sdkProcessingMetadata.dynamicSamplingContext;
  return u(u(u({ event_id: t.event_id, sent_at: (/* @__PURE__ */ new Date()).toISOString() }, e && { sdk: e }), !!n && r && { dsn: X(r) }), i && { trace: B(u({}, i)) });
}
function Cn(t, e, n) {
  let r = [{ type: "client_report" }, { timestamp: n || se(), discarded_events: t }];
  return K(e ? { dsn: e } : {}, [r]);
}
function Hr(t, e = Date.now()) {
  let n = parseInt(`${t}`, 10);
  if (!isNaN(n)) return n * 1e3;
  let r = Date.parse(`${t}`);
  return isNaN(r) ? 6e4 : r - e;
}
function $r(t, e) {
  return t[e] || t.all || 0;
}
function Gn(t, e, n = Date.now()) {
  return $r(t, e) > n;
}
function Pn(t, { statusCode: e, headers: n }, r = Date.now()) {
  let i = u({}, t), o = n && n["x-sentry-rate-limits"], s = n && n["retry-after"];
  if (o) for (let a of o.trim().split(",")) {
    let [c, d] = a.split(":", 2), l = parseInt(c, 10), p = (isNaN(l) ? 60 : l) * 1e3;
    if (!d) i.all = r + p;
    else for (let _ of d.split(";")) i[_] = r + p;
  }
  else s ? i.all = r + Hr(s, r) : e === 429 && (i.all = r + 60 * 1e3);
  return i;
}
var Ae = "production";
function st() {
  return Qe("globalEventProcessors", () => []);
}
function Yn(t) {
  st().push(t);
}
function Ue(t, e, n, r = 0) {
  return new N((i, o) => {
    let s = t[r];
    if (e === null || typeof s != "function") i(e);
    else {
      let a = s(u({}, e), n);
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && s.id && a === null && f.log(`Event processor "${s.id}" dropped event`), Ee(a) ? a.then((c) => Ue(t, c, n, r + 1).then(i)).then(null, o) : Ue(t, a, n, r + 1).then(i).then(null, o);
    }
  });
}
function jr(t) {
  let e = W(), n = { sid: v(), init: true, timestamp: e, started: e, duration: 0, status: "ok", errors: 0, ignoreDuration: false, toJSON: () => xo(n) };
  return t && ae(n, t), n;
}
function ae(t, e = {}) {
  if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address), !t.did && !e.did && (t.did = e.user.id || e.user.email || e.user.username)), t.timestamp = e.timestamp || W(), e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration), e.sid && (t.sid = e.sid.length === 32 ? e.sid : v()), e.init !== void 0 && (t.init = e.init), !t.did && e.did && (t.did = `${e.did}`), typeof e.started == "number" && (t.started = e.started), t.ignoreDuration) t.duration = void 0;
  else if (typeof e.duration == "number") t.duration = e.duration;
  else {
    let n = t.timestamp - t.started;
    t.duration = n >= 0 ? n : 0;
  }
  e.release && (t.release = e.release), e.environment && (t.environment = e.environment), !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress), !t.userAgent && e.userAgent && (t.userAgent = e.userAgent), typeof e.errors == "number" && (t.errors = e.errors), e.status && (t.status = e.status);
}
function Wr(t, e) {
  let n = {};
  e ? n = { status: e } : t.status === "ok" && (n = { status: "exited" }), ae(t, n);
}
function xo(t) {
  return B({ sid: `${t.sid}`, init: t.init, started: new Date(t.started * 1e3).toISOString(), timestamp: new Date(t.timestamp * 1e3).toISOString(), status: t.status, errors: t.errors, did: typeof t.did == "number" || typeof t.did == "string" ? `${t.did}` : void 0, duration: t.duration, attrs: { release: t.release, environment: t.environment, ip_address: t.ipAddress, user_agent: t.userAgent } });
}
var No = 100;
var P = class {
  constructor() {
    this._notifyingListeners = false, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = qr();
  }
  static clone(e) {
    let n = new P();
    return e && (n._breadcrumbs = [...e._breadcrumbs], n._tags = u({}, e._tags), n._extra = u({}, e._extra), n._contexts = u({}, e._contexts), n._user = e._user, n._level = e._level, n._span = e._span, n._session = e._session, n._transactionName = e._transactionName, n._fingerprint = e._fingerprint, n._eventProcessors = [...e._eventProcessors], n._requestSession = e._requestSession, n._attachments = [...e._attachments], n._sdkProcessingMetadata = u({}, e._sdkProcessingMetadata), n._propagationContext = u({}, e._propagationContext)), n;
  }
  addScopeListener(e) {
    this._scopeListeners.push(e);
  }
  addEventProcessor(e) {
    return this._eventProcessors.push(e), this;
  }
  setUser(e) {
    return this._user = e || {}, this._session && ae(this._session, { user: e }), this._notifyScopeListeners(), this;
  }
  getUser() {
    return this._user;
  }
  getRequestSession() {
    return this._requestSession;
  }
  setRequestSession(e) {
    return this._requestSession = e, this;
  }
  setTags(e) {
    return this._tags = u(u({}, this._tags), e), this._notifyScopeListeners(), this;
  }
  setTag(e, n) {
    return this._tags = h(u({}, this._tags), { [e]: n }), this._notifyScopeListeners(), this;
  }
  setExtras(e) {
    return this._extra = u(u({}, this._extra), e), this._notifyScopeListeners(), this;
  }
  setExtra(e, n) {
    return this._extra = h(u({}, this._extra), { [e]: n }), this._notifyScopeListeners(), this;
  }
  setFingerprint(e) {
    return this._fingerprint = e, this._notifyScopeListeners(), this;
  }
  setLevel(e) {
    return this._level = e, this._notifyScopeListeners(), this;
  }
  setTransactionName(e) {
    return this._transactionName = e, this._notifyScopeListeners(), this;
  }
  setContext(e, n) {
    return n === null ? delete this._contexts[e] : this._contexts[e] = n, this._notifyScopeListeners(), this;
  }
  setSpan(e) {
    return this._span = e, this._notifyScopeListeners(), this;
  }
  getSpan() {
    return this._span;
  }
  getTransaction() {
    let e = this.getSpan();
    return e && e.transaction;
  }
  setSession(e) {
    return e ? this._session = e : delete this._session, this._notifyScopeListeners(), this;
  }
  getSession() {
    return this._session;
  }
  update(e) {
    if (!e) return this;
    if (typeof e == "function") {
      let n = e(this);
      return n instanceof P ? n : this;
    }
    return e instanceof P ? (this._tags = u(u({}, this._tags), e._tags), this._extra = u(u({}, this._extra), e._extra), this._contexts = u(u({}, this._contexts), e._contexts), e._user && Object.keys(e._user).length && (this._user = e._user), e._level && (this._level = e._level), e._fingerprint && (this._fingerprint = e._fingerprint), e._requestSession && (this._requestSession = e._requestSession), e._propagationContext && (this._propagationContext = e._propagationContext)) : L(e) && (e = e, this._tags = u(u({}, this._tags), e.tags), this._extra = u(u({}, this._extra), e.extra), this._contexts = u(u({}, this._contexts), e.contexts), e.user && (this._user = e.user), e.level && (this._level = e.level), e.fingerprint && (this._fingerprint = e.fingerprint), e.requestSession && (this._requestSession = e.requestSession), e.propagationContext && (this._propagationContext = e.propagationContext)), this;
  }
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._requestSession = void 0, this._span = void 0, this._session = void 0, this._notifyScopeListeners(), this._attachments = [], this._propagationContext = qr(), this;
  }
  addBreadcrumb(e, n) {
    let r = typeof n == "number" ? n : No;
    if (r <= 0) return this;
    let i = u({ timestamp: se() }, e), o = this._breadcrumbs;
    return o.push(i), this._breadcrumbs = o.length > r ? o.slice(-r) : o, this._notifyScopeListeners(), this;
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    return this._breadcrumbs = [], this._notifyScopeListeners(), this;
  }
  addAttachment(e) {
    return this._attachments.push(e), this;
  }
  getAttachments() {
    return this._attachments;
  }
  clearAttachments() {
    return this._attachments = [], this;
  }
  applyToEvent(e, n = {}, r) {
    if (this._extra && Object.keys(this._extra).length && (e.extra = u(u({}, this._extra), e.extra)), this._tags && Object.keys(this._tags).length && (e.tags = u(u({}, this._tags), e.tags)), this._user && Object.keys(this._user).length && (e.user = u(u({}, this._user), e.user)), this._contexts && Object.keys(this._contexts).length && (e.contexts = u(u({}, this._contexts), e.contexts)), this._level && (e.level = this._level), this._transactionName && (e.transaction = this._transactionName), this._span) {
      e.contexts = u({ trace: this._span.getTraceContext() }, e.contexts);
      let s = this._span.transaction;
      if (s) {
        e.sdkProcessingMetadata = u({ dynamicSamplingContext: s.getDynamicSamplingContext() }, e.sdkProcessingMetadata);
        let a = s.name;
        a && (e.tags = u({ transaction: a }, e.tags));
      }
    }
    this._applyFingerprint(e);
    let i = this._getBreadcrumbs(), o = [...e.breadcrumbs || [], ...i];
    return e.breadcrumbs = o.length > 0 ? o : void 0, e.sdkProcessingMetadata = h(u(u({}, e.sdkProcessingMetadata), this._sdkProcessingMetadata), { propagationContext: this._propagationContext }), Ue([...r || [], ...st(), ...this._eventProcessors], e, n);
  }
  setSDKProcessingMetadata(e) {
    return this._sdkProcessingMetadata = u(u({}, this._sdkProcessingMetadata), e), this;
  }
  setPropagationContext(e) {
    return this._propagationContext = e, this;
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  _getBreadcrumbs() {
    return this._breadcrumbs;
  }
  _notifyScopeListeners() {
    this._notifyingListeners || (this._notifyingListeners = true, this._scopeListeners.forEach((e) => {
      e(this);
    }), this._notifyingListeners = false);
  }
  _applyFingerprint(e) {
    e.fingerprint = e.fingerprint ? Ut(e.fingerprint) : [], this._fingerprint && (e.fingerprint = e.fingerprint.concat(this._fingerprint)), e.fingerprint && !e.fingerprint.length && delete e.fingerprint;
  }
};
function qr() {
  return { traceId: v(), spanId: v().substring(16) };
}
var zr = 4;
var Do = 100;
var de = class {
  constructor(e, n = new P(), r = zr) {
    this._version = r, this._stack = [{ scope: n }], e && this.bindClient(e);
  }
  isOlderThan(e) {
    return this._version < e;
  }
  bindClient(e) {
    let n = this.getStackTop();
    n.client = e, e && e.setupIntegrations && e.setupIntegrations();
  }
  pushScope() {
    let e = P.clone(this.getScope());
    return this.getStack().push({ client: this.getClient(), scope: e }), e;
  }
  popScope() {
    return this.getStack().length <= 1 ? false : !!this.getStack().pop();
  }
  withScope(e) {
    let n = this.pushScope();
    try {
      e(n);
    } finally {
      this.popScope();
    }
  }
  getClient() {
    return this.getStackTop().client;
  }
  getScope() {
    return this.getStackTop().scope;
  }
  getStack() {
    return this._stack;
  }
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  captureException(e, n) {
    let r = this._lastEventId = n && n.event_id ? n.event_id : v(), i = new Error("Sentry syntheticException");
    return this._withClient((o, s) => {
      o.captureException(e, h(u({ originalException: e, syntheticException: i }, n), { event_id: r }), s);
    }), r;
  }
  captureMessage(e, n, r) {
    let i = this._lastEventId = r && r.event_id ? r.event_id : v(), o = new Error(e);
    return this._withClient((s, a) => {
      s.captureMessage(e, n, h(u({ originalException: e, syntheticException: o }, r), { event_id: i }), a);
    }), i;
  }
  captureEvent(e, n) {
    let r = n && n.event_id ? n.event_id : v();
    return e.type || (this._lastEventId = r), this._withClient((i, o) => {
      i.captureEvent(e, h(u({}, n), { event_id: r }), o);
    }), r;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addBreadcrumb(e, n) {
    let { scope: r, client: i } = this.getStackTop();
    if (!i) return;
    let { beforeBreadcrumb: o = null, maxBreadcrumbs: s = Do } = i.getOptions && i.getOptions() || {};
    if (s <= 0) return;
    let a = se(), c = u({ timestamp: a }, e), d = o ? Rt(() => o(c, n)) : c;
    d !== null && (i.emit && i.emit("beforeAddBreadcrumb", d, n), r.addBreadcrumb(d, s));
  }
  setUser(e) {
    this.getScope().setUser(e);
  }
  setTags(e) {
    this.getScope().setTags(e);
  }
  setExtras(e) {
    this.getScope().setExtras(e);
  }
  setTag(e, n) {
    this.getScope().setTag(e, n);
  }
  setExtra(e, n) {
    this.getScope().setExtra(e, n);
  }
  setContext(e, n) {
    this.getScope().setContext(e, n);
  }
  configureScope(e) {
    let { scope: n, client: r } = this.getStackTop();
    r && e(n);
  }
  run(e) {
    let n = Lt(this);
    try {
      e(this);
    } finally {
      Lt(n);
    }
  }
  getIntegration(e) {
    let n = this.getClient();
    if (!n) return null;
    try {
      return n.getIntegration(e);
    } catch (r) {
      return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Cannot retrieve integration ${e.id} from the current Hub`), null;
    }
  }
  startTransaction(e, n) {
    let r = this._callExtensionMethod("startTransaction", e, n);
    if ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && !r) {
      let i = this.getClient();
      console.warn(i ? `Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
` : "Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'");
    }
    return r;
  }
  traceHeaders() {
    return this._callExtensionMethod("traceHeaders");
  }
  captureSession(e = false) {
    if (e) return this.endSession();
    this._sendSessionUpdate();
  }
  endSession() {
    let n = this.getStackTop().scope, r = n.getSession();
    r && Wr(r), this._sendSessionUpdate(), n.setSession();
  }
  startSession(e) {
    let { scope: n, client: r } = this.getStackTop(), { release: i, environment: o = Ae } = r && r.getOptions() || {}, { userAgent: s } = b.navigator || {}, a = jr(u(u({ release: i, environment: o, user: n.getUser() }, s && { userAgent: s }), e)), c = n.getSession && n.getSession();
    return c && c.status === "ok" && ae(c, { status: "exited" }), this.endSession(), n.setSession(a), a;
  }
  shouldSendDefaultPii() {
    let e = this.getClient(), n = e && e.getOptions();
    return !!(n && n.sendDefaultPii);
  }
  _sendSessionUpdate() {
    let { scope: e, client: n } = this.getStackTop(), r = e.getSession();
    r && n && n.captureSession && n.captureSession(r);
  }
  _withClient(e) {
    let { scope: n, client: r } = this.getStackTop();
    r && e(r, n);
  }
  _callExtensionMethod(e, ...n) {
    let i = Te().__SENTRY__;
    if (i && i.extensions && typeof i.extensions[e] == "function") return i.extensions[e].apply(this, n);
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Extension method ${e} couldn't be found, doing nothing.`);
  }
};
function Te() {
  return b.__SENTRY__ = b.__SENTRY__ || { extensions: {}, hub: void 0 }, b;
}
function Lt(t) {
  let e = Te(), n = at(e);
  return Mn(e, t), n;
}
function y() {
  let t = Te();
  if (t.__SENTRY__ && t.__SENTRY__.acs) {
    let e = t.__SENTRY__.acs.getCurrentHub();
    if (e) return e;
  }
  return Io(t);
}
function Io(t = Te()) {
  return (!Oo(t) || at(t).isOlderThan(zr)) && Mn(t, new de()), at(t);
}
function Oo(t) {
  return !!(t && t.__SENTRY__ && t.__SENTRY__.hub);
}
function at(t) {
  return Qe("hub", () => new de(), t);
}
function Mn(t, e) {
  if (!t) return false;
  let n = t.__SENTRY__ = t.__SENTRY__ || {};
  return n.hub = e, true;
}
function Ce(t) {
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__) return false;
  let e = y().getClient(), n = t || e && e.getOptions();
  return !!n && (n.enableTracing || "tracesSampleRate" in n || "tracesSampler" in n);
}
function q(t) {
  return (t || y()).getScope().getTransaction();
}
var Vr = false;
function Xr() {
  Vr || (Vr = true, O("error", Ln), O("unhandledrejection", Ln));
}
function Ln() {
  let t = q();
  if (t) {
    let e = "internal_error";
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Transaction: ${e} -> Global error occured`), t.setStatus(e);
  }
}
Ln.tag = "sentry_tracingErrorCallback";
var Ge = class {
  constructor(e = 1e3) {
    this._maxlen = e, this.spans = [];
  }
  add(e) {
    this.spans.length > this._maxlen ? e.spanRecorder = void 0 : this.spans.push(e);
  }
};
var Pe = class {
  constructor(e = {}) {
    this.traceId = e.traceId || v(), this.spanId = e.spanId || v().substring(16), this.startTimestamp = e.startTimestamp || W(), this.tags = e.tags || {}, this.data = e.data || {}, this.instrumenter = e.instrumenter || "sentry", this.origin = e.origin || "manual", e.parentSpanId && (this.parentSpanId = e.parentSpanId), "sampled" in e && (this.sampled = e.sampled), e.op && (this.op = e.op), e.description && (this.description = e.description), e.name && (this.description = e.name), e.status && (this.status = e.status), e.endTimestamp && (this.endTimestamp = e.endTimestamp);
  }
  get name() {
    return this.description || "";
  }
  set name(e) {
    this.setName(e);
  }
  startChild(e) {
    let n = new Pe(h(u({}, e), { parentSpanId: this.spanId, sampled: this.sampled, traceId: this.traceId }));
    if (n.spanRecorder = this.spanRecorder, n.spanRecorder && n.spanRecorder.add(n), n.transaction = this.transaction, (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && n.transaction) {
      let r = e && e.op || "< unknown op >", i = n.transaction.name || "< unknown name >", o = n.transaction.spanId, s = `[Tracing] Starting '${r}' span on transaction '${i}' (${o}).`;
      n.transaction.metadata.spanMetadata[n.spanId] = { logMessage: s }, f.log(s);
    }
    return n;
  }
  setTag(e, n) {
    return this.tags = h(u({}, this.tags), { [e]: n }), this;
  }
  setData(e, n) {
    return this.data = h(u({}, this.data), { [e]: n }), this;
  }
  setStatus(e) {
    return this.status = e, this;
  }
  setHttpStatus(e) {
    this.setTag("http.status_code", String(e)), this.setData("http.response.status_code", e);
    let n = Kr(e);
    return n !== "unknown_error" && this.setStatus(n), this;
  }
  setName(e) {
    this.description = e;
  }
  isSuccess() {
    return this.status === "ok";
  }
  finish(e) {
    if ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && this.transaction && this.transaction.spanId !== this.spanId) {
      let { logMessage: n } = this.transaction.metadata.spanMetadata[this.spanId];
      n && f.log(n.replace("Starting", "Finishing"));
    }
    this.endTimestamp = typeof e == "number" ? e : W();
  }
  toTraceparent() {
    return Be(this.traceId, this.spanId, this.sampled);
  }
  toContext() {
    return B({ data: this.data, description: this.description, endTimestamp: this.endTimestamp, op: this.op, parentSpanId: this.parentSpanId, sampled: this.sampled, spanId: this.spanId, startTimestamp: this.startTimestamp, status: this.status, tags: this.tags, traceId: this.traceId });
  }
  updateWithContext(e) {
    return this.data = e.data || {}, this.description = e.description, this.endTimestamp = e.endTimestamp, this.op = e.op, this.parentSpanId = e.parentSpanId, this.sampled = e.sampled, this.spanId = e.spanId || this.spanId, this.startTimestamp = e.startTimestamp || this.startTimestamp, this.status = e.status, this.tags = e.tags || {}, this.traceId = e.traceId || this.traceId, this;
  }
  getTraceContext() {
    return B({ data: Object.keys(this.data).length > 0 ? this.data : void 0, description: this.description, op: this.op, parent_span_id: this.parentSpanId, span_id: this.spanId, status: this.status, tags: Object.keys(this.tags).length > 0 ? this.tags : void 0, trace_id: this.traceId });
  }
  toJSON() {
    return B({ data: Object.keys(this.data).length > 0 ? this.data : void 0, description: this.description, op: this.op, parent_span_id: this.parentSpanId, span_id: this.spanId, start_timestamp: this.startTimestamp, status: this.status, tags: Object.keys(this.tags).length > 0 ? this.tags : void 0, timestamp: this.endTimestamp, trace_id: this.traceId, origin: this.origin });
  }
};
function Kr(t) {
  if (t < 400 && t >= 100) return "ok";
  if (t >= 400 && t < 500) switch (t) {
    case 401:
      return "unauthenticated";
    case 403:
      return "permission_denied";
    case 404:
      return "not_found";
    case 409:
      return "already_exists";
    case 413:
      return "failed_precondition";
    case 429:
      return "resource_exhausted";
    default:
      return "invalid_argument";
  }
  if (t >= 500 && t < 600) switch (t) {
    case 501:
      return "unimplemented";
    case 503:
      return "unavailable";
    case 504:
      return "deadline_exceeded";
    default:
      return "internal_error";
  }
  return "unknown_error";
}
function fe(t, e, n) {
  let r = e.getOptions(), { publicKey: i } = e.getDsn() || {}, { segment: o } = n && n.getUser() || {}, s = B({ environment: r.environment || Ae, release: r.release, user_segment: o, public_key: i, trace_id: t });
  return e.emit && e.emit("createDsc", s), s;
}
var Ye = class extends Pe {
  constructor(e, n) {
    super(e), delete this.description, this._measurements = {}, this._contexts = {}, this._hub = n || y(), this._name = e.name || "", this.metadata = h(u({ source: "custom" }, e.metadata), { spanMetadata: {} }), this._trimEnd = e.trimEnd, this.transaction = this;
    let r = this.metadata.dynamicSamplingContext;
    r && (this._frozenDynamicSamplingContext = u({}, r));
  }
  get name() {
    return this._name;
  }
  set name(e) {
    this.setName(e);
  }
  setName(e, n = "custom") {
    this._name = e, this.metadata.source = n;
  }
  initSpanRecorder(e = 1e3) {
    this.spanRecorder || (this.spanRecorder = new Ge(e)), this.spanRecorder.add(this);
  }
  setContext(e, n) {
    n === null ? delete this._contexts[e] : this._contexts[e] = n;
  }
  setMeasurement(e, n, r = "") {
    this._measurements[e] = { value: n, unit: r };
  }
  setMetadata(e) {
    this.metadata = u(u({}, this.metadata), e);
  }
  finish(e) {
    let n = this._finishTransaction(e);
    if (n) return this._hub.captureEvent(n);
  }
  toContext() {
    let e = super.toContext();
    return B(h(u({}, e), { name: this.name, trimEnd: this._trimEnd }));
  }
  updateWithContext(e) {
    return super.updateWithContext(e), this.name = e.name || "", this._trimEnd = e.trimEnd, this;
  }
  getDynamicSamplingContext() {
    if (this._frozenDynamicSamplingContext) return this._frozenDynamicSamplingContext;
    let e = this._hub || y(), n = e.getClient();
    if (!n) return {};
    let r = e.getScope(), i = fe(this.traceId, n, r), o = this.metadata.sampleRate;
    o !== void 0 && (i.sample_rate = `${o}`);
    let s = this.metadata.source;
    return s && s !== "url" && (i.transaction = this.name), this.sampled !== void 0 && (i.sampled = String(this.sampled)), i;
  }
  setHub(e) {
    this._hub = e;
  }
  _finishTransaction(e) {
    if (this.endTimestamp !== void 0) return;
    this.name || ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this.name = "<unlabeled transaction>"), super.finish(e);
    let n = this._hub.getClient();
    if (n && n.emit && n.emit("finishTransaction", this), this.sampled !== true) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."), n && n.recordDroppedEvent("sample_rate", "transaction");
      return;
    }
    let r = this.spanRecorder ? this.spanRecorder.spans.filter((a) => a !== this && a.endTimestamp) : [];
    this._trimEnd && r.length > 0 && (this.endTimestamp = r.reduce((a, c) => a.endTimestamp && c.endTimestamp ? a.endTimestamp > c.endTimestamp ? a : c : a).endTimestamp);
    let i = this.metadata, o = u({ contexts: h(u({}, this._contexts), { trace: this.getTraceContext() }), spans: r, start_timestamp: this.startTimestamp, tags: this.tags, timestamp: this.endTimestamp, transaction: this.name, type: "transaction", sdkProcessingMetadata: h(u({}, i), { dynamicSamplingContext: this.getDynamicSamplingContext() }) }, i.source && { transaction_info: { source: i.source } });
    return Object.keys(this._measurements).length > 0 && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)), o.measurements = this._measurements), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`), o;
  }
};
var Le = { idleTimeout: 1e3, finalTimeout: 3e4, heartbeatInterval: 5e3 };
var ko = "finishReason";
var Me = ["heartbeatFailed", "idleTimeout", "documentHidden", "finalTimeout", "externalFinish", "cancelled"];
var Fn = class extends Ge {
  constructor(e, n, r, i) {
    super(i), this._pushActivity = e, this._popActivity = n, this.transactionSpanId = r;
  }
  add(e) {
    e.spanId !== this.transactionSpanId && (e.finish = (n) => {
      e.endTimestamp = typeof n == "number" ? n : W(), this._popActivity(e.spanId);
    }, e.endTimestamp === void 0 && this._pushActivity(e.spanId)), super.add(e);
  }
};
var ct = class extends Ye {
  constructor(e, n, r = Le.idleTimeout, i = Le.finalTimeout, o = Le.heartbeatInterval, s = false) {
    super(e, n), this._idleHub = n, this._idleTimeout = r, this._finalTimeout = i, this._heartbeatInterval = o, this._onScope = s, this.activities = {}, this._heartbeatCounter = 0, this._finished = false, this._idleTimeoutCanceledPermanently = false, this._beforeFinishCallbacks = [], this._finishReason = Me[4], s && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`), n.configureScope((a) => a.setSpan(this))), this._restartIdleTimeout(), setTimeout(() => {
      this._finished || (this.setStatus("deadline_exceeded"), this._finishReason = Me[3], this.finish());
    }, this._finalTimeout);
  }
  finish(e = W()) {
    if (this._finished = true, this.activities = {}, this.op === "ui.action.click" && this.setTag(ko, this._finishReason), this.spanRecorder) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] finishing IdleTransaction", new Date(e * 1e3).toISOString(), this.op);
      for (let n of this._beforeFinishCallbacks) n(this, e);
      this.spanRecorder.spans = this.spanRecorder.spans.filter((n) => {
        if (n.spanId === this.spanId) return true;
        n.endTimestamp || (n.endTimestamp = e, n.setStatus("cancelled"), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(n, void 0, 2)));
        let r = n.startTimestamp < e, i = (this._finalTimeout + this._idleTimeout) / 1e3, o = n.endTimestamp - this.startTimestamp < i;
        if (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) {
          let s = JSON.stringify(n, void 0, 2);
          r ? o || f.log("[Tracing] discarding Span since it finished after Transaction final timeout", s) : f.log("[Tracing] discarding Span since it happened after Transaction was finished", s);
        }
        return r && o;
      }), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] flushing IdleTransaction");
    } else (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] No active IdleTransaction");
    if (this._onScope) {
      let n = this._idleHub.getScope();
      n.getTransaction() === this && n.setSpan(void 0);
    }
    return super.finish(e);
  }
  registerBeforeFinishCallback(e) {
    this._beforeFinishCallbacks.push(e);
  }
  initSpanRecorder(e) {
    if (!this.spanRecorder) {
      let n = (i) => {
        this._finished || this._pushActivity(i);
      }, r = (i) => {
        this._finished || this._popActivity(i);
      };
      this.spanRecorder = new Fn(n, r, this.spanId, e), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("Starting heartbeat"), this._pingHeartbeat();
    }
    this.spanRecorder.add(this);
  }
  cancelIdleTimeout(e, { restartOnChildSpanChange: n } = { restartOnChildSpanChange: true }) {
    this._idleTimeoutCanceledPermanently = n === false, this._idleTimeoutID && (clearTimeout(this._idleTimeoutID), this._idleTimeoutID = void 0, Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently && (this._finishReason = Me[5], this.finish(e)));
  }
  setFinishReason(e) {
    this._finishReason = e;
  }
  _restartIdleTimeout(e) {
    this.cancelIdleTimeout(), this._idleTimeoutID = setTimeout(() => {
      !this._finished && Object.keys(this.activities).length === 0 && (this._finishReason = Me[1], this.finish(e));
    }, this._idleTimeout);
  }
  _pushActivity(e) {
    this.cancelIdleTimeout(void 0, { restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently }), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] pushActivity: ${e}`), this.activities[e] = true, (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] new activities count", Object.keys(this.activities).length);
  }
  _popActivity(e) {
    if (this.activities[e] && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] popActivity ${e}`), delete this.activities[e], (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] new activities count", Object.keys(this.activities).length)), Object.keys(this.activities).length === 0) {
      let n = W();
      this._idleTimeoutCanceledPermanently ? (this._finishReason = Me[5], this.finish(n)) : this._restartIdleTimeout(n + this._idleTimeout / 1e3);
    }
  }
  _beat() {
    if (this._finished) return;
    let e = Object.keys(this.activities).join("");
    e === this._prevHeartbeatString ? this._heartbeatCounter++ : this._heartbeatCounter = 1, this._prevHeartbeatString = e, this._heartbeatCounter >= 3 ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this._finishReason = Me[0], this.finish()) : this._pingHeartbeat();
  }
  _pingHeartbeat() {
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
      this._beat();
    }, this._heartbeatInterval);
  }
};
function wo() {
  let e = this.getScope().getSpan();
  return e ? { "sentry-trace": e.toTraceparent() } : {};
}
function Jr(t, e, n) {
  if (!Ce(e)) return t.sampled = false, t;
  if (t.sampled !== void 0) return t.setMetadata({ sampleRate: Number(t.sampled) }), t;
  let r;
  return typeof e.tracesSampler == "function" ? (r = e.tracesSampler(n), t.setMetadata({ sampleRate: Number(r) })) : n.parentSampled !== void 0 ? r = n.parentSampled : typeof e.tracesSampleRate != "undefined" ? (r = e.tracesSampleRate, t.setMetadata({ sampleRate: Number(r) })) : (r = 1, t.setMetadata({ sampleRate: r })), Bo(r) ? r ? (t.sampled = Math.random() < r, t.sampled ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] starting ${t.op} transaction - ${t.name}`), t) : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(r)})`), t)) : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Discarding transaction because ${typeof e.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`), t.sampled = false, t) : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("[Tracing] Discarding transaction because of invalid sample rate."), t.sampled = false, t);
}
function Bo(t) {
  return Ke(t) || !(typeof t == "number" || typeof t == "boolean") ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(t)} of type ${JSON.stringify(typeof t)}.`), false) : t < 0 || t > 1 ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${t}.`), false) : true;
}
function Ao(t, e) {
  let n = this.getClient(), r = n && n.getOptions() || {}, i = r.instrumenter || "sentry", o = t.instrumenter || "sentry";
  i !== o && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.error(`A transaction was started with instrumenter=\`${o}\`, but the SDK is configured with the \`${i}\` instrumenter.
The transaction will not be sampled. Please use the ${i} instrumentation to start transactions.`), t.sampled = false);
  let s = new Ye(t, this);
  return s = Jr(s, r, u({ parentSampled: t.parentSampled, transactionContext: t }, e)), s.sampled && s.initSpanRecorder(r._experiments && r._experiments.maxSpans), n && n.emit && n.emit("startTransaction", s), s;
}
function Ft(t, e, n, r, i, o, s) {
  let a = t.getClient(), c = a && a.getOptions() || {}, d = new ct(e, t, n, r, s, i);
  return d = Jr(d, c, u({ parentSampled: e.parentSampled, transactionContext: e }, o)), d.sampled && d.initSpanRecorder(c._experiments && c._experiments.maxSpans), a && a.emit && a.emit("startTransaction", d), d;
}
function Ht() {
  let t = Te();
  t.__SENTRY__ && (t.__SENTRY__.extensions = t.__SENTRY__.extensions || {}, t.__SENTRY__.extensions.startTransaction || (t.__SENTRY__.extensions.startTransaction = Ao), t.__SENTRY__.extensions.traceHeaders || (t.__SENTRY__.extensions.traceHeaders = wo), Xr());
}
function $t(t, e) {
  return y().captureException(t, { captureContext: e });
}
function jt(t) {
  y().withScope(t);
}
var Uo = "7";
function Co(t) {
  let e = t.protocol ? `${t.protocol}:` : "", n = t.port ? `:${t.port}` : "";
  return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
}
function Go(t) {
  return `${Co(t)}${t.projectId}/envelope/`;
}
function Po(t, e) {
  return ln(u({ sentry_key: t.publicKey, sentry_version: Uo }, e && { sentry_client: `${e.name}/${e.version}` }));
}
function Qr(t, e = {}) {
  let n = typeof e == "string" ? e : e.tunnel, r = typeof e == "string" || !e._metadata ? void 0 : e._metadata.sdk;
  return n || `${Go(t)}?${Po(t, r)}`;
}
function Yo(t, e) {
  return e && (t.sdk = t.sdk || {}, t.sdk.name = t.sdk.name || e.name, t.sdk.version = t.sdk.version || e.version, t.sdk.integrations = [...t.sdk.integrations || [], ...e.integrations || []], t.sdk.packages = [...t.sdk.packages || [], ...e.packages || []]), t;
}
function Zr(t, e, n, r) {
  let i = Mt(n), o = u(u({ sent_at: (/* @__PURE__ */ new Date()).toISOString() }, i && { sdk: i }), !!r && e && { dsn: X(e) }), s = "aggregates" in t ? [{ type: "sessions" }, t] : [{ type: "session" }, t.toJSON()];
  return K(o, [s]);
}
function ei(t, e, n, r) {
  let i = Mt(n), o = t.type && t.type !== "replay_event" ? t.type : "event";
  Yo(t, n && n.sdk);
  let s = Un(t, i, r, e);
  return delete t.sdkProcessingMetadata, K(s, [[{ type: o }, t]]);
}
var ti = [];
function ni(t, e) {
  let n = {};
  return e.forEach((r) => {
    r && Hn(t, r, n);
  }), n;
}
function Hn(t, e, n) {
  if (n[e.name] = e, ti.indexOf(e.name) === -1 && (e.setupOnce(Yn, y), ti.push(e.name)), t.on && typeof e.preprocessEvent == "function") {
    let r = e.preprocessEvent.bind(e);
    t.on("preprocessEvent", (i, o) => r(i, o, t));
  }
  if (t.addEventProcessor && typeof e.processEvent == "function") {
    let r = e.processEvent.bind(e), i = Object.assign((o, s) => r(o, s, t), { id: e.name });
    t.addEventProcessor(i);
  }
  (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`Integration installed: ${e.name}`);
}
function ii(t, e, n, r, i) {
  let { normalizeDepth: o = 3, normalizeMaxBreadth: s = 1e3 } = t, a = h(u({}, e), { event_id: e.event_id || n.event_id || v(), timestamp: e.timestamp || se() }), c = n.integrations || t.integrations.map((_) => _.name);
  Mo(a, t), Ho(a, c), e.type === void 0 && Lo(a, t.stackParser);
  let d = r;
  n.captureContext && (d = P.clone(d).update(n.captureContext));
  let l = C(a), p = i && i.getEventProcessors ? i.getEventProcessors() : [];
  if (d) {
    if (d.getAttachments) {
      let _ = [...n.attachments || [], ...d.getAttachments()];
      _.length && (n.attachments = _);
    }
    l = d.applyToEvent(a, n, p);
  } else l = Ue([...p, ...st()], a, n);
  return l.then((_) => (_ && Fo(_), typeof o == "number" && o > 0 ? $o(_, o, s) : _));
}
function Mo(t, e) {
  let { environment: n, release: r, dist: i, maxValueLength: o = 250 } = e;
  "environment" in t || (t.environment = "environment" in e ? n : Ae), t.release === void 0 && r !== void 0 && (t.release = r), t.dist === void 0 && i !== void 0 && (t.dist = i), t.message && (t.message = z(t.message, o));
  let s = t.exception && t.exception.values && t.exception.values[0];
  s && s.value && (s.value = z(s.value, o));
  let a = t.request;
  a && a.url && (a.url = z(a.url, o));
}
var ri = /* @__PURE__ */ new WeakMap();
function Lo(t, e) {
  let n = b._sentryDebugIds;
  if (!n) return;
  let r, i = ri.get(e);
  i ? r = i : (r = /* @__PURE__ */ new Map(), ri.set(e, r));
  let o = Object.keys(n).reduce((s, a) => {
    let c, d = r.get(a);
    d ? c = d : (c = e(a), r.set(a, c));
    for (let l = c.length - 1; l >= 0; l--) {
      let p = c[l];
      if (p.filename) {
        s[p.filename] = n[a];
        break;
      }
    }
    return s;
  }, {});
  try {
    t.exception.values.forEach((s) => {
      s.stacktrace.frames.forEach((a) => {
        a.filename && (a.debug_id = o[a.filename]);
      });
    });
  } catch (s) {
  }
}
function Fo(t) {
  let e = {};
  try {
    t.exception.values.forEach((r) => {
      r.stacktrace.frames.forEach((i) => {
        i.debug_id && (i.abs_path ? e[i.abs_path] = i.debug_id : i.filename && (e[i.filename] = i.debug_id), delete i.debug_id);
      });
    });
  } catch (r) {
  }
  if (Object.keys(e).length === 0) return;
  t.debug_meta = t.debug_meta || {}, t.debug_meta.images = t.debug_meta.images || [];
  let n = t.debug_meta.images;
  Object.keys(e).forEach((r) => {
    n.push({ type: "sourcemap", code_file: r, debug_id: e[r] });
  });
}
function Ho(t, e) {
  e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...t.sdk.integrations || [], ...e]);
}
function $o(t, e, n) {
  if (!t) return null;
  let r = u(u(u(u(u({}, t), t.breadcrumbs && { breadcrumbs: t.breadcrumbs.map((i) => u(u({}, i), i.data && { data: j(i.data, e, n) })) }), t.user && { user: j(t.user, e, n) }), t.contexts && { contexts: j(t.contexts, e, n) }), t.extra && { extra: j(t.extra, e, n) });
  return t.contexts && t.contexts.trace && r.contexts && (r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = j(t.contexts.trace.data, e, n))), t.spans && (r.spans = t.spans.map((i) => (i.data && (i.data = j(i.data, e, n)), i))), r;
}
var oi = "Not capturing exception because it's already been captured.";
var ut = class {
  constructor(e) {
    if (this._options = e, this._integrations = {}, this._integrationsInitialized = false, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], e.dsn ? this._dsn = vt(e.dsn) : (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("No DSN provided, client will not send events."), this._dsn) {
      let n = Qr(this._dsn, e);
      this._transport = e.transport(h(u({ recordDroppedEvent: this.recordDroppedEvent.bind(this) }, e.transportOptions), { url: n }));
    }
  }
  captureException(e, n, r) {
    if (At(e)) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(oi);
      return;
    }
    let i = n && n.event_id;
    return this._process(this.eventFromException(e, n).then((o) => this._captureEvent(o, n, r)).then((o) => {
      i = o;
    })), i;
  }
  captureMessage(e, n, r, i) {
    let o = r && r.event_id, s = Ie(e) ? this.eventFromMessage(String(e), n, r) : this.eventFromException(e, r);
    return this._process(s.then((a) => this._captureEvent(a, r, i)).then((a) => {
      o = a;
    })), o;
  }
  captureEvent(e, n, r) {
    if (n && n.originalException && At(n.originalException)) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(oi);
      return;
    }
    let i = n && n.event_id;
    return this._process(this._captureEvent(e, n, r).then((o) => {
      i = o;
    })), i;
  }
  captureSession(e) {
    typeof e.release != "string" ? (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("Discarded session because of missing or non-string release") : (this.sendSession(e), ae(e, { init: false }));
  }
  getDsn() {
    return this._dsn;
  }
  getOptions() {
    return this._options;
  }
  getSdkMetadata() {
    return this._options._metadata;
  }
  getTransport() {
    return this._transport;
  }
  flush(e) {
    let n = this._transport;
    return n ? this._isClientDoneProcessing(e).then((r) => n.flush(e).then((i) => r && i)) : C(true);
  }
  close(e) {
    return this.flush(e).then((n) => (this.getOptions().enabled = false, n));
  }
  getEventProcessors() {
    return this._eventProcessors;
  }
  addEventProcessor(e) {
    this._eventProcessors.push(e);
  }
  setupIntegrations(e) {
    (e && !this._integrationsInitialized || this._isEnabled() && !this._integrationsInitialized) && (this._integrations = ni(this, this._options.integrations), this._integrationsInitialized = true);
  }
  getIntegrationById(e) {
    return this._integrations[e];
  }
  getIntegration(e) {
    try {
      return this._integrations[e.id] || null;
    } catch (n) {
      return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Cannot retrieve integration ${e.id} from the current Client`), null;
    }
  }
  addIntegration(e) {
    Hn(this, e, this._integrations);
  }
  sendEvent(e, n = {}) {
    this.emit("beforeSendEvent", e, n);
    let r = ei(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (let o of n.attachments || []) r = wn(r, An(o, this._options.transportOptions && this._options.transportOptions.textEncoder));
    let i = this._sendEnvelope(r);
    i && i.then((o) => this.emit("afterSendEvent", e, o), null);
  }
  sendSession(e) {
    let n = Zr(e, this._dsn, this._options._metadata, this._options.tunnel);
    this._sendEnvelope(n);
  }
  recordDroppedEvent(e, n, r) {
    if (this._options.sendClientReports) {
      let i = `${e}:${n}`;
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`Adding outcome: "${i}"`), this._outcomes[i] = this._outcomes[i] + 1 || 1;
    }
  }
  on(e, n) {
    this._hooks[e] || (this._hooks[e] = []), this._hooks[e].push(n);
  }
  emit(e, ...n) {
    this._hooks[e] && this._hooks[e].forEach((r) => r(...n));
  }
  _updateSessionFromEvent(e, n) {
    let r = false, i = false, o = n.exception && n.exception.values;
    if (o) {
      i = true;
      for (let c of o) {
        let d = c.mechanism;
        if (d && d.handled === false) {
          r = true;
          break;
        }
      }
    }
    let s = e.status === "ok";
    (s && e.errors === 0 || s && r) && (ae(e, h(u({}, r && { status: "crashed" }), { errors: e.errors || Number(i || r) })), this.captureSession(e));
  }
  _isClientDoneProcessing(e) {
    return new N((n) => {
      let r = 0, i = 1, o = setInterval(() => {
        this._numProcessing == 0 ? (clearInterval(o), n(true)) : (r += i, e && r >= e && (clearInterval(o), n(false)));
      }, i);
    });
  }
  _isEnabled() {
    return this.getOptions().enabled !== false && this._transport !== void 0;
  }
  _prepareEvent(e, n, r) {
    let i = this.getOptions(), o = Object.keys(this._integrations);
    return !n.integrations && o.length > 0 && (n.integrations = o), this.emit("preprocessEvent", e, n), ii(i, e, n, r, this).then((s) => {
      if (s === null) return s;
      let { propagationContext: a } = s.sdkProcessingMetadata || {};
      if (!(s.contexts && s.contexts.trace) && a) {
        let { traceId: d, spanId: l, parentSpanId: p, dsc: _ } = a;
        s.contexts = u({ trace: { trace_id: d, span_id: l, parent_span_id: p } }, s.contexts);
        let m = _ || fe(d, this, r);
        s.sdkProcessingMetadata = u({ dynamicSamplingContext: m }, s.sdkProcessingMetadata);
      }
      return s;
    });
  }
  _captureEvent(e, n = {}, r) {
    return this._processEvent(e, n, r).then((i) => i.event_id, (i) => {
      if (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) {
        let o = i;
        o.logLevel === "log" ? f.log(o.message) : f.warn(o);
      }
    });
  }
  _processEvent(e, n, r) {
    let i = this.getOptions(), { sampleRate: o } = i, s = ai(e), a = si(e), c = e.type || "error", d = `before send for type \`${c}\``;
    if (a && typeof o == "number" && Math.random() > o) return this.recordDroppedEvent("sample_rate", "error", e), ye(new k(`Discarding event because it's not included in the random sample (sampling rate = ${o})`, "log"));
    let l = c === "replay_event" ? "replay" : c;
    return this._prepareEvent(e, n, r).then((p) => {
      if (p === null) throw this.recordDroppedEvent("event_processor", l, e), new k("An event processor returned `null`, will not send event.", "log");
      if (n.data && n.data.__sentry__ === true) return p;
      let m = Wo(i, p, n);
      return jo(m, d);
    }).then((p) => {
      if (p === null) throw this.recordDroppedEvent("before_send", l, e), new k(`${d} returned \`null\`, will not send event.`, "log");
      let _ = r && r.getSession();
      !s && _ && this._updateSessionFromEvent(_, p);
      let m = p.transaction_info;
      if (s && m && p.transaction !== e.transaction) {
        let E = "custom";
        p.transaction_info = h(u({}, m), { source: E });
      }
      return this.sendEvent(p, n), p;
    }).then(null, (p) => {
      throw p instanceof k ? p : (this.captureException(p, { data: { __sentry__: true }, originalException: p }), new k(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${p}`));
    });
  }
  _process(e) {
    this._numProcessing++, e.then((n) => (this._numProcessing--, n), (n) => (this._numProcessing--, n));
  }
  _sendEnvelope(e) {
    if (this.emit("beforeEnvelope", e), this._isEnabled() && this._transport) return this._transport.send(e).then(null, (n) => {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.error("Error while sending event:", n);
    });
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.error("Transport disabled");
  }
  _clearOutcomes() {
    let e = this._outcomes;
    return this._outcomes = {}, Object.keys(e).map((n) => {
      let [r, i] = n.split(":");
      return { reason: r, category: i, quantity: e[n] };
    });
  }
};
function jo(t, e) {
  let n = `${e} must return \`null\` or a valid event.`;
  if (Ee(t)) return t.then((r) => {
    if (!L(r) && r !== null) throw new k(n);
    return r;
  }, (r) => {
    throw new k(`${e} rejected with ${r}`);
  });
  if (!L(t) && t !== null) throw new k(n);
  return t;
}
function Wo(t, e, n) {
  let { beforeSend: r, beforeSendTransaction: i } = t;
  return si(e) && r ? r(e, n) : ai(e) && i ? i(e, n) : e;
}
function si(t) {
  return t.type === void 0;
}
function ai(t) {
  return t.type === "transaction";
}
var qo = 30;
function Fe(t, e, n = bn(t.bufferSize || qo)) {
  let r = {}, i = (s) => n.drain(s);
  function o(s) {
    let a = [];
    if (Pt(s, (p, _) => {
      let m = Yt(_);
      if (Gn(r, m)) {
        let E = ci(p, _);
        t.recordDroppedEvent("ratelimit_backoff", m, E);
      } else a.push(p);
    }), a.length === 0) return C();
    let c = K(s[0], a), d = (p) => {
      Pt(c, (_, m) => {
        let E = ci(_, m);
        t.recordDroppedEvent(p, Yt(m), E);
      });
    }, l = () => e({ body: Bn(c, t.textEncoder) }).then((p) => (p.statusCode !== void 0 && (p.statusCode < 200 || p.statusCode >= 300) && (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Sentry responded with status code ${p.statusCode} to sent event.`), r = Pn(r, p), p), (p) => {
      throw d("network_error"), p;
    });
    return n.add(l).then((p) => p, (p) => {
      if (p instanceof k) return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.error("Skipped sending event because buffer is full."), d("queue_overflow"), C();
      throw p;
    });
  }
  return o.__sentry__baseTransport__ = true, { send: o, flush: i };
}
function ci(t, e) {
  if (!(e !== "event" && e !== "transaction")) return Array.isArray(t) ? t[1] : void 0;
}
var dt = "7.73.0";
var qt = {};
cr(qt, { FunctionToString: () => pe, InboundFilters: () => le });
var ui;
var pe = class {
  static __initStatic() {
    this.id = "FunctionToString";
  }
  constructor() {
    this.name = pe.id;
  }
  setupOnce() {
    ui = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...e) {
        let n = Se(this) || this;
        return ui.apply(n, e);
      };
    } catch (e) {
    }
  }
};
pe.__initStatic();
var zo = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
var Vo = [/^.*healthcheck.*$/, /^.*healthy.*$/, /^.*live.*$/, /^.*ready.*$/, /^.*heartbeat.*$/, /^.*\/health$/, /^.*\/healthz$/];
var le = class {
  static __initStatic() {
    this.id = "InboundFilters";
  }
  constructor(e = {}) {
    this.name = le.id, this._options = e;
  }
  setupOnce(e, n) {
  }
  processEvent(e, n, r) {
    let i = r.getOptions(), o = Xo(this._options, i);
    return Ko(e, o) ? null : e;
  }
};
le.__initStatic();
function Xo(t = {}, e = {}) {
  return { allowUrls: [...t.allowUrls || [], ...e.allowUrls || []], denyUrls: [...t.denyUrls || [], ...e.denyUrls || []], ignoreErrors: [...t.ignoreErrors || [], ...e.ignoreErrors || [], ...t.disableErrorDefaults ? [] : zo], ignoreTransactions: [...t.ignoreTransactions || [], ...e.ignoreTransactions || [], ...t.disableTransactionDefaults ? [] : Vo], ignoreInternal: t.ignoreInternal !== void 0 ? t.ignoreInternal : true };
}
function Ko(t, e) {
  return e.ignoreInternal && ns(t) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Event dropped due to being internal Sentry Error.
Event: ${$(t)}`), true) : Jo(t, e.ignoreErrors) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${$(t)}`), true) : Qo(t, e.ignoreTransactions) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${$(t)}`), true) : Zo(t, e.denyUrls) ? ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${$(t)}.
Url: ${Wt(t)}`), true) : es(t, e.allowUrls) ? false : ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${$(t)}.
Url: ${Wt(t)}`), true);
}
function Jo(t, e) {
  return t.type || !e || !e.length ? false : ts(t).some((n) => ue(n, e));
}
function Qo(t, e) {
  if (t.type !== "transaction" || !e || !e.length) return false;
  let n = t.transaction;
  return n ? ue(n, e) : false;
}
function Zo(t, e) {
  if (!e || !e.length) return false;
  let n = Wt(t);
  return n ? ue(n, e) : false;
}
function es(t, e) {
  if (!e || !e.length) return true;
  let n = Wt(t);
  return n ? ue(n, e) : true;
}
function ts(t) {
  let e = [];
  t.message && e.push(t.message);
  let n;
  try {
    n = t.exception.values[t.exception.values.length - 1];
  } catch (r) {
  }
  return n && n.value && (e.push(n.value), n.type && e.push(`${n.type}: ${n.value}`)), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && e.length === 0 && f.error(`Could not extract message for event ${$(t)}`), e;
}
function ns(t) {
  try {
    return t.exception.values[0].type === "SentryError";
  } catch (e) {
  }
  return false;
}
function rs(t = []) {
  for (let e = t.length - 1; e >= 0; e--) {
    let n = t[e];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]") return n.filename || null;
  }
  return null;
}
function Wt(t) {
  try {
    let e;
    try {
      e = t.exception.values[0].stacktrace.frames;
    } catch (n) {
    }
    return e ? rs(e) : null;
  } catch (e) {
    return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.error(`Cannot extract url for event ${$(t)}`), null;
  }
}
var S = b;
var $n = 0;
function jn() {
  return $n > 0;
}
function Es() {
  $n++, setTimeout(() => {
    $n--;
  });
}
function be(t, e = {}, n) {
  if (typeof t != "function") return t;
  try {
    let i = t.__sentry_wrapped__;
    if (i) return i;
    if (Se(t)) return t;
  } catch (i) {
    return t;
  }
  let r = function() {
    let i = Array.prototype.slice.call(arguments);
    try {
      n && typeof n == "function" && n.apply(this, arguments);
      let o = i.map((s) => be(s, e));
      return t.apply(this, o);
    } catch (o) {
      throw Es(), jt((s) => {
        s.addEventProcessor((a) => (e.mechanism && (we(a, void 0, void 0), ie(a, e.mechanism)), a.extra = h(u({}, a.extra), { arguments: i }), a)), $t(o);
      }), o;
    }
  };
  try {
    for (let i in t) Object.prototype.hasOwnProperty.call(t, i) && (r[i] = t[i]);
  } catch (i) {
  }
  xt(r, t), ke(t, "__sentry_wrapped__", r);
  try {
    Object.getOwnPropertyDescriptor(r, "name").configurable && Object.defineProperty(r, "name", { get() {
      return t.name;
    } });
  } catch (i) {
  }
  return r;
}
function zn(t, e) {
  let n = Vn(t, e), r = { type: e && e.name, value: bs(e) };
  return n.length && (r.stacktrace = { frames: n }), r.type === void 0 && r.value === "" && (r.value = "Unrecoverable error caught"), r;
}
function Ss(t, e, n, r) {
  let o = y().getClient(), s = o && o.getOptions().normalizeDepth, a = { exception: { values: [{ type: ge(e) ? e.constructor.name : r ? "UnhandledRejection" : "Error", value: Rs(e, { isUnhandledRejection: r }) }] }, extra: { __serialized__: Gt(e, s) } };
  if (n) {
    let c = Vn(t, n);
    c.length && (a.exception.values[0].stacktrace = { frames: c });
  }
  return a;
}
function Wn(t, e) {
  return { exception: { values: [zn(t, e)] } };
}
function Vn(t, e) {
  let n = e.stacktrace || e.stack || "", r = Ts(e);
  try {
    return t(n, r);
  } catch (i) {
  }
  return [];
}
var ys = /Minified React error #\d+;/i;
function Ts(t) {
  if (t) {
    if (typeof t.framesToPop == "number") return t.framesToPop;
    if (ys.test(t.message)) return 1;
  }
  return 0;
}
function bs(t) {
  let e = t && t.message;
  return e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
function di(t, e, n, r) {
  let i = n && n.syntheticException || void 0, o = zt(t, e, i, r);
  return ie(o), o.level = "error", n && n.event_id && (o.event_id = n.event_id), C(o);
}
function fi(t, e, n = "info", r, i) {
  let o = r && r.syntheticException || void 0, s = qn(t, e, o, i);
  return s.level = n, r && r.event_id && (s.event_id = r.event_id), C(s);
}
function zt(t, e, n, r, i) {
  let o;
  if (De(e) && e.error) return Wn(t, e.error);
  if (St(e) || rn(e)) {
    let s = e;
    if ("stack" in e) o = Wn(t, e);
    else {
      let a = s.name || (St(s) ? "DOMError" : "DOMException"), c = s.message ? `${a}: ${s.message}` : a;
      o = qn(t, c, n, r), we(o, c);
    }
    return "code" in s && (o.tags = h(u({}, o.tags), { "DOMException.code": `${s.code}` })), o;
  }
  return Xe(e) ? Wn(t, e) : L(e) || ge(e) ? (o = Ss(t, e, n, i), ie(o, { synthetic: true }), o) : (o = qn(t, e, n, r), we(o, `${e}`, void 0), ie(o, { synthetic: true }), o);
}
function qn(t, e, n, r) {
  let i = { message: e };
  if (r && n) {
    let o = Vn(t, n);
    o.length && (i.exception = { values: [{ value: e, stacktrace: { frames: o } }] });
  }
  return i;
}
function Rs(t, { isUnhandledRejection: e }) {
  let n = _n(t), r = e ? "promise rejection" : "exception";
  return De(t) ? `Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\`` : ge(t) ? `Event \`${vs(t)}\` (type=${t.type}) captured as ${r}` : `Object captured as ${r} with keys: ${n}`;
}
function vs(t) {
  try {
    let e = Object.getPrototypeOf(t);
    return e ? e.constructor.name : void 0;
  } catch (e) {
  }
}
function pi(t, { metadata: e, tunnel: n, dsn: r }) {
  let i = u(u({ event_id: t.event_id, sent_at: (/* @__PURE__ */ new Date()).toISOString() }, e && e.sdk && { sdk: { name: e.sdk.name, version: e.sdk.version } }), !!n && !!r && { dsn: X(r) }), o = xs(t);
  return K(i, [o]);
}
function xs(t) {
  return [{ type: "user_report" }, t];
}
var ft = class extends ut {
  constructor(e) {
    let n = S.SENTRY_SDK_SOURCE || Tn();
    e._metadata = e._metadata || {}, e._metadata.sdk = e._metadata.sdk || { name: "sentry.javascript.browser", packages: [{ name: `${n}:@sentry/browser`, version: dt }], version: dt }, super(e), e.sendClientReports && S.document && S.document.addEventListener("visibilitychange", () => {
      S.document.visibilityState === "hidden" && this._flushOutcomes();
    });
  }
  eventFromException(e, n) {
    return di(this._options.stackParser, e, n, this._options.attachStacktrace);
  }
  eventFromMessage(e, n = "info", r) {
    return fi(this._options.stackParser, e, n, r, this._options.attachStacktrace);
  }
  captureUserFeedback(e) {
    if (!this._isEnabled()) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("SDK not enabled, will not capture user feedback.");
      return;
    }
    let n = pi(e, { metadata: this.getSdkMetadata(), dsn: this.getDsn(), tunnel: this.getOptions().tunnel });
    this._sendEnvelope(n);
  }
  _prepareEvent(e, n, r) {
    return e.platform = e.platform || "javascript", super._prepareEvent(e, n, r);
  }
  _flushOutcomes() {
    let e = this._clearOutcomes();
    if (e.length === 0) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("No dsn provided, will not send outcomes");
      return;
    }
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("Sending outcomes:", e);
    let n = Cn(e, this._options.tunnel && X(this._dsn));
    this._sendEnvelope(n);
  }
};
var pt;
function li() {
  if (pt) return pt;
  if (et(S.fetch)) return pt = S.fetch.bind(S);
  let t = S.document, e = S.fetch;
  if (t && typeof t.createElement == "function") try {
    let n = t.createElement("iframe");
    n.hidden = true, t.head.appendChild(n);
    let r = n.contentWindow;
    r && r.fetch && (e = r.fetch), t.head.removeChild(n);
  } catch (n) {
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n);
  }
  return pt = e.bind(S);
}
function _i() {
  pt = void 0;
}
function Xn(t, e = li()) {
  let n = 0, r = 0;
  function i(o) {
    let s = o.body.length;
    n += s, r++;
    let a = u({ body: o.body, method: "POST", referrerPolicy: "origin", headers: t.headers, keepalive: n <= 6e4 && r < 15 }, t.fetchOptions);
    try {
      return e(t.url, a).then((c) => (n -= s, r--, { statusCode: c.status, headers: { "x-sentry-rate-limits": c.headers.get("X-Sentry-Rate-Limits"), "retry-after": c.headers.get("Retry-After") } }));
    } catch (c) {
      return _i(), n -= s, r--, ye(c);
    }
  }
  return Fe(t, i);
}
var Ns = 4;
function Kn(t) {
  function e(n) {
    return new N((r, i) => {
      let o = new XMLHttpRequest();
      o.onerror = i, o.onreadystatechange = () => {
        o.readyState === Ns && r({ statusCode: o.status, headers: { "x-sentry-rate-limits": o.getResponseHeader("X-Sentry-Rate-Limits"), "retry-after": o.getResponseHeader("Retry-After") } });
      }, o.open("POST", t.url);
      for (let s in t.headers) Object.prototype.hasOwnProperty.call(t.headers, s) && o.setRequestHeader(s, t.headers[s]);
      o.send(n.body);
    });
  }
  return Fe(t, e);
}
var Vt = "?";
var Ds = 30;
var Is = 40;
var Os = 50;
function Jn(t, e, n, r) {
  let i = { filename: t, function: e, in_app: true };
  return n !== void 0 && (i.lineno = n), r !== void 0 && (i.colno = r), i;
}
var ks = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var ws = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var Bs = (t) => {
  let e = ks.exec(t);
  if (e) {
    if (e[2] && e[2].indexOf("eval") === 0) {
      let o = ws.exec(e[2]);
      o && (e[2] = o[1], e[3] = o[2], e[4] = o[3]);
    }
    let [r, i] = Si(e[1] || Vt, e[2]);
    return Jn(i, r, e[3] ? +e[3] : void 0, e[4] ? +e[4] : void 0);
  }
};
var mi = [Ds, Bs];
var As = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var Us = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var Cs = (t) => {
  let e = As.exec(t);
  if (e) {
    if (e[3] && e[3].indexOf(" > eval") > -1) {
      let o = Us.exec(e[3]);
      o && (e[1] = e[1] || "eval", e[3] = o[1], e[4] = o[2], e[5] = "");
    }
    let r = e[3], i = e[1] || Vt;
    return [i, r] = Si(i, r), Jn(r, i, e[4] ? +e[4] : void 0, e[5] ? +e[5] : void 0);
  }
};
var hi = [Os, Cs];
var Gs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var Ps = (t) => {
  let e = Gs.exec(t);
  return e ? Jn(e[2], e[1] || Vt, +e[3], e[4] ? +e[4] : void 0) : void 0;
};
var gi = [Is, Ps];
var Ei = [mi, hi, gi];
var Qn = hn(...Ei);
var Si = (t, e) => {
  let n = t.indexOf("safari-extension") !== -1, r = t.indexOf("safari-web-extension") !== -1;
  return n || r ? [t.indexOf("@") !== -1 ? t.split("@")[0] : Vt, n ? `safari-extension:${e}` : `safari-web-extension:${e}`] : [t, e];
};
var Y = class {
  static __initStatic() {
    this.id = "GlobalHandlers";
  }
  constructor(e) {
    this.name = Y.id, this._options = u({ onerror: true, onunhandledrejection: true }, e), this._installFunc = { onerror: Ys, onunhandledrejection: Ms };
  }
  setupOnce() {
    Error.stackTraceLimit = 50;
    let e = this._options;
    for (let n in e) {
      let r = this._installFunc[n];
      r && e[n] && (Hs(n), r(), this._installFunc[n] = void 0);
    }
  }
};
Y.__initStatic();
function Ys() {
  O("error", (t) => {
    let [e, n, r] = bi();
    if (!e.getIntegration(Y)) return;
    let { msg: i, url: o, line: s, column: a, error: c } = t;
    if (jn() || c && c.__sentry_own_request__) return;
    let d = c === void 0 && w(i) ? Fs(i, o, s, a) : yi(zt(n, c || i, void 0, r, false), o, s, a);
    d.level = "error", Ti(e, c, d, "onerror");
  });
}
function Ms() {
  O("unhandledrejection", (t) => {
    let [e, n, r] = bi();
    if (!e.getIntegration(Y)) return;
    let i = t;
    try {
      "reason" in t ? i = t.reason : "detail" in t && "reason" in t.detail && (i = t.detail.reason);
    } catch (s) {
    }
    if (jn() || i && i.__sentry_own_request__) return true;
    let o = Ie(i) ? Ls(i) : zt(n, i, void 0, r, true);
    o.level = "error", Ti(e, i, o, "onunhandledrejection");
  });
}
function Ls(t) {
  return { exception: { values: [{ type: "UnhandledRejection", value: `Non-Error promise rejection captured with value: ${String(t)}` }] } };
}
function Fs(t, e, n, r) {
  let i = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i, o = De(t) ? t.message : t, s = "Error", a = o.match(i);
  return a && (s = a[1], o = a[2]), yi({ exception: { values: [{ type: s, value: o }] } }, e, n, r);
}
function yi(t, e, n, r) {
  let i = t.exception = t.exception || {}, o = i.values = i.values || [], s = o[0] = o[0] || {}, a = s.stacktrace = s.stacktrace || {}, c = a.frames = a.frames || [], d = isNaN(parseInt(r, 10)) ? void 0 : r, l = isNaN(parseInt(n, 10)) ? void 0 : n, p = w(e) && e.length > 0 ? e : dn();
  return c.length === 0 && c.push({ colno: d, filename: p, function: "?", in_app: true, lineno: l }), t;
}
function Hs(t) {
  (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`Global Handler attached: ${t}`);
}
function Ti(t, e, n, r) {
  ie(n, { handled: false, type: r }), t.captureEvent(n, { originalException: e });
}
function bi() {
  let t = y(), e = t.getClient(), n = e && e.getOptions() || { stackParser: () => [], attachStacktrace: false };
  return [t, n.stackParser, n.attachStacktrace];
}
var $s = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "BroadcastChannel", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "SharedWorker", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
var Re = class {
  static __initStatic() {
    this.id = "TryCatch";
  }
  constructor(e) {
    this.name = Re.id, this._options = u({ XMLHttpRequest: true, eventTarget: true, requestAnimationFrame: true, setInterval: true, setTimeout: true }, e);
  }
  setupOnce() {
    this._options.setTimeout && x(S, "setTimeout", Ri), this._options.setInterval && x(S, "setInterval", Ri), this._options.requestAnimationFrame && x(S, "requestAnimationFrame", js), this._options.XMLHttpRequest && "XMLHttpRequest" in S && x(XMLHttpRequest.prototype, "send", Ws);
    let e = this._options.eventTarget;
    e && (Array.isArray(e) ? e : $s).forEach(qs);
  }
};
Re.__initStatic();
function Ri(t) {
  return function(...e) {
    let n = e[0];
    return e[0] = be(n, { mechanism: { data: { function: G(t) }, handled: false, type: "instrument" } }), t.apply(this, e);
  };
}
function js(t) {
  return function(e) {
    return t.apply(this, [be(e, { mechanism: { data: { function: "requestAnimationFrame", handler: G(t) }, handled: false, type: "instrument" } })]);
  };
}
function Ws(t) {
  return function(...e) {
    let n = this;
    return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((i) => {
      i in n && typeof n[i] == "function" && x(n, i, function(o) {
        let s = { mechanism: { data: { function: i, handler: G(o) }, handled: false, type: "instrument" } }, a = Se(o);
        return a && (s.mechanism.data.handler = G(a)), be(o, s);
      });
    }), t.apply(this, e);
  };
}
function qs(t) {
  let e = S, n = e[t] && e[t].prototype;
  !n || !n.hasOwnProperty || !n.hasOwnProperty("addEventListener") || (x(n, "addEventListener", function(r) {
    return function(i, o, s) {
      try {
        typeof o.handleEvent == "function" && (o.handleEvent = be(o.handleEvent, { mechanism: { data: { function: "handleEvent", handler: G(o), target: t }, handled: false, type: "instrument" } }));
      } catch (a) {
      }
      return r.apply(this, [i, be(o, { mechanism: { data: { function: "addEventListener", handler: G(o), target: t }, handled: false, type: "instrument" } }), s]);
    };
  }), x(n, "removeEventListener", function(r) {
    return function(i, o, s) {
      let a = o;
      try {
        let c = a && a.__sentry_wrapped__;
        c && r.call(this, i, c, s);
      } catch (c) {
      }
      return r.call(this, i, a, s);
    };
  }));
}
var Xt = 1024;
var J = class {
  static __initStatic() {
    this.id = "Breadcrumbs";
  }
  constructor(e) {
    this.name = J.id, this.options = u({ console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, e);
  }
  setupOnce() {
    if (this.options.console && O("console", Xs), this.options.dom && O("dom", Vs(this.options.dom)), this.options.xhr && O("xhr", Ks), this.options.fetch && O("fetch", Js), this.options.history && O("history", Qs), this.options.sentry) {
      let e = y().getClient();
      e && e.on && e.on("beforeSendEvent", zs);
    }
  }
};
J.__initStatic();
function zs(t) {
  y().addBreadcrumb({ category: `sentry.${t.type === "transaction" ? "transaction" : "event"}`, event_id: t.event_id, level: t.level, message: $(t) }, { event: t });
}
function Vs(t) {
  function e(n) {
    let r, i = typeof t == "object" ? t.serializeAttribute : void 0, o = typeof t == "object" && typeof t.maxStringLength == "number" ? t.maxStringLength : void 0;
    o && o > Xt && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`\`dom.maxStringLength\` cannot exceed ${Xt}, but a value of ${o} was configured. Sentry will use ${Xt} instead.`), o = Xt), typeof i == "string" && (i = [i]);
    try {
      let s = n.event;
      r = Zs(s) ? V(s.target, { keyAttrs: i, maxStringLength: o }) : V(s, { keyAttrs: i, maxStringLength: o });
    } catch (s) {
      r = "<unknown>";
    }
    r.length !== 0 && y().addBreadcrumb({ category: `ui.${n.name}`, message: r }, { event: n.event, name: n.name, global: n.global });
  }
  return e;
}
function Xs(t) {
  let e = { category: "console", data: { arguments: t.args, logger: "console" }, level: Rn(t.level), message: yt(t.args, " ") };
  if (t.level === "assert") if (t.args[0] === false) e.message = `Assertion failed: ${yt(t.args.slice(1), " ") || "console.assert"}`, e.data.arguments = t.args.slice(1);
  else return;
  y().addBreadcrumb(e, { input: t.args, level: t.level });
}
function Ks(t) {
  let { startTimestamp: e, endTimestamp: n } = t, r = t.xhr[re];
  if (!e || !n || !r) return;
  let { method: i, url: o, status_code: s, body: a } = r, c = { method: i, url: o, status_code: s }, d = { xhr: t.xhr, input: a, startTimestamp: e, endTimestamp: n };
  y().addBreadcrumb({ category: "xhr", data: c, type: "http" }, d);
}
function Js(t) {
  let { startTimestamp: e, endTimestamp: n } = t;
  if (n && !(t.fetchData.url.match(/sentry_key/) && t.fetchData.method === "POST")) if (t.error) {
    let r = t.fetchData, i = { data: t.error, input: t.args, startTimestamp: e, endTimestamp: n };
    y().addBreadcrumb({ category: "fetch", data: r, level: "error", type: "http" }, i);
  } else {
    let r = h(u({}, t.fetchData), { status_code: t.response && t.response.status }), i = { input: t.args, response: t.response, startTimestamp: e, endTimestamp: n };
    y().addBreadcrumb({ category: "fetch", data: r, type: "http" }, i);
  }
}
function Qs(t) {
  let e = t.from, n = t.to, r = nt(S.location.href), i = nt(e), o = nt(n);
  i.path || (i = r), r.protocol === o.protocol && r.host === o.host && (n = o.relative), r.protocol === i.protocol && r.host === i.host && (e = i.relative), y().addBreadcrumb({ category: "navigation", data: { from: e, to: n } });
}
function Zs(t) {
  return !!t && !!t.target;
}
var ea = "cause";
var ta = 5;
var Q = class {
  static __initStatic() {
    this.id = "LinkedErrors";
  }
  constructor(e = {}) {
    this.name = Q.id, this._key = e.key || ea, this._limit = e.limit || ta;
  }
  setupOnce() {
  }
  preprocessEvent(e, n, r) {
    let i = r.getOptions();
    un(zn, i.stackParser, i.maxValueLength, this._key, this._limit, e, n);
  }
};
Q.__initStatic();
var Z = class {
  static __initStatic() {
    this.id = "HttpContext";
  }
  constructor() {
    this.name = Z.id;
  }
  setupOnce() {
  }
  preprocessEvent(e) {
    if (!S.navigator && !S.location && !S.document) return;
    let n = e.request && e.request.url || S.location && S.location.href, { referrer: r } = S.document || {}, { userAgent: i } = S.navigator || {}, o = u(u(u({}, e.request && e.request.headers), r && { Referer: r }), i && { "User-Agent": i }), s = h(u(u({}, e.request), n && { url: n }), { headers: o });
    e.request = s;
  }
};
Z.__initStatic();
var ee = class {
  static __initStatic() {
    this.id = "Dedupe";
  }
  constructor() {
    this.name = ee.id;
  }
  setupOnce(e, n) {
  }
  processEvent(e) {
    if (e.type) return e;
    try {
      if (na(e, this._previousEvent)) return (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("Event dropped due to being a duplicate of previously captured event."), null;
    } catch (n) {
    }
    return this._previousEvent = e;
  }
};
ee.__initStatic();
function na(t, e) {
  return e ? !!(ra(t, e) || ia(t, e)) : false;
}
function ra(t, e) {
  let n = t.message, r = e.message;
  return !(!n && !r || n && !r || !n && r || n !== r || !Di(t, e) || !Ni(t, e));
}
function ia(t, e) {
  let n = vi(e), r = vi(t);
  return !(!n || !r || n.type !== r.type || n.value !== r.value || !Di(t, e) || !Ni(t, e));
}
function Ni(t, e) {
  let n = xi(t), r = xi(e);
  if (!n && !r) return true;
  if (n && !r || !n && r || (n = n, r = r, r.length !== n.length)) return false;
  for (let i = 0; i < r.length; i++) {
    let o = r[i], s = n[i];
    if (o.filename !== s.filename || o.lineno !== s.lineno || o.colno !== s.colno || o.function !== s.function) return false;
  }
  return true;
}
function Di(t, e) {
  let n = t.fingerprint, r = e.fingerprint;
  if (!n && !r) return true;
  if (n && !r || !n && r) return false;
  n = n, r = r;
  try {
    return n.join("") === r.join("");
  } catch (i) {
    return false;
  }
}
function vi(t) {
  return t.exception && t.exception.values && t.exception.values[0];
}
function xi(t) {
  let e = t.exception;
  if (e) try {
    return e.values[0].stacktrace.frames;
  } catch (n) {
    return;
  }
}
var Zn = {};
cr(Zn, { Breadcrumbs: () => J, Dedupe: () => ee, GlobalHandlers: () => Y, HttpContext: () => Z, LinkedErrors: () => Q, TryCatch: () => Re });
var g = b;
function Ii() {
  g && g.document ? g.document.addEventListener("visibilitychange", () => {
    let t = q();
    if (g.document.hidden && t) {
      let e = "cancelled";
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${t.op}`), t.status || t.setStatus(e), t.setTag("visibilitychange", "document.hidden"), t.finish();
    }
  }) : (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("[Tracing] Could not set up background tab detection due to lack of global document");
}
var He = (t, e, n) => {
  let r, i;
  return (o) => {
    e.value >= 0 && (o || n) && (i = e.value - (r || 0), (i || r === void 0) && (r = e.value, e.delta = i, t(e)));
  };
};
var Oi = () => `v3-${Date.now()}-${Math.floor(Math.random() * 8999999999999) + 1e12}`;
var oa = () => {
  let t = g.performance.timing, e = g.performance.navigation.type, n = { entryType: "navigation", startTime: 0, type: e == 2 ? "back_forward" : e === 1 ? "reload" : "navigate" };
  for (let r in t) r !== "navigationStart" && r !== "toJSON" && (n[r] = Math.max(t[r] - t.navigationStart, 0));
  return n;
};
var Kt = () => g.__WEB_VITALS_POLYFILL__ ? g.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || oa()) : g.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
var Jt = () => {
  let t = Kt();
  return t && t.activationStart || 0;
};
var $e = (t, e) => {
  let n = Kt(), r = "navigate";
  return n && (g.document.prerendering || Jt() > 0 ? r = "prerender" : r = n.type.replace(/_/g, "-")), { name: t, value: typeof e == "undefined" ? -1 : e, rating: "good", delta: 0, entries: [], id: Oi(), navigationType: r };
};
var ce = (t, e, n) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(t)) {
      let r = new PerformanceObserver((i) => {
        e(i.getEntries());
      });
      return r.observe(Object.assign({ type: t, buffered: true }, n || {})), r;
    }
  } catch (r) {
  }
};
var _e = (t, e) => {
  let n = (r) => {
    (r.type === "pagehide" || g.document.visibilityState === "hidden") && (t(r), e && (removeEventListener("visibilitychange", n, true), removeEventListener("pagehide", n, true)));
  };
  addEventListener("visibilitychange", n, true), addEventListener("pagehide", n, true);
};
var ki = (t) => {
  let e = $e("CLS", 0), n, r = 0, i = [], o = (a) => {
    a.forEach((c) => {
      if (!c.hadRecentInput) {
        let d = i[0], l = i[i.length - 1];
        r && i.length !== 0 && c.startTime - l.startTime < 1e3 && c.startTime - d.startTime < 5e3 ? (r += c.value, i.push(c)) : (r = c.value, i = [c]), r > e.value && (e.value = r, e.entries = i, n && n());
      }
    });
  }, s = ce("layout-shift", o);
  if (s) {
    n = He(t, e);
    let a = () => {
      o(s.takeRecords()), n(true);
    };
    return _e(a), a;
  }
};
var Qt = -1;
var sa = () => g.document.visibilityState === "hidden" && !g.document.prerendering ? 0 : 1 / 0;
var aa = () => {
  _e(({ timeStamp: t }) => {
    Qt = t;
  }, true);
};
var je = () => (Qt < 0 && (Qt = sa(), aa()), { get firstHiddenTime() {
  return Qt;
} });
var wi = (t) => {
  let e = je(), n = $e("FID"), r, i = (a) => {
    a.startTime < e.firstHiddenTime && (n.value = a.processingStart - a.startTime, n.entries.push(a), r(true));
  }, o = (a) => {
    a.forEach(i);
  }, s = ce("first-input", o);
  r = He(t, n), s && _e(() => {
    o(s.takeRecords()), s.disconnect();
  }, true);
};
var Bi = {};
var Ai = (t) => {
  let e = je(), n = $e("LCP"), r, i = (s) => {
    let a = s[s.length - 1];
    if (a) {
      let c = Math.max(a.startTime - Jt(), 0);
      c < e.firstHiddenTime && (n.value = c, n.entries = [a], r());
    }
  }, o = ce("largest-contentful-paint", i);
  if (o) {
    r = He(t, n);
    let s = () => {
      Bi[n.id] || (i(o.takeRecords()), o.disconnect(), Bi[n.id] = true, r(true));
    };
    return ["keydown", "click"].forEach((a) => {
      addEventListener(a, s, { once: true, capture: true });
    }), _e(s, true), s;
  }
};
function Zt(t) {
  return typeof t == "number" && isFinite(t);
}
function ve(t, r) {
  var i = r, { startTimestamp: e } = i, n = ar(i, ["startTimestamp"]);
  return e && t.startTimestamp > e && (t.startTimestamp = e), t.startChild(u({ startTimestamp: e }, n));
}
function D(t) {
  return t / 1e3;
}
function Ci() {
  return g && g.addEventListener && g.performance;
}
var Ui = 0;
var R = {};
var te;
var lt;
function Gi() {
  let t = Ci();
  if (t && A) {
    t.mark && g.performance.mark("sentry-tracing-init"), da();
    let e = ca(), n = ua();
    return () => {
      e && e(), n && n();
    };
  }
  return () => {
  };
}
function Pi() {
  ce("longtask", (e) => {
    for (let n of e) {
      let r = q();
      if (!r) return;
      let i = D(A + n.startTime), o = D(n.duration);
      r.startChild({ description: "Main UI thread blocked", op: "ui.long-task", origin: "auto.ui.browser.metrics", startTimestamp: i, endTimestamp: i + o });
    }
  });
}
function Yi() {
  ce("event", (e) => {
    for (let n of e) {
      let r = q();
      if (!r) return;
      if (n.name === "click") {
        let i = D(A + n.startTime), o = D(n.duration);
        r.startChild({ description: V(n.target), op: `ui.interaction.${n.name}`, origin: "auto.ui.browser.metrics", startTimestamp: i, endTimestamp: i + o });
      }
    }
  }, { durationThreshold: 0 });
}
function ca() {
  return ki((t) => {
    let e = t.entries.pop();
    e && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding CLS"), R.cls = { value: t.value, unit: "" }, lt = e);
  });
}
function ua() {
  return Ai((t) => {
    let e = t.entries.pop();
    e && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding LCP"), R.lcp = { value: t.value, unit: "millisecond" }, te = e);
  });
}
function da() {
  wi((t) => {
    let e = t.entries.pop();
    if (!e) return;
    let n = D(A), r = D(e.startTime);
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding FID"), R.fid = { value: t.value, unit: "millisecond" }, R["mark.fid"] = { value: n + r, unit: "second" };
  });
}
function Mi(t) {
  let e = Ci();
  if (!e || !g.performance.getEntries || !A) return;
  (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Tracing] Adding & adjusting spans using Performance API");
  let n = D(A), r = e.getEntries(), i, o;
  if (r.slice(Ui).forEach((s) => {
    let a = D(s.startTime), c = D(s.duration);
    if (!(t.op === "navigation" && n + a < t.startTimestamp)) switch (s.entryType) {
      case "navigation": {
        pa(t, s, n), i = n + D(s.responseStart), o = n + D(s.requestStart);
        break;
      }
      case "mark":
      case "paint":
      case "measure": {
        fa(t, s, a, c, n);
        let d = je(), l = s.startTime < d.firstHiddenTime;
        s.name === "first-paint" && l && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding FP"), R.fp = { value: s.startTime, unit: "millisecond" }), s.name === "first-contentful-paint" && l && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding FCP"), R.fcp = { value: s.startTime, unit: "millisecond" });
        break;
      }
      case "resource": {
        let d = s.name.replace(g.location.origin, "");
        _a(t, s, d, a, c, n);
        break;
      }
    }
  }), Ui = Math.max(r.length - 1, 0), ma(t), t.op === "pageload") {
    typeof i == "number" && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding TTFB"), R.ttfb = { value: (i - t.startTimestamp) * 1e3, unit: "millisecond" }, typeof o == "number" && o <= i && (R["ttfb.requestTime"] = { value: (i - o) * 1e3, unit: "millisecond" })), ["fcp", "fp", "lcp"].forEach((a) => {
      if (!R[a] || n >= t.startTimestamp) return;
      let c = R[a].value, d = n + D(c), l = Math.abs((d - t.startTimestamp) * 1e3), p = l - c;
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Measurements] Normalized ${a} from ${c} to ${l} (${p})`), R[a].value = l;
    });
    let s = R["mark.fid"];
    s && R.fid && (ve(t, { description: "first input delay", endTimestamp: s.value + D(R.fid.value), op: "ui.action", origin: "auto.ui.browser.metrics", startTimestamp: s.value }), delete R["mark.fid"]), "fcp" in R || delete R.cls, Object.keys(R).forEach((a) => {
      t.setMeasurement(a, R[a].value, R[a].unit);
    }), ha(t);
  }
  te = void 0, lt = void 0, R = {};
}
function fa(t, e, n, r, i) {
  let o = i + n, s = o + r;
  return ve(t, { description: e.name, endTimestamp: s, op: e.entryType, origin: "auto.resource.browser.metrics", startTimestamp: o }), o;
}
function pa(t, e, n) {
  ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((r) => {
    en(t, e, r, n);
  }), en(t, e, "secureConnection", n, "TLS/SSL", "connectEnd"), en(t, e, "fetch", n, "cache", "domainLookupStart"), en(t, e, "domainLookup", n, "DNS"), la(t, e, n);
}
function en(t, e, n, r, i, o) {
  let s = o ? e[o] : e[`${n}End`], a = e[`${n}Start`];
  !a || !s || ve(t, { op: "browser", origin: "auto.browser.browser.metrics", description: i || n, startTimestamp: r + D(a), endTimestamp: r + D(s) });
}
function la(t, e, n) {
  ve(t, { op: "browser", origin: "auto.browser.browser.metrics", description: "request", startTimestamp: n + D(e.requestStart), endTimestamp: n + D(e.responseEnd) }), ve(t, { op: "browser", origin: "auto.browser.browser.metrics", description: "response", startTimestamp: n + D(e.responseStart), endTimestamp: n + D(e.responseEnd) });
}
function _a(t, e, n, r, i, o) {
  if (e.initiatorType === "xmlhttprequest" || e.initiatorType === "fetch") return;
  let s = {};
  "transferSize" in e && (s["http.response_transfer_size"] = e.transferSize), "encodedBodySize" in e && (s["http.response_content_length"] = e.encodedBodySize), "decodedBodySize" in e && (s["http.decoded_response_content_length"] = e.decodedBodySize), "renderBlockingStatus" in e && (s["resource.render_blocking_status"] = e.renderBlockingStatus);
  let a = o + r, c = a + i;
  ve(t, { description: n, endTimestamp: c, op: e.initiatorType ? `resource.${e.initiatorType}` : "resource.other", origin: "auto.resource.browser.metrics", startTimestamp: a, data: s });
}
function ma(t) {
  let e = g.navigator;
  if (!e) return;
  let n = e.connection;
  n && (n.effectiveType && t.setTag("effectiveConnectionType", n.effectiveType), n.type && t.setTag("connectionType", n.type), Zt(n.rtt) && (R["connection.rtt"] = { value: n.rtt, unit: "millisecond" })), Zt(e.deviceMemory) && t.setTag("deviceMemory", `${e.deviceMemory} GB`), Zt(e.hardwareConcurrency) && t.setTag("hardwareConcurrency", String(e.hardwareConcurrency));
}
function ha(t) {
  te && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding LCP Data"), te.element && t.setTag("lcp.element", V(te.element)), te.id && t.setTag("lcp.id", te.id), te.url && t.setTag("lcp.url", te.url.trim().slice(0, 200)), t.setTag("lcp.size", te.size)), lt && lt.sources && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log("[Measurements] Adding CLS Data"), lt.sources.forEach((e, n) => t.setTag(`cls.source.${n + 1}`, V(e.node))));
}
var er = ["localhost", /^\/(?!\/)/];
var _t = { traceFetch: true, traceXHR: true, enableHTTPTimings: true, tracingOrigins: er, tracePropagationTargets: er };
function tr(t) {
  let { traceFetch: e, traceXHR: n, tracePropagationTargets: r, tracingOrigins: i, shouldCreateSpanForRequest: o, enableHTTPTimings: s } = u({ traceFetch: _t.traceFetch, traceXHR: _t.traceXHR }, t), a = typeof o == "function" ? o : (l) => true, c = (l) => ya(l, r || i), d = {};
  e && O("fetch", (l) => {
    let p = Ta(l, a, c, d);
    s && p && Li(p);
  }), n && O("xhr", (l) => {
    let p = Ra(l, a, c, d);
    s && p && Li(p);
  });
}
function ga(t) {
  return t.entryType === "resource" && "initiatorType" in t && typeof t.nextHopProtocol == "string" && (t.initiatorType === "fetch" || t.initiatorType === "xmlhttprequest");
}
function Li(t) {
  let e = t.data.url, n = new PerformanceObserver((r) => {
    r.getEntries().forEach((o) => {
      ga(o) && o.name.endsWith(e) && (Sa(o).forEach((a) => t.setData(...a)), n.disconnect());
    });
  });
  n.observe({ entryTypes: ["resource"] });
}
function Ea(t) {
  let e = "unknown", n = "unknown", r = "";
  for (let i of t) {
    if (i === "/") {
      [e, n] = t.split("/");
      break;
    }
    if (!isNaN(Number(i))) {
      e = r === "h" ? "http" : r, n = t.split(r)[1];
      break;
    }
    r += i;
  }
  return r === t && (e = r), { name: e, version: n };
}
function ne(t = 0) {
  return ((A || performance.timeOrigin) + t) / 1e3;
}
function Sa(t) {
  let { name: e, version: n } = Ea(t.nextHopProtocol), r = [];
  return r.push(["network.protocol.version", n], ["network.protocol.name", e]), A ? [...r, ["http.request.redirect_start", ne(t.redirectStart)], ["http.request.fetch_start", ne(t.fetchStart)], ["http.request.domain_lookup_start", ne(t.domainLookupStart)], ["http.request.domain_lookup_end", ne(t.domainLookupEnd)], ["http.request.connect_start", ne(t.connectStart)], ["http.request.secure_connection_start", ne(t.secureConnectionStart)], ["http.request.connection_end", ne(t.connectEnd)], ["http.request.request_start", ne(t.requestStart)], ["http.request.response_start", ne(t.responseStart)], ["http.request.response_end", ne(t.responseEnd)]] : r;
}
function ya(t, e) {
  return ue(t, e || er);
}
function Ta(t, e, n, r) {
  if (!Ce() || !t.fetchData) return;
  let i = e(t.fetchData.url);
  if (t.endTimestamp && i) {
    let _ = t.fetchData.__span;
    if (!_) return;
    let m = r[_];
    if (m) {
      if (t.response) {
        m.setHttpStatus(t.response.status);
        let E = t.response && t.response.headers && t.response.headers.get("content-length"), T = parseInt(E);
        T > 0 && m.setData("http.response_content_length", T);
      } else t.error && m.setStatus("internal_error");
      m.finish(), delete r[_];
    }
    return;
  }
  let o = y(), s = o.getScope(), a = o.getClient(), c = s.getSpan(), { method: d, url: l } = t.fetchData, p = i && c ? c.startChild({ data: { url: l, type: "fetch", "http.method": d }, description: `${d} ${l}`, op: "http.client", origin: "auto.http.browser" }) : void 0;
  if (p && (t.fetchData.__span = p.spanId, r[p.spanId] = p), n(t.fetchData.url) && a) {
    let _ = t.args[0];
    t.args[1] = t.args[1] || {};
    let m = t.args[1];
    m.headers = ba(_, a, s, m, p);
  }
  return p;
}
function ba(t, e, n, r, i) {
  let o = i || n.getSpan(), s = o && o.transaction, { traceId: a, sampled: c, dsc: d } = n.getPropagationContext(), l = o ? o.toTraceparent() : Be(a, void 0, c), p = s ? s.getDynamicSamplingContext() : d || fe(a, e, n), _ = ot(p), m = typeof Request != "undefined" && U(t, Request) ? t.headers : r.headers;
  if (m) if (typeof Headers != "undefined" && U(m, Headers)) {
    let E = new Headers(m);
    return E.append("sentry-trace", l), _ && E.append(it, _), E;
  } else if (Array.isArray(m)) {
    let E = [...m, ["sentry-trace", l]];
    return _ && E.push([it, _]), E;
  } else {
    let E = "baggage" in m ? m.baggage : void 0, T = [];
    return Array.isArray(E) ? T.push(...E) : E && T.push(E), _ && T.push(_), h(u({}, m), { "sentry-trace": l, baggage: T.length > 0 ? T.join(",") : void 0 });
  }
  else return { "sentry-trace": l, baggage: _ };
}
function Ra(t, e, n, r) {
  let i = t.xhr, o = i && i[re];
  if (!Ce() || i && i.__sentry_own_request__ || !i || !o) return;
  let s = e(o.url);
  if (t.endTimestamp && s) {
    let p = i.__sentry_xhr_span_id__;
    if (!p) return;
    let _ = r[p];
    _ && (_.setHttpStatus(o.status_code), _.finish(), delete r[p]);
    return;
  }
  let a = y(), c = a.getScope(), d = c.getSpan(), l = s && d ? d.startChild({ data: h(u({}, o.data), { type: "xhr", "http.method": o.method, url: o.url }), description: `${o.method} ${o.url}`, op: "http.client", origin: "auto.http.browser" }) : void 0;
  if (l && (i.__sentry_xhr_span_id__ = l.spanId, r[i.__sentry_xhr_span_id__] = l), i.setRequestHeader && n(o.url)) if (l) {
    let p = l && l.transaction, _ = p && p.getDynamicSamplingContext(), m = ot(_);
    Fi(i, l.toTraceparent(), m);
  } else {
    let p = a.getClient(), { traceId: _, sampled: m, dsc: E } = c.getPropagationContext(), T = Be(_, void 0, m), me = E || (p ? fe(_, p, c) : void 0), M = ot(me);
    Fi(i, T, M);
  }
  return l;
}
function Fi(t, e, n) {
  try {
    t.setRequestHeader("sentry-trace", e), n && t.setRequestHeader(it, n);
  } catch (r) {
  }
}
function Hi(t, e = true, n = true) {
  if (!g || !g.location) {
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn("Could not initialize routing instrumentation due to invalid location");
    return;
  }
  let r = g.location.href, i;
  e && (i = t({ name: g.location.pathname, startTimestamp: A ? A / 1e3 : void 0, op: "pageload", origin: "auto.pageload.browser", metadata: { source: "url" } })), n && O("history", ({ to: o, from: s }) => {
    if (s === void 0 && r && r.indexOf(o) !== -1) {
      r = void 0;
      return;
    }
    s !== o && (r = void 0, i && ((typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Finishing current transaction with op: ${i.op}`), i.finish()), i = t({ name: g.location.pathname, op: "navigation", origin: "auto.navigation.browser", metadata: { source: "url" } }));
  });
}
var ji = "BrowserTracing";
var va = u(h(u({}, Le), { markBackgroundTransactions: true, routingInstrumentation: Hi, startTransactionOnLocationChange: true, startTransactionOnPageLoad: true, enableLongTask: true, _experiments: {} }), _t);
var We = class {
  constructor(e) {
    this.name = ji, this._hasSetTracePropagationTargets = false, Ht(), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && (this._hasSetTracePropagationTargets = !!(e && (e.tracePropagationTargets || e.tracingOrigins))), this.options = u(u({}, va), e), this.options._experiments.enableLongTask !== void 0 && (this.options.enableLongTask = this.options._experiments.enableLongTask), e && !e.tracePropagationTargets && e.tracingOrigins && (this.options.tracePropagationTargets = e.tracingOrigins), this._collectWebVitals = Gi(), this.options.enableLongTask && Pi(), this.options._experiments.enableInteractions && Yi();
  }
  setupOnce(e, n) {
    this._getCurrentHub = n;
    let i = n().getClient(), o = i && i.getOptions(), { routingInstrumentation: s, startTransactionOnLocationChange: a, startTransactionOnPageLoad: c, markBackgroundTransactions: d, traceFetch: l, traceXHR: p, shouldCreateSpanForRequest: _, enableHTTPTimings: m, _experiments: E } = this.options, T = o && o.tracePropagationTargets, me = T || this.options.tracePropagationTargets;
    (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && this._hasSetTracePropagationTargets && T && f.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used."), s((M) => {
      let qe = this._createRouteTransaction(M);
      return this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(qe, M, n), qe;
    }, c, a), d && Ii(), E.enableInteractions && this._registerInteractionListener(), tr({ traceFetch: l, traceXHR: p, tracePropagationTargets: me, shouldCreateSpanForRequest: _, enableHTTPTimings: m });
  }
  _createRouteTransaction(e) {
    if (!this._getCurrentHub) {
      (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`[Tracing] Did not create ${e.op} transaction because _getCurrentHub is invalid.`);
      return;
    }
    let n = this._getCurrentHub(), { beforeNavigate: r, idleTimeout: i, finalTimeout: o, heartbeatInterval: s } = this.options, a = e.op === "pageload", c = a ? $i("sentry-trace") : "", d = a ? $i("baggage") : "", { traceparentData: l, dynamicSamplingContext: p, propagationContext: _ } = On(c, d), m = h(u(u({}, e), l), { metadata: h(u({}, e.metadata), { dynamicSamplingContext: l && !p ? {} : p }), trimEnd: true }), E = typeof r == "function" ? r(m) : m, T = E === void 0 ? h(u({}, m), { sampled: false }) : E;
    T.metadata = T.name !== m.name ? h(u({}, T.metadata), { source: "custom" }) : T.metadata, this._latestRouteName = T.name, this._latestRouteSource = T.metadata && T.metadata.source, T.sampled === false && (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Will not send ${T.op} transaction because of beforeNavigate.`), (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.log(`[Tracing] Starting ${T.op} transaction on scope`);
    let { location: me } = g, M = Ft(n, T, i, o, true, { location: me }, s), qe = n.getScope();
    return a && l ? qe.setPropagationContext(_) : qe.setPropagationContext({ traceId: M.traceId, spanId: M.spanId, parentSpanId: M.parentSpanId, sampled: M.sampled }), M.registerBeforeFinishCallback((Xi) => {
      this._collectWebVitals(), Mi(Xi);
    }), M;
  }
  _registerInteractionListener() {
    let e, n = () => {
      let { idleTimeout: r, finalTimeout: i, heartbeatInterval: o } = this.options, s = "ui.action.click", a = q();
      if (a && a.op && ["navigation", "pageload"].includes(a.op)) {
        (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`[Tracing] Did not create ${s} transaction because a pageload or navigation transaction is in progress.`);
        return;
      }
      if (e && (e.setFinishReason("interactionInterrupted"), e.finish(), e = void 0), !this._getCurrentHub) {
        (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`[Tracing] Did not create ${s} transaction because _getCurrentHub is invalid.`);
        return;
      }
      if (!this._latestRouteName) {
        (typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__) && f.warn(`[Tracing] Did not create ${s} transaction because _latestRouteName is missing.`);
        return;
      }
      let c = this._getCurrentHub(), { location: d } = g, l = { name: this._latestRouteName, op: s, trimEnd: true, metadata: { source: this._latestRouteSource || "url" } };
      e = Ft(c, l, r, i, true, { location: d }, o);
    };
    ["click"].forEach((r) => {
      addEventListener(r, n, { once: false, capture: true });
    });
  }
};
function $i(t) {
  let e = fn(`meta[name=${t}]`);
  return e ? e.getAttribute("content") : void 0;
}
var Wi = {};
S.Sentry && S.Sentry.Integrations && (Wi = S.Sentry.Integrations);
var R_ = u(u(u({}, Wi), qt), Zn);
var Na = "https://d233059272824702afc8c43834c4912d@sentry.hcaptcha.com/6";
var mt = null;
function nr(t, e) {
  if (t === false) return tn(t);
  if (mt) return tn(mt, e);
  let n = new ft({ dsn: Na, transport: window.fetch ? Xn : Kn, stackParser: Qn, integrations: [new J(), new Y(), new Q(), new ee(), new Z(), new We()] });
  return mt = new de(n), tn(mt, e);
}
function tn(t, e = { key: "source", value: "@hCaptcha/loader" }) {
  return { addBreadcrumb: (n) => {
    t && t.addBreadcrumb(n);
  }, captureMessage: (n) => {
    t && t.withScope(function(r) {
      r.setTag(e.key, e.value), t.captureMessage(n);
    });
  }, captureException: (n) => {
    t && t.withScope(function(r) {
      r.setTag(e.key, e.value), t.captureEvent({ message: Ve, level: "error", extra: n });
    });
  } };
}
function qi({ scriptLocation: t, query: e, loadAsync: n = true, crossOrigin: r, apihost: i = "https://js.hcaptcha.com", cleanup: o = true, secureApi: s = false, scriptSource: a = "" } = {}) {
  let c = Et(t), d = gt(c);
  return new Promise((l, p) => {
    let _ = d.document.createElement("script");
    _.id = dr, a ? _.src = `${a}?onload=${xe}` : s ? _.src = `${i}/1/secure-api.js?onload=${xe}` : _.src = `${i}/1/api.js?onload=${xe}`, _.crossOrigin = r, _.async = n;
    let m = (E, T) => {
      try {
        !s && o && c.removeChild(_), T(E);
      } catch (me) {
        p(me);
      }
    };
    _.onload = (E) => m(E, l), _.onerror = (E) => m(E, p), _.src += e !== "" ? `&${e}` : "", c.appendChild(_);
  });
}
var nn = [];
function Ia(t = { cleanup: true }, e) {
  try {
    e.addBreadcrumb({ category: he, message: "hCaptcha loader params", data: t });
    let n = Et(t.scriptLocation), r = gt(n), i = nn.find(({ scope: s }) => s === r.window);
    if (i) return e.addBreadcrumb({ category: he, message: "hCaptcha already loaded" }), i.promise;
    let o = new Promise((s, a) => ze(this, null, function* () {
      try {
        r.window[xe] = () => {
          e.addBreadcrumb({ category: he, message: "hCaptcha script called onload function" }), s(r.window.hcaptcha);
        };
        let c = ur({ custom: t.custom, render: t.render, sentry: t.sentry, assethost: t.assethost, imghost: t.imghost, reportapi: t.reportapi, endpoint: t.endpoint, host: t.host, recaptchacompat: t.recaptchacompat, hl: t.hl });
        yield qi(u({ query: c }, t)), e.addBreadcrumb({ category: he, message: "hCaptcha loaded", data: i });
      } catch (c) {
        e.addBreadcrumb({ category: he, message: "hCaptcha failed to load", data: c });
        let d = nn.findIndex((l) => l.scope === r.window);
        d !== -1 && nn.splice(d, 1), e.captureException(c), a(new Error(Ve));
      }
    }));
    return nn.push({ promise: o, scope: r.window }), o;
  } catch (n) {
    return e.captureException(n), Promise.reject(new Error(Ve));
  }
}
function Vi(t, e = 0) {
  return ze(this, null, function* () {
    let n = e < 2 ? "Retry loading hCaptcha Api" : "Exceeded maximum retries", r = nr(t.sentry);
    try {
      return yield Ia(t, r);
    } catch (i) {
      return r.addBreadcrumb({ SENTRY_SOURCE: he, message: n, data: { error: i } }), e >= 2 ? (r.captureException(i), Promise.reject(i)) : (e += 1, Vi(t, e));
    }
  });
}
function Oa() {
  return ze(this, arguments, function* (t = {}) {
    return yield Vi(t);
  });
}

// node_modules/@hcaptcha/react-hcaptcha/dist/esm/utils.js
function getFrame(element) {
  var doc = element && element.ownerDocument || document;
  var win = doc.defaultView || doc.parentWindow || window;
  return {
    document: doc,
    window: win
  };
}
function getMountElement(element) {
  return element || document.head;
}

// node_modules/@hcaptcha/react-hcaptcha/dist/esm/constants.js
var scopeTag = {
  key: "source",
  value: "@hCaptcha/react"
};
var breadcrumbMessages = {
  mounted: "hCaptcha component mounted",
  expired: "hCaptcha expired",
  unmounted: "hCaptcha component unmounted",
  reset: "hCaptcha reset",
  removed: "hCaptcha removed"
};

// node_modules/@hcaptcha/react-hcaptcha/dist/esm/index.js
var HCaptcha = function(_React$Component) {
  _inheritsLoose(HCaptcha2, _React$Component);
  function HCaptcha2(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this._hcaptcha = void 0;
    _this.renderCaptcha = _this.renderCaptcha.bind(_assertThisInitialized(_this));
    _this.resetCaptcha = _this.resetCaptcha.bind(_assertThisInitialized(_this));
    _this.removeCaptcha = _this.removeCaptcha.bind(_assertThisInitialized(_this));
    _this.isReady = _this.isReady.bind(_assertThisInitialized(_this));
    _this._onReady = null;
    _this.loadCaptcha = _this.loadCaptcha.bind(_assertThisInitialized(_this));
    _this.handleOnLoad = _this.handleOnLoad.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleExpire = _this.handleExpire.bind(_assertThisInitialized(_this));
    _this.handleError = _this.handleError.bind(_assertThisInitialized(_this));
    _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_this));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this.handleChallengeExpired = _this.handleChallengeExpired.bind(_assertThisInitialized(_this));
    _this.ref = React.createRef();
    _this.apiScriptRequested = false;
    _this.sentryHub = null;
    _this.state = {
      isApiReady: false,
      isRemoved: false,
      elementId: props.id,
      captchaId: ""
    };
    return _this;
  }
  var _proto = HCaptcha2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    var element = getMountElement(this.props.scriptLocation);
    var frame = getFrame(element);
    this._hcaptcha = frame.window.hcaptcha || void 0;
    var isApiReady = typeof this._hcaptcha !== "undefined";
    this.sentryHub = nr(this.props.sentry, scopeTag);
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.mounted
    });
    if (isApiReady) {
      this.setState({
        isApiReady: true
      }, function() {
        _this2.renderCaptcha();
      });
      return;
    }
    this.loadCaptcha();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    hcaptcha.reset(captchaId);
    hcaptcha.remove(captchaId);
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.unmounted
    });
  };
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isApiReady !== nextState.isApiReady || this.state.isRemoved !== nextState.isRemoved) {
      return false;
    }
    return true;
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this3 = this;
    var keys = ["sitekey", "size", "theme", "tabindex", "languageOverride", "endpoint"];
    var match = keys.every(function(key) {
      return prevProps[key] === _this3.props[key];
    });
    if (!match) {
      this.removeCaptcha(function() {
        _this3.renderCaptcha();
      });
    }
  };
  _proto.loadCaptcha = function loadCaptcha() {
    if (this.apiScriptRequested) {
      return;
    }
    var _this$props = this.props, apihost = _this$props.apihost, assethost = _this$props.assethost, endpoint = _this$props.endpoint, host = _this$props.host, imghost = _this$props.imghost, hl = _this$props.languageOverride, reCaptchaCompat = _this$props.reCaptchaCompat, reportapi = _this$props.reportapi, sentry = _this$props.sentry, custom = _this$props.custom, loadAsync = _this$props.loadAsync, scriptLocation = _this$props.scriptLocation, scriptSource = _this$props.scriptSource, secureApi = _this$props.secureApi, _this$props$cleanup = _this$props.cleanup, cleanup = _this$props$cleanup === void 0 ? true : _this$props$cleanup;
    var mountParams = {
      render: "explicit",
      apihost,
      assethost,
      endpoint,
      hl,
      host,
      imghost,
      recaptchacompat: reCaptchaCompat === false ? "off" : null,
      reportapi,
      sentry,
      custom,
      loadAsync,
      scriptLocation,
      scriptSource,
      secureApi,
      cleanup
    };
    Oa(mountParams).then(this.handleOnLoad, this.handleError)["catch"](this.handleError);
    this.apiScriptRequested = true;
  };
  _proto.renderCaptcha = function renderCaptcha(onReady) {
    var _this4 = this;
    var isApiReady = this.state.isApiReady;
    if (!isApiReady) return;
    var renderParams = Object.assign({
      "open-callback": this.handleOpen,
      "close-callback": this.handleClose,
      "error-callback": this.handleError,
      "chalexpired-callback": this.handleChallengeExpired,
      "expired-callback": this.handleExpire,
      "callback": this.handleSubmit
    }, this.props, {
      hl: this.props.hl || this.props.languageOverride,
      languageOverride: void 0
    });
    var hcaptcha = this._hcaptcha;
    var captchaId = hcaptcha.render(this.ref.current, renderParams);
    this.setState({
      isRemoved: false,
      captchaId
    }, function() {
      onReady && onReady();
      _this4._onReady && _this4._onReady(captchaId);
    });
  };
  _proto.resetCaptcha = function resetCaptcha() {
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    hcaptcha.reset(captchaId);
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.reset
    });
  };
  _proto.removeCaptcha = function removeCaptcha(callback) {
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    this.setState({
      isRemoved: true
    }, function() {
      hcaptcha.remove(captchaId);
      callback && callback();
    });
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.removed
    });
  };
  _proto.handleOnLoad = function handleOnLoad() {
    var _this5 = this;
    this.setState({
      isApiReady: true
    }, function() {
      try {
        var element = getMountElement(_this5.props.scriptLocation);
        var frame = getFrame(element);
        _this5._hcaptcha = frame.window.hcaptcha;
        _this5.renderCaptcha(function() {
          var onLoad = _this5.props.onLoad;
          if (onLoad) onLoad();
        });
      } catch (error) {
        _this5.sentryHub.captureException(error);
      }
    });
  };
  _proto.handleSubmit = function handleSubmit(event) {
    var onVerify = this.props.onVerify;
    var _this$state = this.state, isRemoved = _this$state.isRemoved, captchaId = _this$state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (typeof hcaptcha === "undefined" || isRemoved) return;
    var token = hcaptcha.getResponse(captchaId);
    var ekey = hcaptcha.getRespKey(captchaId);
    if (onVerify) onVerify(token, ekey);
  };
  _proto.handleExpire = function handleExpire() {
    var onExpire = this.props.onExpire;
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    hcaptcha.reset(captchaId);
    if (onExpire) onExpire();
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.expired
    });
  };
  _proto.handleError = function handleError(event) {
    var onError = this.props.onError;
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (this.isReady()) {
      hcaptcha.reset(captchaId);
    }
    if (onError) onError(event);
  };
  _proto.isReady = function isReady() {
    var _this$state2 = this.state, isApiReady = _this$state2.isApiReady, isRemoved = _this$state2.isRemoved;
    return isApiReady && !isRemoved;
  };
  _proto.handleOpen = function handleOpen() {
    if (!this.isReady() || !this.props.onOpen) {
      return;
    }
    this.props.onOpen();
  };
  _proto.handleClose = function handleClose() {
    if (!this.isReady() || !this.props.onClose) {
      return;
    }
    this.props.onClose();
  };
  _proto.handleChallengeExpired = function handleChallengeExpired() {
    if (!this.isReady() || !this.props.onChalExpired) {
      return;
    }
    this.props.onChalExpired();
  };
  _proto.execute = function execute(opts) {
    var _this6 = this;
    if (opts === void 0) {
      opts = null;
    }
    opts = typeof opts === "object" ? opts : null;
    try {
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (!this.isReady()) {
        var _opts;
        var onReady = new Promise(function(resolve, reject) {
          _this6._onReady = function(id) {
            try {
              var _hcaptcha = _this6._hcaptcha;
              if (opts && opts.async) {
                _hcaptcha.execute(id, opts).then(resolve)["catch"](reject);
              } else {
                resolve(_hcaptcha.execute(id, opts));
              }
            } catch (e) {
              reject(e);
            }
          };
        });
        return (_opts = opts) != null && _opts.async ? onReady : null;
      }
      return hcaptcha.execute(captchaId, opts);
    } catch (error) {
      this.sentryHub.captureException(error);
      if (opts && opts.async) {
        return Promise.reject(error);
      }
      return null;
    }
  };
  _proto.setData = function setData(data) {
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    if (data && typeof data !== "object") {
      data = null;
    }
    hcaptcha.setData(captchaId, data);
  };
  _proto.getResponse = function getResponse() {
    var hcaptcha = this._hcaptcha;
    return hcaptcha.getResponse(this.state.captchaId);
  };
  _proto.getRespKey = function getRespKey() {
    var hcaptcha = this._hcaptcha;
    return hcaptcha.getRespKey(this.state.captchaId);
  };
  _proto.render = function render() {
    var elementId = this.state.elementId;
    return React.createElement("div", {
      ref: this.ref,
      id: elementId
    });
  };
  return HCaptcha2;
}(React.Component);
var esm_default = HCaptcha;
export {
  esm_default as default
};
//# sourceMappingURL=@hcaptcha_react-hcaptcha.js.map
