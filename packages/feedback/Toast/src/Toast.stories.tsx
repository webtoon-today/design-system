import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { WithOutReoilToast } from './Toast';

const meta = {
    title: 'feadback/Toast',
    component: WithOutReoilToast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof WithOutReoilToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: () => {
        return (
            <div>
                content
                <WithOutReoilToast message={'hello'} />
            </div>
        )
    }
}
