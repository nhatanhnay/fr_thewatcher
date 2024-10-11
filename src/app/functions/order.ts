import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class OrderService {
    private apiUrl = 'http://localhost:4699/insert-order ';  // Replace with your backend URL
  
    constructor(private http: HttpClient) {}
  
    sendOrder(orderData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      return this.http.post<any>(this.apiUrl, orderData, { headers });
    }
  }