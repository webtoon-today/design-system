'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var core = require('@material-ui/core');
var icons = require('@material-ui/icons');

const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const getGuideTextType = (conditions) => {
    const foundType = ["fail", "success", "required"].find(type => conditions[type]);
    return foundType ? foundType : 'normal';
};
const getButtonStatusType = (conditions) => {
    const foundType = ['inactivated', 'fail', 'success', 'pending'].find(type => conditions[type]);
    return foundType ? foundType : 'activated';
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

var css_248z = ".TextBoxContainer {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  border-radius: 5px;\n  width: 100%;\n}\n.TextBoxContainer .TextBox {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-sizing: border-box;\n  height: 48px;\n  border-radius: 5px;\n  border: 1px solid rgb(236, 237, 243);\n  padding: 2px 16px 2px 14px;\n  color: rgb(25, 24, 27);\n  font-size: 0.9375rem;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n  background-color: rgb(255, 255, 255);\n}\n.TextBoxContainer .TextBox:hover {\n  border: 1px solid rgb(61, 106, 255);\n}\n.TextBoxContainer .TextBox.Focused {\n  border: 2px solid rgb(61, 106, 255);\n  padding: 1px 15px 1px 13px;\n}\n.TextBoxContainer .TextBox.Disabled {\n  border: 1px solid rgb(213, 213, 216);\n  background: linear-gradient(0deg, rgba(138, 138, 138, 0.25) 0%, rgba(138, 138, 138, 0.25) 100%), rgb(246, 246, 249);\n}\n.TextBoxContainer .TextBox input {\n  width: 100%;\n  border: none;\n  background: none;\n}\n.TextBoxContainer .TextBox input::placeholder {\n  color: rgb(121, 120, 130);\n}\n.TextBoxContainer .TextBox input:focus {\n  outline: none;\n}\n.TextBoxContainer .TextBox .VerificationButton {\n  position: relative;\n  display: flex;\n  align-items: center;\n  color: rgb(255, 255, 255);\n  font-size: 0.8125rem;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 16px;\n  letter-spacing: 0.13px;\n  user-select: none;\n  transition: 200ms;\n}\n.TextBoxContainer .TextBox .VerificationButton.Activated {\n  cursor: pointer;\n}\n.TextBoxContainer .TextBox .VerificationButton.Activated:active {\n  filter: brightness(0.9);\n}\n.TextBoxContainer .TextBox .VerificationButton.Activated .Background, .TextBoxContainer .TextBox .VerificationButton.Inactivated .Background, .TextBoxContainer .TextBox .VerificationButton.Pending .Background {\n  width: 66px;\n  height: 32px;\n}\n.TextBoxContainer .TextBox .VerificationButton.Success .Background, .TextBoxContainer .TextBox .VerificationButton.Fail .Background {\n  width: 18px;\n  height: 18px;\n}\n.TextBoxContainer .TextBox .VerificationButton span {\n  position: absolute;\n  width: 100%;\n  text-align: center;\n}\n.TextBoxContainer .TextBox .VerificationButton .Spinner {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  top: calc(50% - 10px);\n  left: calc(50% - 10px);\n  animation: spin 1s 0.3s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite;\n}\n.TextBoxContainer .TextBox .VerificationButton.Visibility {\n  color: rgb(189, 189, 194);\n}\n.TextBoxContainer .TextBox .VerificationButton.Visibility:hover, .TextBoxContainer .TextBox .VerificationButton.Visibility:focus {\n  color: rgb(155, 155, 160);\n}\n.TextBoxContainer .TextBoxGuide {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8125rem;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 16px;\n  letter-spacing: 0.13px;\n}\n.TextBoxContainer .TextBoxGuide .Initial, .TextBoxContainer .TextBoxGuide .Normal {\n  color: rgb(189, 189, 194);\n}\n.TextBoxContainer .TextBoxGuide .Success {\n  color: rgb(80, 200, 114);\n}\n.TextBoxContainer .TextBoxGuide .Fail {\n  color: rgb(235, 81, 71);\n}\n.TextBoxContainer .TextBoxGuide .Required {\n  color: rgb(250, 149, 56);\n}\n.TextBoxContainer .TextBoxGuide .LetterCount {\n  color: rgb(121, 120, 130);\n}\n\n@keyframes spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}";
styleInject(css_248z);

const TextBox = ({ children, text, placeholder, guideTextType, guideText, maxLength, onChange, onFocus, onBlur, onKeyDown, isFocused, isDisabled, type, style }) => {
    const textboxClassList = [
        'TextBox',
        isDisabled && 'Disabled',
        isFocused && 'Focused',
    ];
    return (jsxRuntime.jsxs("div", { className: 'TextBoxContainer', children: [jsxRuntime.jsxs("div", { className: textboxClassList.filter(Boolean).join(' '), style: style, children: [jsxRuntime.jsx("input", { placeholder: placeholder, value: text, onChange: onChange, onFocus: onFocus, onBlur: onBlur, disabled: isDisabled, type: type, onKeyDown: onKeyDown, style: { fontFamily: 'inherit', fontSize: 'inherit' } }), children] }), guideText &&
                jsxRuntime.jsxs("div", { className: 'TextBoxGuide', children: [jsxRuntime.jsx("span", { className: capitalizeFirstLetter(guideTextType), children: guideText }), maxLength >= 0 && jsxRuntime.jsx("span", { className: 'LetterCount', children: `${text.length}/${maxLength}` })] })] }));
};

const VerificationButton = ({ purpose, status, onClick }) => {
    const buttonContent = buttonSrc[purpose][status][1];
    return (jsxRuntime.jsxs("div", { className: `VerificationButton ${capitalizeFirstLetter(status)}`, onClick: () => {
            if (status === 'activated') {
                onClick();
            }
        }, tabIndex: 0, children: [jsxRuntime.jsx("img", { className: `Background`, src: buttonSrc[purpose][status][0], alt: status }), buttonContent] }));
};
const buttonSrc = {
    uniqueness: {
        activated: ['https://static.webtoon.today/ddah/button/button_primary.png', jsxRuntime.jsx("span", { children: '중복확인' })],
        inactivated: ['https://static.webtoon.today/ddah/button/button_primary_light.png', jsxRuntime.jsx("span", { children: '중복확인' })],
        pending: ['https://static.webtoon.today/ddah/button/button_primary_light.png', jsxRuntime.jsx("img", { className: 'Spinner', src: 'https://static.webtoon.today/ddah/icon/icon_spinner.png', alt: 'spinner' })],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', jsxRuntime.jsx(jsxRuntime.Fragment, {})],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', jsxRuntime.jsx(jsxRuntime.Fragment, {})],
    },
    verification: {
        activated: ['https://static.webtoon.today/ddah/button/button_secondary.png', jsxRuntime.jsx("span", { children: '확인' })],
        inactivated: ['https://static.webtoon.today/ddah/button/button_secondary_light.png', jsxRuntime.jsx("span", { children: '확인' })],
        pending: ['https://static.webtoon.today/ddah/button/button_secondary_light.png', jsxRuntime.jsx("img", { className: 'Spinner', src: 'https://static.webtoon.today/ddah/icon/icon_spinner.png', alt: 'spinner' })],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', jsxRuntime.jsx(jsxRuntime.Fragment, {})],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', jsxRuntime.jsx(jsxRuntime.Fragment, {})],
    },
    send: {
        activated: ['https://static.webtoon.today/ddah/button/button_primary.png', jsxRuntime.jsx("span", { children: '인증' })],
        inactivated: ['https://static.webtoon.today/ddah/button/button_primary_light.png', jsxRuntime.jsx("span", { children: '인증' })],
        pending: ['https://static.webtoon.today/ddah/button/button_primary_light.png', jsxRuntime.jsx("img", { className: 'Spinner', src: 'https://static.webtoon.today/ddah/icon/icon_spinner.png', alt: 'spinner' })],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', jsxRuntime.jsx(jsxRuntime.Fragment, {})],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', jsxRuntime.jsx(jsxRuntime.Fragment, {})],
    },
};

