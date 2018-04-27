import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjectsViewPage } from './objects-view';

@NgModule({
  declarations: [
    ObjectsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjectsViewPage),
  ],
})
export class ObjectsViewPageModule {}
