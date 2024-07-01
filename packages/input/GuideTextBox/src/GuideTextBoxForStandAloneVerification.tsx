import React, { ChangeEventHandler, useState } from 'react';

import { TextBox, VerificationButton, buttonStatusType, guideTextType, purposeType, validationStatusType } from './GuideTextBox';

import './GuideTextBox.scss';


export const GuideTextBoxForStandAloneVerification = ({purpose, text, onChange, placeholder, guideTexts, maxLength = -1, validationStatus, onClick, isDisabled = false, forcedGuideTextType} : {
    purpose: purposeType,
    text: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    guideTexts: {[key in guideTextType]: string},
    maxLength?: number,
    validationStatus: validationStatusType,
    onClick: Function,
    isDisabled?: boolean,
    forcedGuideTextType?: guideTextType
}) => {
    const [hasClicked, setHasClicked] = useState(false);
    const [isFocused, setIsFocused] = useState(false);            

    let guideTextType: guideTextType = 'normal';
    if(hasClicked && validationStatus === 'undone'){
        guideTextType = 'required';
    } else if(validationStatus === 'success'){
        guideTextType = 'success';
    } else if(validationStatus === 'fail'){
        guideTextType = 'fail';
    }
    if(forcedGuideTextType){
        guideTextType = forcedGuideTextType;
    }

    let buttonStatus: buttonStatusType = 'activated';
    if(text.length === 0){
        buttonStatus = 'inactivated';
    } else if(validationStatus === 'pending'){
        buttonStatus = 'pending';
    } else if(validationStatus === 'success' && !isFocused){
        buttonStatus = 'success';
    } else if(validationStatus === 'fail' && !isFocused){
        buttonStatus = 'fail';
    }

    return (
        <TextBox
            text={text}
            placeholder={placeholder}
            guideTextType={guideTextType}
            guideText={guideTexts[guideTextType]}
            maxLength={maxLength}
            isFocused={isFocused}
            isDisabled={isDisabled || validationStatus === 'pending'}
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
        >
            <VerificationButton
                purpose={purpose}
                status={buttonStatus}
                onClick={onClick}
            />
        </TextBox>
    )
}