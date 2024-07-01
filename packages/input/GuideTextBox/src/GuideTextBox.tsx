import React, { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler, ReactNode } from 'react';

import { CSSProperties } from 'react';

import { capitalizeFirstLetter } from './Function';
import { guideTextType } from './Type';

import './GuideTextBox.scss';

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
    const textboxClassList = [
        'TextBox',
        isDisabled && 'Disabled',
        isFocused  && 'Focused' ,
    ] as const;

    return (
        <div className={'TextBoxContainer'}>
            <div className={textboxClassList.filter(Boolean).join(' ')} style={style}>
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
