import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IGenre } from 'src/app/shared/models/genre';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../dialogs/genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  dataSource!: MatTableDataSource<IGenre>;
  displayedColumns = ['id', 'name', 'description', 'actions'];

  subscription!: Subscription;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.subscription = this.adminService.getGenres().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.log(error)
    })
  }

  openDialog(flag: number, id?: number, name?: string, description?: string) {
    const dialogRef = this.dialog.open(GenreDialogComponent, {data:{id, name, description}});

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(results => {
        this.getGenres();
    })
  }

  applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

}
