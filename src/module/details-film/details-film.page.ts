import { FavoriteService } from './../../service/favorite/favorite.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';
import { OmdbApiService } from '../../service/omdb/omdb-api.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpEvent, HttpEventType, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details-film',
  templateUrl: './details-film.page.html',
  styleUrls: ['./details-film.page.scss'],
})
export class DetailsFilmPage implements OnInit {

  movieDetails : any
  movieID : string
  movieActors : any[]
  isFavorite : boolean
  moviePosterBlob : Blob
  moviePosterHDUrl : SafeUrl
  downloadProgress : number
  writeErr : string
  isPosterHD : boolean
  @ViewChild('slides') slides: IonSlides;
  //fileTransfer: FileTransferObject

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public navCtrl: NavController, private router: Router, private favoriteService :FavoriteService, private http :HttpClient, private sanitizer : DomSanitizer,/* private transfer: FileTransfer, private file: File*/) {
    this.movieDetails = new Observable<any>();
    this.isPosterHD = false;
   }

  ngOnInit() {
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    let urlLastPart = this.router.url.slice(1).split(urlDelimitators)[1];
    this.movieID = urlLastPart;
    this.loadDetailsFilm();
    this.favoriteService.isFavorite(this.movieID).then(isFav => {
      this.isFavorite = isFav;
    });/*
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      this.fileTransfer = this.transfer.create();
    }*/
  }

  async loadDetailsFilm(){
  const loading = await this.loadingController.create({
    message: 'Le détail arrive...'
  });
  await loading.present();
  this.api.detailsFilmByImdbID(this.movieID).subscribe(
    res => {this.movieDetails=res;loading.dismiss();this.formatData(res);this.loadPosterFilm();},
    err => {console.log(err);loading.dismiss()});
  }

  async loadPosterFilm(){
    let blob = this.api.getPosterById(this.movieID);
    blob.subscribe(
      res => {this.moviePosterBlob=res;this.changeImgSource();this.isPosterHD = true;},
      err => {console.log(err);this.isPosterHD = false;});
  }
  /*
  downloadHdPoster(){
    this.fileTransfer = this.transfer.create();
    //let url = this.sanitizer.sanitize(SecurityContext.HTML, this.moviePosterHDUrl);
    alert("début download");
    this.fileTransfer.download('https://www.ynov.com/brochures/brochure_ynov_20182019.pdf', this.file.dataDirectory + 'file.pdf').then((entry) => {
      alert("download success")
      alert(entry.toURL());
      entry.toURL();
    }, (error) => {
      alert(error);
    });
    this.fileTransfer.download(url, this.file.dataDirectory + 'poster').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log('erreur download poster');
    });
}*/

  formatData(res : Observable<any>) : void{
    let actorsString = res["Actors"];
    this.movieActors = actorsString.split(",");
    this.movieActors.forEach(actor => {
      actor = actor.trim();
    });
  }

  changeImgSource(){
    let urlCreator = window.URL;
    this.moviePosterHDUrl = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(this.moviePosterBlob));
    alert(this.moviePosterHDUrl);
  }

  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  favoriteFilm() {
    this.favoriteService.favoriteFilm(this.movieID).then(() => {
      this.isFavorite = true;
    });
  }
 
  unfavoriteFilm() {
    this.favoriteService.unfavoriteFilm(this.movieID).then(() => {
      this.isFavorite = false;
    });
  }
}
