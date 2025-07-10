import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-universities-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './universities-table.html',
  styleUrls: ['./universities-table.css']
})
export class UniversitiesTableComponent {
  universities = [
    { id: 1, name: 'UniON University', domain: 'union.edu', logo: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Tech Institute', domain: 'tech.edu', logo: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Global College', domain: 'global.edu', logo: 'https://via.placeholder.com/40' },
  ];
}
