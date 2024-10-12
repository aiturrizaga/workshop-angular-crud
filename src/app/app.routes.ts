import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { HomePersonComponent } from './feature/person/home-person/home-person.component';
import { HomeProductComponent } from './feature/product/home-product/home-product.component';
import { HomeDashboardComponent } from './feature/dashboard/home-dashboard/home-dashboard.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: HomeDashboardComponent
            },
            {
                path: 'persons',
                component: HomePersonComponent
            },
            {
                path: 'products',
                component: HomeProductComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ]
    },
    {
        path: 'customer',
        component: CustomerLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: HomeDashboardComponent
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin'
    }
];
