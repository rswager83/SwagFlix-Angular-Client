import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide the data for the client app
const apiUrl = 'https://swagflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide the HttpClient to the entire class,  making it available via this http
  constructor(private http: HttpClient) { 
    
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails:any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError));
    }  

  /**
   * Get all movies
   * 
   * @returns returns array of movies
   */
  
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * Get single movie
   * 
   * @param Title 
   * @returns movie object
   */

  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    return this.http.get(apiUrl + 'movies/' + Title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }  

  /**
   * Get director info
   * 
   * @param name 
   * @returns director object
   */

   getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    } 
  
  /**
   * Get genre info
   * 
   * @returns genre object
   */

   getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }  

  /**
   * Get single user
   * 
   * @returns user object
   */

   getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.get(apiUrl + 'users/' + Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }   

  /**
   * Get favorite movie
   * 
   * @returns favorite movies array
   */

   getFavMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${Username}/movies/`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }  

  /**
   * Adds movie to favorites
   * 
   * @param MovieID 
   * @returns updated favorite movies array
   */

   addFavMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${Username}/movies/${MovieID}`, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }  

    /**
     * Deletes movie from favorites
     * 
     * @param MovieID 
     * @returns updated favorite movies array
     */

   delFavMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${Username}/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * Update user
   * 
   * @param updatedUserData 
   * @returns updated user object 
   */

   updateUser(updatedUserData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${Username}`, updatedUserData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
    
  /**
   * Delete user
   * 
   * @returns error/success message
   */

   delUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    } 

    private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
      } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${error.error}`
      )}
      throwError(
      () => new Error('Something bad happened; please try again later.')
      );
    }  

    // Non-typed resonse extraction
    private extractResponseData(res: any): any {
      const body = res;
      return body || {};
    }

}
