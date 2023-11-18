import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {GRDetailsModel } from '../../utils/grDetailsModel';
import { FirebaseConfigService } from './../../services/firebase-config.service';
import { GRDataModel } from './../../utils/grDataModel';

@Component({
  selector: 'app-g-rlist-admin',
  templateUrl: './g-rlist-admin.component.html',
  styleUrls: ['./g-rlist-admin.component.css']
})
export class GRListAdminComponent implements OnInit {
  list : GRDataModel[]=[];
  id:number = 0;
  constructor(private firebaseConfigService: FirebaseConfigService,
  private route: ActivatedRoute,private router: Router) { }
  
 
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
          associatedTo:recvdData["associatedTo"]
        }as GRDataModel;
      });
    });

    // for(this.i = 0; this.i<4;this.i++){
    //     let newGRObj = new GRDataModel();
    //     newGRObj.applicantName = "Applicant Name";
    //     newGRObj.bidAmount = 10000000;
    //     newGRObj.firmId = "0";
    //     newGRObj.firmName= "Firm co lts";
    //     newGRObj.id = this.i;
    //     newGRObj.hash = 'k3r124',
    //     newGRObj.nonce = 212,
    //     newGRObj.timeStamp = "Fri Apr 22 2022 16:19:34";
    //     newGRObj.prevHash = "focn28v";
    //     newGRObj.selected = this.i%2 == 0?true:false;
    //     this.list.push(newGRObj);
    //   }
    
  }

  onSelect(chainName:string)
  {
    this.router.navigate(["applicantsList", chainName]);
    alert(chainName);
  }
 
    
                  
}
