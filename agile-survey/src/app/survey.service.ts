import { Injectable } from '@angular/core';
import { QUESTIONS } from '../assets/mock-questions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { vData } from '../assets/d3-mock-data';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveyApiUrl = 'api/questions';//'http://10.10.105.35:8000/employees'; //endpoint URL
  private submitSurveyUrl = 'http://api/submit/survey'; // Submit URL
  private chartApiUrl = 'api/chartData'; // chart URL

  constructor(private http: HttpClient) { }
  
  // defining headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  //fetching the survey questions
  getQuestions(): Observable<any>  {
    // return QUESTIONS;
   return this.http.get<any>(this.surveyApiUrl).pipe(
      catchError(this.handleError<any>('getQuestions', []))
    ); //get service call
  }

  //post call
  submitSurvey(data) {
    console.log(data);  
    /*return this.http.post(this.submitSurveyUrl, data, this.httpOptions).pipe(
        catchError(error => {
          console.log("Caught error while submiting survey");
          return of(null);
        })
      );*/
  }

  //fetching data for charts
  getChartData() {
    return vData;
  }

  getChartJSData(): Observable<any> {
    return this.http.get<any>(this.chartApiUrl).pipe(
      catchError(this.handleError<any>('getChart', []))
    ); 
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
