// src/app/pages/admin-panel/tokens-iniciales-acceso-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fetchTokensInicialesAcceso,
  deleteTokenInicialAcceso,
} from '../../../api/tokens-iniciales-acceso-api';

@Component({
  selector: 'app-tokens-iniciales-acceso-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tokens-iniciales-acceso-table.html',
  styleUrls: ['./tokens-iniciales-acceso-table.css'],
})
export class TokensInicialesAccesoTableComponent implements OnInit {
  tokens: any[] = [];

  async ngOnInit() {
    await this.cargarTokens();
  }

  async cargarTokens() {
    try {
      this.tokens = await fetchTokensInicialesAcceso();
    } catch (err: any) {
      alert(err.message || 'Error al cargar tokens');
    }
  }

  editarToken(id: number) {
    console.log('Editar token', id);
    // puedes integrar un modal aquí
  }

  async eliminarToken(id: number) {
    if (!confirm('¿Eliminar este token?')) return;
    try {
      await deleteTokenInicialAcceso(id);
      this.tokens = this.tokens.filter((t) => t.id !== id);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar token');
    }
  }
}
