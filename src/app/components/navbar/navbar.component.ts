import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // global property
  isLogin: boolean = false;

  constructor(public _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    this._AuthService.userDataDecoded.subscribe(() => {
      if (this._AuthService.userDataDecoded.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this._AuthService.userDataDecoded.next(null);
    this._Router.navigate(['/login']);
  }
}
