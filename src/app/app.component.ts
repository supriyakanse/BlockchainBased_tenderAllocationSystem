import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FirebaseConfigService } from './services/firebase-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GR-BlockChain';
  constructor(private firebaseConfigService: FirebaseConfigService,public authenticationService:AuthService,
    private route: ActivatedRoute,private router: Router,private http: HttpClient
    ){
      this.router.navigate(['/dashBoard'], { relativeTo: this.route });
  }
}
