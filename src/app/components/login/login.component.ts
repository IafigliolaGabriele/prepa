import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( 
    private authService: AuthService,
    private fb: FormBuilder
  ) 
  { 
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
    })
  }
  /**
   * Function to submit an user
   * @author Gabriele Iafigliola
  */
  onSubmit(){
    this.authService.doLogin(this.loginForm.value);
  }

  ngOnInit() {

  }

}
