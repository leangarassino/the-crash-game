import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StepOneComponent } from './step-one/step-one.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StepTwoComponent } from './step-two/step-two.component';
import { ChartComponent } from './chart/chart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, StepOneComponent, StepTwoComponent, ChartComponent, ModalComponent],
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    StepOneComponent,
    StepTwoComponent,
    ChartComponent
  ],
})
export class SharedModule { }
