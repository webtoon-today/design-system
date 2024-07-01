import React, { ChangeEventHandler, useState } from 'react';

import { TextBox } from './GuideTextBox';
import { VerificationButton } from './VerificationButton';
import { buttonStatusType, guideTextType, purposeType, validationStatusType } from './Type';
import { getButtonStatusType, getGuideTextType } from './Function';

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
    
    const guideTextType = forcedGuideTextType || getGuideTextType({ 
        required: hasClicked && validationStatus === 'undone', 
        success : validationStatus === 'success',
        fail    : validationStatus === 'fail', 
    })

    const buttonStatus: buttonStatusType = getButtonStatusType({
        inactivated: text.length === 0,
        pending: validationStatus === 'pending',
        success: validationStatus === 'success' && !isFocused,
        fail: validationStatus === 'fail'       && !isFocused,
    })

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