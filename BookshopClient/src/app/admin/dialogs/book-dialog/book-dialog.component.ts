import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthor } from 'src/app/shared/models/author';
import { IGenre } from 'src/app/shared/models/genre';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBook } from 'src/app/shared/models/book';
import { IPublisher } from 'src/app/shared/models/publisher';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {
  flag!: number;
  authors: IAuthor[] = [];
  genres: IGenre[] = [];
  publishers: IPublisher[] = [];
  authorIds: number[] = [];
  genreIds: number[] = [];

  constructor(public snackBar: MatSnackBar,
              public adminService: AdminService,
              @Inject(MAT_DIALOG_DATA) public book: IBook,
              public dialogRef: MatDialogRef<IBook>) {}
        
  ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
    this.getPublishers();
  }

  getAuthors() {
    this.adminService.getAuthors().subscribe({
      next: response => this.authors = response,
      error: error => console.log(error)
    });
  }

  getGenres() {
    this.adminService.getGenres().subscribe({
      next: response => this.genres = response,
      error: error => console.log(error)
    });
  }

  getPublishers() {
    this.adminService.getPublishers().subscribe({
      next: response => this.publishers = response,
      error: error => console.log(error)
    })
  }

  addBook() {
    this.fillIdArrays();

    this.adminService.addBook({
      id: this.book.id,
      isbn: this.book.isbn,
      title: this.book.title,
      description: this.book.description,
      pictureURL: this.book.pictureURL,
      edition: this.book.edition,
      publicationDate: this.book.publicationDate,
      language: this.book.language,
      format: this.book.format,
      pages: this.book.pages,
      price: this.book.price,
      quantityInStock: this.book.quantityInStock,
      publisherId: this.book.publisher.id,
      authorIds: this.authorIds,
      genreIds: this.genreIds
    }).subscribe(
      () => {
        this.snackBar.open('Knjiga sa naslovom: ' + this.book.title + ' je uspešno dodata!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
    this.clearIdArrays();
  }

  updateBook() {
    this.fillIdArrays();

    this.adminService.updateBook({
      id: this.book.id,
      isbn: this.book.isbn,
      title: this.book.title,
      description: this.book.description,
      pictureURL: this.book.pictureURL,
      edition: this.book.edition,
      publicationDate: this.book.publicationDate,
      language: this.book.language,
      format: this.book.format,
      pages: this.book.pages,
      price: this.book.price,
      quantityInStock: this.book.quantityInStock,
      publisherId: this.book.publisher.id,
      authorIds: this.authorIds,
      genreIds: this.genreIds
    }).subscribe(
      () => {
        this.snackBar.open('Knjiga sa ID-jem: ' + this.book.id + ' je uspešno izmenjena!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
    this.clearIdArrays();
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene', 'Ok', {duration:3000})
  }

  fillIdArrays() {
    this.book.authors.forEach((author) => {
      this.authorIds.push(author.id)
    })

    this.book.genres.forEach((genre) => {
      this.genreIds.push(genre.id)
    })
  }

  clearIdArrays() {
    this.authorIds = [];
    this.genreIds = []
  }

}
