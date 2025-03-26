import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumItemComponent } from './album-item.component';
import { input } from '@angular/core';
import { MockInstance, MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';

describe('AlbumItemComponent', () => {
  let component: AlbumItemComponent;
  let fixture: ComponentFixture<AlbumItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumItemComponent],
      providers: [MockProvider(Router)],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should navigate to album details when viewAlbumDetails is called', () => {
    spyOn(router, 'navigate');
    const albumId = 123;
    component.viewAlbumDetails(albumId);
    expect(router.navigate).toHaveBeenCalledWith(['/albums', albumId]);
  });
});
