import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  url: string;

  constructor(
    private db: AngularFireDatabase, 
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afd: AngularFirestore ) 
  { 
    this.loginForm = fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
    })
  }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

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

  onSubmit(){
    console.log("Submit",this.loginForm.value);
    this.authService.doLogin(this.loginForm.value);
  }

  ngOnInit() {
    this.storage.ref("caratulas/naruto_bijuu_by_thealm-d4qeg53.jpg").getDownloadURL().subscribe(data=>{
      console.log("data",data)
      this.url = data;
    });
  }


}
