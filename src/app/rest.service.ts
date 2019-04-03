import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://18.217.198.234:8090/';
//const endpoint = 'http://localhost:8091/';

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

  getBanco(idBanco): Observable<any> {
    return this.http.get(endpoint + 'bancocodigo?banco=' + idBanco).pipe(
      map(this.extractData));
  }
  excluiBanco(idBanco): Observable<any> {
    return this.http.get(endpoint + 'deletebanco?banco=' + idBanco).pipe(
      map(this.extractData));
  }
 
  getBancos(numPagina, quantidade, filtro): Observable<any> {
    return this.http.get(endpoint + 'listarbancos?page='+numPagina+'&size='+ quantidade + filtro).pipe(
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

  getEmpenhos(numPagina, quantidade, filtro): Observable<any> {
    return this.http.get(endpoint + 'recuperaEmpenhos?page='+numPagina+'&size='+ quantidade + filtro).pipe(
      map(this.extractData));
  }
  getEmpenho(codigoEntidade, serieEmpenho, numeroEmpenho): Observable<any> {
    return this.http.get(endpoint + 'empenho?codigoEntidade=' + codigoEntidade + '&serieEmpenho=' + serieEmpenho + '&numeroEmpenho=' + numeroEmpenho).pipe(
      map(this.extractData));
  }
  excluiEmpenho(idEmpenho): Observable<any> {
    return this.http.get(endpoint + 'deleteempenho?idEmpenho=' + idEmpenho).pipe(
      map(this.extractData));
  }
  addEmpenho(empenho): Observable<any> {
    console.log(empenho);
    return this.http.post<any>(endpoint + 'salvarempenho', JSON.stringify(empenho), httpOptions).pipe(
      tap((product) => console.log(`added empenho`)),
      catchError(this.handleError<any>('addEmpenho'))
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
