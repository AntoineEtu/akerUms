import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '../module/tabs-media/tabs-media.module#TabsMediaPageModule' },
  { path: 'home', loadChildren: '../module/home/home.module#HomePageModule' },
  { path: 'media-list', loadChildren: '../module/media-list/media-list.module#MediaListPageModule' },
  { path: 'details-film/:id', loadChildren: '../module/details-film/details-film.module#DetailsFilmPageModule' },
  { path: 'serie-list', loadChildren: '../module/serie-list/serie-list.module#SerieListPageModule' },
  { path: 'details-serie/:id', loadChildren: '../module/details-serie/details-serie.module#DetailsSeriePageModule' },
  { path: 'favorite-list', loadChildren: '../module/favorite-list/favorite-list.module#FavoriteListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
