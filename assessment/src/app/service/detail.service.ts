import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})

export class DetailService {
  constructor(private httpClient: HttpClient) { }
  host = "https://jsonplaceholder.typicode.com"

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
    return this.httpClient.get<any>(this.host + '/users')
      .pipe(tap(),
        catchError(this.handleError)
      );
  }
  getPost(): Observable<any> {
    return this.httpClient.get<any>(this.host + '/posts')
      .pipe(tap(),
        catchError(this.handleError)
      );
  }
  getComments(): Observable<any> {
    return this.httpClient.get<any>(this.host + '/comments')
      .pipe(tap(),
        catchError(this.handleError)
      );
  }
}
