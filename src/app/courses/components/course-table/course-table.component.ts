import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableDatasource } from './table-datasource';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CourseTableComponent implements AfterViewInit, OnInit {
  @Input() courses: Course[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Course>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource: TableDatasource;
  expandedElement: any;
  displayedColumns = ['name', 'section'];
  isTableExpanded: boolean;
  isExpansionDetailRow = (i: number, row: object) =>
    row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.dataSource = new TableDatasource();
    this.dataSource.data = this.courses;
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.dataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    });
  }
}
