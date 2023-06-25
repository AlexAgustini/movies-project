import { Component } from '@angular/core';
import { AuthService } from './modules/login/shared/services/auth.service';
import { SidenavService } from './common/services/sidenav.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private sidenavService: SidenavService,
    private breakpointObserver: BreakpointObserver
  ) {}

  public $sidenavStatus = this.sidenavService.$sidenavStatus;
  public $userStatus = this.authService.currentUser$;
  public isMobile$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  ngOnInit() {
    this.authService.subscribeToUserChange();
  }
}
