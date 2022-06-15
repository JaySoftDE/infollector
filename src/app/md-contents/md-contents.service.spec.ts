import { TestBed } from '@angular/core/testing';

import { MdContentsService } from './md-contents.service';

describe('MdContentsService', () => {
  let service: MdContentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdContentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
