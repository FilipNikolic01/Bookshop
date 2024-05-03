import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/models/book';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: IBook

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBook(+ this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getBook(id: number) {
    this.shopService.getBook(id).subscribe({
      next: response => this.book = response,
      error: error => console.log(error)
    });
  }

}
