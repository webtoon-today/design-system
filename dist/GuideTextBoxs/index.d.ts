import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ChangeEventHandler, ReactNode } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type guideTextType = 'initial' | 'normal' | 'success' | 'fail' | 'required';
type purposeType = 'uniqueness' | 'verification' | 'send';
type validationStatusType = 'undone' | 'pending' | 'success' | 'fail';
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
declare const GuideTextBoxForStandAloneVerification: ({ purpose, text, type, onChange, placeholder, guideTexts, maxLength, validationStatus, onClick, isDisabled, forcedGuideTextType }: {
    purpose: purposeType;
    text: string;
    type?: React.HTMLInputTypeAttribute | undefined;
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
declare const GuideTextBoxForPairedVerification: ({ purpose, text, type, validationPattern, onChange, placeholder, guideTexts, maxLength, validationStatus, secondStepValidationStatus, onClick, isDisabled, forcedGuideTextType }: {
    purpose: purposeType;
    text: string;
    type?: React.HTMLInputTypeAttribute | undefined;
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

export { GuideTextBoxForGeneral, GuideTextBoxForPairedVerification, GuideTextBoxForPassword, GuideTextBoxForStandAloneVerification, type validationStatusType };
