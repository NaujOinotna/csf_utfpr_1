import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RulesViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rules-view',
  templateUrl: 'rules-view.html',
})
export class RulesViewPage {

	ruleCards: any[] = [];

  initialConditions: any[] = [];

  objects: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    storage.get('ruleCards').then(
      (value)=>{
        if(value && value.length > 0)
          this.ruleCards = value;
        else
          this.ruleCards = [];
      });
    storage.get('initialConditions').then(
      (value)=>{
        if(value && value.length > 0)
          this.initialConditions = value;
        else
          this.initialConditions = [];
        console.log(this.initialConditions);
      });
    storage.get('objects').then(
      (value)=>{
        if(value)
          this.objects = value;
        else
          this.objects = [];
        console.log(this.objects);
      });
  }

  ionViewDidLoad() {
  }

  addRuleCard(){
  	this.ruleCards.push({condition:'', rules:[]});
    this.ruleCardsChanged();
  }

  removeRuleCard(i: number){
  	this.ruleCards.splice(i, 1);
    this.ruleCardsChanged();
  }

  addRule(cardId: any){
  	this.ruleCards[cardId].rules.push('');
    this.ruleCardsChanged();
  }

  removeRule(cardId: any, ruleId: string){
		this.ruleCards[cardId].rules.splice(ruleId, 1);
    this.ruleCardsChanged();
  }

	trackByFn(index: any, item: any) {
	   return index;
	}

  ruleCardsChanged(){
    this.storage.set('ruleCards', this.ruleCards);    
  }

  addInitialCondition(){
    this.initialConditions.push('');
    this.initialConditionsChanged();
  }

  removeInitialCondition(ruleId: number){
    this.initialConditions.splice(ruleId, 1);
    this.initialConditionsChanged();
  }

  initialConditionsChanged(){
    this.storage.set('initialConditions', this.initialConditions);    
  }

}
