import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, SidebarComponent } from '@vg/shared/components';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {

}
