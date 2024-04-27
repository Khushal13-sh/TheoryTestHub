import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-questionmanagement',
  templateUrl: './questionmanagement.component.html',
  styleUrl: './questionmanagement.component.css'
})
export class QuestionmanagementComponent {

  constructor(public http:HttpClient, public app:AppComponent){}

  questions:any[]=[];

  load(){
    let url=this.app.baseUrl+'giveQuestion';
    this.http.get(url).subscribe((data:any)=>{
      this.questions=data;
    });
  }

  name:string='';

  add(){
    let url=this.app.baseUrl+'addQuestion';
    this.http.post(url,this.name).subscribe((data:any)=>{
      this.questions.push(data);
    });
    this.name="";
  }
}
