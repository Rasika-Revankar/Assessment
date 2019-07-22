import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DetailService {
  constructor(private httpClient: HttpClient) { }
  hostUrl = 'https://jsonplaceholder.typicode.com';

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getusers(): Observable<any> {
    return this.httpClient.get<any>(`${this.hostUrl}/users`)
      .pipe(tap(),
        catchError(this.handleError)
      );
  }
  usersPostData(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.hostUrl}/posts?userId=${userId}`)
      .pipe(tap(),
        catchError(this.handleError)
      );
  }
  getComments(postId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.hostUrl}/comments?postId=${postId}`)
      .pipe(tap(),
        catchError(this.handleError)
      );
  }
}
