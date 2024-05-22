import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import TestPage from './TestPage';

const meta = {
    title: 'page/TestPage',
    component: TestPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof TestPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplete = (args:Story['args']) => <TestPage {...args} />

export const Default: Story = {
  render: DefaultTemplete
}

export const Interaction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button', {name:'open drawer'});
        await userEvent.click(button);
    },
    render: DefaultTemplete
}