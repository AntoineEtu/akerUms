import { Component, OnInit } from '@angular/core';
import { LoadingController, IonSearchbar } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { OmdbApiService } from '../../service/omdb/omdb-api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.page.html',
  styleUrls: ['./media-list.page.scss'],
})
export class MediaListPage implements OnInit {

  moviesListObservable : Observable<any>
  moviesList : Array<any>
  tooMuchResult : boolean
  movieNotFound : boolean
  searchBarDisplayed : boolean
  totalResults : number
  pageResult : number
  formatedString : string
  currentPage : number
  @ViewChild('searchBar') searchBar: IonSearchbar;

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public router: Router) { }

  ngOnInit() {
    this.hideSearchBar();
  }

  openDetailsPage(iD : any) : void{
    this.router.navigate([ '/details-film/' + iD]);
  }

  async loadMoviesByTitle(e : any){
    let searchBarInput  = e.target.value;
    if(searchBarInput.length > 0){
      const loading = await this.loadingController.create({
        message: 'Patientez...'
      });
    //TODO : Implementer la gestion des pages du résultat
    this.removeExceptionsViews();
    await loading.present();

    this.formatedString = searchBarInput.trim();
    this.api.searchFilmsByTitle(this.formatedString).subscribe(
      res => {this.moviesListObservable=res.Search;
        this.totalResults = res.totalResults;
        loading.dismiss();
        this.handleExceptions(res);
        this.moviesList=res.Search;
        this.currentPage=1;
      },
      err => {loading.dismiss();console.log(err)});
    }
  }

  async loadMoviesByTitleAndPage(currentPage : number){
    this.api.searchFilmsByTitleAndPage(this.formatedString, currentPage).subscribe(
      res => {this.moviesListObservable=res.Search;
        this.handleExceptions(res);
        for(let i =0; i < res.Search.length; i++){
          this.moviesList.push(res.Search[i]);
        }
      },
      err => {console.log(err)});
  }

  doInfinite(infiniteScroll){
    if(this.totalResults/10 >= this.currentPage){
      this.currentPage++;
      setTimeout(() => {
          console.log("page"+this.currentPage);
          this.loadMoviesByTitleAndPage(this.currentPage);
        console.log('Async operation has ended');
        infiniteScroll.target.complete();
      }, 500);
    }else{
      infiniteScroll.target.complete();
    }
  }

  handleExceptions(res : any){
    if(res.Response == "False"){
      if(res.Error == "Too many results."){
        this.tooMuchResult = true;
      }
      if(res.Error == "Movie not found!"){
        this.movieNotFound = true;
      }
    }
  }

  removeExceptionsViews(){
    this.tooMuchResult = false;
    this.movieNotFound = false;
  }

  showSearchBar(){
    this.searchBarDisplayed = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    },150);
  }

  hideSearchBar(){
    this.searchBarDisplayed = false;
  }
}
