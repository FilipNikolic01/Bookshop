import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IPublisher } from 'src/app/shared/models/publisher';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PublisherDialogComponent } from '../dialogs/publisher-dialog/publisher-dialog.component';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  dataSource!: MatTableDataSource<IPublisher>;
  displayedColumns = ['id', 'name', 'logoURL', 'description', 'actions'];

  subscription!: Subscription;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPublishers();
  }

  getPublishers() {
    this.subscription = this.adminService.getPublishers().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.log(error)
    })
  }

  openDialog(flag: number, id?: number, name?: string, logoURL?: string, description?: string) {
    const dialogRef = this.dialog.open(PublisherDialogComponent, {data:{id, name, logoURL, description}});

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(results => {
        this.getPublishers();
    })
  }

  applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

}
