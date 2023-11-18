import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './comppnents/login/login.component';
import { AuthService } from './services/auth.service';
import { AngularFirestoreModule,AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule  } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseConfigService } from './services/firebase-config.service';
import { RegistrationComponent } from './comppnents/registration/registration.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { NavBarComponent } from './comppnents/nav-bar/nav-bar.component';
import { CreateBlockComponent } from './comppnents/create-block/create-block.component';
import { GRListAdminComponent } from './pages/g-rlist-admin/g-rlist-admin.component';
import { NavBarAdminComponent } from './comppnents/nav-bar-admin/nav-bar-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { ApplicatsListComponent } from './pages/applicats-list/applicats-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './comppnents/user-details/user-details.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { CommonModule } from '@angular/common';
import { ApplicationFormComponent } from './pages/application-form/application-form.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationComponent } from './pages/notification/notification.component';
import { FinalBiddingComponent } from './pages/final-bidding/final-bidding.component';
import { FinalizingWorkComponent } from './pages/finalizing-work/finalizing-work.component';

var config = {
  apiKey: "AIzaSyB4rqP_0D7H6zL_GsVlee7qGar3VXLAl2o",
  authDomain: "grblock-86b27.firebaseapp.com",
  projectId: "grblock-86b27",
  storageBucket: "grblock-86b27.appspot.com",
  messagingSenderId: "751740747742",
  appId: "1:751740747742:web:573b8c31ff67afe951a74f"
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminHomeComponent,
    NavBarComponent,
    CreateBlockComponent,
    GRListAdminComponent,
    NavBarAdminComponent,
    ApplicatsListComponent,
    DashboardComponent,
    UserDetailsComponent,
    UserHomeComponent,
    ApplicationFormComponent,
    NotificationComponent,
    FinalBiddingComponent,
    FinalizingWorkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    CommonModule,
    MatBadgeModule  
  ],

  providers: [
    AuthService,
    AngularFirestore,
    FirebaseConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
