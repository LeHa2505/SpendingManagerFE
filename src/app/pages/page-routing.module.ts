import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueManagerComponent } from './catalogue-manager/catalogue-manager.component';
import { CreateShippingOrderComponent } from './create-shipping-order/create-shipping-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
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
    path: 'create-shipping-order',
    component: CreateShippingOrderComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class PageRoutingModule {}
