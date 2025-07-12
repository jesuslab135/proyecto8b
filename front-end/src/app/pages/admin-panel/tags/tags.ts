import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fetchTags } from '../../../api/tags-api';

@Component({
  selector: 'app-tags-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags.html',
  styleUrls: ['./tags.css']
})
export class TagsTableComponent implements OnInit {
  tags: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.tags = await fetchTags();
    } catch (err) {
      console.error('Error al obtener tags:', err);
      this.router.navigate(['/login']);
    }
  }
}
