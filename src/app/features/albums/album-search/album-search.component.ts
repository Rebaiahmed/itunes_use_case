import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { INITIAL_SEARCH_QUERY } from '../constants';

@Component({
  selector: 'app-album-search',
  imports: [ReactiveFormsModule],
  templateUrl: './album-search.component.html',
  styleUrl: './album-search.component.scss'
})
export class AlbumSearchComponent implements OnInit {

  searchControl = new FormControl(INITIAL_SEARCH_QUERY);
  private destroyRef = inject(DestroyRef);
  searchChange = output<string>();
  sortByPriceEvent = output<boolean>();
  sortByReleaseDateEvent = output<boolean>();


  ngOnInit(): void {
    this.setupSearchControl();
  }

  setupSearchControl(): void {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
      filter((value: string | null) => !!value), 
      tap((value: string | null) => this.searchChange.emit(value || '')),
    ).subscribe();
  }

  sortByReleaseDate(): void {
    this.sortByReleaseDateEvent.emit(true);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchChange.emit('');
  }

  onEnter(): void {
  this.searchChange.emit(this.searchControl.value || '')
  }

}
