import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SurveyService } from '../survey.service'

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {
 
  isLinear = true;
  formGroup: FormGroup;
  questions: any;
  // finding the length of questions
  questionsLength : number;
  response;
  invalid:boolean = false;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.getQuestions();

    // splitting the main array into sub arrays to make stepper dynamic 
    let result = [];
    for(let i=0; i<this.questions.length; i++){
      if(i%(Math.round(this.questions.length/3)) === 0)  
        result.push(this.questions.slice(i, i+(Math.round(this.questions.length/3))))
    }
    //modifying the questions array to get steps
    this.questions = result;
    
    //mandating fields except textarea in form step by step
    let group1:any = {}
    result[0].forEach(question => {
      group1[question.question_id] = question.question_type==2 ? new FormControl('') : new FormControl('',Validators.required)
    });
    let group2:any = {}
    result[1].forEach(question => {
      group2[question.question_id] = question.question_type==2 ? new FormControl('') : new FormControl('',Validators.required)
    });
    let group3:any = {}
    result[2].forEach(question => { 
      group3[question.question_id] = question.question_type==2 ? new FormControl('') : new FormControl('',Validators.required)  
    });

    //passing the validations in each step
    this.formGroup = new FormGroup({
      'step1': new FormGroup(group1),
      'step2': new FormGroup(group2),
      'step3': new FormGroup(group3)
    });
  }

  /**
   * get questions from service
   * @params null
   */
  getQuestions(): void {
    this.questions = this.surveyService.getQuestions();
    this.questions = this.questions.questions;
    this.questionsLength = this.questions.length;
  }

  
  //save for later
  SaveLater() {
    console.log(JSON.stringify(this.formGroup.value));
  }

  /**
   * method called when next button clicked on a step
   * @params step which is current step
   */
  nextClick(step) {
    let currentStep = this.formGroup.controls[step]
    if(currentStep.invalid) {
      this.invalid = true;
      window.scroll(0,0);
    } else {
      this.invalid = false;
    }
  }

  //submit form data if valid

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(JSON.stringify(this.formGroup.value));
      this.response = this.surveyService.submitSurvey(this.formGroup.value);
      this.isLinear = false;
      this.formGroup.reset();
      this.invalid = false;
    } else {
      this.invalid = true;
      window.scroll(0,0);
    }
  }
}