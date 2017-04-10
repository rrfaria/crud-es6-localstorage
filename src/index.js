import General from './utils/general';
import css from './assets/css/app.scss';
import icons from './assets/css/pe-icon-7-filled.scss';
import Cloudnary from './utils/cloudnary';
import lsManager from './utils/lsManager';
import $ from './utils/elementSelector';
import FEgine from './utils/fariaEngine';
import blockContainer from'./utils/blockContainer';

let imgContainer = document.querySelector('#app .root .block-container .mainPanel .shape');
let inputImg = document.querySelector('#app .root .block-container .mainPanel .shape .photo');
let img = document.querySelector('#app .root .block-container .mainPanel .shape .base img');
let btnSave = document.querySelector('#app .root .block-container .mainPanel .btnSave');
let cloud = new Cloudnary();

let name= $.id('txtFullname');
let cpf = $.id('txtCpf');
let phone = $.id('txtTelefone');
let address = $.id('txtAddress');
let complement = $.id('txtComplement');
let photoUpload = $.id("uplImage");

cpf.maxLength=14;
phone.maxLength=15;

const autocomplete = new google.maps.places.Autocomplete((address), {
    types: [`address`]
});

let storage = new lsManager();


//EVENTS
//TODO - Optimize event function

//Key UP
phone.addEventListener('keyup',()=>{
    phone.value= General.maskPhone(phone);
    General.check(phone,'phone',14);
});

cpf.addEventListener('keyup',()=>{
    General.maskCPF(cpf,'000.000.000-00');
    General.check(cpf,'phone',14);
});
//FOCUS
name.addEventListener('focusout',()=>{
    (name.value==='')?name.classList.add('has-error'):name.classList.remove('has-error');
});

address.addEventListener('focusout',()=>{
    (address.value==='')?address.classList.add('has-error'):address.classList.remove('has-error');
});

complement.addEventListener('focusout',()=>{
    (complement.value==='')?complement.classList.add('has-error'):complement.classList.remove('has-error');
});

cpf.addEventListener('focusout',()=>{
    General.check(cpf,'cpf',14);
});

phone.addEventListener('focusout',()=>{
    General.check(phone,'phone',14);
});

////CHANGE
inputImg.addEventListener('change',()=>{
    cloud.previewFile(inputImg,img);
});

////CLICK
imgContainer.addEventListener('click',()=>{
    inputImg.click();
});

//pass container, event, selector and function with callback to get the button clicked
$.on('tablerows','click','btnDelete',(element)=>{
    console.log('delete');
    let index = element.getAttribute("data-id");
    storage.deleteTableRow(index);
});


//pass container, event, selector and function with callback to get the button clicked
$.on('tablerows','click','btnEdit',(element)=>{
    let index = element.getAttribute("data-id");
    storage.onEditPressed(index);
});

btnSave.addEventListener('click', ()=>{
    console.log('save');
    (name.value==='')?name.classList.add('has-error'):name.classList.remove('has-error');
    //TODO - Check if it is highlight the fields when empty
    if(name.value!=='' && General.check(cpf,'cpf',14) && General.check(phone,'phone',14)){
        if(photoUpload.value!==""){
            //pass element and callback to promise return object with image and thumb
            cloud.sendData(inputImg, (imageUploaded)=>{
                //console.log(imageUploaded);
                storage.onRegisterPressed(imageUploaded.image,imageUploaded.thumb);
            });
        }else {
            let defaultimg = 'assets/images/shape-one.jpg';
            let defaultThumb= 'assets/images/defaultThumb.png';
            storage.onRegisterPressed(defaultimg,defaultThumb);
        }

    }
});


// const where = $.id('animal');
// const content = "teste";
// const icon ="pe-7f-keypad";
// const t = "title";
// const panel = new blockContainer();
// panel.render(where,content,icon,t);

// const $root = document.getElementById('animal');
// /** @jsx h */
// const a = (
//     <ul>
//         <li>item 1</li>
//         <li>item 2</li>
//     </ul>
// );
// const Fgine = new FEgine();
//
//
// Fgine.render($root,a);



