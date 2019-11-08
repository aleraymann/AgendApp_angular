import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User = new User();

  constructor(private authService: AuthService) { }

  error : any;

  ngOnInit() {
    this.authService.eventError$.subscribe(data =>{
      this.error = data;
    });
  }
  login(form){
    //console.log(this.user);
    //this.authService.login(this.user);
    this.authService.login(form.value.email,form.value.password);

  }

}
