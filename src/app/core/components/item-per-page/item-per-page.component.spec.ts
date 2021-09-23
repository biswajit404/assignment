import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPerPageComponent } from './item-per-page.component';

describe('ItemPerPageComponent', () => {
  let component: ItemPerPageComponent;
  let fixture: ComponentFixture<ItemPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
