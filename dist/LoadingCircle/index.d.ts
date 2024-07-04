import * as react_jsx_runtime from 'react/jsx-runtime';

declare const LoadingCircle: ({ show, isClient }: {
    show: boolean;
    isClient: boolean;
}) => react_jsx_runtime.JSX.Element;

declare const LocalLoadingCircle: ({ show }: {
    show: boolean;
}) => react_jsx_runtime.JSX.Element;

export { LoadingCircle, LocalLoadingCircle };
