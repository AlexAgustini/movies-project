import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/modules/login/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.authService.currentUser$.subscribe(uid=> this.userUid = uid);
  }

  private userUid!: string;
  private usersCollectionRef= this.db.collection("users")

  public addFavoriteProgram(programId: number) {
    this.usersCollectionRef.doc(this.userUid).update({
      favoritePrograms: arrayUnion(programId)
    })
  }

  public removeFavoriteProgram(programId: number) {
    this.usersCollectionRef.doc(this.userUid).update({
      favoritePrograms: arrayRemove(programId)
    })
  }

  public async getFavoritePrograms(): Promise<Array<number>> {
    return await firstValueFrom(this.usersCollectionRef.doc(this.userUid).get()).then((data: {data(): any})=> data.data().favoritePrograms);
  }
}
