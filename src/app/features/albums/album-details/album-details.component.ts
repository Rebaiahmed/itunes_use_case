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

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);
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
          tap((album) => this.album.set(album)),
          switchMap((album: Album) => album ? this.getAlbumTracks(album) : of([]))
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((tracks: Track[]) => {
      this.tracks.set(tracks);
    });
  }

  private getAlbumTracks(album: Album): Observable<Track[]> {
    return this.apiService.getTracksByAlbumId(album.collectionId).pipe(
      map((response: TracksResponse) => response.results)
    );
  }

  private fetchAlbumDetails(albumId: string): Observable<Album>{
    return this.apiService.getAlbumById(parseInt(albumId, 10));
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
