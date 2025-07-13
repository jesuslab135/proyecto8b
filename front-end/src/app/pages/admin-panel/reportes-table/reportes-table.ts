// src/app/pages/admin-panel/reportes-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchReportes,
  deleteReporte,
} from '../../../api/reportes-api';

@Component({
  selector: 'app-reportes-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes-table.html',
  styleUrls: ['./reportes-table.css'],
})
export class ReportesTableComponent implements OnInit {
  reportes: any[] = [];

  async ngOnInit() {
    await this.cargarReportes();
  }

  async cargarReportes() {
    try {
      this.reportes = await fetchReportes();
    } catch (err: any) {
      alert(err.message || 'Error al cargar reportes');
    }
  }

  editarReporte(id: number) {
    console.log('Editar reporte', id);
    // Implementar modal o navegación
  }

  async eliminarReporte(id: number) {
    if (!confirm('¿Eliminar este reporte?')) return;
    try {
      await deleteReporte(id);
      this.reportes = this.reportes.filter((r) => r.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar reporte');
    }
  }
}
