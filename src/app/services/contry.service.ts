import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ContryService {

  constructor(private _http: HttpClient) { }

  public getAll():Observable<any>{
    return this._http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(map((res:any[]) =>
       res.map(constry =>({ name : constry.name, code: constry.alpha3Code})
      )
    ))
  }
}
