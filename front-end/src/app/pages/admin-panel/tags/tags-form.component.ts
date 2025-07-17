import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getTagById, updateTag } from '../../../api/tags-api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tags-form.component.html',
  styleUrls: []
})
export class TagsFormComponent implements OnInit {
  form: FormGroup;
  id!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam);
      this.loading = true;
      try {
        const tag = await getTagById(this.id);
        this.form.patchValue({
          nombre: tag.nombre
        });
      } catch (err) {
        console.error('Error al cargar tag:', err);
        alert('No se pudo cargar el tag');
        this.router.navigate(['/admin/tags']);
      } finally {
        this.loading = false;
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await updateTag(this.id, this.form.value);
      alert('Tag actualizado correctamente');
      this.router.navigate(['/admin/tags']);
    } catch (err) {
      console.error('Error al actualizar tag:', err);
      alert('Error al actualizar tag');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/tags']);
  }
}
