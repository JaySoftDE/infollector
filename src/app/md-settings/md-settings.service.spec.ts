import { TestBed } from '@angular/core/testing';

import { MdSettingsService } from './md-settings.service';

describe('MdSettingsService', () => {
  let service: MdSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
