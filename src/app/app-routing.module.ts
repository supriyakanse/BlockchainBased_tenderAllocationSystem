import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './comppnents/login/login.component';
import { RegistrationComponent } from './comppnents/registration/registration.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ApplicatsListComponent } from './pages/applicats-list/applicats-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GRListAdminComponent } from './pages/g-rlist-admin/g-rlist-admin.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { ApplicationFormComponent } from './pages/application-form/application-form.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { FinalBiddingComponent } from './pages/final-bidding/final-bidding.component';
import { FinalizingWorkComponent } from './pages/finalizing-work/finalizing-work.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'adminHomePage', component: AdminHomeComponent },
  { path: 'grListAdmin', component: GRListAdminComponent },
  { path: 'applicantsList/:chainName', component: ApplicatsListComponent },
  { path: 'dashBoard', component: DashboardComponent },
  { path: 'userHome', component: UserHomeComponent },
  { path: 'applicationForm/:chainName/:bidAmount', component: ApplicationFormComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'finalBiddingForm/:chainName', component: FinalBiddingComponent },
  { path: 'finalizeWork/:chainName', component: FinalizingWorkComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
