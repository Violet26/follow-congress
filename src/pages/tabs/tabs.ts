import { Component } from '@angular/core';

//-- app pages for tabs
import { BillsPage } from '../bills/bills';
import { HousePage } from '../house/house';
import { SenatePage } from '../senate/senate';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabBills: any = BillsPage;
  tabHouse: any = HousePage;
  tabSenate: any = SenatePage;
  tabAbout: any = AboutPage;

  constructor() {

  }
}
