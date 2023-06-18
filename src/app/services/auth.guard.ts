import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthServiceService } from "./auth.service";
import { SessionService } from "./session.service";

@Injectable()
export class authGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router, private sessionService: SessionService) { }
  canActivate(): boolean {
    var isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
    }
    return true;
  }
}