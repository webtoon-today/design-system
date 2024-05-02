
import { useEffect, useState } from "react";


const UseAnimation = ( condition: boolean ) => {

    const [ isComplete, setIsComplete ] = useState<boolean>(false);

    useEffect(() => {
        if (condition) {
            setIsComplete(true);
        }
    },[condition])

    const isRender     = condition || isComplete;
    const isAnimating = condition && isComplete

    const onTransitionEnd = (): void => {
        if ( !condition ) {
            setIsComplete(false);
        }
    }
    
    return({ isRender, onTransitionEnd, isAnimating })
}

export default UseAnimation;