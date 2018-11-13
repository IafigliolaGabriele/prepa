import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.authService.user.subscribe(user => {
        console.log("Entre",user)
        if(user){
          console.log("User")
          return resolve(true)
        }else{
          console.log("Not User")
          this.router.navigate(['login'])
          return resolve(false)
        }
      })

      // .then(user => {
      //   this.router.navigate(['/dashboard']);
      //   return resolve(false);
      // }, err => {
      //   return resolve(true);
      // })
    })
  }
}