import { TabsMediaPage } from './tabs-media.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsMediaPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/media-list',
        pathMatch: 'full',
      },
      {
        path: 'media-list',
        loadChildren: '../media-list/media-list.module#MediaListPageModule',
      },
      {
        path: 'serie-list',
        loadChildren: '../serie-list/serie-list.module#SerieListPageModule',
      },
      {
        path: 'favorite-list',
        loadChildren: '../favorite-list/favorite-list.module#FavoriteListPageModule',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/media-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
