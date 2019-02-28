import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListPage } from './media-list.page';

describe('MediaListPage', () => {
  let component: MediaListPage;
  let fixture: ComponentFixture<MediaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
