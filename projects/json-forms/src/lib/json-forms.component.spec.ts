import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormsComponent } from './json-forms.component';

describe('JsonFormsComponent', () => {
  let component: JsonFormsComponent;
  let fixture: ComponentFixture<JsonFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonFormsComponent]
    });
    fixture = TestBed.createComponent(JsonFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
