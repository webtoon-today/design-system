import React, { useState } from "react";
import { createPortal } from 'react-dom';
import { NestedCascadeDrawer, nestedDrawerPropsType } from "./NestedCascadeDrawer";
import { DrawerContextProvider } from "./DrawerContext";

export const PortalDrawer = ({
    isClient = false, container,
    ...props
}:{ isClient: boolean, container?: Element | DocumentFragment | null} & nestedDrawerPropsType
) => {

    if ( !isClient ) {
        return <></>;
    }
    
    const [ nestedDrawerIdList, setNestedDrawerIdList ] = useState<number[]>([]);

    return (
        createPortal(
            <DrawerContextProvider value={{nestedDrawerIdList, setNestedDrawerIdList}}>
                <NestedCascadeDrawer {...props} />
            </DrawerContextProvider>, 
            container || document.body
        )
    )
}