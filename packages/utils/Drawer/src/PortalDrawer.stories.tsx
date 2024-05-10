import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useRef, useState } from 'react';
import { NestedCascadeDrawer } from './NestedCascadeDrawer';
import { PortalDrawer } from './PortalDrawer';
/**
 * PortalDrawer is a component that renders Drawer in the body element.
 * 
 * PortalDrawer must be used as a parent component of NestedCascadeDrawer.
 * 
 * NesetedCascadeDrawer is a component that must be nested in PortalDrawer.
 */
const meta = {
  title: 'utils/Drawer',
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

export const NestedDrawer = () => {
    const [open0, setOpen0] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
        <div>
            <button onClick={()=>setOpen0(true)}>open PortalDrawer</button>
            <PortalDrawer 
                isClient={true} 
                open={open0} 
                onClose={()=>setOpen0(false)}
            >
                hello PortalDrawer
                <br />
                <button onClick={()=>setOpen1(true)}>open NestedDrawer</button>
                <NestedCascadeDrawer open={open1} onClose={()=>setOpen1(false)}>
                    depth 1
                    <br />
                    <div>hello NestedCascadeDrawer1</div>
                    <div>hello NestedCascadeDrawer1</div>
                    <div>hello NestedCascadeDrawer1</div>
                    <div>hello NestedCascadeDrawer1</div>
                    <br />
                    <button onClick={()=>setOpen2(true)}>open NestedDrawer</button>
                    <NestedCascadeDrawer open={open2} onClose={()=>setOpen2(false)}>
                        depth 2
                        <br />
                        hello NestedCascadeDrawer2
                        <br />
                        <button onClick={()=>setOpen3(true)}>open NestedDrawer</button>
                        <NestedCascadeDrawer open={open3} onClose={()=>setOpen3(false)}>
                            depth 3
                            <br />
                            hello NestedCascadeDrawer3
                            <br />
                            <button onClick={()=>setOpen3(false)}>close</button>
                        </NestedCascadeDrawer>
                    </NestedCascadeDrawer>
                </NestedCascadeDrawer>
            </PortalDrawer>
        </div>
    )
}

/**
 * `TODO: In Progress`
 * 
 * Drawer is anchored to the specified element.
 */
export const AnchoredDrawer = () => {
    const [open, setOpen] = useState(false);
    
    const ref = useRef<HTMLDivElement>(null);

    return (

        <div>
            <div style={{position: 'relative', height: 300, width: 300, backgroundColor: 'red'}} ref={ref}>anchor</div>
            <button onClick={()=>setOpen(true)}>open AnchorDrawer</button>
            <PortalDrawer
                isClient={true} 
                open={open} 
                onClose={()=>setOpen(false)}
                container={ref.current}
            >
                hello AnchorDrawer
                <button onClick={()=>setOpen(false)}>close</button>
            </PortalDrawer>
        </div>
    )

}

/**
 * 
 * Drawer `onClose` event fires Modal open.
 */
export const WithModalDrawer = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <button onClick={()=>setOpen(true)}>open ModalDrawer</button>
            <PortalDrawer 
                isClient={true} 
                open={open} 
                onClose={() => setOpenModal(true)}
            >
                hello ModalDrawer
            </PortalDrawer>
            {openModal && open && <div style={{position: 'absolute', width: 300, height:300, top: "50%", left:"50%", transform: 'translate3d(-50%, -50%, 0)',backgroundColor: 'plum', zIndex: 2000 }}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 10, justifyContent:'center', alignContent: 'center'}}>
                    <h1>Modal</h1>
                    <button onClick={()=>setOpen(false)}>close</button>
                </div>
            </div>}
        </div>
    )
}
