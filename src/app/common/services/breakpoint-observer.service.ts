import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  observe(Handset: string): import("rxjs").Observable<import("@angular/cdk/layout").BreakpointState> {
    throw new Error('Method not implemented.');
  }
  public currentBreakpoint$ = new BehaviorSubject<any>(0);
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointChanged();
    this.breakpointObserver.observe(Breakpoints.Small)
      .subscribe(() => this.breakpointChanged());

  }

  private breakpointChanged() {
    console.log('here')
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint$.next(Breakpoints.Large);
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint$.next(Breakpoints.Medium);
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint$.next('mobile');
    } else if (this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.currentBreakpoint$.next('mobile');
    }
  }
}
