import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Album, ItunesResponse, SearchParams, Track, TracksResponse } from '../models';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  constructor() { }


  searchAlbums(params: SearchParams): Observable<ItunesResponse> {
    const url = this.constructUrl(params);
    return this.http.get<ItunesResponse>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error?.message));
        })
      );
  }

  getAlbumById(albumId: number): Observable<Album | null> {
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
        console.log('error', error);
        return throwError(() => new Error(error?.message));
      })
    );
  }

  getTracksByAlbumId(albumId: number): Observable<TracksResponse> {
    const url = `${this.baseUrl}?id=${albumId}&entity=song`;
    return this.http.get<TracksResponse>(url).pipe(
    /*   map((response: TracksResponse) => {
        if (response.results && response.results.length > 0) {
          return {
            resultCount: response.resultCount,
            results: response.results.filter(res => res.wrapperType === 'track' && res.kind === 'song')
          };
        } else {
          return { resultCount: 0, results: [] };
        }
      }), */
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
