import React, { CSSProperties } from 'react';

import "./LoadingCircle.scss";

export const BaseLoadingCircle = ({ show, isLocal = false, style }: { show: boolean, isLocal?: boolean, style?: CSSProperties }) => {

    return (<div className={`LoadingCircle Animated ${show?'Show':''} ${isLocal?'Local':'Global'}`}>
        {["Bottom","Left","Top","Right","Center"].map(
            direction => <div key={direction} className={`Holder ${direction}`} > 
                <div className={"Circle"} />
            </div>)}
    </div>);
}