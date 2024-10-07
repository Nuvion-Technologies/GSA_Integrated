"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var React = _interopRequireWildcard(require("react"));
var _loader = require("@hcaptcha/loader");
var _utils = require("./utils.js");
var _constants = require("./constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var HCaptcha = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(HCaptcha, _React$Component);
  function HCaptcha(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, HCaptcha);
    _this = _callSuper(this, HCaptcha, [props]);

    /**
     * Internal reference to track hCaptcha API
     *
     * Required as window is relative to initialization in application
     * not where the script and iFrames have been loaded.
     */
    _this._hcaptcha = undefined;

    // API Methods
    _this.renderCaptcha = _this.renderCaptcha.bind((0, _assertThisInitialized2["default"])(_this));
    _this.resetCaptcha = _this.resetCaptcha.bind((0, _assertThisInitialized2["default"])(_this));
    _this.removeCaptcha = _this.removeCaptcha.bind((0, _assertThisInitialized2["default"])(_this));
    _this.isReady = _this.isReady.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onReady = null;

    // Event Handlers
    _this.loadCaptcha = _this.loadCaptcha.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleOnLoad = _this.handleOnLoad.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleSubmit = _this.handleSubmit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleExpire = _this.handleExpire.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleError = _this.handleError.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleOpen = _this.handleOpen.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleClose = _this.handleClose.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleChallengeExpired = _this.handleChallengeExpired.bind((0, _assertThisInitialized2["default"])(_this));
    _this.ref = /*#__PURE__*/React.createRef();
    _this.apiScriptRequested = false;
    _this.sentryHub = null;
    _this.state = {
      isApiReady: false,
      isRemoved: false,
      elementId: props.id,
      captchaId: ''
    };
    return _this;
  }
  (0, _createClass2["default"])(HCaptcha, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      // Once captcha is mounted intialize hCaptcha - hCaptcha
      var element = (0, _utils.getMountElement)(this.props.scriptLocation);
      var frame = (0, _utils.getFrame)(element);
      this._hcaptcha = frame.window.hcaptcha || undefined;
      var isApiReady = typeof this._hcaptcha !== 'undefined';
      this.sentryHub = (0, _loader.initSentry)(this.props.sentry, _constants.scopeTag);
      this.sentryHub.addBreadcrumb({
        category: _constants.scopeTag.value,
        message: _constants.breadcrumbMessages.mounted
      });

      /*
       * Check if hCaptcha has already been loaded,
       * If Yes, render the captcha
       * If No, create script tag and wait to render the captcha
       */
      if (isApiReady) {
        this.setState({
          isApiReady: true
        }, function () {
          _this2.renderCaptcha();
        });
        return;
      }
      this.loadCaptcha();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (!this.isReady()) {
        return;
      }

      // Reset any stored variables / timers when unmounting
      hcaptcha.reset(captchaId);
      hcaptcha.remove(captchaId);
      this.sentryHub.addBreadcrumb({
        category: _constants.scopeTag.value,
        message: _constants.breadcrumbMessages.unmounted
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Prevent component re-rendering when these internal state variables are updated
      if (this.state.isApiReady !== nextState.isApiReady || this.state.isRemoved !== nextState.isRemoved) {
        return false;
      }
      return true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;
      // Prop Keys that could change
      var keys = ['sitekey', 'size', 'theme', 'tabindex', 'languageOverride', 'endpoint'];
      // See if any props changed during component update
      var match = keys.every(function (key) {
        return prevProps[key] === _this3.props[key];
      });

      // If they have changed, remove current captcha and render a new one
      if (!match) {
        this.removeCaptcha(function () {
          _this3.renderCaptcha();
        });
      }
    }
  }, {
    key: "loadCaptcha",
    value: function loadCaptcha() {
      if (this.apiScriptRequested) {
        return;
      }
      var _this$props = this.props,
        apihost = _this$props.apihost,
        assethost = _this$props.assethost,
        endpoint = _this$props.endpoint,
        host = _this$props.host,
        imghost = _this$props.imghost,
        hl = _this$props.languageOverride,
        reCaptchaCompat = _this$props.reCaptchaCompat,
        reportapi = _this$props.reportapi,
        sentry = _this$props.sentry,
        custom = _this$props.custom,
        loadAsync = _this$props.loadAsync,
        scriptLocation = _this$props.scriptLocation,
        scriptSource = _this$props.scriptSource,
        secureApi = _this$props.secureApi,
        _this$props$cleanup = _this$props.cleanup,
        cleanup = _this$props$cleanup === void 0 ? true : _this$props$cleanup;
      var mountParams = {
        render: 'explicit',
        apihost: apihost,
        assethost: assethost,
        endpoint: endpoint,
        hl: hl,
        host: host,
        imghost: imghost,
        recaptchacompat: reCaptchaCompat === false ? 'off' : null,
        reportapi: reportapi,
        sentry: sentry,
        custom: custom,
        loadAsync: loadAsync,
        scriptLocation: scriptLocation,
        scriptSource: scriptSource,
        secureApi: secureApi,
        cleanup: cleanup
      };
      (0, _loader.hCaptchaLoader)(mountParams).then(this.handleOnLoad, this.handleError)["catch"](this.handleError);
      this.apiScriptRequested = true;
    }
  }, {
    key: "renderCaptcha",
    value: function renderCaptcha(onReady) {
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
        languageOverride: undefined
      });
      var hcaptcha = this._hcaptcha;
      //Render hCaptcha widget and provide necessary callbacks - hCaptcha
      var captchaId = hcaptcha.render(this.ref.current, renderParams);
      this.setState({
        isRemoved: false,
        captchaId: captchaId
      }, function () {
        onReady && onReady();
        _this4._onReady && _this4._onReady(captchaId);
      });
    }
  }, {
    key: "resetCaptcha",
    value: function resetCaptcha() {
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (!this.isReady()) {
        return;
      }
      // Reset captcha state, removes stored token and unticks checkbox
      hcaptcha.reset(captchaId);
      this.sentryHub.addBreadcrumb({
        category: _constants.scopeTag.value,
        message: _constants.breadcrumbMessages.reset
      });
    }
  }, {
    key: "removeCaptcha",
    value: function removeCaptcha(callback) {
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (!this.isReady()) {
        return;
      }
      this.setState({
        isRemoved: true
      }, function () {
        hcaptcha.remove(captchaId);
        callback && callback();
      });
      this.sentryHub.addBreadcrumb({
        category: _constants.scopeTag.value,
        message: _constants.breadcrumbMessages.removed
      });
    }
  }, {
    key: "handleOnLoad",
    value: function handleOnLoad() {
      var _this5 = this;
      this.setState({
        isApiReady: true
      }, function () {
        try {
          var element = (0, _utils.getMountElement)(_this5.props.scriptLocation);
          var frame = (0, _utils.getFrame)(element);
          _this5._hcaptcha = frame.window.hcaptcha;

          // render captcha and wait for captcha id
          _this5.renderCaptcha(function () {
            // trigger onLoad if it exists

            var onLoad = _this5.props.onLoad;
            if (onLoad) onLoad();
          });
        } catch (error) {
          _this5.sentryHub.captureException(error);
        }
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var onVerify = this.props.onVerify;
      var _this$state = this.state,
        isRemoved = _this$state.isRemoved,
        captchaId = _this$state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (typeof hcaptcha === 'undefined' || isRemoved) return;
      var token = hcaptcha.getResponse(captchaId); //Get response token from hCaptcha widget
      var ekey = hcaptcha.getRespKey(captchaId); //Get current challenge session id from hCaptcha widget
      if (onVerify) onVerify(token, ekey); //Dispatch event to verify user response
    }
  }, {
    key: "handleExpire",
    value: function handleExpire() {
      var onExpire = this.props.onExpire;
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (!this.isReady()) {
        return;
      }
      hcaptcha.reset(captchaId); // If hCaptcha runs into error, reset captcha - hCaptcha

      if (onExpire) onExpire();
      this.sentryHub.addBreadcrumb({
        category: _constants.scopeTag.value,
        message: _constants.breadcrumbMessages.expired
      });
    }
  }, {
    key: "handleError",
    value: function handleError(event) {
      var onError = this.props.onError;
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (this.isReady()) {
        // If hCaptcha runs into error, reset captcha - hCaptcha
        hcaptcha.reset(captchaId);
      }
      if (onError) onError(event);
    }
  }, {
    key: "isReady",
    value: function isReady() {
      var _this$state2 = this.state,
        isApiReady = _this$state2.isApiReady,
        isRemoved = _this$state2.isRemoved;
      return isApiReady && !isRemoved;
    }
  }, {
    key: "handleOpen",
    value: function handleOpen() {
      if (!this.isReady() || !this.props.onOpen) {
        return;
      }
      this.props.onOpen();
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      if (!this.isReady() || !this.props.onClose) {
        return;
      }
      this.props.onClose();
    }
  }, {
    key: "handleChallengeExpired",
    value: function handleChallengeExpired() {
      if (!this.isReady() || !this.props.onChalExpired) {
        return;
      }
      this.props.onChalExpired();
    }
  }, {
    key: "execute",
    value: function execute() {
      var _this6 = this;
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      opts = (0, _typeof2["default"])(opts) === 'object' ? opts : null;
      try {
        var captchaId = this.state.captchaId;
        var hcaptcha = this._hcaptcha;
        if (!this.isReady()) {
          var _opts;
          var onReady = new Promise(function (resolve, reject) {
            _this6._onReady = function (id) {
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
          return (_opts = opts) !== null && _opts !== void 0 && _opts.async ? onReady : null;
        }
        return hcaptcha.execute(captchaId, opts);
      } catch (error) {
        this.sentryHub.captureException(error);
        if (opts && opts.async) {
          return Promise.reject(error);
        }
        return null;
      }
    }
  }, {
    key: "setData",
    value: function setData(data) {
      var captchaId = this.state.captchaId;
      var hcaptcha = this._hcaptcha;
      if (!this.isReady()) {
        return;
      }
      if (data && (0, _typeof2["default"])(data) !== "object") {
        data = null;
      }
      hcaptcha.setData(captchaId, data);
    }
  }, {
    key: "getResponse",
    value: function getResponse() {
      var hcaptcha = this._hcaptcha;
      return hcaptcha.getResponse(this.state.captchaId);
    }
  }, {
    key: "getRespKey",
    value: function getRespKey() {
      var hcaptcha = this._hcaptcha;
      return hcaptcha.getRespKey(this.state.captchaId);
    }
  }, {
    key: "render",
    value: function render() {
      var elementId = this.state.elementId;
      return /*#__PURE__*/React.createElement("div", {
        ref: this.ref,
        id: elementId
      });
    }
  }]);
  return HCaptcha;
}(React.Component);
var _default = exports["default"] = HCaptcha;
module.exports = exports.default;