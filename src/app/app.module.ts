import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Data } from '../providers/data';
import {MomentModule} from 'angular2-moment';
//-- app pages
import { BillsPage } from '../pages/bills/bills';
import { HousePage } from '../pages/house/house';
import { SenatePage } from '../pages/senate/senate';
import { AboutPage } from '../pages/about/about';
import { ReadPage } from '../pages/read/read';
import { RepPage } from '../pages/rep/rep';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BillsPage,
    HousePage,
    SenatePage,
    AboutPage,
    ReadPage,
    RepPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BillsPage,
    HousePage,
    SenatePage,
    AboutPage,
    ReadPage,
    RepPage
  ],
  providers: [
    Storage,
    Data
  ]
})

export class AppModule {

}
