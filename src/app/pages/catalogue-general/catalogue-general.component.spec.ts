import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueGeneralComponent } from './catalogue-general.component';

describe('CatalogueGeneralComponent', () => {
  let component: CatalogueGeneralComponent;
  let fixture: ComponentFixture<CatalogueGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
