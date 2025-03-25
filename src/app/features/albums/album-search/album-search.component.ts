import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Album } from '@core/models';

@Component({
  selector: 'app-album-search',
  imports: [ReactiveFormsModule],
  templateUrl: './album-search.component.html',
  styleUrl: './album-search.component.scss'
})
export class AlbumSearchComponent implements OnInit {

  searchControl = new FormControl('');
  private destroyRef = inject(DestroyRef);
  searchChange = output<string>()


  ngOnInit(): void {
    this.setupSearchControl();
  }

  setupSearchControl(): void {
    this.searchControl.valueChanges.pipe(
     // takeUntilDestroyed(this.destroyRef),
    /*   debounceTime(300),
      distinctUntilChanged(), */
      //tap((value:string) => this.searchChange.emit(value)),
      
    ).subscribe();
  }

}
