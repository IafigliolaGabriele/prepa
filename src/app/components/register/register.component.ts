import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  uploadPercent: any;
  downloadURL: any;
  uploadFile: any;
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  )
  { 
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["",[Validators.required,Validators.email]],
      password: ["",Validators.required]
    })
  }

  ngOnInit() {
    
  }

/**
  * Function to get a Period with an ID
  * @author Gabriele Iafigliola
*/
  onSubmit(){
    this.authService.doRegister(this.registerForm.value)
  }

}
