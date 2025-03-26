import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { routeTransition } from './routes-transition';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,NavbarComponent],
  animations: [
    routeTransition
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class AppComponent {
  constructor(protected route: ActivatedRoute) {
  }
}
