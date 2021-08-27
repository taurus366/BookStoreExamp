import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../content.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IBook} from "../../shared/interfaces/IBook";
import {UserService} from "../user.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

   book: IBook | undefined;

  constructor(private contentService: ContentService , private activateRoute: ActivatedRoute, private userService:UserService,private route:Router) {
  this.fetchBookById();
  }

  ngOnInit(): void {
  }

  fetchBookById(): void {
    this.book = undefined;
    const id = this.activateRoute.snapshot.params.bookId;
    this.contentService.loadBookById(id).subscribe(book => this.book = book);
  }

  get isLogged(): boolean {
   return  this.userService.isLogged;
  }


  addToCart(id: number) {
   let authToken  = '';
    this.userService.addToCart({id,authToken}).subscribe({
      next: value => {
        alert(value);
        this.route.navigate(['/books']);
      },
      error: err => {
        alert(err.error)
      }
    })
  }
}
