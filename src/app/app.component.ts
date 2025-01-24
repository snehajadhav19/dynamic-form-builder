import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-form-builder';
  isSmallScreen$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
