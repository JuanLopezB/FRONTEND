import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAcudienteComponent } from './agregar-acudiente.component';

describe('AgregarAcudienteComponent', () => {
  let component: AgregarAcudienteComponent;
  let fixture: ComponentFixture<AgregarAcudienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAcudienteComponent]
    });
    fixture = TestBed.createComponent(AgregarAcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
