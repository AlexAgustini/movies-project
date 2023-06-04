import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/login/shared/services/auth.service';
import { SidenavService } from '../../services/sidenav.service';
import { UserData } from 'src/app/modules/login/shared/types/user.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  public $sidenavStatus!: Observable<"closed" | "open">
  public currentUser$: Observable<UserData | null> = this.authService.currentUser$;
  public currentCategory: string = 'movies';

  constructor(private authService: AuthService, private sidenavService: SidenavService, private router: Router) {}


  ngOnInit() {
    this.$sidenavStatus = this.sidenavService.$sidenavStatus;
  }

  openSidenav() {
    this.sidenavService.openSidenav();
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
