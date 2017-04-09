export default class elementSelector{
    static id(elementName){
        return document.getElementById( elementName );
    }
    static on(container, ev, selector,callback){
        console.log('passou on');
        document.getElementById(container).addEventListener(ev, function(e)
        {
            e = e || window.event;
            let target = e.target || e.srcElement;
            console.log(elementSelector.selectorMatches(target,selector));
            if (elementSelector.selectorMatches(target,selector))
            {

                callback(target);
                //return e;//<return the event, unharmed
            }
            // e.returnValue = false;
            // if (e.preventDefault)
            // {
            //     e.preventDefault();
            // }
        }, false);
    }

    static on2(selector,calback){
        let element = document.querySelectorAll(selector);
        for (let i = 0; i < element.length; i++) {
            (function(i) {
                element[i].addEventListener('click', ()=>{
                    calback(element[i]);
                });
            })(i);
        }
    }

    static selectorMatches(el, selector) {
        let p = Element.prototype;
        let f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        return f.call(el, selector);
    }
}