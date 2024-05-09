import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties } from 'react';

type nestedDrawerPropsType = {
    children: ReactNode;
    open: boolean;
    onClose: Function;
    className?: string;
    style?: CSSProperties;
};
declare const NestedCascadeDrawer: ({ children, open, onClose, className, style, }: nestedDrawerPropsType) => react_jsx_runtime.JSX.Element;

declare const PortalDrawer: ({ isClient, container, ...props }: {
    isClient: boolean;
    container?: Element | DocumentFragment | null;
} & nestedDrawerPropsType) => react_jsx_runtime.JSX.Element;

export { NestedCascadeDrawer, PortalDrawer, type nestedDrawerPropsType };
