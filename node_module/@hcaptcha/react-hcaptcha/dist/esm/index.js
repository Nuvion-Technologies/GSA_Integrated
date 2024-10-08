import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import * as React from 'react';
import { hCaptchaLoader, initSentry } from '@hcaptcha/loader';
import { getFrame, getMountElement } from './utils.js';
import { breadcrumbMessages, scopeTag } from "./constants";
var HCaptcha = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(HCaptcha, _React$Component);
  function HCaptcha(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;

    /**
     * Internal reference to track hCaptcha API
     *
     * Required as window is relative to initialization in application
     * not where the script and iFrames have been loaded.
     */
    _this._hcaptcha = undefined;

    // API Methods
    _this.renderCaptcha = _this.renderCaptcha.bind(_assertThisInitialized(_this));
    _this.resetCaptcha = _this.resetCaptcha.bind(_assertThisInitialized(_this));
    _this.removeCaptcha = _this.removeCaptcha.bind(_assertThisInitialized(_this));
    _this.isReady = _this.isReady.bind(_assertThisInitialized(_this));
    _this._onReady = null;

    // Event Handlers
    _this.loadCaptcha = _this.loadCaptcha.bind(_assertThisInitialized(_this));
    _this.handleOnLoad = _this.handleOnLoad.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleExpire = _this.handleExpire.bind(_assertThisInitialized(_this));
    _this.handleError = _this.handleError.bind(_assertThisInitialized(_this));
    _this.handleOpen = _this.handleOpen.bind(_assertThisInitialized(_this));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this.handleChallengeExpired = _this.handleChallengeExpired.bind(_assertThisInitialized(_this));
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
  var _proto = HCaptcha.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    // Once captcha is mounted intialize hCaptcha - hCaptcha
    var element = getMountElement(this.props.scriptLocation);
    var frame = getFrame(element);
    this._hcaptcha = frame.window.hcaptcha || undefined;
    var isApiReady = typeof this._hcaptcha !== 'undefined';
    this.sentryHub = initSentry(this.props.sentry, scopeTag);
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.mounted
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
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }

    // Reset any stored variables / timers when unmounting
    hcaptcha.reset(captchaId);
    hcaptcha.remove(captchaId);
    this.sentryHub.addBreadcrumb({
      category: scopeTag.value,
      message: breadcrumbMessages.unmounted
    });
  };
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    // Prevent component re-rendering when these internal state variables are updated
    if (this.state.isApiReady !== nextState.isApiReady || this.state.isRemoved !== nextState.isRemoved) {
      return false;
    }
    return true;
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
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
  };
  _proto.loadCaptcha = function loadCaptcha() {
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
    hCaptchaLoader(mountParams).then(this.handleOnLoad, this.handleError)["catch"](this.handleError);
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
  };
  _proto.resetCaptcha = function resetCaptcha() {
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    // Reset captcha state, removes stored token and unticks checkbox
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
    }, function () {
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
    }, function () {
      try {
        var element = getMountElement(_this5.props.scriptLocation);
        var frame = getFrame(element);
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
  };
  _proto.handleSubmit = function handleSubmit(event) {
    var onVerify = this.props.onVerify;
    var _this$state = this.state,
      isRemoved = _this$state.isRemoved,
      captchaId = _this$state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (typeof hcaptcha === 'undefined' || isRemoved) return;
    var token = hcaptcha.getResponse(captchaId); //Get response token from hCaptcha widget
    var ekey = hcaptcha.getRespKey(captchaId); //Get current challenge session id from hCaptcha widget
    if (onVerify) onVerify(token, ekey); //Dispatch event to verify user response
  };
  _proto.handleExpire = function handleExpire() {
    var onExpire = this.props.onExpire;
    var captchaId = this.state.captchaId;
    var hcaptcha = this._hcaptcha;
    if (!this.isReady()) {
      return;
    }
    hcaptcha.reset(captchaId); // If hCaptcha runs into error, reset captcha - hCaptcha

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
      // If hCaptcha runs into error, reset captcha - hCaptcha
      hcaptcha.reset(captchaId);
    }
    if (onError) onError(event);
  };
  _proto.isReady = function isReady() {
    var _this$state2 = this.state,
      isApiReady = _this$state2.isApiReady,
      isRemoved = _this$state2.isRemoved;
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
    opts = typeof opts === 'object' ? opts : null;
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
    return /*#__PURE__*/React.createElement("div", {
      ref: this.ref,
      id: elementId
    });
  };
  return HCaptcha;
}(React.Component);
export default HCaptcha;