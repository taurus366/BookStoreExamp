import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  constructor(private adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  add(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.title)
    this.adminService.addBook(form.value).subscribe({
      next: value => {
        alert(value);
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });
      },
      error: err =>  {
        alert(err.error)
      }
    })
  }
}
