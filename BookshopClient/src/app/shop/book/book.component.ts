import { Component, Input } from '@angular/core';
import { IBook } from 'src/app/shared/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book!: IBook;

}
