import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, waitFor } from '@storybook/test';

import TestPage from './TestPage';

const meta = {
    title: 'page/Test Page',
    component: TestPage,
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

        waitFor(() => expect(canvas.getByText('hello portal drawer')).toBeInTheDocument());

        await sleep(1000);

        await userEvent.click(canvas.getByText('close'));

        const blueRadio = canvas.getByRole('radio', {name:'blue'});
        await userEvent.click(blueRadio);

        waitFor(() => expect(canvas.getByText('hello')).toHaveClass('blue'));

        await sleep(1000);

        const greenRadio = canvas.getByRole('radio', {name:'green'});
        await userEvent.click(greenRadio);

        waitFor(() => expect(canvas.getByText('hello')).toHaveClass('green'));

        await sleep(1000);

        const redRadio = canvas.getByRole('radio', {name:'red'});
        await userEvent.click(redRadio);

        waitFor(() => expect(canvas.getByText('hello')).toHaveClass('red'));
    },
    render: DefaultTemplete
}