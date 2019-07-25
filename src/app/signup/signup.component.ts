import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Response } from '../schema/response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpServiceService, private dialog: MatDialog, private response : Response) {
    response = new Response();
   }

  ngOnInit() {
  }

  signup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', Validators.required),
  })

  getErrorMessage() {
    return this.signup.get('email').hasError('required') ? 'You must enter a value' :
      this.signup.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
       console.log(this.signup.value);
       this.http.ajaxCall(this.signup.value, "user/register").subscribe(result => {
        console.log(result);
      this.dialog.open(ContinueDialog, {
        width: '70%',
        data: {
          value: result['o']
        }
      });
    });
   }
}

 @Component({
   selector: 'continue-dialog',
   templateUrl: 'continue-dialog.html',
 })
 export class ContinueDialog {
  message: object;
  constructor(
    public dialogRef: MatDialogRef<ContinueDialog>, @Inject(MAT_DIALOG_DATA) private data: any, public router: Router) {
    this.message = data.value;
  }

  close(): void {
    this.dialogRef.close();
    this.router.navigateByUrl("/Login");
  }
 }

