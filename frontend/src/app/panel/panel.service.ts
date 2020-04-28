import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Establishment } from '../shared/models/establishment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(private http:HttpClient) { }

  getAllAwaitingValidation(): Observable<Array<Establishment>> {
    const url = "http://localhost:5000/validation/";
    return this.http.get<Array<Establishment>>(url).pipe(catchError(this.handleError));
  }

  validateEstablishment(est): Observable<Establishment>{
    const url = "http://localhost:5000/establishment/add";
    return this.http.post<Establishment>(url, est).pipe(catchError(this.handleError));
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
