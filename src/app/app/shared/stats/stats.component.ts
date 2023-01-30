import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent {

  

  public allStats!: any[];
  public statsMultiplier!: any[];
  public higherProfit: number = 0;  
  // Actualiza las estadísticas en cada ronda
  @Input() set stats(info: any){
    if(info[0]?.data === 'Aún no hay datos'){
      this.allStats = info;
    } else {
      if(this.allStats[0].data === 'Aún no hay datos') this.allStats.shift()
      this.allStats.push(info)
      this.getStatsMultiplierAndMoreProfit(this.allStats)
    }
  };

  // Función que acumula los últimos 7 multiplicadores
  public getStatsMultiplierAndMoreProfit(stats: any){
    this.statsMultiplier = []
    stats.map( (stat: {data:{explotion: number, prediction: number, result: number, profit: number}}, index: number) => {
      this.statsMultiplier.push({explotion: stat.data.explotion, id: index + 1})
      if(stat.data.profit){
        if(this.higherProfit < stat.data.profit)
        this.higherProfit = stat.data.profit;
      }
    })
    this.statsMultiplier = this.statsMultiplier.slice(-7); 
    // Corta el array con 7 elementos como máximo
    this.statsMultiplier = this.statsMultiplier.slice().reverse(); 
    // Ordena el array en forma descendente, para que el 1er elemento que aparezca, sea el más reciente
  }   

}
