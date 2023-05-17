import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './modules/login/shared/services/auth.service';
import { SidenavService } from './common/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService, private sidenavService: SidenavService) {}

  public $sidenavStatus!: Observable<"closed" | "open">

  ngOnInit() {
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      this.authService.setCurrentUser(userToken);
    }
  }

}
