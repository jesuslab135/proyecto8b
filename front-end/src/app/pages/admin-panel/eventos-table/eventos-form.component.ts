import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getEventoById, updateEvento } from '../../../api/eventos-api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eventos-form.component.html',
  styleUrls: []
})
export class EventosFormComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
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

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const evento = await getEventoById(this.id);

    if (evento.fecha_inicio) {
      evento.fecha_inicio = new Date(evento.fecha_inicio);
    }
    if (evento.fecha_fin) {
      evento.fecha_fin = new Date(evento.fecha_fin);
    }

    this.form.patchValue(evento);
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
      await updateEvento(this.id, input);
      this.router.navigate(['/admin/eventos']);
    } catch (err) {
      console.error('Error al actualizar evento:', err);
      alert('Ocurrió un error al actualizar el evento');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/eventos']);
  }
}
