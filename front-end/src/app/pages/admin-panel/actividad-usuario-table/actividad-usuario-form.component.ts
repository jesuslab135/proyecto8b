import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getActividadUsuarioById, updateActividadUsuario } from '../../../api/actividad-usuario-api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actividad-usuario-form.component.html',
  styleUrls: []
})
export class ActividadUsuarioFormComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      usuario_id: [null, Validators.required],
      tipo_actividad: ['', Validators.required],
      objeto_id: [null, Validators.required],
      contexto: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const data = await getActividadUsuarioById(this.id);
    this.form.patchValue(data);
  }

  async onSubmit() {
    try {
      await updateActividadUsuario(this.id, this.form.value);
      alert('Actividad actualizada correctamente');
      this.router.navigate(['/admin/actividad']);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar actividad');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/actividad']);
  }
}
