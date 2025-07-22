import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createUniversidad } from '../../../api/universidades-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-universities-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './universities-create.component.html',
  styleUrls: [] // ❌ no necesitas styleUrls si usas shared-form.css global
})
export class UniversitiesCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      dominio_correo: ['', Validators.required],
      logo_url: ['']
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await createUniversidad(this.form.value);
      alert('Universidad creada correctamente');
      this.router.navigate(['/admin/universities']);
    } catch (err) {
      console.error('Error al crear universidad:', err);
      alert('Error al crear universidad');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/universities']);
  }
}
