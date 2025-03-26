import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'albums',
    loadComponent: () =>
      import('@features/albums/album-list/album-list.component').then(
        (m) => m.AlbumListComponent
      ),
    pathMatch: 'full',
    data: { animationState: 'List' }
  },
  {
    path: 'albums/:id',
    loadComponent: () =>
      import('@features/albums/album-details/album-details.component').then(
        (m) => m.AlbumDetailsComponent
      ),
    data: { animationState: 'One' }
  },
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: '**', redirectTo: 'albums' },
];