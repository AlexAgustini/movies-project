import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  public $sidenavStatus!: Observable<"closed" | "open">
  public currentUser!: string;

  constructor(private authService: AuthService, private sidenavService: SidenavService) {}


  ngOnInit() {
    this.authService.currentUser$.subscribe(userToken => {
      this.currentUser = userToken;
    });
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
  }

  openSidenav() {
    this.sidenavService.openSidenav();
  }
}
