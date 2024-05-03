import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { GenreComponent } from './genre/genre.component';
import { PublisherComponent } from './publisher/publisher.component';

const routes: Routes = [
  {path: 'authors', component: AuthorComponent},
  {path: 'books', component: BookComponent},
  {path: 'genres', component: GenreComponent},
  {path: 'publishers', component: PublisherComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
