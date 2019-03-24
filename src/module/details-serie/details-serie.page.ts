import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, Renderer2, ElementRef} from '@angular/core';
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
  seriePosterHDUrl : SafeUrl
  seriePosterBlob : Blob
  isPosterHD : boolean
  seasonsList : any[]
  @ViewChild('slides') slides: IonSlides

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute, private favoriteService :FavoriteService, private sanitizer : DomSanitizer, private renderer:Renderer2) {
    this.serieDetails = new Observable<any>();
    this.seasonsList = new Array<any>();
    this.isPosterHD = false;
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
    res => {this.serieDetails=res;loading.dismiss();this.formatData(res);this.loadPosterSerie()},
    err => {console.log(err);loading.dismiss()});
  }

  async loadPosterSerie(){
    let blob = this.api.getPosterById(this.serieID);
    blob.subscribe(
      res => {this.seriePosterBlob=res;this.changeImgSource();this.isPosterHD = true;},
      err => {console.log(err);this.isPosterHD = false;});
  }

  formatData(res : Observable<any>) : void{
    let nbSeasons = res["totalSeasons"];
    for (let index = 0; index < nbSeasons; index++) {
      this.seasonsList.push(index);
    }
    let actorsString = res["Actors"];
    this.serieActors = actorsString.split(",");
    this.serieActors.forEach(actor => {
      actor = actor.trim();
    });
  }

  OpenCloseSeasonDetail(nbSeason : string){
    let target = document.getElementById("idSaison_" + nbSeason);
      if(target.classList.contains("dynamic_card_active")){
        target.classList.remove("dynamic_card_active");
      }else{
        if(!target.classList.contains("loaded")){
          this.loadDetailsSeason(parseInt(nbSeason,10));
          target.classList.add("loaded");
        }
        target.classList.add("dynamic_card_active");
      }
      console.log(target);
  }

  async loadDetailsSeason(nbSeason : number){
    let seasonDetail;
    const loading = await this.loadingController.create({
      message: 'Chargement de la saison'
    });
    await loading.present();
    this.api.detailsSeasonByImdbID(this.serieID, nbSeason).subscribe(
      res => {this.addEpisodesContent(nbSeason, res);loading.dismiss();/*this.formatData(res);*//*this.loadPosterSerie()*/},
      err => {console.log(err);loading.dismiss()});
  }

  public addEpisodesContent(nbSeason, seasonDetail){
    let target = document.getElementById("idSaison_" + nbSeason);
    console.log(seasonDetail);
    if(seasonDetail["Response"] == "True"){
      console.log(seasonDetail["Episodes"].length);
      for (let index = 1; index < seasonDetail["Episodes"].length; index++) {
        let content = this.renderer.createElement('ion-badge');
        content.setAttribute('color', 'light');
        content.setAttribute('season','nbSeason');
        content.setAttribute('episode', index);
        //this.renderer.listen(content, 'click', this.openEpisodePage());
        let text = this.renderer.createText('Episode ' + index);
        this.renderer.appendChild(content, text);
        target.appendChild(content);
      }
    }else{
      let content = this.renderer.createElement('ion-badge');
      content.setAttribute('color', 'light');
      let text = this.renderer.createText('Aucune informations');
      this.renderer.appendChild(content, text);
      target.appendChild(content);
    }
  }

  public openEpisodePage(){
    //TODOb redirect to another page
  }

  changeImgSource(){
    let urlCreator = window.URL;
    this.seriePosterHDUrl = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(this.seriePosterBlob));
    //alert(this.seriePosterHDUrl);
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
