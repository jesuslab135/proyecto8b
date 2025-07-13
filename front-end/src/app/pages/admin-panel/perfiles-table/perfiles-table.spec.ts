import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesTable } from './perfiles-table';

describe('PerfilesTable', () => {
  let component: PerfilesTable;
  let fixture: ComponentFixture<PerfilesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
