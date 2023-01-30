import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent {

  @Output() changeStep = new EventEmitter<number>();
  @Output() dataFirstBet = new EventEmitter<any>();
  public form = this.fb.group({
    bet: ['', [Validators.required, Validators.min(1)]],    
    prediction: ['', [Validators.required, Validators.min(1.01), Validators.max(9.99)]]
  })

  constructor(private fb: FormBuilder){}

  public nextStep(){
    this.changeStep.emit(3)
    this.dataFirstBet.emit(this.form.value)
  }

  public backStep(){
    this.changeStep.emit(1)
  }
}
