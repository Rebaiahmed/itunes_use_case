import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@core/http/api.service';
import { Album } from '@core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-album-list',
  imports: [],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent implements OnInit {

  private itunesService = inject(ApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef)

  albums = signal<Album[]>([]);
  offset = signal(0);
  isLoading = signal(false);
  limit = 20;
  

  constructor() {
  }
  ngOnInit(): void {
    this.itunesService.searchAlbums({})
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(console.log)
      )
      .subscribe();
  }



  viewAlbumDetails(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }

}
