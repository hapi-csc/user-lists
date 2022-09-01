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
  private userObs$: Observable<User[]>;
  private userSub$: ReplaySubject<User[]>;

  constructor(private http: HttpClient) {
    this.userSub$ = new ReplaySubject<User[]>(1);
    this.userObs$ = this.http.get<User[]>(this._url);
    this.userObs$.subscribe(users => this.userSub$.next(users));
  }

  observeUsers(): Observable<User[]> {
    return this.userSub$;
  }

  getUsers(): User[] {
   let out: User[] = [];
   this.userSub$.pipe(take(1),).subscribe(users => out = users);
   return out;
  } 

  // TODO
  // add some sort of logging / notification for out === {}
  getUser(id: number): User {
   let out: User = {} as User;
   this.userSub$.pipe(take(1),).subscribe(users => {
     if(users)
       out = users.find(u => u.id === id) || {} as User;
   });
   return out;
  } 

  addUser(newUser: User): void {
    this.userSub$.pipe(take(1),).subscribe(users =>
      this.userSub$.next([...users, newUser])
    )
  }

  deleteUser(id: number): void {
    this.userSub$.pipe(take(1),).subscribe(
      users => this.userSub$.next(users.filter(u => u.id !== id))
    )
  }
}
