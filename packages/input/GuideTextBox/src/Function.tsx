import React from 'react';
import { buttonStatusType, guideTextType } from "./Type";


export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getGuideTextType = (conditions: {[key in guideTextType]?: boolean}) => {
    const foundType = ([ "required", "success", "fail"  ] as const).find( type => conditions[type] )
    
    return foundType ? foundType : 'normal';
}

export const getButtonStatusType = (conditions: {[key in buttonStatusType]?: boolean}) => {
    const foundType = (['inactivated', 'pending', 'success', 'fail' ] as const).find( type => conditions[type])
    
    return  foundType ? foundType : 'activated';
}
