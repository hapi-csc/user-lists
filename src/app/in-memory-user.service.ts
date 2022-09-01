import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_USERS } from './mock_users';

@Injectable({
  providedIn: 'root'
})
export class InMemoryUserService implements InMemoryDbService {
  createDb() {
    const users = MOCK_USERS;
    return {users};
  }
}
