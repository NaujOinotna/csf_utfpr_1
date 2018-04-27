import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RulesViewPage } from './rules-view';

@NgModule({
  declarations: [
    RulesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(RulesViewPage),
  ],
})
export class RulesViewPageModule {}
