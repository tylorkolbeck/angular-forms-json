import { TestBed } from '@angular/core/testing';

import { JsonFormsService } from './json-forms.service';

describe('JsonFormsService', () => {
  let service: JsonFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
