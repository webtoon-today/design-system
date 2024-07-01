import React, { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler, ReactNode } from 'react';

import { CSSProperties } from '@material-ui/core/styles/withStyles';

import './GuideTextBox.scss';

export type guideTextType = 'initial' | 'normal' | 'success' | 'fail' | 'required';
export type purposeType = 'uniqueness' | 'verification' | 'send';
export type validationStatusType = 'undone' | 'pending' | 'success' | 'fail';
export type buttonStatusType = 'activated' | 'inactivated' | 'pending' | 'success' | 'fail';

export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;


export const TextBox = ({
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

export const VerificationButton = ({purpose, status, onClick} : {
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