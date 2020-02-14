import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgInsteadOfHtmlComponent } from './svg-instead-of-html.component';

describe('SvgInsteadOfHtmlComponent', () => {
  let component: SvgInsteadOfHtmlComponent;
  let fixture: ComponentFixture<SvgInsteadOfHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgInsteadOfHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgInsteadOfHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
