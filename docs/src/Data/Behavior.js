import axios from 'axios';
import ss from './Session';

const randomString = (length) =>
  new Array(length).fill(0)
    .map((x) => String.fromCharCode(65 + Math.floor(Math.random() * 2) * 32 + Math.floor(Math.random() * 26)))
    .join("");

export async function logBehavior (what, detail) {

    if (!detail){
        detail = {}
    }

    if (!detail.page){
        detail.page = window.location.pathname;
    }

    if (!sessionStorage.getItem('sessionid')){
        let currentTime = (new Date()).getTime()/1000;
        let sessionid = localStorage.getItem('sessionid');
        let sessionNumber = 1;
        try {
            sessionNumber = Number(localStorage.getItem('session:number') || "1") || 1;
            if (localStorage.getItem('session:number') && localStorage.getItem('session:number').replace(/1/g,'').length === 0){
                sessionNumber = localStorage.getItem('session:number').length;
            }
        }catch(e){
            console.error('invalid sessionNumber', e);
        }
        if (!sessionid){
            sessionid = randomString(16);
            localStorage.setItem('sessionid', sessionid);
            localStorage.setItem('session:firstStartedAt', currentTime);

            await sendBehavior("sessionStart", {});
        }else {
            sessionNumber += 1;
            await sendBehavior("revisit", {
                interval: currentTime - Number(localStorage.getItem('session:lastStartedAt') || '0'),
                intervalFromStart: currentTime - Number(localStorage.getItem('session:firstStartedAt') || '0'),
                sessionNumber
            });
        }
        localStorage.setItem('session:lastStartedAt', currentTime);
        localStorage.setItem('session:number', sessionNumber);
        sessionStorage.setItem('sessionid', sessionid);
    }

    return await sendBehavior(what, detail);
}

async function sendBehavior (what, detail) {
    let sessionid = localStorage.getItem('sessionid');
    if (!detail.page){
        if (window.canonicalPath){
            detail.page = window.canonicalPath;
        }else{
            detail.page = window.location.pathname;
        }
    }
    
    if (['127.0.0.1', 'localhost:3000', 'mydomain.com:3000', 'localhost:3001', 'mydomain.com:3001', 'd26pjf3a18hvh4.cloudfront.net', 'dev.webtoon.today'].indexOf(window.location.host) >= 0){
        detail.debug = true;
    }
    
    let userid = ss.getCurrentSession().userid;
    try{
        let res = await axios.post('https://api.webtoon.today/behavior', {logs:[ {what, userid, sessionid, detail} ]}, {
            headers: {
                Authorization: `Bearer ${ss.getCurrentSession().jwt}`
            },
            withCredentials: true
        });

        if (res.data && res.data.code === 200){
            
            return true;

        }else{
            return false;
        }
    }catch(e){
        return false;
    }
}