import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, TimeInterval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  map:any = {
    "data":"Hello",
    "time":Date()
  };
  constructor(public authenticationService:AuthService,private route: ActivatedRoute,private router: Router) { }
    ngOnInit(): void {
      // interval(1000)
      // .subscribe((val) => { });
    }

  loginLogout(){
    if(this.authenticationService.isLoggedIn){
        this.authenticationService.SignOut();
    }
    else{
      this.router.navigate(['/login'],{ relativeTo: this.route });
    }
  }

  isUserLoggedIn(): boolean{
    if(this.authenticationService.isLoggedIn){
        return true;
    }
    else{
      return false;
    }
  }

}
