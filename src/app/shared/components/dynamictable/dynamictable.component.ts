import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamictable',
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.scss']
})
export class DynamictableComponent {
  constructor() { }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Input() column!: any[];
  @Input() record!: any[];
  @Input() actionArray!: any[];
  @Input() displayedColumns!: any[];
  @Output() actionEmit = new EventEmitter<any>();
  @Input() displayEditBox!: any;
  datasource!: any;
  ngOnChanges() {
    if (this.paginator && this.record) {
      this.datasource = new MatTableDataSource<any>(this.record);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }
  }
  onClick(data: any, index: number) {
    if (this.actionArray && this.actionArray.length) {
      let datas: any = { element: data, "clickFun": this.actionArray[index].name, "functionName": this.actionArray[index].funcName };
      this.actionEmit.emit(datas);
    }
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
