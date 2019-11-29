import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatIconModule, MatOptionModule, 
  MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

const MaterialComponents = [
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule]

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
