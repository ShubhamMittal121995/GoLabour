import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  url : string = "http://localhost:8080/";

  constructor(private http : HttpClient) { }

  ajaxCall(data : Object, api : String) : Observable<any> {
    return this.http.post(this.url+api, data);
  }
  
  ajaxDelete(api : String) : Observable<any> {
    console.log(api);
    return this.http.delete(this.url+api);
  }

  ajaxGet(api : String) : Observable<any> {
    return this.http.get(this.url+api)
  }

}
