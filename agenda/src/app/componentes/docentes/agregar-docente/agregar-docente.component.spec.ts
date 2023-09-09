import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDocenteComponent } from './agregar-docente.component';

describe('AgregarDocenteComponent', () => {
  let component: AgregarDocenteComponent;
  let fixture: ComponentFixture<AgregarDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDocenteComponent]
    });
    fixture = TestBed.createComponent(AgregarDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
