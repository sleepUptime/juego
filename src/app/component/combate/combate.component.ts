import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DungeonsAndDragonsAPIService } from '../../service/dungeons-and-dragons-api.service';
import { Personaje } from '../../model/personaje';

@Component({
  selector: 'app-combate',
  imports: [FormsModule, CommonModule],
  templateUrl: './combate.component.html',
  styleUrls: ['./combate.component.scss']
})
export class CombateComponent {

  enemigo!: Personaje;
  jugador!: Personaje;
  
  // Variables para el combate
  vidaMaximaJugador: number = 0;
  vidaMaximaEnemigo: number = 0;
  combateTerminado: boolean = false;
  jugadorGano: boolean = false;
  mensajeCombate: string = '';
  esVictoria: boolean = false; // Nueva variable para detectar mensajes de victoria
  
  // Historial de victorias
  historialVictorias: Array<{nombre: string, imagen: string, resultado: string}> = [];
  mostrarHistorial: boolean = false;
  ultimaBatalla: {jugador: {nombre: string, imagen: string}, enemigo: {nombre: string, imagen: string}, ganador: string} | null = null;
  
  // Indicador de turno
  turnoActual: string = '';
  
  // Variable para mostrar solo victorias
  soloVictorias: boolean = false;
  
  // Variable para saber si viene desde derrota
  vieneDeDerrrota: boolean = false;
  
  // Variable para el escenario de fondo
  escenarioFondo: string = '';

  url2: string = "https://www.dnd5eapi.co"

  dataEnemigos!: {
    count: number;
    results: [
      {
        index: string;
        name: string;
        url: string;
      }
    ] 
  };

  constructor(private dndService : DungeonsAndDragonsAPIService, private router: Router){
  }

  ngOnInit(){
    // Verificar si la navegación es legítima (no una recarga de página)
    const navegacionLegitima = sessionStorage.getItem('navegacionLegitima');
    
    if (!navegacionLegitima) {
      // Si no hay marca de navegación legítima, es una recarga o acceso directo
      localStorage.removeItem('personaje');
      localStorage.removeItem('historialVictorias');
      localStorage.removeItem('ultimaBatalla');
      this.router.navigate(['crear-personaje']);
      return;
    }
    
    // Limpiar la marca para la próxima vez
    sessionStorage.removeItem('navegacionLegitima');
    
    // Limpiar historial de victorias al iniciar nueva aventura
    this.historialVictorias = [];
    this.ultimaBatalla = null;
    localStorage.removeItem('historialVictorias');
    localStorage.removeItem('ultimaBatalla');
    
    // Seleccionar escenario inicial
    this.seleccionarEscenarioAleatorio();
    
    const personajeData = localStorage.getItem('personaje');
    if (!personajeData) {
      // Si no hay personaje, redirigir a crear personaje
      this.router.navigate(['crear-personaje']);
      return;
    }
    
    this.dndService.getTodos().subscribe( data => {
      this.dataEnemigos = data;
      this.generarNuevoEnemigoAleatorio();
    });
    
    const data = JSON.parse(personajeData);
    this.jugador = Object.assign(new Personaje(), data);
    this.vidaMaximaJugador = this.jugador.vida; // Guardamos la vida máxima

    // Inicializar turno
    this.turnoActual = 'jugador';
  }

  private generarNuevoEnemigoAleatorio() {
    // Seleccionar escenario aleatorio cuando se genera nuevo enemigo
    this.seleccionarEscenarioAleatorio();
    
    const id = this.generarAleatorio(0, this.dataEnemigos.count);
    this.dndService.getMonstruoDato(this.dataEnemigos.results[id].url).subscribe(datoMostruo => {
      this.enemigo = new Personaje();
      this.enemigo.nombre = datoMostruo.name;
      this.enemigo.fuerza = datoMostruo.strength;
      this.enemigo.vida = datoMostruo.hit_points;
      this.enemigo.armadura = datoMostruo.armor_class[0].value;
      this.enemigo.imagen = this.url2 + datoMostruo.image;
      
      this.vidaMaximaEnemigo = this.enemigo.vida; // Guardamos la vida máxima del enemigo
      this.combateTerminado = false;
      this.mensajeCombate = '';
      this.turnoActual = 'jugador'; // Reiniciar turno
    });
  }

  // Método para seleccionar escenario aleatorio
  private seleccionarEscenarioAleatorio() {
    const escenarios = ['escenario1.png', 'escenario2.png', 'escenario3.png'];
    const indiceAleatorio = this.generarAleatorio(0, escenarios.length - 1);
    this.escenarioFondo = `assets/${escenarios[indiceAleatorio]}`;
  }

