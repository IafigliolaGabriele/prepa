import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ModelComponent } from './components/model/model.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PersonComponent } from './components/person/person.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from './services/auth.guard';
import { ShoppingHistoryComponent } from './components/shopping-history/shopping-history.component';
const routes: Routes = [
  {
    path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'person/:id', component: PersonComponent },
      { path: 'model', component: ModelComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'shoppingHistory', component: ShoppingHistoryComponent },
    ],
    component: NavBarComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
