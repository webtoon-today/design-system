import React, { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import './NestedCascadeDrawer.scss';
import UseAnimation from "./UseAnimation";

export type nestedDrawerPropsType = {
    children: ReactNode,
    open: boolean, onClose: Function,
    hasModal?: boolean,
    className?: string,
    style?:CSSProperties,
}

export const NestedCascadeDrawer = ({ 
    children, open, onClose: givenOnClose, hasModal=false, className = "", style,
}: nestedDrawerPropsType) => {
    const ref = useRef<HTMLDivElement>(null);

    const [ depth, setDepth ] = useState<number>(0);
    const { isRender, onTransitionEnd, isAnimating } = UseAnimation(open);

    useEffect(()=>{
        const handleDrawerOpen = ()=> {
            const depth = (ref?.current?.querySelectorAll('.DrawerOn > .CascadeDrawer') || []).length;
            setDepth(depth)
            ref?.current?.querySelector('.CascadeDrawer')?.setAttribute('data-depth', `${depth}` )
            console.log("event received", depth)
        };
        window.addEventListener('drawerOpen', handleDrawerOpen);
        window.addEventListener('drawerClose', handleDrawerOpen);

        handleDrawerOpen();

        return ()=>{
            window.removeEventListener('drawerOpen', handleDrawerOpen);
            window.removeEventListener('drawerClose', handleDrawerOpen);
        }
    },[])

    useEffect(()=>{
        const drawerOpenEvent = new CustomEvent('drawerOpen');

        window.dispatchEvent(drawerOpenEvent);

    },[open, isAnimating])


    const handleClose = useCallback(()=>{

        if ( !ref?.current ){ return; }

        if ( hasModal ) { return; }

        givenOnClose();

    },[givenOnClose, hasModal, open])
    
    if (!isRender) {
        return <></>;
    }
    
    return (
    <div 
        className={`BackgroundScreen ${className} ${isAnimating?"DrawerOn":"DrawerOff"}`} 
        onTransitionEnd={onTransitionEnd} 
        onAnimationEnd={onTransitionEnd} 
        ref={ref} 
        onClick={handleClose}  
    >
            <div className={`CascadeDrawer`}
                {...{"data-depth": depth}}
                onClick={(e)=>{
                    e.stopPropagation();
                }}
            >
                <div className={'DrawerInner'}>
                    {children}
                </div>
            </div>
        </div>)
}
