import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NestedCascadeDrawer } from './NestedCascadeDrawer';
import React, { useState } from 'react';

const meta = {
  title: 'Drawer/NestedCascadeDrawer',
  component: NestedCascadeDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClose: fn() },
} satisfies Meta<typeof NestedCascadeDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
    const [opne, setOpen] = useState(false);
    return (
        <div>
            <button onClick={()=>setOpen(true)}>open NestedCascadeDrawer</button>
            <NestedCascadeDrawer open={opne} onClose={()=>setOpen(false)}>
                hello NestedCascadeDrawer
            </NestedCascadeDrawer>
        </div>
    )
}

Default.bind({});