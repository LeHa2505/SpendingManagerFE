import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueManagerComponent } from './catalogue-manager.component';

describe('CatalogueManagerComponent', () => {
  let component: CatalogueManagerComponent;
  let fixture: ComponentFixture<CatalogueManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
