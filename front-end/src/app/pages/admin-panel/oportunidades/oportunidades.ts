import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchOportunidades } from '../../../api/oportunidades-api';

@Component({
  selector: 'app-oportunidades',
  imports: [CommonModule],
  templateUrl: './oportunidades.html',
  styleUrl: './oportunidades.css'
})
export class Oportunidades {
  oportunidades: any[] = [];
  
    constructor(private router: Router) {}
  
    async ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }
  
      try {
        this.oportunidades = await fetchOportunidades(); // usa fetch con Authorization header
      } catch (err: any) {
        console.error('Error fetching oportunidades:', err);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    }
}
