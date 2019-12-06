
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { getLocaleTimeFormat } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyService } from './survey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'agile-survey';
  percentage = 25;
  questions: any;
  endDate: Date;
  timeLeft;
  formattedtimeLeft;
  myProp;
  days;
  hours;
  minutes;
  seconds;
  radius = 10;

constructor(public router: Router, private surveyService: SurveyService) {
  
}
ngOnInit(){
  this.timeLeft = new Date("Dec 6, 2019 00:00:00").getTime() - new Date().getTime();
  this.getTimer()

  this.surveyService.getQuestions()
    .subscribe(questions => {
      this.questions = questions;
  });

  
}
/**
 * Method will run the timer
 * @param null
 * @return null
 */
getTimer() {
  setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft = new Date("Dec 6, 2019 00:00:00").getTime() - new Date().getTime();
      this.days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.timeLeft % (1000 * 60)) / 1000);
      this.formattedtimeLeft = this.days + "d " + this.hours + "h "
      + this.minutes + "m " + this.seconds + "s ";
    } else {
      this.formattedtimeLeft = "Expired";
    }
  }, 1000);
}
}
