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
  searchFor: string = "";
  shouldShowCancel: boolean = false;
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
    this.readView = this.bills.filter(record => record.bill === this.bill)[0];
    this.cleanView = this.readView;
  }

  onSearchCancel(event) {
    this.readView = this.cleanView;
  }

  onSearchInput(event) {
    var searchText = event.target.value;
    console.log("search start: ", searchText);
    if (searchText == "" || searchText == undefined || searchText.length < 3) {
      this.readView = this.cleanView;
    } else {
      var temp = this.cleanView;
      for (var c in temp.chapters) {
        for (var v in temp.chapters[c].verses) {
          var regex = new RegExp(searchText, "gi");
          temp.chapters[c].verses[v] = temp.chapters[c].verses[v].replace(regex, "<span class=\"highlight\">"+searchText.toUpperCase()+"</span>");
        }
      }
      this.readView = temp;
    }
    console.log("search end: ", searchText);
    return true;
  }

}
