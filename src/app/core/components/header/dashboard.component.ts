import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  public currentUser!: string;

  constructor(private authService: AuthService, private sidenavService: SidenavService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(userToken => {
      this.currentUser = userToken;
    });
  }

  openSidenav() {
    this.sidenavService.openSidenav();
  }
}
