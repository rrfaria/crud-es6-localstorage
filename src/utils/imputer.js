import FEgine from './fariaEngine';
/** @jsx FEgine.h */
export default class imputer {
    constructor() {

    }

    static mount(iType,iName, iID, iClass,iTtitle,iImage="assets/images/shape-one.jpg",iIcon, iReq=false){
        let required = (iReq)?"required":"";
        let mount;
        switch (iType){
            case 'text':
                return (
                    <div className="Inputer">
                        <input type="text" name={iName} id={iID} className={iClass} required={required}/>
                            <label for={iName} className="floating-label">{iTtitle}</label>
                            <span className={iIcon}></span>
                    </div>

                );
                break;
            case 'upload':
                return (<div className="shape">
                            <a href="#" class="overlay hexagon"></a>
                            <div className="details">
                                <a href="#" class="button">{iTtitle}</a>
                            </div>
                            <div className="bg"></div>
                            <div className="base">
                                <img src={iImage} alt={iTtitle}/>
                            </div>
                            <input type="file" className="photo upload-button" name={iName} id={iID}/>
                        </div>
                );
                break;
            default:
                break;
        }

    }
}