import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQcComponent } from './print-qc.component';

describe('PrintQcComponent', () => {
  let component: PrintQcComponent;
  let fixture: ComponentFixture<PrintQcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintQcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
