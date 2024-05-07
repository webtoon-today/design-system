import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MoreMenu from './MoreMenu';

const meta = {
  title: 'Navigation/MoreMenu',
  component: MoreMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
    return (
        <div>
            <MoreMenu
                ButtonElementChild={
                    <img src='https://static.webtoon.today/ddah/icon/more_horiz.svg' style={{transform: 'rotate(90deg)'}} alt='more_horiz' width={20} height={20} />
                }
                anchorOrigin={{
                    horizontal: 'right',
                }}
                transformOrigin={{
                    horizontal: 'right',
                }}
            >
                <MoreMenu.MenuItemButton 
                    onClick={ () => { 
                        alert('click');
                    }}
                >
                    {'click'}
                </MoreMenu.MenuItemButton>
        </MoreMenu>
        </div>
    )
}
