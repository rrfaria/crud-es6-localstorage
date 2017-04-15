export default class imputer {
    constructor() {

    }

    static mount(iType,iName, iID, iClass,iTtitle,iImage="assets/images/shape-one.jpg",iIcon, iReq=false){
        let required = (iReq)?"required":"";
        switch (iType){
            case 'text':
                return '<div class="Inputer">'+
                            '<input type="text" name="'+iName+'" id="'+iID+'" class="'+iClass+'" required="'+required+'">'+
                            '<label for="txtTelefone" class="floating-label">'+iTtitle+'</label>'+
                            '<span class="'+iIcon+'"></span>'+
                        '</div>';
                break;
            case 'upload':
                return '<div class="shape">'+
                            '<a href="#" class="overlay hexagon"></a>'+
                            '<div class="details">'+
                                '<a href="#" class="button">'+iTtitle+'</a>'+
                            '</div>'+
                            '<div class="bg"></div>'+
                            '<div class="base">'+
                                '<img src="'+iImage+'" alt="'+iTtitle+'">'+
                            '</div>'+
                            '<input type="file" class="photo upload-button" name="'+iName+'" id="'+iID+'">'+
                        '</div>';
                break;
            default:
                break;
        }

    }
}