import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'writtenTestApplication';

  isLoggedIn:number=0;  //0-No 1-student 2-trainer
  userid:number=0;
  baseUrl='http://localhost:8080/'
}
