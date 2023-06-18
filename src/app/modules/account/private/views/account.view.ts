import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/modules/login/shared/services/auth.service';
import { UserData } from 'src/app/modules/login/shared/types/user.type';

@Component({
  selector: 'app-account',
  templateUrl: './account.view.html',
  styleUrls: ['./account.view.scss']
})
export class AccountComponent {

  public isLoading!: boolean;
  public userForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private matSnackBarController: MatSnackBar) {}

  ngOnInit() {
    this.getFormData();
  }

  private async getFormData() {
    this.isLoading = true;
    const currentUser = await this.authService.getUserInfo();

    this.userForm = this.fb.group({
      name: currentUser?.name,
      email: [currentUser?.email, Validators.email],
      password: ''
    })

    this.isLoading = false;
  }

  public async save() {
    const userData: UserData & { password: string }= {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    }

    await this.authService.updateUserData(userData)
      .then(()=> {
        this.matSnackBarController.open('User saved', '', {
          duration: 1500,
          horizontalPosition: 'center',
          panelClass: 'custom-snackbar'
        })
      });
  }

}
