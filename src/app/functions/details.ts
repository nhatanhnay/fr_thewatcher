import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface WatchDetails {
    id: number;
    image: string;      // Chú ý thay đổi từ LinkHref sang linkHref
    name: string;          // Chú ý thay đổi từ Name sang name
    price: number;
    rating: number;
    href: string;      // Chú ý thay đổi từ UrlImage sang urlImage
    numberRating: number;
    description: string;
    category: string;  // Chú ý thay đổi từ NumberRating sang numberRating
}
@Injectable({
    providedIn: 'root',
})

export class DataService {

    constructor(private http: HttpClient) { }

    getWatchDetail(id: number): Observable<WatchDetails[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    
        const body = {
            id: id
        };
    
        return this.http.post<WatchDetails[]>('http://103.81.87.196:4699/get-watch-by-id', body, { headers }).pipe(
            catchError((error) => {
                console.error('Error fetching watch detail', error);
                return throwError(error);
            })
        );
    }
}