import { CommonModule } from '@angular/common';

import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ServicioBusqueda } from './servicio-busqueda';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('EVALUACION_Salinas');

}