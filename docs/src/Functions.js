export const fn = {
    goto: ()=>{},
    gotoByAnchor: (event)=> {
        event.preventDefault();
        /**
         * @type {HTMLElement}
         */
        let target = event.target
        
        while (target.tagName !== 'body' && !target.getAttribute('href')){
            target = target.parentElement
        }
        if (target.tagName === 'body'){
            return;
        }else{
            fn.goto(target.getAttribute('href'));
        }
    }
};

export const validateEmailForm = (infomation) => {
    const regExp = /^([-_.+0-9a-zA-Z])*@([-_.0-9a-zA-Z])*\.[a-zA-Z]{2,10}$/i;
    if (regExp.test(infomation)) {
        return true;
    } else {
        return false;
    }
}

export const randomString = (length) =>
    new Array(length).fill(0)
      .map((x) => String.fromCharCode(65 + Math.floor(Math.random() * 2) * 32 + Math.floor(Math.random() * 26)))
      .join("");

/**
 * 
 * @param {HTMLElement} DOM 
 * @returns {{top: number, left: number, height: number, width: number}}
 */
export const getOffsetInScreen = (DOM) => {
    if (!DOM){
        return {};
    }
    return DOM.getBoundingClientRect();
}

/**
 * 
 * @param {object} key 
 * @param {{
*   validator: (object) => boolean,
*   sublogic?: logic | object,
*   defaultValue: object
* }[]} logic 
* @param {object} defaultValue
* @return {object | null}
*/
export const BranchFunction = (key, logic, defaultValue) => {

   if (logic instanceof Array){
       for(const {validator, sublogic, defaultValue} of logic){
           if (validator(key)){
               if (sublogic && sublogic instanceof Array && sublogic.length > 0){
                   return BranchFunction(key, sublogic, defaultValue);
               }else{
                   return defaultValue;
               }
           }else {
           }
       }
   }
   return defaultValue;

}