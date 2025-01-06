import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UselessPageComponent } from "./useless-page.component";

describe("UselessPageComponent", () => {
  let component: UselessPageComponent;
  let fixture: ComponentFixture<UselessPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UselessPageComponent],
    });
    fixture = TestBed.createComponent(UselessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
