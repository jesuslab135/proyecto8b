// src/app/pages/admin-panel/eventos-table.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchEventos } from '../../../api/eventos-api';

@Component({
  selector: 'app-eventos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos-table.html',
  styleUrls: ['./eventos-table.css']
})
export class EventosTableComponent implements OnInit {
  eventos: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.eventos = await fetchEventos();
    } catch (err) {
      console.error('Error al obtener eventos:', err);
      this.router.navigate(['/login']);
    }
  }
}
