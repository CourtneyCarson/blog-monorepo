import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit() {
    this.isSubmitted = true;
    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (result) => {
          this.router.navigate([this.returnUrl || '/profile']);
        },
        error: (error) => {
          this.toastr.error(error);
        },
      })
      .add(() => {
        this.isSubmitted = false;
      });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }
}
