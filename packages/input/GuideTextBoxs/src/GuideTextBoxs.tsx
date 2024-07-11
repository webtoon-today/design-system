import React, { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler, ReactNode, useState } from 'react';
import './GuideTextBoxs.scss';
import { capitalizeFirstLetter } from './Functions';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type guideTextType = 'initial' | 'normal' | 'success' | 'fail' | 'required';
type purposeType = 'uniqueness' | 'verification' | 'send';
export type validationStatusType = 'undone' | 'pending' | 'success' | 'fail';
type buttonStatusType = 'activated' | 'inactivated' | 'pending' | 'success' | 'fail';


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

    let guideTextType: guideTextType = 'normal';
    if(isRequired && hasClicked ){
        guideTextType = 'required';
    }
    if(forcedGuideTextType){
        guideTextType = forcedGuideTextType;
    }

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

export const GuideTextBoxForStandAloneVerification = ({purpose, text, type, onChange, placeholder, guideTexts, maxLength = -1, validationStatus, onClick, isDisabled = false, forcedGuideTextType} : {
    purpose: purposeType,
    text: string,
    type?: HTMLInputTypeAttribute,
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
            type={type}
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

export const GuideTextBoxForPairedVerification = ({purpose, text, type, validationPattern, onChange, placeholder, guideTexts, maxLength = -1, validationStatus, secondStepValidationStatus, onClick, isDisabled = false, forcedGuideTextType} : {
    purpose: purposeType,
    text: string,
    type?: HTMLInputTypeAttribute,
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

    let guideTextType: guideTextType = 'normal';
    if(hasClicked && validationStatus === 'undone' && !(isFocused && text.length > 0)){
        guideTextType = 'required';
    } else if(validationStatus === 'success' && secondStepValidationStatus === 'success' && !isFocused){
        guideTextType = 'success';
    }
    if(forcedGuideTextType){
        guideTextType = forcedGuideTextType;
    }

    let buttonStatus: buttonStatusType = 'activated';
    if(text.length === 0 || (validationStatus === 'success' && secondStepValidationStatus !== 'success') || (validationPattern && !validationPattern.test(text))){
        buttonStatus = 'inactivated';
    } else if(validationStatus === 'success' && secondStepValidationStatus === 'success' && !isFocused){
        buttonStatus = 'success';
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


const TextBox = ({
    children, text, placeholder, guideTextType, guideText, maxLength, onChange, onFocus, onBlur, onKeyDown,
    isFocused, isDisabled, type, style
} : {
    children?: ReactNode,
    text: string,
    placeholder: string,
    guideTextType: guideTextType,
    guideText: string,
    maxLength: number,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onFocus: FocusEventHandler<HTMLInputElement>,
    onBlur: FocusEventHandler<HTMLInputElement>,
    isFocused: boolean,
    isDisabled: boolean,
    type?: HTMLInputTypeAttribute,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
    style?: CSSProperties,
}) => {
    let textboxClassList = ['TextBox'];
    if(isDisabled){
        textboxClassList.push('Disabled');
    }
    if(isFocused){
        textboxClassList.push('Focused');
    }
    return (
        <div className={'TextBoxContainer'}>
            <div className={textboxClassList.join(' ')} style={style}>
                <input
                    placeholder={placeholder}
                    value={text}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={isDisabled}
                    type={type}
                    onKeyDown={onKeyDown}
                    style={{fontFamily: 'inherit', fontSize: 'inherit'}}
                />
                {children}
            </div>
            {guideText && 
            <div className={'TextBoxGuide'}>
                <span className={capitalizeFirstLetter(guideTextType)}>{guideText}</span>
                {maxLength >= 0 && <span className={'LetterCount'}>{`${text.length}/${maxLength}`}</span>}
            </div>}
        </div>
    );
};



const buttonSrc: {[purpose in purposeType] : {[status in buttonStatusType] : [`http${'' | 's'}://${string}`, ReactNode]}} = {
    uniqueness: {
        activated: ['https://static.webtoon.today/ddah/button/button_primary.png', <span>{'중복확인'}</span>],
        inactivated: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <span>{'중복확인'}</span>],
        pending: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <img className={'Spinner'} src={'https://static.webtoon.today/ddah/icon/icon_spinner.png'} alt={'spinner'}/>],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', <></>],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', <></>],
    },
    verification: {
        activated: ['https://static.webtoon.today/ddah/button/button_secondary.png', <span>{'확인'}</span>],
        inactivated: ['https://static.webtoon.today/ddah/button/button_secondary_light.png', <span>{'확인'}</span>],
        pending: ['https://static.webtoon.today/ddah/button/button_secondary_light.png', <img className={'Spinner'} src={'https://static.webtoon.today/ddah/icon/icon_spinner.png'} alt={'spinner'}/>],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', <></>],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', <></>],
    },
    send: {
        activated: ['https://static.webtoon.today/ddah/button/button_primary.png', <span>{'인증'}</span>],
        inactivated: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <span>{'인증'}</span>],
        pending: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <img className={'Spinner'} src={'https://static.webtoon.today/ddah/icon/icon_spinner.png'} alt={'spinner'}/>],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', <></>],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', <></>],
    },
}
const VerificationButton = ({purpose, status, onClick} : {
    purpose: purposeType,
    status: buttonStatusType,
    onClick: Function
}) => {
    const buttonContent = buttonSrc[purpose][status][1];
    
    return (
        <div
            className={`VerificationButton ${capitalizeFirstLetter(status)}`}
            onClick={() => {
                if(status === 'activated'){
                    onClick();
                }
            }}
            tabIndex={0}
        >
            <img
                className={`Background`}
                src={buttonSrc[purpose][status][0]}
                alt={status}
            />
            {buttonContent}
        </div>
    )
}