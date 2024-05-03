import { Component, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/shared/models/author';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  author!: IAuthor;

  constructor(private shopService: ShopService, private activatiedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAuthor(+ this.activatiedRoute.snapshot.paramMap.get('id')!);
  }

  getAuthor(id: number) {
    this.shopService.getAuthor(id).subscribe({
      next: response => this.author = response,
      error: error => console.log(error)
    })
  }

}
