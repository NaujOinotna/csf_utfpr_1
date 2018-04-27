import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ObjectsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-objects-view',
  templateUrl: 'objects-view.html',
})
export class ObjectsViewPage { 
  colors: any[] = [
    'Tomato',
    'Orange',
    'DodgerBlue',
    'MediumSeaGreen',
    'Gray',
    'SlateBlue',
    'Violet',
    'LightGray'
  ];
  objects: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    //storage.clear();
    storage.get('objects').then(
      (value)=>{
        if(value)
          this.objects = value;
        else
          this.objects = [];
        console.log(this.objects);
      });
  }

  addObject(){
    this.objects.push({ color:'LightGray', initialPosition: '(0,0)', initialRotation:'0', radius: '40' });
    this.somethingChanged();
  }

  removeObject(i: number){
    this.objects.splice(i, 1);
    this.somethingChanged();
  }

  changeColor(i: number, color:string){
    this.objects[i].color = color;
    this.somethingChanged();
  }

  somethingChanged(){
    this.storage.set('objects', this.objects);    
  }

}
