import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createActividadUsuario } from '../../../api/actividad-usuario-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-usuario-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actividad-usuario-create.component.html',
  styleUrls: []
})
export class ActividadUsuarioCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      usuario_id: [null, Validators.required],
      tipo_actividad: ['', Validators.required],
      objeto_id: [null, Validators.required],
      contexto: ['', Validators.required]
    });
  }

  async onSubmit() {
    try {
      await createActividadUsuario(this.form.value);
      alert('Actividad creada correctamente');
      this.router.navigate(['/admin/actividad']);
    } catch (err) {
      console.error(err);
      alert('Error al crear actividad');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/actividad']);
  }
}
