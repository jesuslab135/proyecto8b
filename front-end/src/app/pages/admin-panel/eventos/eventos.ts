import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchEventos } from '../../../api/eventos-api';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class Eventos {
  eventos: any[] = [];
    
      constructor(private router: Router) {}
    
      async ngOnInit() {
        const token = localStorage.getItem('token');
        if(!token) {
          this.router.navigate(['/login']);
          return;
        }
    
        try {
          this.eventos = await fetchEventos();
        } catch (e) {
          console.error('Error al obtener eventos: ', e);
          this.router.navigate(['/login']);
        }
      }
}
