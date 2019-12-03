import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {

  isLinear = true;
  questions: any = '';
  formGroup: FormGroup;
  questionGroups: FormGroup[] = [];
  invalid = false;
  response: any;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    
    // Get all questions from the service
    //this.questions = this.surveyService.getQuestions()[0];
    
    this.getQuestions(); // this will call service end point
    
  }

  getQuestions(): void {
    this.surveyService.getQuestions()
    .subscribe(questions => {
      this.questions = questions;
  
      // Define number of questions on each page
      const numQuestions = 5;
      // Create a group of inputs, with each group containing 5 questions
      const formGroup = {};
      if(this.questions) {
        for (let i = 0; i <= questions.length / numQuestions; i++) {
          const controls = {};
          for (let j = i * numQuestions; j < Math.min((i * numQuestions) + numQuestions, questions.length); j++) {
            controls[this.questions[j].question_id] = this.questions[j].question_type_id === 2 ? new FormControl() : new FormControl('', Validators.required);
          }
          this.questionGroups.push(new FormGroup(controls));
          formGroup[i] = this.questionGroups[i];
        }
      }
      this.formGroup = new FormGroup(formGroup);
    });
  }

  getQuestion(id) {
    return this.questions.find(q => q.question_id == id);
  }

  // save for later
  saveLater() {
    console.log(JSON.stringify(this.formGroup.value));
  }

  /**
   * method called when next button clicked on a step
   * @params step which is current step
   */
  nextClick() {
    const currentStep = this.formGroup.controls[0];
    if (currentStep.invalid) {
      this.invalid = true;
      window.scroll(0, 0);
    } else {
      this.invalid = false;
    }
  }

  // submit form data if valid

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLinear = false;
      this.invalid = false;
      let postReq = this.formatPostData(this.formGroup.value);
      this.response = this.surveyService.submitSurvey(postReq);
      this.formGroup.reset();
    } else {
      this.invalid = true;
      window.scroll(0, 0);
    }
  }

  //formatting post data
  formatPostData(data) {
    let postData = {};
    for(let i=0;i<this.questionGroups.length; i++) {
      postData = {...postData, ...data[i]}
    }

    const keys = Object.keys(postData);
    const values = Object.values(postData);

    //create an empty object to ensure it's the right type.
    let postRequest = [];

    //loop through the arrays using the first one's length since they're the same length
    for(var i = 0; i < keys.length; i++) {
        let questionResponse = {};
        //set the keys and values
        questionResponse['question_id'] = keys[i];
        questionResponse['survey_id'] = this.questions[i].survey;    
        if (this.questions[i].question_type_id===2) {
          questionResponse['response_text'] = values[i];
        } else {
          questionResponse['response'] = values[i];
        }
        postRequest.push(questionResponse);
    }
    return postRequest;
  }
}