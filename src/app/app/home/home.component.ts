import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public step: number = 1;
  public betNumber: number = 1;
  public initialValue: number = 1;
  public name: string = '';
  public money: string = '';
  public dataUser!: {name: string, money: number};
  public dataFirstBet!: {bet: number, prediction: number};
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.incremental();
  }
  
  public getUser(event: {name: string, money: number}){
    console.log('event', event)
    this.dataUser = event
  }

  public getFirstBet(event: {bet: number, prediction: number}){
    this.dataFirstBet = event
    console.log('dataFirstBet', this.dataFirstBet)
  }

  public updateBalance(event: number){
    this.dataUser.money = this.dataUser.money + event 
    console.log('money', this.dataUser.money)
  }
}
