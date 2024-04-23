import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PortalDrawer } from './PortalDrawer';
import React, { useState } from 'react';
import { NestedCascadeDrawer } from './NestedCascadeDrawer';

const meta = {
  title: 'Drawer/PortalDrawer',
  component: PortalDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClose: fn() },
} satisfies Meta<typeof PortalDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button onClick={()=>setOpen(true)}>open PortalDrawer</button>
            <PortalDrawer 
                isClient={true} 
                open={open} 
                onClose={()=>setOpen(false)}>
                hello PortalDrawer
            </PortalDrawer>
        </div>
    )
}

Default.bind({});

export const NestedDrawer = () => {
    const [open0, setOpen0] = useState(false);
    const [open1, setOpen1] = useState(false);
    return (
        <div>
            <button onClick={()=>setOpen0(true)}>open PortalDrawer</button>
            <PortalDrawer 
                isClient={true} 
                open={open0} 
                onClose={()=>setOpen0(false)}>
                hello PortalDrawer
                <button onClick={()=>setOpen1(true)}>open NestedDrawer</button>
                <NestedCascadeDrawer open={open1} onClose={()=>setOpen1(false)}>
                    hello NestedCascadeDrawer
                </NestedCascadeDrawer>
            </PortalDrawer>
        </div>
    )
}

NestedDrawer.bind({});