import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Data {
  private bills: any = [];
  private house: any = [];
  private senate: any = [];

  constructor(public http: Http, public storage: Storage) {
    //this.loadBills().then( data => { this.bills = data.objects; console.log("bills", this.bills); });
    this.loadHouse().then( data => {
      this.house = data.objects;
      this.house = this.house.sort(function(a,b){return (b.person.lastname < a.person.lastname) ? 1 : -1});
      console.log("house", this.house);
    });
    this.loadSenate().then( data => {
      this.senate = data.objects;
      this.senate = this.senate.sort(function(a,b){return (b.person.lastname < a.person.lastname) ? 1 : -1});
      //console.log("senate", this.senate);
    });
  }

  public getBills(): any {
    return this.bills;
  }

  public getHouse(): any {
    return this.house;
  }

  public getSenate(): any {
    return this.senate;
  }

  private loadBills(): Promise<any> {
    return new Promise(resolve => {
      this.http.get("assets/data/bills.json")
        .map(res => res.json())
        .subscribe(data => { resolve(data); })
      ;
    });
  }

  private loadHouse(): Promise<any> {
    return new Promise(resolve => {
      this.http.get("assets/data/house.json")
        .map(res => res.json())
        .subscribe(data => { resolve(data); })
      ;
    });
  }

  private loadSenate(): Promise<any> {
    return new Promise(resolve => {
      this.http.get("assets/data/senate.json")
        .map(res => res.json())
        .subscribe(data => { resolve(data); })
      ;
    });
  }

}

