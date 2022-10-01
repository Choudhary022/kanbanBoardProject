import { TestBed } from '@angular/core/testing';

import { UnSavedDatsGuardGuard } from './un-saved-dats-guard.guard';

describe('UnSavedDatsGuardGuard', () => {
  let guard: UnSavedDatsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnSavedDatsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
