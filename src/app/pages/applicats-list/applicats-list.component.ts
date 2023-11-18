import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { write } from 'fs';
import { timestamp } from 'rxjs';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { GRDataModel } from 'src/app/utils/grDataModel';
import { GRDetailsModel } from './../../utils/grDetailsModel';
import { NotificationDataModel } from './../../utils/notificationDataModel';

@Component({
  selector: 'app-applicats-list',
  templateUrl: './applicats-list.component.html',
  styleUrls: ['./applicats-list.component.css']
})
export class ApplicatsListComponent implements OnInit {
  list : GRDetailsModel[]=[];
  i:number = 0;
  chainName:string = "";  
  selectedApplicantsList:string[] = [];

  constructor(private firebaseConfigService: FirebaseConfigService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.chainName = params['chainName']);
    console.log("Chain Name:"+this.chainName);


    this.firebaseConfigService.getAllAppicants(this.chainName).subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        var recvdData = JSON.parse(JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
        console.log
        return {
          nonce:recvdData["nonce"],
          hash:recvdData["hash"],
          prevHash:recvdData["prevHash"],
          timeStamp:recvdData["timestamp"],
          applicantEmail:recvdData["data"]["sender"],
          bidAmount:recvdData["data"]["amount"],
          eta:recvdData["data"]['etaInDays'],
          bidType:recvdData["data"]['bidType']
        }as GRDetailsModel;
      });
    });
    
    // for(this.i = 0; this.i<4;this.i++){
    //   let newGRObj = new GRDetailsModel();
    //   newGRObj.applicantName = "Applicant Name";
    //   newGRObj.bidAmount = 10000000;
    //   newGRObj.firmId = "0";
    //   newGRObj.firmName= "Firm co lts";
    //   newGRObj.id = this.i;
    //   newGRObj.hash = 'k3r124',
    //   newGRObj.nonce = 212,
    //   newGRObj.timeStamp = "Fri Apr 22 2022 16:19:34";
    //   newGRObj.prevHash = "focn28v";
    //   newGRObj.selected = this.i%2 == 0?true:false;
    //   this.list.push(newGRObj);
    // }
  
  }

  onUpdateSelection(applicantEmail:string,index:number)
  {
    if(this.list[index].selected){
      this.list[index].selected = false;
      const indx = this.selectedApplicantsList.indexOf(applicantEmail);
      this.selectedApplicantsList.splice(indx,1);
    }
    else{
      this.list[index].selected = true;
      this.selectedApplicantsList.push(this.list[index].applicantEmail);
    }
    
  }

  sendNotification(){
    console.log("Sending notification");
    if(this.selectedApplicantsList.length == 0){
      window.alert("No Applicant selected");
    }
    else{
      this.sendFinalBidPlacingNotification();
    }
    console.log(this.selectedApplicantsList);
  }

  isBidFinal(index:number):boolean{
    if(this.list[index].bidType == "finalBid"){
      console.log("Index ",+index.toString());
      console.log("bidType ",+this.list[index].bidType.toString());
      return false;
    }
    else{
      return true;
    }
  }
  sendFinalBidPlacingNotification(){
    var notificationDataModel:NotificationDataModel;
    console.log("Selected List length:"+this.selectedApplicantsList.length);
    this.i = 0;
    for(this.i = 0; this.i<this.selectedApplicantsList.length;this.i++){
      console.log("Adding to Database");
      var currentTimeStamp = Date().toString();
      notificationDataModel = new NotificationDataModel(
        false,
        "You have been selected for further process of GR: "+this.chainName,
        "Approved for final bidding",
        currentTimeStamp,
        this.chainName,
        "finalBidding"
      );  
      this.firebaseConfigService.sendNotificationToUser(this.selectedApplicantsList[this.i],notificationDataModel);
        window.alert("Notification sent successfully");
        this.router.navigate(["adminHomePage"]);
   }
  }
  finalizingWork(){
    console.log("ChainNAME:"+this.chainName);
    this.router.navigate(["finalizeWork", this.chainName]);
  }
}
