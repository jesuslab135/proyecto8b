import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesProyectoTable } from './roles-proyecto-table';

describe('RolesProyectoTable', () => {
  let component: RolesProyectoTable;
  let fixture: ComponentFixture<RolesProyectoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesProyectoTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesProyectoTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
