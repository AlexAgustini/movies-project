import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  $sidenavStatus = new BehaviorSubject<"closed" | "open">("closed");

  public openSidenav() {
    this.$sidenavStatus.next("open")
  }

  public closeSidenav() {
    this.$sidenavStatus.next("closed")
  }

}
