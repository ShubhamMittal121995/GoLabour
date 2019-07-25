import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { AuthGaurdService } from '../services/auth-gaurd.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jobs = [];
  labourData;
  option :String ;
  user;
  category;

  confirmJobs = [];

  request = new FormGroup({
    labour : new FormGroup({
      mobile : new FormControl('')
    }),
    job : new FormGroup({
      job_id : new FormControl('')
    }),
    estimatedPrice : new FormControl('', Validators.required),
    status : new FormControl('Pending')  
  })

  constructor(private http : HttpServiceService, private guard : AuthGaurdService) { 
    this.accounts("Notification");
    
  }
  ngOnInit() {
    
  }
  accounts(options : String) {
    this.user = {
      mobile : this.guard.getSession("mobile")
    }
    if (this.labourData == null) {
      console.log(this.user);
      this.http.ajaxCall(this.user, "labour/getDetail").subscribe(res => {
        console.log(res);
        if (res['status'] != false) {
          this.labourData = res['o'];
          console.log(this.labourData.category);
          this.http.ajaxCall(this.labourData.category,"jobs").subscribe( res => {
            console.log(res);
            this.jobs = res;
          })
        }
      });
    }
    this.option = options;
  }

  createRequest(job) { 
    console.log(job['job_id']);
    this.request.get('job.job_id').setValue(job['job_id']);
    this.request.get('labour.mobile').setValue(this.guard.getSession('mobile'));  
    this.option = "Request";
  }

  postRequest() {
    console.log(this.request.value);
    this.http.ajaxCall(this.request.value, "requestJobs").subscribe(res =>{
      console.log(res);
      this.accounts('Notification');
    })
  }

  confirm(option : String) {
    var data = {
      mobile : this.guard.getSession('mobile')
    }
    this.http.ajaxCall(data, "getAllJobs").subscribe(res => {
      console.log(res);
      this.confirmJobs = res;
      this.option = option;
    });
  }

}
