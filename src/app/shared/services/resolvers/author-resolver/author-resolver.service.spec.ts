import { TestBed } from '@angular/core/testing';

import { AuthorResolverService } from './author-resolver.service';

describe('AuthorResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorResolverService = TestBed.get(AuthorResolverService);
    expect(service).toBeTruthy();
  });
});
