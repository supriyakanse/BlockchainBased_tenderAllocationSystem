import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { GRDataModel } from 'src/app/utils/grDataModel';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list : GRDataModel[]=[];
  id:number = 0;

  constructor(private firebaseConfigService: FirebaseConfigService,public authenticationService:AuthService,
    private route: ActivatedRoute,private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.checkIfloggedIn();
    this.firebaseConfigService.getAllGrs().subscribe(actionArray =>{
    
      this.list = actionArray.map(item =>{
        var recvdData = JSON.parse(JSON.stringify(item,this.firebaseConfigService.getCircularReplacer() ));
        return {
          chainId:recvdData["chainId"],
          grName:recvdData["name"],
          grAmount:recvdData["grAmount"],
          status : recvdData["status"],
          description : recvdData["description"],
          associatedTo:recvdData["associatedTo"],
          grDocumentUrl:recvdData["grDocumentUrl"],
        }as GRDataModel;
      });
    });
  }


public  downloadFile(url: string): void {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const blobUrl = window.URL.createObjectURL(xmlHttp.response);
      const e = document.createElement('a');
      e.href = blobUrl;
      e.download = blobUrl.substr(blobUrl.lastIndexOf('/') + 1);
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
    }
  };
  xmlHttp.responseType = 'blob';
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

checkIfloggedIn(){
  let loggedInAs = sessionStorage.getItem('user');
  if(loggedInAs == null){
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
  else{
    if(loggedInAs == "admin@grblock.com"){
      this.router.navigate(['/adminHomePage'], { relativeTo: this.route });
    }
    else{
      this.router.navigate(['/userHome'], { relativeTo: this.route });
    }
  }
  
}
}
