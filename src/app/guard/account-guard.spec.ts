import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { accountGuard } from './account-guard';

describe('accountGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => accountGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
