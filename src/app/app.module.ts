import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { LayoutComponent } from './layout/layout.component';
import { NgChartsModule } from 'ng2-charts';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { BlankComponent } from './blank/blank.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';



registerLocaleData(vi);

@NgModule({
    declarations: [AppComponent, LayoutComponent, LoginComponent, RegisterComponent, BlankComponent],
    providers: [{ provide: NZ_I18N, useValue: vi_VN }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzAnchorModule,
        NgChartsModule,
        NzIconModule,
        NzButtonModule,
        NzTableModule,
        NzCalendarModule,
        CommonModule,
        NzFormModule,
        NzInputModule,
        NzLayoutModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzMessageModule,
        NzSelectModule,
        NzDatePickerModule
    ]
})
export class AppModule {}
