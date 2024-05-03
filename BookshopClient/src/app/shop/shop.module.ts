import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { BookComponent } from './book/book.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { GenreDetailsComponent } from './genres/genre-details/genre-details.component';
import { PublisherDetailsComponent } from './publishers/publisher-details/publisher-details.component';

@NgModule({
  declarations: [
    ShopComponent,
    BookComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    GenreDetailsComponent,
    PublisherDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ],
  exports: [
  ]
})
export class ShopModule { }
