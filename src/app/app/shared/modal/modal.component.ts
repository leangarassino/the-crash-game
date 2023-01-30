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
    bet: ['', Validators.required],
    prediction: ['', Validators.required]  
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.description = data.description;

  }
  
  ngOnInit(): void {
    
    
  }
  
  public save(){
    console.log('form', this.form.value);
    this.dialogRef.close(this.form.value);
  }

  public close(){
    this.dialogRef.close(null);
  }
}
