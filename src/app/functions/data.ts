import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface WatchDetails {
    id: number;
    linkHref: string;      // Chú ý thay đổi từ LinkHref sang linkHref
    name: string;          // Chú ý thay đổi từ Name sang name
    price: number;
    rating: number;
    urlImage: string;      // Chú ý thay đổi từ UrlImage sang urlImage
    numberRating: number;  // Chú ý thay đổi từ NumberRating sang numberRating
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    urlImage: string;
    quantity: number;
}

interface CustomerDetails {
    name: string;
    email: string;
    address: string;
    phone: string;
}

interface OrderDetails {
    customer: CustomerDetails;
    items: CartItem[];
}

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private apiUrl = 'http://103.81.87.196:4699/watch-details';

    constructor(private http: HttpClient) { }

    // Phương thức lấy chi tiết đồng hồ
    getWatchDetails(): Observable<WatchDetails[]> {
        // Định nghĩa headers với Content-Type
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Đặt Content-Type là application/json
        });

        return this.http.post<WatchDetails[]>(this.apiUrl, {}, { headers }).pipe(
            catchError((error) => {
                console.error('Error fetching watch details', error);
                return throwError(error);
            })
        );
    }
}

