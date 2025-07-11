import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchActividadUsuario } from '../../../api/actividad-usuario-api'; // ajusta si es necesario

@Component({
  selector: 'app-actividad-usuario-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actividad-usuario-table.html',
  styleUrls: ['./actividad-usuario-table.css']
})
export class ActividadUsuarioTableComponent implements OnInit {
  actividades: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.actividades = await fetchActividadUsuario();
    } catch (err) {
      console.error('Error al obtener actividad de usuario:', err);
      this.router.navigate(['/login']);
    }
  }
}
