import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ApiService } from '@core/http/api.service';
import { Album, SearchParams } from '@core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AlbumItemComponent } from '../album-item/album-item.component';
import { LoadingComponent } from '@shared/loading/loading.component';
import { NotFoundComponent } from '@shared/not-found/not-found.component';
import { AlbumSearchComponent } from '../album-search/album-search.component';
import { INITIAL_SEARCH_QUERY, ITEMS_PER_LOAD } from '../constants';
import { AlbumDetailsComponent } from '../album-details/album-details.component';

@Component({
  selector: 'app-album-list',
  imports: [AlbumItemComponent,LoadingComponent,NotFoundComponent,AlbumSearchComponent,
    ScrollingModule,
    InfiniteScrollDirective
  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent implements OnInit {

  private itunesService = inject(ApiService);
  private destroyRef = inject(DestroyRef)
  albums = signal<Album[]>([]);
  isLoading = signal(false);
  componentParams: SearchParams = {
    searchQuery: INITIAL_SEARCH_QUERY,
    isLoading: false,
    limit:25,
    sortBy: '',
  };
  totalResults = 0;
  currentCount = 0;
  itemsPerLoad = ITEMS_PER_LOAD;
  
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  
  constructor() {
  }
  ngOnInit(): void {
   this.fetchAndSetAlbums(); 
  }

  private fetchAndSetAlbums() {
    this.isLoading.set(true);
    this.itunesService.searchAlbums(this.componentParams)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        this.albums.set([...this.albums(), ...response.results.slice(this.currentCount, this.currentCount + this.itemsPerLoad)]);
        this.totalResults = response.resultCount;
        this.currentCount = this.albums().length;
        this.isLoading.set(false); 
      });
  }

  handleSearchChange(term: string): void {
    this.componentParams = {
      ...this.componentParams,
      searchQuery: term
    };
    this.albums.set([]);
    this.fetchAndSetAlbums(); 
  }

  handleSortByReleaseDate(): void {
    this.componentParams.sortBy = this.componentParams.sortBy === 'releaseDateAsc' ? 'releaseDateDesc' : 'releaseDateAsc';
    this.fetchAndSetAlbums();
  }

  onScroll() {
    if (this.currentCount < this.totalResults) {
      this.fetchAndSetAlbums();
    }
  }

  trackByAlbumId(index:number,album: Album): number {
    return album.collectionId;
  }

}
