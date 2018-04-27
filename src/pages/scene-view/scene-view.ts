import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SceneViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scene-view',
  templateUrl: 'scene-view.html',
})
export class SceneViewPage {

	objects: any[] = [];

	sceneDiv: any;
  scene: any;
  running: any = false;
  didRunned: any = false;

  lastTouch: any = { x:0, y:0 };
  touchEnd: any = { x:0, y:0 };
  touchObj: any;

  ruleCards: any[] = [];
  initialConditions: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.running = false;
    this.didRunned = false;

    storage.get('scene').then(
      (value)=>{
        if(value)
          this.scene = value;
        else
          this.scene = { position:'(0,0)' };
        document.getElementById('scene').style.left = this.scene.position.split(',')[0].slice(1) + 'px';
        document.getElementById('scene').style.top = this.scene.position.split(',')[1].slice(0, -1) + 'px';
      });
    storage.get('objects').then(
      (value)=>{
        if(value)
          this.objects = value;
        else
          this.objects = [];
        this.createDivs();
      });

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
  }

  createDivs() {
    this.sceneDiv = document.getElementById('scene');

    for (var i = 0; i < this.objects.length; ++i) {
      this.objects[i].div = document.createElement("div");
      this.objects[i].div.id = i;

      this.objects[i].div.style.left = this.objects[i].initialPosition.split(',')[0].slice(1) + 'px';
      this.objects[i].div.style.top = this.objects[i].initialPosition.split(',')[1].slice(0, -1) + 'px';
      this.objects[i].div.style.width = this.objects[i].radius*2 + 'px'; 
      this.objects[i].div.style.height = this.objects[i].radius*2 + 'px'; 

      this.objects[i].div.style.borderRadius = '50%'; 
      this.objects[i].div.style.backgroundColor = this.objects[i].color;
      this.objects[i].div.style.position = 'absolute';
      this.objects[i].div.addEventListener("touchstart", this.touchstart, false);
      this.objects[i].div.addEventListener("touchmove", this.touchmove, false);
      this.objects[i].div.addEventListener("touchend", this.touchend, false);
      this.sceneDiv.appendChild(this.objects[i].div);
    }
  }

  touchstart = (event: any)=>{
    this.lastTouch.x = event.touches[0].clientX;
    this.lastTouch.y = event.touches[0].clientY;
  }

  touchend = (event: any)=>{
    if(!this.didRunned){
      let x = event.target.style.left.slice(0, -2);
      let y = event.target.style.top.slice(0, -2);
      this.objects[event.target.id].initialPosition = '(' + x + ',' + y + ')';
      this.storage.set('objects', this.objects);    
    }
  }

  touchmove = (event: any)=>{
    if(!this.didRunned)
      this.move(event, event.target)
  }

  touchstartScene = (event: any)=>{
     this.touchstart(event);
  }

  touchendScene(event: any){
    if(!this.didRunned){
      let x = this.sceneDiv.style.left.slice(0, -2);
      let y = this.sceneDiv.style.top.slice(0, -2);
      this.scene.position = '(' + x + ',' + y + ')';
      this.storage.set('scene', this.scene);    
    }
  }

  touchmoveScene = (event: any)=>{
    this.move(event, this.sceneDiv);
  }

  move(event: any, target: any){
    let x = Number(target.style.left.slice(0, -2));
    let dx = event.touches[0].clientX - this.lastTouch.x;
    this.lastTouch.x = event.touches[0].clientX;

    target.style.left = (x + dx)+'px';

    let y = Number(target.style.top.slice(0, -2));

    let dy = event.touches[0].clientY - this.lastTouch.y;
    this.lastTouch.y = event.touches[0].clientY;

    target.style.top = (y + dy)+'px';
  }

  frame(){
    for (var i = 0; i < this.ruleCards.length; ++i) {
      //if(this.resolve(this.ruleCards[i].condition))
      for (var j = 0; j < this.ruleCards[i].rules.length; ++j) {
        let splited = this.ruleCards[i].rules[j].split('=');
        this.variables[splited[0]] = splited[1];
      }
    }

    for (var i = 0; i < this.objects.length; ++i) {
      let pos = this.getValue(this.variables['Pos'+(i+1)]);
      let radius = this.getValue(this.variables['Raio'+(i+1)]);
      this.objects[i].div.style.left = pos.slice(1,-1).split(',')[0] + 'px';
      this.objects[i].div.style.top  = pos.slice(1,-1).split(',')[1] + 'px';
      this.objects[i].div.style.width  = radius*2 + 'px'; 
      this.objects[i].div.style.height = radius*2 + 'px'; 
    }
    this.variables['t'] = this.getValue('t+0.01');
  }

  timerId: any;

  run(){
    this.timerId = setInterval(() => {this.frame()}, 10);
  }

  stop(){
    clearInterval(this.timerId);
  }

  variables: string[] = [];

  start = (e:any)=>{
    if(!this.running){
      e.target.innerHTML = 'Pausar';
      this.running = true;

      if(!this.didRunned){
        this.didRunned = true;
        this.variables['t']='0';
        for (var i = 0; i < this.initialConditions.length; ++i) {
          this.variables[this.initialConditions[i].split('=')[0]] = this.initialConditions[i].split('=')[1];
        }
        for (var i = 0; i < this.objects.length; ++i) {
          this.variables['Pos' +(i+1)+'_i'] = this.objects[i].initialPosition;
          this.variables['Rot' +(i+1)+'_i'] = this.objects[i].initialRotation;
          this.variables['Raio'+(i+1)+'_i'] = this.objects[i].radius;
          this.variables['Pos' +(i+1)] = this.objects[i].initialPosition;
          this.variables['Rot' +(i+1)] = this.objects[i].initialRotation;
          this.variables['Raio'+(i+1)] = this.objects[i].radius;
        }
      }
      this.run();
    } else {
      e.target.innerHTML = 'Continuar';
      this.running = false;
      this.stop();
    }
  }

  getValue(exp:string){
    //console.log(exp);
    for (var i = 0; i < exp.length; ++i) {
      if(exp[i] == '['){
        for (var j = i+1; j < exp.length; ++j) {
          if(exp[j] == '['){
            i = j;
          }
          if(exp[j] == ']'){
            return this.getValue(
                    exp.slice(0, i) + 
                    this.getValue(exp.substring(i+1, j))+
                    exp.slice(j+1)
                    );
          }
        }
      }
    }

    var toSum = [];
    if(exp.indexOf('+') != -1){
      toSum = exp.split('+');
      let exp1 = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        let exp2 = this.getValue(toSum[i]);
        if(exp1.indexOf(',') != -1)
          exp = '('+
          (Number(this.getValue(exp1.slice(1,-1).split(',')[0])) + Number(this.getValue(exp2.slice(1,-1).split(',')[0])))+
          ','+
          (Number(this.getValue(exp1.slice(1,-1).split(',')[1])) + Number(this.getValue(exp2.slice(1,-1).split(',')[1])))+ 
          ')';
        else
          exp = (Number(this.getValue(exp1)) + Number(this.getValue(exp2)))+'';
        exp1 = exp;
      }
    }
    /*if(exp.indexOf('-') != -1){
      toSum = exp.split('-');
      console.log(toSum[0]);
      if(toSum[0] != ''){
        let exp1 = this.getValue(toSum[0]);
        for (var i = 1; i < toSum.length; ++i) {
          let exp2 = this.getValue(toSum[i]);
          if(exp1.indexOf(',') != -1)
            exp = '('+
            (Number(this.getValue(exp1.slice(1,-1).split(',')[0])) - Number(this.getValue(exp2.slice(1,-1).split(',')[0])))+
            ','+
            (Number(this.getValue(exp1.slice(1,-1).split(',')[1])) - Number(this.getValue(exp2.slice(1,-1).split(',')[1])))+ 
            ')';
          else
            exp = (Number(this.getValue(exp1)) - Number(this.getValue(exp2)))+'';
          exp1 = exp;
        }
      }
    }*/
    if(exp.indexOf('/') != -1){
      toSum = exp.split('/');
      let exp1 = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        let exp2 = this.getValue(toSum[i]);
        if(exp1.indexOf(',') != -1)
          exp = '('+
          (Number(this.getValue(exp1.slice(1,-1).split(',')[0])) / Number(this.getValue(exp2)))+
          ','+
          (Number(this.getValue(exp1.slice(1,-1).split(',')[1])) / Number(this.getValue(exp2)))+ 
          ')';
        else
          exp = (Number(this.getValue(exp1)) / Number(this.getValue(exp2)))+'';
        exp1 = exp;
      }
    }
    if(exp.indexOf('*') != -1){
      toSum = exp.split('*');
      let exp1 = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        let exp2 = this.getValue(toSum[i]);
        if(exp1.indexOf(',') != -1)
          exp = '('+
          (Number(this.getValue(exp1.slice(1,-1).split(',')[0])) * Number(this.getValue(exp2)))+
          ','+
          (Number(this.getValue(exp1.slice(1,-1).split(',')[1])) * Number(this.getValue(exp2)))+ 
          ')';
        else if(exp2.indexOf(',') != -1)
          exp = '('+
          (Number(this.getValue(exp2.slice(1,-1).split(',')[0])) * Number(this.getValue(exp1)))+
          ','+
          (Number(this.getValue(exp2.slice(1,-1).split(',')[1])) * Number(this.getValue(exp1)))+ 
          ')';
        else
          exp = (Number(this.getValue(exp1)) * Number(this.getValue(exp2)))+'';
        exp1 = exp;
      }
    }

    if(this.variables[exp] != undefined){
      return this.getValue(this.variables[exp]);
    }
    return exp;
  }

}


