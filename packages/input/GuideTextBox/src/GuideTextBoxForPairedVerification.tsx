
import React, { ChangeEventHandler, useState } from 'react';

import { TextBox } from './GuideTextBox';
import { VerificationButton } from './VerificationButton';
import { buttonStatusType, guideTextType, purposeType, validationStatusType } from './Type';
import { getButtonStatusType, getGuideTextType } from './Function';

import './GuideTextBox.scss';


export const GuideTextBoxForPairedVerification = ({purpose, text, validationPattern, onChange, placeholder, guideTexts, maxLength = -1, validationStatus, secondStepValidationStatus, onClick, isDisabled = false, forcedGuideTextType} : {
    purpose: purposeType,
    text: string,
    validationPattern?: RegExp,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    guideTexts: {[key in guideTextType]: string},
    maxLength?: number,
    validationStatus: validationStatusType,
    secondStepValidationStatus: validationStatusType,
    onClick: Function,
    isDisabled?: boolean,
    forcedGuideTextType?: guideTextType
}) => {
    const [hasClicked, setHasClicked] = useState(false);
    const [isFocused, setIsFocused] = useState(false);            

    const guideTextType = forcedGuideTextType || getGuideTextType({ 
        required: hasClicked && validationStatus === 'undone' && !(isFocused && text.length > 0), 
        success : validationStatus === 'success' && secondStepValidationStatus === 'success' && !isFocused 
    })

    const buttonStatus: buttonStatusType = getButtonStatusType({
        inactivated: text.length === 0 || (validationStatus === 'success' && secondStepValidationStatus !== 'success') || (validationPattern && !validationPattern.test(text)),
        success: validationStatus === 'success' && secondStepValidationStatus === 'success' && !isFocused
    })

    return (
        <TextBox
            text={text}
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
                }, 100);
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