import { TestBed } from '@angular/core/testing';

import { TableExportCopyService } from './table-export-copy.service';

describe('TableExportCopyService', () => {
  let service: TableExportCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableExportCopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
