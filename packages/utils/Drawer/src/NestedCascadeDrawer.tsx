import { CSSProperties, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { DrawerContext } from "./DrawerContext";
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
        const index = nestedDrawerIdList.findIndex((v) => v === id);
        if (index === -1) {
            return index;
        };
        return nestedDrawerIdList.length - (index + 1);
    }, [nestedDrawerIdList, id]);
    
    useEffect(() => {
        if (open) {
            setNestedDrawerIdList((prev)=>[...prev, id]);
        } else {
            setNestedDrawerIdList((prev)=>prev.filter((v) => v !== id));
        }

        return ()=>{
            setNestedDrawerIdList((prev)=>prev.filter((v) => v !== id));
        }
    },[open, id]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (Math.max(...nestedDrawerIdList) === id) {
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [nestedDrawerIdList, id]);

    return (
        <div 
            className={['BackgroundScreen', className, !isAnimating ? "DrawerOut" : ""].filter(Boolean).join(' ')}
            style={{...style, ...!isRender ? {display: 'none'} : {}}}
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
