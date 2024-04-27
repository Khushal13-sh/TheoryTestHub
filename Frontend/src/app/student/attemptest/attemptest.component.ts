import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StudentComponent } from '../student.component';
import { Console } from 'console';

@Component({
  selector: 'app-attemptest',
  templateUrl: './attemptest.component.html',
  styleUrl: './attemptest.component.css'
})
export class AttemptestComponent {

  constructor(public http:HttpClient,public app:AppComponent,public student:StudentComponent){}

  showIndex:number=-1;

  load(i:number){
    this.showIndex=i;
  }

  update(){
    let url=this.app.baseUrl+'update'+this.student.logs[this.showIndex].id;
    this.http.post(url,this.student.logs[this.showIndex].answer).subscribe((data:any)=>{
      if(data==null || data==0)
      {
        window.alert('Something is wrong');
      }
      else
      {
        window.alert('Done');
      }
    });
  }

  submit(){
    let url=this.app.baseUrl+'submit'+this.student.logs[this.showIndex].id;
    this.http.get(url).subscribe((data:any)=>{
      if(data==null || data==0)
      {
        window.alert('Something is wrong');
      }
      else
      {
        this.student.logs[this.showIndex].submit=1;
        window.alert('Done');
      }
    });
  }

  backToTests(){
    this.student.whatToShow=1;
  }



}
