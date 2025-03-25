import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Album, ItunesResponse, SearchParams, TracksResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  //private readonly baseUrl = environment.apiUrl;
  private baseUrl = '/itunes-api/search';
  private lookupUrl = '/itunes-api/lookup';

  constructor() { }


  searchAlbums(params: SearchParams): Observable<ItunesResponse> {
    const url = this.constructUrl(params);
    return this.http.get<ItunesResponse>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('errors',error)
          return throwError(() => new Error(error?.message));
        })
      );
  }

  getAlbumById(albumId: number): Observable<Album> {
    const url = `${this.baseUrl}?term=${albumId}&entity=album&limit=1`;
    return this.http.get<ItunesResponse>(url).pipe(
      map((response: ItunesResponse) => {
        if (response.results && response.results.length > 0) {
          return response.results[0] as Album;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error?.message));
      })
    );
  }

  getTracksByAlbumId(albumId: number): Observable<TracksResponse> {
    const url = `${this.lookupUrl}?id=${albumId}&entity=song`;
    return this.http.get<TracksResponse>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error?.message));
      })
    );
  }



  private constructUrl(params: SearchParams): string {
    let url = `${this.baseUrl}?entity=album`;
    const { searchQuery, limit, sortBy } = params;
    if (searchQuery) {
      url += `&term=${searchQuery}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }
    return url;
  }
}
