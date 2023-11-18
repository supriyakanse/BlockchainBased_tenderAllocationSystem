import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { NotificationDataModel } from './../../utils/notificationDataModel';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationsList:NotificationDataModel[];
  constructor(public authenticationService:AuthService,private firebaseConfigService: FirebaseConfigService,
    private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.getAllNotification();
  }

getAllNotification(){
  this.firebaseConfigService.getAllNotifications(this.authenticationService.loggedInUserEmail).subscribe(actionArray =>{
    this.notificationsList = actionArray.map(item =>{
      var recvdData = JSON.parse(JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
      return {
       title:recvdData["title"],
       timeStamp:recvdData['timeStamp'],
       seen:recvdData["seen"],
       subTitle:recvdData['subTitle'],
       notificationType:recvdData['notificationType'],
       grName:recvdData["grName"] 
      }as NotificationDataModel;
    });
  }); 
}
  carryOutOperation(notificationType:string,timeStamp:string,index:number){
    console.log("Notification type:"+notificationType);
    console.log("Notification time stamp:"+timeStamp);
    this.firebaseConfigService.markNotificationSeen(this.authenticationService.loggedInUserEmail,timeStamp);
    if(notificationType == "finalBidding"){
      let chainName = this.notificationsList[index].grName;
      this.router.navigate(["finalBiddingForm", chainName]);
    }
    else{
      this.router.navigate(["userHome"]);
    }
  }
}
