import {Component, OnInit, SimpleChange} from '@angular/core';
import {IUser} from "../../shared/interfaces/IUser";
import {UserService} from "../user.service";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user : IUser | undefined;
  infoUpdateMode : boolean = false;

  constructor(private userService: UserService,private route:Router) {
  this.updateUserInfoSystem();

  }

  updateUserInfoSystem() {
    this.user = this.userService.user;
  }


  ngOnInit(): void {
  }


  updateUserInfo(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.userService.updateUserNewInfo(form.value).subscribe({
      next:(user) => {
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });
        this.userService.populateLocalStorage(user);
    alert('Successfully updated User info !')
      },
      error: (err) => {
        alert(err.error)
      }
    });
    this.updateUserInfoSystem();
  }
}
