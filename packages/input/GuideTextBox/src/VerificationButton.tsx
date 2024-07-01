import React, { ReactNode } from "react";

import { buttonStatusType, purposeType } from "./Type";

import { capitalizeFirstLetter } from "./Function";

export const VerificationButton = ({purpose, status, onClick} : {
    purpose: purposeType,
    status: buttonStatusType,
    onClick: Function
}) => {
    const buttonContent = buttonSrc[purpose][status][1];
    
    return (
        <div
            className={`VerificationButton ${capitalizeFirstLetter(status)}`}
            onClick={() => {
                if(status === 'activated'){
                    onClick();
                }
            }}
            tabIndex={0}
        >
            <img
                className={`Background`}
                src={buttonSrc[purpose][status][0]}
                alt={status}
            />
            {buttonContent}
        </div>
    )
}

const buttonSrc: {[purpose in purposeType] : {[status in buttonStatusType] : [`http${'' | 's'}://${string}`, ReactNode]}} = {
    uniqueness: {
        activated: ['https://static.webtoon.today/ddah/button/button_primary.png', <span>{'중복확인'}</span>],
        inactivated: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <span>{'중복확인'}</span>],
        pending: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <img className={'Spinner'} src={'https://static.webtoon.today/ddah/icon/icon_spinner.png'} alt={'spinner'}/>],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', <></>],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', <></>],
    },
    verification: {
        activated: ['https://static.webtoon.today/ddah/button/button_secondary.png', <span>{'확인'}</span>],
        inactivated: ['https://static.webtoon.today/ddah/button/button_secondary_light.png', <span>{'확인'}</span>],
        pending: ['https://static.webtoon.today/ddah/button/button_secondary_light.png', <img className={'Spinner'} src={'https://static.webtoon.today/ddah/icon/icon_spinner.png'} alt={'spinner'}/>],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', <></>],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', <></>],
    },
    send: {
        activated: ['https://static.webtoon.today/ddah/button/button_primary.png', <span>{'인증'}</span>],
        inactivated: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <span>{'인증'}</span>],
        pending: ['https://static.webtoon.today/ddah/button/button_primary_light.png', <img className={'Spinner'} src={'https://static.webtoon.today/ddah/icon/icon_spinner.png'} alt={'spinner'}/>],
        success: ['https://static.webtoon.today/ddah/icon/icon_success.svg', <></>],
        fail: ['https://static.webtoon.today/ddah/icon/icon_fail.svg', <></>],
    },
}
