import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-testmanagement',
  templateUrl: './testmanagement.component.html',
  styleUrl: './testmanagement.component.css'
})
export class TestmanagementComponent {

  constructor(public http:HttpClient, public app:AppComponent){}

  tests:any[]=[];

  load(){
    let url=this.app.baseUrl+'giveTests';
    this.http.get(url).subscribe((data:any)=>{
      this.tests=data;
    });
  }

  name:string="";
  start:Date=new Date();
  end:Date=new Date();
  questionCount:number=0;
  passingCount:number=0;

  add(){

    let obj={
      "name":this.name, 
      "start":this.start,
      "end":this.end,
      "questionCount":this.questionCount,
      "passingCount":this.passingCount
    }

    let url=this.app.baseUrl+'addTest';
    this.http.post(url,obj).subscribe((data:any)=>{
      this.tests.push(data);
    });

    this.name="";
    this.start=new Date();
    this.end=new Date();
    this.questionCount=0;
    this.passingCount=0;
    

  }
}
