import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Album, ItunesResponse, SearchParams, TracksResponse } from '../models';
import { handleError } from './error-handling';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private baseUrl = '/itunes-api/search';
  private lookupUrl = '/itunes-api/lookup';

  constructor() { }

  searchAlbums(params: SearchParams): Observable<ItunesResponse> {
    const url = this.constructUrl(params);
    return this.http.get<ItunesResponse>(url)
      .pipe(
        handleError()
      );
  }

  getAlbumById(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}?term=${albumId}&entity=album&limit=1`;
    return this.http.get<ItunesResponse>(url).pipe(
      map((response: ItunesResponse) => {
        if (response.results && response.results.length > 0) {
          return response.results[0] as Album;
        } else {
          return {} as Album;
        }
      }),
      handleError()
    );
  }

  getTracksByAlbumId(albumId: number): Observable<TracksResponse> {
    const url = `${this.lookupUrl}?id=${albumId}&entity=song`;
    return this.http.get<TracksResponse>(url).pipe(
      handleError()
    );
  }



 /*  private constructUrl(params: SearchParams): string {
    let url = `${this.baseUrl}?entity=album`;
    const { searchQuery, limit } = params;
    if (searchQuery) {
      url += `&term=${searchQuery}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }
    return url;
  } */

    private constructUrl(params: SearchParams): string {
      let httpParams = new HttpParams().set('entity', 'album');
      if (params.searchQuery) {
        httpParams = httpParams.set('term', params.searchQuery);
      }
  
      if (params.limit) {
        httpParams = httpParams.set('limit', params.limit.toString());
      }
      return `${this.baseUrl}?${httpParams.toString()}`;
    }
}
