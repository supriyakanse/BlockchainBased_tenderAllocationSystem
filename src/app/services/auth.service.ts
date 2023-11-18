import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean= false;
  loggedInUserEmail:string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private route: ActivatedRoute,
    ) {
      this.isLoggedIn = !!sessionStorage.getItem('user');
      this.loggedInUserEmail = sessionStorage.getItem('user');
    }
    
    SignUp(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          window.alert("User registered:"+result.user?.email);
          console.log(result.user?.email)
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    async SignIn(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          let userType:string;
          let authorityType:string;
          window.alert("User Login Success");
          this.isLoggedIn = true;
          console.log("Login Result:"+result.user?.email);
          sessionStorage.setItem('user', email);
          this.loggedInUserEmail = email;
          this.router.navigate(['/userHome'],{relativeTo: this.route});
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    SignOut() {
      this.afAuth
        .signOut();
      console.log('Signed Out');
      window.alert("User LoggedOut");
      sessionStorage.removeItem("user");
      this.isLoggedIn = false;
      this.router.navigate(['/login'],{ relativeTo: this.route });
    }

   
}
