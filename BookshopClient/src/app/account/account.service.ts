import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { apiUrl } from 'src/constants';
import { IUser } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  loadCurrentUser(token: string | null) {
    if(token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.httpClient.get<IUser>(apiUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role[0]);
          this.currentUserSource.next(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  register(values: any) {
    return this.httpClient.post<IUser>(apiUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role[0]);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any) {
    return this.httpClient.post<IUser>(apiUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role[0]);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.httpClient.get(apiUrl + 'account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.httpClient.get<IAddress>(apiUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.httpClient.put<IAddress>(apiUrl + 'account/address', address);
  }

}
