import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/login/shared/services/auth.service';
import { SidenavService } from '../../services/sidenav.service';
import { UserData } from 'src/app/modules/login/shared/types/user.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  public $sidenavStatus!: Observable<"closed" | "open">
  public currentUser$: Observable<UserData | null> = this.authService.currentUser$;

  constructor(private authService: AuthService, private sidenavService: SidenavService) {}


  ngOnInit() {
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
  }

  openSidenav() {
    this.sidenavService.openSidenav();
  }
}