const GuideTextBoxForStandAloneVerification = ({ purpose, text, onChange, placeholder, guideTexts, maxLength = -1, validationStatus, onClick, isDisabled = false, forcedGuideTextType }) => {
    const [hasClicked, setHasClicked] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const guideTextType = forcedGuideTextType || getGuideTextType({
        required: hasClicked && validationStatus === 'undone',
        success: validationStatus === 'success',
        fail: validationStatus === 'fail',
    });
    const buttonStatus = getButtonStatusType({
        inactivated: text.length === 0,
        pending: validationStatus === 'pending',
        success: validationStatus === 'success' && !isFocused,
        fail: validationStatus === 'fail' && !isFocused,
    });
    return (jsxRuntime.jsx(TextBox, { text: text, placeholder: placeholder, guideTextType: guideTextType, guideText: guideTexts[guideTextType], maxLength: maxLength, isFocused: isFocused, isDisabled: isDisabled || validationStatus === 'pending', onChange: onChange, onFocus: () => {
            setIsFocused(true);
        }, onBlur: () => {
            setTimeout(() => {
                setHasClicked(true);
                setIsFocused(false);
            }, 50);
        }, children: jsxRuntime.jsx(VerificationButton, { purpose: purpose, status: buttonStatus, onClick: onClick }) }));
};

