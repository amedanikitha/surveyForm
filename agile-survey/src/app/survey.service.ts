import { Injectable } from '@angular/core';
import { QUESTIONS } from '../assets/mock-questions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { vData } from '../assets/d3-mock-data';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveyApiUrl = 'api/survey'; //endpoint URL
  private submitSurveyUrl = 'http://api/submit/survey'; // Submit URL
  
  constructor(private http: HttpClient) { }
  
  // defining headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  //fetching the survey questions
  getQuestions() {
   return QUESTIONS;
   //return this.http.get(this.surveyApiUrl) //get service call
  }

  //post call
  submitSurvey(data) {
    console.log(data);  
    //return this.http.post(this.submitSurveyUrl, data, this.httpOptions).toPromise();
  }

  //fetching data for charts
  getChartData() {
    return vData;
  }
}
