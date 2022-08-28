import { MovieCardComponent } from './../movie-card/movie-card.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any={};

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  goToIndex(): void {
    this.router.navigate(['movies']);
    
  }

  goToProfile(): void {
    this.router.navigate(['profile'])

  }

  userLogOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.userLogOut;
    })
  }
}
