import { Injectable, EventEmitter } from '@angular/core';
import { UserData, UserForm } from '../types/user.type';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseErrorEnum } from '../../../../common/helpers/types/firebase-errors.enum';
import { BehaviorSubject, firstValueFrom, } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegisterUserResult } from 'src/app/common/helpers/types/firebase-register-result.tpye';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  private currentUserSource = new BehaviorSubject<string>('');
  public currentUser$ = this.currentUserSource.asObservable();

  public async registerUser(userData: UserForm): Promise<RegisterUserResult> {
    try {
      const authResult = await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password)
      if (authResult.user) {
          const userDocRef = this.db.collection("users").doc(authResult.user.uid);
          await userDocRef.set({
            name: userData.name,
            email: userData.email,
          });

        this.setCurrentUser(authResult.user.uid);

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
        this.setCurrentUser(login.user.uid);
        localStorage.setItem("userToken", login.user.uid);
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


  public setCurrentUser(userToken: string) {
    this.currentUserSource.next(userToken);
  }

  public async getUserInfo() {
    const userId = await firstValueFrom(this.currentUser$);
    const userDocRef = this.db.collection("users").doc(userId);
    const userDoc = await firstValueFrom(userDocRef.get());
    if (userDoc.exists) {
      return userDoc.data() as Promise<UserData>;
    } else {
      return null;
    }
  }
}
