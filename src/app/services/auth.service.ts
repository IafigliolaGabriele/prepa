import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User | null>;
  usuario;
  currentUser: firebase.User;
  userKey: any;

  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router, 
    private db: AngularFirestore) 
  {
    this.afAuth.auth.onAuthStateChanged(
      (auth) => {
        if (auth != null) {
          //this.user = this.af.database.object('users/' + auth.uid);
          this.currentUser = this.afAuth.auth.currentUser;
          this.userKey = auth.uid;
        }else{
          //this.router.navigate(['login'])
        }
      });
    this.user = this.afAuth.authState
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then((user) => {
        this.db.collection("users").doc(user.user.uid).set({
          username: value.username,
          email: value.email,
         })
         console.log("User",user);
          user.user.updateProfile({
            displayName: value.username,
            photoURL: "none"
          }).then(function() {
            console.log("Succes")
            // Update successful.
          }).catch(function(error) {
            console.log("Failure")
            // An error happened.
          });
      resolve(true)
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log("respuesta",res)
        this.router.navigate(['home'])
        localStorage.setItem("user",JSON.stringify(res.user))
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

  getUser(){
    return this.usuario;
  }

}
