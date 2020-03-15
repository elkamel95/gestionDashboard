import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiginComponent } from './pages/sigin/sigin.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './services/helpers/auth-guard.service';

const routes: Routes = [

  { path: '', component: LayoutDashboardComponent ,children:[{
    path:'' , component:DashboardComponent , canActivate: [AuthGuard] , pathMatch: 'full' },
    {path:'signup' , component:SignUpComponent},
    {path:'sigin' , component:SiginComponent},

  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
