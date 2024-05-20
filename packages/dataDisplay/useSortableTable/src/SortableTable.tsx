import React from "react"

const SortableTable = ({children}: {children: React.ReactNode}) => {
    return (
        <table>
            {children}
        </table>
    )
}

export default SortableTable;