import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  be:string =  "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }
 
  public getTodos() {
      const headers = {
          'Content-Type': 'application/json'
        }

      let url = this.be+"/todos"

      return this.httpClient.get<any>(url,{ headers }).pipe(map(this.extractData), catchError(this.handleError))

  }

  public onSubmitTask(body:any) {

    return this.httpClient.post<any>(this.be+"/todos",body).pipe(map(this.extractData), catchError(this.handleError))
    
  }

  public onDeleteTask(id:any) {

    let url = this.be+"/todos"

    return this.httpClient.delete<any>(url+"/"+id).pipe(map(this.extractData), catchError(this.handleError))

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
