import { Component, OnInit, Inject } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthGaurdService } from '../services/auth-gaurd.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  categories = [];

  signup = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', Validators.required),
    age : new FormControl('', [Validators.required]),
    gender : new FormControl('', Validators.required),
    category : new FormGroup({
      categoryID : new FormControl('',Validators.required)
    })
})

  constructor(private http : HttpServiceService, private router : Router, private auth : AuthGaurdService, private dialog: MatDialog) { 
    this.http.ajaxGet("getAllCategory").subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.categories.push(element)
      });
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signup.value); 
    this.http.ajaxCall(this.signup.value, "labour/register").subscribe(result => {
      console.log(result);
      this.dialog.open(Continue, {
        width: '70%',
        data: {
          value: result['o']
        }
      });
    })
  }

}

@Component({
  selector: 'continue-dialog',
  templateUrl: 'continue.html',
})
export class Continue {
 message: object;
 constructor(
   public dialogRef: MatDialogRef<Continue>, @Inject(MAT_DIALOG_DATA) private data: any, public router: Router) {
   this.message = data.value;
 }

 close(): void {
   this.dialogRef.close();
   this.router.navigateByUrl("/labourLogin");
 }
}