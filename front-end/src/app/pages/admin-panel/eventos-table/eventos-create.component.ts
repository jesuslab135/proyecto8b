import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createEvento } from '../../../api/eventos-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eventos-create.component.html',
  styleUrls: []
})
export class EventosCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      tipo: ['', Validators.required],
      creador_id: [null, Validators.required],
      universidad_id: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_fin: [null, Validators.required],
      enlace_acceso: ['']
    });
  }

  async onSubmit() {
    const {id, ...formValues} = this.form.value;

    const input = {
  ...formValues,
  fecha_inicio: new Date(formValues.fecha_inicio),
fecha_fin: new Date(formValues.fecha_fin),

};


    console.log('🚀 Enviando input:', input);
    console.log('🧪 fecha_inicio es Date:', input.fecha_inicio instanceof Date);
    console.log('🧪 fecha_fin es Date:', input.fecha_fin instanceof Date);

    try {
      await createEvento(input);
      this.router.navigate(['/admin/eventos']);
    } catch (err) {
      console.error('Error al crear evento:', err);
      alert('Ocurrió un error al crear el evento');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/eventos']);
  }
}