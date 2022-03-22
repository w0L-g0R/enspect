import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageButtonComponent } from './usage-button.component';

describe('UsageButtonComponent', () => {
  let component: UsageButtonComponent;
  let fixture: ComponentFixture<UsageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
