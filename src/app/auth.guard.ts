import { AuthService } from './services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService
            ,private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.isAdmin(user),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied');
            this.router.navigate(["/"]);
          }
        })
      ));
  }
}

    // "@angular-devkit/build-angular": "^0.1002.0",
    // "@angular-devkit/architect": ">= 0.900 < 0.1100",
    // "@angular/cli": "~10.0.3",
    // "@angular/compiler-cli": "~10.0.4",
    // "@types/jasmine": "~3.5.0",
    // "@types/jasminewd2": "~2.0.3",
    // "@types/node": "^12.11.1",
    // "codelyzer": "^6.0.0",
    // "jasmine-core": "~3.5.0",
    // "jasmine-spec-reporter": "~5.0.0",
    // "karma": "~5.0.0",
    // "karma-chrome-launcher": "~3.1.0",
    // "karma-coverage-istanbul-reporter": "~3.0.2",
    // "karma-jasmine": "~3.3.0",
    // "karma-jasmine-html-reporter": "^1.5.0",
    // "protractor": "~7.0.0",
    // "ts-node": "~8.3.0",
    // "tslint": "~6.1.0",
    // "typescript": "~3.9.5"