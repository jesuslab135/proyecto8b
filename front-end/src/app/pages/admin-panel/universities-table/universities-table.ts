import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchUniversidades } from '../../../api/universidades-api'; // ajusta si la ruta cambia

@Component({
  selector: 'app-universities-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './universities-table.html',
  styleUrls: ['./universities-table.css']
})
export class UniversitiesTableComponent implements OnInit {
  universities: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.universities = await fetchUniversidades();
    } catch (err) {
      console.error('Error fetching universities:', err);
      this.router.navigate(['/login']);
    }
  }
}
