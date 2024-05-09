import React, { Dispatch, createContext } from "react";

export type DrawerContextType = {
    nestedDrawerIdList: number[]; 
    setNestedDrawerIdList: Dispatch<React.SetStateAction<number[]>>;
} | null

export const DrawerContext = createContext<DrawerContextType>(null);

export const DrawerContextProvider = ({value, children}:{value: DrawerContextType, children?: React.ReactNode}) => {
    return (
        <DrawerContext.Provider value={value}>
            {children}
        </DrawerContext.Provider>
    )
}