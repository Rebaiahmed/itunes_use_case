import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchComponent } from './album-search.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { INITIAL_SEARCH_QUERY } from '../constants';

fdescribe('AlbumSearchComponent', () => {
  let component: AlbumSearchComponent;
  let fixture: ComponentFixture<AlbumSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumSearchComponent,ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumSearchComponent);
    component = fixture.componentInstance;
    component.searchControl = new FormControl(INITIAL_SEARCH_QUERY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should emit searchChange with debounced and distinct values', () => {
    const emitSpy = spyOn(component.searchChange, 'emit');
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

   fixture.detectChanges();
   fixture.whenStable().then(() => {
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith('test');
  });
  });

  it('should not emit searchChange for null or empty values', () => {
    const emitSpy = spyOn(component.searchChange, 'emit');
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.value = null;
    inputElement.dispatchEvent(new Event('input'));

    jasmine.clock().install();
    jasmine.clock().tick(301);
    jasmine.clock().uninstall();

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
