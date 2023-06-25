import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/modules/login/shared/services/auth.service';
import { ProgramType } from '../types/program-fetch-result.type';
import { getAuth } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {

  private userUid!: string;
  private usersCollectionRef= this.db.collection("users");

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.authService.currentUser$.subscribe(userData=> {
      if (userData?.uid) {
        this.userUid = userData.uid
      }
    });
  }

  public addFavoriteProgram(programId: number, programType: ProgramType) {
    const loggedUser = getAuth();
    const userId = loggedUser.currentUser?.uid;

    this.usersCollectionRef.doc(this.userUid).update({
      favoritePrograms: arrayUnion({
        type: programType,
        id: programId
      })
    })
  }

  public removeFavoriteProgram(programId: number, programType: ProgramType) {
    this.usersCollectionRef.doc(this.userUid).update({
      favoritePrograms: arrayRemove({
        type: programType,
        id: programId
      })
    })
  }

  public async getFavoritePrograms(): Promise<Array<{id: number, type: ProgramType}>> {
    return await firstValueFrom(this.usersCollectionRef.doc(this.userUid).get())
      .then((data: {data(): any})=> {
        if (data.data()) {
          return data.data().favoritePrograms
        }
      });
  }
}
