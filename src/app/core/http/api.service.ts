import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ItunesResponse, SearchParams } from '../models';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  constructor() { }


  searchAlbums(params: SearchParams): Observable<ItunesResponse> {
    const { searchQuery, offset, limit, sortBy } = params;
    let url = `${this.apiUrl}?term=${searchQuery}&entity=album&limit=${limit}&offset=${offset}`;
    return this.http.get<ItunesResponse>(url)
    .pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.message || 'Something went wrong'));
    }))
  }
}
