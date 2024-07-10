import { ReactNode, useCallback } from "react";
import { atom, useSetRecoilState } from "recoil";

const types = ["success", "warning", "error", "info"] as const
export type ToastIconTypes = typeof types[number];

export type ToastObjectType = {
    message: string | ReactNode,
    timeout?: number,
    iconType?: ToastIconTypes
}

export type ToastAlertType = {
    (obj: ToastObjectType): void;
    (message: string, timeout?: number, iconType?: ToastIconTypes): void;
}

const initialTimeout = 3000;
const toastDefault: ToastObjectType & { open: boolean } = {
    message: '', timeout: 0, open: false
}
export const toastAlertAtom = atom({
    key: "toastAlertKey",
    default: toastDefault
})

export const useToastAlert = () => {
    const setToastAlertAtom = useSetRecoilState(toastAlertAtom);

    const toastAlert: ToastAlertType = useCallback( (
        messageOfParamsOrToastObject: string | ToastObjectType,
        timeoutOfParams?: number,
        iconTypeOfParams?: ToastIconTypes
    ): void => {
        let message, timeout, iconType;

        if (typeof messageOfParamsOrToastObject === 'string') {
            message = messageOfParamsOrToastObject;
            timeout = timeoutOfParams;
            iconType = iconTypeOfParams;
        } else {
            message = messageOfParamsOrToastObject.message;
            timeout = messageOfParamsOrToastObject.timeout;
            iconType = messageOfParamsOrToastObject.iconType;
        }

        setToastAlertAtom({open: true, message, timeout: timeout || initialTimeout, iconType});
    },[setToastAlertAtom]);

    return ({ toastAlert })
}