const GuideTextBoxForGeneral = ({ text, type, onChange, onBlur = () => { }, placeholder, guideTexts, isRequired, isDisabled = false, maxLength = -1, forcedGuideTextType, onKeyDown, style, children }) => {
    const [hasClicked, setHasClicked] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const guideTextType = forcedGuideTextType || getGuideTextType({
        required: isRequired && hasClicked && text.length === 0
    });
    return (jsxRuntime.jsx(TextBox, { text: text, type: type, placeholder: placeholder, guideTextType: guideTextType, guideText: guideTexts[guideTextType], maxLength: maxLength, isFocused: isFocused, isDisabled: isDisabled, onChange: onChange, onFocus: () => {
            setIsFocused(true);
        }, onBlur: (e) => {
            onBlur(e);
            setHasClicked(true);
            setIsFocused(false);
        }, onKeyDown: onKeyDown, style: style, children: children }));
};

const GuideTextBoxForPassword = ({ text, onChange, placeholder, guideTexts, maxLength = -1, isDisabled = false, isRequired = false, forcedGuideTextType, onKeyDown }) => {
    const [hasClicked, setHasClicked] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const [isVisible, setIsVisible] = react.useState(false);
    const guideTextType = forcedGuideTextType || getGuideTextType({
        required: isRequired && hasClicked
    });
    return (jsxRuntime.jsx(TextBox, { text: text, type: isVisible ? 'text' : 'password', placeholder: placeholder, guideTextType: guideTextType, guideText: guideTexts[guideTextType], maxLength: maxLength, isFocused: isFocused, isDisabled: isDisabled, onChange: onChange, onFocus: () => {
            setIsFocused(true);
        }, onBlur: () => {
            setTimeout(() => {
                setHasClicked(true);
                setIsFocused(false);
            }, 50);
        }, onKeyDown: onKeyDown, children: jsxRuntime.jsx(core.IconButton, { className: 'VerificationButton Visibility', onClick: () => setIsVisible(!isVisible), children: isVisible ? jsxRuntime.jsx(icons.VisibilityOff, {}) : jsxRuntime.jsx(icons.Visibility, {}) }) }));
};

const GuideTextBoxForPairedVerification = ({ purpose, text, validationPattern, onChange, placeholder, guideTexts, maxLength = -1, validationStatus, secondStepValidationStatus, onClick, isDisabled = false, forcedGuideTextType }) => {
    const [hasClicked, setHasClicked] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const guideTextType = forcedGuideTextType || getGuideTextType({
        required: hasClicked && validationStatus === 'undone' && !(isFocused && text.length > 0),
        success: validationStatus === 'success' && secondStepValidationStatus === 'success' && !isFocused
    });
    const buttonStatus = getButtonStatusType({
        inactivated: text.length === 0 || (validationStatus === 'success' && secondStepValidationStatus !== 'success') || (validationPattern && !validationPattern.test(text)),
        success: validationStatus === 'success' && secondStepValidationStatus === 'success' && !isFocused
    });
    return (jsxRuntime.jsx(TextBox, { text: text, placeholder: placeholder, guideTextType: guideTextType, guideText: guideTexts[guideTextType], maxLength: maxLength, isFocused: isFocused, isDisabled: isDisabled, onChange: onChange, onFocus: () => {
            setIsFocused(true);
        }, onBlur: () => {
            setTimeout(() => {
                setHasClicked(true);
                setIsFocused(false);
            }, 100);
        }, children: jsxRuntime.jsx(VerificationButton, { purpose: purpose, status: buttonStatus, onClick: onClick }) }));
};

exports.GuideTextBoxForGeneral = GuideTextBoxForGeneral;
exports.GuideTextBoxForPairedVerification = GuideTextBoxForPairedVerification;
exports.GuideTextBoxForPassword = GuideTextBoxForPassword;
exports.GuideTextBoxForStandAloneVerification = GuideTextBoxForStandAloneVerification;
exports.TextBox = TextBox;
exports.VerificationButton = VerificationButton;
