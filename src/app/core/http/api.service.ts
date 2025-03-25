import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItunesResponse, SearchParams } from '../models';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

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


  private constructUrl(params: SearchParams): string {
    let url = `${this.apiUrl}?entity=album`;
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
