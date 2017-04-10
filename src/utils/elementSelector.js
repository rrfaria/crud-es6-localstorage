export default class elementSelector{
    static id(elementName){
        return document.getElementById( elementName );
    }
    static on(container, ev, element,callback){
        document.getElementById(container).addEventListener(ev, function(e)
        {
            e = e || window.event;
            let target = e.target || e.srcElement;

            if (target.classList.contains(element) || target.parentNode.classList.contains(element) )
            {
                callback(target);
            }
        }, false);
    }
}