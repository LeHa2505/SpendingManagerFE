import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueManagerComponent } from '../pages/catalogue-manager/catalogue-manager.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { DetailInfoComponent } from '../pages/detail-info/detail-info.component';
import { HomeComponent } from '../pages/home/home.component';
import { InOutManagerComponent } from '../pages/in-out-manager/in-out-manager.component';
import { LimitManagerComponent } from '../pages/limit-manager/limit-manager.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
  // {
  //   path: 'catalogue-manager',
  //   component: CatalogueManagerComponent,
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'spending-info-manager',
  //   component: InOutManagerComponent,
  // },
  // {
  //   path: 'limitcash-manager',
  //   component: LimitManagerComponent,
  // },
  // {
  //   path: 'user-infomation',
  //   component: DetailInfoComponent,
  // },

  
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },

];

// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