 generarAleatorio(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

combatir(){
  if (this.combateTerminado) {
    return;
  }

  // El jugador ataca primero
  const dañoJugador = this.calcularDaño(this.jugador.fuerza, this.enemigo.armadura);
  this.enemigo.vida -= dañoJugador;
  this.mensajeCombate = `💥 ¡Atacas por ${dañoJugador} de daño!`;
  this.esVictoria = false; // Resetear victoria para mensajes normales

  // Verificar si el enemigo murió
  if (this.enemigo.vida <= 0) {
    this.enemigo.vida = 0;
    this.combateTerminado = true;
    this.jugadorGano = true;
    this.mensajeCombate = '🏆 ¡Has ganado la batalla!';
    this.esVictoria = true; // Marcar como mensaje de victoria
    this.turnoActual = '';
    
    // Registrar la batalla actual
    this.ultimaBatalla = {
      jugador: { nombre: this.jugador.nombre, imagen: this.jugador.imagen },
      enemigo: { nombre: this.enemigo.nombre, imagen: this.enemigo.imagen },
      ganador: 'jugador'
    };
    
    // Agregar al historial de victorias
    this.historialVictorias.push({
      nombre: this.enemigo.nombre,
      imagen: this.enemigo.imagen,
      resultado: 'Victoria'
    });
    
    // Guardar en localStorage
    localStorage.setItem('historialVictorias', JSON.stringify(this.historialVictorias));
    localStorage.setItem('ultimaBatalla', JSON.stringify(this.ultimaBatalla));
    
    return;
  }

  // El enemigo contraataca
  setTimeout(() => {
    this.turnoActual = 'enemigo';
    const dañoEnemigo = this.calcularDaño(this.enemigo.fuerza, this.jugador.armadura);
    this.jugador.vida -= dañoEnemigo;
    const nombreEnemigo = this.formatearNombreParaMensaje(this.enemigo.nombre);
    this.mensajeCombate = `💀 ${nombreEnemigo} te ataca por ${dañoEnemigo} de daño!`;
    this.esVictoria = false; // Resetear victoria para mensajes normales

    // Verificar si el jugador murió
    if (this.jugador.vida <= 0) {
      this.jugador.vida = 0;
      this.combateTerminado = true;
      this.jugadorGano = false;
      this.mensajeCombate = '💀 Has sido derrotado...';
      this.esVictoria = false; // Resetear victoria
      this.turnoActual = '';
      
      // Registrar la batalla actual como derrota
      this.ultimaBatalla = {
        jugador: { nombre: this.jugador.nombre, imagen: this.jugador.imagen },
        enemigo: { nombre: this.enemigo.nombre, imagen: this.enemigo.imagen },
        ganador: 'enemigo'
      };
      
      localStorage.setItem('ultimaBatalla', JSON.stringify(this.ultimaBatalla));
      
      // Ir directamente al apartado de victorias como si hubiera dado clic
      this.soloVictorias = true;
      this.mostrarHistorial = true;
    } else {
      // Si el jugador sigue vivo, es su turno otra vez
      setTimeout(() => {
        this.turnoActual = 'jugador';
      }, 1500);
    }
  }, 1000);
}

calcularDaño(fuerza: number, armadura: number): number {
  // Fórmula simple: fuerza * multiplicador basado en armadura
  const multiplicador = Math.max(0.1, 1 - (armadura / 100));
  return Math.floor(fuerza * multiplicador * (0.8 + Math.random() * 0.4)); // Un poco de aleatoriedad
}

// Método para formatear nombres largos en los mensajes
formatearNombreParaMensaje(nombre: string): string {
  // Si el nombre tiene más de 15 caracteres o más de 2 palabras, lo dividimos
  const palabras = nombre.split(' ');
  
  if (nombre.length > 15 || palabras.length > 2) {
    // Dividir en la mitad aproximada
    const mitad = Math.ceil(palabras.length / 2);
    const primeraParte = palabras.slice(0, mitad).join(' ');
    const segundaParte = palabras.slice(mitad).join(' ');
    return `${primeraParte}\n${segundaParte}`;
  }
  
  return nombre;
}

// Método para convertir saltos de línea en HTML
formatearMensajeHTML(mensaje: string): string {
  return mensaje.replace(/\n/g, '<br>');
}

siguienteBatalla() {
  // Recuperar vida: fuerza * 5 por victoria
  const vidaRecuperada = this.jugador.fuerza * 5;
  this.jugador.vida = Math.min(this.vidaMaximaJugador, this.jugador.vida + vidaRecuperada);
  
  // Generar nuevo enemigo
  this.generarNuevoEnemigoAleatorio();
}

// Para las barras de vida
getVidaPorcentajeJugador(): number {
  return (this.jugador.vida / this.vidaMaximaJugador) * 100;
}

getVidaPorcentajeEnemigo(): number {
  return (this.enemigo.vida / this.vidaMaximaEnemigo) * 100;
}

// Ir al home cuando se termine el juego
irAlHome(): void {
  // Limpiar historial para próxima partida
  localStorage.removeItem('historialVictorias');
  localStorage.removeItem('ultimaBatalla');
  localStorage.removeItem('personaje'); // También limpiar el personaje actual
  this.historialVictorias = [];
  this.ultimaBatalla = null;
  this.mostrarHistorial = false;
  
  // Navegar al componente de creación de personaje (ruta raíz)
  this.router.navigate(['crear-personaje']);
}

// Ir al home principal
irAlHomeGeneral(): void {
  this.router.navigate(['expansion']);
}

// Sistema de huida simple
huir(): void {
  if (this.combateTerminado) return;
  
  // Probabilidades por clase
  const probabilidades: any = {
    'Barbarian': 20, 'Wizard': 40, 'Ranger': 60, 'Rogue': 100, 'Paladin': 20
  };
  
  const claseNombre = this.jugador.clase !== undefined ? Object.keys(probabilidades)[this.jugador.clase] : 'Barbarian';
  const probabilidad = probabilidades[claseNombre] || 20;
  const exito = Math.random() * 100 < probabilidad;
  
  if (exito) {
    this.mensajeCombate = '🏃‍♂️ ¡Has escapado exitosamente!';
    this.esVictoria = false;
    this.turnoActual = '';
    setTimeout(() => this.generarNuevoEnemigoAleatorio(), 2000);
  } else {
    this.mensajeCombate = '🚫 ¡No pudiste escapar!';
    this.esVictoria = false;
    // Solo recibe daño del enemigo
    setTimeout(() => {
      this.turnoActual = 'enemigo';
      const dañoEnemigo = this.calcularDaño(this.enemigo.fuerza, this.jugador.armadura);
      this.jugador.vida -= dañoEnemigo;
      const nombreEnemigo = this.formatearNombreParaMensaje(this.enemigo.nombre);
      this.mensajeCombate = `💀 ${nombreEnemigo} te ataca por ${dañoEnemigo} de daño!`;
      this.esVictoria = false;
      
      if (this.jugador.vida <= 0) {
        this.jugador.vida = 0;
        this.combateTerminado = true;
        this.jugadorGano = false;
        this.mensajeCombate = '💀 Has sido derrotado...';
        this.esVictoria = false;
        this.turnoActual = '';
        
        // Registrar la batalla actual como derrota
        this.ultimaBatalla = {
          jugador: { nombre: this.jugador.nombre, imagen: this.jugador.imagen },
          enemigo: { nombre: this.enemigo.nombre, imagen: this.enemigo.imagen },
          ganador: 'enemigo'
        };
        
        localStorage.setItem('ultimaBatalla', JSON.stringify(this.ultimaBatalla));
        
        // Ir directamente al apartado de victorias como si hubiera dado clic
        this.soloVictorias = true;
        this.mostrarHistorial = true;
      } else {
        setTimeout(() => {
          this.turnoActual = 'jugador';
        }, 1500);
      }
    }, 1000);
  }
}

irACrearPersonaje() {
  this.router.navigate(['crear-personaje']);
}

mostrarVictorias() {
  // Registrar la batalla actual si está en curso (el enemigo gana por abandono)
  if (!this.combateTerminado && this.enemigo) {
    this.ultimaBatalla = {
      jugador: { nombre: this.jugador.nombre, imagen: this.jugador.imagen },
      enemigo: { nombre: this.enemigo.nombre, imagen: this.enemigo.imagen },
      ganador: 'enemigo'
    };
    localStorage.setItem('ultimaBatalla', JSON.stringify(this.ultimaBatalla));
    
    // Marcar el combate como terminado y el jugador como perdedor por abandono
    this.combateTerminado = true;
    this.jugadorGano = false;
  }
  
  this.soloVictorias = true;
  this.mostrarHistorial = true;
}

mostrarVictoriasDesdeDerrota() {
  this.soloVictorias = true;
  this.vieneDeDerrrota = true;
  this.mostrarHistorial = true;
}

volverAJugar() {
  // Limpiar historial para nueva partida
  localStorage.removeItem('historialVictorias');
  localStorage.removeItem('ultimaBatalla');
  localStorage.removeItem('personaje'); // También limpiar el personaje actual
  this.historialVictorias = [];
  this.ultimaBatalla = null;
  this.mostrarHistorial = false;
  this.soloVictorias = false;
  this.router.navigate(['crear-personaje']);
}

salirAlHome() {
  // Limpiar todo al salir al home
  localStorage.removeItem('historialVictorias');
  localStorage.removeItem('ultimaBatalla');
  localStorage.removeItem('personaje');
  this.historialVictorias = [];
  this.ultimaBatalla = null;
  this.mostrarHistorial = false;
  this.soloVictorias = false;
  this.router.navigate(['']);
}

}
