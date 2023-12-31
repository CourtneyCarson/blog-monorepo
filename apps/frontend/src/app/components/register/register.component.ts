import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
        ],
      ],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.authService
      .register(this.registerForm.value)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']).then(() => {
            this.toastr.success('Registration successful. Please login.');
          });
        },
        error: (error) => {
          this.toastr.error(error);
        },
      })
      .add(() => {
        this.isSubmitted = false;
      });
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }
}
