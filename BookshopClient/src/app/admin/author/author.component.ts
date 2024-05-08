import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IAuthor } from 'src/app/shared/models/author';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from '../dialogs/author-dialog/author-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  dataSource!: MatTableDataSource<IAuthor>;
  displayedColumns = ['id', 'fullName', 'profilePictureURL', 'biography', 'actions'];

  subscription!: Subscription;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.subscription = this.adminService.getAuthors().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.log(error)
    })
  }

  openDialog(flag: number, id?: number, fullName?: string, profilePictureURL?: string, biography?: string) {
    const dialogRef = this.dialog.open(AuthorDialogComponent, {data:{id, fullName, profilePictureURL, biography}});

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(results => {
        this.getAuthors();
    })
  }

  applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

}
