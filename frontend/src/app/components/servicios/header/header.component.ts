import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = '';
  userEmail = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.username = this.auth.getUsername();
    this.userEmail = this.auth.getUserEmail();
  }

  logout() {
    this.auth.logout();
  }

  logoutAndGoHome() {
    this.auth.logout();
    window.location.href = 'https://pablitoda.com';
  }
}
