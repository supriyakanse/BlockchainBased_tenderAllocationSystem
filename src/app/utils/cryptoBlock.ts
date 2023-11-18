import * as sha256  from 'crypto-js/sha256';

export class CryptoBlock {
    hash: string;
    prevHash: string;
    nonce: number;
    data: any;
    timeStamp: any;
    constructor(
         prevHash:string,
         nonce:number,
         data:any,
         timeStamp:any )
        {
          this.data = data;
          this.hash = this.computeHash();
          this.prevHash = prevHash;
          this.nonce = nonce;
          this.timeStamp = timeStamp;
       }
       computeHash(){
        return sha256(this.nonce + this.prevHash + this.timeStamp + JSON.stringify(this.data)).toString();
      } 
}


export class Chains {
  chainName: string = "";
  description: string = " ";
  
  constructor(
    chainName:string,
    description:number )
      {
        this.chainName = chainName;
        this.description = this.description;
     }
}


export class SingleBlock {
  hash: string;
  prevHash: string;
  nonce: number;
  data: any;
  timeStamp: any;
  constructor(
       prevHash:string,
       nonce:number,
       data:any,
       hash: string,
       timeStamp:any )
      {
        this.data = data;
        this.hash = hash;
        this.prevHash = prevHash;
        this.nonce = nonce;
        this.timeStamp = timeStamp;
     }
}
