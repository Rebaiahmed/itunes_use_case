import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('@features/albums/album-list/album-list.component').then(
          (m) => m.AlbumListComponent
        ),
      pathMatch: 'full',
    },
    {
      path: ':id',
      loadComponent: () =>
        import('@features/albums/album-details/album-details.component').then(
          (m) => m.AlbumDetailsComponent
        ),
    },
    { path: '**', redirectTo: '' },
  ];
