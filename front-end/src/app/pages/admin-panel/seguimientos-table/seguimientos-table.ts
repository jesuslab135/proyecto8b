// src/app/pages/admin-panel/seguimientos-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  fetchSeguimientos,
  deleteSeguimiento,
} from '../../../api/seguimientos-api';

@Component({
  selector: 'app-seguimientos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguimientos-table.html',
  styleUrls: ['./seguimientos-table.css'],
})
export class SeguimientosTableComponent implements OnInit {
  seguimientos: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    await this.cargarSeguimientos();
  }

  async cargarSeguimientos() {
    try {
      this.seguimientos = await fetchSeguimientos();
      console.log('Seguimientos:', this.seguimientos);
    } catch (err) {
      console.error('Error al obtener seguimientos:', err);
      this.router.navigate(['/login']);
    }
  }

  editarSeguimiento(id: number) {
    console.log('Editar seguimiento', id);
    // aquí podrías abrir un modal o navegar a un formulario
  }

  async eliminarSeguimiento(id: number) {
    if (!confirm('¿Eliminar este seguimiento?')) return;
    try {
      await deleteSeguimiento(id);
      this.seguimientos = this.seguimientos.filter((s) => s.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar seguimiento');
    }
  }
}
