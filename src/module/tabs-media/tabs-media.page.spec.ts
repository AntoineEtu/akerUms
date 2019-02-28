import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMediaPage } from './tabs-media.page';

describe('TabsMediaPage', () => {
  let component: TabsMediaPage;
  let fixture: ComponentFixture<TabsMediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsMediaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
