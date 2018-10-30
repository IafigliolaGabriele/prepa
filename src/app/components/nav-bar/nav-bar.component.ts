import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { 

  }
  
  email:string;


  ngOnInit() {
    this.authService.user.subscribe(user=>{
      if(user){
        console.log("User,",user.email)
        this.email = user.displayName;
        console.log("Email",this.email)
      }else{
        this.email = "Anonymous";
      }
    })
  }

  Logout(){
    this.authService.doLogout();
  }

}
