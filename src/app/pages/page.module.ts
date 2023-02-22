import { NgModule } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { SearchPipe } from './in-out-manager/search.pipe';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAlertModule } from 'ng-zorro-antd/alert';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CatalogueManagerComponent } from './catalogue-manager/catalogue-manager.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { IconImageComponent } from '../component/icon-image/icon-image.component';
import { ButtonAddComponent } from '../component/button-add/button-add.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InOutManagerComponent } from './in-out-manager/in-out-manager.component';
import { LimitManagerComponent } from './limit-manager/limit-manager.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CatalogueManagerComponent,
    IconImageComponent,
    ButtonAddComponent,
    InOutManagerComponent,
    LimitManagerComponent,
    DetailInfoComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    PageRoutingModule,
    NzTableModule,
    NzDividerModule,
    ComponentsModule,
    // HttpClientModule,
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
    NzSelectModule,
    NzModalModule,
    NzDatePickerModule,
    NzAlertModule, NzLayoutModule

    // BrowserAnimationsModule
  ],
})
export class DashboardModule {}
