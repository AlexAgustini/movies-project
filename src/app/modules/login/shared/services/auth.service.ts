import { Injectable } from '@angular/core';
import { UserForm } from '../types/user.type';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseErrorEnum } from '../../../../common/helpers/types/firebase-errors.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegisterUserResult } from 'src/app/common/helpers/types/firebase-register-result.tpye';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/common/services/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private sidenavService: SidenavService) { }

  public currentUser$ = new BehaviorSubject<firebase.default.User | null>(null);

  public async registerUser(userData: UserForm): Promise<RegisterUserResult> {
    try {
      const authResult = await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then((result)=> {
          result.user?.updateProfile({
            displayName: userData.name
          })
          return result;
        })

      if (authResult.user) {
          const userDocRef = this.db.collection("users").doc(authResult?.user.uid);
          await userDocRef.set({
            name: userData.name,
            email: userData.email,
          });
      }
      return authResult;

    } catch (error: any){
      const errorCode = error.code;
      if (errorCode === FirebaseErrorEnum.EMAIL_INVALID) {
        return {
          errorType: "email",
          message: "The email format is invalid. Please try another one.",
        }
      } else if (errorCode === FirebaseErrorEnum.EMAIlL_ALREADY_IN_USE) {
        return {
          errorType: "email",
          message: "This email is already being used. Please try another one.",
        }
      } else if (errorCode === FirebaseErrorEnum.WEAK_PASSWORD) {
        return {
          errorType: "password",
          message: "Weak password. Please try another one.",
        }
      } else {
        return {
          errorType: "generic",
          message: "Invalid credentials. Please try again.",
        }
      }
    }
  }

  public async login(userData: UserForm): Promise<RegisterUserResult> {
    try {
      const login = await this.afAuth.signInWithEmailAndPassword(userData.email, userData.password)
      if (login.user) {
        this.afAuth.setPersistence('local').then(()=> console.log('persistence setted'));
        this.setCurrentUser(login.user);
      }
      return login;
    } catch (error: any) {
      const errorCode = error.code;
      console.log(errorCode)
      if (errorCode === FirebaseErrorEnum.EMAIL_INVALID) {
        return {
          errorType: "email",
          message: "The email is invalid. Please try again.",
        }
      } else if (errorCode === FirebaseErrorEnum.USER_NOT_FOUND) {
        return {
          errorType: "email",
          message: "User not found. Please try again.",
        }
      } else if (errorCode === FirebaseErrorEnum.WRONG_PASSWORD) {
        return {
          errorType: "password",
          message: "Wrong password. Please try again.",
        }
      } else {
        return {
          errorType: "generic",
          message: "Invalid credentials. Please try again.",
        }
      }
    }
  }

  public async updateUserData(userData: UserForm) {
    const currentUser = (await this.afAuth.currentUser);
    const userId = currentUser?.uid;

    await currentUser?.updateEmail(userData.email);
    await currentUser?.updatePassword(userData.password);

    await this.db.collection('users').doc(userId).update({
      name: userData.name,
      email: userData.email
    })

    this.afAuth.signInWithEmailAndPassword(userData.email, userData.password);
  }

  public async sendPasswordResetEmail(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email)
      .catch(error=> {
        if (error.code === FirebaseErrorEnum.EMAIL_INVALID) {
          return {hasError: true, error: 'The email is invalid. Please try again.'}
        } else if (error.code === FirebaseErrorEnum.USER_NOT_FOUND) {
          return {hasError: true, error: 'User not found. Please try again.'}
        } else {
          return {hasError: false}
        }
      })
  }

  public getAuthenticated(): Observable<any> {
    return this.afAuth.user;
  }

  public subscribeToUserChange() {
    this.afAuth.authState.subscribe(user=> {
      this.setCurrentUser(user as firebase.default.User);
    })
  }

  public setCurrentUser(userData: firebase.default.User) {
    this.currentUser$.next(userData);
  }

  public logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login'])
    this.currentUser$.next(null);
    this.sidenavService.closeSidenav();
  }
}
