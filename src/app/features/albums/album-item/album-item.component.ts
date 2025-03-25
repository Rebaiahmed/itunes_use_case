import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '@core/models';

@Component({
  selector: 'app-album-item',
  imports: [],
  templateUrl: './album-item.component.html',
  styleUrl: './album-item.component.scss'
})
export class AlbumItemComponent {
  album = input<Album>();
  private router = inject(Router);


  viewAlbumDetails(albumId: number) {
    alert('hey hey')
    this.router.navigate(['/albums', albumId]);
  }

}
