import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const apiOMDBURL = "http://www.omdbapi.com/";
const apiPosterURL = "http://img.omdbapi.com/";
const apiKey = "75522b56";

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  constructor(private http: HttpClient) {
  }

  buildOmdbURLWithAPIKey() : string{
    let builtInURL = apiOMDBURL + "?apikey=" + apiKey;
    return builtInURL;
  }

  buildPosterURLWithAPIKey() : string{
    let builtInURL = apiPosterURL + "?apikey=" + apiKey;
    return builtInURL;
  }

  searchFilmsByTitle(titleParam : string) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    request += "&s=" + titleParam +"" + "&type=movie";
    return this.http.get(request);
  }

  searchFilmsByTitleAndPage(titleParam : string, currentPage : number) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    console.log("page pour requete : " + currentPage);
    request += "&s=" + titleParam +"" + "&type=movie" + "&page=" + currentPage;
    return this.http.get(request);
  }

  detailsFilmByImdbID(id : string) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    request += "&i=" + id + "&type=movie";
    return this.http.get(request);
  }

  getPosterById(id : string) : Observable<any>{
    let request : string = this.buildPosterURLWithAPIKey();
    request += "&i=" + id;
    return this.http.get(request);
  }

  searchSeriesByTitle(titleParam : string) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    request += "&s=" + titleParam +"" + "&type=series";
    console.log(request);
    return this.http.get(request);
  }

  searchSeriesByTitleAndPage(titleParam : string, currentPage : number) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    console.log("page pour requete : " + currentPage);
    request += "&s=" + titleParam +"" + "&type=series" + "&page=" + currentPage;
    console.log(request);
    return this.http.get(request);
  }

  detailsSerieByImdbID(id : string) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    request += "&i=" + id + "&type=series";
    return this.http.get(request);
  }

  detailsSeasonByImdbID(id : string, seasonNumber : number) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    request += "&i=" + id + "&type=series" + "&season=" + seasonNumber;
    return this.http.get(request);
  }

  detailsEpisodeByImdbID(id : string, seasonNumber : number, episodeNumber : number) : Observable<any>{
    let request : string = this.buildOmdbURLWithAPIKey();
    request += "&i=" + id + "&type=series" + "&season=" + seasonNumber + "&episode=" +episodeNumber;
    return this.http.get(request);
  }

}
