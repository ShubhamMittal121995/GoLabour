import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGaurdService } from '../services/auth-gaurd.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
  }

  name : string;

  constructor(private router : Router, private guard : AuthGaurdService, private dialog: MatDialog) {
  }

  isLogin():boolean {
    if(this.guard.getSession("log"))
    {
      this.name = this.guard.getSession("name");
      return true;
    }
    return false;
  }

  isUser() : boolean {
    if(this.guard.getSession("log") == "labour") {
      this.name = this.guard.getSession("name");
      return false;
    }
    return true;
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigateByUrl("/Home");
  }

  instruction1(): void {
    const dialogRef = this.dialog.open(Instruction1, {
      width: '50%',
    });
  }

  instruction2(): void {
    const dialogRef = this.dialog.open(Instruction2, {
      width: '50%',
    });
  }

  help(): void {
    const dialogRef = this.dialog.open(Help, {
      width: '50%',
    });
  }
}

@Component({
  selector: 'instuction1',
  templateUrl: 'instruction1.html',
})
export class Instruction1 {
  
  constructor(
    public dialogRef: MatDialogRef<Instruction1>) { }

  onClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'instuction2',
  templateUrl: 'instruction2.html',
})
export class Instruction2 {
  
  constructor(
    public dialogRef: MatDialogRef<Instruction2>) { }

  onClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'help',
  templateUrl: 'help.html',
})
export class Help {
  
  constructor(
    public dialogRef: MatDialogRef<Help>) { }

  onClick(): void {
    this.dialogRef.close();
  }
}


