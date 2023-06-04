import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/modules/login/shared/services/auth.service';
import { ProgramType } from '../types/program-fetch-result.type';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.authService.currentUser$.subscribe(userData=> {
      if (userData?.id) {
        this.userUid = userData.id
      }
    });
  }

  private userUid!: string;
  private usersCollectionRef= this.db.collection("users");

  public addFavoriteProgram(programId: number, programType: ProgramType) {
    console.log(programId, programType)
    if (this.usersCollectionRef.doc(this.userUid))

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
