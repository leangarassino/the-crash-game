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
  
  public getUser(event: {name: string, money: number}){
    this.dataUser = event
    localStorage.setItem('name', event.name);
    localStorage.setItem('balance', event.money.toString());
  }

  public getFirstBet(event: {bet: number, prediction: number}){
    this.dataFirstBet = event
  }

  public updateBalance(event: number){
    this.dataUser.money = this.dataUser.money + event
    localStorage.setItem('balance', this.dataUser.money.toString());
  }
}
