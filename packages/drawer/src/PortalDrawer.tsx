import React, { Dispatch, createContext, useState } from "react";
import { createPortal } from 'react-dom';
import { NestedCascadeDrawer, nestedDrawerPropsType } from "./NestedCascadeDrawer";

export const DrawerContext = createContext<{
    nestedDrawerIdList: number[]; 
    setNestedDrawerIdList: Dispatch<React.SetStateAction<number[]>>;
} | null>(null);

export const PortalDrawer = ({
    isClient = false, container = document.body,
    ...props
}:{ isClient: boolean, container?: Element | DocumentFragment | null} & nestedDrawerPropsType
) => {

    if ( !isClient ) {
        return <></>;
    }
    
    const [ nestedDrawerIdList, setNestedDrawerIdList ] = useState<number[]>([]);

    return (
        createPortal(
            <DrawerContext.Provider value={{nestedDrawerIdList, setNestedDrawerIdList}}>
                <NestedCascadeDrawer {...props} />
            </DrawerContext.Provider>, 
            container || document.body
        )
    )
}