import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function handleError<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
        return throwError(() => err);
      })
    );
}