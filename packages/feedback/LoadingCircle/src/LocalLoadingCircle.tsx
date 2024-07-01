import React, { CSSProperties } from 'react';

import "./LoadingCircle.scss";
import { LoadingCircle } from './LoadingCircle';

export const LocalLoadingCircle = ({show}: { show: boolean }) => {

    return (<LoadingCircle 
        show={show}
        type={"Local"}
    />);
}