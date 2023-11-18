import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from '../../services/firebase-config.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  phone: string = "";
  name: string = "";
  firmName: string = "";

  constructor(public authService: AuthService,public firebaseCongifService: FirebaseConfigService) { }

  ngOnInit(): void {
  }

  register() {
    console.log("Registering user");
    var registrationMap = {};

    registrationMap = {
      "email":this.email,
      "phone":this.phone,
      "name":this.name,
      "password":this.password,
      "firmName":this.firmName
    };

    this.authService.SignUp(this.email, this.password).then(async (v)=>{
      console.log("Sign up called.");
       await this.firebaseCongifService.registerUserInDb(registrationMap); 
    });
  }
}
