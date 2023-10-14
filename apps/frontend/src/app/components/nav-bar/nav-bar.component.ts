import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleLogout() {
    this.authService.logout().subscribe({
      next: (result) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
}
