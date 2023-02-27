import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { from, Observable} from 'rxjs';
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


@Injectable({
  providedIn: 'root'
})
export class AuthService{



  constructor(private database: Database, private router: Router) { }

  private usersRef = ref(this.database, 'users');
  public currentUser!: User;



  registerUser(userData: User) {
    const usersQuery = query(this.usersRef, orderByChild('email'), equalTo(userData.email));

    get(usersQuery).then((snapshot) => {
      if (snapshot.exists()) {
        console.log('This email is already registered')
        return
      } else {
        const newUserRef = push(this.usersRef);
        set(newUserRef, {
          username: userData.name,
          email: userData.email,
          password: userData.password
        });
      }
    })
  }

  login(userData: User): Observable<string> {
    const usersQuery = query(this.usersRef, orderByChild('email'), equalTo(userData.email));
    return from(get(usersQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userIds = Object.keys(users);
        const userId = userIds[0];
        const user = users[userId];
        if (user.password === userData.password) {
          this.currentUser = user;
          return 'User logged in'
        } else {
          return 'Wrong password'
        }
      } else {
        return 'User not found';
      }
    }));
  }

  retrieveCurrentUser(): User {
    return this.currentUser
  }

}
