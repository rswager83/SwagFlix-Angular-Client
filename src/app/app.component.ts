import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'SwagFlix-Angular-Client';

  constructor(public dialog: MatDialog) { }

// This function will open the dialog when the signup button is clicked  
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '480px'
    });
  }
      // This function will open the dialog when the login button is clicked
openUserLoginDialog(): void {
  this.dialog.open(UserLoginFormComponent, {
    // Assigning the dialog a width
    width: '480px'
    });
  }
}