import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {

  isLinear = true;
  questions: any;
  formGroup: FormGroup;
  questionGroups: FormGroup[] = [];
  invalid = false;
  response: any;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    // Define number of questions on each page
    const numQuestions = 5;

    // Get all questions from the service
    this.questions = this.surveyService.getQuestions().questions;

    // Create a group of inputs, with each group containing 5 questions
    const formGroup = {};
    for (let i = 0; i <= this.questions.length / numQuestions; i++) {
      const controls = {};
      for (let j = i * numQuestions; j < Math.min((i * numQuestions) + numQuestions, this.questions.length); j++) {
        controls[this.questions[j].question_id] = this.questions[j].question_type === 2 ? new FormControl() : new FormControl('', Validators.required);
      }
      this.questionGroups.push(new FormGroup(controls));
      formGroup[i] = this.questionGroups[i];
    }

    this.formGroup = new FormGroup(formGroup);
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
      console.log(JSON.stringify(this.formGroup.value));
      this.response = this.surveyService.submitSurvey(this.formGroup.value);
      this.isLinear = false;
      this.formGroup.reset();
      this.invalid = false;
    } else {
      this.invalid = true;
      window.scroll(0, 0);
    }
  }
}