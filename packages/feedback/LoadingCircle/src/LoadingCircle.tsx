import React from 'react';

import { BaseLoadingCircle } from './BaseLoadingCircle';

import "./LoadingCircle.scss";
import { createPortal } from 'react-dom';

export const LoadingCircle = ({ show, isClient = false }: { show: boolean, isClient: boolean }) => {

    if ( !isClient ) {
        return <></>;
    }

    return (createPortal(<BaseLoadingCircle show={show} />,document.body));
}
