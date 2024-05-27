import React, { useRef, useState } from 'react';

import { PortalDrawer } from 'Drawer';

import OptionalText from "./components/OptionalText";

import "./TestPage.scss";

const TestPage = () => {
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState<'red' | 'blue' | 'green'>('red');

    const container = useRef<HTMLDivElement>(null);

    const handleClickButton = (option: 'red' | 'blue' | 'green') => {
        setOption(option);
    }

    return (
        <div className={'TestPage'} data-testid={"test-page"} ref={container}>
            <h1>Test Page</h1>
            <nav>
                <ul style={{display: 'flex', gap: 8, listStyleType: 'none'}}>
                    <li><a href="javascript: void(0)">optional text color controller</a></li>
                    <li><a href="javascript: void(0)">button group</a></li>
                    <li><a href="javascript: void(0)">card</a></li>
                </ul>
            </nav>
            <hr />
            <div>
                <h2>optional text color controller</h2>
                <OptionalText option={option}>hello</OptionalText>
                <form>
                    <h3>color button group</h3>
                    <input type="radio" name="color" id="red" value="red" checked={option === 'red'} onChange={()=>handleClickButton('red')} />
                    <label htmlFor="red">red</label>
                    <input type="radio" name="color" id="blue" value="blue" checked={option === 'blue'} onChange={()=>handleClickButton('blue')} />
                    <label htmlFor="blue">blue</label>
                    <input type="radio" name="color" id="green" value="green" checked={option === 'green'} onChange={()=>handleClickButton('green')} />
                    <label htmlFor="green">green</label>
                </form>
            </div>
            <hr />
            <div>
                <h2>button group</h2>
                <button onClick={()=>setOpen(true)}>open drawer</button>
            </div>
            <hr />
            <div style={{display: 'flex', gap: 8}}>
                <div className={'Card'}>
                    <header>Card</header>
                    <div className={"Content"}>
                        <h3>card content heading</h3>
                        <p>hello world</p>
                        <button>button</button>
                    </div>
                    <footer>footer</footer>
                </div>
                <div className={'Card'}>
                    <header>Card2</header>
                    <div className={"Content"}>
                        <h3>card content heeding</h3>
                        <p>this content has typo</p>
                        <button>button</button>
                    </div>
                    <footer>footer</footer>
                </div>
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