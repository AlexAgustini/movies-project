import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserForm } from '../../shared/types/user.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s ease-out',
                style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.3s ease-out',
                style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginView implements OnInit{

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private matSnackBarController: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  public isLoading!: boolean;
  public form!: FormGroup;
  public formState: string = 'login';
  public emailErrors!: string;
  public passwordErrors!: string;
  public genericErrors!: string;
  public forgotPasswordTemplate!: boolean;
  public forgotPasswordControl!: FormControl
  public forgotPasswordEmailErrors!: string;
  public emailSent!: boolean
  public isMobile$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      password: ['']
    })

    this.forgotPasswordControl = new FormControl('', Validators.email);
  }

  public changeFormState(): void {
    this.formState === 'register' ? this.formState = "login" : this.formState = "register";
    this.form.reset();
  }

  public async login() {
    this.isLoading = true;
    this.clearFormErrors();
    const authResult = await this.authService.login(this.getUserData())

    if ("errorType" in authResult) {
      this.treatErrors(authResult.errorType, authResult.message)

    } else if (authResult.user){
      this.matSnackBarController.open('Logged in succesfully', '', { duration: 1500, panelClass: 'custom-snackbar' })
      this.router.navigate(["/home"]);
    }

    this.isLoading = false;
  }

  public async register() {
    this.isLoading = true;
    this.clearFormErrors();

    if (!this.checkEmptyName()) {
      this.isLoading = false;
      return;
    }

    const authResult = await this.authService.registerUser(this.getUserData());

    if ("errorType" in authResult) {
      this.treatErrors(authResult.errorType, authResult.message)
    } else {
      this.router.navigate(['home'])
      this.matSnackBarController.open('Account created succesfully', '', { duration: 1500, panelClass: 'custom-snackbar'})
    }
    this.isLoading = false;
  }

  private getUserData(): UserForm {
    const name = this.form.get('name')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    return { name, email, password }
  }

  private clearFormErrors() {
    this.emailErrors = "";
    this.passwordErrors = "";
    this.genericErrors = "";
  }

  private treatErrors(errorType: string, message: string) {
    if (errorType === "email") {
      this.emailErrors = message;
      this.form.controls["email"].setErrors({'incorrect': true})
    } else if (errorType === "password") {
      this.passwordErrors = message;
      this.form.controls["password"].setErrors({'incorrect': true})
    } else {
      this.genericErrors = message;
    }
  }

  private checkEmptyName(): boolean {
    if (!this.form.controls["name"].value) {
      return false
    } else {
      return true
    }
  }

  public setForgotPasswordTemplate() {
    this.forgotPasswordTemplate = true;
  }

  public sendPasswordEmail():void {
    if (!this.forgotPasswordControl.value) {
      this.forgotPasswordEmailErrors = 'You need to enter an email'
      this.forgotPasswordControl.setErrors({'incorrect': true})
      return
    }
    this.isLoading = true;
    this.authService.sendPasswordResetEmail(this.forgotPasswordControl.value)
      .then((result: {hasError: boolean, error: string})=> {
        if (!result) {
          this.emailSent = true;
          return;
        }
        if (result.hasError) {
          this.forgotPasswordEmailErrors = result.error
          this.forgotPasswordControl.setErrors({'incorrect': true})
        }
      }).finally(()=> this.isLoading = false)
  }

}
