import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/login/shared/services/auth.service';
import { SidenavService } from '../../services/sidenav.service';
import { UserData } from '../../../modules/login/shared/types/user.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private sidenavService: SidenavService, private authService: AuthService) {}

  public sidenavStatus = this.sidenavService.$sidenavStatus;
  public currentUser$ = this.authService.currentUser$;

  public logout() {
    this.authService.logout();
  }

  public closeSidenav() {
    this.sidenavService.closeSidenav();
  }

}
