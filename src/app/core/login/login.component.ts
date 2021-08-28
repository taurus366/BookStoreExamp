import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError = '';

  constructor(private userService: UserService,private route: Router) {
  }

   login(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.loginError = '';
     this.userService.login(form.value).subscribe({
      next: (user) => {
        if (user.role === 'ADMIN') {
          this.route.navigate(['/orders']);
        } else {
          this.route.navigate(['/books']);

        }
        this.userService.populateLocalStorage(user);
      },
      error: (err) => {
        console.log(err.error)
        this.loginError = err.error;

        setTimeout(() => {
          this.loginError = '';
        }, 7000)
      }
    })
  }


  ngOnInit(): void {
  }


}
