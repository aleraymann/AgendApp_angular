import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path:'login',component: LoginComponent },
  { path:'',component: HomeComponent,
  canActivate:[AuthGuard] },
  { path:'patients',component: PatientsComponent,
  canActivate:[AuthGuard] },
  { path:'class',component: ClassComponent,
canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
