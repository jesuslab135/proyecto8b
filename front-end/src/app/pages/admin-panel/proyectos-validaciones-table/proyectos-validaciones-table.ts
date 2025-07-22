// src/app/pages/admin-panel/proyectos-validaciones-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchValidaciones,
  deleteValidacion,
} from '../../../api/proyecto-validacion-api';

@Component({
  selector: 'app-proyectos-validaciones-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos-validaciones-table.html',
  styleUrls: ['./proyectos-validaciones-table.css'],
})
export class ProyectosValidacionesTableComponent implements OnInit {
  validaciones: any[] = [];

  async ngOnInit() {
    await this.cargarValidaciones();
  }

  async cargarValidaciones() {
    try {
      this.validaciones = await fetchValidaciones();
    } catch (err: any) {
      alert(err.message || 'Error al cargar validaciones');
    }
  }

  editarValidacion(id: number) {
    console.log('Editar validación', id);
    // implementar modal o navegación
  }

  async eliminarValidacion(id: number) {
    if (!confirm('¿Eliminar esta validación?')) return;
    try {
      await deleteValidacion(id);
      this.validaciones = this.validaciones.filter((v) => v.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar validación');
    }
  }
}
