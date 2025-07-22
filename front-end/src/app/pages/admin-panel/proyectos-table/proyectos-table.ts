// src/app/pages/admin-panel/proyectos-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fetchProyectos, deleteProyecto } from '../../../api/proyectos-api';

@Component({
  selector: 'app-proyectos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos-table.html',
  styleUrls: ['./proyectos-table.css'],
})
export class ProyectosTableComponent implements OnInit {
  proyectos: any[] = [];

  async ngOnInit() {
    await this.cargarProyectos();
  }

  async cargarProyectos() {
    try {
      this.proyectos = await fetchProyectos();
    } catch (err: any) {
      alert(err.message || 'Error al cargar proyectos');
    }
  }

  editarProyecto(id: number) {
    console.log('Editar proyecto', id);
    // implementar navegación o modal de edición
  }

  async eliminarProyecto(id: number) {
    if (!confirm('¿Eliminar este proyecto?')) return;
    try {
      await deleteProyecto(id);
      this.proyectos = this.proyectos.filter(p => p.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar proyecto');
    }
  }
}
