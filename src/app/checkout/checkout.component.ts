import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ItemCheckOutComponent } from '../item-check-out/item-check-out.component';
import { ShoppingCartService } from '../models/services';
import { OrderService } from '../functions/order';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ItemCheckOutComponent, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cities: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedCity: string = '';
  selectedDistrict: string = '';
  orderCompleted: boolean = false; // Để hiển thị pop-up hoàn tất đơn hàng

  // Thông tin khách hàng
  customer = {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    paymentMethod: 'COD'
  };

  // Thông tin đơn hàng
  order = {
    name: '',
    email: '',
    phone: '',
    address: '',
    order_info: this.cartItems,
  };

  constructor(
    private http: HttpClient, 
    private cartService: ShoppingCartService, 
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCities();
  }

  // Load danh sách Tỉnh/Thành phố
  loadCities() {
    const url = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';
    this.http.get<any[]>(url).subscribe(data => {
      this.cities = data;
    });
  }

  // Khi thay đổi Tỉnh/Thành phố
  onCityChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const cityId = selectElement.value;
    this.districts = [];
    this.wards = [];
    const selectedCity = this.cities.find(city => city.Id === cityId);
    if (selectedCity) {
      this.districts = selectedCity.Districts;
    }
  }

  // Khi thay đổi Quận/Huyện
  onDistrictChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const districtId = selectElement.value;
    this.wards = [];
    const selectedDistrict = this.districts.find(district => district.Id === districtId);
    if (selectedDistrict) {
      this.wards = selectedDistrict.Wards;
    }
  }

  // Lấy danh sách các sản phẩm trong giỏ hàng
  get cartItems() {
    return this.cartService.getCartItems();
  }

  // Tính tổng giá trị đơn hàng
  get totalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Hoàn tất đơn hàng
  completeOrder() {
    const selectedCity = this.cities.find(city => city.Id === this.customer.city);
    const selectedDistrict = this.districts.find(district => district.Id === this.customer.district);
    const selectedWard = this.wards.find(ward => ward.Id === this.customer.ward);
  
    // Nếu không tìm thấy tên của các thành phần địa chỉ, trả về chuỗi trống
    const cityName = selectedCity ? selectedCity.Name : '';
    const districtName = selectedDistrict ? selectedDistrict.Name : '';
    const wardName = selectedWard ? selectedWard.Name : '';
  
    // Tạo đơn hàng với thông tin địa chỉ đầy đủ
    this.order = {
      name: this.customer.fullName,
      email: this.customer.email,
      phone: this.customer.phone,
      address: `${wardName}, ${districtName}, ${cityName}, ${this.customer.address}`, // Tạo địa chỉ đầy đủ
      order_info: this.cartItems,  // Thông tin đơn hàng (các sản phẩm trong giỏ)
    };
    this.orderCompleted = true; // Hiển thị thông báo hoàn tất đơn hàng

    // Gửi đơn hàng đến service xử lý
    this.orderService.sendOrder(this.order).subscribe(response => {
      console.log('Order submitted successfully', response);
    }, error => {
      console.error('Error submitting order', error);
    });

    // Hiển thị đơn hàng trong console để kiểm tra
    console.log('Đơn hàng:', this.order);
  }

  // Đóng pop-up hoàn tất đơn hàng
  closeModal() {
    this.orderCompleted = false;
    this.cartService.removeAllCart(); // Xoá toàn bộ giỏ hàng
    //quay lại trang chủ
    this.router.navigate(['/']);
  }
}
