import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { GenreDetailsComponent } from './genres/genre-details/genre-details.component';
import { PublisherDetailsComponent } from './publishers/publisher-details/publisher-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: BookDetailsComponent},
  {path: 'authors/:id', component: AuthorDetailsComponent},
  {path: 'genres/:id', component: GenreDetailsComponent},
  {path: 'publishers/:id', component: PublisherDetailsComponent}
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
export class ShopRoutingModule { }
