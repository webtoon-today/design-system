import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { WithoutReoilToast } from './Toast';

const meta = {
    title: 'feadback/Toast',
    component: WithoutReoilToast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof WithoutReoilToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: () => {
        return (
            <div>
                content
                <WithoutReoilToast message={'hello'} />
            </div>
        )
    }
}
