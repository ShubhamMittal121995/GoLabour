import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGaurdService } from '../services/auth-gaurd.service';
import { HttpServiceService } from '../services/http-service.service';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TouchSequence } from 'selenium-webdriver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  option: String;
  minDate: Date = new Date(Date.now());
  username: string;
  mobile: string;
  email: string;

  id = new FormControl('');

  userData: any;

  jobs = [];

  categories = [];

  address = [];

  notification = [];

  editProfile = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })

  password = new FormGroup({
    old: new FormControl('', Validators.required),
    new: new FormControl('', Validators.required),
  })

  createdJob = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    addresses: new FormControl('', Validators.required),
    dateofjob: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  newAddress = new FormGroup({
    house: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  })

  user;

  constructor(private router: Router, private guard: AuthGaurdService, private http: HttpServiceService,
    private dialog: MatDialog, private datepipe: DatePipe) {
    this.user = {
      email: this.guard.getSession("email")
    }
    this.http.ajaxGet("getAllCategory").subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.categories.push(element)
      });
    })
    this.accounts("Notification");
  }

  ngOnInit() {
    if (!this.guard.getSession("log")) {
      this.router.navigateByUrl("/Login");
    }
    else {
      //this.email = this.guard.getSession("email");
    }
  }

  getErrorMessage() {
    return this.editProfile.get('email').hasError('required') ? 'You must enter a value' :
      this.editProfile.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  filterjob() {
    return this.jobs.filter(x => x.status == "Pending")
  }

  accounts(option: String): void {
    this.notification = null;
    if (this.userData == null) {
      this.http.ajaxCall(this.user, "user/detail").subscribe(res => {
        console.log(res);
        if (res['status'] != false) {
          this.username = res['o'].name;
          this.email = res['o'].email;
          this.mobile = res['o'].mobile;
          this.userData = res['o'];
          this.editProfile.get('name').setValue(this.userData.name);
          this.editProfile.get('email').setValue(this.userData.email);
          this.editProfile.get('mobile').setValue(this.userData.mobile);
          this.editProfile.get('gender').setValue(this.userData.gender);
          this.editProfile.get('age').setValue(this.userData.age);
          this.address = this.userData.aList;
          this.jobs = this.userData.jList;
        }
      });
    }
    this.option = option;
  }

  updateProfile(): void {
    console.log(this.editProfile.value);
    this.userData.name = this.editProfile.get('name').value;
    this.userData.email = this.editProfile.get('email').value;
    this.userData.mobile = this.editProfile.get('mobile').value;
    this.userData.gender = this.editProfile.get('gender').value;
    this.userData.age = this.editProfile.get('age').value;
    console.log(this.userData);
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        console.log(result);
        this.http.ajaxCall(this.userData, "user/updateProfile").subscribe(res => {
          if (res != false) {
            this.userData = null;
            this.accounts("My Account");
          }
        })
      }
    });
  }

  updatePassword(): void {
    console.log(this.password.value);
    this.userData.password = this.password.get('new').value;
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result);
        this.http.ajaxCall(this.userData, "/user/updatePassword/" + this.password.get('old').value).subscribe(res => {
          if (res['status'] != false) {
            this.password.get('old').setValue('');
            this.password.get('new').setValue('');
            this.userData = null;
            this.accounts("My Account");
          }
          else {
            this.dialog.open(PromptBox, {
              width: '250px',
              data: {
                value: res['o']
              }
            })
            this.accounts("Change Password");
          }
        })
      }
    });
  }

  updateJob(): void {
    console.log(this.createdJob.value);
    var job = {
      user: {
        email: this.email
      },
      dateofjob: this.datepipe.transform(this.createdJob.get('dateofjob').value, "yyyy-MM-dd"),
      description: this.createdJob.get('description').value,
      status: "Pending",
      category: {
        categoryID: this.createdJob.get('categoryName').value,
      },
      address: {
        id: this.createdJob.get('addresses').value
      }
    }
    console.log(job);
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result);
        this.http.ajaxCall(job, "/user/addJob").subscribe(res => {
          if (res['status'] != false) {
            this.dialog.open(PromptBox, {
              width: '40%',
              data: {
                value: res['o']
              }
            })
            this.userData = null;
            this.accounts("Job Description");
          }
        })
      }
    });
  }

  delete(id: number): void {
    console.log(id);
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.http.ajaxDelete("user/removeJob/" + id).subscribe(() => {
          this.dialog.open(PromptBox, {
            width: '40%',
            data: {
              value: "Job Deleted"
            }
          })
          this.userData = null;
          this.accounts("Job Description");
        });
      }
    })
  }

  UpdateAddress(): void {
    console.log(this.newAddress.value);
    this.userData.aList.push(this.newAddress.value);
    console.log(this.userData);

    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result);
        this.http.ajaxCall(this.userData, "/user/addAddress").subscribe(res => {
          if (res['status'] != false) {
            this.dialog.open(PromptBox, {
              width: '40%',
              data: {
                value: res['o']
              }
            })
            this.userData = null;
            this.accounts("Address");
          }
        })
      }
    });
  }

  remove(id: number): void {
    console.log(id);
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.http.ajaxDelete("user/removeAddress/" + id).subscribe(() => {
          this.dialog.open(PromptBox, {
            width: '40%',
            data: {
              value: "Address Deleted"
            }
          })
          this.userData = null;
          this.accounts("Address");
        });
      }
    })
  }


  search() {
    console.log(this.id.value);
    this.http.ajaxCall(this.id.value, "RequestJobsById").subscribe(res => {
      console.log(res);
      this.notification = res;
      
    })
  }

  confirm(not) {
    console.log(not)
    var data  = {
      status : "Pending",
      job : {
        job_id : not['job'].job_id
      },
      labour : {
        mobile : not['labour'].mobile
      },
      user : {
        email : this.guard.getSession('email')
      }
    }
    console.log(data);
    this.http.ajaxCall(data, "confirmJob").subscribe(res => {
      console.log(res);
      if (res['status'] != false) {
        this.dialog.open(PromptBox, {
          width: '40%',
          data: {
            value: res['o']
          }
        })
        this.userData = null;
        this.accounts("Notification");
      }
    })
  }

}

@Component({
  selector: 'confirm-box',
  templateUrl: 'confirmBox.html'
})

export class ConfirmBox {
  constructor(public dialogRef: MatDialogRef<ConfirmBox>) {
  }
  goOff() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'promptBox',
  templateUrl: 'promtBox.html'
})

export class PromptBox {
  message: Object;
  constructor(public dialogRef: MatDialogRef<PromptBox>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.message = this.data.value;
  }
  goOff() {
    this.dialogRef.close();
  }
}





