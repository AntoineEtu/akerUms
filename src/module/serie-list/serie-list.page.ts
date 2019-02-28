import { Component, OnInit } from '@angular/core';
import { LoadingController, IonSearchbar } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { OmdbApiService } from '../../service/omdb/omdb-api.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.page.html',
  styleUrls: ['./serie-list.page.scss'],
})
export class SerieListPage implements OnInit {

  formatedString : string
  seriesListObservable : Observable<any>
  seriesList : Array<any>
  tooMuchResult : boolean
  serieNotFound : boolean
  searchBarDisplayed : boolean
  totalResults : number
  currentPage : number
  @ViewChild('searchBar') searchBar: IonSearchbar;

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public router: Router) { }

  ngOnInit() {
    this.hideSearchBar();
  }

  openDetailsPage(iD : any) : void{
    this.router.navigate([ '/details-serie/' + iD]);
  }

  async loadSeriesByTitle(e : any){
    let searchBarInput  = e.target.value;
    if(searchBarInput.length > 0){
      const loading = await this.loadingController.create({
        message: 'Patientez...'
      });
    //TODO : Implementer la gestion des pages du résultat
    this.removeExceptionsViews();
    await loading.present();

    this.formatedString = searchBarInput.trim();
    this.api.searchSeriesByTitle(this.formatedString).subscribe(
      res => {this.seriesListObservable=res.Search;
        this.totalResults = res.totalResults;
        loading.dismiss();
        console.log(res);
        this.handleExceptions(res);
        this.seriesList=res.Search;
        this.currentPage=1;
      },
      err => {loading.dismiss();console.log(err)});
    }
  }

  async loadSeriesByTitleAndPage(currentPage : number){
    this.api.searchSeriesByTitleAndPage(this.formatedString, currentPage).subscribe(
      res => {this.seriesListObservable=res.Search;
        this.handleExceptions(res);
        console.log(res.Search);
        for(let i =0; i < res.Search.length; i++){
          this.seriesList.push(res.Search[i]);
        }
      },
      err => {console.log(err)});
  }

  doInfinite(infiniteScroll){
    if(this.totalResults/10 >= this.currentPage){
      this.currentPage++;
      setTimeout(() => {
          console.log("page"+this.currentPage);
          this.loadSeriesByTitleAndPage(this.currentPage);
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
      if(res.Error == "Serie not found!"){
        this.serieNotFound = true;
      }
    }
  }

  removeExceptionsViews(){
    this.tooMuchResult = false;
    this.serieNotFound = false;
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
