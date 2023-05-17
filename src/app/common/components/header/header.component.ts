import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/login/shared/services/auth.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

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
