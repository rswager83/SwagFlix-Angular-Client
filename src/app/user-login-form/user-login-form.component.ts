import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = {Username: '', Password: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Login function, routes to /movies
   * 
   * @function userLogin
   */


  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);

      this.dialogRef.close();
      console.log(result);

      this.snackbar.open("User is logged in!", 'Ok', {
        duration: 3000
      });
      this.router.navigate(['movies']);
  }, (result) => {
    console.log(result)
    this.snackbar.open("Failed to log in!", '', {
      duration: 3000
    });
  });
}
}
