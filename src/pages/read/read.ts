declare var window;
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
  providers: []
})

export class ReadPage {
  errorMessage: any;
  bill: string;
  bills: any = [];
  readView: any = [];
  cleanView: any = [];
  loader: any;

  constructor(public navCtrl: NavController, public data: Data, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.loader.dismiss();
  }

  ngOnInit() {
    this.bill = this.navParams.get("bill");
    this.loader = this.navParams.get("loading");
    this.bills = this.data.getBills();
    this.setReadView();
  }

  setReadView() {
    this.readView = this.bills.filter(record => record.id === this.bill)[0];
    //console.log("READ", this.readView);
    this.cleanView = this.readView;
  }

}
