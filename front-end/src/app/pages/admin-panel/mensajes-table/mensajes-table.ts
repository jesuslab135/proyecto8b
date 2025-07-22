import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchMensajes } from '../../../api/mensajes-api';

@Component({
  selector: 'app-mensajes-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes-table.html',
  styleUrls: ['./mensajes-table.css']
})
export class MensajesTableComponent implements OnInit {
  mensajes: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.mensajes = await fetchMensajes();
    } catch (err) {
      console.error('Error al obtener mensajes:', err);
      this.router.navigate(['/login']);
    }
  }
}
