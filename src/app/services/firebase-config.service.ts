import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoBlock } from '../utils/cryptoBlock';
import { GRDetailsModel } from './../utils/grDetailsModel';
import { GRDataModel } from './../utils/grDataModel';
import { UserDataModel } from '../utils/userDataModel';
import { async } from '@firebase/util';
import { Observable, take } from 'rxjs';
import { of } from 'rxjs';
import { rejects } from 'assert';
import { map } from 'rxjs/internal/operators/map';
import { NotificationDataModel } from '../utils/notificationDataModel';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
  prevHash:string = "";
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,) { }


    async registerUserInDb(registrationMap:any){
      await this.firestore.collection('Users').doc(registrationMap["email"]).set(registrationMap);
      await this.firestore.collection('Users').doc(registrationMap["email"]).collection("notifications").doc("-1").set({});
    }
    
    async addNewChain(
      initialCryptoBlock:CryptoBlock,
      chainName:string,
      description:string,
      chainId:string,
      grDocumentUrl:string
      ){

      var initialMap = {
        "chainId":chainId,
        "description":description,
        "name":chainName,
        "associatedTo":"NA",
        "status":"active",
        "grDocumentUrl":grDocumentUrl,
        "grAmount":initialCryptoBlock.data["amount"]
      }; 
      var cryptoData = {
        "data":initialCryptoBlock.data,
        "hash":initialCryptoBlock.hash,
        "prevHash":initialCryptoBlock.prevHash,
        "nonce":initialCryptoBlock.nonce,
        "timestamp":initialCryptoBlock.timeStamp,
        
      }; 
      await this.firestore.collection('BlockChains').doc(chainName).set(initialMap).then(async()=>{
        await this.firestore.collection('BlockChains').doc(chainName).collection('chain').doc("0").set(cryptoData);
      });
    }

    getAllGrs()  {
      return this.firestore.collection('BlockChains').valueChanges();
    }

    async getGrDetaistOrder(chainName:string): Promise<GRDataModel>  {
      var data;
      var returnObject
      this.firestore.collection('BlockChains').doc(chainName).ref.get().then(snap=>{
        data = JSON.parse(JSON.stringify(snap.data()));
        console.log("Data:"+data["chainId"]);
        returnObject(
          data["chainId"],
          data["name"],
          data["description"],
          data["grAmount"],
          data["status"],
          data["associatedTo"],
          data["grDocumentUrl"],
        )as GRDataModel;  
      });
      return returnObject;
    }
    

    async getUserDetails(userEmail:string): Promise<UserDataModel>  {
      var data;
      
      return this.firestore.collection('Users').doc(userEmail).ref.get().then(snap=>{
        data = JSON.parse(JSON.stringify(snap.data()));
        console.log("Data:"+data);
        return new UserDataModel(
          data["email"],
          data["name"],
          data["firmName"],
          data["phone"],
        );  
      });
      
    }

  getAllAppicants(chainName:string)  {
    return this.firestore.collection('BlockChains').doc(chainName).collection("chain").valueChanges();
  }

  getAllAppicantsEmail(){
    return this.firestore.collection('Users').valueChanges();
  }

  async placeBid(submitDetailMap:any){
    console.log(submitDetailMap);
    var chainListLength = 0; 
    let latestHash:string;
    this.firestore.collection('BlockChains').doc(submitDetailMap["chainName"]).collection("chain").get().subscribe(async (collectionList)=>{
      chainListLength = collectionList.docs.length;
      await this.firestore.collection('BlockChains').doc(submitDetailMap["chainName"]).collection("chain").doc((chainListLength-1).toString()).ref.get().then((snap)=>{
        var data;
        data = JSON.parse(JSON.stringify(snap.data()));
        console.log("Prev Hash : "+data["hash"]);
        this.prevHash = data["hash"];
        var dataMap = {
          sender:submitDetailMap["userEmail"],
          "amount":submitDetailMap["userBidAmount"],
          "etaInDays":submitDetailMap["etaInDays"],
          "firmName":submitDetailMap["firmName"],
          "bidType":submitDetailMap["bidType"]
        };
        const cryptoBlock = new CryptoBlock( this.prevHash, chainListLength,dataMap, Date() );
        var cryptoData = {
          "data":dataMap,
          "hash":cryptoBlock.hash,
          "prevHash":cryptoBlock.prevHash,
          "nonce":cryptoBlock.nonce,
          "timestamp":cryptoBlock.timeStamp,
        }; 
        var docId = ""+(chainListLength).toString();
        this.firestore.collection('BlockChains').doc(submitDetailMap["chainName"]).collection("chain").doc(docId).set(cryptoData).then(()=>{
          window.alert("Bid placed Successfuly");
        }); 
      });
    });
  }


  getAllBocksOfChain(chainName:string):Observable<any[]>{
    return this.firestore.collection('BlockChains').doc(chainName).collection("chain").valueChanges();
  }


  listenToNewNotification(email: string): Observable<any> {
    const collection = this.firestore.collection("Users").doc(email).collection<NotificationDataModel>('notifications')
    const notifications$ = collection
      .valueChanges()
      .pipe(
        map(notifications => {
          console.log(notifications);
          return notifications;
        })
      );
    
    return notifications$;
    }
    getAllNotifications(userEmail:string){
      return this.firestore.collection('Users').doc(userEmail).collection("notifications").valueChanges();
    }

    markSeenAllNotifications(userEmail:string){
      this.firestore.collection('Users').doc(userEmail).collection("notifications").valueChanges().subscribe((notificationsList)=>{
        notificationsList.map(((item,index)=>{
          var recvdData = JSON.parse(JSON.stringify(item,this.getCircularReplacer()));
          if(recvdData["seen"]==false){
             this.firestore.collection("Users").doc(userEmail).collection("notifications").doc(index.toString()).update({"seen":true});              
           } 
        }));
      });
    }

    markNotificationSeen(userEmail:string,timeStamp:string){
      this.firestore.collection("Users").doc(userEmail).collection("notifications").doc(timeStamp.substring(0,24)).update({"seen":true});              
    }

    async assignTaskTo(chainName:string,firmName:string){
      console.log("CHAIN:"+chainName);
      console.log("FIRM:"+firmName);
      await this.firestore.collection("BlockChains").doc(chainName).update({"associatedTo":firmName,"status":"Allocated"});              
    }

    async sendNotificationToUser(userEmail:string,notificationModel:NotificationDataModel){
     let notificationMap={
        "grName":notificationModel.grName,
        "notificationType":notificationModel.notificationType,
        "seen":notificationModel.seen,
        "subTitle":notificationModel.subTitle,
        "timeStamp":notificationModel.timeStamp,
        "title":notificationModel.title
      };
      this.firestore.collection("Users").doc(userEmail).collection("notifications").doc(""+Date().substring(0,24)).set(notificationMap);
    }

    getChainId(chainName:string){
      let chainId = "";
      this.firestore.collection("BlockChains").doc(chainName).ref.get().then((snap)=>{
        let data = JSON.parse(JSON.stringify(snap.data()));
        chainId = data["chainId"];
      });
      return chainId;
    }


    async getBidDetails(userEmail:string,chainName:string):Promise<any>{
      var bidData;
      await this.firestore.collection("BlockChains").doc(chainName).collection("chain").ref.get().then((snap)=>{
        snap.forEach((individualBlock)=>{
         var bid = JSON.parse(JSON.stringify(individualBlock.data()));
         if(bid["data"]["sender"] == userEmail){
          //  console.log(bid);
           bidData =bid;
         }
        });
      });
      return bidData;
    }
  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key:string, value:any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

 
}
