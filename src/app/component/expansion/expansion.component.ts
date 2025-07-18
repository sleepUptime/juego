import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expansion',
  imports: [CommonModule],
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent {

  constructor(private router: Router) { }

  volverAlHome(): void {
    this.router.navigate(['']);
  }

  irACrearPersonaje(): void {
    this.router.navigate(['crear-personaje']);
  }

}
