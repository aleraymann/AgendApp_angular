import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AgendApp';


  viewMenu: boolean = false;

  constructor(private authService:AuthService){

  }
  ngOnInit(){
    this.authService.menuEmitter.subscribe(
      menu => this.viewMenu = menu
    );
  }
  logout(){
    this.authService.logout();
  }
}
