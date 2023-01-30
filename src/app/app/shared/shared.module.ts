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
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AccordionComponent } from './accordion/accordion.component';
import { StatsComponent } from './stats/stats.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, StepOneComponent, StepTwoComponent, ChartComponent, ModalComponent, AccordionComponent, StatsComponent],
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    CdkAccordionModule,
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
