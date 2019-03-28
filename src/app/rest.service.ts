import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://18.217.198.234:8090/';
//const endpoint = 'http://localhost:8090/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getBancos(): Observable<any> {
    return this.http.get(endpoint + 'listarbancos').pipe(
      map(this.extractData));
  }
  addBanco (product): Observable<any> {
    console.log(product);
    return this.http.post<any>(endpoint + 'salvarbanco', JSON.stringify(product), httpOptions).pipe(
      tap((product) => console.log(`added product`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  
  updateBanco (id, product): Observable<any> {
    return this.http.put(endpoint + 'bancocodigo/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
