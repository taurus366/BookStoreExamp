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


  async fetchBooks() {
    this.books = undefined;
    await this.contentService.loadBooks().then( themes => this.books = themes);
    // console.log(this.books)
  }

}
