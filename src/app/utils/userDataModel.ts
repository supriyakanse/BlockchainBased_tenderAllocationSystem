export class UserDataModel{
    email: string = "" ;
    name: string = "";
    firmName: string = "";
    phone: string = "active";
    constructor(
        EMAIL: string,
        NAME: string,
        FIRMNAME: string,
        PHONE: string,
        ){
         this.email =EMAIL;
         this.firmName = FIRMNAME;
         this.name = NAME;
         this.phone = PHONE;
    }
}