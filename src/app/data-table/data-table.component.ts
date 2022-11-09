import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StoreService } from '../shared/store.service';
import { DataTableItem } from './data-table-datasource';
import { Subscription } from 'rxjs';
//https://material.angular.io/components/paginator/examples
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
  constructor(private storeservice: StoreService) {
    //this.dataSource = new DataTableDataSource();
    //this.dataSource = Sensorendata();
    //this.dataSource = storeservice.sensorenDaten;
  }
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;
  //dataSource: DataTableDataSource;
  //dataSource: any;
  //https://stackblitz.com/edit/angular-mat-table-pagination-example?file=src%2Fapp%2Fsimple-mat-table%2Fsimple-mat-table.component.ts
  dataSource = new MatTableDataSource(this.storeservice.sensorenDaten);
  dataSourceWithPageSize = new MatTableDataSource(this.storeservice.sensorenDaten);
 
  private storeServiceSubscription?: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'sensor', 'temperature', 'humidity'];

  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.storeservice.sensorenDaten;
    this.storeServiceSubscription = this.storeservice.dataHasUpdated.subscribe(() => {
      this.table.dataSource = this.storeservice.sensorenDaten;
    })
  }

  ngOnDestroy(): void {
    this.storeServiceSubscription?.unsubscribe();
  }
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
