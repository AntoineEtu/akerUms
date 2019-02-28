import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { OmdbApiService } from 'src/service/omdb/omdb-api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from 'src/service/favorite/favorite.service';

@Component({
  selector: 'app-details-serie',
  templateUrl: './details-serie.page.html',
  styleUrls: ['./details-serie.page.scss'],
})
export class DetailsSeriePage implements OnInit {

  serieDetails : any
  serieID : string
  serieActors : any[]
  isFavorite : boolean
  seriePosterHD : Blob
  seriePosterBase64 : string | ArrayBuffer
  @ViewChild('slides') slides: IonSlides;

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute, private favoriteService :FavoriteService) {
    this.serieDetails = new Observable<any>();
   }

  ngOnInit() {
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    let urlLastPart = this.router.url.slice(1).split(urlDelimitators)[1];
    this.serieID = urlLastPart;
    this.loadDetailsSerie();
    this.favoriteService.isFavorite(this.serieID).then(isFav => {
      this.isFavorite = isFav;
    })
  }

  async loadDetailsSerie(){
  const loading = await this.loadingController.create({
    message: 'Le détail arrive...'
  });
  await loading.present();
  this.api.detailsSerieByImdbID(this.serieID).subscribe(
    res => {this.serieDetails=res;loading.dismiss();this.formatData(res);/*this.loadPosterFilm()*/},
    err => {console.log(err);loading.dismiss()});
  }

  async loadPosterSerie(){
    //TODO : GERER L'AFFICHAGE DE CETTE DONNEE DE MERDE
    let url = this.api.getPosterById(this.serieID);
    url.subscribe(
      res => {this.seriePosterHD=res;console.log(res);this.changeImgSource();},
      err => {console.log(err);this.changeImgSource();});
  }

  formatData(res : Observable<any>) : void{
    let actorsString = res["Actors"];
    this.serieActors = actorsString.split(",");
    this.serieActors.forEach(actor => {
      actor = actor.trim();
    });
  }

  changeImgSource(){
    var reader = new FileReader();
          reader.readAsDataURL(this.seriePosterHD);
          reader.onloadend = () => {
            this.seriePosterBase64 = reader.result;
            console.log(this.seriePosterBase64);
          }
  }

  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  favoriteSerie() {
    this.favoriteService.favoriteFilm(this.serieID).then(() => {
      this.isFavorite = true;
    });
  }
 
  unfavoriteSerie() {
    this.favoriteService.unfavoriteFilm(this.serieID).then(() => {
      this.isFavorite = false;
    });
  }

}
