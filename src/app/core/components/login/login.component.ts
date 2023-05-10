import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserForm } from '../../shared/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  isLoading!: boolean;

  form!: FormGroup;
  formState: string = 'login';
  emailErrors!: string;
  passwordErrors!: string;
  genericErrors!: string;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      password: ['']
    })
  }

  public changeFormState(): void {
    this.formState === 'register' ? this.formState = "login" : this.formState = "register";
    this.clearFormValues();
  }

  public async login() {
    this.isLoading = true;
    this.clearFormErrors();
    const authResult = await this.authService.login(this.getUserData())

    if ("errorType" in authResult) {
      this.treatErrors(authResult.errorType, authResult.message)

    } else if (authResult.user){
      this.router.navigate(["home"]);
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

    const authResult = await this.authService.registerUser(this.getUserData())

    if ("errorType" in authResult) {
      this.treatErrors(authResult.errorType, authResult.message)
    } else {
      this.formState = "login";
    }
    this.isLoading = false;
  }

  private getUserData(): UserForm {
    const name = this.form.get('name')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    return { name, email, password }
  }

  private clearFormValues() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue("");
    });
  }

  private clearFormErrors() {
    this.emailErrors = "";
    this.passwordErrors = "";
    this.genericErrors = "";
  }

  private treatErrors(errorType: string, message :string) {
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

}
