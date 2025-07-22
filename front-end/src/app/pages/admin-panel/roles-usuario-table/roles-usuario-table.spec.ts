import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUsuarioTable } from './roles-usuario-table';

describe('RolesUsuarioTable', () => {
  let component: RolesUsuarioTable;
  let fixture: ComponentFixture<RolesUsuarioTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesUsuarioTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesUsuarioTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
