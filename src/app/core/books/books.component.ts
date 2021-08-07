import { Component, OnInit } from '@angular/core';
import {IBook} from "../../shared/interfaces/IBook";
import {ContentService} from "../../content.service";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: IBook[] | undefined;

  constructor(private contentService: ContentService) {
    this.fetchBooks();
  }

  ngOnInit(): void {
  }


  fetchBooks():void {
    this.books = undefined;
    this.contentService.loadBooks().subscribe(themes => this.books = themes);
  }

}
