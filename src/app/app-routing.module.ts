import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { BlankComponent } from './blank/blank.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // {
  //   path: 'layout',
  //   loadChildren: () =>
  //     import('./layout/layout.module').then((m) => m.LayoutModule),
  //   // canLoad : [LayoutComponent]
  // },
  {
    path: '',
    loadChildren: () =>
      import('./pages/page.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  // },
  {
    path: 'login',
    component : BlankComponent
  },
  {
    path: 'register',
    component : BlankComponent
  },
  {
    path: 'exception',
    loadChildren: () =>
      import('./shared/exception/exception.module').then(
        (m) => m.ExceptionModule
      ),
  },
  { path: '**', redirectTo: '/exception/403' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
