import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchRespuestasHilo,
  deleteRespuestaHilo,
} from '../../../api/respuestas-hilo-api';

@Component({
  selector: 'app-respuestas-hilo-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './respuestas-hilo-table.html',
  styleUrls: ['./respuestas-hilo-table.css'],
})
export class RespuestasHiloTableComponent implements OnInit {
  respuestas: any[] = [];

  async ngOnInit() {
    await this.cargarRespuestas();
  }

  async cargarRespuestas() {
    try {
      this.respuestas = await fetchRespuestasHilo();
    } catch (err: any) {
      alert(err.message || 'Error al cargar respuestas');
    }
  }

  editarRespuesta(id: number) {
    console.log('Editar respuesta', id);
    // implementar modal o navegación futura
  }

  async eliminarRespuesta(id: number) {
    if (!confirm('¿Eliminar esta respuesta?')) return;
    try {
      await deleteRespuestaHilo(id);
      this.respuestas = this.respuestas.filter((r) => r.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar respuesta');
    }
  }
}
