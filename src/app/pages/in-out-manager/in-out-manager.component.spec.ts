import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutManagerComponent } from './in-out-manager.component';

describe('InOutManagerComponent', () => {
  let component: InOutManagerComponent;
  let fixture: ComponentFixture<InOutManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOutManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
