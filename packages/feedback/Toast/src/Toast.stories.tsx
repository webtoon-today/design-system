import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { Toast } from './Toast';

const meta = {
    title: 'feadback/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: () => {
        return (
            <div>
                content
                <Toast message={'hello'} />
            </div>
        )
    }
}
