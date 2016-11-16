declare var window;
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { RepPage } from "../rep/rep";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-house',
  templateUrl: 'house.html'
})

export class HousePage {
  errorMessage: any;
  house: any = [];
  cleanHouse: any = [];
  rep: string;
  loader: any;
  timer: any;
  subscription: any;
  filterParty: string = "All";
  filterState: string = "All";

  constructor(public navCtrl: NavController, public data: Data, public loadingCtrl: LoadingController) {
    this.timer = Observable.timer(2000, 3000);
    this.subscription = this.timer.subscribe(t => { this.loadData(); } );
  }

  ngOnInit() {
    let overlay = this.loadingCtrl.create({ content: "Loading ..." });
    this.loader = overlay;
    this.loader.present();
  }

  loadData() {
    this.house = this.data.getHouse();
    this.cleanHouse = this.data.getHouse();
    if (this.house.length > 0) {
      this.subscription.unsubscribe();
      this.loader.dismiss();
    }
  }
  filter() {
    this.house = this.cleanHouse;
    if (this.filterParty == "All" && this.filterState !== "All") {
      this.house = this.house.filter(record => record.state === this.filterState);
    } else if (this.filterParty !== "All" && this.filterState == "All") {
      this.house = this.house.filter(record => record.party === this.filterParty);
    } else {
      this.house = this.house.filter(record => record.party === this.filterParty && record.state === this.filterState);
    }
  }
  launchPage() {
    this.navCtrl.push(RepPage, { dataType: "house", rep: this.rep, loading: this.loader });
  }

  viewRep( rep: string ) {
    this.rep = rep;
    let overlay = this.loadingCtrl.create({ content: "Loading " + rep + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

}
