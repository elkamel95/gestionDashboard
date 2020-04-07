import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiginComponent } from './pages/sigin/sigin.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './services/Auth/auth-guard.service';
import { WidgetTableComponent } from './pages/widget/widget-table/widget-table.component';
import { Login2Component } from './pages/login2/login2.component';

const routes: Routes = [

  { path: '', component: LayoutDashboardComponent    ,children:[{
    path:'' , component:DashboardComponent , canActivate: [AuthGuard] , pathMatch: 'full' }, 
    {path:'widget', component:WidgetTableComponent ,canActivate: [AuthGuard]  },
  

  ] },
  {path:'signup' , component:SignUpComponent },
    {path:'sigin' , component:SiginComponent},

  {path:'login' , component:Login2Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
