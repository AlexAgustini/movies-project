import { Component } from '@angular/core';
import { AuthService } from './modules/login/shared/services/auth.service';
import { SidenavService } from './common/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private authService: AuthService, private sidenavService: SidenavService) {}

  public $sidenavStatus = this.sidenavService.$sidenavStatus;

  ngOnInit() {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      this.authService.setCurrentUser(userToken);
      this.authService.getUserInfo();
    }
  }
}
