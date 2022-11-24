import { TestBed } from '@angular/core/testing';

import { QnaDetailService } from './qna-detail.service';

describe('QnaDetailService', () => {
  let service: QnaDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QnaDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
