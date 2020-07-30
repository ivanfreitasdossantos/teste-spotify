import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' Pode guardar dados no LocalStorage', () => {
    const dado = "string teste"
    service.setData("teste","string teste");
    expect(service.getData("teste")).toBe("string teste");
  });


});
