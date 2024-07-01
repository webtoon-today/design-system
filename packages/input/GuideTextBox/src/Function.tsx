import { guideTextType } from "./Type";


export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getGuideTextType = (conditions: {[key in guideTextType]?: boolean}) => {
    if(conditions['required']){
        return 'required';
    }
    if(conditions['success']){
        return 'success';
    }
    if(conditions['fail']){
        return 'fail';
    }
    return 'normal';
}
