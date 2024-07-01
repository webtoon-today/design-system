import React, { CSSProperties } from 'react';

import "./LoadingCircle.scss";
import { BaseLoadingCircle } from './BaseLoadingCircle';

export const LocalLoadingCircle = ({show}: { show: boolean }) => {

    return (<BaseLoadingCircle 
        show={show}
        isLocal={true}
    />);
}