import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, FormGroup, ReactiveFormsModule }   from '@angular/forms';
import { PersonComponent } from './components/person/person.component';
import { AppBootstrapModule } from './app-bootstrap.module';
import { ModelComponent } from './components/model/model.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {NetworkService} from './services/network.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import { RouterModule,  Router } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
//import { AuthGuard } from './services/auth.guard';
//import { UserService } from './services/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { DropZoneDirective } from './drop-zone.directive';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PersonComponent,
    ModelComponent,
    NavBarComponent,
    DropZoneDirective,
    MenuComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    ReactiveFormsModule,
    //AngularFireModule.initializeApp(environment.firebase,"sapbe"),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule
  ],
  providers: [AuthService,NetworkService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
