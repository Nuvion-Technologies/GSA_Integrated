var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./helpers/unitConverter", "./helpers/animation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __importStar(require("react"));
    var unitConverter_1 = require("./helpers/unitConverter");
    var animation_1 = require("./helpers/animation");
    var rotate = (0, animation_1.createAnimation)("RotateLoader", "0% {transform: rotate(0deg)} 50% {transform: rotate(180deg)} 100% {transform: rotate(360deg)}", "rotate");
    function RotateLoader(_a) {
        var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 15 : _f, _g = _a.margin, margin = _g === void 0 ? 2 : _g, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size", "margin"]);
        var _h = (0, unitConverter_1.parseLengthAndUnit)(margin), value = _h.value, unit = _h.unit;
        var ball = {
            backgroundColor: color,
            width: (0, unitConverter_1.cssValue)(size),
            height: (0, unitConverter_1.cssValue)(size),
            borderRadius: "100%",
        };
        var wrapper = __assign(__assign(__assign({}, ball), { display: "inline-block", position: "relative", animationFillMode: "both", animation: "".concat(rotate, " ").concat(1 / speedMultiplier, "s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86)") }), cssOverride);
        var style = function (i) {
            var left = (i % 2 ? -1 : 1) * (26 + value);
            return {
                opacity: "0.8",
                position: "absolute",
                top: "0",
                left: "".concat(left).concat(unit),
            };
        };
        if (!loading) {
            return null;
        }
        return (React.createElement("span", __assign({ style: wrapper }, additionalprops),
            React.createElement("span", { style: __assign(__assign({}, ball), style(1)) }),
            React.createElement("span", { style: __assign(__assign({}, ball), style(2)) })));
    }
    exports.default = RotateLoader;
});
