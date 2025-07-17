import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createForo } from '../../../api/foros-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foros-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foros-create.component.html',
  styleUrls: []
})
export class ForosCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await createForo(this.form.value);
      alert('Foro creado correctamente');
      this.router.navigate(['/admin/foros']);
    } catch (err) {
      console.error('Error al crear foro:', err);
      alert('Error al crear foro');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/foros']);
  }
}
