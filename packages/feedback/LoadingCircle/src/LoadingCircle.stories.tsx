import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useEffect, useRef, useState } from 'react';
import { GlobalLoadingCircle } from './GlobalLoadingCircle';
import { LocalLoadingCircle } from './LocalLoadingCircle';
/**
 * GlobalLoadingCircle is the component covers the whole browser.
 * 
 * LocalLoadingCircle covers their parent component.
 */
const meta = {
    title: 'feedback/loadingCircle',
    component: GlobalLoadingCircle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { isClient: true },
} satisfies Meta<typeof GlobalLoadingCircle>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    useEffect(()=>{
        if( isLoading ) {
            setTimeout(() => setIsLoading(false), 2000);
        }
    },[isLoading])
    return(
        <div>
            <button onClick={() => !isLoading ? setIsLoading(true) : {} } >{'글로벌 서클 켜기(2초만)'}</button>
            <GlobalLoadingCircle show={isLoading} isClient={true} />
        </div>
    )
}

export const LocalLoading = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    useEffect(()=>{
        if( isLoading ) {
            setTimeout(() => setIsLoading(false), 2000);
        }
    },[isLoading])
    return(
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 10 }} >
                <button onClick={() => !isLoading ? setIsLoading(true) : {} } >{'로컬 서클 켜기(2초만)'}</button>
            </div>
            <div style={{width: 400, height: 400, backgroundColor: 'rgba(0,176,240,0.1)', position: 'relative'}} >
                <LocalLoadingCircle show={isLoading} />
            </div>
        </div>
    )
}