import { TestBed } from '@angular/core/testing';

import { GetUserCalendarService } from './get-user-calendar.service';

describe('GetUserCalendarService', () => {
  let service: GetUserCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
