import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../core/services/authService/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private authService = inject(Auth);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  onLogout() {
    this.authService.logOut().subscribe({
      next: (response) => {
        console.log(response, 'resposneee');
        this.authService.clearLoggedIn();

        this.toastr.success('Logged out successfully', 'Goodbye');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
  }
}
