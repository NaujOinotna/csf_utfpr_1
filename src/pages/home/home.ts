import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

	startApp() {
	  this.navCtrl.setRoot('ObjectsViewPage', {}, {
	    animate: true,
	    direction: 'forward'
	  });
  }

  clear(){
  	this.storage.clear();
  }

}
