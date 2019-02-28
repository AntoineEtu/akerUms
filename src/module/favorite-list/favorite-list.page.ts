import { OmdbApiService } from './../../service/omdb/omdb-api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoriteService } from './../../service/favorite/favorite.service'

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.page.html',
  styleUrls: ['./favorite-list.page.scss'],
})
export class FavoriteListPage implements OnInit {

  noResult: boolean
  idList: Array<string>
  moviesList: Array<any>

  constructor(private api: OmdbApiService, public loadingController: LoadingController, public router: Router, private favoriteService: FavoriteService) {
    this.idList = new Array<string>();
  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.loadAllIds();
  }

  loadAllIds(): Promise<any> {
    this.moviesList = new Array<any>();
    return new Promise((resolve, reject) => {
      this.favoriteService.getAllFavoriteFilms().then(
        res => { this.idList = res; this.loadAllFavorites(); resolve('done') },
        err => { reject(err) }
      );
    });
  }

  loadAllFavorites() {
    this.idList.forEach(id => {
      this.loadDetailsFilm(id);
    });
  }

  async loadDetailsFilm(id: string) {
    let movieDetails;
    this.api.detailsFilmByImdbID(id).subscribe(
      res => { movieDetails = res; this.moviesList.push(movieDetails); },
      err => { console.log(err); });
  }

  handleExceptions(res: string) {
    if (res == "noResult") {
      this.noResult = true;
    }
  }

  removeExceptionsViews() {
    this.noResult = false;
  }

  openDetailsPage(id: any): void {
    this.router.navigate(['/details-film/' + id]);
  }

}
