declare var window;
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { ReadPage } from "../read/read";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html'
})

export class BillsPage {
  errorMessage: any;
  public bills: any = [];
  bill: string;
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

  ionViewWillEnter() {
    try {this.loader.dismiss();} catch(e) {}
  }

  loadData() {
    this.bills = this.data.getBills();
    if (this.bills.length > 0) {
      this.subscription.unsubscribe();
      this.loader.dismiss();
    }
  }

  launchPage() {
    this.navCtrl.push(ReadPage, { bill: this.bill, loading: this.loader });
  }

  readBill( bill: string ) {
    this.bill = bill;
    let overlay = this.loadingCtrl.create({ content: "Loading " + bill + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

}
