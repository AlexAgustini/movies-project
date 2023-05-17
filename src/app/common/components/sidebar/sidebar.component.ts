import { Component } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD:src/app/common/components/sidebar/sidebar.component.ts
import { AuthService } from '../../../modules/login/shared/services/auth.service';
=======
import { AuthService } from '../../services/auth.service';
>>>>>>> 0f96549605c34c684881a29a69f0f83b8a0df62a:src/app/core/components/sidebar/sidebar.component.ts
import { SidenavService } from '../../services/sidenav.service';
import { UserData } from '../../../modules/login/shared/types/user.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private sidenavService: SidenavService, private authService: AuthService) {}

  public sidenavStatus!: Observable<"closed" | "open">
  public userData!: UserData;

  ngOnInit() {
    this.sidenavStatus = this.sidenavService.$sidenavStatus;

    this.fetchUserData();
  }

  private async fetchUserData() {
    const userData = await this.authService.getUserInfo();
    if (userData) {
      this.userData = userData;
    }
  }

  public closeSidenav() {
    this.sidenavService.closeSidenav();
  }

}
