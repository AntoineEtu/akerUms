import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFilmPage } from './details-film.page';

describe('DetailsFilmPage', () => {
  let component: DetailsFilmPage;
  let fixture: ComponentFixture<DetailsFilmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFilmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFilmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
