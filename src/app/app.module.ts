import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Material Import 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';

//Component
import { HomeComponent } from './home/home.component';
import { SigninComponent, ForgetPassword, VerificationDialog, AuthenticateDialog } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent, ContinueDialog } from './signup/signup.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { Data } from './schema/data';
import { HttpClientModule } from '@angular/common/http';
import { HttpServiceService } from './services/http-service.service';
import { Pojo } from './schema/pojo';
import { MainComponent, Instruction1, Instruction2, Help } from './main/main.component';
import { AccountComponent, ConfirmBox, PromptBox} from './account/account.component';
import { Response } from './schema/response';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { RegisterComponent, Continue } from './register/register.component';
import { LoginComponent, Forget, Authenticate, Verification } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    ForgetPassword,
    SignupComponent,
    VerificationDialog,
    AuthenticateDialog,
    ContinueDialog,
    Instruction1,
    Instruction2,
    Help,
    MainComponent,
    AccountComponent,
    ConfirmBox,
    PromptBox,
    RegisterComponent,
    LoginComponent,
    Forget,
    Authenticate,
    Verification,
    Continue,
    DashboardComponent
  ],
  entryComponents: [
    ForgetPassword,
    VerificationDialog,
    AuthenticateDialog,
    ContinueDialog,
    Instruction1,
    Instruction2,
    Help,
    ConfirmBox,
    PromptBox,
    Forget,
    Authenticate,
    Verification,
    Continue
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthGaurdService, Data, HttpServiceService, Pojo, Response, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
