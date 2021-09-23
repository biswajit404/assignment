import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpWithoutInterceptor: HttpClient;
  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) { 
    this.httpWithoutInterceptor = new HttpClient(this.handler);
  }

  login(data: any) {
    return this.httpWithoutInterceptor.post(environment.apiEndpoint + 'api/login/', data);
  }

  addUser(data: any) {
    return this.http.post(environment.apiEndpoint + 'api/users/', data);
  }

  getUserList(params: any) {
    return this.http.get(environment.apiEndpoint + 'api/users/?'+ params);
  }

  getUserDetails(id: number) {
    return this.http.get(environment.apiEndpoint + 'api/users/' + id );
  }

  updateUser(id: number, data: any) {
    return this.http.put(environment.apiEndpoint + 'api/users/' + id + '/', data);
  }

  deleteUser(id: number) {
    return this.http.delete(environment.apiEndpoint + 'api/users/' + id + '/');
  }
}
