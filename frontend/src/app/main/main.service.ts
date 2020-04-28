import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Establishment } from '../shared/models/establishment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(private http:HttpClient) { }

  getAllEstablishments(): Observable<Array<Establishment>> {
    const url = "http://localhost:5000/establishment/";
    return this.http.get<Array<Establishment>>(url).pipe(catchError(this.handleError));
  }

  getEstablishmentsByLocation(location): Observable<Array<Establishment>> {
    const url = "http://localhost:5000/establishment/filter/location";
    return this.http.post<Array<Establishment>>(url, location).pipe(catchError(this.handleError));
  }

  getEstablishmentsByDateTime(dateTime): Observable<Array<Establishment>> {
    const url = "http://localhost:5000/establishment/filter/datetime";
    return this.http.post<Array<Establishment>>(url, dateTime).pipe(catchError(this.handleError));
  }

  getEstablishmentsByCuisine(cuisine): Observable<Array<Establishment>> {
    const url = `http://localhost:5000/establishment/filter/cuisine`;
    return this.http.post<Array<Establishment>>(url, cuisine).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errMsg: string = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
      console.log(errMsg)
    }
    else if (typeof err.error === 'string') {
      errMsg = JSON.parse(err.error).message
    }
    else {
      if (err.status == 0) {
        errMsg = "A connection to back end can not be established.";
      } else {
        errMsg = err.error.message;
      }
    }
    return throwError(errMsg);
  }
}
