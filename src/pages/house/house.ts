declare var window;
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { ReadPage } from "../read/read";
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

  ngAfterViewInit() {
    //try {this.loader.dismiss();} catch(e) {}
  }

  ionViewWillEnter() {
    try {this.loader.dismiss();} catch(e) {}
  }

  loadData() {
    this.house = this.data.getHouse();
    if (this.house.length > 0) {
      this.subscription.unsubscribe();
    }
  }

  launchPage() {
    this.navCtrl.push(ReadPage, { rep: this.rep, loading: this.loader });
  }

  viewRep( rep: string ) {
    this.rep = rep;
    let overlay = this.loadingCtrl.create({ content: "Loading " + rep + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

}
