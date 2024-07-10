import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';

import { RecoilRoot } from 'recoil';
import { useToastAlert } from './Recoil/Toast';
import { GlobalToast, Toast } from './Toast';

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

export const Default = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <div>
                <button onClick={() => setOpen(true)}>toast</button>
                <Toast open={open} onClose={() => setOpen(false)} message={args.message || 'hello'} iconType={args.iconType} timeout={args.timeout}/>
            </div>
        )
    }
}

const ToastAlertHookContainer = (args) => {
    const { toastAlert } = useToastAlert();

    return (
        <button onClick={() => toastAlert({ message: args.message || "hello", timeout: args.timeout, iconType: args.iconType })}>useToastAlertHook</button>
    )
}

/**
 * required `RecoilRoot` for `useToastAlert`
 */
export const useToastAlertHook = {
    render: (args) => {
        return (
            <RecoilRoot>
                <ToastAlertHookContainer {...args}/>
                <GlobalToast />
            </RecoilRoot>
        )
    }
}
