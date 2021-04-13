import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    try {
      const user = await this.authSvc.signup(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified)
      }
    } catch (error) {
      console.log('error de  ----', error);
    }
  }

  async onLoginGoogle(email){
    try {
      const user= await this.authSvc.loginGoogle();
      if (user){
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log("verified", isVerified);
        this.redirectUser(isVerified)
      }
    } catch (error) {
      console.log('error ----', error);
    }
  }

  private redirectUser(isVerified:boolean){
    if (isVerified){
      this.router.navigate(['home']);
    }else {
      this.router.navigate(['verify-email']);
    }
  }

}
