import { Injectable } from '@angular/core';
import { UserData, UserForm } from '../types/user.type';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseErrorEnum } from '../../../../common/helpers/types/firebase-errors.enum';
import { BehaviorSubject, Observable, firstValueFrom, from, of, } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegisterUserResult } from 'src/app/common/helpers/types/firebase-register-result.tpye';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/common/services/sidenav.service';
import { User, UserCredential, UserProfile, getAuth, onAuthStateChanged } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private sidenavService: SidenavService) { }

  public currentUser$ = new BehaviorSubject<UserData | null>(null);

  public async registerUser(userData: UserForm): Promise<RegisterUserResult> {
    try {
      const authResult = await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password)
      if (authResult.user) {
          const userDocRef = this.db.collection("users").doc(authResult.user.uid);
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
        localStorage.setItem("userToken", login.user.uid);
        this.setCurrentUser(login.user.uid);
        this.getUserInfo()
      }
      return login;
    } catch (error: any) {
      const errorCode = error.code;
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
      currentUser?.updateEmail(userData.email);
      currentUser?.updatePassword(userData.password);
      console.log(userData.password)

      this.db.collection('users').doc(userId).update({
        name: userData.name,
        email: userData.email
      })
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

  public async getUserData(): Promise<UserProfile> {
    return this.afAuth.currentUser as unknown as Promise<UserProfile>
  }

  public logout() {
    localStorage.removeItem("userToken");
    this.router.navigate(['/login'])
    this.currentUser$.next(null);
    this.sidenavService.closeSidenav();
  }

  public setCurrentUser(userToken: string) {
    this.currentUser$.next({...this.currentUser$.getValue() as UserData, id: userToken});
    console.log(this.currentUser$.getValue());
  }

  public async getUserInfo(): Promise<UserData | null> {
    const userId = this.currentUser$.getValue()?.id;
    if (!userId) return null;
    const userDocRef = this.db.collection("users").doc(userId);
    const userDoc = await firstValueFrom(userDocRef.get());
    if (userDoc.exists) {
      this.currentUser$.next({...this.currentUser$.getValue(), ...userDoc.data() as UserData})
    }
    return this.currentUser$.getValue();
  }
}
