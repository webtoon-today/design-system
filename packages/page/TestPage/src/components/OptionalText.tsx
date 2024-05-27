import React from "react";
import './OptionalText.scss';


/**
 * The component for optional text
 */
const OptionalText = ({
    option = 'red', 
    children
}: {
    /**
     * The color of the optional text
     * 
     * @default 'red'
     */
    option: 'red' | 'blue' | 'green',
    /**
     * The children of the component
     */
    children?: React.ReactNode
}) => {
    return (
        <div className={"OptionalText"}>
            <span className={option}>{children}</span>
        </div>
    )
}

export default OptionalText;