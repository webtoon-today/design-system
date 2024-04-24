import React, { CSSProperties, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { DrawerContext } from "./PortalDrawer";
import useAnimation from "./useAnimation";

import './NestedCascadeDrawer.scss';

export type nestedDrawerPropsType = {
    children: ReactNode,
    open: boolean, onClose: Function
    className?: string,
    style?:CSSProperties,
}

let drawerId = 0;

export const NestedCascadeDrawer = ({ 
    children, 
    open, onClose,
    className = "", style = {},
}: nestedDrawerPropsType ) => {
    
    const context = useContext(DrawerContext);

    if (context === null) { 
        throw new Error('NestedCascadeDrawer must be used PortalDrawer as parent.');
    }

    const { nestedDrawerIdList, setNestedDrawerIdList } = context;
    
    const { isRender, onTransitionEnd, isAnimating } = useAnimation(open);

    const [id] = useState(()=> drawerId++);

    const depth = useMemo(() => {
        const idIndex = nestedDrawerIdList.findIndex((v) => v === id);
        return idIndex >= 0 
            ? nestedDrawerIdList.length - (1 + idIndex)
            : 0;
    }, [nestedDrawerIdList, id]);
    
    useEffect(() => {
        if (open) {
            setNestedDrawerIdList((prev)=>[...prev, id]);
        } else {
            setNestedDrawerIdList((prev)=>prev.filter((v) => v !== id));
        }
    },[open, id]);
        
    return (
        <div 
            className={['BackgroundScreen', className, !isAnimating ? "DrawerOut" : ""].filter((v)=>v).join(' ')} 
            style={{...style, ...isRender ? {} : {display: 'none'}}}
            onTransitionEnd={onTransitionEnd} 
            onAnimationEnd={onTransitionEnd} 
            onClick={() => onClose()}
        >
            <div 
                className={`CascadeDrawer`}
                data-depth={depth}
                onClick={(e)=>e.stopPropagation()}
            >
                <div className={'DrawerInner'}>
                    {children}
                </div>
            </div>
        </div>
    )
}
