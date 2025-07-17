import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchForos } from '../../../api/foros-api';

@Component({
  selector: 'app-foros',
  imports: [CommonModule],
  templateUrl: './foros.html',
  styleUrl: './foros.css'
})
export class Foros {
  foros: any[] = [];
      
        constructor(private router: Router) {}
      
        async ngOnInit() {
          const token = localStorage.getItem('token');
          if(!token) {
            this.router.navigate(['/login']);
            return;
          }
      
          try {
            this.foros = await fetchForos();
          } catch (e) {
            console.error('Error al obtener foros: ', e);
            this.router.navigate(['/login']);
          }
        }
}
