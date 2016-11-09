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
  public house: any = [];
  rep: string;
  loader: any;
  timer: any;
  subscription: any;

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
    this.house = this.data.getSenate();
    if (this.house.length > 0) {
      this.subscription.unsubscribe();
      this.loader.dismiss();
    }
  }

  launchPage() {
    this.navCtrl.push(RepPage, { rep: this.rep, loading: this.loader });
  }

  viewRep( rep: string ) {
    this.rep = rep;
    let overlay = this.loadingCtrl.create({ content: "Loading " + rep + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

}
