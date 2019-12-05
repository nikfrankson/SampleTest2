import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private toastService: ToastService, private router: Router) { }

  ngOnInit() {
  }

  showAbout() {
    this.toastService.showToast('primary', 5000, 'This application was developed by Nikolas Frankson (c).');
  }

  logout() {
    localStorage.setItem('user', JSON.stringify({}));
    this.router.navigate(['login']);
  }

}
