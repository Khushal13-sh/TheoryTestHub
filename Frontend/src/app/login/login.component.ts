import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public http:HttpClient, public app:AppComponent){}
  
  username:string='abc';
  password:string='abc';

  login(){
    let url=this.app.baseUrl+'login'+this.username;
    this.http.post(url,this.password).subscribe((data:any)=>{
        if(data==null){
          window.alert('Someting went wrong');
        }
        else if (data[0]==1){
          window.alert('Wrong Username');
        }
        else if (data[0]==2){
          window.alert('Multiple Account');
        }
        else if (data[0]==3){
          window.alert('Wrong Password');
        }
        else if (data[0]==0){
          this.app.userid=data[1];
          this.app.isLoggedIn=data[2];
        }
        else{
          window.alert('Someting went wrong');
        }
    });
  }
}
