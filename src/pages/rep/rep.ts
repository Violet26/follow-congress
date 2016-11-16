declare var window;
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-rep',
  templateUrl: 'rep.html',
  providers: []
})

export class RepPage {
  errorMessage: any;
  repID: number;
  repDetails: any = [];
  dataType: string;
  allReps: any;
  loader: any;

  constructor(public navCtrl: NavController, public data: Data, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
    this.repID = this.navParams.get("rep");
    this.dataType = this.navParams.get("dataType");
    this.loadData();
  }

  ionViewWillEnter() {
    try { this.loader.dismiss(); } catch(e) { }
  }

  ngOnInit() {
  }

  loadData() {
    if (this.dataType == "house") {
      this.allReps = this.data.getHouse();
    } else if (this.dataType == "senate") {
      this.allReps = this.data.getSenate();
    }
    if (this.allReps) {
      this.repDetails = this.allReps.filter(record => record.id == this.repID)[0];
      console.log(this.repDetails);
    }
  }

}
