import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Display User-Registration using dialog
   * 
   * @function openUserRegistrationDialog
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '440px'
    });
  }

  /**
   * Display User-Login using dialog
   * 
   * @function openUserLoginDialog
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '260px'
    });
  }
}
