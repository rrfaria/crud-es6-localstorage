export default class lsManager{
    constructor(table) {
        this.contactsArray = [];
        this.selectedIndex = -1;
        this.initialize();
    }

    initialize(){
        document.getElementById("tablerows").innerHTML = "";
        if (localStorage.contactsRecord) {
            this.contactsArray = JSON.parse(localStorage.contactsRecord);
            for (let i = 0; i <this.contactsArray.length; i++) {
                this.prepareTableCell(i,this.contactsArray[i].txtfullname,this.contactsArray[i].txtcpf,this.contactsArray[i].tb);
            }
        }
    }


    onRegisterPressed(image=null,thumb=null) {
        console.log(this.selectedIndex);
        let txtFullname = document.getElementById("txtFullname").value;
        let txtCpf = document.getElementById("txtCpf").value;
        let txtTelefone = document.getElementById("txtTelefone").value;
        let txtAddress = document.getElementById("txtAddress").value;
        let txtComplement = document.getElementById("txtComplement").value;
        let stuObj;
        if(image===null || thumb===null){
            stuObj = {
                txtfullname: txtFullname,
                txtcpf: txtCpf,
                txttelefone: txtTelefone,
                address: txtAddress,
                txtcomplement: txtComplement
            };
        }else{
            stuObj = {
                img: image,
                tb:thumb,
                txtfullname: txtFullname,
                txtcpf: txtCpf,
                txttelefone: txtTelefone,
                address: txtAddress,
                txtcomplement: txtComplement
            };
        }

        console.log('selected'+this.selectedIndex);
        if (this.selectedIndex === -1) {
            this.contactsArray.push(stuObj);
            console.log('é -1');
        } else {
            console.log('nao é -1');
            this.contactsArray.splice(this.selectedIndex, 1, stuObj);
        }
        localStorage.contactsRecord = JSON.stringify(this.contactsArray);
        this.initialize();
        this.onClarPressed();
    }
    prepareTableCell(index, name, cpf, thumb) {
        let table = document.getElementById("tablerows");
        let row = table.insertRow();
        let firstNameCell = row.insertCell(0);
        let lastNameCell = row.insertCell(1);
        let actionCell = row.insertCell(2);
        firstNameCell.innerHTML = '<img src="'+thumb+'" alt="'+name+'"/>';
        lastNameCell.innerHTML = '<div class="nome">'+name+'</div>'+'<div class="cpf"><span>CPF:</span>'+cpf+'</div>';
        actionCell.innerHTML = '<button class="btnEdit" data-id="'+ index+'">Editar</button><button class="btnDelete" data-id="'+ index +'"><i class="pe-7f-trash"/></button>';
    }
    deleteTableRow(index) {
        console.log('delete:',index);
        let item = JSON.parse(localStorage.contactsRecord);
        item.splice(index, 1);
        localStorage.contactsRecord = JSON.stringify(item);
        this.initialize();
    }
    onClarPressed() {
        this.selectedIndex = -1;
        document.getElementById("txtFullname").value = "";
        document.getElementById("txtCpf").value = "";
        document.getElementById("txtAddress").value = "";
        document.getElementById("txtTelefone").value = "";
        document.getElementById("txtComplement").value = "";
        document.querySelector(".root .mainPanel .shape .base img").setAttribute('src',"assets/images/shape-one.jpg");
        document.getElementById("uplImage").value = "";
        document.querySelector('#app .root .mainPanel .btnSave').innerHTML = "Salvar";
    }

    onEditPressed(index) {
        this.selectedIndex = index;
        let item = JSON.parse(localStorage.contactsRecord);
        let stuObj = item[index];
        document.getElementById("txtFullname").value = stuObj.txtfullname;
        document.getElementById("txtCpf").value = stuObj.txtcpf;
        document.getElementById("txtAddress").value = stuObj.address;
        document.getElementById("txtTelefone").value = stuObj.txttelefone;
        document.getElementById("txtComplement").value = stuObj.txtcomplement;
        document.querySelector('#app .root .mainPanel .btnSave').innerHTML = "Update";
        console.log(this.selectedIndex);
    }

}