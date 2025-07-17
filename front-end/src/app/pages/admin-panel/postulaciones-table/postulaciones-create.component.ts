import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createPostulacion } from '../../../api/postulaciones-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postulaciones-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './postulaciones-create.component.html',
  styleUrls: []
})
export class PostulacionesCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group({
      usuario_id: [null, Validators.required],
      oportunidad_id: [null, Validators.required],
      mensaje: ['', Validators.required],
      estado: ['pendiente']
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await createPostulacion(this.form.value);
      alert('Postulación creada correctamente');
      this.router.navigate(['/admin/postulaciones']);
    } catch (err) {
      console.error(err);
      alert('Error al crear postulación');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/postulaciones']);
  }
}
