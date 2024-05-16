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