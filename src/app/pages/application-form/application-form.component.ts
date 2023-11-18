import { Component, OnInit } from '@angular/core';
import { GRDataModel } from 'src/app/utils/grDataModel';
import { ApplicationDataModel } from 'src/app/utils/applicationDataModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { StringFormat } from '@angular/fire/compat/storage/interfaces';
import { lastValueFrom, Observable } from 'rxjs';
import { UserDataModel } from './../../utils/userDataModel';
import { async } from '@firebase/util';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
 
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
      console.log(this.routeParams);
    });
    
    this.getLoggedInUserEmail();
    this.checkIfUserHasApplied();
  }

 async checkIfUserHasApplied(){

  this.firebaseConfigService.getAllBocksOfChain(this.routeParams['chainName']).subscribe((collections)=>{
    collections.map(item=>{
      var recvdData = JSON.parse(JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
      if(recvdData['data']['sender'] == this.authenticationService.loggedInUserEmail){
        this.hasAppliedBefore = true;
        console.log("User hasApplied:"+this.hasAppliedBefore);
      }  
    });
  })
 }

  async applyForGr(){
    if(this.hasAppliedBefore){
        window.alert("You have applied for this GR before.");
    }
    else{
      var submitDetailMap = {
        "userEmail":this.applicantEmail,
        "firmName":this.firmName,
        "userBidAmount":this.inputBidAmount,
        "etaInDays":this.estimatedDays,
        "chainName":this.routeParams["chainName"],
        "bidType":"initialBid"
      }; 
       await this.firebaseConfigService.placeBid(submitDetailMap).then((c)=>{
        this.router.navigate(['/userHome'],{ relativeTo: this.route });
       });
    }
    }
  // async getGRDetails(){
  //   this.currentGrModel = await this.firebaseConfigService.getGrDetaistOrder(this.chainName);
  //   console.log(this.chainName);
  // }


  async getLoggedInUserEmail(){
    this.applicantEmail = this.authenticationService.loggedInUserEmail;
    await this.firebaseConfigService.getUserDetails(this.applicantEmail).then((val)=>{
      this.firmName = val.firmName;
    });
   

  }

  // async getAllApplicantsEmail(){
    
  //   this.firebaseConfigService.getAllAppicantsEmail().subscribe(actionArray =>{
  //     this.emailsList = actionArray.map(item =>{
  //       var recvdData = JSON.parse(JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
  //       console.log(recvdData);
  //       return recvdData["email"];
  //     });
  //   });
  // }
}
