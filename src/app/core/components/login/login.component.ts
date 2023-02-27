import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  form!: FormGroup;
  formState: string = 'login';
  emailErrors!: string;
  passwordErrors!: string;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)]
    })
  }

  private getUserData(): User {
    const name = this.form.get('name')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    return { name, email, password }
  }

  changeFormState(): void {
    this.formState = 'register';
    this.form.get('name')?.setValue('');
    this.form.get('email')?.setValue('');
    this.form.get('password')?.setValue('');
  }

  login() {

    this.emailErrors = '';
    this.passwordErrors = '';

    this.authService.login(this.getUserData()).subscribe(loginResult => {
      console.log(loginResult)
      if (loginResult === 'User logged in') {
        this.router.navigate(['home'])
      } else if (loginResult === 'Wrong password') {
        this.passwordErrors = 'Wrong password'
      } else {
        this.emailErrors = 'Email not found'
      }
    })
  }

  register() {
     this.authService.registerUser(this.getUserData())
     this.formState = 'login'
  }

}
