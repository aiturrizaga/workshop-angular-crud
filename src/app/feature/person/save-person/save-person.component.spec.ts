import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePersonComponent } from './save-person.component';

describe('SavePersonComponent', () => {
  let component: SavePersonComponent;
  let fixture: ComponentFixture<SavePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
