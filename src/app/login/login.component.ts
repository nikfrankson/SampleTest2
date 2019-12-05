import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = {
    username: null,
    password: null,
  };
  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }
  login(user: IUser) {
    const presetUser = {username: 'admin', password: 'password'};
    if (this.user.username != null && this.user.password != null &&
      this.user.username !== '' && this.user.password !== '') {
        if (this.user.username === presetUser.username && this.user.password === presetUser.password) {
          localStorage.getItem(JSON.stringify(this.user));
          this.router.navigate(['contacts', this.user]);
        } else {
          this.toastService.showToast('warning', 2000, 'Username or Password is incorrect!');
        }
      } else {
        this.toastService.showToast('danger', 2000, 'Must type in credentials!');
      }
  }

}
