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
  public initialValue = 1;
  public currentValue!: number;
  public explotion = (Math.floor(Math.random() * 10) + Math.random());
  public viewResults: boolean = false;
  public activateButton: boolean = false;
  public statsRound: {} | null = null;
  private profit!: number;
  @Input() currentBet!: {bet: number, prediction: number};
  @Input() balance!: number;
  @Output() updateBalance = new EventEmitter<number>();

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    this.createChart();
    this.incremental();
  }
  // Función que setea y crea el gráfico de base
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
  // Función que va renderizando nuevos valores en el gráfico, de forma aleatoria (valores entre 0 y 1)
  private addDataInChart(){ 
    if(this.explotion < 1){
      this.explotion = this.explotion + 1;
    }
    this.initialValue = this.initialValue + Math.random()
    this.currentValue = this.initialValue
    this.chart.data.labels.push('');
    if(this.currentValue > this.explotion){
      this.chart.data.datasets.forEach((dataset: any) => {
          dataset.data.push(this.explotion);
      });
    } else {
      this.chart.data.datasets.forEach((dataset: any) => {
          dataset.data.push(this.currentValue);
      });
    }
    this.chart.update();
  }
  // Función que incrementa hasta que evalúa si llego al número aleatorio, en donde explota.
  // Además, calcula el resultado y las estadísticas, actualiza el balance y luego de 5 segundos, abre un modal. 
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
        this.sendStats();
      }
    }, 1000);
  }
  // Reúne las estadísticas para enviar al componente stats
  private sendStats(){
    let data: {} = 
    {
      data :
      {
      explotion: this.explotion, 
      prediction: this.currentBet.prediction,
      result: this.currentBet.prediction > this.explotion ? 'Has perdido: $' + this.currentBet.bet :
      'Has ganado: $' + this.profit, 
      profit: this.currentBet.prediction < this.explotion ? this.profit : null
      }
    }
    this.statsRound = data;
  }
  // Resetea el juego y establece los valores por defecto
  private reset(){
    this.initialValue = 1;
    this.chart.config.data.datasets[0].data = ['1'];
    this.chart.config.data.labels = [''];
    this.chart.update();
    this.viewResults = false;
    this.explotion = (Math.floor(Math.random() * 10) + Math.random());
    this.incremental();      
  }
  // Abre el modal para que el usuario vuelva a apostar y realice una predicción
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
        if(data){
          this.reset();
          this.currentBet = data;
        } else {
          this.activateButton = true;
        }
      }
  );  
  }
  // Reabre el modal, en caso de que el usuario lo haya cerrado.
  public openDialogAgain(){
    this.activateButton = false;
    this.openDialog();
  }
}
