import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { toastAlertAtom } from './Recoil/Toast';

import './Toast.scss';

const ANIMATION_DURATION = 287;

const RootToast = ({ 
    open, onClose,
    message, timeout = 3000, iconType, cta
} : {
    open: boolean, onClose?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void, 
    message: React.ReactNode, timeout?: number, iconType?: "error" | "success" | "warning" | "info" | undefined, cta?: ReactNode | undefined
}) => {
    const [animationState, setAnimationState] = useState<'FadeIn' | 'FadeOut' | 'Close'>('Close');

    const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const handleClose = useCallback((e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnimationState('FadeOut');
        
        if (!!onClose) {
            closeTimer.current = setTimeout(() => onClose(e), ANIMATION_DURATION);
        }
    }, [onClose]);

    useEffect(() => {
        if (!open) {
            return;
        }

        setAnimationState('FadeIn');

        const timer = setTimeout(handleClose, timeout);

        return ()=>{
            clearTimeout(timer);
        }
    }, [open, timeout, handleClose]);

    useEffect(() => {
        return () => {
            clearTimeout(closeTimer.current);
        }
    }, []);

    if (!message) {
        return null;
    }

    return (
        <div className={`ToastBackgroundArea ${animationState}`}>
            <div className={`ToastBox ${ iconType ? "IconToast":""}`} >
                {iconType
                    ?<>
                        <img src={`https://static.webtoon.today/ddah/icon/icon_${iconType}.svg`} alt={iconType} width={20} height={20} style={{marginRight: 10}} />
                        {message}
                        {cta ?? <div className={'CheckButton'} onClick={handleClose} >
                            {'확인'}
                        </div>}
                    </>
                    :message}
            </div>
        </div>
    )
}

export const GlobalToast = () => {
    const { open, message, timeout, iconType } = useRecoilValue(toastAlertAtom);
    const setToastAlertAtom = useSetRecoilState(toastAlertAtom);

    return (
        <RootToast open={open} onClose={() => setToastAlertAtom({open: false, message: ''})} {...{message, timeout, iconType}} />
    );
}

export const Toast = RootToast;