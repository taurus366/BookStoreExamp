import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../content.service";
import {ActivatedRoute} from "@angular/router";
import {IBook} from "../../shared/interfaces/IBook";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

   book: IBook | undefined;

  constructor(private contentService: ContentService , private activateRoute: ActivatedRoute) {
  this.fetchBookById();
  }

  ngOnInit(): void {
  }

  fetchBookById(): void {
    this.book = undefined;
    const id = this.activateRoute.snapshot.params.bookId;
    this.contentService.loadBookById(id).subscribe(book => this.book = book);
  }

}
