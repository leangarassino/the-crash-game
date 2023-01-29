import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {

  @Output() changeStep = new EventEmitter<number>();
  public name = new FormControl();


  public form = this.fb.group({
    name: ['', Validators.required],
    money: ['', [Validators.required, Validators.min(1)]]
  })

  constructor(private fb: FormBuilder){}

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
    
  // }

  public submit(){
    console.log('form', this.form.value)
    this.changeStep.emit(2)
  }

}
