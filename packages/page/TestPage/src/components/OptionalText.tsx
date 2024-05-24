import React from "react";
import './OptionalText.scss';

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
            <span>optional text</span>
            <div className={option}>{children}</div>
        </div>
    )
}

export default OptionalText;