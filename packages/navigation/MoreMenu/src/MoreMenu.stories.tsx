import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import MoreMenu from './MoreMenu';

const meta = {
    title: 'Navigation/MoreMenu',
    component: MoreMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']
} satisfies Meta<typeof MoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
    children: '',
    ButtonElementChild: '',
    className: '',
    PaperProps: undefined,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
    },
}

const DefaultTemplete = (args:Story['args']) => {
    return (
        <div>
        <MoreMenu
            ButtonElementChild={
                args?.ButtonElementChild ||
                <img src='https://static.webtoon.today/ddah/icon/more_horiz.svg' style={{transform: 'rotate(90deg)'}} alt='more_horiz' width={20} height={20} />
            }
            anchorOrigin={args?.anchorOrigin}
            transformOrigin={args?.transformOrigin}
        >
            <MoreMenu.MenuItemButton onClick={ () => alert('click')}>
                {'click'}
            </MoreMenu.MenuItemButton>
        </MoreMenu>
        </div>
    )
}

export const Default: Story = {
  args: defaultArgs,
  render: DefaultTemplete
}

export const Interaction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button');
        await userEvent.click(button);
    },
    args: defaultArgs,
    render: DefaultTemplete
}