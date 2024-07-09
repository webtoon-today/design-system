import React, { useCallback, useEffect, useRef, useState } from 'react';

import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { toastAlertAtom } from './Recoil/Toast';

import './Toast.scss';

const ANIMATION_DURATION = 287;

const RootToast = ({ 
    show, onClose,
    message, timeout = 3000, iconType
} : {
    show: boolean, onClose?: () => void, 
    message: React.ReactNode, timeout?: number, iconType?: "error" | "success" | "warning" | "info" 
}) => {
    const [animationState, setAnimationState] = useState<'FadeIn' | 'FadeOut' | 'Close'>('Close');

    const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);


    const handleClose = useCallback(() => {
        setAnimationState('FadeOut');
        
        if (!!onClose) {
            closeTimer.current = setTimeout(onClose, ANIMATION_DURATION);
        }

    }, [onClose]);

    useEffect(() => {
        if (!show) {
            return;
        }

        setAnimationState('FadeIn');

        const timer = setTimeout(handleClose, timeout);

        return ()=>{
            clearTimeout(timer);
        }
    }, [message, timeout, show]);

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
                        <div className={'CheckButton'} onClick={handleClose} >
                            {'확인'}
                        </div>
                    </>
                    :message}
            </div>
        </div>
    )
}

export const GlobalToast = () => {
    const { show, message, timeout, iconType } = useRecoilValue(toastAlertAtom);
    const setToastAlertAtom = useSetRecoilState(toastAlertAtom);

    return (
        <RecoilRoot>
            <RootToast show={show} onClose={() => setToastAlertAtom({show: false, message: ''})} {...{message, timeout, iconType}} />
        </RecoilRoot>
    );
}

export const Toast = RootToast;