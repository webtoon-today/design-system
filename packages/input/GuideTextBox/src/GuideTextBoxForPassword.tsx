
import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { TextBox } from './GuideTextBox';
import { guideTextType } from './Type';
import { getGuideTextType } from './Function';

import './GuideTextBox.scss';


export const GuideTextBoxForPassword = ({
    text, onChange, placeholder, guideTexts, maxLength = -1, isDisabled = false, isRequired=false, forcedGuideTextType,
    onKeyDown
} : {
    text: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    guideTexts: {[key in guideTextType]: string},
    maxLength?: number,
    isDisabled?: boolean,
    isRequired?: boolean,
    forcedGuideTextType?: guideTextType,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
}) => {
    const [hasClicked, setHasClicked] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const guideTextType = forcedGuideTextType || getGuideTextType({ 
        required: isRequired && hasClicked
    })

    return (
        <TextBox
            text={text}
            type={isVisible?'text':'password'}
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
            onBlur={() => { // for onClick of the button to happen first
                setTimeout(() => {
                    setHasClicked(true);
                    setIsFocused(false);
                }, 50);
            }}
            onKeyDown={onKeyDown}
        >
            <IconButton className='VerificationButton Visibility' onClick={() => setIsVisible(!isVisible)}>
                {isVisible?<VisibilityOff/>:<Visibility/>}
            </IconButton>
        </TextBox>
    )
}