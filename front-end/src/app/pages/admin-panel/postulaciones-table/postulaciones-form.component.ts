import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getPostulacionById, updatePostulacion } from '../../../api/postulaciones-api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postulaciones-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './postulaciones-form.component.html',
  styleUrls: []
})
export class PostulacionesFormComponent implements OnInit {
  form: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      usuario_id: [null, Validators.required],
      oportunidad_id: [null, Validators.required],
      mensaje: ['', Validators.required],
      estado: ['']
    });
  }

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const data = await getPostulacionById(this.id);
    this.form.patchValue(data);
  }

  async onSubmit() {
    try {
      await updatePostulacion(this.id, this.form.value);
      alert('Postulación actualizada correctamente');
      this.router.navigate(['/admin/postulaciones']);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar postulación');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/postulaciones']);
  }
}
