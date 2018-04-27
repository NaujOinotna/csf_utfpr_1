var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ObjectsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ObjectsViewPage = /** @class */ (function () {
    function ObjectsViewPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.colors = [
            'Tomato',
            'Orange',
            'DodgerBlue',
            'MediumSeaGreen',
            'Gray',
            'SlateBlue',
            'Violet',
            'LightGray'
        ];
        /*storage.set('colors', [
                    'Tomato',
                    'Orange',
                    'DodgerBlue',
                    'MediumSeaGreen',
                    'Gray',
                    'SlateBlue',
                    'Violet',
                    'LightGray'
                  ]);
        return;*/
        console.log('test storage:');
        storage.get('objects').then(function (value) {
            _this.objects = value;
            console.log(_this.colors);
        });
        /*
            console.log(this.colors);
            
            this.objects = [
              { color:'Blue' },
              { color:'Tomato' },
              { color:'MediumSeaGreen' },
              { color:'Gray' },
              { color:'LightGray' }
            ];*/
    }
    ObjectsViewPage.prototype.addObject = function () {
        this.objects.push({ color: 'LightGray' });
        this.storage.set('objects', this.);
    };
    ObjectsViewPage.prototype.removeObject = function (i) {
        this.objects.splice(i, 1);
    };
    ObjectsViewPage.prototype.changeColor = function (i, color) {
        this.objects[i].color = color;
    };
    ObjectsViewPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-objects-view',
            templateUrl: 'objects-view.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], ObjectsViewPage);
    return ObjectsViewPage;
}());
export { ObjectsViewPage };
//# sourceMappingURL=objects-view.js.map