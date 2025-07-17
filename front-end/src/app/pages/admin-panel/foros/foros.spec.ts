import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foros } from './foros';

describe('Foros', () => {
  let component: Foros;
  let fixture: ComponentFixture<Foros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
