import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGrupoComponent } from './agregar-grupo.component';

describe('AgregarGrupoComponent', () => {
  let component: AgregarGrupoComponent;
  let fixture: ComponentFixture<AgregarGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarGrupoComponent]
    });
    fixture = TestBed.createComponent(AgregarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
