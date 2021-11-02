import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQcComponent } from './add-qc.component';

describe('AddQcComponent', () => {
  let component: AddQcComponent;
  let fixture: ComponentFixture<AddQcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
