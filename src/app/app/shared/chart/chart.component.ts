import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  public chart: any;
  betNumber: number = 1;
  initialValue = 1;
  currentValue!: number;
  explotion = (Math.floor(Math.random() * 10) + Math.random());
  profit!: number;
  firstBetCompleted: boolean = false;
  viewResults: boolean = false;
  activateButton: boolean = false;
  @Input() currentBet!: {bet: number, prediction: number};
  @Input() balance!: number;
  @Output() updateBalance = new EventEmitter<number>();

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    this.createChart();
    this.incremental();
  }

  private createChart(){  
    this.chart = new Chart("chartLine", {
      type: 'line',
      data: {
        labels: [''], 
	       datasets: [
          {
            label: "Multiplicador",
            data: ['1'],
            backgroundColor: 'blue',
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  private addDataInChart(){ 
    if(this.explotion < 1){
      this.explotion = this.explotion + 1;
    }
    this.initialValue = this.initialValue + Math.random()
    this.currentValue = this.initialValue
    this.chart.data.labels.push('');
    this.chart.data.datasets.forEach((dataset: any) => {
        dataset.data.push(this.currentValue);
    });
    this.chart.update();
  }

  private incremental(){
    setTimeout(() => {
      this.addDataInChart();
      this.viewResults = true;
      if(this.explotion > this.currentValue){
        this.incremental();
      } else {
        setTimeout(() => {          
          this.openDialog();
        }, 5000);
        if(this.currentBet.prediction < this.explotion){
          this.profit = this.currentBet.prediction * this.currentBet.bet
          this.updateBalance.emit(this.profit)
        } else {
          this.updateBalance.emit(-this.currentBet.bet)
        }
      }
    }, 1000);
  }

  private reset(){
    this.initialValue = 1;
    this.chart.config.data.datasets[0].data = ['1'];
    this.chart.config.data.labels = [''];
    this.chart.update();
    this.viewResults = false;
    if(!this.firstBetCompleted) this.firstBetCompleted = true;
    this.explotion = (Math.floor(Math.random() * 10) + Math.random());
    this.incremental();      
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      description: 'Realice una nueva apuesta',
      balance: this.balance
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log('data', data);
        if(data){
          this.reset();
          this.currentBet = data;
        } else {
          this.activateButton = true;
        }
      }
  );  
  }

  public openDialogAgain(){
    this.activateButton = false;
    this.openDialog();
  }
}
