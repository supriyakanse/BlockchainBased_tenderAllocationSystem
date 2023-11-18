import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  password:string = "";
  email:string = "";

  constructor(private readonly authService: AuthService,
  private readonly router: Router,private route: ActivatedRoute,) {

  }
  
  
    ngOnInit(): void {
  
  }


  async login() {
    sessionStorage.clear();
    if(this.email == "admin" && this.password == "admin"){
      window.alert("Admin Logged in Successfully!");
      sessionStorage.setItem('user', "admin@grblock.com");
      this.router.navigate(['/adminHomePage'],{relativeTo: this.route});
    }
    else{
      console.log("Logging in User");
      await this.authService.SignIn(this.email, this.password);
    }
    this.email = this.password = '';    
  }
}
