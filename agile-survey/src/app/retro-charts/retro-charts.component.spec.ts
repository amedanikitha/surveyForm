import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroChartsComponent } from './retro-charts.component';

describe('RetroChartsComponent', () => {
  let component: RetroChartsComponent;
  let fixture: ComponentFixture<RetroChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
