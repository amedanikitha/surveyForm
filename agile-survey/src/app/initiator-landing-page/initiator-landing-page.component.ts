import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-initiator-landing-page',
  templateUrl: './initiator-landing-page.component.html',
  styleUrls: ['./initiator-landing-page.component.scss']
})
export class InitiatorLandingPageComponent implements OnInit {

  formGroup: FormGroup;
  surveys: any;
  participants: any;
  showIndividuals: boolean;
  showGroups: boolean;
  minDate: Date;
  selectedGroup: string = '';

   /** Returns a FormArray with the name 'formArray'. */
   get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder) { }
  

  ngOnInit() {

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
    this.surveys= [
      {value: 'Agile Metrics Survey', viewValue: 'Agile Metrics Survey'},
      {value: 'Retrospective Survey', viewValue: 'Retrospective Survey'},
      {value: 'General Survey', viewValue: 'General Survey'}
    ];

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
      surveyResponse['survey_id'] = 1;
      surveyResponse['start_date'] = values[4];
      surveyResponse['end_date'] = values[5];
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
      console.log(JSON.stringify(postRequest));
  }

}
