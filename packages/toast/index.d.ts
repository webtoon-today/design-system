import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

declare const Toast: () => react_jsx_runtime.JSX.Element;

declare const types: readonly ["success", "warning", "error", "info"];
type toastIconTypes = typeof types[number];
type toastObjectType = {
    message: string | ReactNode;
    timeout?: number;
    iconType?: toastIconTypes;
};
type toastAlertType = {
    (obj: toastObjectType): void;
    (message: string, timeout?: number, iconType?: toastIconTypes): void;
};
declare const useToastAlert: () => {
    toastAlert: toastAlertType;
};

export { Toast, type toastAlertType, useToastAlert };
