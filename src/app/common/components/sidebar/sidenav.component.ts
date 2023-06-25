import { Component } from '@angular/core';
import { AuthService } from '../../../modules/login/shared/services/auth.service';
import { SidenavService } from '../../services/sidenav.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  public sidenavStatus = this.sidenavService.$sidenavStatus;
  public currentUser$ = this.authService.currentUser$;
  public isMobile$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public currentCategory = 'movies';

  public logout() {
    this.authService.logout();
  }

  public closeSidenav() {
    this.sidenavService.closeSidenav();
  }

  navigate(programCategory: string) {
    if (this.router.url.includes('tv')) {
      this.currentCategory = 'tv'
    } else {
      this.currentCategory = 'movies';
    }

    this.router.navigate(['/programs', this.currentCategory, programCategory, 1])
  }
}
