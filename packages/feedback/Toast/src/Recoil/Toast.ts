import { ReactNode, useCallback } from "react";
import { atom, useSetRecoilState } from "recoil";

const types = ["success", "warning", "error", "info"] as const
export type toastIconTypes = typeof types[number];

export type toastObjectType = {
    message: string | ReactNode,
    timeout?: number,
    iconType?: toastIconTypes
}

export type toastAlertType = {
    (obj: toastObjectType): void;
    (message: string, timeout?: number, iconType?: toastIconTypes): void;
}

const initialTimeout = 3000;
const toastDefault: toastObjectType = {
    message: '', timeout: 0,
}
export const toastAlertAtom = atom({
    key: "toastAlertKey",
    default: toastDefault
})

export const useToastAlert = () => {
    const setToastAlertAtom = useSetRecoilState(toastAlertAtom);

    const toastAlert: toastAlertType = useCallback( (
        messageOfParamsOrToastObject: string | toastObjectType,
        timeoutOfParams?: number,
        iconTypeOfParams?: toastIconTypes
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

        setToastAlertAtom({message, timeout: timeout || initialTimeout, iconType});
    },[setToastAlertAtom])

    return ({ toastAlert })
}