import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailsComponent } from './album-details.component';
import { ApiService } from '@core/http/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Album, Track, TracksResponse } from '@core/models';
import { MockProvider } from 'ng-mocks';

describe('AlbumDetailsComponent', () => {
  let component: AlbumDetailsComponent;
  let fixture: ComponentFixture<AlbumDetailsComponent>;
  let apiService: ApiService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDetailsComponent],
      providers: [
        MockProvider(ApiService),
        MockProvider(Router),
        MockProvider(ActivatedRoute, {
          params: of({ id: '123' }),
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle album not found', () => {
    spyOn(apiService, 'getAlbumById').and.returnValue(of(null));
    component.fetchAlbumAndTracks();
    expect(component.album()).toBeNull();
    expect(component.tracks()).toEqual([]);
  });

  it('should fetch album details and tracks', () => {
    const mockAlbum: Album = { collectionId: 123, collectionName: 'Test Album' } as any;
    const mockTracks: Track[] = [{ trackId: 1, trackName: 'Test Track' }] as any[];
    const mockTracksResponse: TracksResponse = { resultCount: 1, results: mockTracks };
    spyOn(apiService, 'getAlbumById').and.returnValue(of(mockAlbum));
    spyOn(apiService, 'getTracksByAlbumId').and.returnValue(of(mockTracksResponse));
    component.fetchAlbumAndTracks();
    expect(apiService.getAlbumById).toHaveBeenCalledWith(123);
    expect(apiService.getTracksByAlbumId).toHaveBeenCalledWith(123);
    expect(component.album()).toEqual(mockAlbum);
    expect(component.tracks()).toEqual(mockTracks);
  });
});
