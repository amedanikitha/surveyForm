
import { Component } from '@angular/core';
import { getLocaleTimeFormat } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'agile-survey';
  percentage = 25;
  surveytype = 'Agile Metric Survey';
  surveyid:number = 1;
  managerName = 'Sudip';
  timeLeft;
  formattedtimeLeft;
  myProp;
  days;
  hours;
  minutes;
  seconds;
  radius = 10;

constructor(public router: Router) {
  
}
ngOnInit(){
  this.timeLeft = new Date("Dec 4, 2019 00:00:00").getTime() - new Date().getTime();
  this.getTimer()
}
/**
 * Method will run the timer
 * @param null
 * @return null
 */
getTimer() {
  setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft = new Date("Dec 4, 2019 00:00:00").getTime() - new Date().getTime();
      this.days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.timeLeft % (1000 * 60)) / 1000);
      this.formattedtimeLeft = this.days + "d " + this.hours + "h "
      + this.minutes + "m " + this.seconds + "s ";
    } else {
      this.timeLeft = "Expired";
    }
  }, 1000);
}
}
