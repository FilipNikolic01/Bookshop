import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBook } from '../shared/models/book';
import { ShopService } from './shop.service';
import { IGenre } from '../shared/models/genre';
import { IAuthor } from '../shared/models/author';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm!: ElementRef;
  books?: IBook[] = [];
  genres: IGenre[] = [];
  authors: IAuthor[] = [];
  shopParams = new ShopParams();
  totalCount?: number;
  sortOptions = [
    {name: "A - Z", value: "name"},
    {name: "Po ceni rastuće", value: "priceAsc"},
    {name: "Po ceni opadajuće", value: "priceDesc"}
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getBooks();
    this.getGenres();
    this.getAuthors();
  }

  getBooks() {
    this.shopService.getBooks(this.shopParams).subscribe({
      next: response => {
        this.books = response?.data;
        this.shopParams.pageNumber = response?.pageIndex;
        this.shopParams.pageSize = response?.pageSize;
        this.totalCount = response?.count
      },
      error: error => console.log(error)
    })
  }

  getGenres() {
    this.shopService.getGenres().subscribe({
      next: response => this.genres = [{id: 0, name: 'Svi', description: 'Svi žanrovi'}, ...response],
      error: error => console.log(error)
    })
  }

  getAuthors() {
    this.shopService.getAuthors().subscribe({
      next: response => this.authors = [{id: 0, fullName: 'Svi', biography: 'Biografija', profilePictureURL: 'Slika'}, ...response],
      error: error => console.log(error)
    })
  }

  onGenreSelected(genreId: number) {
    this.shopParams.genreId = genreId;
    this.shopParams.pageNumber = 1;
    this.getBooks();
  }

  onAuthorSelected(authorId: number) {
    this.shopParams.authorId = authorId;
    this.shopParams.pageNumber = 1;
    this.getBooks();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getBooks();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getBooks();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value
    this.shopParams.pageNumber = 1;
    this.getBooks();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getBooks();
  }

}
