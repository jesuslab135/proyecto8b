import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchHilos } from '../../../api/hilos-api';

@Component({
  selector: 'app-hilos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hilos-table.html',
  styleUrls: ['./hilos-table.css']
})
export class HilosTableComponent implements OnInit {
  hilos: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.hilos = await fetchHilos();
    } catch (err) {
      console.error('Error al obtener hilos:', err);
      this.router.navigate(['/login']);
    }
  }
}
