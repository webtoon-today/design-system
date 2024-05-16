import React from 'react';

import { Button, Collapse, IconButton } from '@material-ui/core';
import { Close, MoreVert, Warning } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import { useGoogleLogin } from "@react-oauth/google";

import LoadingCircle from '../Component/LoadingCircle';
import ReleaseNote from '../Component/ReleaseNote';

import { logBehavior } from '../Data/Behavior';
import ss from '../Data/Session';

import { useSignIn } from '../Hook/useSignIn';

import { fn } from '../Functions';
import './Setting.css';

const Setting = (props) => {

    let queryString = window.location.search.replace('?','');
    let [queries,] = React.useState( Object.fromEntries(queryString.split('&').map(pair => pair.split("=").map(uri => decodeURIComponent(uri)))) );
    
    const [isLoading, setIsLoading] = React.useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [token, setToken] = React.useState(null);
    const [tokenErrorMessage, setTokenErrorMessage] = React.useState("");

    const { GoogleSignin, logout, session } = useSignIn();

    const googleSocialLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        onSuccess: async (codeResponse) => {
            let newSession = await GoogleSignin(codeResponse);
        },
    });

    React.useEffect(()=>{
        setTokenErrorMessage("")
    }, [token])
    
    if (session.email && queries.redirectTo) {
        fn.goto(queries.redirectTo);
    }

    React.useEffect(()=>{

        let timer = setTimeout(()=>{
            (async()=>{
                const {email, token} = queries;
                if (email && token){
                    setIsLoading(true);
                    let res = await ss.EmailSignin(email, token);
                    if (res){
                        logBehavior('loginSuccess');
                    }else{
                        setTokenErrorMessage("인증에 실패했습니다. 다시 확인해주세요.")
                    }
                    setIsLoading(false);
                }
            })();
        },500)

        return ()=>{
            clearTimeout(timer);
        }
    },[queries])

    window.canonicalPath = '/setting';

    if (!session || !session.name){
        return (
            <div className={"SettingStyle"}>
                <div className={"GradientBackground"}>
                </div>
                <div className={"SettingContainer"}>
                    <div className={"Section"}>
                        <div className={"SectionHeader"}>{"로그인"}</div>
                        <div className={"SectionBody"}>
                            <Collapse in={emailErrorMessage.length > 0 || tokenErrorMessage.length > 0}>
                                <Alert severity="error" action={<IconButton size={"small"} onClick={()=>setEmailErrorMessage("") && setTokenErrorMessage("")}><Close/></IconButton>}>{emailErrorMessage || tokenErrorMessage}</Alert>
                            </Collapse>
                            <div style={{paddingTop:100}}></div>
                            <img className={"BigWhiteLogo"} src='/logo-white.png' alt={"webtoon today logo"}/>
                            <div style={{paddingTop:100}}></div>
                            <Button 
                                onClick={(e)=>{
                                    e.preventDefault();
                                    googleSocialLogin();
                                }} 
                                className={'Button'} style={{backgroundColor: 'rgb(255,255,255)', color:'black', height: '45px', border: '1px solid rgb(51,51,51)'}} >
                                {'Google로 계속하기'}
                            </Button>
                        </div>
                    </div>
                    <div className={"KakaoNotice"}>
                        <Warning/>{"카카오톡 브라우저는 "}
                        <MoreVert className={"WithBG"}/>{" 버튼을 눌러 "}
                        <code>{"다른브라우저로 보기"}</code>{"를 이용해주세요."}
                    </div>
                </div>
                <LoadingCircle show={isLoading}/>
            </div>
        );
    }

    return (
        <div>
            <div className={"SettingContainer"}>
                <div className={"Section"}>
                    <div className={"SectionHeader"}>{"프로필"}</div>
                    <div className={"SectionBody"}>
                        <h3>{session.name}</h3>
                        <Button
                            variant={"outlined"} className={"LogoutButton"} color={"secondary"} fullWidth
                            onClick={()=>{logout()}}
                        >
                            {"로그아웃"}
                        </Button>
                    </div>
                </div>
            </div>
            <ReleaseNote />
        </div>
    )
};

export default Setting;