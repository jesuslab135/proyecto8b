import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchAsistenciaEvento } from '../../../api/asistencia-evento-api';

@Component({
  selector: 'app-asistencias-eventos-table',
  imports: [CommonModule],
  templateUrl: './asistencias-eventos.html',
  styleUrl: './asistencias-eventos.css'
})
export class AsistenciasEventos implements OnInit {
  asistenciasEventos: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.asistenciasEventos = await fetchAsistenciaEvento();
    } catch (e) {
      console.error('Error al obtener actividad de uaurio: ', e);
      this.router.navigate(['/login']);
    }
  }
}
