import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

import TestPage from './TestPage';

const meta = {
    title: 'page/Test Page',
    component: TestPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof TestPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

const DefaultTemplete = (args:Story['args']) => <TestPage {...args} />

export const Default: Story = {
  render: DefaultTemplete
}

export const Interaction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button', {name:'open drawer'});
        await userEvent.click(button);

        await sleep(1000);

        await userEvent.click(canvas.getByRole('button', {name:'close'}));

        const blueRadio = canvas.getByRole('radio', {name:'blue'});
        await userEvent.click(blueRadio);

        await sleep(1000);

        expect(canvas.getByText('hello')).toHaveClass('blue');

        const greenRadio = canvas.getByRole('radio', {name:'green'});
        await userEvent.click(greenRadio);

        await sleep(1000);

        expect(canvas.getByText('hello')).toHaveClass('green');

        const redRadio = canvas.getByRole('radio', {name:'red'});
        await userEvent.click(redRadio);

        await sleep(1000);

        expect(canvas.getByText('hello')).toHaveClass('red');
    },
    render: DefaultTemplete
}