import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieListPage } from './serie-list.page';

describe('SerieListPage', () => {
  let component: SerieListPage;
  let fixture: ComponentFixture<SerieListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
