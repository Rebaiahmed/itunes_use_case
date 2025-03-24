import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ItunesResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }


  searchAlbums(term: string, offset: number = 0, limit: number = 20, sortBy?: string): Observable<ItunesResponse> {
    let url = `${this.apiUrl}?term=${term}&entity=album&limit=${limit}&offset=${offset}`;
    return this.http.get<ItunesResponse>(url);
  }
}
