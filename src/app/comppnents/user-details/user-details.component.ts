import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, filter, interval, of, Subscription, switchMap, takeWhile, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit,OnDestroy  {
  loggedInUserEmail:string = "";
  minutes: number;
  subscription: Subscription;

  constructor(public authenticationService:AuthService,private firebaseConfigService: FirebaseConfigService,private readonly router: Router,private route: ActivatedRoute) { 
 }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  newNotification:string = "*";
  notifications:any;  

  ngOnInit(): void {
    this.loggedInUserEmail = this.authenticationService.loggedInUserEmail;
    this.minutes = 15000;
    this.subscription = timer(0, this.minutes)
      .pipe(
        switchMap(() => {
          return this.firebaseConfigService.getAllNotifications(this.loggedInUserEmail)
            .pipe(catchError(err => {
              // Handle errors
              console.error("Error at Notification Polling:"+err);
              return of(undefined);
            }));
        }),
        filter(data => data !== undefined)
      )
      .subscribe(data => {
        this.notifications = data;
        this.updateIfAnyNewNotification();
      });
  }

  isUserLoggedIn(): boolean{
    if(this.authenticationService.isLoggedIn){
        return true;
    }
    else{
      return false;
    }
  }

  openNotification(){
    this.router.navigate(['/notification'],{relativeTo: this.route});
  }
  
  updateIfAnyNewNotification(){
    let count = 0;
    this.notifications.map(item=>{
      var recvdData = JSON.parse(JSON.stringify(this.notifications,this.firebaseConfigService.getCircularReplacer() ));
      if(item["seen"] == false){
        count = count + 1;
      }
    });
    if(count> 0){
      this.newNotification = count.toString();
    }
    else{
      this.newNotification ="*";
    }
  }
}
