import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchOfertasLaborales } from '../../../api/ofertas-laborales-api';

@Component({
  selector: 'app-ofertas-laborales',
  imports: [CommonModule],
  templateUrl: './ofertas-laborales.html',
  styleUrl: './ofertas-laborales.css'
})
export class OfertasLaborales {
  ofertasLaborales: any[] = [];
          
            constructor(private router: Router) {}
          
            async ngOnInit() {
              const token = localStorage.getItem('token');
              if(!token) {
                this.router.navigate(['/login']);
                return;
              }
          
              try {
                this.ofertasLaborales = await fetchOfertasLaborales();
              } catch (e) {
                console.error('Error al obtener ofertas laborales: ', e);
                this.router.navigate(['/login']);
              }
            }
}
