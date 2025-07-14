import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensInicialesAccesoTable } from './tokens-iniciales-acceso-table';

describe('TokensInicialesAccesoTable', () => {
  let component: TokensInicialesAccesoTable;
  let fixture: ComponentFixture<TokensInicialesAccesoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokensInicialesAccesoTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokensInicialesAccesoTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
