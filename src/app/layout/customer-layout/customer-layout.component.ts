import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [FooterComponent, RouterOutlet],
  templateUrl: './customer-layout.component.html'
})
export class CustomerLayoutComponent {

}
