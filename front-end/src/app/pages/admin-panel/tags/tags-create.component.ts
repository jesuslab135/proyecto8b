import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createTag } from '../../../api/tags-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tags-create.component.html',
  styleUrls: []
})
export class TagsCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await createTag(this.form.value);
      alert('Tag creado correctamente');
      this.router.navigate(['/admin/tags']);
    } catch (err) {
      console.error('Error al crear tag:', err);
      alert('Error al crear tag');
    }
  }

  onCancel() {
    this.router.navigate(['/admin/tags']);
  }
}
