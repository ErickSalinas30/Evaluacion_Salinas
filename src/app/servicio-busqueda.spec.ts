import { TestBed } from '@angular/core/testing';

import { ServicioBusqueda } from './servicio-busqueda';

describe('ServicioBusqueda', () => {
  let service: ServicioBusqueda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBusqueda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
