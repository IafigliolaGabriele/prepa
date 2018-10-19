import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ModelComponent } from './model/model.component';
import { NavBarComponent} from './nav-bar/nav-bar.component';
import { PersonComponent } from './person/person.component';

const routes: Routes =[
  
  {path: '', children: [
    {path: 'home', component: HomeComponent},
    {path: 'person/:id', component: PersonComponent},
    {path: 'model', component: ModelComponent},
  ],
  component: NavBarComponent
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: LoginComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
