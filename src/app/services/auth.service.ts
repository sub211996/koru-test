import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false
  loginSuccess = new Subject<boolean>()

  constructor(private router: Router) { }

  goToPath(path: string) {
    this.router.navigate([`${path}`]);
  }

  checkLoginSuccess(value: boolean){
    this.loginSuccess.next(value)
  }
  
}
