import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);

      this.dialogRef.close();
      console.log(result);

      this.snackbar.open(result, "User is logged in!", {
        duration: 2000
      });
  }, (result) => {
    console.log(result)
    this.snackbar.open(result, 'ok', {
      duration: 2000
    });
  });
}
}
