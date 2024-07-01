import React from 'react';

import { LoadingCircle } from './LoadingCircle';

import "./LoadingCircle.scss";
import { createPortal } from 'react-dom';

export const GlobalLoadingCircle = ({ show, isClient = false }: { show: boolean, isClient: boolean }) => {

    if ( !isClient ) {
        return <></>;
    }

    return (createPortal(<LoadingCircle type={'Global'} show={show} />,document.body));
}
