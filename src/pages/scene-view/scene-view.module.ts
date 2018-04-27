import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SceneViewPage } from './scene-view';

@NgModule({
  declarations: [
    SceneViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SceneViewPage),
  ],
})
export class SceneViewPageModule {}
