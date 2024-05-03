import { Component, OnInit } from '@angular/core';
import { IGenre } from 'src/app/shared/models/genre';
import { ShopService } from '../../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent implements OnInit {
  genre!: IGenre

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getGenre(+ this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getGenre(id: number) {
    this.shopService.getGenre(id).subscribe({
      next: response => this.genre = response,
      error: error => console.log(error)
    })
  }

}
