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
        const [open, setOpen] = useState(false);

        return (
            <div>
                <button onClick={() => setOpen(true)}>toast</button>
                <Toast open={open} message={'hello'} onClose={() => setOpen(false)}/>
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
