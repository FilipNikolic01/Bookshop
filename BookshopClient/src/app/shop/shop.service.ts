import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IGenre } from '../shared/models/genre';
import { IAuthor } from '../shared/models/author';
import { map, of } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';
import { IBook } from '../shared/models/book';
import { IPublisher } from '../shared/models/publisher';
import { apiUrl } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = apiUrl;
  books: IBook[] = [];
  genres: IGenre[] = [];
  authors: IAuthor[] = [];
  publishers: IPublisher[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private httpClient: HttpClient) { }

  getBooks(useCache: boolean) {
    if (useCache === false) 
      this.books = [];

    if (this.books.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.books.length / this.shopParams.pageSize!);

      if (this.shopParams.pageNumber! <= pagesReceived) {
        this.pagination.data =
          this.books.slice((this.shopParams.pageNumber! - 1) * this.shopParams.pageSize!,
            this.shopParams.pageNumber! * this.shopParams.pageSize!);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.genreId !== 0) {
      params = params.append('genreId', this.shopParams.genreId.toString());
    }

    if (this.shopParams.authorId !== 0) {
      params = params.append('authorId', this.shopParams.authorId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber!.toString());
    params = params.append('pageSize', this.shopParams.pageSize!.toString());

    return this.httpClient.get<IPagination>(this.baseUrl + 'books', {observe: 'response', params})
      .pipe(
        map(response => {
          this.books = [...this.books, ...response.body!.data];
          this.pagination = response.body!;
          return this.pagination;
        })
      );
  }

  getShopParams() {
    return this.shopParams;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getBook(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book) return of(book);
    return this.httpClient.get<IBook>(this.baseUrl + 'books/' + id);
  }

  getGenres() {
    if (this.genres.length > 0) return of(this.genres);
    return this.httpClient.get<IGenre[]>(this.baseUrl + 'genres').pipe(
      map(response => {
        this.genres = response;
        return response;
      })
    );
  }

  getGenre(id: number) {
    const genre = this.genres.find(g => g.id === id);
    if (genre) return of(genre);
    return this.httpClient.get<IGenre>(this.baseUrl + 'genres/' + id);
  }

  getAuthors() {
    if (this.authors.length > 0) return of(this.authors);
    return this.httpClient.get<IAuthor[]>(this.baseUrl + 'authors').pipe(
      map(response => {
        this.authors = response;
        return response;
      })
    );
  }

  getAuthor(id: number) {
    const author = this.authors.find(a => a.id === id);
    if (author) return of(author);
    return this.httpClient.get<IAuthor>(this.baseUrl + 'authors/' + id);
  }

  getPublishers() {
    if (this.publishers.length > 0) return of(this.publishers);
    return this.httpClient.get<IPublisher[]>(this.baseUrl + 'publishers').pipe(
      map(response => {
        this.publishers = response;
        return response;
      })
    );
  }

  getPublisher(id: number) {
    const publisher = this.publishers.find(p => p.id === id);
    if (publisher) return of(publisher);
    return this.httpClient.get<IPublisher>(this.baseUrl + 'publishers/' + id);
  }

}
