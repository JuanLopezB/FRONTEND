import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEstudianteComponent } from './agregar-estudiante.component';

describe('AgregarEstudianteComponent', () => {
  let component: AgregarEstudianteComponent;
  let fixture: ComponentFixture<AgregarEstudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEstudianteComponent]
    });
    fixture = TestBed.createComponent(AgregarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
