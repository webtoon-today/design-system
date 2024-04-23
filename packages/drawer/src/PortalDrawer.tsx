import React from "react";
import { NestedCascadeDrawer, nestedDrawerPropsType } from "./NestedCascadeDrawer";
import { createPortal } from 'react-dom';

export const PortalDrawer = ({isClient, ...props}:{ isClient: boolean } & nestedDrawerPropsType) => {

    if ( !isClient ) {
        return <></>;
    } 
    
    return(
        createPortal(
            <NestedCascadeDrawer {...props} />, 
            document.body
        )
    )
}