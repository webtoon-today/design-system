import React, { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler, ReactNode, useState } from 'react';

import { CSSProperties } from '@material-ui/core/styles/withStyles';

import { TextBox, guideTextType } from './GuideTextBox';

import './GuideTextBox.scss';


export const GuideTextBoxForGeneral = ({
    text, type, onChange, onBlur=()=>{}, placeholder, guideTexts, isRequired, isDisabled=false, maxLength = -1, forcedGuideTextType,
    onKeyDown, style, children
} : {
    text: string,
    type?: HTMLInputTypeAttribute,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onBlur?: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    guideTexts: {[key in guideTextType]: string},
    isRequired: boolean,
    isDisabled?:boolean,
    maxLength?: number,
    forcedGuideTextType?: guideTextType,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
    style?: CSSProperties,
    children?: ReactNode,
}) => {
    const [hasClicked, setHasClicked] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    let guideTextType: guideTextType = 'normal';
    if(isRequired && hasClicked && text.length === 0){
        guideTextType = 'required';
    }
    if(forcedGuideTextType){
        guideTextType = forcedGuideTextType;
    }
    return (
        <TextBox
            text={text}
            type={type}
            placeholder={placeholder}
            guideTextType={guideTextType}
            guideText={guideTexts[guideTextType]}
            maxLength={maxLength}
            isFocused={isFocused}
            isDisabled={isDisabled}
            onChange={onChange}
            onFocus={() => {
                setIsFocused(true);
            }}
            onBlur={(e) => {
                onBlur(e);
                setHasClicked(true);
                setIsFocused(false);
            }}
            onKeyDown={onKeyDown}
            style={style}
        >{children}</TextBox>
    )
}