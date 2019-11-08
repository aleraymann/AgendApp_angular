import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAutenticate: boolean = false;
  menuEmitter = new EventEmitter<boolean>();

  private eventError = new BehaviorSubject<string>("");
  eventError$ = this.eventError.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          this.userAutenticate = true;
          this.menuEmitter.emit(true);
          this.router.navigate(['/']);
        } else {
          this.userAutenticate = false;
          this.menuEmitter.emit(false);
        }
      })
      .catch(error => {
        this.eventError.next(error);
      });
    }

    logout(){
      this.userAutenticate = false;
      this.menuEmitter.emit(false);
      this.router.navigate(['/login']);
    }


userIsAutenticate(){
  return this.userAutenticate;
}

}
