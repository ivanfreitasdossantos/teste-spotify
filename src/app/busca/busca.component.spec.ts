import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaComponent } from './busca.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

describe('BuscaComponent', () => {
  let component: BuscaComponent;
  let fixture: ComponentFixture<BuscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, LocalStorageService, Router],
      declarations: [ BuscaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
