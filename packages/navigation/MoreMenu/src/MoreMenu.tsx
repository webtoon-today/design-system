import { Button, Menu, PaperProps, PopoverOrigin } from "@material-ui/core";
import React, { useState, ReactNode, createContext, useContext, forwardRef } from "react";
import './MoreMenu.scss'

type MoreMenuContextType = {
    anchorEl: null | HTMLElement,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const MoreMenuContext = createContext<MoreMenuContextType>({
    anchorEl: null,
    setAnchorEl: () => {}
})
  
const MenuItemButton = forwardRef<
    HTMLLIElement, 
    { children: React.ReactNode, className?: string, onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, href?: string}
>((props, _ref) => {
    const { setAnchorEl } = useContext(MoreMenuContext);
    const { children, className = '', onClick = () => {}, href } = props;

    return (
        <li className={`${className} MoreMenuItemButton`}>
            <Button onClick={(event?) => { onClick(event); setAnchorEl(null)}} href={href}>
                {children}
            </Button>
        </li>
    );
});

const MenuItem = forwardRef<
    HTMLLIElement, 
    { children: React.ReactNode, className?: string }
>((props, _ref) => {
    const { children, className } = props;
    return ( <li className={`${className} MoreMenuItem`}>{children}</li> )
})

/**
 *
 * Demos:
 *
 * - [Menus](https://v4.mui.com/components/menus/)
 *
 * API:
 *
 * - [Menu API](https://v4.mui.com/api/menu/)
 * - inherits [Popover API](https://v4.mui.com/components/popover/#popover)
 */
const MoreMenu = ({ 
    children, 
    ButtonElementChild,
    className, 
    PaperProps,
    anchorOrigin,
    transformOrigin
} : {
    children: ReactNode,
    ButtonElementChild: ReactNode,
    className?: string,
    PaperProps?: Partial<PaperProps>,
    /**
     * This is the point on the anchor where the popover's anchorEl will attach to. This is not used when the anchorReference is 'anchorPosition'.
     * 
     * Options: vertical: [top, center, bottom]; horizontal: [left, center, right].
     * 
     * @example
     * 버튼의 오른쪽 하단과 팝업 메뉴의 오른쪽 상단 맞추기
     * ```typescript
     * <MoreMenu
     *   ButtonElementChild={'Icon Button'}
     *   anchorOrigin={{vertical: 'right'}}
     *   transformOrigin={{vertical: 'right'}}
     * >
     *   <MoreMenu.MenuItem>{1}</MoreMenu.MenuItem>
     * </MoreMenu>
     * ```
     */
    anchorOrigin?: Partial<PopoverOrigin>,
    /**
     * This is the point on the popover which will attach to the anchor's origin.
     * 
     * Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)].
     */
    transformOrigin?: Partial<PopoverOrigin>
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    return (
        <MoreMenuContext.Provider value={{anchorEl, setAnchorEl}}>
            <div className={`MenuContainer ${className}`}>
                <Button className={`OpenMenu ${anchorEl ? 'Open':''}`} onClick={(event) => setAnchorEl(event.currentTarget)}>
                    {ButtonElementChild}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: anchorOrigin?.vertical ?? 'bottom',
                        horizontal: anchorOrigin?.horizontal ?? 'left',
                    }}
                    transformOrigin={{
                        vertical: transformOrigin?.vertical ?? 'top',
                        horizontal: transformOrigin?.horizontal ?? 'left',
                    }}
                    PaperProps={{
                        ...PaperProps,
                        className: `MoreMenuPaper ${PaperProps?.className}`,
                        style: {
                            boxShadow:[  
                                "0px 14px 32px 0px rgba(0, 0, 0, 0.12)",  
                                "0px 10px 14px 0px rgba(0, 0, 0, 0.06)",  
                                "0px  0px  0px 1px rgba(0, 0, 0, 0.04)",  
                            ].join(", "),
                            ...PaperProps?.style
                        }
                    }}
                    MenuListProps={{ className: 'MoreMenuList' }}
                >        
                    {children}
                </Menu>
            </div>
        </MoreMenuContext.Provider>
    )
}

MoreMenu.MenuItemButton= MenuItemButton;
MoreMenu.MenuItem = MenuItem;

export default MoreMenu;