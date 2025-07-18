import { Component, OnInit } from '@angular/core';
import { ClasePersonaje, Personaje } from '../../model/personaje';
import { ForjandoHeroeService } from '../../service/forjando-heroe.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creacion-personaje',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './creacion-personaje.component.html',
  styleUrl: './creacion-personaje.component.scss'
})
export class CreacionPersonajeComponent implements OnInit {

  personaje! : Personaje;

  tipoPersonaje : string = '';
  clasePersonajeList! : ClasePersonaje [];
  arrayPersonajes!: Personaje[];

  selectedClassImage: string = '';

  constructor(private forjandoHeroe: ForjandoHeroeService, private router: Router){
  }

  ngOnInit(): void {
    this.cargarArrayPersonajes();
    this.personaje = new Personaje();
  }

  cargarArrayPersonajes(){
    this.forjandoHeroe.getClasesIniciales().subscribe(data => {
      this.arrayPersonajes = data;
      // Asignar clase aleatoria automáticamente
      this.escogerClaseAlAzar();
    });
  }

  // Escoger clase al azar (solo clase, no nombre)
  escogerClaseAlAzar(): void {
    if (this.arrayPersonajes && this.arrayPersonajes.length > 0) {
      const claseAleatoria = Math.floor(Math.random() * this.arrayPersonajes.length);
      const personajeAleatorio = this.arrayPersonajes[claseAleatoria];
      
      this.personaje.clase = personajeAleatorio.clase;
      this.selectedClassImage = personajeAleatorio.imagen;
      // No asignar nombre, vida, armadura ni fuerza aquí
    }
  }


  crearPersonaje(){
    // Validar que el personaje tenga nombre y clase
    if (!this.personaje.nombre || this.personaje.nombre.trim() === '') {
      alert('Por favor, ingresa un nombre para tu personaje');
      return;
    }
    
    if (this.personaje.clase === undefined) {
      alert('Por favor, selecciona una clase para tu personaje');
      return;
    }

    // this.personaje.vida *= 50;
    // this.personaje.armadura  5

    this.arrayPersonajes.forEach(clasePersonaje=> {
        if (clasePersonaje.clase == this.personaje.clase){
            this.personaje.vida += clasePersonaje.vida;
            this.personaje.armadura += clasePersonaje.armadura;
            this.personaje.fuerza += clasePersonaje.fuerza;
            this.personaje.imagen = clasePersonaje.imagen;
        }        
    });

    this.forjandoHeroe.setJugadorEnCurso(this.personaje);

    localStorage.setItem('personaje', JSON.stringify(this.personaje));
    
    // Marcar que la navegación al combate es legítima
    sessionStorage.setItem('navegacionLegitima', 'true');
    
    // Navegar al combate después de crear el personaje
    this.router.navigate(['combate']);
  }

  onClaseChange(clase: ClasePersonaje){
    this.arrayPersonajes.forEach(person=> {
        if (person.clase == clase){
            this.selectedClassImage = person.imagen;
        }        
    });
  }

  // Obtener estadísticas de la clase actual
  getEstadisticasClase(): any {
    if (this.arrayPersonajes && this.personaje.clase !== undefined) {
      return this.arrayPersonajes.find(p => p.clase === this.personaje.clase);
    }
    return null;
  }


}
