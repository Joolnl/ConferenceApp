import { TestBed } from '@angular/core/testing';

import { AppRoutesService } from './app-routes.service';

describe('AppRoutesService', () => {
  let service: AppRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
