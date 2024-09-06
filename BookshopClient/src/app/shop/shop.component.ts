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
  shopParams!: ShopParams;
  totalCount?: number;
  sortOptions = [
    {name: "A - Z", value: "name"},
    {name: "Po ceni rastuće", value: "priceAsc"},
    {name: "Po ceni opadajuće", value: "priceDesc"}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getBooks(true);
    this.getGenres();
    this.getAuthors();
  }

  getBooks(useCache = false) {
    this.shopService.getBooks(useCache).subscribe({
      next: response => {
        this.books = response?.data;
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
    const params = this.shopService.getShopParams();
    params.genreId = genreId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getBooks();
  }

  onAuthorSelected(authorId: number) {
    const params = this.shopService.getShopParams();
    params.authorId = authorId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getBooks();
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getBooks();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getBooks(true);
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getBooks();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getBooks();
  }

}
