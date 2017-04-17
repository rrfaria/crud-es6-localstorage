import FEgine from './fariaEngine';
/** @jsx FEgine.h */
export default class blockContainer{
    constructor(){

    }
    static render(where, content,icon,title,helpActive="",helpIcon="",helpDescription=""){
        const Fgine = new FEgine();

        const mount = (
        <div className="block-container">
            <div className="mainPanel">
                <div className="headerPanel">
                    <i className={icon}></i>
                    <h2 className="title">{title}</h2>
                    <div className={"help " +helpActive}>'
                        <i className={helpIcon}></i>
                        <div className="description">
                            {helpDescription}
                        </div>
                    </div>
                </div>
                {content}
            </div>
        </div>
        );
        // let mount = '<div class="block-container">' +
        //                 '<div class="mainPanel">'+
        //                     '<div class="headerPanel">'+
        //                         '<i class="'+icon+'"></i>'+
        //                         '<h2 class="title">'+title+'</h2>'+
        //                         '<div class="help '+helpActive+'">'+
        //                             '<i class="'+helpIcon+'"></i>'+
        //                             '<div class="description">'+
        //                                 helpDescription+
        //                             '</div>'+
        //                         '</div>'+
        //                     '</div>' +
        //                     content +
        //                 '</div>' +
        //             '</div>';
        FEgine.render(where,mount);

        //where.insertAdjacentHTML('afterend',mount);
    }
}