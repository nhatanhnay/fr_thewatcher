import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-item-check-out',
  standalone: true,
  imports: [],
  templateUrl: './item-check-out.component.html',
  styleUrl: './item-check-out.component.scss'
})
export class ItemCheckOutComponent {
  @Input() urlImage: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() quantity: number = 0;

}