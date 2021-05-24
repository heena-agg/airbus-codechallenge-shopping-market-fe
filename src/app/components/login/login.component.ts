import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from '../../models/app-user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : AppUser = new AppUser();

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.user);
  }

}
