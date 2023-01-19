import { NgModule } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconsProviderModule } from '../icons-provider.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CreateShippingOrderComponent } from './create-shipping-order/create-shipping-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CatalogueManagerComponent } from './catalogue-manager/catalogue-manager.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { ChartsModule } from 'ng2-charts/ng2-charts';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [DashboardComponent, CreateShippingOrderComponent, HomeComponent, CatalogueManagerComponent],
  imports: [
    PageRoutingModule,
    NzTableModule,
    NzDividerModule,
    ComponentsModule,
    HttpClientModule,
    NgChartsModule,
    NzCardModule,
    IconsProviderModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzCalendarModule,
    // NgModel,
    NgxChartsModule,
    NzSelectModule
    // BrowserAnimationsModule 
  ],
})
export class DashboardModule {}
