import React, { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/test'

import OptionalText from './OptionalText';

const meta = {
    title: 'page/Test Page/OptionalText',
    component: OptionalText,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        option: {
            options: ['red', 'blue', 'green'],
            control: { type: 'radio' },
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof OptionalText>;

export default meta;
type Story = StoryObj<typeof meta>;

const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

const DefaultTemplete = (args:Story['args']) => <OptionalText {...args} />;

const StateTemplete = (args:Story['args']) => {
    const [option, setOption] = useState<typeof args.option>(args.option);
    
    const handleClickButton = (option: typeof args.option) => {
        setOption(option);
    }

    useEffect(() => {
        setOption(args.option);
    },[args.option]);

    return (
        <div>
            <button onClick={()=>handleClickButton('red')}>red</button>
            <button onClick={()=>handleClickButton('blue')}>blue</button>
            <button onClick={()=>handleClickButton('green')}>green</button>

            <OptionalText option={option}>
                optional color is {option}
            </OptionalText>
        </div>
    )
}

export const Default: Story = {
    args: {
        children: 'hello',
        option: 'red',
    },
    render: DefaultTemplete,
}

export const State: Story = {
    play: async ({ canvasElement }) => {
        const canvas = await within(canvasElement);

        const blueButton = await canvas.findByText('blue');
        await userEvent.click(blueButton);
        await sleep(1000);

        expect(canvas.getByText('optional color is blue')).toHaveClass('blue');

        const greenButton = await canvas.findByText('green');
        await userEvent.click(greenButton);
        await sleep(1000);
        
        expect(canvas.getByText('optional color is green')).toHaveClass('green');

        const redButton = await canvas.findByText('red');
        await userEvent.click(redButton);
        await sleep(1000);

        expect(canvas.getByText('optional color is red')).toHaveClass('red');
    },
    args: {
        option: 'red',
    },
    render: StateTemplete,
}
