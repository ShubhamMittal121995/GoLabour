import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';
import { AuthGaurdService } from '../services/auth-gaurd.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router,
     private http: HttpServiceService, private auth: AuthGaurdService) {

  }

  ngOnInit() {
  }

  login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
  })

  getErrorMessage() {
    return this.login.get('email').hasError('required') ? 'You must enter a value' :
      this.login.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    console.log(this.login.value);
    this.http.ajaxCall(this.login.value, "user/login").subscribe(result => {
      console.log(result)
      if (result['status'] != false) {
        this.auth.setSession("log", "true");
        this.auth.setSession("name", result['o']);
        this.auth.setSession("email", this.login.get('email').value);
        this.router.navigateByUrl("/Home");
      }
      else {
        this.dialog.open(AuthenticateDialog, {
          width: '300px',
          data : {
            value : result['o']
          }
        });
      }
  });
}


  openDialog(): void {
    const dialogRef = this.dialog.open(ForgetPassword, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.value);
        this.dialog.open(VerificationDialog, {
          width: '400px',
        });
      }
    });
  }
}

@Component({
  selector: 'forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPassword {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialogRef: MatDialogRef<ForgetPassword>) { }

  onClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}

@Component({
  selector: 'verification-dialog',
  templateUrl: 'verification-dialog.html',
})
export class VerificationDialog {
  constructor(
    public dialogRef: MatDialogRef<VerificationDialog>) { }

  close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'authenticate-dialog',
  templateUrl: 'authenticate-dialog.html',
})
export class AuthenticateDialog {
  message: object;
  constructor(
    public dialogRef: MatDialogRef<AuthenticateDialog>,@Inject(MAT_DIALOG_DATA) private data: any, public router: Router) {
      this.message = data.value;
     }

  close(): void {
    this.dialogRef.close();
  }
}
