import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
  )
  { 
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["",[Validators.required,Validators.email]],
      password: ["",Validators.required]
    })
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'profile-picture';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.authService.doRegister(this.registerForm.value)
  }

}
