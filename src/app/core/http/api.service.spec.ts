import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Album, ItunesResponse, SearchParams, Track, TracksResponse } from '@core/models';
import { MockRender, ngMocks } from 'ng-mocks';
import { ApiService } from './api.service';

let service: ApiService;
let httpTestingController: HttpTestingController;
describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service = MockRender(ApiService).point.componentInstance;
    expect(service).toBeTruthy();
  });

  it('should search albums', () => {
    const params: SearchParams = { searchQuery: 'Test', limit: 10 };
    const mockAlbum = { collectionId: 123, collectionName: 'Test Album' } as Album;
    const mockResponse: ItunesResponse = { resultCount: 1, results: [mockAlbum] };
    const service = MockRender(ApiService).point.componentInstance;
    const httpMock = ngMocks.findInstance(HttpTestingController);

    let actualResponse: ItunesResponse | undefined;
    service.searchAlbums(params).subscribe(response => actualResponse = response);

    const req = httpMock.expectOne('/itunes-api/search?entity=album&term=Test&limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    httpMock.verify();

    expect(actualResponse).toEqual(mockResponse);
  });

  it('should get album by id', () => {
    const albumId = 123;
    const mockResponse: ItunesResponse = { resultCount: 1, results: [{ collectionId: albumId, collectionName: 'Test Album' } as Album] };

    const service = MockRender(ApiService).point.componentInstance;
    const httpMock = ngMocks.findInstance(HttpTestingController);

    let actualAlbum: Album | null | undefined;
    service.getAlbumById(albumId).subscribe(album => actualAlbum = album);

    const req = httpMock.expectOne('/itunes-api/search?term=123&entity=album&limit=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    httpMock.verify();

    expect(actualAlbum).toEqual(mockResponse.results[0] as Album);
  });

  it('should get tracks by album id', () => {
    const albumId = 123;
    const mockResponse: TracksResponse = { resultCount: 1, results: [{ trackId: 1, trackName: 'Test Track' } as Track] };

    const service = MockRender(ApiService).point.componentInstance;
    const httpMock = ngMocks.findInstance(HttpTestingController);

    let actualTracks: TracksResponse | undefined;
    service.getTracksByAlbumId(albumId).subscribe(tracks => actualTracks = tracks);

    const req = httpMock.expectOne('/itunes-api/lookup?id=123&entity=song');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    httpMock.verify();

    expect(actualTracks).toEqual(mockResponse);
  });
});