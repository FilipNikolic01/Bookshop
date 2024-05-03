import { Component, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/shared/models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  dataSource!: MatTableDataSource<IAuthor>;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
