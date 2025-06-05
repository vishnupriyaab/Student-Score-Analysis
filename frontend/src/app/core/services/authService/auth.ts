import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, LogOut } from '../../models/commonAPIResponse';
import { LoginDto } from '../../../dtos/login.dto';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _baseUrl = environment.baseUrl;
  private _http = inject(HttpClient);

  login(loginData: LoginDto): Observable<ApiResponse<string>> {
    return this._http.post<ApiResponse<string>>(
      `${this._baseUrl}admin/login`,
      {
        loginData,
      },
      { withCredentials: true }
    );
  }

  setLoggedIn(status: string) {
    localStorage.setItem('isLoggedIn', status);
  }

  logOut(): Observable<LogOut> {
    return this._http.post<LogOut>(
      `${this._baseUrl}admin/logOut`,
      {},
      { withCredentials: true }
    );
  }

  clearLoggedIn() {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
