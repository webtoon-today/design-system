'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactDom = require('react-dom');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".LoadingCircle {\n  position: fixed;\n  left: 0;\n  top: 0;\n  background-color: rgba(255, 255, 255, 0);\n  transition: 400ms;\n  z-index: -1;\n  --magnitude: 24px;\n}\n.LoadingCircle.Global {\n  width: 100vw;\n  height: 100vh;\n}\n.LoadingCircle.Local {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  left: 0;\n}\n.LoadingCircle.Show {\n  background-color: rgba(244, 244, 244, 0.8);\n  z-index: 1500;\n}\n.LoadingCircle.Show.Animated {\n  background-color: rgba(225, 225, 225, 0.8);\n}\n.LoadingCircle.Show .Holder {\n  opacity: 1;\n}\n.LoadingCircle .Holder {\n  --size: 16px;\n  position: absolute;\n  left: calc(50% - var(--size) / 2);\n  top: calc(50% - var(--size) / 2);\n  width: var(--size);\n  height: var(--size);\n  transition: 400ms;\n  opacity: 0;\n}\n.LoadingCircle .Holder:not(.Center) .Circle {\n  animation-duration: 3000ms;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n  animation-direction: normal;\n  animation-fill-mode: none;\n  animation-play-state: running;\n  animation-name: swingUpSideDown;\n}\n.LoadingCircle .Holder .Circle {\n  border-radius: var(--size);\n  position: relative;\n  width: 100%;\n  height: 100%;\n  mask: url(\"https://static.webtoon.today/ddah/Circle.svg\") no-repeat center;\n}\n.LoadingCircle .Holder.Center .Circle {\n  background-color: rgb(160, 190, 200);\n}\n.LoadingCircle .Holder.Bottom {\n  transform: rotate(0deg);\n}\n.LoadingCircle .Holder.Bottom .Circle {\n  background-color: rgb(46, 80, 169);\n}\n.LoadingCircle .Holder.Left {\n  transform: rotate(90deg);\n}\n.LoadingCircle .Holder.Left .Circle {\n  background-color: rgb(174, 49, 169);\n}\n.LoadingCircle .Holder.Top {\n  transform: rotate(180deg);\n}\n.LoadingCircle .Holder.Top .Circle {\n  background-color: rgb(171, 88, 221);\n}\n.LoadingCircle .Holder.Right {\n  transform: rotate(270deg);\n}\n.LoadingCircle .Holder.Right .Circle {\n  background-color: rgb(121, 159, 217);\n}\n@keyframes swingUpSideDown {\n  12.5% {\n    transform: translate(0, var(--magnitude));\n  }\n  25.0% {\n    transform: translate(0, 0);\n  }\n  25.1% {\n    transform: rotate(180deg) translate(0, 0);\n  }\n  37.5% {\n    transform: rotate(180deg) translate(0, var(--magnitude));\n  }\n  50.0% {\n    transform: rotate(180deg) translate(0, 0);\n  }\n  50.1% {\n    transform: rotate(0deg) translate(0, 0);\n  }\n  62.5% {\n    transform: rotate(0deg) translate(0, var(--magnitude));\n  }\n  75.0% {\n    transform: rotate(180deg) translate(0, var(--magnitude));\n  }\n  87.5% {\n    transform: rotate(360deg) translate(0, var(--magnitude));\n  }\n  100.0% {\n    transform: rotate(360deg) translate(0, 0);\n  }\n}";
styleInject(css_248z);

const BaseLoadingCircle = ({ show, isLocal = false, style }) => {
    return (jsxRuntime.jsx("div", { className: `LoadingCircle Animated ${show ? 'Show' : ''} ${isLocal ? 'Local' : 'Global'}`, children: ["Bottom", "Left", "Top", "Right", "Center"].map(direction => jsxRuntime.jsx("div", { className: `Holder ${direction}`, children: jsxRuntime.jsx("div", { className: "Circle" }) }, direction)) }));
};

const LoadingCircle = ({ show, isClient = false }) => {
    if (!isClient) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    return (reactDom.createPortal(jsxRuntime.jsx(BaseLoadingCircle, { show: show }), document.body));
};

const LocalLoadingCircle = ({ show }) => {
    return (jsxRuntime.jsx(BaseLoadingCircle, { show: show, isLocal: true }));
};

exports.LoadingCircle = LoadingCircle;
exports.LocalLoadingCircle = LocalLoadingCircle;
