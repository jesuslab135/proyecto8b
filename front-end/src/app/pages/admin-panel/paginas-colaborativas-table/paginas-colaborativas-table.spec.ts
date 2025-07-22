import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasColaborativasTable } from './paginas-colaborativas-table';

describe('PaginasColaborativasTable', () => {
  let component: PaginasColaborativasTable;
  let fixture: ComponentFixture<PaginasColaborativasTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginasColaborativasTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginasColaborativasTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
