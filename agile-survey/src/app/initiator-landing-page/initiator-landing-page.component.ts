import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-initiator-landing-page',
  templateUrl: './initiator-landing-page.component.html',
  styleUrls: ['./initiator-landing-page.component.scss']
})
export class InitiatorLandingPageComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  surveys:any;
  participants:any;
  showSearch:boolean;
  participantValidators;

  constructor(private _formBuilder: FormBuilder) { }
  

  ngOnInit() {


    this.showSearch = false;


    //mandating all the fields before enetring next step
    this.firstFormGroup = this._formBuilder.group({
      selectSurveyType: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      selectParticipants: ['', Validators.required],
      ParticipantName: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      startDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      startTime: ['', Validators.required]
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
      this.showSearch = true;
      this.secondFormGroup.get('ParticipantName').setValidators([Validators.required]);
    } else {
      this.showSearch = false;
      this.secondFormGroup.get('ParticipantName').setValidators([]);
    }
  }
}
