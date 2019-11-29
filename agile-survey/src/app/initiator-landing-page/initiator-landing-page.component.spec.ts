import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatorLandingPageComponent } from './initiator-landing-page.component';

describe('InitiatorLandingPageComponent', () => {
  let component: InitiatorLandingPageComponent;
  let fixture: ComponentFixture<InitiatorLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiatorLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiatorLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
