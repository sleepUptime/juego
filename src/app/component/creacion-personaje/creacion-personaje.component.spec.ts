import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPersonajeComponent } from './creacion-personaje.component';

describe('CreacionPersonajeComponent', () => {
  let component: CreacionPersonajeComponent;
  let fixture: ComponentFixture<CreacionPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
