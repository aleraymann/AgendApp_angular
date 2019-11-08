import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import{ AngularFireModule} from '@angular/fire';
import{AngularFireDatabaseModule} from '@angular/fire/database';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './patients/list/list.component';
import { EditComponent } from './patients/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { ClassComponent } from './class/class.component';
import { EditClassComponent } from './class/edit-class/edit-class.component';
import { ListClassComponent } from './class/list-class/list-class.component';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    HomeComponent,
    PatientsComponent,
    LoginComponent,
    ClassComponent,
    EditClassComponent,
    ListClassComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    TextMaskModule
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
