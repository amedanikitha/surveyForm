import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-initiator-landing-page',
  templateUrl: './initiator-landing-page.component.html',
  styleUrls: ['./initiator-landing-page.component.scss']
})
export class InitiatorLandingPageComponent implements OnInit {

  formGroup: FormGroup;
  surveys = [];
  participants: any;
  showIndividuals: boolean;
  showGroups: boolean;
  minDate: Date;
  selectedGroup: string = '';
  response: any;
  managerName = 'Sudip';
  surveyInfo: any;
  uniqueArray = [];
  surveyTypeId: any;

   /** Returns a FormArray with the name 'formArray'. */
   get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder, private surveyService: SurveyService, private datePipe: DatePipe) { }
  

  ngOnInit() {

    this.getQuestions(); // this will call service end point

    this.showIndividuals = false;
    this.showGroups = false;

    //mandating all the fields before enetring next step
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          selectSurveyType: ['', Validators.required]
        }),
        this._formBuilder.group({
          selectParticipants: ['', Validators.required],
          ParticipantName: [''],
          GroupName: ['']
        }),
        this._formBuilder.group({
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          //startTime: ['', Validators.required],
          //endTime: ['', Validators.required]
        }),
      ])
    });

    //load dropdownlist with survey type
    /*this.surveys= [
      {value: 1, viewValue: 'Agile Metrics Survey'},
      {value: 2, viewValue: 'Retrospective Survey'},
      {value: 3, viewValue: 'General Survey'}
    ];*/

    //load particpants
    this.participants= [
      {value: 'Group', viewValue: 'Group'},
      {value: 'Individual', viewValue: 'Individual Participants'}
    ];
  }

  /**
   * called when participant selection is made
   * @param value selected in dropdown
   */
  particpantChange(value) {
    if (value=="Individual"){
      this.showIndividuals = true;
      this.showGroups = false;
      this.formArray.get([1]).get('ParticipantName').setValidators([Validators.required]);
      this.formArray.get([1]).get('GroupName').clearValidators();
      this.formArray.get([1]).get('GroupName').updateValueAndValidity();
    } else {
      this.showIndividuals = false;
      this.showGroups = true;
      this.formArray.get([1]).get('ParticipantName').clearValidators();      
      this.formArray.get([1]).get('ParticipantName').updateValueAndValidity();
      this.formArray.get([1]).get('GroupName').setValidators([Validators.required]);
    }
  }

   /**
   * called when group selection is made
   * @param group selected
   */
  populateGroupName(groupName) {
    this.selectedGroup += this.selectedGroup ? ',' + groupName : groupName;
  }

  /**
   * get survey information
   * @param null
   */
  getQuestions() {
    const duplicateArray = [];
    this.surveyService.getQuestions()
    .subscribe(surveyInfo => 
      {
        this.surveyInfo = surveyInfo
        for(let i =0; i < surveyInfo.length; i++ ) {
          duplicateArray.push(this.surveyInfo[i].survey_type_id, this.surveyInfo[i].survey_type);
          this.uniqueArray = [...new Set(duplicateArray)];
          if (i == this.surveyInfo.length-1) {
            for(let j =0; j < this.uniqueArray.length/2; j++) {
              this.surveys.push({value: this.uniqueArray[2*j], viewValue: this.uniqueArray[(2*j)+1]})
            }
          }
        }
        console.log(this.surveys);
      });
  }

  
  /**
   * restricting end date to be higher than start date
   * @param null
   */
  startDateChange() {
    this.minDate = this.formArray.get([2]).get('startDate').value;
  }
  
  /**
   * called when schedule survey is clicked
   * @param null
   */
  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.formatPostData(this.formGroup.value)
      let initiatorPostReq = this.formatPostData(this.formGroup.value);
      this.surveyService.submitlaunchSurvey(initiatorPostReq).subscribe(data => {
        this.response = data;
        this.formGroup.reset();
      });
    }
  }
  /**
   * formatting data to be sent as post
   * @param data 
   */
  formatPostData(data){
    let postData = {}
      for(let i=0; i<this.formGroup.value["formArray"].length; i++) {
        postData = {...postData, ...data["formArray"][i]}
      }
      console.log(postData)

      const keys = Object.keys(postData);
      const values = Object.values(postData);

      let postRequest = [];
      let surveyResponse = {};

      surveyResponse['survey_type_id'] = values[0];
      this.surveyTypeId = values[0];
      const formattedStartDate = values[4];
      const formattedEndDate = values[5];
      surveyResponse['survey_start_date'] = this.datePipe.transform(formattedStartDate,"yyyy-MM-dd HH:MM:SS");
      surveyResponse['survey_end_date'] = this.datePipe.transform(formattedEndDate,"yyyy-MM-dd HH:MM:SS");
      surveyResponse['organizer_id'] = 1;
      surveyResponse['Partcipants'] = [];
      for(let i = 0; i < keys.length; i++) {
        if(keys[i]=="selectParticipants") {
          let subResponse = {};
          subResponse['particpant_name'] = values[i+1];
          subResponse['group_name'] = values[i+2];
          surveyResponse['Partcipants'].push(subResponse);
        }
      }
      postRequest.push(surveyResponse);
      return postRequest;
  }

}
