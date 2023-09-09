import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAnotacionComponent } from './agregar-anotacion.component';

describe('AgregarAnotacionComponent', () => {
  let component: AgregarAnotacionComponent;
  let fixture: ComponentFixture<AgregarAnotacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAnotacionComponent]
    });
    fixture = TestBed.createComponent(AgregarAnotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
