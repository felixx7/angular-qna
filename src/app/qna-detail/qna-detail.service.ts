import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { Firestore, collectionData, collection,doc,addDoc,deleteDoc,updateDoc,setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QnaDetailService {

  constructor(private firestore: Firestore,private httpClient: HttpClient) { }
 
  public getQuestionAnswer():Observable<any>{
    let questionAnswer = collection(this.firestore,'questionAnswer')
    return collectionData(questionAnswer) as Observable<any>
  }

  public addQuestDetail(dataQuestionAnswer:any){
    dataQuestionAnswer.id = doc(collection(this.firestore,'questionAnswer')).id
    // return addDoc(collection(this.firestore,'questionAnswer'),dataQuestionAnswer)
    return setDoc(doc(this.firestore, "questionAnswer", dataQuestionAnswer.id), dataQuestionAnswer)

  }

  public delete(questionAnswer:any){
    let docRef = doc(this.firestore,`questionAnswer/${questionAnswer.id}`)
    return deleteDoc(docRef)
  }

  public update(questionAnswer:any,id:any){
    let docRef = doc(this.firestore,`questionAnswer/${id}`)
    return updateDoc(docRef,questionAnswer)
  }

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

interface QuestionAnswer {
  id: string,
  questionAnswer : string,
  questionDetailId : string
}


