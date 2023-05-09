import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util'

import { from, Observable, of} from 'rxjs';
import { User } from '../shared/user';
import {
  Database,
  set,
  ref,
  push,
  get,
  equalTo,
  orderByChild,
  query
} from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseErrorEnum } from '../types/firebase-errors.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private database: Database, private router: Router, private afAuth: AngularFireAuth) { }

  private usersRef = ref(this.database, 'users');
  public currentUser!: User;

  async registerUser(userData: User): Promise<any> {

    try {
      return await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password)

    } catch (error: any){
      const errorCode = error.code;

      if (errorCode === FirebaseErrorEnum.EMAIL_INVALID) {
        return "The email format is invalid"
      } else if (errorCode === FirebaseErrorEnum.EMAIlL_ALREADY_IN_USE) {
        return "This email is already being used"
      } else if (errorCode === FirebaseErrorEnum.WEAK_PASSWORD) {
        return "Invalid password"
      } else {
        return "Invalid credentials"
      }
    }
    // const usersQuery = query(this.usersRef, orderByChild('email'), equalTo(userData.email));

    // get(usersQuery).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log('This email is already registered')
    //     return
    //   } else {
    //     const newUserRef = push(this.usersRef);
    //     set(newUserRef, {
    //       username: userData.name,
    //       email: userData.email,
    //       password: userData.password
    //     });
    //   }
    // })
  }

  async login(userData: User): Promise<any> {

    try {
      // Some firebase functions
      await this.afAuth.signInWithEmailAndPassword(userData.email, userData.password)
    } catch (error) {
      console.error(error);
    }




    // const usersQuery = query(this.usersRef, orderByChild('email'), equalTo(userData.email));
    // return from(get(usersQuery).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const users = snapshot.val();
    //     const userIds = Object.keys(users);
    //     const userId = userIds[0];
    //     const user = users[userId];
    //     if (user.password === userData.password) {
    //       this.currentUser = user;
    //       return 'User logged in'
    //     } else {
    //       return 'Wrong password'
    //     }
    //   } else {
    //     return 'User not found';
    //   }
    // }));
  }

  retrieveCurrentUser(): User {
    return this.currentUser
  }

}
