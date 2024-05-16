import axios from 'axios';

/**
 * @typedef {{
 *  googleId: string,
 *  ...
 * }} googleResponseType
 * @typedef {{
 *   accessToken: string
 * }} facebookResponseType
 * @typedef {import('./Profile').profileType&{
 *  token: string,
 *  jwt: string
 * }} sessionType
 * @typedef {{status: 200|any, data:{
 *  code: number,
 *  data: sessionType
 * }}} sessionResponseType 
 */
export const nullSession = {userid:null, token:null, name: null, image: null, email: null, jwt: '', isManager: null};
const crnt = {session: global.localStorage?JSON.parse(localStorage.getItem('session') || '{}'):nullSession};

/**
 * @type {Set<function>}
 */
 const sessionUpdateCallbackList = new Set([]);

const afterSessionChanged = async () => {
    return Promise.all(
        [...sessionUpdateCallbackList].map(func => {
            return (async ()=>{
                return func();
            })();
        })
    );
}


const registerSessionCallback = (func) => {
    sessionUpdateCallbackList.add(func);
    return true;
}

const sessionRefresh = async () => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');

    /** @type {sessionResponseType} res */
    let res = await axios.post(
        'https://api.webtoon.today/session',
        (session.userid && session.token)?{userid: session.userid, token: session.token}:{}
    );

    if (res.data.code === 200 && res.data.data && res.data.data.userid){
        if (!res.data.data.image){
            res.data.data.image = "https://static.webtoon.today/noimage.jpg";
        }
        crnt.session = res.data.data;
        localStorage.setItem('session', JSON.stringify(res.data.data));
    }else{
        crnt.session = nullSession;
        localStorage.setItem('session', JSON.stringify(nullSession));
    }
    afterSessionChanged();

}

const logout = () => {
    crnt.session = nullSession;

    localStorage.setItem('session', JSON.stringify(nullSession));
    afterSessionChanged();
    
    return nullSession;
}

/**
 * @param {googleResponseType} response
 */
const GoogleSignin = async (response, ) => {
    if ((window).gtag){
        (window).gtag('event', 'conversion', {'send_to': 'AW-S8C0P0TZZX/login'});
    };

    if (response.code){
        try{
            /** @type {sessionResponseType} res */
            let res = await axios.put(
                'https://challenge-api.webtoon.today/session',
                {gsso: response}
            );
            
            if (res.data.code === 200 && res.data.data && res.data.data.userid){
                if (!res.data.data.image){
                    res.data.data.image = "https://static.webtoon.today/noimage.jpg";
                }
                crnt.session = res.data.data;
            }else{
                crnt.session = nullSession;
            }

            localStorage.setItem("session", JSON.stringify(crnt.session));
        }catch(e){
            console.error(e);
        } finally{
            return crnt.session;
        }
    }
    return crnt.session;
}

/**
 * @param {facebookResponseType} response
 */
const FacebookSignin = async (response, ) => {
    if (window.gtag){
        window.gtag('event', 'conversion', {'send_to': 'AW-604780621/UKKOCJ3C1t4BEM3wsKAC'});
    }
    if (response.accessToken){
        try{
            /** @type {sessionResponseType} res */
            let res = await axios.put(
                'https://api.webtoon.today/session',
                {fsso: response}
            );

            if (res.data.code === 200 && res.data.data && res.data.data.userid){
                if (!res.data.data.image){
                    res.data.data.image = "https://static.webtoon.today/noimage.jpg";
                }
                crnt.session = res.data.data;
                localStorage.setItem('session', JSON.stringify(res.data.data));
                afterSessionChanged();
                return true;
            }else{
                crnt.session = nullSession;
                localStorage.setItem('session', JSON.stringify(nullSession));
                afterSessionChanged();
            }
        }catch(e){
            console.log(e)
            // do nothing
            return false;
        }
    }
    return false;
}

const EmailSendOTP = async (email) => {

    if (email){

        try{
            let res = await axios.put(
                'https://api.webtoon.today/session',
                {email,}
            );
            
            if (res.data.code === 200){
                return res.data.data;
            }else {
                return false;
            }
        }catch(e){
            return false;
        }
    }
    return false;
}

const EmailSignin = async (email, token) => {
    if (window.gtag){
        window.gtag('event', 'conversion', {'send_to': 'AW-604780621/UKKOCJ3C1t4BEM3wsKAC'});
    }
    if (email){
        try{
            /** @type {sessionResponseType} res */
            let res = await axios.put(
                'https://api.webtoon.today/session',
                {email, token}
            );

            if (res.data.code === 200 && res.data.data && res.data.data.userid){
                if (!res.data.data.image){
                    res.data.data.image = "https://static.webtoon.today/noimage.jpg";
                }
                crnt.session = res.data.data;
                localStorage.setItem('session', JSON.stringify(res.data.data));
                afterSessionChanged();
                return true;
            }else{
                crnt.session = nullSession;
                localStorage.setItem('session', JSON.stringify(nullSession));
                afterSessionChanged();
            }
        }catch(e){
            console.log(e)
            // do nothing
            return false;
        }
    }
    return false;
}


async function isManager () {
    if (crnt.session.isManager !== null && crnt.session.isManager !== undefined){
        return crnt.session.isManager;
    }
    try{
        let res = await axios.get(`https://api.webtoon.today/is-manager`,{
            headers: {
                Authorization: `Bearer ${crnt.session.jwt}`
            },
            withCredentials: true
        })
        console.log(res.data)
        if (res.data && res.data.code === 200){
            crnt.session.isManager = res.data.data;
            return res.data.data;
        } else {
            crnt.session.isManager = false;
            return false;
        }

    } catch(e) {
        crnt.session.isManager = false;
        return false;
    }
}

/**
 * @param {(session: sessionType) => void} sessionCallback 
 * @returns {{
 *  sessionRefresh: ()=> void,
 *  logout: () => void,
 *  GoogleSignin: (response: googleResponseType) => Promise<void>,
 *  FacebookSignin: (response: facebookResponseType) => Promise<void>,
 *  getCurrentSession: () => sessionType
 * }}
 */
const sessionFuncs = {
    sessionRefresh,
    logout,
    GoogleSignin,
    FacebookSignin,
    EmailSendOTP,
    EmailSignin,
    getCurrentSession: () => {return crnt.session},
    registerSessionCallback,
    isManager
};

export default sessionFuncs;