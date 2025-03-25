import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@core/http/api.service';
import { Album, SearchParams } from '@core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AlbumItemComponent } from '../album-item/album-item.component';
import { LoadingComponent } from '@shared/loading/loading.component';
import { NotFoundComponent } from '@shared/not-found/not-found.component';
import { AlbumSearchComponent } from '../album-search/album-search.component';
import { INITIAL_SEARCH_QUERY } from '../constants';
import { AlbumDetailsComponent } from '../album-details/album-details.component';

@Component({
  selector: 'app-album-list',
  imports: [AlbumItemComponent,LoadingComponent,NotFoundComponent,AlbumSearchComponent,AlbumDetailsComponent],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent implements OnInit {

  private itunesService = inject(ApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef)
  albums = signal<Album[]>([]);
  isLoading = signal(false);
  componentParams: SearchParams = {
    searchQuery: INITIAL_SEARCH_QUERY,
    isLoading: false,
    limit:25,
    sortBy: '',
  };
  

  constructor() {
  }
  ngOnInit(): void {
   this.itunesService.searchAlbums(this.componentParams)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(console.log)
      )
      .subscribe((response)=>{
        this.albums.set(response?.results);
      }); 
  }

  handleSearchChange(term: string): void {
    console.log('term',term)
  }

  handleSortByReleaseDate(): void {
    this.componentParams.sortBy = this.componentParams.sortBy === 'releaseDateAsc' ? 'releaseDateDesc' : 'releaseDateAsc';
    //this.albums.set([]);
    //this.loadAlbums();
  }

  viewAlbumDetails(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }

}
