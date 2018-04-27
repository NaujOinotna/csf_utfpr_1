import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { ObjectsViewPage } from '../pages/objects-view/objects-view';

@Component({
  templateUrl: 'app.html',
  template: `<ion-menu [content]="content" swipeEnabled=false>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Objetos', component: 'ObjectsViewPage' },
    { title: 'Regras', component: 'RulesViewPage' },
    { title: 'Cena', component: 'SceneViewPage' },
  ]

  simulator: Simulator = new Simulator();;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.simulator.start();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

class Simulator{

  objects: any[];
  rules: any[];
  variable: any[];

  constructor(){
  }

  start(){
    
  }

}