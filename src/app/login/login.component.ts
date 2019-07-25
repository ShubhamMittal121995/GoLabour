import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthGaurdService } from '../services/auth-gaurd.service';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', Validators.required),
  })
  constructor(private dialog: MatDialog, private router: Router,
    private http: HttpServiceService, private auth: AuthGaurdService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.login.value);
    this.http.ajaxCall(this.login.value, "labour/login").subscribe(result => {
      console.log(result)
      if (result['status'] != false) {
        this.auth.setSession("log", "labour");
        this.auth.setSession("name", result['o']);
        this.auth.setSession("mobile", this.login.get('mobile').value);
        this.router.navigateByUrl("/dashboard");
      }
      else {
        this.dialog.open(Authenticate, {
          width: '300px',
          data: {
            value: result['o']
          }
        });
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Forget, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.value);
        this.dialog.open(Verification, {
          width: '400px',
        });
      }
    });
  }
}

@Component({
  selector: 'forget-password',
  templateUrl: 'forget.html',
})
export class Forget {
  mobile = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

  constructor(
    public dialogRef: MatDialogRef<Forget>) { }

  onClick(): void {
    this.dialogRef.close();
  }

  
}

@Component({
  selector: 'verification-dialog',
  templateUrl: 'verification.html',
})
export class Verification {
  constructor(
    public dialogRef: MatDialogRef<Verification>) { }

  close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'authenticate',
  templateUrl: 'authenticate.html',
})
export class Authenticate {
  message: object;
  constructor(
    public dialogRef: MatDialogRef<Authenticate>, @Inject(MAT_DIALOG_DATA) private data: any, public router: Router) {
    this.message = data.value;
  }

  close(): void {
    this.dialogRef.close();
  }
}
