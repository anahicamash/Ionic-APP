import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(email, password){
    try {
      const user= await this.authSvc.login(email.value, password.value);
      if (user){
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log("verified", isVerified);
        this.redirectUser(isVerified)
      }
    } catch (error) {
      
      console.log('error ----', error);
      
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
