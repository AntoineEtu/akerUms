import { FavoriteService } from './../../service/favorite/favorite.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';
import { OmdbApiService } from '../../service/omdb/omdb-api.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpEvent, HttpEventType, HttpClient } from '@angular/common/http';
import { Local } from 'protractor/built/driverProviders';

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
  moviePosterHD : Blob
  moviePosterBase64 : string | ArrayBuffer
  downloadProgress : number
  writeErr : string
  @ViewChild('slides') slides: IonSlides;

  constructor(public api: OmdbApiService, public loadingController: LoadingController, public navCtrl: NavController, private router: Router, private favoriteService :FavoriteService, private http :HttpClient) {
    this.movieDetails = new Observable<any>();
   }

  ngOnInit() {
    const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
    let urlLastPart = this.router.url.slice(1).split(urlDelimitators)[1];
    this.movieID = urlLastPart;
    this.loadDetailsFilm();
    this.favoriteService.isFavorite(this.movieID).then(isFav => {
      this.isFavorite = isFav;
    });
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        //this.createFile();
    }
  }

  async loadDetailsFilm(){
  const loading = await this.loadingController.create({
    message: 'Le détail arrive...'
  });
  await loading.present();
  this.api.detailsFilmByImdbID(this.movieID).subscribe(
    res => {this.movieDetails=res;loading.dismiss();this.formatData(res);/*this.loadPosterFilm()*/},
    err => {console.log(err);loading.dismiss()});
  }

  async loadPosterFilm(){
    //TODO : GERER L'AFFICHAGE DE CETTE DONNEE DE MERDE
    let url = this.api.getPosterById(this.movieID);
    url.subscribe(
      res => {this.moviePosterHD=res;console.log(res);this.changeImgSource();},
      err => {console.log(err);this.changeImgSource();});
  }

  formatData(res : Observable<any>) : void{
    let actorsString = res["Actors"];
    this.movieActors = actorsString.split(",");
    this.movieActors.forEach(actor => {
      actor = actor.trim();
    });
  }

  changeImgSource(){
    var reader = new FileReader();
    reader.readAsDataURL(this.moviePosterHD);
    reader.onloadend = () => {
      this.moviePosterBase64 = reader.result;
      console.log(this.moviePosterBase64);
    }
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

  /*
  createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

        this.writeFile(fileEntry, null, isAppend);

    }, null);

}

writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function() {
          console.log("Successful file write...");
          this.readFile(fileEntry);
      };

      fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
          dataObj = new Blob(['some file data'], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
  });
}

readFile(fileEntry) {

  fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
          //displayFileData(fileEntry.fullPath + ": " + this.result);
      };

      reader.readAsText(file);

  }, null);
}*/
}
