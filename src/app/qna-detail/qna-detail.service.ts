import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QnaDetailService {

  constructor(private httpClient: HttpClient) { }
 
  public getSortingPerformances() {
      const headers = {
          'Content-Type': 'application/json'
        }

      let url = "/robotic/getSortingPerformance"

      return this.httpClient.post<any>(url,{ headers }).pipe(map(this.extractData), catchError(this.handleError))

  }

  private extractData(body: any) {
      return Object.assign(body.data || body);
  }

  private handleError(error: HttpErrorResponse | any) {
      let errMsg: string;
      let errObj: any;

      if (error instanceof HttpErrorResponse) {
          const err = error.message || JSON.stringify(error);
          errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
          errObj = error.error['error_message'];
      } else {
          errMsg = error.message ? error.message : error.toString();
          const body = error.message || "";
          errObj = body;
      }

      return throwError(errObj);
  }

}
