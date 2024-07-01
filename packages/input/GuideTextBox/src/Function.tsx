import React from 'react';
import { buttonStatusType, guideTextType } from "./Type";


export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getGuideTextType = (conditions: {[key in guideTextType]?: boolean}) => {
    const foundType = ([ "fail", "success", "required" ] as const).find( type => conditions[type] )
    
    return foundType ? foundType : 'normal';
}

export const getButtonStatusType = (conditions: {[key in buttonStatusType]?: boolean}) => {
    const foundType = (['inactivated', 'fail', 'success', 'pending'] as const).find( type => conditions[type])
    
    return  foundType ? foundType : 'activated';
}
