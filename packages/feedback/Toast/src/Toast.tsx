import React, { useEffect, useState } from 'react';

import { RecoilRoot, useRecoilValue } from 'recoil';

import { toastAlertAtom } from './Recoil/Toast';

import './Toast.scss';

const RootToast = ({ message, timeout = 3000, iconType } : { message: React.ReactNode, timeout?: number, iconType?: "error" | "success" | "warning" | "info" }) => {
    const [animationState, setAnimationState] = useState<'FadeIn' | 'FadeOut' | 'Close'>('Close');

    useEffect(()=>{
        setAnimationState('FadeIn');

        const timer = setTimeout(()=>{
            setAnimationState('FadeOut');
        }, timeout);

        return ()=>{
            clearTimeout(timer);
        }
    },[message, timeout]);

    return (
        <div className={`ToastBackgroundArea ${animationState}`} >
            <div className={`ToastBox ${ iconType ? "IconToast":""}`} >
                {iconType
                    ?<>
                        <img src={`https://static.webtoon.today/ddah/icon/icon_${iconType}.svg`} alt={iconType} width={20} height={20} style={{marginRight: 10}} />
                        {message}
                        <div className={'CheckButton'} onClick={()=>setAnimationState('FadeOut')} >
                            {'확인'}
                        </div>
                    </>
                    :message}
            </div>
        </div>
    )
}

export const Toast = () => {
    const toast = useRecoilValue(toastAlertAtom);

    const { message, timeout, iconType } = toast;

    return (
        <RecoilRoot>
            <RootToast message={message} timeout={timeout} iconType={iconType} />
        </RecoilRoot>
    );
}

export const WithOutReoilToast = RootToast;