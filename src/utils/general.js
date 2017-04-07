let exp;
export default class General{
    static maskPhone(element){
       // console.log(element.value);
        let value = element.value;
        value = value.replace(/\D/g, '');             //Remove tudo o que não é dígito
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return value;
    }


    static maskCPF(cpf, mask) {
        if (General.maskInt(cpf) === false) { event.returnValue = false; }
        return General.formatField(cpf, mask, event);
    }

    /**
     * @return {boolean}
     */
    static ValidatePhone(element) {
        const regexPhone = /(?:(?:\+|00)?(55))?(?:\(?(0?[1-9][0-9])\)?)?(?:(?:(9\d{3})\-?(\d{5}))|(((9\d|[2-9])\d{3})\-*(\d{4})))/;
        if (element instanceof HTMLElement){
           return regexPhone.test(element.value);
        }
        return false;
    }
    static validateCPF(Objcpf) {

        let cpf = Objcpf.value;
        //language=JSRegexp
        exp = /[.-]/g;
        cpf = cpf.toString().replace(exp, "");
        let digitTyped = eval(cpf.charAt(9) + cpf.charAt(10));
        let sum1 = 0,
            sum2 = 0;
        let vlr = 11;
        for (let i = 0; i < 9; i++) {
            sum1 += eval(cpf.charAt(i) * (vlr - 1));
            sum2 += eval(cpf.charAt(i) * vlr);
            vlr--;
        }
        sum1 = (((sum1 * 10) % 11) === 10 ? 0 : ((sum1 * 10) % 11));
        sum2 = (((sum2 + (2 * sum1)) * 10) % 11);
        let digitGem = (sum1 * 10) + sum2;
        return digitGem === digitTyped;

    }

    static check(element, type, maxSize){
        if (element.value.length >=maxSize){
            let validation;
            switch (type){
                case 'cpf':
                    validation = General.validateCPF(element);
                    break;
                case 'phone':
                    validation = General.ValidatePhone(element);
            }
            if(validation!==true){
                element.classList.add("has-error");
                return false;
            }else{
                element.classList.remove("has-error");
                return true;
            }
        }
        else if(!element.classList.contains('has-error')){
            element.classList.add('has-error');
            return false;

        }
        return false;
    }

    static maskInt() {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.returnValue = false;
            return false;
        }
        return true;
    }
    static formatField (field, Mask, event){
        let boolMask;
        let fieldPosition = 0;
        let newValueField = "";

        //language=JSRegexp
        exp = /[-.\/\][a-z]/g;
        let fieldOnlyNumbers = field.value.replace(exp, "");
        let maskSize = fieldOnlyNumbers.length;
        let typed = event.keyCode;
        if (typed !== 8) {
            // backspace
            for (let i = 0; i <= maskSize; i++) {
                boolMask = ((Mask.charAt(i) === "-") || (Mask.charAt(i) === ".") || (Mask.charAt(i) === "/"));
                boolMask = boolMask || ((Mask.charAt(i) === "(") || (Mask.charAt(i) === ")") || (Mask.charAt(i) === " "));
                if (!boolMask) {
                    newValueField += fieldOnlyNumbers.charAt(fieldPosition);
                    fieldPosition++;
                } else {
                    newValueField += Mask.charAt(i);
                    maskSize++;
                }
            }
            field.value = newValueField;
            //return true;
        } else {
            // return true;
        }
    }
    

}



