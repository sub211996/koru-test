import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: User = {
    username: "",
    password: ""
  };

  loginSuccess: boolean = false

  constructor(private authService: AuthService){

  }

  isPasswordValid(password: string): boolean {
    const minMaxLength = /^[\s\S]{8,32}$/,
    upper = /[A-Z]/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (minMaxLength.test(password) &&
        upper.test(password) &&
        lower.test(password) &&
        number.test(password) &&
        special.test(password)
    ) {
        return true;
    }

    return false;
  }

  onSubmit(userForm: NgForm){
    this.authService.checkLoginSuccess(true)
    this.authService.goToPath('user-data-table')
  }

  ngOnInit():void{
    
  }


}

export interface User {
  username: string;
  password: string;
}
