import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { ApplicationDataModel } from 'src/app/utils/applicationDataModel';
import { UserDataModel } from 'src/app/utils/userDataModel';

@Component({
  selector: 'app-final-bidding',
  templateUrl: './final-bidding.component.html',
  styleUrls: ['./final-bidding.component.css']
})
export class FinalBiddingComponent implements OnInit {
  firmName:string;
  userDetail:Observable<UserDataModel>;
  currentApplication:ApplicationDataModel;
  routeParams:{};

  hasAppliedBefore:boolean;
  inputBidAmount:number;
  estimatedDays:number;
  applicantEmail:string;
  constructor(private firebaseConfigService: FirebaseConfigService,private router: Router,private route: ActivatedRoute,public authenticationService:AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.routeParams = params;
      // console.log(this.routeParams);
    });
    this.getLoggedInUserEmail();
    this.getBidDetails();
  }

  async getLoggedInUserEmail(){
    this.applicantEmail = this.authenticationService.loggedInUserEmail;
    await this.firebaseConfigService.getUserDetails(this.applicantEmail).then((val)=>{
      this.firmName = val.firmName;
    });
 }
 async getBidDetails(){
   var bidDetails; 
   await this.firebaseConfigService.getBidDetails(this.authenticationService.loggedInUserEmail,this.routeParams['chainName']).then((val)=>{
      bidDetails = val;
    });
    this.estimatedDays = bidDetails["data"]["etaInDays"];
    this.inputBidAmount = bidDetails["data"]["amount"];
 }

 applyForGr(){
  var submitDetailMap = {
    "userEmail":this.applicantEmail,
    "firmName":this.firmName,
    "userBidAmount":this.inputBidAmount,
    "etaInDays":this.estimatedDays,
    "chainName":this.routeParams["chainName"],
    "bidType": "finalBid"
  }; 
   this.firebaseConfigService.placeBid(submitDetailMap);
   window.alert("Final bid placed");
   this.router.navigate(["userHome"]);
 }

}
