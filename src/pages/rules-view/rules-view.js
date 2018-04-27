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
/**
 * Generated class for the RulesViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RulesViewPage = /** @class */ (function () {
    function RulesViewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.test = "123d";
        this.ruleCards = [
            { condition: 't=0', rules: ['P=P', 'V=V'] },
            { condition: 't=0', rules: ['P=P', 'V=V'] },
            { condition: 't=0', rules: ['P=P', 'V=V'] },
        ];
    }
    RulesViewPage.prototype.teste = function (value) {
        this.test = value;
    };
    RulesViewPage.prototype.ionViewDidLoad = function () {
    };
    RulesViewPage.prototype.addRuleCard = function () {
        this.ruleCards.push({ condition: '', rules: [] });
    };
    RulesViewPage.prototype.removeRuleCard = function (i) {
        this.ruleCards.splice(i, 1);
    };
    RulesViewPage.prototype.addRule = function (cardId, rule) {
        this.ruleCards[cardId].rules.push(rule);
    };
    RulesViewPage.prototype.removeRule = function (cardId, ruleId) {
        this.ruleCards[cardId].rules.splice(ruleId, 1);
    };
    RulesViewPage.prototype.trackByFn = function (index, item) {
        return index;
    };
    RulesViewPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-rules-view',
            templateUrl: 'rules-view.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], RulesViewPage);
    return RulesViewPage;
}());
export { RulesViewPage };
//# sourceMappingURL=rules-view.js.map