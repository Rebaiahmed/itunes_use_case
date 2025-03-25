import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/http/api.service';
import { Album, Track, TracksResponse } from '@core/models';
import { LoadingComponent } from '@shared/loading/loading.component';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'c',
  imports: [CommonModule,LoadingComponent],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss'
})
export class AlbumDetailsComponent {

  private router = inject(Router);
  private route =  inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  album= signal<Album | undefined>(undefined);
  tracks = signal<Track[]>([]); 


  ngOnInit() {
    this.loadAlbumDetailsFromRoute();
    this.fetchAlbumAndTracks();
  }


  loadAlbumDetailsFromRoute(): void {
    this.route.params.pipe(
      switchMap((params) => this.fetchAlbumDetails(params['id'])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((album) => {
      if (album) {
        this.album.set(album);
      }
    });
  }

  fetchAlbumAndTracks(): void {
    this.route.params.pipe(
      switchMap((params) => {
        return this.fetchAlbumDetails(params['id']).pipe(
          tap((album) => this.album.set(album || undefined)),
          switchMap((album) => {
            return album ? this.apiService.getTracksByAlbumId(album.collectionId).pipe(
              map((response: TracksResponse) => response.results)
            ) : [];
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((tracks: Track[]) => {
      console.log('tracks',tracks);
      this.tracks.set(tracks);
    });
  }

  private fetchAlbumDetails(albumId: string): Observable<Album | null>{
    return this.apiService.getAlbumById(parseInt(albumId, 10));
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
