import { Component, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/shared/models/author';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  author!: IAuthor;

  constructor(private shopService: ShopService, private activatiedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    breadcrumbService.set('@authorDetails', ' ');
  }

  ngOnInit(): void {
    this.getAuthor(+ this.activatiedRoute.snapshot.paramMap.get('id')!);
  }

  getAuthor(id: number) {
    this.shopService.getAuthor(id).subscribe({
      next: response => {
        this.author = response;
        this.breadcrumbService.set('@authorDetails', this.author.fullName);
      },
      error: error => console.log(error)
    })
  }

}
