import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchForos } from '../../../api/foros-api';

@Component({
  selector: 'app-foros-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foros-table.html',
  styleUrls: ['./foros-table.css']
})
export class ForosTableComponent implements OnInit {
  foros: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.foros = await fetchForos();
    } catch (err) {
      console.error('Error al obtener foros:', err);
      this.router.navigate(['/login']);
    }
  }
}
