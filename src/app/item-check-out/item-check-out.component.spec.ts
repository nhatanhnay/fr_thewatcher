import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCheckOutComponent } from './item-check-out.component';

describe('ItemCheckOutComponent', () => {
  let component: ItemCheckOutComponent;
  let fixture: ComponentFixture<ItemCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCheckOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
