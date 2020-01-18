import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = '/';

  constructor(private http: HttpClient) {
  }

  apiRequest(type: 'get' | 'post' | 'put' | 'delete',
             url: string,
             headers: any = {},
             data: any = {}): Observable<any> {

    if (type === 'get') {
      return this.http.get(`${this.apiUrl}${url}`, headers);
    } else if (type === 'post') {
      return this.http.post(`${this.apiUrl}${url}`, data, headers);
    } else if (type === 'put') {
      return this.http.put(`${this.apiUrl}${url}`, data, headers);
    } else if (type === 'delete') {
      return this.http.delete(`${this.apiUrl}${url}`, headers);
    }
  }





  getAuthor(id: number): Observable<any> {
    return this.apiRequest('get', `author/${id}/`);
  }


}
