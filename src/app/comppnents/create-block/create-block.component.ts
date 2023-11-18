import { Component, OnInit } from '@angular/core';
import { CryptoBlock } from 'src/app/utils/cryptoBlock';
import { FirebaseConfigService } from '../../services/firebase-config.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize, take } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { stringify } from '@angular/compiler/src/util';
import { async } from '@firebase/util';


@Component({
  selector: 'app-create-block',
  templateUrl: './create-block.component.html',
  styleUrls: ['./create-block.component.css']
})
export class CreateBlockComponent implements OnInit {
  amount:string = "";
  description:string = "";
  chainName:string = "";
  nonce:number=0;
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string> = new Observable<string>();
  uploadProgress: Observable<number> = new Observable<number>();
  downloadURL: Observable<string> = new Observable<string>() ;
  selectedFilesList:FileList;
  chainId:string = "";
  finalDownloadUrl:string = "";
  
  constructor(public firebaseCongifService: FirebaseConfigService, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  timeStamp = Date();
 
  async createNewBlockChain(){
    this.chainId = this.createRandomChainId(4);
    console.log("New Chain id:"+this.chainId);
    await this.uploadFile().then(async (value)=>{
      console.log("File Upload complete");
    });
     
  }

  async updateInFirebase(){
    var dataMap = {
      sender:"Admin",
      "amount":this.amount
    };
    const cryptoBlock = new CryptoBlock( "#0", 0,dataMap,this.timeStamp );
    console.log("CryptoBlock timestamp:"+cryptoBlock.timeStamp);
    console.log("CryptoBlock data:"+JSON.stringify(cryptoBlock.data));
    console.log("CryptoBlock nonce:"+cryptoBlock.nonce);
    console.log("CryptoBlock hash:"+cryptoBlock.hash);
    console.log("CryptoBlock prevHash:"+cryptoBlock.prevHash);
    console.log("ChainName:"+this.chainName);
    console.log("Description:"+this.description);
    
    await this.firebaseCongifService.addNewChain(cryptoBlock,this.chainName,this.description,this.chainId,this.finalDownloadUrl).then(async ()=>{
      window.alert("New G.R added successfully!"); 
    });
  }

  chooseFile(event){
    this.selectedFilesList = event.target.files;
    if(this.selectedFilesList.item(0)){
      let file = this.selectedFilesList.item(0);
      console.log("Filename:"+file.name);
      console.log("lastModified:"+file.lastModified);  
      console.log("size:"+file.size);  
      console.log("slice:"+file.slice);  
      console.log("type:"+file.type);  
    }
  }

  
  async uploadFile() {
    let file = this.selectedFilesList.item(0);
    this.ref = this.afStorage.ref(this.chainId);
    this.task = this.ref.put(file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => {return s.state;}));
    this.uploadProgress = this.task.percentageChanges();
    (await this.task).ref.getDownloadURL();
    (await this.task).ref.getDownloadURL().then(async(val)=>{
      this.finalDownloadUrl = val.toString();
      console.log(this.finalDownloadUrl);
      await this.updateInFirebase();
    });
  }
 
  createRandomChainId(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


}
