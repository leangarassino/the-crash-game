import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {

  @Output() changeStep = new EventEmitter<number>();
  @Output() dataUser = new EventEmitter<any>();
  public name = new FormControl();


  public form = this.fb.group({
    name: [''],
    money: ['', [Validators.required, Validators.min(1)]]
  })

  constructor(private fb: FormBuilder){}

  public submit(){
    this.changeStep.emit(2)
    this.dataUser.emit(this.form.value)
  }

}
