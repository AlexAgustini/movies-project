import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProgramResultType, ProgramsFetchResult, SeriesCategories } from '../models/program-fetch-result.model';

@Injectable({
  providedIn: "root"
})

export class SeriesService {

  private apiUrl = environment.apiUrls.seriesUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  async getSeriesByCategory(serieCategory: SeriesCategories): Promise<ProgramResultType[]> {
    return (await firstValueFrom(this.http.get<ProgramsFetchResult>(`${this.apiUrl}/${serieCategory}?api_key=${this.apiKey}`))).results;
  }

}
