import { MediaListPageModule } from './../media-list/media-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-media.router.module';

import { IonicModule } from '@ionic/angular';

import { TabsMediaPage } from './tabs-media.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    MediaListPageModule
  ],
  declarations: [TabsMediaPage]
})
export class TabsMediaPageModule {}
