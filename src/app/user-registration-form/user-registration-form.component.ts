import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';



@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

/**
 * Registers user to API service
 * Responsible for sending the form inputs to the backend
 * 
 * @function registerUser
 */

registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here 
     this.dialogRef.close(); // close on success!
     this.snackBar.open('User registered successfully', 'Ok', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open('Not Signed Up!', '', {
        duration: 2000
      });
    });
  }

  }