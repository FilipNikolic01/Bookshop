import { Component, OnInit } from '@angular/core';
import { IPublisher } from 'src/app/shared/models/publisher';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.scss']
})
export class PublisherDetailsComponent implements OnInit {
  publisher!: IPublisher

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    breadcrumbService.set('@publisherDetails', ' ');
  }

  ngOnInit(): void {
    this.getPublisher(+ this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getPublisher(id: number) {
    this.shopService.getPublisher(id).subscribe({
      next: response => {
        this.publisher = response;
        this.breadcrumbService.set('@publisherDetails', this.publisher.name);
      },
      error: error => console.log(error)
    })
  }

}
