import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { PublisherComponent } from './publisher/publisher.component';
import { GenreComponent } from './genre/genre.component';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { MatTableModule } from '@angular/mater'



@NgModule({
  declarations: [
    PublisherComponent,
    GenreComponent,
    AuthorComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
