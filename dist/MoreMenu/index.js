'use strict';

var jsxRuntime = require('react/jsx-runtime');
var core = require('@material-ui/core');
var react = require('react');

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

var css_248z = ".MenuContainer .OpenMenu {\n  width: 28px;\n  height: 28px;\n  min-width: unset;\n  padding: 4px;\n  border-radius: 4px;\n  box-sizing: border-box;\n  border: none;\n  transition-duration: 0.3s;\n  background: transparent;\n  cursor: pointer;\n}\n.MenuContainer .OpenMenu svg {\n  width: 20px;\n  height: 20px;\n}\n\n.MoreMenuPaper {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border-radius: 4px;\n  margin-top: 8px;\n}\n.MoreMenuPaper .MoreMenuList {\n  padding: 0;\n}\n.MoreMenuPaper .MoreMenuList .MoreMenuItemButton {\n  width: 100%;\n  box-sizing: border-box;\n}\n.MoreMenuPaper .MoreMenuList .MoreMenuItemButton button, .MoreMenuPaper .MoreMenuList .MoreMenuItemButton a {\n  width: 100%;\n}\n.MoreMenuPaper .MoreMenuList .MoreMenuItemButton button span, .MoreMenuPaper .MoreMenuList .MoreMenuItemButton a span {\n  text-align: start;\n  display: flex;\n  justify-content: flex-start;\n}";
styleInject(css_248z);

const MoreMenuContext = react.createContext({
    anchorEl: null,
    setAnchorEl: () => { }
});
const MenuItemButton = react.forwardRef((props, _ref) => {
    const { setAnchorEl } = react.useContext(MoreMenuContext);
    const { children, className = '', onClick = () => { }, href } = props;
    return (jsxRuntime.jsx("li", { className: `${className} MoreMenuItemButton`, children: jsxRuntime.jsx(core.Button, { onClick: (event) => { onClick(event); setAnchorEl(null); }, href: href, children: children }) }));
});
const MenuItem = react.forwardRef((props, _ref) => {
    const { children, className } = props;
    return (jsxRuntime.jsx("li", { className: `${className} MoreMenuItem`, children: children }));
});
/**
 *
 * Demos:
 *
 * - [Menus](https://v4.mui.com/components/menus/)
 *
 * API:
 *
 * - [Menu API](https://v4.mui.com/api/menu/)
 * - inherits [Popover API](https://v4.mui.com/components/popover/#popover)
 */
const MoreMenu = ({ children, ButtonElementChild, className, PaperProps, anchorOrigin, transformOrigin }) => {
    var _a, _b, _c, _d;
    const [anchorEl, setAnchorEl] = react.useState(null);
    return (jsxRuntime.jsx(MoreMenuContext.Provider, { value: { anchorEl, setAnchorEl }, children: jsxRuntime.jsxs("div", { className: `MenuContainer ${className}`, children: [jsxRuntime.jsx(core.Button, { className: `OpenMenu ${anchorEl ? 'Open' : ''}`, onClick: (event) => setAnchorEl(event.currentTarget), children: ButtonElementChild }), jsxRuntime.jsx(core.Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), elevation: 0, getContentAnchorEl: null, anchorOrigin: {
                        vertical: (_a = anchorOrigin === null || anchorOrigin === void 0 ? void 0 : anchorOrigin.vertical) !== null && _a !== void 0 ? _a : 'bottom',
                        horizontal: (_b = anchorOrigin === null || anchorOrigin === void 0 ? void 0 : anchorOrigin.horizontal) !== null && _b !== void 0 ? _b : 'left',
                    }, transformOrigin: {
                        vertical: (_c = transformOrigin === null || transformOrigin === void 0 ? void 0 : transformOrigin.vertical) !== null && _c !== void 0 ? _c : 'top',
                        horizontal: (_d = transformOrigin === null || transformOrigin === void 0 ? void 0 : transformOrigin.horizontal) !== null && _d !== void 0 ? _d : 'left',
                    }, PaperProps: Object.assign(Object.assign({}, PaperProps), { className: `MoreMenuPaper ${PaperProps === null || PaperProps === void 0 ? void 0 : PaperProps.className}`, style: Object.assign({ boxShadow: [
                                "0px 14px 32px 0px rgba(0, 0, 0, 0.12)",
                                "0px 10px 14px 0px rgba(0, 0, 0, 0.06)",
                                "0px  0px  0px 1px rgba(0, 0, 0, 0.04)",
                            ].join(", ") }, PaperProps === null || PaperProps === void 0 ? void 0 : PaperProps.style) }), MenuListProps: { className: 'MoreMenuList' }, children: children })] }) }));
};
MoreMenu.MenuItemButton = MenuItemButton;
MoreMenu.MenuItem = MenuItem;

exports.MoreMenu = MoreMenu;