export class World{
  rules: string[] = [];
  variables: string[] = [];

  setRule(){
    for (var i = 0; i < this.rules.length; ++i) {
      let rules = this.rules[i].split(';');
      for (var j = 0; j < rules.length; ++j) {
        this.variables[rules[j].split('=')[0]] = rules[j].split('=')[1];
      }
    }
  }

  update(){
    this.variables['t'] = (Number(this.variables['t']) + 0.01) + '';
  }  

  getValue(exp:string){
    //console.log(exp);
    for (var i = 0; i < exp.length; ++i) {
      if(exp[i] == '('){
        for (var j = i+1; j < exp.length; ++j) {
          if(exp[j] == '('){
            i = j;
          }
          if(exp[j] == ')'){
            return this.getValue(
                    exp.slice(0, i) + 
                    this.getValue(exp.substring(i+1, j))+
                    exp.slice(j+1)
                    );
          }
        }
      }
    }

    var toSum = [];
    if(exp.indexOf('+') != -1){
      toSum = exp.split('+');
      exp = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        exp = (Number(exp) + Number(this.getValue(toSum[i]))) + '';
      }
    }    
    if(exp.indexOf('-') != -1){
      toSum = exp.split('-');
      exp = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        exp = (Number(exp) - Number(this.getValue(toSum[i]))) + '';
      }
    }
    if(exp.indexOf('/') != -1){
      toSum = exp.split('/');
      exp = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        exp = (Number(exp) / Number(this.getValue(toSum[i]))) + '';
      }
    }
    if(exp.indexOf('*') != -1){
      toSum = exp.split('*');
      exp = this.getValue(toSum[0]);
      for (var i = 1; i < toSum.length; ++i) {
        exp = (Number(exp) * Number(this.getValue(toSum[i]))) + '';
      }
    }    

    if(this.variables[exp] != undefined){
      return this.getValue(this.variables[exp]);
    }
    return exp;
  }

}