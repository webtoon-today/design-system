
import React, { useEffect, useState } from "react";

const useAnimation = ( condition: boolean ) => {
    const [ isComplete, setIsComplete ] = useState(condition);

    useEffect(() => {
        if (condition) {
            setIsComplete(true);
        }
    },[condition]);

    const isRender    = condition || isComplete;
    const isAnimating = condition && isComplete;

    const onTransitionEnd = () => {
        if ( !condition ) {
            setIsComplete(false);
        }
    }
    
    return { isRender, onTransitionEnd, isAnimating };
}

export default useAnimation;