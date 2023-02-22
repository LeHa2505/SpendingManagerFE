import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component';
import { LayoutComponent } from '../layout/layout.component';
import { CatalogueManagerComponent } from './catalogue-manager/catalogue-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { HomeComponent } from './home/home.component';
import { InOutManagerComponent } from './in-out-manager/in-out-manager.component';
import { LimitManagerComponent } from './limit-manager/limit-manager.component';



const routes: Routes = [

  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/page.module').then((m) => m.DashboardModule),
  // },

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'catalogue-manager',
    component: CatalogueManagerComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'spending-info-manager',
    component: InOutManagerComponent,
  },
  {
    path: 'limitcash-manager',
    component: LimitManagerComponent,
  },
  {
    path: 'user-infomation',
    component: DetailInfoComponent,
  },
  
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class PageRoutingModule {}
