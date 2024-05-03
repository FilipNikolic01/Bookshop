import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IGenre } from '../shared/models/genre';
import { IAuthor } from '../shared/models/author';
import { map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';
import { IBook } from '../shared/models/book';
import { IPublisher } from '../shared/models/publisher';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7006/api/';

  constructor(private httpClient: HttpClient) { }

  getBooks(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.genreId !== 0) {
      params = params.append('genreId', shopParams.genreId.toString());
    }

    if (shopParams.authorId !== 0) {
      params = params.append('authorId', shopParams.authorId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);

    params = params.append('pageIndex', shopParams.pageNumber!.toString());

    params = params.append('pageSize', shopParams.pageSize!.toString());

    return this.httpClient.get<IPagination>(this.baseUrl + 'books', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body
        })
      );
  }

  getBook(id: number) {
    return this.httpClient.get<IBook>(this.baseUrl + 'books/' + id);
  }

  getGenres() {
    return this.httpClient.get<IGenre[]>(this.baseUrl + 'genres');
  }

  getGenre(id: number) {
    return this.httpClient.get<IGenre>(this.baseUrl + 'genres/' + id);
  }

  getAuthors() {
    return this.httpClient.get<IAuthor[]>(this.baseUrl + 'authors');
  }

  getAuthor(id: number) {
    return this.httpClient.get<IAuthor>(this.baseUrl + 'authors/' + id);
  }

  getPublishers() {
    return this.httpClient.get<IPublisher[]>(this.baseUrl + 'publishers');
  }

  getPublisher(id: number) {
    return this.httpClient.get<IPublisher>(this.baseUrl + 'publishers/' + id);
  }

}
