import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesBloquesTable } from './relaciones-bloques-table';

describe('RelacionesBloquesTable', () => {
  let component: RelacionesBloquesTable;
  let fixture: ComponentFixture<RelacionesBloquesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacionesBloquesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacionesBloquesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
