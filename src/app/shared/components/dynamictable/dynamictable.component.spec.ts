import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamictableComponent } from './dynamictable.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DynamictableComponent', () => {
  let component: DynamictableComponent;
  let fixture: ComponentFixture<DynamictableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamictableComponent],
      imports: [MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamictableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call on ngOnChanges', () => {
    component.record = [{}];
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeDefined();
  });
  it('should call on onClick', () => {
    let data = <any>{
      id: 27,
      firstname: "Priya",
      lastname: "Dharshuu",
      email: "priya01@gmail.com",
    };
    let index: any = 0;
    component.actionArray = [{ name: 'sds' }];
    component.onClick(data, index);
    expect(component.onClick).toBeDefined();
  });
  it('should call on applyFilter', () => {
    let data = <any>{ target: <any>{ value: 'asd' } };
    component.datasource = { filter: 's' };
    component.applyFilter(data);
    expect(component.applyFilter).toBeDefined();
  });
});
