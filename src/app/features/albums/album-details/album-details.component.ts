import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/http/api.service';
import { Album } from '@core/models';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-album-details',
  imports: [CommonModule],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss'
})
export class AlbumDetailsComponent {

  private router = inject(Router);
  private route =  inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  album= signal<Album | undefined>(undefined); 


  ngOnInit() {
    this.loadAlbumDetailsFromRoute();
  }


  loadAlbumDetailsFromRoute() {
    this.route.params
      .pipe(
        switchMap((params) => this.fetchAlbumDetails(params['id'])),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private fetchAlbumDetails(movieId: string) {
    return of(null);

  }

  goBack() {
    this.router.navigate(['/']);
  }

}
