import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportListModalComponent } from './export-list-modal.component';

describe('ExportListModalComponent', () => {
  let component: ExportListModalComponent;
  let fixture: ComponentFixture<ExportListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
