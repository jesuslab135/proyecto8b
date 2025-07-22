import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionesTable } from './postulaciones-table';

describe('PostulacionesTable', () => {
  let component: PostulacionesTable;
  let fixture: ComponentFixture<PostulacionesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulacionesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulacionesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
