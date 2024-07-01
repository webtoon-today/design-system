import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ChangeEventHandler, ReactNode, FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler, CSSProperties as CSSProperties$1 } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type guideTextType = 'initial' | 'normal' | 'success' | 'fail' | 'required';
type purposeType = 'uniqueness' | 'verification' | 'send';
type validationStatusType = 'undone' | 'pending' | 'success' | 'fail';
type buttonStatusType = 'activated' | 'inactivated' | 'pending' | 'success' | 'fail';

declare const GuideTextBoxForStandAloneVerification: ({ purpose, text, onChange, placeholder, guideTexts, maxLength, validationStatus, onClick, isDisabled, forcedGuideTextType }: {
    purpose: purposeType;
    text: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    guideTexts: {
        initial: string;
        normal: string;
        success: string;
        fail: string;
        required: string;
    };
    maxLength?: number | undefined;
    validationStatus: validationStatusType;
    onClick: Function;
    isDisabled?: boolean | undefined;
    forcedGuideTextType?: guideTextType | undefined;
}) => react_jsx_runtime.JSX.Element;

declare const GuideTextBoxForGeneral: ({ text, type, onChange, onBlur, placeholder, guideTexts, isRequired, isDisabled, maxLength, forcedGuideTextType, onKeyDown, style, children }: {
    text: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    placeholder: string;
    guideTexts: {
        initial: string;
        normal: string;
        success: string;
        fail: string;
        required: string;
    };
    isRequired: boolean;
    isDisabled?: boolean | undefined;
    maxLength?: number | undefined;
    forcedGuideTextType?: guideTextType | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    style?: CSSProperties | undefined;
    children?: ReactNode;
}) => react_jsx_runtime.JSX.Element;

declare const GuideTextBoxForPassword: ({ text, onChange, placeholder, guideTexts, maxLength, isDisabled, isRequired, forcedGuideTextType, onKeyDown }: {
    text: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    guideTexts: {
        initial: string;
        normal: string;
        success: string;
        fail: string;
        required: string;
    };
    maxLength?: number | undefined;
    isDisabled?: boolean | undefined;
    isRequired?: boolean | undefined;
    forcedGuideTextType?: guideTextType | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}) => react_jsx_runtime.JSX.Element;

declare const GuideTextBoxForPairedVerification: ({ purpose, text, validationPattern, onChange, placeholder, guideTexts, maxLength, validationStatus, secondStepValidationStatus, onClick, isDisabled, forcedGuideTextType }: {
    purpose: purposeType;
    text: string;
    validationPattern?: RegExp | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    guideTexts: {
        initial: string;
        normal: string;
        success: string;
        fail: string;
        required: string;
    };
    maxLength?: number | undefined;
    validationStatus: validationStatusType;
    secondStepValidationStatus: validationStatusType;
    onClick: Function;
    isDisabled?: boolean | undefined;
    forcedGuideTextType?: guideTextType | undefined;
}) => react_jsx_runtime.JSX.Element;

declare const TextBox: ({ children, text, placeholder, guideTextType, guideText, maxLength, onChange, onFocus, onBlur, onKeyDown, isFocused, isDisabled, type, style }: {
    children?: ReactNode;
    text: string;
    placeholder: string;
    guideTextType: guideTextType;
    guideText: string;
    maxLength: number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onFocus: FocusEventHandler<HTMLInputElement>;
    onBlur: FocusEventHandler<HTMLInputElement>;
    isFocused: boolean;
    isDisabled: boolean;
    type?: HTMLInputTypeAttribute;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    style?: CSSProperties$1;
}) => react_jsx_runtime.JSX.Element;

declare const VerificationButton: ({ purpose, status, onClick }: {
    purpose: purposeType;
    status: buttonStatusType;
    onClick: Function;
}) => react_jsx_runtime.JSX.Element;

export { GuideTextBoxForGeneral, GuideTextBoxForPairedVerification, GuideTextBoxForPassword, GuideTextBoxForStandAloneVerification, TextBox, VerificationButton, type buttonStatusType, type guideTextType, type purposeType, type validationStatusType };
