import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/modules/login/shared/services/auth.service';
import { UserData, UserForm } from 'src/app/modules/login/shared/types/user.type';

@Component({
  selector: 'app-account',
  templateUrl: './account.view.html',
  styleUrls: ['./account.view.scss']
})
export class AccountComponent {

  public isLoading!: boolean
  public isSaving!: boolean;
  public userForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private matSnackBarController: MatSnackBar) {}

  ngOnInit() {
    this.getFormData();
  }

  private async getFormData() {
    this.isLoading = true;
    const currentUser = await firstValueFrom(this.authService.currentUser$);
    console.log(currentUser)

    this.userForm = this.fb.group({
      name: [currentUser?.displayName, Validators.required],
      email: [currentUser?.email, Validators.email],
      password: ['', Validators.minLength(6)]
    })

    this.isLoading = false;
  }

  public async save() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const userData: UserForm = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    }
    this.isSaving = true;

    try {
      await this.authService.updateUserData(userData)
        .then(()=> {
          this.isSaving = false;
          this.matSnackBarController.open('User saved', '', {
            duration: 1500,
            horizontalPosition: 'center',
            panelClass: 'custom-snackbar'
          })
        });
    } catch {
      this.isSaving = false;
      this.matSnackBarController.open(
        'Something went wrong, please try again later.', '', {
          panelClass: 'custom-snackbar'
        }
      )

    }
  }

}
