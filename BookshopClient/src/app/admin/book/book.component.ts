import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { IBook } from 'src/app/shared/models/book';
import { IAuthor } from 'src/app/shared/models/author';
import { IGenre } from 'src/app/shared/models/genre';
import { BookDialogComponent } from '../dialogs/book-dialog/book-dialog.component';
import { IPublisher } from 'src/app/shared/models/publisher';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  dataSource!: MatTableDataSource<IBook>;
  displayedColumns = ['id', 'isbn', 'title', 'description', 'pictureURL', 'edition', 'publicationDate', 'language', 'format', 'pages', 'price', 'quantityInStock', 'publisher', 'authors', 'genres', 'actions']

  subscription!: Subscription

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.adminService.getBooks().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response.data);
        console.log(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.log(error)
    })
  }

  openDialog(flag: number, id?: number, isbn?: string, title?: string, description?: string,
     pictureURL?: string, edition?: number, publicationDate?: Date, language?: string, format?: string,
     pages?: number, price?: number, quantityInStock?: number, publisher?: IPublisher,
     authors?: IAuthor[], genres?: IGenre[]) {

      const dialogRef = this.dialog.open(BookDialogComponent, {data:{id, isbn, title, description, pictureURL,edition, publicationDate, language, format, pages, price, quantityInStock, publisher, authors, genres}})

      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(
        () => {
          this.getBooks();
        }
      )
     }

  applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }
}
