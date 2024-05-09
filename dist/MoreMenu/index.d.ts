import * as react_jsx_runtime from 'react/jsx-runtime';
import { PaperProps, PopoverOrigin } from '@material-ui/core';
import React, { ReactNode } from 'react';

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
declare const MoreMenu: {
    ({ children, ButtonElementChild, className, PaperProps, anchorOrigin, transformOrigin }: {
        children: ReactNode;
        ButtonElementChild: ReactNode;
        className?: string;
        PaperProps?: Partial<PaperProps>;
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
        anchorOrigin?: Partial<PopoverOrigin>;
        /**
         * This is the point on the popover which will attach to the anchor's origin.
         *
         * Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)].
         */
        transformOrigin?: Partial<PopoverOrigin>;
    }): react_jsx_runtime.JSX.Element;
    MenuItemButton: React.ForwardRefExoticComponent<{
        children: React.ReactNode;
        className?: string | undefined;
        onClick?: ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
        href?: string | undefined;
    } & React.RefAttributes<HTMLLIElement>>;
    MenuItem: React.ForwardRefExoticComponent<{
        children: React.ReactNode;
        className?: string | undefined;
    } & React.RefAttributes<HTMLLIElement>>;
};

export { MoreMenu };
