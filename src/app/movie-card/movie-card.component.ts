import { GenreComponent } from './../genre/genre.component';
import { DirectorComponent } from './../director/director.component';
import { SynopsisComponent } from './../synopsis/synopsis.component';
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  isFav(id: string): boolean {
    return this.favMovies.includes(id);
  }

  getFavMovies(): void {
    this.fetchApiData.getFavMovie().subscribe((resp: any) => {
      this.favMovies = resp;
      return this.favMovies;
    })
  }

  addToFav(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    });
  }

  delFav(id: string): void {
    console.log('removed '+ id);
    this.fetchApiData.delFavMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    })
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '480px'
    })
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open (DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
       
      },
      width: '480px'
    })
  }


  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open( SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '480px'
    })
  }
}
