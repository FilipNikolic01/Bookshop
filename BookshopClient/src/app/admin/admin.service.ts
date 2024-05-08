import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '../shared/models/author';
import { IGenre } from '../shared/models/genre';
import { IPublisher } from '../shared/models/publisher';
import { IPagination } from '../shared/models/pagination';
import { IBookCreate } from '../shared/models/bookCreate';
import { apiUrl } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = apiUrl;

  constructor(private httpClient: HttpClient) { }

  //--AUTHOR

  getAuthors() {
    return this.httpClient.get<IAuthor[]>(this.baseUrl + 'authors');
  }

  addAuthor(author: IAuthor) {
    return this.httpClient.post(this.baseUrl + 'authors', author);
  }

  updateAuthor(author: IAuthor) {
    return this.httpClient.put(this.baseUrl + 'authors/' + author.id, author);
  }

  deleteAuthor(id: number) {
    return this.httpClient.delete(this.baseUrl + 'authors/' + id)
  }

  //--GENRE

  getGenres() {
    return this.httpClient.get<IGenre[]>(this.baseUrl + 'genres');
  }

  addGenre(genre: IGenre) {
    return this.httpClient.post(this.baseUrl + 'genres', genre);
  }

  updateGenre(genre: IGenre) {
    return this.httpClient.put(this.baseUrl + 'genres/' + genre.id, genre);
  }

  deleteGenre(id: number) {
    return this.httpClient.delete(this.baseUrl + 'genres/' + id);
  }

  //--PUBLISHER

  getPublishers() {
    return this.httpClient.get<IPublisher[]>(this.baseUrl + 'publishers');
  }

  addPublisher(publisher: IPublisher) {
    return this.httpClient.post<IPublisher>(this.baseUrl + 'publishers', publisher);
  }

  updatePublisher(publisher: IPublisher) {
    return this.httpClient.put<IPublisher>(this.baseUrl + 'publishers/' + publisher.id, publisher);
  }

  deletePublisher(id: number) {
    return this.httpClient.delete(this.baseUrl + 'publishers/' + id);
  }

  //--BOOK

  getBooks() {
    return this.httpClient.get<IPagination>(this.baseUrl + 'books');
  }

  addBook(book: IBookCreate) {
    return this.httpClient.post<IBookCreate>(this.baseUrl + 'books', book);
  }

  updateBook(book: IBookCreate) {
    return this.httpClient.put<IBookCreate>(this.baseUrl + 'books/' + book.id, book);
  }
}
