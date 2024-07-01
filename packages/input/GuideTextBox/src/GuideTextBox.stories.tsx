import React, { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { GuideTextBoxForGeneral } from './GuideTextBoxForGeneral';
import { GuideTextBoxForPairedVerification } from './GuideTextBoxForPairedVerification';
import { GuideTextBoxForPassword } from './GuideTextBoxForPassword';
import { GuideTextBoxForStandAloneVerification } from './GuideTextBoxForStandAloneVerification';


const meta = {
    title: 'input/GuideTextBox',
    component: GuideTextBoxForGeneral,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof GuideTextBoxForGeneral>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
    const [ value , setValue ] = useState<string>('');

    return(<div style={{width: 400}}>
        <GuideTextBoxForGeneral
            text={value}
            guideTexts={{
                initial: "",
                required: "필수 항목을 입력해주세요.",
                normal: "해당 값은 분석에 도움이 됩니다.",
                fail: "",
                success: "",
            }}
            placeholder={"Placeholder"}
            onChange={(e) => setValue(e.target.value)}
            isRequired
        />
    </div>)
}

export const BoxForPassword = () => {

    const [ password , setPassword ] = useState<string>('');

    return (<div style={{width: 400}} >
        <GuideTextBoxForPassword
            text={password}
            onChange={(e: any) => setPassword( e.target.value )}
            placeholder={"숫자, 영문, 특수문자 조합 최소 6자"}
            guideTexts={{
                initial: '',
                required: '필수 입력 정보입니다.',
                normal: '',
                fail: '',
                success: '',
            }}
            isRequired={true}
            forcedGuideTextType={password && password.length < 6?'fail':'normal'}
        />
    </div>)   
}

type validationStatusType = 'undone' | 'pending' | 'success' | 'fail';

export const BoxForPairedVerification = () => {

    const [ email, setEmail ] = useState<string>('');
    const [ otp, setOtp ] = useState<string>('');
    const [ emailValidationStatus, setEmailValidationStatus ] = useState<validationStatusType>(!otp?'undone':'success');
    const [ emailKeyValidationStatus, setEmailKeyValidationStatus ] = useState<validationStatusType>(!otp?'undone':'success');

    
    return (<div style={{display: 'flex', flexDirection: 'column', width: 400, gap: 8}}>
        <GuideTextBoxForPairedVerification
            purpose={'send'}
            text={email}
            validationPattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})*$/}
            placeholder={'이메일을 입력해주세요.'}
            onChange={(e) => {
                const newText = e.target.value.trim();
                setEmail(newText);

                    if (emailValidationStatus === 'success'){
                        setEmailValidationStatus('undone');
                    }
                }}
                guideTexts={{
                    initial: '',
                    normal: '',
                    success: '인증되었어요.',
                    fail: '',
                    required: '인증을 완료해주세요.'
                }}
                validationStatus={emailValidationStatus}
                secondStepValidationStatus={emailKeyValidationStatus}
                onClick={() => {
                    setEmailValidationStatus('success');
                }}
                isDisabled={emailKeyValidationStatus === 'success'}
            />
            {( emailValidationStatus === 'success' && emailKeyValidationStatus !== 'success') &&  
                <GuideTextBoxForStandAloneVerification
                    purpose={'verification'}
                    text={otp}
                    placeholder={'인증 키를 입력하세요'}
                    onChange={(e) => {
                        const newText = e.target.value.trim();
                        setOtp(newText);
                        setEmailKeyValidationStatus('undone');
                    }}
                    guideTexts={{
                        initial: '',
                        normal: '',
                        success: '',
                        fail: '인증키를 다시 확인해주세요.',
                        required: '인증을 완료해주세요.'
                    }}
                    validationStatus={emailKeyValidationStatus}
                    onClick={async () => {
                        setEmailKeyValidationStatus('pending');

                        setEmailKeyValidationStatus('success');
                    }}
                />}
        </div>
    )
}