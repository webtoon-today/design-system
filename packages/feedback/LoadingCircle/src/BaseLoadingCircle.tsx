import React, { CSSProperties } from 'react';

import "./LoadingCircle.scss";

export const BaseLoadingCircle = ({ show, type = 'Global', style }: { show: boolean, type?: 'Global'|'Local', style?: CSSProperties }) => {

    return (<div className={`LoadingCircle Animated ${show?'Show':''} ${type}`}>
        {["Bottom","Left","Top","Right","Center"].map(
            direction => <div key={direction} className={`Holder ${direction}`} > 
                <div className={"Circle"} />
            </div>)}
    </div>);
}