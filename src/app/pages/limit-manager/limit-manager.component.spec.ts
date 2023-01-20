import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitManagerComponent } from './limit-manager.component';

describe('LimitManagerComponent', () => {
  let component: LimitManagerComponent;
  let fixture: ComponentFixture<LimitManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
