import { ReactNode, useCallback } from "react";
import { atom, useSetRecoilState } from "recoil";

const types = ["success", "warning", "error", "info"] as const
export type ToastIconTypes = typeof types[number] | undefined;

export type ToastObjectType = {
    message: string | ReactNode,
    timeout?: number,
    iconType?: ToastIconTypes,
    cta?: ReactNode
}

export type ToastAlertType = {
    (obj: ToastObjectType): void;
    (message: string, timeout?: number, iconType?: ToastIconTypes, cta?: ReactNode): void;
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
        iconTypeOfParams?: ToastIconTypes,
        ctaOfParams?: ReactNode
    ): void => {
        let message, timeout, iconType, cta;

        if (typeof messageOfParamsOrToastObject === 'string') {
            message = messageOfParamsOrToastObject;
            timeout = timeoutOfParams;
            iconType = iconTypeOfParams;
            cta = ctaOfParams;
        } else {
            message = messageOfParamsOrToastObject.message;
            timeout = messageOfParamsOrToastObject.timeout;
            iconType = messageOfParamsOrToastObject.iconType;
            cta = messageOfParamsOrToastObject.cta;
        }

        setToastAlertAtom({open: true, message, timeout: timeout || initialTimeout, iconType, cta});
    },[setToastAlertAtom]);

    return ({ toastAlert })
}