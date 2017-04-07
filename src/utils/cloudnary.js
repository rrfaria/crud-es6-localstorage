import sha1 from './sha1';

export default class Cloudnary {
    constructor(){
        this.cloudName = 'rafaelfaria';
        this.url = 'https://api.cloudinary.com/v1_1/'+this.cloudName+'/image/upload';
        this.apiSecret = '';
        this.timeStamp = Date.now()/1000;
        this.uploadPreset = 'r2rrfiz4';
        this.paramsStr = 'timestamp='+this.timeStamp+'&upload_preset='+this.uploadPreset+this.apiSecret;

        this.thumbCroper = '/w_800,h_800,c_crop,g_face,r_max/w_50';
        let SHA =  new sha1(this.paramsStr);
        this.signature= SHA.encode();
        this.params = 'api_key='+''+
            '&timestamp='+this.timeStamp+
            '&upload_preset='+ this.uploadPreset+
            '&signature='+this.signature;

    }

    sendData( data,func) {
        let file = data.files[0];
        let formData  = new FormData();
        let theurl ="";
        formData.append('file',file);
        formData.append('upload_preset',this.uploadPreset);
        console.log(this.params);

        fetch(this.url, {
            method: 'POST',
            body: formData

        }).then( Cloudnary.checkStatus).then(Cloudnary.parseJSON)
           .then((item)=>{
            let thumb = 'http://res.cloudinary.com/'+this.cloudName+'/image/upload' + this.thumbCroper+ item.url.replace('http://res.cloudinary.com/'+this.cloudName+'/image/upload','');
            let images ={
               'image':item.url,
               'thumb':thumb
            };
            func(images);
        })
           .catch((error)=> console.warn('request failed', error));

    }
    static parseJSON(response) {
        return response.json()
    }
    static checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    previewFile(fileInput,thumb) {
        let preview = thumb;

        let file = fileInput.files[0]; //sames as here
        let reader = new FileReader();

        reader.onloadend = function() {
            preview.src = reader.result;

        };

        if (file) {
            //let fileType = fileInput.files[0].name.match(/.(jpg|jpeg|png|gif)$/i);
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            console.warn('no image selected');
            preview.src = "assets/images/shape-one.jpg";
        }
    }



}