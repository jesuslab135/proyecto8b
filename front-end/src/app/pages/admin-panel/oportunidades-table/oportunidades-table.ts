import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchOportunidades } from '../../../api/oportunidades-api';

@Component({
  selector: 'app-oportunidades-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oportunidades-table.html',
  styleUrls: ['./oportunidades-table.css']
})
export class OportunidadesTableComponent implements OnInit {
  oportunidades: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.oportunidades = await fetchOportunidades();
    } catch (err) {
      console.error('Error al obtener oportunidades:', err);
      this.router.navigate(['/login']);
    }
  }
}
