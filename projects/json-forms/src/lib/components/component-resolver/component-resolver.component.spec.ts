import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentResolverComponent } from './component-resolver.component';

describe('ComponentResolverComponent', () => {
  let component: ComponentResolverComponent;
  let fixture: ComponentFixture<ComponentResolverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentResolverComponent]
    });
    fixture = TestBed.createComponent(ComponentResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
