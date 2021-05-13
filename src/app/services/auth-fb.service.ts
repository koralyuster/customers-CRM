import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFbService {
  user: any = {};
  //afAuth -> משתנה שיכול לעשות את כל הפעולות של אוטנטיקציה כגון לוג אין, לוג אוט, הרשמה וטונטיקציה אם מחובר
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async logInFb(_email: string, _pass: string) {
    let user = await this.afAuth.signInWithEmailAndPassword(_email, _pass);
    return user;
  }

  //לוג אוט
  async logOut() {
    await this.afAuth.signOut();
    //back to login
    this.router.navigate(["/"]);
  }

  getUserData(): any {
    return this.user;
  }

  //בודק אם המשתמש מחובר
  checkUserAuth() {
    this.afAuth.authState.subscribe((user: any) => {
      console.log(user);
      if (!user) {
        //אם לא מזהה יוזר
        alert("You must log in first to see the admin panel");
        this.router.navigate(["/"]);
      }
      else {
        for (let key in user) {
          this.user[key] = user[key];
        }
      }
    })
  }
}
