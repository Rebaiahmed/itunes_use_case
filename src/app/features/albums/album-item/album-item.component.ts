import { Component, input } from '@angular/core';
import { Album } from '@core/models';

@Component({
  selector: 'app-album-item',
  imports: [],
  templateUrl: './album-item.component.html',
  styleUrl: './album-item.component.scss'
})
export class AlbumItemComponent {
  albumData = input<Album>();

}
