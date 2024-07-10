import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';

declare const GlobalToast: () => react_jsx_runtime.JSX.Element;
declare const Toast: ({ open, onClose, message, timeout, iconType }: {
    open: boolean;
    onClose?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    message: React.ReactNode;
    timeout?: number;
    iconType?: "error" | "success" | "warning" | "info" | undefined;
}) => react_jsx_runtime.JSX.Element | null;

declare const types: readonly ["success", "warning", "error", "info"];
type ToastIconTypes = typeof types[number];
type ToastObjectType = {
    message: string | ReactNode;
    timeout?: number;
    iconType?: ToastIconTypes;
};
type ToastAlertType = {
    (obj: ToastObjectType): void;
    (message: string, timeout?: number, iconType?: ToastIconTypes): void;
};
declare const useToastAlert: () => {
    toastAlert: ToastAlertType;
};

export { GlobalToast, Toast, type ToastAlertType, type ToastObjectType, useToastAlert };
