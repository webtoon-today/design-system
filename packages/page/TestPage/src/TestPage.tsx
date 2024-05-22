import React, { useRef, useState } from 'react';

import { useToastAlert } from 'Toast';
import { PortalDrawer } from 'Drawer';

const TestPage = () => {

    const { toastAlert } = useToastAlert();

    const [open, setOpen] = useState(false);

    const container = useRef<HTMLDivElement>(null);

    return (
        <div ref={container}>
            <h1>Test Page</h1>

            <div>
                <h2>button group</h2>
                <button onClick={()=>toastAlert('hello test page')}>toast</button>
                <button onClick={()=>setOpen(true)}>open drawer</button>
            </div>
            <PortalDrawer isClient open={open} onClose={()=>setOpen(false)} container={container.current}>
                <div>
                    <h2>hello portal drawer</h2>
                    <button onClick={()=>setOpen(false)}>close</button>
                </div>
            </PortalDrawer>
        </div>
    )
}

export default TestPage;