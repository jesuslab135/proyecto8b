import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionesBloquesTable } from './versiones-bloques-table';

describe('VersionesBloquesTable', () => {
  let component: VersionesBloquesTable;
  let fixture: ComponentFixture<VersionesBloquesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionesBloquesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionesBloquesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
