export default class blockContainer{
    constructor(){

    }
    render(where, content,icon,title,helpActive="",helpIcon="",helpDescription=""){

        let mount = '<div class="block-container">' +
                        '<div class="mainPanel">'+
                            '<div class="headerPanel">'+
                                '<i class="'+icon+'"></i>'+
                                '<h2 class="title">'+title+'</h2>'+
                                '<div class="help '+helpActive+'">'+
                                    '<i class="'+helpIcon+'"></i>'+
                                    '<div class="description">'+
                                        helpDescription+
                                    '</div>'+
                                '</div>'+
                            '</div>' +
                            content +
                        '</div>' +
                    '</div>';
        where.insertAdjacentHTML('afterend',mount);
    }
}