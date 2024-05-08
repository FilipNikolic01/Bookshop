import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { PublisherComponent } from './publisher/publisher.component';
import { GenreComponent } from './genre/genre.component';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthorDialogComponent } from './dialogs/author-dialog/author-dialog.component';
import { GenreDialogComponent } from './dialogs/genre-dialog/genre-dialog.component';
import { PublisherDialogComponent } from './dialogs/publisher-dialog/publisher-dialog.component';
import { BookDialogComponent } from './dialogs/book-dialog/book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule }  from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    PublisherComponent,
    GenreComponent,
    AuthorComponent,
    BookComponent,
    AuthorDialogComponent,
    GenreDialogComponent,
    PublisherDialogComponent,
    BookDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class AdminModule { }
