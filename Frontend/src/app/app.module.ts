import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AttemptestComponent } from './student/attemptest/attemptest.component';
import { ShowtestComponent } from './student/showtest/showtest.component';
import { AnswerverificationComponent } from './trainer/answerverification/answerverification.component';
import { QuestionmanagementComponent } from './trainer/questionmanagement/questionmanagement.component';
import { TestmanagementComponent } from './trainer/testmanagement/testmanagement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    TrainerComponent,
    AttemptestComponent,
    ShowtestComponent,
    AnswerverificationComponent,
    QuestionmanagementComponent,
    TestmanagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
