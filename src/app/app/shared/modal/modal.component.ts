import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  public description!: string;
  public form: FormGroup = this.fb.group({
    bet: [''],
    prediction: ['', [Validators.required, Validators.min(1.01), Validators.max(9.99)]]  
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.description = data.description;

  }
  
  ngOnInit(): void {
    this.setValidatorMaxBalance()
  }
  // Setea Validaciones en la apuesta
  public setValidatorMaxBalance(){
    this.form.controls["bet"].setValidators([Validators.required, Validators.min(1), Validators.max(parseInt(localStorage.getItem('balance') as string))]);
    this.form.controls['bet'].updateValueAndValidity()
  }
  // Envía el formulario y cierra el modal
  public save(){
    this.dialogRef.close(this.form.value);
  }
  // Cierra el modal
  public close(){
    this.dialogRef.close(null);
  }
}
