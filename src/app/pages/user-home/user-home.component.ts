import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseConfigService } from 'src/app/services/firebase-config.service';
import { GRDataModel } from 'src/app/utils/grDataModel';
import { async } from '@firebase/util';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  list : GRDataModel[]=[];
  id:number = 0;

  constructor(private firebaseConfigService: FirebaseConfigService,public authenticationService:AuthService,
    private route: ActivatedRoute,private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
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

  async applyForGr(chainName:string,bidAmount:number){
    this.router.navigate(["applicationForm", chainName, bidAmount]);
      console.log("Applying for GR :"+chainName);
      console.log("GR amount :"+bidAmount);
  }
}
