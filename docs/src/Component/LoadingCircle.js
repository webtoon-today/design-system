import React from 'react';

import "./LoadingCircle.css";

/**
 * 
 * @param {{show: boolean}} props
 * @returns 
 */
const LoadingCircle = ({show}) => {

    const [innerHeight, setInnerHeight] = React.useState(undefined);
    const [innerWidth, setInnerWidth] = React.useState(undefined);

    React.useEffect(()=>{
        const resizeListener = ()=>{
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
        }

        resizeListener();
        window.addEventListener('resize', resizeListener);

        return ()=>{
            window.removeEventListener('resize', resizeListener);
        }
    },[])

    return (<div className={`LoadingCircle ${show?'Show':''}`} style={{...{width: innerWidth, height: innerHeight}}}>

    </div>);
}

export default LoadingCircle;