import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = 'api/users';
  private _user$: Observable<User[]>;
  private user$: ReplaySubject<User[]>;

  constructor(private http: HttpClient) {
    this.user$ = new ReplaySubject<User[]>(1);
    this._user$ = this.http.get<User[]>(this._url);
    this._user$.subscribe(users => this.user$.next(users));
  }

  getUsers(): Observable<User[]> {
    return this.user$;
  }

  deleteUser(id: number): void {
    this.user$.pipe(take(1),).subscribe(
      users => this.user$.next(users.filter(u => u.id !== id))
    )
  }
}
