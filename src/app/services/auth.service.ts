import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AppUser } from '../models/app-user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly LOGIN_URL = environment.baseUrl + 'login'
  readonly SIGNUP_URL = environment.baseUrl + 'register'

  constructor(private http: HttpClient, private router : Router) { }

  
    readonly header = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "*")
    .set("content-type" , "application/json")
    .set("Accept", "application/json")

    public isLoggedIn : boolean = false
  

  public login(user : AppUser)
  {
    this.http.post(this.LOGIN_URL, user , { headers : this.header, observe: 'response'})
    .subscribe(
      response => {
        alert("user logged in successfully")
        console.log("auth",  response.headers.get("Authorization"))        
        // save header bearer token in localstorage
        localStorage.setItem("Authorization", response.headers.get("Authorization") || "") 
        this.isLoggedIn = true;       
        this.router.navigateByUrl("product")
      },
      error => {
        console.log("user authentication failed")
        alert("user authentication failed")
      }
    )
  }


  public register(user : AppUser)
  {
    this.http.post(this.SIGNUP_URL, user)
    .subscribe(
      response => {
        console.log("user registered successfully")
      },
      error => {
        console.log("user cannot be registered")
      }
    )
  }
}
