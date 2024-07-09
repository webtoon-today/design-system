import type { Meta, StoryObj } from '@storybook/react';

import React, { useEffect, useRef, useState } from 'react';

import { GlobalToast, Toast } from './Toast';
import { useToastAlert } from './Recoil/Toast';
import { RecoilRoot } from 'recoil';

const meta = {
    title: 'feedback/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default= {
    render: () => {
        const [show, setShow] = useState(false);
        const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

        useEffect(() => {
            if (show) {
                timer.current = setTimeout(() => {
                    setShow(false);
                }, 3000);
            }
            return () => {
                clearTimeout(timer.current);
            };
        }, [show]);

        return (
            <div>
                <button onClick={() => setShow(true)} disabled={show}>toast</button>
                <Toast show={show} message={'hello'} />
            </div>
        )
    }
}

const ToastAlertHookContainer = () => {
    const { toastAlert } = useToastAlert();

    return (
        <div>
            <button onClick={() => toastAlert("hello")}>useToastAlertHook</button>
            <GlobalToast />
        </div>
    )
}

export const useToastAlertHook = {
    render: () => {
        return (
            <RecoilRoot>
                <ToastAlertHookContainer />
            </RecoilRoot>
        )
    }
}
