import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DungeonsAndDragonsAPIService {

  url: string = "https://www.dnd5eapi.co/api/2014"
  url2: string = "https://www.dnd5eapi.co"
  constructor(private http:HttpClient) { }


  getTodos(): Observable<any> {
    return this.http.get<any>(this.url+ "/monsters" );
  }
  getMonstruoDato(url: string): Observable<any>{
    return this.http.get<any>(this.url2+ url );
  }

}
