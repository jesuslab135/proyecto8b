import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchMensajes } from '../../../api/mensajes-api';

@Component({
  selector: 'app-mensajes',
  imports: [CommonModule],
  templateUrl: './mensajes.html',
  styleUrl: './mensajes.css'
})
export class Mensajes {
  mensajes: any[] = [];
        
          constructor(private router: Router) {}
        
          async ngOnInit() {
            const token = localStorage.getItem('token');
            if(!token) {
              this.router.navigate(['/login']);
              return;
            }
        
            try {
              this.mensajes = await fetchMensajes();
            } catch (e) {
              console.error('Error al obtener foros: ', e);
              this.router.navigate(['/login']);
            }
          }
}
