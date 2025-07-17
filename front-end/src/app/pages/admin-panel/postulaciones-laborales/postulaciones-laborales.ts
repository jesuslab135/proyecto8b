import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchPostulacionesLaborales } from '../../../api/postulaciones-laborales-api';

@Component({
  selector: 'app-postulaciones-laborales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postulaciones-laborales.html',
  styleUrl: './postulaciones-laborales.css'
})
export class PostulacionesLaborales {
  postulacionesLaborales: any[] = [];
    
      constructor(private router: Router) {}
    
      async ngOnInit() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.router.navigate(['/login']);
          return;
        }
    
        try {
          this.postulacionesLaborales = await fetchPostulacionesLaborales(); // usa fetch con Authorization header
        } catch (err: any) {
          console.error('Error fetching postulaciones laborales:', err);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
}
