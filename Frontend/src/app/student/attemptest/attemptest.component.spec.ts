import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptestComponent } from './attemptest.component';

describe('AttemptestComponent', () => {
  let component: AttemptestComponent;
  let fixture: ComponentFixture<AttemptestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttemptestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttemptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
