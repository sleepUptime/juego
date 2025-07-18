import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaje } from '../model/personaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForjandoHeroeService {

  private dataUrl = 'assets/clasePredeterminadas.json';
  private jugadorEnCurso: Personaje = new Personaje();

  constructor(private http: HttpClient) {}

  getClasesIniciales(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.dataUrl);
    
  }
  setJugadorEnCurso(data: Personaje): void {
    this.jugadorEnCurso = data;
  }

  getJugadorEnCurso(): Personaje {
    return this.jugadorEnCurso;
  }
}
