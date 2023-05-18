import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProgramResultType, ProgramsFetchResult, SeriesCategories } from '../types/program-fetch-result.type';
import { VideoModel } from '../types/video-type';

@Injectable({
  providedIn: "root"
})

export class SeriesService {

  private apiUrl = environment.apiUrls.seriesUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  public async getSeriesByCategory(serieCategory: SeriesCategories, page?: string): Promise<ProgramResultType[]> {
    return (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${serieCategory}?api_key=${this.apiKey}${page ? '&page=' + page : null}`))).results;
  }

  public async getSimilarSeries(similarSerieId: string | number):Promise<ProgramResultType[]> {
    return (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${similarSerieId}/recommendations?api_key=17acd9c39b103a235bc6dcaa22e3957a`))).results
  }

  public async getSeriesById(seriesId: number): Promise<ProgramResultType> {
    return (await firstValueFrom(this.http.get<ProgramResultType>(`${this.apiUrl}/${seriesId}?api_key=17acd9c39b103a235bc6dcaa22e3957a`)));
  }

  public async getSeriesTrailer(seriesId: number):Promise<string> {
    return firstValueFrom(this.http.get<VideoModel>(`${this.apiUrl}/${seriesId}/videos?api_key=17acd9c39b103a235bc6dcaa22e3957a`).pipe(
      map(response => response.results.find(result => result.name === 'Official Trailer')),
      map(response=> `https://www.youtube.com/embed/${response?.key}`)
    ));
  }

  public getSeriesCast(seriesId: number): Observable<{}> {
    return this.http.get(`${this.apiUrl}/${seriesId}/credits?api_key=17acd9c39b103a235bc6dcaa22e3957a`)
  }

}
