'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var recoil = require('recoil');

const initialTimeout = 3000;
const toastDefault = {
    message: '', timeout: 0, open: false
};
const toastAlertAtom = recoil.atom({
    key: "toastAlertKey",
    default: toastDefault
});
const useToastAlert = () => {
    const setToastAlertAtom = recoil.useSetRecoilState(toastAlertAtom);
    const toastAlert = react.useCallback((messageOfParamsOrToastObject, timeoutOfParams, iconTypeOfParams) => {
        let message, timeout, iconType;
        if (typeof messageOfParamsOrToastObject === 'string') {
            message = messageOfParamsOrToastObject;
            timeout = timeoutOfParams;
            iconType = iconTypeOfParams;
        }
        else {
            message = messageOfParamsOrToastObject.message;
            timeout = messageOfParamsOrToastObject.timeout;
            iconType = messageOfParamsOrToastObject.iconType;
        }
        setToastAlertAtom({ open: true, message, timeout: timeout || initialTimeout, iconType });
    }, [setToastAlertAtom]);
    return ({ toastAlert });
};

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

var css_248z = "@keyframes toast-in {\n  0% {\n    transform: translate3d(0, -100%, 0);\n    display: none;\n  }\n  1% {\n    transform: translate3d(0, -100%, 0);\n    display: block;\n  }\n  100% {\n    transform: translate3d(0, 0, 0);\n    display: block;\n  }\n}\n@keyframes toast-out {\n  0% {\n    display: block;\n    opacity: 1;\n    scale: 1;\n  }\n  99% {\n    display: block;\n    scale: 0.8;\n    opacity: 0;\n  }\n  100% {\n    scale: 0.8;\n    opacity: 0;\n    display: none;\n  }\n}\n.ToastBackgroundArea {\n  position: fixed;\n  top: 24px;\n  left: 0;\n  right: 0;\n  z-index: 2000;\n  min-height: 50px;\n  text-align: center;\n  font-size: 1rem;\n  pointer-events: none;\n}\n.ToastBackgroundArea.FadeIn {\n  animation: toast-in 287ms linear forwards;\n}\n.ToastBackgroundArea.FadeOut {\n  animation: toast-out 287ms linear forwards;\n}\n.ToastBackgroundArea.Close {\n  display: none;\n}\n.ToastBackgroundArea .ToastBox {\n  display: inline-flex;\n  justify-content: center;\n  padding: 15px 22px;\n  margin: 0 auto;\n  border-radius: 12px;\n  background: rgb(51, 51, 53);\n  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3), 0px 3px 12px 3px rgba(0, 0, 0, 0.1);\n  color: rgb(255, 255, 255);\n  white-space: pre-line;\n  word-break: keep-all;\n  text-align: start;\n  max-width: 600px;\n  pointer-events: auto;\n}\n@media (max-width: 700px) {\n  .ToastBackgroundArea .ToastBox {\n    max-width: calc(100% - 62px);\n  }\n}\n.ToastBackgroundArea .ToastBox.IconToast {\n  align-items: flex-start;\n  gap: 10px;\n}\n.ToastBackgroundArea .ToastBox .CheckButton {\n  color: rgb(61, 106, 255);\n  margin-left: 10px;\n  cursor: pointer;\n  align-self: flex-end;\n}";
styleInject(css_248z);

const ANIMATION_DURATION = 287;
const RootToast = ({ open, onClose, message, timeout = 3000, iconType }) => {
    const [animationState, setAnimationState] = react.useState('Close');
    const closeTimer = react.useRef(undefined);
    const handleClose = react.useCallback((e) => {
        setAnimationState('FadeOut');
        if (!!onClose) {
            closeTimer.current = setTimeout(() => onClose(e), ANIMATION_DURATION);
        }
    }, [onClose]);
    react.useEffect(() => {
        if (!open) {
            return;
        }
        setAnimationState('FadeIn');
        const timer = setTimeout(handleClose, timeout);
        return () => {
            clearTimeout(timer);
        };
    }, [open, timeout, handleClose]);
    react.useEffect(() => {
        return () => {
            clearTimeout(closeTimer.current);
        };
    }, []);
    if (!message) {
        return null;
    }
    return (jsxRuntime.jsx("div", { className: `ToastBackgroundArea ${animationState}`, children: jsxRuntime.jsx("div", { className: `ToastBox ${iconType ? "IconToast" : ""}`, children: iconType
                ? jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("img", { src: `https://static.webtoon.today/ddah/icon/icon_${iconType}.svg`, alt: iconType, width: 20, height: 20, style: { marginRight: 10 } }), message, jsxRuntime.jsx("div", { className: 'CheckButton', onClick: handleClose, children: '확인' })] })
                : message }) }));
};
const GlobalToast = () => {
    const { open, message, timeout, iconType } = recoil.useRecoilValue(toastAlertAtom);
    const setToastAlertAtom = recoil.useSetRecoilState(toastAlertAtom);
    return (jsxRuntime.jsx(RootToast, { open: open, onClose: () => setToastAlertAtom({ open: false, message: '' }), message, timeout, iconType }));
};
const Toast = RootToast;

exports.GlobalToast = GlobalToast;
exports.Toast = Toast;
exports.useToastAlert = useToastAlert;
