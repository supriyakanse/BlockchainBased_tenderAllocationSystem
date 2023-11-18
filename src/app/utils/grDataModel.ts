export class GRDataModel{
    chainId: string = "" ;
    grName: string = "";
    description: string = "";
    grAmount: number = -1;
    status: string = "active";
    associatedTo : string = "NA";
    grDocumentUrl:string = "";

    constructor(
        CHAINID: string,
        GRNAME: string,
        DESCRIPTION: string,
        GRAMOUNT: number,
        STATUS: string,
        ASSOICIATEDTO : string,
        GRDOCUMENTURL:string
        ){
         this.associatedTo = ASSOICIATEDTO;
         this.chainId = CHAINID;
         this.description = DESCRIPTION;
         this.grAmount = GRAMOUNT;
         this.grDocumentUrl = GRDOCUMENTURL;
         this.grName = GRNAME;
         this.status = STATUS;

    }
}