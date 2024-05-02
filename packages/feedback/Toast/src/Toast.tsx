import React from 'react';
import { toastAlertAtom } from './Recoil/Toast';
import { RecoilRoot, useRecoilValue } from 'recoil';

import './Toast.scss';

export const Toast = () => {
    const toast = useRecoilValue(toastAlertAtom);
    const [animationState, setAnimationState] = React.useState<'FadeIn' | 'FadeOut' | 'Close'>('Close');

    React.useEffect(()=>{
        if (!toast.message) {
            return;
        }

        setAnimationState('FadeIn');

        const timer = setTimeout(()=>{
            setAnimationState('FadeOut');
        }, toast.timeout);

        return ()=>{
            clearTimeout(timer);
        }
    },[toast])

    return (
        <RecoilRoot>
            <div className={`ToastBackgroundArea ${animationState}`} >
                <div className={`ToastBox ${toast && toast.iconType?"IconToast":""}`} >
                    {toast && toast.iconType
                        ?<>
                            <img src={`https://static.webtoon.today/ddah/icon/icon_${toast.iconType}.svg`} alt={toast.iconType} width={20} height={20} style={{marginRight: 10}} />
                            {toast.message}
                            <div className={'CheckButton'} onClick={()=>setAnimationState('FadeOut')} >
                                {'확인'}
                            </div>
                        </>
                        :toast.message}
                </div>
            </div>
        </RecoilRoot>
    )
}